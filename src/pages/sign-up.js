import React, { useState } from 'react';
import Layout from '../components/Layout';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

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
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
            </div>
            <div>
                <a>Email</a>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>
            <div>
                <a>Password</a>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
            </div>
            <div>
                <button>Sign Up</button>
            </div>
        </form>
        </Layout>
    );
}

export default Signup;
