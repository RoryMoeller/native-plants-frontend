//date, method of identifiction (3 types), cofidence of ID 1-3, cleaing effectiveness 1 of 4 types, cleaned weight
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'
import Link from 'next/link';

function FarmAmp() {
    const [farmName, setFarmName] = useState("");
    const [yearSown, setYearSown] = useState("");
    const [fieldSize, setFieldSize] = useState("");
    const [estHarvest, setEstHarvest] = useState("");
    const [yearHarvest, setYearHarvest] = useState("");
    const [seedGen, setSeedGen] = useState("");
    const [harvestOwner, setHarvestOwner] = useState("");
    const [notes, setNotes] = useState("");


    async function getData(){
        const reqData = {}
        let query = "/api/accessBackend?query_string=SELECT * from rev2.users WHERE user_name LIKE '" +harvestOwner+ "'"
        let res = await fetch(query,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Users"
            }
        )
        if (res.status >= 200 && res.status < 400) {
            reqData.owner = await res.json();
            console.log(reqData.owner);
        } else {
            alert("Error: \n" + reqData.error)
            return {owner:NULL}
        }

        query = "/api/accessBackend?query_string=SELECT * from rev2.farms WHERE farm_name LIKE '" +farmName+ "'"
        res = await fetch(query,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Farms"
            }
        )
        if (res.status >= 200 && res.status < 400) {
            reqData.farmData = await res.json();
            console.log(reqData.farmData);
        } else {
            alert("Error: \n" + reqData.error)
            return {farmData:NULL, ownerData:NULL}
        }
        return reqData
    }
    
    async function postFarmAmp(e) {
        e.preventDefault();
        const data = await getData()
        if ((!data.owner)||(!data.farmData))
            return 
        console.log('here')
        const FNAME = "'" +farmName + "'"
        const HOWNER = "'" +harvestOwner+ "'"
        const NOTE = "'" +notes+ "'"
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "farm_amplification",
                query_type: "INSERT",
                query_fields: ['farm_name', 'year_sown', 'field_size', 'estimated_harvest_per_year','year_harvested', 'generation_of_seed', 'owner_of_harvest', 'extra_farm_notes'],
                query_values: [farmName, yearSown, fieldSize, estHarvest, yearHarvest, seedGen, harvestOwner, notes]
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
        <form onSubmit={postFarmAmp} className={styles.container}>
        <div>
        <p>Name of existing Farm (if a farm of that name does not exist in the database this will not work)</p>
                <input
                    type="text"
                    placeholder="Name of Farm"
                    onChange={e => setFarmName(e.target.value)}
                    value={farmName}
                    />
            </div>
            <ul>
            <li>
            <Link href="/get-farms">
                <a target="_blank">Click here to see all farms in new tab</a>
            </Link>
            </li>
            </ul>
            <div>
            <p>Year seed was sown</p>
                <input
                    type="text"
                    placeholder="Year Sown"
                    onChange={e => setYearSown(e.target.value)}
                    value={yearSown}
                    />
            </div>
            <div>
            <p>Field Size in acres (whole number)</p>
                <input
                    type="text"
                    placeholder="Field Size"
                    onChange={e => setFieldSize(e.target.value)}
                    value={fieldSize}
                    />
            </div>
            <div>
                <p>Estimated harvest per year</p>
                <input
                    type="text"
                    placeholder="Estimated harvest"
                    onChange={e => setEstHarvest(e.target.value)}
                    value={estHarvest}
                    />
            </div>
            <div>
            <p>Year Harvested</p>
                <input
                    type="text"
                    placeholder="Year Harvested"
                    onChange={e => setYearHarvest(e.target.value)}
                    value={yearHarvest}
                    />
            </div>
            <div>
            <p>Generation of Seed</p>
                <input
                    type="text"
                    placeholder="Generation"
                    onChange={e => setSeedGen(e.target.value)}
                    value={seedGen}
                    />
            </div>
            <div>
            <p>Username of harvest owner (if a user of that name does not exist in the database this will not work)</p>
            <input
                    type="text"
                    placeholder="Generation"
                    onChange={e => setHarvestOwner(e.target.value)}
                    value={harvestOwner}
                    />
            </div>
            <ul>
            <li>
            <Link href="/get-users">
                <a target="_blank">Click here to see all users in new tab</a>
            </Link>
            </li>
            </ul>
            <p>Any Extra notes to add</p>
            <div>
                <input
                    type="text"
                    placeholder="Extra Notes"
                    onChange={e => setNotes(e.target.value)}
                    value={notes}
                    />
            </div>
            <div>
                <button type="submit">Add Farm Amplification</button>
            </div>
        </form>
        </Layout>
    );
}

export default FarmAmp;
