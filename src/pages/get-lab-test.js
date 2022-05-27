import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../components/Navbar';
import Link from 'next/link';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Plants() {
    const [comname, setComname] = useState("");
    const [speccode, setSpecCode] = useState("");
    const [plantList, setPlantList] = useState([]);


    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function getSeeds(e) {
        e.preventDefault();
        let searchfront = '/api/accessBackend?query_string=SELECT '
        let searchback = ' FROM rev2.testing_history'
        var searchmid = '*'
        if (speccode !=""){
            searchback = searchback + " Where tested_collection = '" + speccode + "'"
        }
        let searchfinal = searchfront + searchmid + searchback
        console.log("== searching this: ", searchfinal);
        const res = await fetch(searchfinal,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Seeds"
            }
        )
        const resBody = await res.json();
        console.log(resBody);
        if (res.status >= 200 && res.status < 400) {
            setPlantList(resBody.data)
        } else {
            alert("Error: \n" + resBody.error)
        }
    }

    return (
        <Layout>
            <form onSubmit={getSeeds}>
                <div>
                    <a>Type here to filter, leave blank for no filter</a>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by tested collection ID"
                        onChange={e => setSpecCode(e.target.value)}
                        value={speccode}
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
                    <button>Get Lab test data</button>
                </div>
            </form>
            {(plantList && plantList.data) ? <TableView data={plantList.data} /> : <TableView data={[{ "Notice": "no data to display" }]} />}
        </Layout>
    );
}

export default Plants;
