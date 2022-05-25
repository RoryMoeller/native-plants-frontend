import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

import useAPIRequest from '../hooks/useAPIRequest';

function Farms() {
    const [genus, setGenus] = useState("");
    const [speccode, setSpecCode] = useState("");
    const [species, setSpecies] = useState("");
    const [comname, setComname] = useState("");
    async function postFarm(e) {
        e.preventDefault();
        console.log("== Adding plant with these parameters:", genus, comname, speccode, species);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "plant",
                query_type: "INSERT",
                query_fields: ['genus','species','common_name','species_code'],
                query_values: [genus, species,comname,speccode]
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
        <form onSubmit={postFarm} className={styles.container}>
            <div>
                <input
                    type="text"
                    placeholder="Common name"
                    onChange={e => setComname(e.target.value)}
                    value={comname}
                    />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Species"
                    onChange={e => setSpecies(e.target.value)}
                    value={species}
                    />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Species Code"
                    onChange={e => setSpecCode(e.target.value)}
                    value={speccode}
                    />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Genus"
                    onChange={e => setGenus(e.target.value)}
                    value={genus}
                    />
            </div>
            <div>
                <button>Add Plant</button>
            </div>
        </form>
        </Layout>
    );
}

export default Farms;
