import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Farms() {
    const [farmname, setFarmname] = useState("");
    const [userList, setUserList] = useState([]);
    const [collum, setCol] = useState("");
    const [newdata, setNew] = useState("");

    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function updateFarm(e) {
        e.preventDefault();
        //const res3 = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{

        const res2 = await fetch('/api/accessBackend', {
            method: 'PATCH',
            body: JSON.stringify( {
                table_name: "farms",
                query_type: "UPDATE",
                query_fields: [collum,'farmname'],
                query_values: [newdata,farmname]
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
            <form onSubmit={updateFarm}>
            <div className="radios">
                <p>Please select what info to change</p>
            <label class="container">Email
                <input type="radio" name="rate" value="contact_email" onClick={e => setCol(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Phone Number
                <input type="radio" name="rate" value="contact_phone_number" onClick={e => setCol(e.target.value)}/>
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
                    <label htmlFor="Farm name">Enter the username of the user to be updated</label>
                    <input
                        type="text"
                        placeholder="Farm Name"
                        id="Usertype"
                        onChange={e => setFarmname(e.target.value)}
                        value={farmname}
                    />
                    <small>(for user type updates 1 = verified user, 2 = admin)</small><br></br>
                </div>
                <div>
                    <button>Update Farm</button>
                </div>
            </form>
        </Layout>
    );
}

export default Farms;
