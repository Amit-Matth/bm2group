"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   EDIT YOUR STUFF HERE
------------------------------------------------------------------- */
const COMPANY = "BM2GROUP";
const EMAIL = "amitmatth121@gmail.com"; // <- change to your real email

// Planned ventures. Names only, no links (not launched yet).
// When one launches, add href: "https://pdf.bm2group.com" and set status: "Live".
const VENTURES = [
  { name: "BM2 PDF", icon: "file", status: "Coming soon", desc: "Digital marketplace for buying & selling professional PDFs" },
  { name: "BM2 Trading", icon: "trend", status: "Coming soon", desc: "Strategic money investment platform to grow capital & earn" },
  { name: "BM2 Sipware", icon: "cup", status: "Coming soon", desc: "Print-on-demand custom mugs & drinkware" },
  { name: "BM2 Labs", icon: "flask", status: "Coming soon", desc: "Experimental tech & AI projects" },
];

const VALUES = [
  {
    icon: "zap",
    color: "cyan",
    title: "Instant Speed",
    text: "We write lean code that runs smoothly. No endless loading spinners or heavy installs.",
  },
  {
    icon: "heart",
    color: "orange",
    title: "Clean, Focused Design",
    text: "Every interface is thoughtfully designed with soft gradients, readable typography, and dark/light modes.",
  },
  {
    icon: "shield",
    color: "green",
    title: "Zero Clutter",
    text: "No noise, no distractions. Just simple tools that do one thing well.",
  },
];
/* ------------------------------------------------------------------ */

const ICONS = {
  file: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>),
  trend: (<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  cup: (<><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" /></>),
  flask: (<><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" /><path d="M7.5 15h9" /></>),
  zap: (<path d="M13 2 4 14h7l-1 8 9-12h-7z" />),
  heart: (<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />),
  shield: (<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />),
  arrow: (<path d="M5 12h14M13 6l6 6-6 6" />),
  arrowUp: (<path d="M12 19V5M5 12l7-7 7 7" />),
  mail: (<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
  menu: (<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>),
  close: (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
};

function Icon({ name, size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function useTheme() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("bm2-theme", next); } catch (e) {}
  };
  return [theme, toggle];
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setShown(true); io.disconnect(); }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [theme, toggleTheme] = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>

      <header className="nav">
        <a href="#home" className="nav-brand">
          {COMPANY}
        </a>
        <nav className={`links ${mobileMenuOpen ? "open" : ""}`}>
          <a href="#ventures" onClick={() => setMobileMenuOpen(false)}>Ventures</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button className="theme-btn desktop-theme-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle theme">
            <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
          </button>
        </nav>
        <div className="nav-mobile-actions">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
            <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
          </button>
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </header>

      <main>
        {/* HERO / FIRST TOPIC */}
        <section id="home" className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="headline">
                <span className="brand" aria-label={COMPANY}>
                  <span className="brand-text">BM2 Group</span>
                </span>
                <span className="headline-tagline fade" style={{ animationDelay: "0.6s" }}>
                  Built for What's Next.
                </span>
              </h1>

              <p className="lead fade" style={{ animationDelay: "1.0s" }}>
                The central hub connecting our high-performance digital ventures.
              </p>

              <div className="hero-actions fade" style={{ animationDelay: "1.3s" }}>
                <a href="#contact" className="btn primary">
                  Get in Touch <Icon name="arrow" size={18} />
                </a>
              </div>
            </div>

            <div className="hero-visual fade" style={{ animationDelay: "0.8s" }}>
              <div className="ecosystem-hub">
                <div className="hub-glow" />

                {/* SVG Connecting Lines & High Contrast Orbits */}
                <svg className="hub-svg-overlay" viewBox="0 0 440 440">
                  <defs>
                    <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.45" />
                    </linearGradient>
                  </defs>

                  {/* Outer Orbit */}
                  <circle cx="220" cy="220" r="175" className="svg-orbit-outer" />
                  {/* Inner Orbit */}
                  <circle cx="220" cy="220" r="115" className="svg-orbit-inner" />

                  {/* Connecting Laser Beams to Venture Nodes */}
                  <line x1="220" y1="220" x2="85" y2="48" className="svg-beam" />
                  <line x1="220" y1="220" x2="355" y2="52" className="svg-beam" />
                  <line x1="220" y1="220" x2="85" y2="392" className="svg-beam" />
                  <line x1="220" y1="220" x2="355" y2="392" className="svg-beam" />
                </svg>

                {/* Central Logo Core */}
                <div className="hub-core">
                  <img src="/logo.jpg" alt="BM2GROUP Logo" className="hub-logo-img" />
                  <span className="hub-core-pulse" />
                </div>

                {/* Venture Nodes */}
                <div className="hub-node node-pdf">
                  <span className="node-icon"><Icon name="file" size={15} /></span>
                  <span className="node-label">BM2 PDF</span>
                </div>

                <div className="hub-node node-trading">
                  <span className="node-icon"><Icon name="trend" size={15} /></span>
                  <span className="node-label">BM2 Trading</span>
                </div>

                <div className="hub-node node-sipware">
                  <span className="node-icon"><Icon name="cup" size={15} /></span>
                  <span className="node-label">BM2 Sipware</span>
                </div>

                <div className="hub-node node-labs">
                  <span className="node-icon"><Icon name="flask" size={15} /></span>
                  <span className="node-label">BM2 Labs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VENTURES */}
        <section id="ventures" className="section">
          <Reveal>
            <h2>Our ventures</h2>
            <p className="copy">Planned and in the works. Launching soon, one by one.</p>
          </Reveal>
          <div className="ventures">
            {VENTURES.map((v, i) => (
              <Reveal key={v.name} delay={i * 90}>
                <div className="venture">
                  <span className="icon-box cyan"><Icon name={v.icon} size={22} /></span>
                  <h3>{v.name}</h3>
                  {v.desc && <p className="venture-desc">{v.desc}</p>}
                  <span className="badge"><i className="dot" />{v.status}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <Reveal>
            <h2>Crafting software that gets out of your way</h2>
            <p className="copy wide">
              <strong>{COMPANY}</strong> started with a simple belief: the web should be fast,
              private, and effortless. Every venture we build follows the same idea. Simple tools
              that load instantly and work smoothly.
            </p>
          </Reveal>
          <div className="cards">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <div className="card">
                  <span className={`icon-box ${v.color}`}><Icon name={v.icon} size={22} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section center">
          <Reveal>
            <h2>Get in touch</h2>
            <p className="copy">Questions, ideas, or collaborations? Send us an email.</p>
            <a href={`mailto:${EMAIL}`} className="btn primary big">
              <Icon name="mail" size={20} />
              <span>{EMAIL}</span>
              <Icon name="arrow" size={18} />
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#home" className="footer-logo-chip">
                <img src="/logo.jpg" alt="BM2GROUP Logo" className="footer-logo-img" />
                <span className="footer-logo-text">{COMPANY}</span>
              </a>
              <p className="footer-tagline">
                Crafting clean, fast, and focused digital ventures built for simplicity and power.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Navigation</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#ventures">Ventures</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Ventures</h4>
              <ul className="footer-links">
                {VENTURES.map(v => (
                  <li key={v.name}>
                    <span className="footer-venture-item">
                      <Icon name={v.icon} size={14} />
                      {v.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Contact</h4>
              <p className="footer-contact-desc">Have questions or want to collaborate?</p>
              <a href={`mailto:${EMAIL}`} className="footer-email-btn">
                <Icon name="mail" size={16} />
                <span>{EMAIL}</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="back-to-top"
              aria-label="Back to top"
              title="Back to top"
            >
              <span>Back to top</span>
              <Icon name="arrowUp" size={16} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
