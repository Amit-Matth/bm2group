"use client";

import { useEffect, useState } from "react";

const ICONS = {
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
};

function Icon({ name, size = 22 }) {
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

export default function ThemeToggle() {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      className="floating-theme-btn"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "var(--card)",
        color: "var(--text)",
        border: "1.5px solid var(--border)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2), 0 0 20px var(--glow1)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        zIndex: 9999,
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={22} />
    </button>
  );
}
