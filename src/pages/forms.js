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
        <Link href="/sign-up">
          <a>Sign up</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/add-farms">
          <a>Add Farm</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/add-lab">
          <a>Add Lab</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/login">
          <a>Add stock</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/add-nursery" className={styles.linkstyle}>
          <a>Add nursery</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-plants">
          <a>Get Plants</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/forms">
          <a>Forms</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-users">
          <a>Users</a>
        </Link>
      </li>
    </ul>
        </Layout>
    );
}
