import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

function AddNursery() {
    const [nurseryname, setNurseryname] = useState("");
    const [email, setEmail] = useState("");

    async function postNursery(e) {
        e.preventDefault();
        console.log("== Adding farm with these parameters:", nurseryname, email);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "nurseries",
                query_type: "INSERT",
                query_fields: ['nursery_name','contact_email'],
                query_values: [nurseryname, email]
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
        <form onSubmit={postNursery} className={styles.container}>
            <div>
                <a>Nursery name</a>
                <input
                    type="text"
                    placeholder="nursery_name"
                    value={nurseryname}
                    onChange={e => setNurseryname(e.target.value)}
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
                <label for="phone">Enter Nursery phone number:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                <small>Format: 123-456-7890</small><br></br>
            </div>
            <div>
                <button>Add Nursery</button>
            </div>
        </form>
        </Layout>
    );
}

export default AddNursery;
