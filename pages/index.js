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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet }),
      });

      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Auracle 🔮</h1>

      <input
        placeholder="Enter wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={{ padding: 10, width: 300 }}
      />

      <br /><br />

      <button onClick={analyze}>Analyze</button>

      {loading && <p>Analyzing...</p>}

      {balance && <p>Balance: {balance} ETH</p>}
    </div>
  );
      }
