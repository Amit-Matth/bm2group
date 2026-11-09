"use client";

import { useEffect, useState } from "react";

const COMPANY = "BM2GROUP";

const ICONS = {
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

export default function AboutPage() {
  const [theme, toggleTheme] = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>

      <header className="nav visible" style={{ justifyContent: "center" }}>
        <nav className={`links ${mobileMenuOpen ? "open" : ""}`} style={{ margin: "0 auto", display: "flex", justifyContent: "center" }}>
          <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/ventures" onClick={() => setMobileMenuOpen(false)}>Ventures</a>
          <a href="/founder" onClick={() => setMobileMenuOpen(false)}>Founder</a>
          <a href="/journey" onClick={() => setMobileMenuOpen(false)}>Journey</a>
        </nav>
        <div className="nav-mobile-actions">
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </header>

      <main style={{ padding: "140px 24px 100px", maxWidth: "860px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "28px", fontFamily: "Outfit", letterSpacing: "-0.02em" }}>
          About <span style={{ color: "var(--cyan)" }}>{COMPANY}</span>
        </h1>

        <p style={{ fontSize: "1.15rem", lineHeight: "1.8", marginBottom: "20px" }}>
          <strong>{COMPANY}</strong> is a technology-driven business group focused on building digital products, software solutions and ventures that make everyday tasks simpler and more efficient.
        </p>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "20px", color: "var(--muted)" }}>
          We believe good technology should be simple to use, reliable and built to solve real problems. From digital products to software development, we focus on creating solutions that bring practical value to people and businesses.
        </p>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "32px", color: "var(--muted)" }}>
          Our approach is guided by three principles: simplicity, performance and continuous improvement. Every project we take on is an opportunity to build something useful, meaningful and ready for what&apos;s next.
        </p>

        <div style={{ borderLeft: "3px solid var(--cyan)", paddingLeft: "24px", margin: "36px 0", boxShadow: "-10px 0 25px -5px color-mix(in srgb, var(--cyan) 25%, transparent)" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--cyan)", fontFamily: "Outfit" }}>
            Built for What&apos;s Next.
          </p>
        </div>

        <h3 style={{ fontSize: "1.8rem", fontWeight: "800", marginTop: "48px", marginBottom: "24px", fontFamily: "Outfit" }}>
          What Drives Us
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px", fontFamily: "Outfit", color: "var(--cyan)" }}>
              Simplicity
            </h4>
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: "1.7" }}>
              We create straightforward digital experiences that are easy to understand and use.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px", fontFamily: "Outfit", color: "var(--cyan)" }}>
              Performance
            </h4>
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: "1.7" }}>
              We focus on building fast, reliable and efficient digital solutions.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px", fontFamily: "Outfit", color: "var(--cyan)" }}>
              Innovation
            </h4>
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: "1.7" }}>
              We keep exploring new ideas and technologies to build better solutions for tomorrow.
            </p>
          </div>
        </div>
      </main>

      <button className="floating-theme-btn" onClick={toggleTheme} title="Toggle theme">
        <Icon name={theme === "dark" ? "sun" : "moon"} size={22} />
      </button>
    </>
  );
}
