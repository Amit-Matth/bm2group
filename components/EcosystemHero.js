"use client";

import { useEffect, useRef, useState } from "react";

export default function EcosystemHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [responsiveScale, setResponsiveScale] = useState(1);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const progress = Math.min(y / 400, 1);
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

    // Dynamic auto-scroll calculation based on actual measured element height for all devices (desktop & phone)
    const lastPath = sessionStorage.getItem("bm2_last_path");
    const currentPath = window.location.pathname;
    if (lastPath && lastPath !== currentPath) {
      setTimeout(() => {
        if (heroRef.current) {
          const heroHeight = heroRef.current.getBoundingClientRect().height;
          window.scrollTo({ top: Math.max(0, heroHeight - 65), behavior: "smooth" });
        }
      }, 350);
    }
    sessionStorage.setItem("bm2_last_path", currentPath);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="hero-centered" style={{ minHeight: "520px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: "60px", paddingBottom: "20px" }}>
      <div
        className="ecosystem-hub"
        style={{
          opacity: 1 - scrollProgress * 1.2,
          transform: `scale(${responsiveScale * (1 - scrollProgress * 0.15)}) translateY(${scrollProgress * -50}px)`,
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
  );
}
