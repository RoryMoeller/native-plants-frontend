import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

import useAPIRequest from '../hooks/useAPIRequest';

function Map() {
    const [farmname, setFarmname] = useState("");
    const [farmemail, setFarmemail] = useState("");
    const [farmnumber, setFarmnumber] = useState("");
    async function postFarm(e) {
        e.preventDefault();
        console.log("== Adding farm with these parameters:", farmname, farmemail);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify({
                table_name: "map",
                query_type: "INSERT",
                query_fields: ['farm_name', 'contact_email'],
                query_values: [farmname, farmemail]
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
            <form className={styles.containerMap}>
                <div>
                    <iframe
                        id="frame-gis"
                        src="/maps/map-view.html"
                        width="1100px"
                        height="600px"
                    ></iframe>
                </div>
            </form>
        </Layout>
    );
}

export default Map;