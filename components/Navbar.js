"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ICONS = {
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
  menu: (<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>),
  close: (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
};

function Icon({ name, size = 20 }) {
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

export default function Navbar() {
  const pathname = usePathname();
  const [theme, toggleTheme] = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 450);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isVisible = !isHome || scrolled;

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return (
    <header className={`nav ${isVisible ? "visible" : ""}`}>
      <a href="/" className="nav-brand">
        BM2 Group
      </a>

      <nav className={`links ${mobileMenuOpen ? "open" : ""}`}>
        <a
          href="/"
          className={isActive("/") ? "active" : ""}
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </a>
        <a
          href="/ventures"
          className={isActive("/ventures") ? "active" : ""}
          onClick={() => setMobileMenuOpen(false)}
        >
          Ventures
        </a>
        <a
          href="/founder"
          className={isActive("/founder") ? "active" : ""}
          onClick={() => setMobileMenuOpen(false)}
        >
          Founder
        </a>
        <a
          href="/journey"
          className={isActive("/journey") ? "active" : ""}
          onClick={() => setMobileMenuOpen(false)}
        >
          Journey
        </a>
      </nav>

      <div className="nav-right">
        <button
          className="nav-theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
        </button>
        <div className="nav-mobile-actions">
          <button
            className="menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
