"use client";

import { useEffect, useState } from "react";
import VentureRoadmap from "../../components/VentureRoadmap";
import ThemeToggle from "@/components/ThemeToggle";

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

export default function VenturesPage() {
  const [theme, toggleTheme] = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>

      <header className="nav visible inner-page-nav">
        <nav className={`links ${mobileMenuOpen ? "open" : ""}`}>
          <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/ventures" style={{ color: "var(--cyan)" }} onClick={() => setMobileMenuOpen(false)}>Ventures</a>
          <a href="/founder" onClick={() => setMobileMenuOpen(false)}>Founder</a>
          <a href="/journey" onClick={() => setMobileMenuOpen(false)}>Journey</a>
        </nav>
        <div className="nav-mobile-actions">
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </header>

      <main style={{ width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
        {/* VENTURES CONTENT */}
        <div className="ventures-page" style={{ padding: "120px 16px 100px", maxWidth: "1100px", margin: "0 auto", width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <h1 style={{ fontSize: "2.8rem", fontWeight: "800", fontFamily: "Outfit", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                What&apos;s Next?
              </h1>
              <p style={{ fontSize: "1.15rem", color: "var(--muted)", maxWidth: "640px", margin: "0 auto" }}>
                A look at our upcoming ventures and what we&apos;re working on.
              </p>
            </div>

            <div style={{ width: "100%" }}>
              <VentureRoadmap />
            </div>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: "40px 24px", color: "var(--muted)", fontSize: "0.9rem", borderTop: "1px solid var(--border)", marginTop: "80px" }}>
        2026 @ All Rights Reserved BM2Group
      </footer>

      <ThemeToggle />
    </>
  );
}
