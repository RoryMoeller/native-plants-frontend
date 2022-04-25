import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

export default function Forms() {

    return (
        <Layout>
        <ul className={styles.list}>
      <li className={styles.linkstyle}>
        <Link href="/update-users">
          <a>Update User</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-users">
          <a>See users</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/delete-user">
          <a>Del User</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/add-site">
          <a>Add site</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/delete">
          <a>Delete</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/add-seed-col">
          <a>Add seed Colleciton</a>
        </Link>
      </li>
    </ul>
        </Layout>
    );
}
