import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../components/Navbar'

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Plants() {
    const [comname, setComname] = useState("");
    const [email, setEmail] = useState("");
    const [labList, setLabList] = useState([]);


    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function getLab(e) {
        e.preventDefault();
        let searchfront = '/api/accessBackend?query_string=SELECT '
        let searchback = ' FROM rev2.plant'
        var searchmid = '*'
        if (comname !=""){
            searchback = searchback + " Where common_name LIKE '" + comname + "'"
            if (email !="")
                searchback = searchback + " OR common_name Like '" + email + "'"
        }
        else if (email != "")
        searchback = searchback + " Where common_name LIKE '" + email + "'"
        let searchfinal = searchfront + searchmid + searchback
        console.log("== searching this: ", searchfinal);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{
        const res = await fetch(searchfinal,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Labs"
            }
        )
        const resBody = await res.json();
        console.log(resBody);
        setLabList(resBody.data)
    }

    return (
        <Layout>
            <form onSubmit={getLab}>
                <div>
                    <input
                        type="text"
                        placeholder="Common name"
                        onChange={e => setComname(e.target.value)}
                        value={comname}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button>Get Plants</button>
                </div>
            </form>
            <TableView data={labList.data} />
        </Layout>
    );
}

export default Plants;
