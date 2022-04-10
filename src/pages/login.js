import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { data: session } = useSession();
    if (session) {
        return (
            <Layout>
                <h1>You are logged in!</h1>
                <button onClick={signOut}>Sign out</button>
            </Layout>
        );
    }

    async function handleLogin(e) {
        e.preventDefault();
        console.log("== Logging in with these credentials:", username, password);
        signIn();
    }

    return (
        <Layout>
        <form onSubmit={handleLogin}>
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
                <a>Password</a>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
        <div>
            <Link href="/sign-up">
            <a>Sign up</a>
            </Link>
        </div>
        </Layout>
    );
}

export default Login;
