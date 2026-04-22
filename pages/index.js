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
}    }}>
      
      {/* Logo / Title */}
      <h1 style={{ fontSize: 40, marginBottom: 10 }}>
        Auracle 🔮
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: 30 }}>
        Track wallets. Spot smart money. Stay ahead.
      </p>

      {/* Input Section */}
      <div style={{
        display: "flex",
        gap: 10,
        background: "#020617",
        padding: 10,
        borderRadius: 12,
        border: "1px solid #1e293b"
      }}>
        <input
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Enter wallet address"
          style={{
            padding: 10,
            width: 280,
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#020617",
            color: "white"
          }}
        />

        <button
          onClick={analyze}
          style={{
            background: "#6366f1",
            border: "none",
            padding: "10px 16px",
            borderRadius: 8,
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Analyze
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ marginTop: 20, color: "#6366f1" }}>
          Analyzing wallet...
        </p>
      )}

      {/* Result */}
      {result && (
        <div style={{
          marginTop: 30,
          background: "#020617",
          border: "1px solid #1e293b",
          padding: 20,
          borderRadius: 12,
          maxWidth: 400,
          textAlign: "center"
        }}>
          {result}
        </div>
      )}

    </div>
  );
}      <button onClick={analyze}>
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
