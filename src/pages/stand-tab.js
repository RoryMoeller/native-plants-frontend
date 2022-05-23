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
        <Link href="/add-stand">
          <a>Add Stand</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/add-stand-history">
          <a>Add Stand History</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-stand">
          <a>See Stands</a>
        </Link>
      </li>
    </ul>
        </Layout>
    );
}
