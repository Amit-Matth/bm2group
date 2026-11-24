"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import EcosystemHero from "@/components/EcosystemHero";

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
  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>

      <Navbar />

      <main>
        {/* HERO / PERFECTLY CENTERED FLEXBOX LAYOUT WITH RADAR ORBITS */}
        <EcosystemHero />

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
    </>
  );
}
