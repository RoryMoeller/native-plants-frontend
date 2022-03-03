import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/add-farms">
          <a>Add Farm</a>
        </Link>
      </li>
      <li>
        <Link href="/get-farms">
          <a>Get Farm</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
    </ul>
  )
}