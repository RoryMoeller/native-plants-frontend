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
        <Link href="/add-farms">
          <a>Add Farm</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-farms">
          <a>See Farms</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/delete-farm">
          <a>Delete Farm</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/update-farm">
          <a>Update Farm</a>
        </Link>
      </li>
    </ul>
        </Layout>
    );
}
