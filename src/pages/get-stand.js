import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Stands() {
    const [siteName, setSiteName] = useState("");
    const [standList, setStandList] = useState([]);

    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");

    async function getData(){
        const reqData = {}
        let query = "/api/accessBackend?query_string=SELECT * from rev2.site WHERE collection_site_name LIKE '" +siteName+ "'"
        let res = await fetch(query,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Labs"
            }
        )
        if (res.status >= 200 && res.status < 400) {
            reqData.siteData = await res.json();
            console.log(reqData.siteData);
        } else {
            alert("Error: \n" + reqData.error)
            return {siteData:NULL}
        }
        return reqData
    }


    async function getStand(e) {
        e.preventDefault();
        let searchfront = '/api/accessBackend?query_string=SELECT '
        let searchback = ' FROM rev2.stand'
        var searchmid = '*'
        if (siteName !=""){
            const data = await getData()
            searchback = searchback + " Where encompassing_site_id = " + data.siteData.data.data[0].site_id 
        }
        let searchfinal = searchfront + searchmid + searchback
        console.log("== searching this: ", searchfinal);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{
        const res = await fetch(searchfinal,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Stand"
            }
        )
        const resBody = await res.json();
        console.log(resBody);
        if(res.status >= 200 && res.status < 400) {
            setStandList(resBody.data)
        }else {
            alert("Error: \n" + resBody.error)
        }
    }

    return (
        <Layout>
            <form onSubmit={getStand}>
                <div>
                    <a>Type here to filter, leave blank for no filter</a>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by Site name"
                        onChange={e => setSiteName(e.target.value)}
                        value={siteName}
                    />
                </div>
                <div>
                    <button>Get stands</button>
                </div>
            </form>
            {(standList && standList.data )? <TableView data={standList.data} /> : <TableView data={[{"Notice":"no data to display"}]} />}
        </Layout>
    );
}

export default Stands;
