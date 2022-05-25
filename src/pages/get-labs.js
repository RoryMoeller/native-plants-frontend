import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Labs() {
    const [labname, setLabname] = useState("");
    const [email, setEmail] = useState("");
    const [labList, setLabList] = useState([]);



    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function getLab(e) {
        e.preventDefault();
        console.log("== Adding lab with these parameters:", labname, email);
        let searchfront = '/api/accessBackend?query_string=SELECT '
        let searchback = ' FROM rev2.lab'
        var searchmid = '*'
        if (labname !=""){
            searchback = searchback + " Where lab_name LIKE '" + labname + "'"
        }
        let searchfinal = searchfront + searchmid + searchback
        console.log("== searching this: ", searchfinal);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{
        const res = await fetch(searchfinal,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: "Labs"
            }
        )
        const resBody = await res.json();
        console.log(resBody);
        if (res.status >= 200 && res.status < 400) {
            setLabList(resBody.data)
        } else {
            alert("Error: \n" + resBody.error)
        }
    }

    return (
        <Layout>
            <form onSubmit={getLab}>
                <div>
                    <a>Type here to filter, leave blank for no filter</a>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search by lab name"
                        onChange={e => setLabname(e.target.value)}
                        value={labname}
                    />
                </div>
                <div>
                    <button>Get labs</button>
                </div>
            </form>
            {(labList && labList.data) ? <TableView data={labList.data} /> : <TableView data={[{ "Notice": "no data to display" }]} />}
        </Layout>
    );
}

export default Labs;
