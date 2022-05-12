//date, method of identifiction (3 types), cofidence of ID 1-3, cleaing effectiveness 1 of 4 types, cleaned weight
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

function SeedCol() {
    const [cleanWeight, setCleanWeight] = useState("");
    const [speccode, setSpecCode] = useState("");
    const [date, setDate] = useState("");
    const [method, setMethod] = useState("");
    const [siteName, setSitename] = useState("");
    const [confidence, setConfidence] = useState("");
    const [clean, setClean] = useState("");
    const [username, setUserName] = useState("");
    const [idname, setIdName] = useState("");
    const [desc, setDesc] = useState("");
    const [abund, setAbund] = useState("");

    async function getData(){
        const reqData = {}
        let query = "/api/accessBackend?query_string=SELECT * from rev2.plant WHERE species_code LIKE '" +speccode+ "'"
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
            reqData.plantData = await res.json();
            console.log(reqData.plantData);
        } else {
            alert("Error: \n" + reqData.error)
            return {plantData:NULL}
        }

        query = "/api/accessBackend?query_string=SELECT * from rev2.site WHERE collection_site_name LIKE '" +siteName+ "'"
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
            reqData.siteData = await res.json();
            console.log(reqData.siteData);
        } else {
            alert("Error: \n" + reqData.error)
            return {siteData:NULL, plantData:NULL}
        }
        return reqData
    }
    
    async function postSeedCol(e) {
        e.preventDefault();
        const data = await getData()
        if (idname == "")
            setIdName("NULL")
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "seed_collection",
                query_type: "INSERT",
                query_fields: ['col_species_code', 'cleaning_effectiveness', 'cleaned_weight', 'id_confidence','collected_date', 'id_method', 'col_provenance', 'owner_name', 'id_person_name'],
                query_values: [speccode, clean, cleanWeight, confidence, date, method, data.siteData.data.data[0].site_id, username, idname]
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
                <input
                    type="text"
                    placeholder="User name of owner"
                    onChange={e => setUserName(e.target.value)}
                    value={username}
                    />
            </div>
            <div>
                <p>Name of existing collection Site (if a site of that name does not exist in the database this will not work)</p>
                <input
                    type="text"
                    placeholder="Site name"
                    onChange={e => setSitename(e.target.value)}
                    value={siteName}
                    />
            </div>
            <div>
                <p>Description of area collected from, 50 letters or less(E.g.: relic dune, salt spray meadow, lowland prairie, headland, montane grassland)</p>
                <input
                    type="text"
                    placeholder="Description"
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                    />
            </div>
            <div>
                <p>Code for existing species (if a species of that code does not exist in the database this will not work)</p>
                <input
                    type="text"
                    placeholder="Species Code"
                    onChange={e => setSpecCode(e.target.value)}
                    value={speccode}
                    />
            </div>
            <div>
            <p>Collection Date (format YYYY-MM-DD you DO type the dashes)</p>
                <input
                    type="text"
                    placeholder="Collection Date"
                    onChange={e => setDate(e.target.value)}
                    value={date}
                    />
            </div>
            <div>
            <p>User name of person who identified the species. (leave blank if they are not a user)</p>
                <input
                    type="text"
                    placeholder="Name of Identifiyer"
                    onChange={e => setIdName(e.target.value)}
                    value={idname}
                    />
            </div>
            <p>How was the seed Identified</p>
            <label className="container">Dichotomous key
                <input type="radio" name="key" value="GK" onClick={e => setMethod(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Diagnostic Characteristics
                <input type="radio" name="key" value="GC" onClick={e => setMethod(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Gist
                <input type="radio" name="key" value="GI" onClick={e => setMethod(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <div>
                <input
                    type="text"
                    placeholder="Cofidence of Identification (scale of 1 to 3)"
                    onChange={e => setConfidence(e.target.value)}
                    value={confidence}
                    />
            </div>
            <div className="radios">
                <p>Please rate how well the seed was cleaned</p>
            <label className="container">Great
                <input type="radio" name="rate" value="a" onClick={e => setClean(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Good
                <input type="radio" name="rate" value="b" onClick={e => setClean(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">Fair
                <input type="radio" name="rate" value="c" onClick={e => setClean(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">None
                <input type="radio" name="rate" value="z" onClick={e => setClean(e.target.value)}/>
                <span className="checkmark"></span>
            </label>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Cleaned Weight"
                    onChange={e => setCleanWeight(e.target.value)}
                    value={cleanWeight}
                    />
            </div>
            <div>
                <button type="submit">Add Seed Collection</button>
            </div>
        </form>
        </Layout>
    );
}

export default SeedCol;
