import { useState } from "react";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ wallet })
      });

      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <h2>Auracle 🔮</h2>
        <div>
          <button style={styles.navBtn}>Login</button>
          <button style={styles.navBtn}>Sign Up</button>
        </div>
      </div>

      <div style={styles.hero}>
        <h1 style={styles.title}>Predict Wallet Intelligence</h1>
        <p style={styles.subtitle}>
          Analyze wallets. Track behavior. Find alpha.
        </p>

        <div style={styles.inputBox}>
          <input
            placeholder="Enter wallet address..."
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            style={styles.input}
          />
          <button onClick={analyze} style={styles.button}>
            Analyze
          </button>
        </div>

        {loading && <p>Analyzing...</p>}
        {balance && <p>Balance: {balance}</p>}
      </div>

      <div style={styles.footer}>
        <p>© 2026 Auracle. All rights reserved.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #000000, #0f0f0f, #39ff14)",
    color: "white",
    minHeight: "100vh",
    fontFamily: "Arial",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  navBtn: {
    marginLeft: "10px",
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #39ff14",
    color: "#39ff14",
    cursor: "pointer",
  },
  hero: {
    textAlign: "center",
    marginTop: "100px",
  },
  title: {
    fontSize: "48px",
    color: "#39ff14",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  inputBox: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    padding: "12px",
    width: "300px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "12px",
    background: "#39ff14",
    border: "none",
    cursor: "pointer",
  },
  footer: {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    textAlign: "center",
    fontSize: "12px",
  },
};
