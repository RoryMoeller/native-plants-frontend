import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

function AddLab() {
    const [labname, setLabname] = useState("");
    const [email, setEmail] = useState("");

    async function postLab(e) {
        e.preventDefault();
        console.log("== Adding farm with these parameters:", labname, email);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "labs",
                query_type: "INSERT",
                query_fields: ['lab_name','contact_email'],
                query_values: [labname, email]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resBody = await res.json();
        console.log(resBody);
    }

    return (
        <Layout>
        <form onSubmit={postLab} className={styles.container}>
            <div>
                <a>Lab name</a>
                <input
                    type="text"
                    placeholder="lab_name"
                    value={labname}
                    onChange={e => setLabname(e.target.value)}
                    />
            </div>
            <div>
                <a>Email</a>
                <input
                    type="text"
                    placeholder="lab_email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>
            <div>
                <label for="phone">Enter Lab phone number:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                <small>Format: 123-456-7890</small><br></br>
            </div>
            <div>
                <button>Add Lab</button>
            </div>
        </form>
        </Layout>
    );
}

export default AddLab;
