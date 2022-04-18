import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../components/Navbar'

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Nurses() {
    const [nursename, setNursename] = useState("");
    const [email, setEmail] = useState("");
    const [nurseList, setNurseList] = useState([]);


    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function getNurses(e) {
        e.preventDefault();
        let searchfront = '/api/accessBackend?query_string=SELECT '
        let searchback = ' FROM rev2.nurseries'
        var searchmid = '*'
        if (nursename !=""){
            searchback = searchback + " Where nursery_name LIKE '" + nursename + "'"
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
                query: "Nurseries"
            }
        )
        const resBody = await res.json();
        console.log(resBody);
        setNurseList(resBody.data)
    }

    return (
        <Layout>
            <form onSubmit={getNurses}>
                <div>
                <a>Type here to filter, leave blank for no filter</a>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by nursery name name"
                        onChange={e => setNursename(e.target.value)}
                        value={nursename}
                    />
                </div>
                <div>
                    <button>Get Nurseries</button>
                </div>
            </form>
            <TableView data={nurseList.data} />
        </Layout>
    );
}

export default Nurses;
