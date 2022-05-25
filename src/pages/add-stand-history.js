import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'
import Link from 'next/link';

import useAPIRequest from '../hooks/useAPIRequest';

function Stand() {
    const [standID, setStandID] = useState("");
    const [speciesCode, setSpeciesCode] = useState("");
    const [abundance, setAbundance] = useState("");
    const [firstDate, setFirstDate] = useState("");
    const [fate, setFate] = useState("");
    const [trips, setTrips] = useState("");
    const [long, setLong] = useState("");
    const [lat, setLat] = useState("");
    const [lastDate, setLastDate] = useState(""); 

    async function getData(){
        const reqData = {}
        let query = "/api/accessBackend?query_string=SELECT * from rev2.stand_to_plant_mapping WHERE stand_id = " +standID+ ""
        let res = await fetch(query,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Stand to plant map"
            }
        )
        if (res.status >= 200 && res.status < 400) {
            reqData.mapData = await res.json();
            console.log(reqData.mapData);
        } else {
            alert("Error: \n" + reqData.error)
            return {mapData:NULL}
        }
        return reqData
    }

    async function makeMap(){
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "stand_to_plant_mapping",
                query_type: "INSERT",
                query_fields: ['stand_id','plant_species_code', 'abundance'],
                query_values: [standID, speciesCode,abundance]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resBody = await res.json();
        console.log(resBody);
    }

    async function postStand(e) {
        e.preventDefault();
        let point = lat +'@@' + long 
        //make stand to plant map
        await makeMap()
        // get map data
        const data = await getData()
        //make stand collection history
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "stand_collection_history",
                query_type: "INSERT",
                query_fields: ['first_collected_date','fate','num_collection_trips','stand_plant_map_id','point_of_collection','last_collected_date'],
                query_values: [firstDate, fate,trips,data.mapData.data.data[0].stand_plant_id,point,lastDate]
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
            <p>ID of stand collection to connect to</p>
                <input
                    type="text"
                    placeholder="Stand ID"
                    onChange={e => setStandID(e.target.value)}
                    value={standID}
                    />
            </div>
            <ul>
            <li>
            <Link href="/get-stand">
                <a target="_blank">Click here to see all stands in new tab</a>
            </Link>
            </li>
            </ul>
            <div>
            <p>Species Code</p>
                <input
                    type="text"
                    placeholder="Species Code"
                    onChange={e => setSpeciesCode(e.target.value)}
                    value={speciesCode}
                    />
            </div>
            <ul>
            <li>
            <Link href="/get-plants">
                <a target="_blank">Click here to see all plants/codes in new tab</a>
            </Link>
            </li>
            </ul>
            <p>Level of Abundance</p>
            <label className="container">Patchy
                <input type="radio" name="key" value="Patchy" onClick={e => setAbundance(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Clumped
                <input type="radio" name="key" value="Clumped" onClick={e => setAbundance(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Random
                <input type="radio" name="key" value="Random" onClick={e => setAbundance(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <div>
            <p>Lattitude of collection site</p>
                <input
                    type="text"
                    placeholder="Latitude"
                    onChange={e => setLat(e.target.value)}
                    value={lat}
                    />
            </div>
            <div>
            <p>Longitude of collection site</p>
                <input
                    type="text"
                    placeholder="Longitude"
                    onChange={e => setLong(e.target.value)}
                    value={long}
                    />
            </div>
            <div>
            <p>First Collected Date</p>
                <input
                    type="text"
                    placeholder="First Date"
                    onChange={e => setFirstDate(e.target.value)}
                    value={firstDate}
                    />
            </div>
            <div>
            <p>Last Collected Date</p>
                <input
                    type="text"
                    placeholder="Last Date"
                    onChange={e => setLastDate(e.target.value)}
                    value={lastDate}
                    />
            </div>
            <div>
            <p>Total number of collections</p>
                <input
                    type="text"
                    placeholder="Number of trips"
                    onChange={e => setTrips(e.target.value)}
                    value={trips}
                    />
            </div>
            <div>
            <p>Where did the collection end up?</p>
                <input
                    type="text"
                    placeholder="Fate"
                    onChange={e => setFate(e.target.value)}
                    value={fate}
                    />
            </div>
            <div>
                <button>Add Stand History</button>
            </div>
        </form>
        </Layout>
    );
}

export default Stand;
