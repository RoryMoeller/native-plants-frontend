import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Farms() {
    const [username, setUsername] = useState("");
    const [usertype, setUsertype] = useState("");
    const [userList, setUserList] = useState([]);

    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function updateUser(e) {
        e.preventDefault();
        //const res3 = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{

        const res2 = await fetch('/api/accessBackend', {
            method: 'PATCH',
            body: JSON.stringify( {
                table_name: "users",
                query_type: "UPDATE",
                query_fields: ['user_role_type','user_name'],
                query_values: [usertype,username]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res2Body = await res2.json();
        console.log(res2Body);
    }

    return (
        <Layout>
            <form onSubmit={updateUser}>
                <div>
                    <label for="Username">Enter Username to change status of</label>
                    <input
                        type="text"
                        id="Username"
                        placeholder="User name"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div>
                    <label for="Usertype">Enter status level to change to</label>
                    <input
                        type="number"
                        placeholder="User Type"
                        id="Usertype"
                        onChange={e => setUsertype(e.target.value)}
                        value={usertype}
                    />
                    <small>1 = verified user, 2 = admin</small><br></br>
                </div>
                <div>
                    <button>Update User</button>
                </div>
            </form>
            <TableView data={userList.data} />
        </Layout>
    );
}

export default Farms;
