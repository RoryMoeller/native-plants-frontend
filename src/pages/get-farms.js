import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Farms() {
    const [farmname, setFarmname] = useState("");
    const [email, setEmail] = useState("");
    const [farmList, setFarmList] = useState([]);

    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function getFarm(e) {
        e.preventDefault();
        console.log("== Adding farm with these parameters:", farmname, email);
        let searchfront = '/api/accessBackend?query_string=SELECT '
        let searchback = ' FROM rev2.farms'
        var searchmid = '*'
        if (farmname !=""){
            searchback = searchback + " Where farm_name LIKE '" + farmname + "'"
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
                query: "Farms"
            }
        )
        const resBody = await res.json();
        console.log(resBody);
        if(res.status >= 200 && res.status < 400) {
            setFarmList(resBody.data)
        }else {
            alert("Error: \n" + resBody.error)
        }
    }

    return (
        <Layout>
            <form onSubmit={getFarm}>
                <div>
                    <a>Type here to filter, leave blank for no filter</a>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by Farm name"
                        onChange={e => setFarmname(e.target.value)}
                        value={farmname}
                    />
                </div>
                <div>
                    <button>Get farms</button>
                </div>
            </form>
            {(farmList && farmList.data )? <TableView data={farmList.data} /> : <TableView data={[{"Notice":"no data to display"}]} />}
        </Layout>
    );
}

export default Farms;
