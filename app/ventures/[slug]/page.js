"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const COMPANY = "BM2GROUP";

const VENTURES_DATA = {
  "bm2-sipware": {
    name: "BM2 Sipware",
    logoImg: "/SIPWARE.png",
    targetDate: "2026-11-16T09:00:00+05:30",
    color: "#0284c7",
  },
  "bm2-levelup": {
    name: "BM2 LevelUp",
    logoImg: "/LevelUp.jpg",
    targetDate: null,
    color: "#f59e0b",
  },
  "bm2-pdfhub": {
    name: "BM2 LevelUp",
    logoImg: "/LevelUp.jpg",
    targetDate: null,
    color: "#f59e0b",
  },
  "bm2-innovation": {
    name: "BM2 Innovation",
    logoImg: "/INNOVATION.png",
    targetDate: null,
    color: "#22d3ee",
  },
};

function Icon({ name, size = 18 }) {
  const ICONS = {
    sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
    moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
    menu: (<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>),
    close: (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
    back: (<><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>),
    rocket: (<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></>),
    heart: (<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />),
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}



function VentureCountdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days, max: 30, color: "#0284c7" },
    { label: "HOURS", value: timeLeft.hours, max: 24, color: "#3b82f6" },
    { label: "MINS", value: timeLeft.minutes, max: 60, color: "#f59e0b" },
    { label: "SECS", value: timeLeft.seconds, max: 60, color: "#22d3ee" },
  ];

  return (
    <div className="venture-countdown" style={{ width: "100%", maxWidth: "680px", margin: "24px auto 0", boxSizing: "border-box" }}>
      <div className="venture-countdown-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", textAlign: "center", width: "100%", boxSizing: "border-box" }}>
        {units.map((unit) => {
          const circumference = 2 * Math.PI * 30;
          const strokeDashoffset = circumference - (Math.min(unit.value, unit.max) / unit.max) * circumference;

          return (
            <div
              key={unit.label}
              style={{
                background: "color-mix(in srgb, var(--card) 92%, var(--cyan) 8%)",
                border: "1.5px solid var(--border)",
                borderRadius: "16px",
                padding: "12px 4px 10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box",
                minWidth: 0,
              }}
            >
              <div style={{ position: "relative", width: "68px", height: "68px", marginBottom: "6px", maxWidth: "100%" }}>
                <svg width="100%" height="100%" viewBox="0 0 84 84" style={{ transform: "rotate(-90deg)", display: "block" }}>
                  <circle
                    cx="42"
                    cy="42"
                    r="30"
                    fill="none"
                    stroke="color-mix(in srgb, var(--text) 18%, var(--border))"
                    strokeWidth="6"
                  />
                  <circle
                    cx="42"
                    cy="42"
                    r="30"
                    fill="none"
                    stroke={unit.color}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={isNaN(strokeDashoffset) ? 0 : strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.8s ease" }}
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    fontWeight: "900",
                    fontFamily: "Outfit",
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </div>
              </div>

              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: "800",
                  fontFamily: "monospace",
                  letterSpacing: "0.08em",
                  color: unit.color,
                }}
              >
                {unit.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function VentureDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const backHref = searchParams.get("from") === "home" ? "/" : "/ventures";
  const backLabel = searchParams.get("from") === "home" ? "Back to Home" : "Back to Ventures";
  const slug = params?.slug;
  const venture = VENTURES_DATA[slug];

  const [hasPassedTarget, setHasPassedTarget] = useState(true);

  useEffect(() => {
    if (!venture?.targetDate) return;
    const checkTime = () => {
      const target = new Date(venture.targetDate).getTime();
      const now = Date.now();
      setHasPassedTarget(now >= target);
    };
    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [venture?.targetDate]);

  if (!venture) {
    return (
      <main style={{ padding: "160px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>Venture Not Found</h1>
        <a href={backHref} style={{ color: "var(--cyan)", textDecoration: "none", fontWeight: "700" }}>← {backLabel}</a>
      </main>
    );
  }

  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>

      <Navbar />

      <main className="venture-detail-main" style={{ padding: "140px 16px 100px", maxWidth: "860px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div className="venture-detail-card" style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: "24px", padding: "48px 20px 40px", boxShadow: "0 20px 50px rgba(0,0,0,0.08)", textAlign: "center", position: "relative", width: "100%", boxSizing: "border-box", overflow: "hidden" }}>

          <a
            href={backHref}
            className="venture-back-link"
            style={{
              position: "absolute",
              top: "24px",
              left: "24px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "color-mix(in srgb, var(--cyan) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--cyan) 30%, transparent)",
              padding: "8px 16px",
              borderRadius: "12px",
              color: "var(--cyan)",
              fontSize: "0.85rem",
              fontWeight: "700",
              textDecoration: "none",
              boxShadow: "0 0 15px color-mix(in srgb, var(--cyan) 15%, transparent)",
              transition: "all 0.2s ease",
            }}
          >
            <Icon name="back" size={16} /> {backLabel}
          </a>

          <div
            className="venture-detail-logo"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "32px",
              background: "#000",
              border: `2.5px solid ${venture.color || "var(--cyan)"}`,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "15px auto 24px",
              boxShadow: `0 0 40px color-mix(in srgb, ${venture.color || "var(--cyan)"} 45%, transparent), 0 15px 35px rgba(0,0,0,0.6)`,
              transition: "transform 0.3s ease",
            }}
          >
            <img
              src={venture.logoImg}
              alt={venture.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                imageRendering: "-webkit-optimize-contrast",
              }}
            />
          </div>

          <h1 className="venture-detail-title" style={{ fontSize: "3rem", fontWeight: "900", fontFamily: "Outfit", marginBottom: "36px", letterSpacing: "-0.02em" }}>
            {venture.name}
          </h1>

          {slug === "bm2-sipware" && hasPassedTarget ? (
            <div style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--card) 90%, var(--cyan) 10%), color-mix(in srgb, var(--card) 96%, var(--blue) 4%))",
              border: "1.5px solid color-mix(in srgb, var(--cyan) 35%, var(--border))",
              borderRadius: "20px",
              padding: "36px 28px",
              maxWidth: "680px",
              margin: "24px auto 0",
              textAlign: "left",
              boxShadow: "0 16px 40px color-mix(in srgb, var(--cyan) 12%, transparent)",
              boxSizing: "border-box"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" }}><Icon name="rocket" size={24} /></span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "900", fontFamily: "Outfit", color: "var(--text)", margin: 0 }}>
                  Launch Update
                </h3>
              </div>
              <p style={{ fontSize: "0.98rem", lineHeight: "1.75", color: "var(--muted)", marginBottom: "16px" }}>
                We planned to launch on November 16, but things are taking a little longer than expected.
              </p>
              <p style={{ fontSize: "0.98rem", lineHeight: "1.75", color: "var(--muted)", marginBottom: "16px" }}>
                We&apos;re working on the final bits and need a little more time before we&apos;re ready to open.
              </p>
              <p style={{ fontSize: "0.98rem", lineHeight: "1.75", color: "var(--muted)", marginBottom: "24px" }}>
                Thank you for your patience. We&apos;re looking forward to launching soon. ❤️
              </p>
              <div style={{ borderTop: "1px solid color-mix(in srgb, var(--cyan) 20%, var(--border))", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--cyan)", fontFamily: "Outfit", display: "flex", alignItems: "center", gap: "6px" }}>
                  BM2 Sipware — A New Era of Gifting. <Icon name="heart" size={16} style={{ color: "#ef4444", fill: "#ef4444" }} />
                </span>
              </div>
            </div>
          ) : venture.targetDate ? (
            <div style={{ marginTop: "24px" }}>
              <div className="venture-countdown-heading">
                <p className="venture-countdown-kicker">Launch countdown</p>
                <p className="venture-countdown-date">
                  <time dateTime={venture.targetDate}>November 16, 2026</time>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={venture.targetDate}>9:00 AM</time>
                </p>
              </div>
              <VentureCountdown targetDate={venture.targetDate} />
            </div>
          ) : (
            <div className="venture-upcoming-panel" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, color-mix(in srgb, var(--card) 88%, var(--cyan) 12%), color-mix(in srgb, var(--card) 95%, var(--blue) 5%))", border: "1.5px solid color-mix(in srgb, var(--cyan) 35%, var(--border))", padding: "32px 28px", borderRadius: "20px", maxWidth: "540px", margin: "24px auto 0", boxShadow: "0 16px 38px color-mix(in srgb, var(--cyan) 12%, transparent)" }}>
              <div style={{ position: "absolute", top: "-54px", right: "-36px", width: "150px", height: "150px", borderRadius: "50%", background: "color-mix(in srgb, var(--cyan) 12%, transparent)", filter: "blur(4px)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 11px", borderRadius: "999px", background: "color-mix(in srgb, var(--cyan) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--cyan) 25%, var(--border))", color: "var(--cyan)", fontSize: "0.72rem", fontWeight: "800", letterSpacing: "0.1em", marginBottom: "16px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 10px var(--cyan)" }} />
                  UPCOMING VENTURE
                </div>
                <h3 style={{ fontSize: "1.45rem", fontWeight: "800", fontFamily: "Outfit", color: "var(--text)", marginBottom: "8px" }}>
                  Something is taking shape
                </h3>
                <p style={{ fontSize: "0.96rem", lineHeight: "1.7", color: "var(--muted)", margin: 0 }}>
                  Launch details will be shared soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: "40px 24px", color: "var(--muted)", fontSize: "0.9rem", borderTop: "1px solid var(--border)", marginTop: "80px" }}>
        2026 @ All Rights Reserved BM2Group
      </footer>
    </>
  );
}
