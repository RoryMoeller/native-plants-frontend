import React, { useState } from 'react';
import Layout from '../components/Layout';

import useAPIRequest from '../hooks/useAPIRequest';

import TableView from '../components/TableView';

function Labs() {
    const [labname, setLabname] = useState("");
    const [labsearch1, setLabsearch1] = useState("");
    const [labsearch2, setLabsearch2] = useState("");
    const [email, setEmail] = useState("");
    const [labList, setLabList] = useState([]);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleOnChange1 = () => {
        setIsChecked1(!isChecked1);
    };
    const handleOnChange2 = () => {
        setIsChecked2(!isChecked2);
    };

    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname_to_send}`, "POST");
    // const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/q/SELECT * FROM rev2.farms`, "GET");
    async function getLab(e) {
        e.preventDefault();
        console.log("== Adding lab with these parameters:", labname, email);
        let searchfront = '/api/accessBackend?query_string=SELECT '
        let searchback = ' FROM rev2.lab'
        var searchmid = '*'
        if (isChecked1){
            //console.log("======= check1")
            searchmid = "lab_name"
            if (isChecked2){
                //console.log("======= check1 and 2")
                searchmid = searchmid +", contact_email"
            }
        }
        else if (isChecked2){
            searchmid = "contact_email"
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
                        type="checkbox"
                        id="Lab Name"
                        name="search_choice1"
                        //onChange={e => setLabsearch1(e.target.value)}
                        value="lab_name"
                        checked={isChecked1}
                        onChange={handleOnChange1}
                    />
                    <label htmlFor="Lab Name">Lab_name</label><br></br>
                    <input
                        type="checkbox"
                        id="contactEmail"
                        name="Search_choice2"
                        //onChange={e => setLabsearch2(e.target.value)}
                        value="contact_email"
                        checked={isChecked2}
                        onChange={handleOnChange2}
                    />
                    <label htmlFor="contactEmail">Email</label><br></br>
                </div>
                <div>
                    <button>Get labs</button>
                </div>
            </form>
            <div className="result">
                Above checkbox is {isChecked1 ? "checked" : "un-checked"}.
                Above checkbox is {isChecked2 ? "checked" : "un-checked"}.
            </div>
            <TableView data={labList.data} />
        </Layout>
    );
}

export default Labs;
