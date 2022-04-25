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

        const res = await fetch('/api/accessBackend?query_string=SELECT name, email, user_name, phone_number, website, user_role_type FROM rev2.users',
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
        if (res.status >= 200 && res.status < 400) {
            setUserList(resBody.data)
        } else {
            alert("Error: \n" + resBody.error)
        }
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
            {(userList && userList.data) ? <TableView data={userList.data} /> : <TableView data={[{ "Notice": "no data to display" }]} />}

        </Layout>
    );
}

export default Farms;
