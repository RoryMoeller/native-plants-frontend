import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

import useAPIRequest from '../hooks/useAPIRequest';

function Sites() {
    const [ownername, setOwnername] = useState("");
    const [sitename, setSitename] = useState("");
    const [farmnumber, setFarmnumber] = useState("");
    async function postSite(e) {
        e.preventDefault();
        console.log("== Adding farm with these parameters:", farmname, farmemail);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "site",
                query_type: "INSERT",
                query_fields: ['owner_name','collection_site_name'],
                query_values: [ownername, sitename]
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
        <form onSubmit={postSite} className={styles.container}>
            <div>
                <input
                    type="text"
                    placeholder="Owner user name"
                    onChange={e => setOwnername(e.target.value)}
                    value={ownername}
                    />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Site Name"
                    onChange={e => setSitename(e.target.value)}
                    value={sitename}
                    />
            </div>
            <div>
                <button>Add Site</button>
            </div>
        </form>
        </Layout>
    );
}

export default Sites;
