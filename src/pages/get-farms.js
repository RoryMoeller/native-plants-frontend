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
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{
        const res = await fetch('/api/accessBackend?query_string=SELECT * FROM rev2.farms',
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
        setFarmList(resBody.data)
    }

    return (
        <Layout>
            <form onSubmit={getFarm}>
                <div>
                    <input
                        type="text"
                        placeholder="Farm name"
                        onChange={e => setFarmname(e.target.value)}
                        value={farmname}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                    // value={email}
                    // onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button>Get farms</button>
                </div>
            </form>
            <TableView data={farmList.data} />
        </Layout>
    );
}

export default Farms;
