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
        <Link href="/add-plant">
          <a>Add Plant</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-plants">
          <a>See Plants</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/delete-plant">
          <a>Delete Plant</a>
        </Link>
      </li>
    </ul>
        </Layout>
    );
}
