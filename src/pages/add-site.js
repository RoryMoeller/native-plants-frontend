import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

import useAPIRequest from '../hooks/useAPIRequest';

function Sites() {
    const [ownername, setOwnername] = useState("");
    const [sitename, setSitename] = useState("");
    const [aCode, setACode] = useState("");

    async function postSite(e) {
        e.preventDefault();
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "site",
                query_type: "INSERT",
                query_fields: ['owner_username','collection_site_name','accession_code'],
                query_values: [ownername, sitename,aCode]
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
            <p>What is the accession code</p>
            <label class="container">Washington
                <input type="radio" name="radio" value="WA" onClick={e => setACode(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Columbia River - Alsea River
                <input type="radio" name="radio" value="NC" onClick={e => setACode(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Alsea River - Coos
                <input type="radio" name="radio" value="CC" onClick={e => setACode(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Coos River - Winchuck River
                <input type="radio" name="radio" value="SC" onClick={e => setACode(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">California
                <input type="radio" name="radio" value="CA" onClick={e => setACode(e.target.value)}/>
                <span class="checkmark"></span>
            </label>
            <div>
                <button>Add Site</button>
            </div>
        </form>
        </Layout>
    );
}

export default Sites;
