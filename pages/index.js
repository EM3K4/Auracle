import { useState, useEffect, useRef } from "react";

/* ─── ANIMATED GRID + PARTICLE BACKGROUND ─── */
function Background() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(137,243,54,0.04)";
      ctx.lineWidth = 1;
      const gs = 80;
      for (let x = 0; x < canvas.width; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(137,243,54,${p.alpha})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(137,243,54,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ─── SCROLL FADE HOOK ─── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = "0s", style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── LOGO ─── */
function Logo({ size = 32 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#89F336" strokeWidth="1.5" opacity="0.4" />
        <circle cx="20" cy="20" r="12" stroke="#89F336" strokeWidth="1" opacity="0.6" />
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#89F336" strokeWidth="1" opacity="0.3" />
        <circle cx="20" cy="20" r="4" fill="#89F336" opacity="0.9" />
        <circle cx="21.5" cy="18.5" r="1.2" fill="white" opacity="0.7" />
      </svg>
      <span style={{
        fontSize: size * 0.6, fontWeight: 800, letterSpacing: "-0.01em",
        fontFamily: "'Syne', sans-serif", color: "#f0f4f0",
      }}>
        Aur<span style={{ color: "#89F336" }}>acle</span>
      </span>
    </div>
  );
}

/* ─── LIVE TICKER ─── */
const TICKERS = [
  { label: "ETH Whale Alert", sub: "5,200 ETH → Binance", delta: "-4.1%", up: false },
  { label: "ARB Smart Money", sub: "Accumulating quietly", delta: "+18.3%", up: true },
  { label: "PEPE Trend", sub: "Volume spike detected", delta: "+41%", up: true },
  { label: "BTC Wallet #9f2a", sub: "New 500 BTC position", delta: "+2.8%", up: true },
  { label: "SOL Sell-off", sub: "3 whales exiting", delta: "-9.2%", up: false },
];

function Ticker() {
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(137,243,54,0.08)", borderBottom: "1px solid rgba(137,243,54,0.08)", padding: "10px 0", background: "rgba(137,243,54,0.02)" }}>
      <div style={{ display: "flex", gap: 48, animation: "scrollTicker 22s linear infinite", width: "max-content" }}>
        {[...TICKERS, ...TICKERS].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.up ? "#89F336" : "#f87171", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>{t.label}</span>
            <span style={{ fontSize: 12, color: "#475569" }}>·</span>
            <span style={{ fontSize: 12, color: "#64748b" }}>{t.sub}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.up ? "#89F336" : "#f87171", fontFamily: "'DM Mono', monospace" }}>{t.delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FEATURE CARD ─── */
function FeatureCard({ icon, title, desc, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "28px 26px",
          borderRadius: 16,
          border: `1px solid ${hovered ? "rgba(137,243,54,0.3)" : "rgba(255,255,255,0.06)"}`,
          background: hovered ? "rgba(137,243,54,0.04)" : "rgba(255,255,255,0.02)",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
          boxShadow: hovered ? "0 0 30px rgba(137,243,54,0.06)" : "none",
          cursor: "default",
        }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "rgba(137,243,54,0.08)",
          border: "1px solid rgba(137,243,54,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, marginBottom: 18,
          transition: "background 0.3s",
          ...(hovered ? { background: "rgba(137,243,54,0.15)" } : {}),
        }}>{icon}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f4f0", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{title}</div>
        <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{desc}</div>
      </div>
    </FadeIn>
  );
}

/* ─── STEP CARD ─── */
function StepCard({ number, title, desc, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
          border: "1px solid rgba(137,243,54,0.4)",
          background: "rgba(137,243,54,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: "#89F336",
        }}>{number}</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f4f0", marginBottom: 6, fontFamily: "'Syne', sans-serif" }}>{title}</div>
          <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{desc}</div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── STAT ─── */
function Stat({ value, label, delay }) {
  return (
    <FadeIn delay={delay} style={{ textAlign: "center" }}>
      <div style={{
        fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 800,
        fontFamily: "'Syne', sans-serif", color: "#89F336",
        letterSpacing: "-0.03em", lineHeight: 1,
      }}>{value}</div>
      <div style={{ fontSize: 13, color: "#475569", marginTop: 8, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{label}</div>
    </FadeIn>
  );
}

/* ─── BUTTONS ─── */
function PrimaryBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#9dff4a" : "#89F336",
        color: "#020617", border: "none", borderRadius: 10,
        padding: "14px 28px", fontSize: 15, fontWeight: 800,
        cursor: "pointer", fontFamily: "'Syne', sans-serif",
        letterSpacing: "0.01em",
        boxShadow: hov ? "0 0 30px rgba(137,243,54,0.45), 0 0 60px rgba(137,243,54,0.15)" : "0 0 20px rgba(137,243,54,0.2)",
        transition: "all 0.2s ease",
        transform: hov ? "translateY(-1px)" : "none",
      }}>{children}</button>
  );
}

function OutlineBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "transparent",
        color: hov ? "#89F336" : "#94a3b8",
        border: `1px solid ${hov ? "rgba(137,243,54,0.5)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600,
        cursor: "pointer", fontFamily: "'Syne', sans-serif",
        transition: "all 0.2s ease",
      }}>{children}</button>
  );
}

/* ─── EMAIL CAPTURE ─── */
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [focused, setFocused] = useState(false);
  return done ? (
    <div style={{
      padding: "16px 28px", borderRadius: 12,
      border: "1px solid rgba(137,243,54,0.3)",
      background: "rgba(137,243,54,0.06)",
      color: "#89F336", fontWeight: 700, fontSize: 15,
      fontFamily: "'Syne', sans-serif", textAlign: "center",
    }}>✓ You're on the list. We'll reach out soon.</div>
  ) : (
    <div style={{ display: "flex", gap: 0, maxWidth: 460, width: "100%", borderRadius: 10, overflow: "hidden", border: `1px solid ${focused ? "rgba(137,243,54,0.4)" : "rgba(255,255,255,0.08)"}`, transition: "border-color 0.2s", boxShadow: focused ? "0 0 0 3px rgba(137,243,54,0.06)" : "none" }}>
      <input
        type="email" placeholder="Enter your email"
        value={email} onChange={e => setEmail(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onKeyDown={e => e.key === "Enter" && email && setDone(true)}
        style={{ flex: 1, background: "rgba(2,6,23,0.8)", border: "none", padding: "14px 18px", color: "#f0f4f0", fontSize: 14, outline: "none", fontFamily: "'DM Mono', monospace" }}
      />
      <button onClick={() => email && setDone(true)} style={{ background: "#89F336", color: "#020617", border: "none", padding: "14px 22px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap" }}>
        Get Access →
      </button>
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export default function AuracleLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #020617; color: #f0f4f0; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #020617; } ::-webkit-scrollbar-thumb { background: rgba(137,243,54,0.2); border-radius: 99px; }
        @keyframes scrollTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseGreen { 0%,100% { box-shadow: 0 0 0 0 rgba(137,243,54,0.4); } 50% { box-shadow: 0 0 0 10px rgba(137,243,54,0); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes glowPulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
      `}</style>

      <Background />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 32px",
        height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(2,6,23,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(137,243,54,0.08)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <Logo />
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Features", "How It Works", "Stats"].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(/ /g, "-"))}
              style={{ background: "none", border: "none", color: "#64748b", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#f0f4f0"}
              onMouseLeave={e => e.target.style.color = "#64748b"}
            >{item}</button>
          ))}
          <PrimaryBtn onClick={() => scrollTo("cta")}>Get Early Access</PrimaryBtn>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px", textAlign: "center" }}>

        {/* Glow orb behind headline */}
        <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(137,243,54,0.07) 0%, transparent 70%)", pointerEvents: "none", animation: "glowPulse 4s ease-in-out infinite" }} />

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(137,243,54,0.2)", background: "rgba(137,243,54,0.04)", fontSize: 12, color: "#89F336", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 36, animation: "fadeUp 0.6s ease 0.1s both" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#89F336", display: "inline-block", animation: "pulseGreen 2s ease infinite" }} />
          Now accepting early access
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 7vw, 82px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", maxWidth: 860, marginBottom: 24, animation: "fadeUp 0.7s ease 0.2s both" }}>
          Track Smart Money<br />
          <span style={{ color: "#89F336", textShadow: "0 0 40px rgba(137,243,54,0.3)" }}>Before It Moves Markets.</span>
        </h1>

        {/* Sub */}
        <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#64748b", maxWidth: 520, lineHeight: 1.7, marginBottom: 48, animation: "fadeUp 0.7s ease 0.3s both" }}>
          Auracle monitors elite wallets, detects early signals, and turns raw blockchain data into actionable intelligence — in real time.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 64, animation: "fadeUp 0.7s ease 0.4s both" }}>
          <PrimaryBtn onClick={() => scrollTo("cta")}>Start Tracking →</PrimaryBtn>
          <OutlineBtn onClick={() => scrollTo("how-it-works")}>See How It Works</OutlineBtn>
        </div>

        {/* Mock terminal card */}
        <div style={{ animation: "fadeUp 0.8s ease 0.5s both, float 5s ease-in-out infinite", width: "100%", maxWidth: 640 }}>
          <div style={{ borderRadius: 16, border: "1px solid rgba(137,243,54,0.12)", background: "rgba(2,6,23,0.85)", backdropFilter: "blur(20px)", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(137,243,54,0.05)" }}>
            {/* Terminal bar */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f87171", opacity: 0.7 }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#facc15", opacity: 0.7 }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#89F336", opacity: 0.7 }} />
              <span style={{ marginLeft: 8, fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace" }}>auracle — live intelligence feed</span>
            </div>
            {/* Rows */}
            {[
              { wallet: "0x3b4c…a1f2", action: "Accumulated 12,000 ARB", time: "just now", delta: "+18.3%", up: true },
              { wallet: "0x9fa1…2b3c", action: "Opened 500 ETH long position", time: "2m ago", delta: "+2.1%", up: true },
              { wallet: "0x1a7e…9c0d", action: "Exiting PEPE — 40M tokens sold", time: "5m ago", delta: "-6.4%", up: false },
              { wallet: "0xc3b2…7e8f", action: "BTC whale moved to cold storage", time: "9m ago", delta: "+0.8%", up: true },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", borderBottom: "1px solid rgba(255,255,255,0.03)", gap: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: row.up ? "#89F336" : "#f87171", flexShrink: 0, boxShadow: row.up ? "0 0 8px rgba(137,243,54,0.6)" : "0 0 8px rgba(248,113,113,0.6)" }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#89F336", flexShrink: 0 }}>{row.wallet}</span>
                  <span style={{ fontSize: 13, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.action}</span>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: row.up ? "#89F336" : "#f87171" }}>{row.delta}</span>
                  <span style={{ fontSize: 11, color: "#334155" }}>{row.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ position: "relative", zIndex: 1 }}><Ticker /></div>

      {/* ── STATS ── */}
      <section id="stats" style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={{ maxW
