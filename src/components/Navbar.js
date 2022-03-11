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
        <Link href="/add-farms">
          <a>Add Farm</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-farms">
          <a>Get Farm</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
      <li className={styles.linkstyle}>
        <Link href="/get-labs" className={styles.linkstyle}>
          <a>Get Labs</a>
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
        <Link href="/admin">
          <a onClick={() => setFmode(s => !s)}>Admin</a>
        </Link>
      </li>

      </ul>
      </center>
      <ul  className={Fmode ? 'hidden' : 'show'}>
      <li className={styles.linkstyle}>
        <Link href="/add-farm">
          <a>Add Farm</a>
        </Link>
      </li>
      </ul>
    </div>
  )
}