"use client";

import { useEffect, useState } from "react";

const ICONS = {
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
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

export default function Footer() {
  const [theme, toggleTheme] = useTheme();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: "420px",
        background: "#050816",
        color: "#a9b6dc",
        fontSize: "0.82rem",
        fontWeight: "600",
        borderRadius: "999px",
        border: "1.5px solid rgba(150, 170, 255, 0.25)",
        boxShadow: "0 14px 40px rgba(0,0,0,0.45), 0 0 25px rgba(2, 132, 199, 0.2)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px 8px 18px",
        zIndex: 9999,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 8px #22d3ee" }} />
        <span>2026 © All Rights Reserved BM2Group</span>
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title="Toggle theme"
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(150, 170, 255, 0.3)",
          color: "#22d3ee",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease, background 0.3s ease",
          flexShrink: 0,
        }}
      >
        <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
      </button>
    </footer>
  );
}
