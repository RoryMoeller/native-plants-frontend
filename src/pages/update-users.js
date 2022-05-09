import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Farms() {
    const [username, setUsername] = useState("");
    const [usertype, setUsertype] = useState("");
    const [userList, setUserList] = useState([]);
    const [collum, setCol] = useState("");
    const [newdata, setNew] = useState("");

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
                query_fields: [collum,'user_name'],
                query_values: [newdata,username]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res2Body = await res2.json();
        console.log(res2Body);
        if (res2.status >= 200 && res2.status < 400) {
            setUserList(res2Body.data)
        } else {
            alert("Error: \n" + resBody.error)
        }
    }

    return (
        <Layout>
            <form onSubmit={updateUser}>
            <div className="radios">
                <p>Please select what info to change</p>
            <label class="container">Real name (not user name)
                <input type="radio" name="rate" value="name" onClick={e => setCol(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Email
                <input type="radio" name="rate" value="email" onClick={e => setCol(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Website
                <input type="radio" name="rate" value="website" onClick={e => setCol(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Phone Number
                <input type="radio" name="rate" value="phone_number" onClick={e => setCol(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Role Type
                <input type="radio" name="rate" value="user_role_type" onClick={e => setCol(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            </div>
                <div>
                    <label htmlFor="UserEdit">Enter what to new data will be</label>
                    <input
                        type="text"
                        id="UserEdit"
                        placeholder="New data"
                        onChange={e => setNew(e.target.value)}
                        value={newdata}
                    />
                </div>
                <div>
                    <label htmlFor="Username">Enter the username of the user to be updated</label>
                    <input
                        type="text"
                        placeholder="User Name"
                        id="Usertype"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    />
                    <small>(for user type updates 1 = verified user, 2 = admin)</small><br></br>
                </div>
                <div>
                    <button>Update User</button>
                </div>
            </form>
        </Layout>
    );
}

export default Farms;
