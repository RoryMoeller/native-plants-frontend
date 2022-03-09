import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';


export default function Navbar() {
  return (
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
    </ul>
  )
}