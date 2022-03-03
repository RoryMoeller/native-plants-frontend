import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Labs() {
    const [labname, setLabname] = useState("");
    const [labsearch, setLabsearch] = useState("");
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
        if (labsearch != "")
            var searchmid = labsearch
        let searchfinal = searchfront + searchmid + searchback
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
        setLabList(resBody.data)
    }

    return (
        <Layout>
            <form onSubmit={getLab}>
                <div>
                    <input
                        type="text"
                        placeholder="Lab name"
                        onChange={e => setLabname(e.target.value)}
                        value={labname}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                    // value={email}
                    // onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="radio"
                        id="Lab Name"
                        name="Search_choice"
                        onChange={e => setLabsearch(e.target.value)}
                        value="lab_name"
                    />
                    <label for="Lab Name">Lab_name</label><br></br>
                    <input
                        type="radio"
                        id="All"
                        name="Search_choice"
                        onChange={e => setLabsearch(e.target.value)}
                        value="*"
                    />
                    <label for="All">All</label><br></br>
                </div>
                <div>
                    <button>Get labs</button>
                </div>
            </form>
            <TableView data={labList.data} />
        </Layout>
    );
}

export default Labs;
