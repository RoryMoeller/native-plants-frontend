import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

export default function Home() {
    const [user, setUser] = useState({});
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/user');
            const body = await res.json();
            setUser(body);
        }
        fetchData();
    }, []);

    function goToGetFarms(){
        router.push('/get-farms')
    }

    return (
        <Layout className={styles.layoutstyle}>
            <h1>Welcome To Seedbay</h1>
            {user.name && <p>Name: {user.name}</p>}
            {user.email && <p>Email: {user.email}</p>}
            <button onClick={goToGetFarms}>get farms</button>
        </Layout>
    );
}
