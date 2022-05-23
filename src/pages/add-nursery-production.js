//date, method of identifiction (3 types), cofidence of ID 1-3, cleaing effectiveness 1 of 4 types, cleaned weight
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'
import Link from 'next/link';

function NursePro() {
    const [nurseName, setNurseName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [containYears, setContainYears] = useState("");
    const [conType, setConType] = useState("");
    const [available, setAvailable] = useState("");
    const [yearReady, setYearReady] = useState("");
    const [stockOwner, setStockOwner] = useState("");
    const [notes, setNotes] = useState("");


    async function getData(){
        const reqData = {}
        let query = "/api/accessBackend?query_string=SELECT * from rev2.nurseries WHERE nursery_name LIKE '" +nurseName+ "'"
        let res = await fetch(query,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Nurseries"
            }
        )
        if (res.status >= 200 && res.status < 400) {
            reqData.nurse = await res.json();
            console.log(reqData.nurse);
        } else {
            alert("Error: \n" + reqData.error)
            return {nurse:NULL}
        }

        query = "/api/accessBackend?query_string=SELECT * from rev2.users WHERE user_name LIKE '" +stockOwner+ "'"
        res = await fetch(query,
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
            return {owner:NULL, nurse:NULL}
        }
        return reqData
    }
    
    async function postNursePro(e) {
        e.preventDefault();
        const data = await getData()
        if ((!data.owner)||(!data.nurse))
            return 
        console.log('here')
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "nursery_production",
                query_type: "INSERT",
                query_fields: ['nursery_name', 'date_started', 'years_in_container', 'container_type','quantity_available', 'year_ready', 'owner_of_stock', 'extra_nursery_notes'],
                query_values: [nurseName, dateStart, containYears, conType, available, yearReady, stockOwner, notes]
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
        <form onSubmit={postNursePro} className={styles.container}>
        <div>
        <p>Name of existing Nursery (if a nursery of that name does not exist in the database this will not work)</p>
                <input
                    type="text"
                    placeholder="Name of Nursery"
                    onChange={e => setNurseName(e.target.value)}
                    value={nurseName}
                    />
            </div>
            <ul>
            <li>
            <Link href="/get-nursery">
                <a target="_blank">Click here to see all nurseries in new tab</a>
            </Link>
            </li>
            </ul>
            <div>
            <p>Start Date</p>
                <input
                    type="text"
                    placeholder="Date Started"
                    onChange={e => setDateStart(e.target.value)}
                    value={dateStart}
                    />
            </div>
            <div>
            <p>Years in Container</p>
                <input
                    type="text"
                    placeholder="years"
                    onChange={e => setContainYears(e.target.value)}
                    value={containYears}
                    />
            </div>
            <div className="radios">
                <p>Container Type</p>
            <label className="container">Tal Gal Pot
                <input type="radio" name="rate" value="Tal Gal Pot" onClick={e => setConType(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Rd Gal Pot
                <input type="radio" name="rate" value="RD Gal Pot" onClick={e => setConType(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">D 60 tube
                <input type="radio" name="rate" value="D 60 tube" onClick={e => setConType(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">D 16 tube
                <input type="radio" name="rate" value="D 16 tube" onClick={e => setConType(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">S C 10 tube
                <input type="radio" name="rate" value="S C 10 tube" onClick={e => setConType(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">S C 7 tube
                <input type="radio" name="rate" value="S C 7 tube" onClick={e => setConType(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            </div>
            <div>
            <p>Quantity Availble</p>
                <input
                    type="text"
                    placeholder="Amount"
                    onChange={e => setAvailable(e.target.value)}
                    value={available}
                    />
            </div>
            <div>
            <p>Year stock will be ready</p>
                <input
                    type="text"
                    placeholder="Year"
                    onChange={e => setYearReady(e.target.value)}
                    value={yearReady}
                    />
            </div>
            <div>
            <p>Username of stock owner (if a user of that name does not exist in the database this will not work)</p>
            <input
                    type="text"
                    placeholder="User Name"
                    onChange={e => setStockOwner(e.target.value)}
                    value={stockOwner}
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
                <button type="submit">Add Nursery Production</button>
            </div>
        </form>
        </Layout>
    );
}

export default NursePro;
