import { useState, useEffect, useRef } from "react";

// Animated particle ring for the logo
function AuracleLogo({ size = 80 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      {/* Outer rotating ring */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        border: "1.5px solid transparent",
        background: "linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(135deg, #d4af37, #fff8dc, #d4af37) border-box",
        animation: "spinRing 8s linear infinite",
      }} />
      {/* Inner glow ring */}
      <div style={{
        position: "absolute", inset: 6, borderRadius: "50%",
        border: "1px solid rgba(212, 175, 55, 0.25)",
        animation: "spinRing 5s linear infinite reverse",
      }} />
      {/* Eye symbol */}
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        <svg width={size * 0.52} height={size * 0.35} viewBox="0 0 52 35" fill="none">
          {/* Eye outline */}
          <path d="M1 17.5C1 17.5 11 1 26 1C41 1 51 17.5 51 17.5C51 17.5 41 34 26 34C11 34 1 17.5 1 17.5Z"
            stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.9" />
          {/* Iris */}
          <circle cx="26" cy="17.5" r="8" stroke="#d4af37" strokeWidth="1.2" fill="rgba(212,175,55,0.08)" />
          {/* Pupil */}
          <circle cx="26" cy="17.5" r="3.5" fill="#d4af37" opacity="0.9" />
          {/* Glint */}
          <circle cx="28" cy="15.5" r="1" fill="white" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}

// Floating orb background
function OrbBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {/* Main golden orb */}
      <div style={{
        position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.02) 50%, transparent 70%)",
        animation: "breathe 6s ease-in-out infinite",
      }} />
      {/* Left accent */}
      <div style={{
        position: "absolute", top: "40%", left: "-10%",
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(180,120,30,0.05) 0%, transparent 70%)",
        animation: "drift 9s ease-in-out infinite",
      }} />
      {/* Right accent */}
      <div style={{
        position: "absolute", top: "30%", right: "-8%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
        animation: "drift 7s ease-in-out infinite reverse",
      }} />
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 100%)",
      }} />
      {/* Grain texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E\")",
        opacity: 0.4,
      }} />
    </div>
  );
}

// Stat card
function StatCard({ number, label, delay }) {
  return (
    <div style={{
      textAlign: "center", padding: "20px 16px",
      animation: `fadeUp 0.7s ease both`,
      animationDelay: delay,
    }}>
      <div style={{
        fontSize: 32, fontWeight: 800, fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#d4af37", letterSpacing: "-0.02em", lineHeight: 1,
      }}>{number}</div>
      <div style={{ fontSize: 12, color: "#5a5340", marginTop: 6, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>{label}</div>
    </div>
  );
}

// Feature pill
function FeaturePill({ icon, text, delay }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 18px", borderRadius: 999,
      border: "1px solid rgba(212,175,55,0.15)",
      background: "rgba(212,175,55,0.04)",
      fontSize: 13, color: "#a89060",
      animation: `fadeUp 0.6s ease both`,
      animationDelay: delay,
      backdropFilter: "blur(8px)",
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default function AuracleLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSignup = () => {
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #0a0a0f; }

        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.08); opacity: 0.7; }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(212,175,55,0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <OrbBackground />

      <div style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh",
        background: "transparent",
        display: "flex", flexDirection: "column",
        fontFamily: "'Jost', sans-serif",
        color: "#f0e8d0",
      }}>

        {/* Nav */}
        <nav style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 40px",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
          animation: "fadeIn 1s ease both",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, position: "relative" }}>
              <AuracleLogo size={28} />
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, fontWeight: 700,
              color: "#d4af37", letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>Auracle</span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["About", "Features", "Pricing"].map(item => (
              <a key={item} href="#" style={{
                color: "#5a5340", fontSize: 13, textDecoration: "none",
                letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#d4af37"}
                onMouseLeave={e => e.target.style.color = "#5a5340"}
              >{item}</a>
            ))}
            <button
              onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: "transparent", border: "1px solid rgba(212,175,55,0.4)",
                color: "#d4af37", padding: "8px 20px", borderRadius: 4,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.target.style.background = "rgba(212,175,55,0.1)"; e.target.style.borderColor = "#d4af37"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(212,175,55,0.4)"; }}
            >Early Access</button>
          </div>
        </nav>

        {/* Hero */}
        <main style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "60px 24px 40px",
        }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 999,
            border: "1px solid rgba(212,175,55,0.2)",
            background: "rgba(212,175,55,0.05)",
            fontSize: 11, color: "#a89060", letterSpacing: "0.15em",
            textTransform: "uppercase", fontWeight: 600, marginBottom: 40,
            animation: "fadeUp 0.6s ease 0.1s both",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4af37", display: "inline-block", animation: "pulseGold 2s ease infinite" }} />
            Now in Private Beta
          </div>

          {/* Logo Mark */}
          <div style={{ marginBottom: 36, animation: "fadeUp 0.8s ease 0.2s both" }}>
            <AuracleLogo size={96} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 8vw, 88px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 800,
            marginBottom: 8,
            animation: "fadeUp 0.8s ease 0.3s both",
          }}>
            <span style={{ color: "#f0e8d0" }}>The Market</span>
            <br />
            <span style={{
              background: "linear-gradient(90deg, #b8941e, #d4af37, #f5d76e, #d4af37, #b8941e)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>Speaks First.</span>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            fontStyle: "italic",
            color: "#6b5f40",
            marginBottom: 16,
            animation: "fadeUp 0.7s ease 0.35s both",
          }}>You just need to know how to listen.</p>

          {/* Sub-description */}
          <p style={{
            fontSize: 15, color: "#4a4030", lineHeight: 1.7,
            maxWidth: 480, marginBottom: 48,
            animation: "fadeUp 0.7s ease 0.4s both",
            fontWeight: 400,
          }}>
            Auracle tracks wallets, reads trends, and distills the noise into intelligence —
            so you always know what's moving before everyone else does.
          </p>

          {/* Feature Pills */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 10,
            justifyContent: "center", marginBottom: 52,
          }}>
            <FeaturePill icon="👁️" text="Wallet Intelligence" delay="0.45s" />
            <FeaturePill icon="⚡" text="Real-time Alerts" delay="0.5s" />
            <FeaturePill icon="🧠" text="AI Summaries" delay="0.55s" />
            <FeaturePill icon="📣" text="Auto Content" delay="0.6s" />
          </div>

          {/* Sign Up Form */}
          <div id="signup" style={{
            width: "100%", maxWidth: 460,
            animation: "fadeUp 0.8s ease 0.65s both",
          }}>
            {!submitted ? (
              <>
                <div style={{
                  display: "flex", gap: 0,
                  border: `1px solid ${focused ? "rgba(212,175,55,0.6)" : "rgba(212,175,55,0.2)"}`,
                  borderRadius: 8, overflow: "hidden",
                  background: "rgba(10,10,15,0.8)",
                  backdropFilter: "blur(12px)",
                  transition: "border-color 0.2s",
                  boxShadow: focused ? "0 0 0 3px rgba(212,175,55,0.08)" : "none",
                }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={e => e.key === "Enter" && handleSignup()}
                    style={{
                      flex: 1, background: "transparent", border: "none",
                      padding: "14px 18px", color: "#f0e8d0", fontSize: 14,
                      outline: "none", fontFamily: "'Jost', sans-serif",
                    }}
                  />
                  <button
                    onClick={handleSignup}
                    style={{
                      background: "linear-gradient(135deg, #b8941e, #d4af37)",
                      border: "none", padding: "14px 24px",
                      color: "#0a0a0f", fontSize: 13, fontWeight: 700,
                      cursor: "pointer", letterSpacing: "0.08em",
                      textTransform: "uppercase", fontFamily: "'Jost', sans-serif",
                      transition: "opacity 0.2s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => e.target.style.opacity = "0.9"}
                    onMouseLeave={e => e.target.style.opacity = "1"}
                  >
                    Get Access →
                  </button>
                </div>
                <p style={{ fontSize: 11, color: "#3a3020", marginTop: 12, letterSpacing: "0.06em" }}>
                  No spam. Early access only. Cancel anytime.
                </p>
              </>
            ) : (
              <div style={{
                padding: "20px 24px", borderRadius: 8,
                border: "1px solid rgba(212,175,55,0.3)",
                background: "rgba(212,175,55,0.05)",
                animation: "fadeIn 0.5s ease",
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>✨</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#d4af37", fontWeight: 600 }}>
                  You're on the list.
                </div>
                <div style={{ fontSize: 13, color: "#5a5340", marginTop: 6 }}>
                  We'll reach out when your access is ready.
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Stats Bar */}
        <div style={{
          borderTop: "1px solid rgba(212,175,55,0.08)",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          maxWidth: 640, margin: "0 auto 60px", width: "100%",
          animation: "fadeUp 0.8s ease 0.8s both",
        }}>
          <StatCard number="10K+" label="Wallets Tracked" delay="0.85s" />
          <div style={{ borderLeft: "1px solid rgba(212,175,55,0.08)", borderRight: "1px solid rgba(212,175,55,0.08)" }}>
            <StatCard number="< 2s" label="Alert Speed" delay="0.9s" />
          </div>
          <StatCard number="94%" label="Signal Accuracy" delay="0.95s" />
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: "center", padding: "24px",
          borderTop: "1px solid rgba(212,175,55,0.06)",
          animation: "fadeIn 1.2s ease 1s both",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 14, color: "#3a3020", letterSpacing: "0.12em", textTransform: "uppercase",
            }}>Auracle</span>
            <span style={{ color: "#2a2010", fontSize: 11 }}>·</span>
            <span style={{ fontSize: 11, color: "#2a2010" }}>Crypto Intelligence, Redefined</span>
          </div>
          <div style={{ fontSize: 11, color: "#2a2010", letterSpacing: "0.05em" }}>
            © 2026 Auracle. All rights reserved.
          </div>
        </footer>

      </div>
    </>
  );
              }
              
