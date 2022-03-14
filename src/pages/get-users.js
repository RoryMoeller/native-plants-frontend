import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Farms() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userList, setUserList] = useState([]);

    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function getUser(e) {
        e.preventDefault();
        //const res3 = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{

        const res2 = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "users",
                query_type: "UPDATE",
                query_fields: ['user_name','email'],
                query_values: [username, email]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            const res2Body = await res2.json();
            console.log(res2Body);

        const res = await fetch('/api/accessBackend?query_string=SELECT * FROM rev2.users',
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
        setUserList(resBody.data)
    }

    return (
        <Layout>
            <form onSubmit={getUser}>
                <div>
                    <input
                        type="text"
                        placeholder="User name"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
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
                    <button>Get Users</button>
                </div>
            </form>
            <TableView data={userList.data} />
        </Layout>
    );
}

export default Farms;