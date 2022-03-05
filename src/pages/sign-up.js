import React, { useState } from 'react';
import Layout from '../components/Layout';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");

    async function handleSignup(e) {
        e.preventDefault();
        console.log("== Logging in with these credentials:", username, password);
        const res = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resBody = await res.json();
        if (res.status !== 200) {
            alert("Credentials invalid: " + resBody.err)
        } else {
            console.log("== resBody:", resBody);
            console.log("== document.cookie:", document.cookie);
            // window.localStorage.setItem('token', resBody.token)
        }
    }

    return (
        <Layout>
        <form onSubmit={handleSignup}>
            <div>
                <a>Username</a>
                <input
                    type="text"
                    placeholder="user_name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
            </div>
            <div>
                <a>Email</a>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>
            <div>
                <a>Password</a>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
            </div>
            <div>
                <label for="phone">Enter your phone number:</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                <small>Format: 123-456-7890</small><br></br>
            </div>
            <div>
                <a>Website (optional)</a>
                <input
                    type="text"
                    placeholder="website"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    />
            </div>
            <div>
                <label for="w3review">Bio (optional)</label>
                <textarea id="w3review" name="w3review" rows="4" cols="50"/>
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
