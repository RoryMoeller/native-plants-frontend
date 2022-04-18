import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../components/Navbar.module.css'

export default function Lab() {

    return (
        <Layout>
        <ul className={styles.list}>
        <li className={styles.linkstyle}>
        <Link href="/add-lab">
          <a>Add Lab</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-labs">
          <a>See Labs</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/delete-lab">
          <a>Delete Lab</a>
        </Link>
      </li>
    </ul>
        </Layout>
    );
}
