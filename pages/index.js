import { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:    #07090d;
    --surface:  #0c0f14;
    --glass:    rgba(255,255,255,0.03);
    --border:   rgba(255,255,255,0.07);
    --green:    #00d084;
    --green-dim:#007a4d;
    --green-glow: rgba(0,208,132,0.18);
    --green-glow-sm: rgba(0,208,132,0.08);
    --text:     #e8ebe8;
    --muted:    #7a8a80;
    --mono:     'DM Mono', monospace;
    --display:  'Syne', sans-serif;
    --body:     'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--text);
    font-family: var(--body);
    font-weight: 300;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  #canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 48px;
    border-bottom: 1px solid transparent;
    transition: border-color 0.4s, background 0.4s, backdrop-filter 0.4s;
  }
  nav.scrolled {
    background: rgba(7,9,13,0.82);
    border-color: var(--border);
    backdrop-filter: blur(20px);
  }

  .nav-logo {
    font-family: var(--display);
    font-weight: 800;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
    color: #fff;
    text-decoration: none;
  }
  .nav-logo span { color: var(--green); }

  .nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
  }
  .nav-links a {
    font-family: var(--body);
    font-size: 0.82rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--text); }

  .nav-cta {
    font-family: var(--body);
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--black);
    background: var(--green);
    border: none;
    padding: 9px 22px;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    transition: box-shadow 0.25s, transform 0.2s;
  }
  .nav-cta:hover {
    box-shadow: 0 0 22px var(--green-glow), 0 0 6px rgba(0,208,132,0.4);
    transform: translateY(-1px);
  }

  section { position: relative; z-index: 1; }

  #hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 140px 48px 100px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 30px;
    opacity: 0;
    transform: translateY(14px);
    animation: fadeUp 0.8s 0.2s forwards;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 28px; height: 1px;
    background: var(--green);
  }

  .hero-headline {
    font-family: var(--display);
    font-size: clamp(2.8rem, 6vw, 5.2rem);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.03em;
    color: #fff;
    max-width: 820px;
    margin-bottom: 28px;
    opacity: 0;
    transform: translateY(18px);
    animation: fadeUp 0.9s 0.35s forwards;
  }
  .hero-headline em {
    font-style: normal;
    color: var(--green);
    position: relative;
  }

  .hero-sub {
    font-size: 1.05rem;
    font-weight: 300;
    color: var(--muted);
    max-width: 500px;
    line-height: 1.65;
    margin-bottom: 44px;
    opacity: 0;
    transform: translateY(14px);
    animation: fadeUp 0.9s 0.5s forwards;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 18px;
    opacity: 0;
    transform: translateY(12px);
    animation: fadeUp 0.9s 0.65s forwards;
  }

  .btn-primary {
    font-family: var(--body);
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--black);
    background: var(--green);
    border: none;
    padding: 14px 32px;
    border-radius: 7px;
    cursor: pointer;
    text-decoration: none;
    transition: box-shadow 0.3s, transform 0.2s;
  }
  .btn-primary:hover {
    box-shadow: 0 0 32px rgba(0,208,132,0.45), 0 0 8px rgba(0,208,132,0.3);
    transform: translateY(-2px);
  }

  .btn-secondary {
    font-family: var(--body);
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: var(--muted);
    background: transparent;
    border: 1px solid var(--border);
    padding: 14px 30px;
    border-radius: 7px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s;
  }
  .btn-secondary:hover {
    border-color: rgba(255,255,255,0.18);
    color: var(--text);
  }

  .hero-terminal {
    margin-top: 80px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(12,15,20,0.85);
    backdrop-filter: blur(12px);
    overflow: hidden;
    max-width: 760px;
    opacity: 0;
    transform: translateY(24px);
    animation: fadeUp 1s 0.85s forwards;
  }
  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 12px 18px;
    border-bottom: 1px solid var(--border);
    background: rgba(255,255,255,0.02);
  }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-r { background: #ff5f57; }
  .dot-y { background: #febc2e; }
  .dot-g { background: #28c840; }
  .terminal-title {
    margin-left: auto;
    font-family: var(--mono);
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.08em;
  }
  .terminal-body { padding: 22px 22px 18px; }
  .t-row {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    font-family: var(--mono);
    font-size: 0.72rem;
  }
  .t-row:last-child { border-bottom: none; }
  .t-label { color: var(--muted); width: 130px; flex-shrink: 0; }
  .t-val { color: var(--text); }
  .t-val.green { color: var(--green); }
  .t-val.pulse {
    animation: pulse-text 2.4s ease-in-out infinite;
  }
  .t-badge {
    margin-left: auto;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    padding: 2px 8px;
    border-radius: 3px;
    background: var(--green-glow);
    color: var(--green);
    border: 1px solid rgba(0,208,132,0.2);
  }

  #stats {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 0;
    background: rgba(12,15,20,0.6);
  }
  .stats-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .stat-item {
    padding: 42px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-right: 1px solid var(--border);
  }
  .stat-item:last-child { border-right: none; padding-left: 48px; }
  .stat-item:nth-child(2) { padding-left: 48px; }
  .stat-num {
    font-family: var(--display);
    font-size: 2.8rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .stat-num span { color: var(--green); }
  .stat-label {
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 300;
    letter-spacing: 0.04em;
  }

  #features {
    padding: 120px 48px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--mono);
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 20px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: var(--green);
  }

  .section-heading {
    font-family: var(--display);
    font-size: clamp(1.9rem, 3.5vw, 2.9rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #fff;
    line-height: 1.1;
    max-width: 540px;
    margin-bottom: 70px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  .feature-card {
    background: var(--surface);
    padding: 42px 40px;
    transition: background 0.3s;
    position: relative;
    overflow: hidden;
  }
  .feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at top left, var(--green-glow-sm) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .feature-card:hover::before { opacity: 1; }
  .feature-card:hover { background: #0f1318; }

  .feature-icon {
    width: 42px; height: 42px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: rgba(0,208,132,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
  }
  .feature-icon svg {
    width: 18px; height: 18px;
    stroke: var(--green);
    fill: none;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .feature-title {
    font-family: var(--display);
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #fff;
    margin-bottom: 10px;
  }
  .feature-desc {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.7;
    font-weight: 300;
  }

  #how {
    padding: 120px 48px;
    border-top: 1px solid var(--border);
  }
  .how-inner {
    max-width: 1200px;
    margin: 0 auto;
  }
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    position: relative;
    margin-top: 70px;
  }
  .steps-grid::before {
    content: '';
    position: absolute;
    top: 28px;
    left: calc(16.66% + 20px);
    right: calc(16.66% + 20px);
    height: 1px;
    background: linear-gradient(90deg, var(--green-dim), var(--green-dim));
    opacity: 0.4;
  }

  .step {
    padding: 0 36px 0 0;
    position: relative;
  }
  .step:last-child { padding-right: 0; }

  .step-num {
    width: 56px; height: 56px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--mono);
    font-size: 0.8rem;
    color: var(--green);
    letter-spacing: 0.04em;
    margin-bottom: 28px;
    position: relative;
    z-index: 1;
  }
  .step-title {
    font-family: var(--display);
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #fff;
    margin-bottom: 10px;
  }
  .step-desc {
    font-size: 0.86rem;
    color: var(--muted);
    line-height: 1.7;
    font-weight: 300;
  }

  #cta {
    padding: 140px 48px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  #cta::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,208,132,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .cta-inner {
    position: relative;
    z-index: 1;
    max-width: 620px;
    margin: 0 auto;
  }
  .cta-heading {
    font-family: var(--display);
    font-size: clamp(2rem, 4vw, 3.4rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    color: #fff;
    line-height: 1.06;
    margin-bottom: 22px;
  }
  .cta-heading em {
    font-style: normal;
    color: var(--green);
  }
  .cta-sub {
    font-size: 0.95rem;
    color: var(--muted);
    max-width: 400px;
    margin: 0 auto 40px;
    font-weight: 300;
    line-height: 1.7;
  }
  .cta-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  footer {
    border-top: 1px solid var(--border);
    padding: 40px 48px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-brand {
    font-family: var(--display);
    font-weight: 800;
    font-size: 1rem;
    color: #fff;
  }
  .footer-brand span { color: var(--green); }

  .footer-links {
    display: flex;
    gap: 28px;
    list-style: none;
  }
  .footer-links a {
    font-size: 0.78rem;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
    font-weight: 300;
  }
  .footer-links a:hover { color: var(--text); }

  .footer-copy {
    font-size: 0.72rem;
    color: #3d4a40;
    font-family: var(--mono);
    letter-spacing: 0.04em;
  }

  .reveal {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: none;
  }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-text {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .cursor {
    display: inline-block;
    width: 6px; height: 0.9em;
    background: var(--green);
    margin-left: 3px;
    vertical-align: middle;
    animation: blink 1.1s step-start infinite;
  }

  @media (max-width: 900px) {
    nav { padding: 18px 24px; }
    .nav-links { display: none; }
    #hero { padding: 120px 24px 80px; }
    .stats-inner { padding: 0 24px; }
    .stat-item:nth-child(2) { padding-left: 24px; }
    .stat-item:last-child { padding-left: 24px; }
    #features { padding: 80px 24px; }
    .features-grid { grid-template-columns: 1fr; }
    #how { padding: 80px 24px; }
    .steps-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .steps-grid::before { display: none; }
    #cta { padding: 100px 24px; }
    footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 600px) {
    .stats-inner { grid-template-columns: 1fr; }
    .stat-item { border-right: none; border-bottom: 1px solid var(--border); padding: 30px 0 !important; }
    .stat-item:last-child { border-bottom: none; }
    .hero-actions { flex-direction: column; align-items: flex-start; }
    .cta-actions { flex-direction: column; }
  }
`;

export default function App() {
  const canvasRef = useRef(null);
  const navRef = useRef(null);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.4,
      a: Math.random() * 0.35 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,208,132,${p.a})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,208,132,${0.06 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Nav scroll effect
  useEffect(() => {
    const nav = navRef.current;
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <canvas id="canvas" ref={canvasRef} />

      {/* NAV */}
      <nav id="nav" ref={navRef}>
        <a href="#" className="nav-logo">
          Aur<span>a</span>cle
        </a>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#cta">Pricing</a></li>
        </ul>
        <a href="#cta" className="nav-cta">Get Early Access</a>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div id="hero">
          <div className="hero-eyebrow">Crypto Intelligence Terminal</div>
          <h1 className="hero-headline">
            Track <em>smart money</em>
            <br />
            before it moves markets.
          </h1>
          <p className="hero-sub">
            Auracle surfaces what top wallets are doing in real time — so you
            stop reacting to the market and start moving with it.
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn-primary">Start Tracking</a>
            <a href="#how" className="btn-secondary">View Demo</a>
          </div>

          {/* Terminal mockup */}
          <div className="hero-terminal">
            <div className="terminal-bar">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
              <span className="terminal-title">AURACLE / LIVE FEED</span>
            </div>
            <div className="terminal-body">
              <div className="t-row">
                <span className="t-label">wallet_id</span>
                <span className="t-val">0x71C...9aF3</span>
                <span className="t-badge">WHALE</span>
              </div>
              <div className="t-row">
                <span className="t-label">action</span>
                <span className="t-val green">
                  ACCUMULATE — $ARB &nbsp;+148,200 tokens
                </span>
              </div>
              <div className="t-row">
                <span className="t-label">chain</span>
                <span className="t-val">Arbitrum One</span>
              </div>
              <div className="t-row">
                <span className="t-label">signal_age</span>
                <span className="t-val green pulse">2.1s ago</span>
              </div>
              <div className="t-row">
                <span className="t-label">ai_summary</span>
                <span
                  className="t-val"
                  style={{ fontStyle: "italic", color: "#a0b0a5" }}
                >
                  Large position build across 3 wallets. Pattern matches
                  pre-rally behavior from Q1 
