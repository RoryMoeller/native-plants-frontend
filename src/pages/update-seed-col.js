//date, method of identifiction (3 types), cofidence of ID 1-3, cleaing effectiveness 1 of 4 types, cleaned weight
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

import useAPIRequest from '../hooks/useAPIRequest';

function SeedCol() {
    const [speccode, setSpecCode] = useState("");
    const [date, setDate] = useState("");
    const [siteName, setSitename] = useState("");
    const [username, setUserName] = useState("");
    const [newname, setNewName] = useState("");
    const [newsite, setNewSite] = useState("");
    const [userList, setUserList] = useState([]);


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








    async function updateSeedCol(e) {
        e.preventDefault();
        const data = await getData()
        //const res3 = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{

        const res2 = await fetch('/api/accessBackend', {
            method: 'PUT',
            body: JSON.stringify( {
                table_name: "seed_collection",
                query_type: "UPDATE",
                query_fields: ['id_person_name','id_person_name','collected_date','col_species_code','col_provenance'],
                query_values: [newname,username,date,speccode,data.siteData.data.data[0].site_id]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res2);
        const res2Body = await res2.json();
        console.log(res2Body);
        if (res2.status >= 200 && res2.status < 400) {
            setUserList(res2Body.data)
        } else {
            alert("Error: \n" + res2Body.error)
        }

    }


    return (
        <Layout>
        <form onSubmit={updateSeedCol} className={styles.container}>
        <div>
            <p>Name of Current Owner</p>
                <input
                    type="text"
                    placeholder="User name of owner"
                    onChange={e => setUserName(e.target.value)}
                    value={username}
                    />
            </div>
            <div>
                <p>Name of New Owner</p>
                <input
                    type="text"
                    placeholder="New Owner name"
                    onChange={e => setNewName(e.target.value)}
                    value={newname}
                    />
            </div>
            <div>
                <p>Name of orignal collection site</p>
                <input
                    type="text"
                    placeholder="Current Site"
                    onChange={e => setSitename(e.target.value)}
                    value={siteName}
                    />
            </div>
            <div>
                <p>Code for species to be traded</p>
                <input
                    type="text"
                    placeholder="Species Code"
                    onChange={e => setSpecCode(e.target.value)}
                    value={speccode}
                    />
            </div>
            <div>
            <p>Collection Date of the to be traded seed(format YYYY-MM-DD you DO type the dashes)</p>
                <input
                    type="text"
                    placeholder="Collection Date"
                    onChange={e => setDate(e.target.value)}
                    value={date}
                    />
            </div>
            <div>
                <button type="submit">Update Seed Collection</button>
            </div>
        </form>
        </Layout>
    );
}

export default SeedCol;
