import { useState } from "react";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!wallet) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ wallet })
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("Error fetching data");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Auracle 🔮</h1>

      <input
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Enter wallet address"
        style={{ padding: 10, width: 300 }}
      />

      <button onClick={analyze} style={{ marginLeft: 10 }}>
        Analyze
      </button>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
               }
