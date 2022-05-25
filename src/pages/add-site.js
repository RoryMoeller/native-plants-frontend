import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

import useAPIRequest from '../hooks/useAPIRequest';

function Sites() {
    const [ownername, setOwnername] = useState("");
    const [sitename, setSitename] = useState("");
    const [aCode, setACode] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [rCode, setRCode] = useState("");

    async function postSite(e) {
        e.preventDefault();
        //let point = '(' + lat + ',' + long + ')'
        let point = lat +'@@' + long 
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "site",
                query_type: "INSERT",
                query_fields: ['owner_username','collection_site_name','accession_code','region_code','collection_site_lat_long'],
                query_values: [ownername, sitename,aCode,rCode, point],
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
            <div>
                <input
                    type="text"
                    placeholder="Latitude"
                    onChange={e => setLat(e.target.value)}
                    value={lat}
                    />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Longitude"
                    onChange={e => setLong(e.target.value)}
                    value={long}
                    />
            </div>
            <p>What is the accession code</p>
            <label className="container">Washington
                <input type="radio" name="radio" value="WA" onClick={e => setACode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Columbia River - Alsea River
                <input type="radio" name="radio" value="NC" onClick={e => setACode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Alsea River - Coos
                <input type="radio" name="radio" value="CC" onClick={e => setACode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Coos River - Winchuck River
                <input type="radio" name="radio" value="SC" onClick={e => setACode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">California
                <input type="radio" name="radio" value="CA" onClick={e => setACode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <p>What is the region code</p>
            <label className="container">Westport, WA - Ilwaco, WA
                <input type="radio" name="region" value="LB" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Astoria, OR - Seaside, OR
                <input type="radio" name="region" value="CP" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Seaside, OR - Tillamook, OR
                <input type="radio" name="region" value="NT" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Lincoln City, OR - Waldport, OR
                <input type="radio" name="region" value="WP" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Waldport, OR - Florence, OR
                <input type="radio" name="region" value="FL" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Florence, OR - Coos Bay, OR
                <input type="radio" name="region" value="CB" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Coos Bay, OR - Port Ordford, OR
                <input type="radio" name="region" value="PO" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Port Ordford, OR - Brookings, OR
                <input type="radio" name="region" value="BR" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Brookings, OR - Crescent City, OR
                <input type="radio" name="region" value="LE" onClick={e => setRCode(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <div>
                <button>Add Site</button>
            </div>
        </form>
        </Layout>
    );
}

export default Sites;
