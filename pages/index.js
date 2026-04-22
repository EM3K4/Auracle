import { useState } from "react";

export default function Home() {
  return (
    <div style={styles.container}>
      
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>Auracle 🔮</h2>
        <div>
          <button style={styles.navBtn}>Sign In</button>
          <button style={styles.navBtn}>Sign Up</button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Decode Wallet Intelligence
        </h1>
        <p style={styles.subtitle}>
          Track wallets. Spot alpha. Move before the market.
        </p>

        <button style={styles.cta}>
          Launch App
        </button>
      </div>

      {/* FEATURES */}
      <div style={styles.section}>
        <h2>What is Auracle?</h2>
        <p>
          Auracle analyzes blockchain wallets to reveal hidden insights,
          smart money moves, and alpha opportunities before everyone else.
        </p>
      </div>

      <div style={styles.section}>
        <h2>Features</h2>
        <ul>
          <li>Wallet tracking</li>
          <li>Balance insights</li>
          <li>Smart money detection</li>
          <li>Real-time analytics</li>
        </ul>
      </div>

      {/* CONTACT */}
      <div style={styles.section}>
        <h2>Contact</h2>
        <p>Email: auracle@proton.me</p>
        <p>Twitter: @0xEM3KA</p>
        <p>Discord: Coming soon</p>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © 2026 Auracle. All rights reserved.
      </div>

    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #000000, #0f0f0f, #0aff9d)",
    color: "white",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    backdropFilter: "blur(10px)",
  },

  logo: {
    color: "#0aff9d",
  },

  navBtn: {
    marginLeft: 10,
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #0aff9d",
    color: "#0aff9d",
    cursor: "pointer",
  },

  hero: {
    textAlign: "center",
    marginTop: 100,
  },

  title: {
    fontSize: 48,
    color: "#0aff9d",
  },

  subtitle: {
    fontSize: 18,
    opacity: 0.8,
  },

  cta: {
    marginTop: 20,
    padding: "12px 24px",
    background: "#0aff9d",
    color: "black",
    border: "none",
    cursor: "pointer",
  },

  section: {
    marginTop: 100,
    padding: "0 40px",
  },

  footer: {
    marginTop: 100,
    textAlign: "center",
    padding: 20,
    opacity: 0.6,
  },
};
