import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css';
import Link from 'next/link';
import useAPIRequest from '../hooks/useAPIRequest';

function Sites() {
    const [date, setDate] = useState("");
    const [owner, setOwner] = useState("");
    const [notes, setNotes] = useState("");
    const [quantity, setQuantity] = useState("");
    const [code, setCode] = useState("");
    
    async function postWant(e) {
        e.preventDefault();
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "land_manager_want_list",
                query_type: "INSERT",
                query_fields: ['posted_date','posted_by','notes','wanted_quantity','wanted_species_code'],
                query_values: [date, owner, notes, quantity, code],
                has_point: true
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
        <form onSubmit={postWant} className={styles.container}>
            <div>
            <p>Enter your User Name</p>
                <input
                    type="text"
                    placeholder="User Name"
                    onChange={e => setOwner(e.target.value)}
                    value={owner}
                    />
            </div>
            <div>
            <p>Today&apos;s Date (YYYY-MM-DD DO type the dashes)</p>
                <input
                    type="text"
                    placeholder="Date"
                    onChange={e => setDate(e.target.value)}
                    value={date}
                    />
            </div>
            <div>
            <p>What is the Species Code of the plant you want</p>
                <input
                    type="text"
                    placeholder="Species Code"
                    onChange={e => setCode(e.target.value)}
                    value={code}
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
            <p>How much do you want (pounds)</p>
                <input
                    type="text"
                    placeholder="Quantity"
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity}
                    />
            </div>
            <div>
            <p>Any notes (short sentences)</p>
                <input
                    type="text"
                    placeholder="Notes"
                    onChange={e => setNotes(e.target.value)}
                    value={notes}
                    />
            </div>
            <div>
                <button>Add Request</button>
            </div>
        </form>
        </Layout>
    );
}

export default Sites;
