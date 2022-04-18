import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

function AddLab() {
    const [tablename, setTablename] = useState("");
    const [collumn, setCollumn] = useState("");
    const [field, setField] = useState("");

    async function postLab(e) {
        e.preventDefault();
        console.log("== Deleting:", field, " from ", tablename);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'DELETE',
            body: JSON.stringify( {
                table_name: [tablename],
                query_type: "DELETE",
                query_fields: [collumn],
                query_values: [field]
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
                <a>Table Name</a>
                <input
                    type="text"
                    placeholder="Table name"
                    value={tablename}
                    onChange={e => setTablename(e.target.value)}
                    />
            </div>
            <div>
                <a>Collumn name</a>
                <input
                    type="text"
                    placeholder="Collumn"
                    value={collumn}
                    onChange={e => setCollumn(e.target.value)}
                    />
            </div>
            <div>
                <a>Field name</a>
                <input
                    type="text"
                    placeholder="field_name"
                    value={field}
                    onChange={e => setField(e.target.value)}
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
