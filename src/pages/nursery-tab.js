import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

export default function Farm() {

    return (
        <Layout>
        <ul className={styles.list}>
        <li className={styles.linkstyle}>
        <Link href="/add-nursery">
          <a>Add Nursery</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-nursery">
          <a>See Nurseries</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/delete-nursery">
          <a>Delete Nursery</a>
        </Link>
      </li>
    </ul>
        </Layout>
    );
}
