import React, { useState } from 'react';

import useAPIRequest from '../hooks/useAPIRequest';

function Farms() {
    const [farmname, setFarmname] = useState("");
    const [email, setEmail] = useState("");
    const [res, loading, error] = useAPIRequest(`https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /${farmname}`)
    async function addFarm(e) {
        e.preventDefault();
        console.log("== Adding farm with these parameters:", farmname, email);
        
        /* const res = await fetch('https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name) VALUES (%s) /'+farmname,{
            method: "POST",
            body: JSON.stringify({ farmname,email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resBody = await res.json();
        console.log(resBody); */
        /* if (res.status !== 200) {
            alert("Credentials invalid: " + resBody.err)
        } else {
            console.log("== resBody:", resBody);
            console.log("== document.cookie:", document.cookie);
            // window.localStorage.setItem('token', resBody.token)
        } */
    }

    //https://native-plants-backend.herokuapp.com/q/SELECT farm_name, farm_location, contact_email FROM rev2.farms

    return (
        <div>
        <form onSubmit={addFarm}>
            <div>
                <input
                    type="text"
                    placeholder="Farm name"
                    value={farmname}
                    onChange={e => setFarmname(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <button>Add farm</button>
            </div>
        </form>
        {!error && !loading && JSON.stringify(res)}
        </div>
    );
}

export default Farms;
