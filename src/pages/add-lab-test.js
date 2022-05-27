//date, method of identifiction (3 types), cofidence of ID 1-3, cleaing effectiveness 1 of 4 types, cleaned weight
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'
import Link from 'next/link';

function SeedCol() {
    const [invaliddate, setInvalidDate] = useState("");
    const [testgroup, setTestGroup] = useState("");
    const [labname, setLabName] = useState("");
    const [method, setMethod] = useState("");
    const [rate, setRate] = useState("");
    const [collection, setCollection] = useState("");
    const [weight, setWeight] = useState("");
    const [bulk, setBulk] = useState("");
    const [purity, setPurity] = useState("");
    const [pls, setPls] = useState("");
    const [speccode, setSpecCode] = useState("");

    async function getData(){
        const reqData = {}
        let query = "/api/accessBackend?query_string=SELECT * from rev2.lab WHERE lab_name LIKE '" +labname+ "'"
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
            reqData.labData = await res.json();
            console.log(reqData.labData);
        } else {
            alert("Error: \n" + reqData.error)
            return {labData:NULL}
        }

        query = "/api/accessBackend?query_string=SELECT * from rev2.seed_collection WHERE collection_site_name LIKE '" +collection+ "'"
        res = await fetch(query,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Labs"
            }
        )
        if (res.status >= 200 && res.status < 400) {
            reqData.colData = await res.json();
            console.log(reqData.colData);
        } else {
            alert("Error: \n" + reqData.error)
            return {colData:NULL, labData:NULL}
        }
        return reqData
    }
    
    async function postSeedCol(e) {
        e.preventDefault();
        const data = await getData()
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "testing_history",
                query_type: "INSERT",
                query_fields: ['invalidity_date', 'test_group', 'test_species_code', 'tested_collection','testing_lab', 'viability_test_method', 'viability_rate', 'is_measurement_of_pls', 'weight_of_collection', 'unmod_bulk_weight', 'purity'],
                query_values: [invaliddate, testgroup, speccode, collection, data.labData.data.data[0].lab_id, method, rate, pls, weight, bulk, purity]
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
        <form onSubmit={postSeedCol} className={styles.container}>
        <div>
        <p>Test Group Number</p>
                <input
                    type="text"
                    placeholder="Test Group number"
                    onChange={e => setTestGroup(e.target.value)}
                    value={testgroup}
                    />
            </div>
            <p>ID of Collection that is tested</p>
            <div>
                <input
                    type="text"
                    placeholder="Collection"
                    onChange={e => setCollection(e.target.value)}
                    value={collection}
                    />
            </div>
            <ul>
            <li>
            <Link href="/get-seed-col">
                <a target="_blank">Click here to see all seed collecitons in new tab</a>
            </Link>
            </li>
            </ul>
            <div>
                <p>Name of existing Lab (if a lab of that name does not exist in the database this will not work)</p>
                <input
                    type="text"
                    placeholder="Lab name"
                    onChange={e => setLabName(e.target.value)}
                    value={labname}
                    />
            </div>
            <ul>
            <li>
            <Link href="/get-labs">
                <a target="_blank">Click here to see all labs in new tab</a>
            </Link>
            </li>
            </ul>
            <div>
                <p>Code for existing species (if a species of that code does not exist in the database this will not work)</p>
                <input
                    type="text"
                    placeholder="Species Code"
                    onChange={e => setSpecCode(e.target.value)}
                    value={speccode}
                    />
            </div>
            <ul>
            <li>
            <Link href="/get-plants">
                <a target="_blank">Click here to see all plants/codes in new tab</a>
            </Link>
            </li>
            </ul>
            <div>
            <p>Invalidity Date (format YYYY-MM-DD you DO type the dashes)</p>
                <input
                    type="text"
                    placeholder="Invalidity Date"
                    onChange={e => setInvalidDate(e.target.value)}
                    value={invaliddate}
                    />
            </div>
            <div>
            <p>Weight of Collection</p>
                <input
                    type="text"
                    placeholder="Weight"
                    onChange={e => setWeight(e.target.value)}
                    value={weight}
                    />
            </div>
            <div>
                <p>Viability percentage (0-100)</p>
                <input
                    type="text"
                    placeholder="Description"
                    onChange={e => setRate(e.target.value)}
                    value={rate}
                    />
            </div>
            <p>How was that percentage validated</p>
            <label className="container">Germination Trial
                <input type="radio" name="key" value="a" onClick={e => setMethod(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Tetrazolim chloride (quick germ test)
                <input type="radio" name="key" value="b" onClick={e => setMethod(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">X-ray (Bend extractory)
                <input type="radio" name="key" value="c" onClick={e => setMethod(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            
            <div className="radios">
                <p>Is the wight a PLS or bulk measurement</p>
            <label className="container">PLS
                <input type="radio" name="rate" value="true" onClick={e => setPls(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Bulk
                <input type="radio" name="rate" value="false" onClick={e => setPls(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            </div>
            <div>
            <p>Bulk Weight of lot</p>
                <input
                    type="text"
                    placeholder="Bulk Weight"
                    onChange={e => setBulk(e.target.value)}
                    value={bulk}
                    />
            </div>
            <div>
            <p>Purity rating (0-100)</p>
                <input
                    type="text"
                    placeholder="Purity"
                    onChange={e => setPurity(e.target.value)}
                    value={purity}
                    />
            </div>
            <div>
                <button type="submit">Add Lab Test Data</button>
            </div>
        </form>
        </Layout>
    );
}

export default SeedCol;
