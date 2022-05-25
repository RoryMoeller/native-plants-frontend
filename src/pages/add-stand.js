import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

import useAPIRequest from '../hooks/useAPIRequest';

function Stand() {
    const [standType, setStandType] = useState("");
    const [siteName, setSiteName] = useState("");

    async function getData(){
        const reqData = {}
        let query = "/api/accessBackend?query_string=SELECT * from rev2.site WHERE collection_site_name LIKE '" +siteName+ "'"
        let res = await fetch(query,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Labs"
            }
        )
        if (res.status >= 200 && res.status < 400) {
            reqData.siteData = await res.json();
            console.log(reqData.siteData);
        } else {
            alert("Error: \n" + reqData.error)
            return {siteData:NULL}
        }
        return reqData
    }

    async function postStand(e) {
        e.preventDefault();
        //get site data
        const data = await getData()
        //make stand
        console.log("== Adding stand with these parameters:");
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "stand",
                query_type: "INSERT",
                query_fields: ['stand_type','encompassing_site_id'],
                query_values: [standType, data.siteData.data.data[0].site_id,]
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
        <form onSubmit={postStand} className={styles.container}>
            <div>
                <input
                    type="text"
                    placeholder="Site Name"
                    onChange={e => setSiteName(e.target.value)}
                    value={siteName}
                    />
            </div>
            <div>
            <p>Enter a brief description of the stand (relic dune, salt spray meadow, lowland prairie, headland, montane grassland)</p>
                <input
                    type="text"
                    placeholder="Stand Type"
                    onChange={e => setStandType(e.target.value)}
                    value={standType}
                    />
            </div>
            <div>
                <button>Add Stand</button>
            </div>
        </form>
        </Layout>
    );
}

export default Stand;
