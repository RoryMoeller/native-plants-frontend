import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

function AddLab() {
    const [id, setID] = useState("");
    const [code, setCode] = useState("");

    async function postLab(e) {
        e.preventDefault();
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
            const res = await fetch('/api/accessBackend', {
                method: 'DELETE',
                body: JSON.stringify( {
                    table_name: "land_manager_want_list",
                    query_type: "DELETE",
                    query_fields: ['wanted_list_id'],
                    query_values: [id]
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
                <a>ID of to be deleted listing</a>
                <input
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={e => setID(e.target.value)}
                    />
            </div>
            <div>
                <button>Delete selected</button>
            </div>
        </form>
        </Layout>
    );
}

export default AddLab;
