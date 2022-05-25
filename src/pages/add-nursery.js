import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

function AddNursery() {
    const [nurseryname, setNurseryname] = useState("");
    const [email, setEmail] = useState("");
    const [number, setnumber] = useState("");

    async function postNursery(e) {
        e.preventDefault();
        console.log("== Adding farm with these parameters:", nurseryname, email);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "nurseries",
                query_type: "INSERT",
                query_fields: ['nursery_name','contact_email','contact_phone_number'],
                query_values: [nurseryname, email, number]
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
                <label htmlFor="phone">Enter Nursery phone number:</label>
                <input type="tel" 
                id="phone" 
                name="phone" 
                pattern="[0-9]{10,11}" 
                onChange={e => setnumber(e.target.value)}/>
                <small>Format: 1234567890</small><br/>
            </div>
            <div>
                <button>Add Nursery</button>
            </div>
        </form>
        </Layout>
    );
}

export default AddNursery;
