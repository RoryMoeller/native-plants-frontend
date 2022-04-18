import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';


export default function Navbar() {
  const [Fmode, setFmode] = useState(false);

  return (
    <div>
    <center>
    <ul >
      <li className={styles.linkstyle}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/farm-tab">
          <a>Farm</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/lab-tab" className={styles.linkstyle}>
          <a>Lab</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-plants">
          <a>Get Plants</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/nursery-tab">
          <a>Nursery</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/admin">
          <a onClick={() => setFmode(s => !s)}>Admin</a>
        </Link>
      </li>
      </ul>
      </center>
    </div>
  )
}