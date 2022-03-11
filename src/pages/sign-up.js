import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [bio, setBio] = useState("");

    async function handleSignup(e) {
        e.preventDefault();
        e.preventDefault();
        const usertype = 0
        console.log("== Adding user with these parameters:", username, email, password, website, bio);
        //const res = await fetch('/api/accessBackend/https://native-plants-backend.herokuapp.com/i/INSERT INTO rev2.farms(farm_name, contact_email) VALUES (%s) /'+farmname+', '+farmeamil,{
        const res = await fetch('/api/accessBackend', {
            method: 'POST',
            body: JSON.stringify( {
                table_name: "users",
                query_type: "INSERT",
                query_fields: ['user_name','email','password_hash','website','user_role_type','bio'],
                query_values: [username, email,password,website,usertype,bio]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resBody = await res.json();
        console.log(resBody);
        console.log("== document.cookie:", document.cookie);
        // window.localStorage.setItem('token', resBody.token)
    }

    return (
        <Layout>
        <form onSubmit={handleSignup} className={styles.container}>
            <div>
                <a>Username</a>
                <input
                    type="text"
                    placeholder="user_name"
                    value={username}
                    className={styles.inputs}
                    onChange={e => setUsername(e.target.value)}
                    />
            </div>
            <div>
                <a>Email</a>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    className={styles.inputs}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>
            <div>
                <a>Password</a>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    className={styles.inputs}
                    onChange={e => setPassword(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="phone">Enter your phone number:</label>
                <input className={styles.inputs} type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                <small>Format: 123-456-7890</small><br></br>
            </div>
            <div>
                <a>Website (optional)</a>
                <input
                    type="text"
                    placeholder="website"
                    value={website}
                    className={styles.inputs}
                    onChange={e => setWebsite(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="bio">Bio (optional)</label>
                <textarea className={styles.textareas} id="bio" rows="4" cols="50" onChange={e => setBio(e.target.value)}>Enter Bio</textarea>
                <br></br>
            </div>
            <div>
                <button>Sign Up</button>
            </div>
        </form>
        </Layout>
    );
}

export default Signup;
