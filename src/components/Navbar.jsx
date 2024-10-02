// src/components/Navbar.jsx
"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li>
          <Link href="/" style={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link href="/about" style={styles.navLink}>About</Link>
        </li>
        <li>
          <Link href="/blog" style={styles.navLink}>Blog</Link> {/* Add Blog link here */}
        </li>
        <li>
          <Link href="/contact" style={styles.navLink}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#333",
    padding: "1rem",
    color: "#fff",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    gap: "1rem",
    padding: 0,
    margin: 0,
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Navbar;
