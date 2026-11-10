"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const COMPANY = "BM2GROUP";

const ICONS = {
  lock: (<><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
  menu: (<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>),
  close: (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
  file: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>),
  trend: (<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  cup: (<><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" /></>),
  flask: (<><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" /><path d="M7.5 15h9" /></>),
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
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [responsiveScale, setResponsiveScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 450) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      const progress = Math.min(y / 650, 1);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setResponsiveScale(Math.max(0.42, (w - 24) / 800));
      } else if (w < 768) {
        setResponsiveScale(Math.max(0.58, (w - 32) / 800));
      } else if (w < 900) {
        setResponsiveScale(Math.min(0.85, (w - 40) / 800));
      } else {
        setResponsiveScale(1);
      }
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>

      <header className={`nav home-nav ${scrolled ? "visible" : ""}`}>
        <nav className={`links ${mobileMenuOpen ? "open" : ""}`}>
          <a href="/" style={{ color: "var(--cyan)" }} onClick={() => setMobileMenuOpen(false)}>Home</a>
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

      <main>
        {/* HERO / PERFECTLY CENTERED FLEXBOX LAYOUT WITH RADAR ORBITS */}
        <section id="home" className="hero-centered">
          <div
            className="ecosystem-hub"
            style={{
              opacity: 1 - scrollProgress * 1.2,
              transform: `scale(${responsiveScale * (1 - scrollProgress * 0.15)}) translateY(calc(var(--hub-offset-y, -7.5vh) + ${scrollProgress * -50}px))`,
              transformOrigin: "center center",
              width: "800px",
              height: "600px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="hub-glow" />

            {/* SVG Radar Orbit Rings & Connecting Laser Beams centered at (400, 300) */}
            <svg className="hub-svg-overlay" viewBox="0 0 800 600" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3, overflow: "visible" }}>
              <defs>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--cyan)" />
                  <stop offset="100%" stopColor="var(--blue)" />
                </linearGradient>
              </defs>

              {/* Radar Orbit Rings */}
              <circle cx="400" cy="300" r="220" className="svg-orbit-outer" style={{ transformOrigin: "400px 300px" }} />
              <circle cx="400" cy="300" r="185" className="svg-orbit-inner" style={{ transformOrigin: "400px 300px", opacity: 0.4, strokeDasharray: "4 8" }} />
              <circle cx="400" cy="300" r="145" className="svg-orbit-inner" style={{ transformOrigin: "400px 300px" }} />

              {/* Mathematically Aligned Dashed Rays Connected Directly to Outer Orbit Circle & Card Centers */}
              <line x1="400" y1="300" x2="244" y2="144" className="svg-beam" />
              <line x1="400" y1="300" x2="599" y2="207" className="svg-beam" />
              <line x1="400" y1="300" x2="400" y2="520" className="svg-beam" />
            </svg>

            {/* Enlarged Center Core Logo with GROUP.jpg */}
            <div className="hub-core" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 5 }}>
              <img src="/GROUP.jpg" alt="BM2GROUP Logo" className="hub-logo-img" />
              <span className="hub-core-pulse" />
            </div>

            {/* Top-Left Venture Node: BM2 Sipware */}
            <a href="/ventures/bm2-sipware?from=home" className="sipware-card card-top-left" style={{ position: "absolute", left: "calc(50% - 156px)", top: "calc(50% - 156px)", transform: "translate(-50%, -50%)", zIndex: 4, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
              <h3>BM2 Sipware</h3>
            </a>

            {/* Top-Right Venture Node: BM2 PDFHub */}
            <a href="/ventures/bm2-pdfhub?from=home" className="sipware-card card-top-right" style={{ position: "absolute", left: "calc(50% + 199px)", top: "calc(50% - 93px)", transform: "translate(-50%, -50%)", zIndex: 4, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
              <h3>BM2 PDFHub</h3>
            </a>

            {/* Bottom Venture Node: BM2 Innovation */}
            <a href="/ventures/bm2-innovation?from=home" className="sipware-card card-bottom" style={{ position: "absolute", left: "50%", top: "calc(50% + 220px)", transform: "translate(-50%, -50%)", zIndex: 4, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
              <h3>BM2 Innovation</h3>
            </a>
          </div>
        </section>

        {/* BM2 GROUP SECTION ON HOME */}
        <section id="about" className="section" style={{ padding: "280px 24px 140px", maxWidth: "860px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "2.8rem", fontWeight: "800", marginBottom: "28px", fontFamily: "Outfit", letterSpacing: "-0.02em" }}>
              BM2 Group <span style={{ color: "var(--cyan)", fontWeight: "400" }}>- Think Beyond Business</span>
            </h2>

            <p style={{ fontSize: "1.15rem", lineHeight: "1.8", marginBottom: "24px" }}>
              More than a business group, BM2 is a vision to build something bigger than profits. An umbrella for multiple ventures, connecting hearts, creating opportunities and making the difference.
            </p>

            <p style={{ fontSize: "1.15rem", lineHeight: "1.8", marginBottom: "36px", color: "var(--muted)" }}>
              What does BM2 stand for? Something special, to be revealed when our family reaches <span style={{ color: "var(--cyan)", fontWeight: "700" }}>100K+</span> customers. ❤️
            </p>

            <div>
              <a href="/ventures" style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--cyan)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                Explore Our Ventures →
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: "40px 24px", color: "var(--muted)", fontSize: "0.9rem", borderTop: "1px solid var(--border)", marginTop: "80px" }}>
        2026 @ All Rights Reserved BM2Group
      </footer>

      <ThemeToggle />
    </>
  );
}
