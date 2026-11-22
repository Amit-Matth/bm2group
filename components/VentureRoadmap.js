"use client";

import { useState } from "react";

const VENTURES = [
  {
    id: "bm2-sipware",
    num: "01",
    name: "BM2 Sipware",
    status: "Coming Soon",
    href: "/ventures/bm2-sipware",
    color: "#0284c7",
    logoImg: "/SIPWARE.png",
    align: "left",
  },
  {
    id: "bm2-levelup",
    num: "02",
    name: "BM2 LevelUp",
    status: "Upcoming Launch",
    href: "/ventures/bm2-levelup",
    color: "#f59e0b",
    logoImg: "/LEVELUP.png",
    align: "right",
  },
  {
    id: "bm2-innovation",
    num: "03",
    name: "BM2 Innovation",
    status: "Upcoming Launch",
    href: "/ventures/bm2-innovation",
    color: "#22d3ee",
    logoImg: "/INNOVATION.png",
    align: "left",
  },
];

export default function VentureRoadmap() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ width: "100%", maxWidth: "980px", margin: "0 auto", fontFamily: "Outfit, sans-serif", position: "relative", boxSizing: "border-box", overflow: "visible" }}>
      {/* Background Ambient 3D Depth Lighting */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "min(350px, 75vw)", height: "min(350px, 75vw)", background: "radial-gradient(circle, rgba(2,132,199,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", right: "5%", width: "min(380px, 75vw)", height: "min(380px, 75vw)", background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />

      {/* Roadmap Steps Container with Intertwined S-Curve SVG */}
      <div className="roadmap-steps" style={{ position: "relative", display: "flex", flexDirection: "column", gap: "50px", paddingBottom: "40px", paddingTop: "20px", width: "100%", boxSizing: "border-box" }}>

        {/* Absolute Background SVG S-Curve connecting the nodes with 3D Depth */}
        <svg
          className="roadmap-s-curve-bg"
          viewBox="0 0 800 900"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "760px",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
            overflow: "visible",
          }}
        >
          <defs>
            <linearGradient id="neonSGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="neonGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Shadow S-Curve Layer */}
          <path
            d="M 120 80 C 680 180, 680 380, 680 440 C 680 500, -120 620, 120 780"
            fill="none"
            stroke="#000000"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Main Glowing S-Curve Path */}
          <path
            d="M 120 80 C 680 180, 680 380, 680 440 C 680 500, -120 620, 120 780"
            fill="none"
            stroke="url(#neonSGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />

          {/* Animated Laser Dashed Overlay */}
          <path
            d="M 120 80 C 680 180, 680 380, 680 440 C 680 500, -120 620, 120 780"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeDasharray="12 12"
            opacity="0.9"
          >
            <animate attributeName="stroke-dashoffset" values="48;0" dur="2s" repeatCount="indefinite" />
          </path>
        </svg>

        {VENTURES.map((v, idx) => {
          const isActive = activeIndex === idx;
          const isRight = v.align === "right";

          return (
            <div
              key={v.id}
              onClick={() => setActiveIndex(idx)}
              className={`roadmap-step-row ${isRight ? "reverse" : ""}`}
              style={{
                display: "flex",
                flexDirection: isRight ? "row-reverse" : "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0px",
                position: "relative",
                zIndex: 2,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* 3D Depth Node Orb on the S-Curve */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: isActive ? v.color : "color-mix(in srgb, var(--card) 90%, #000)",
                  border: `3.5px solid ${v.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 30px ${v.color}, inset 0 0 15px rgba(0,0,0,0.5)`,
                  flexShrink: 0,
                  cursor: "pointer",
                  position: "relative",
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                  zIndex: 3,
                }}
              >
                <span style={{ fontSize: "1.2rem", fontWeight: "900", color: isActive && v.color !== "#f59e0b" ? "#fff" : v.color, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                  {v.num}
                </span>
                {isActive && (
                  <span style={{ position: "absolute", inset: "-10px", borderRadius: "50%", border: `2px dashed ${v.color}`, animation: "spin 8s linear infinite", opacity: 0.8 }} />
                )}
              </div>

              {/* Glowing Laser Connector Bar between Node and Card */}
              <div
                className="roadmap-connector-bar"
                style={{
                  flex: "0 0 36px",
                  height: "4px",
                  background: `linear-gradient(${isRight ? "270deg" : "90deg"}, ${v.color}, color-mix(in srgb, ${v.color} 40%, transparent))`,
                  boxShadow: `0 0 14px ${v.color}`,
                  position: "relative",
                  borderRadius: "2px",
                  zIndex: 2,
                }}
              >
                <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [isRight ? "left" : "right"]: 0, width: "8px", height: "8px", borderRadius: "50%", background: "#fff", boxShadow: `0 0 10px ${v.color}` }} />
              </div>

              {/* 3D Depth Venture Card */}
              <div
                style={{
                  flex: 1,
                  width: "100%",
                  background: isActive ? "color-mix(in srgb, var(--card) 95%, var(--cyan) 12%)" : "color-mix(in srgb, var(--card) 88%, transparent)",
                  border: `2px solid ${isActive ? v.color : "var(--border)"}`,
                  borderRadius: "24px",
                  padding: "20px 28px",
                  cursor: "pointer",
                  boxShadow: isActive ? `0 20px 50px color-mix(in srgb, ${v.color} 35%, transparent), 0 10px 20px rgba(0,0,0,0.3)` : "0 10px 30px rgba(0,0,0,0.18)",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  zIndex: 2,
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                  {/* Left: Logo + Venture Title & Status Badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "16px", overflow: "hidden", border: "1.5px solid var(--border)", background: "#000", flexShrink: 0, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
                      <img
                        src={v.logoImg}
                        alt={v.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--text)", margin: 0, fontFamily: "Outfit", letterSpacing: "-0.01em" }}>
                        {v.name}
                      </h4>
                      <div>
                        <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#10b981", display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "999px", background: "color-mix(in srgb, #10b981 10%, var(--card))", border: "1px solid color-mix(in srgb, #10b981 30%, transparent)" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                          {v.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: View Venture CTA */}
                  <a
                    href={v.href}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: "800",
                      color: "#000",
                      background: v.color,
                      padding: "10px 22px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      boxShadow: `0 0 20px color-mix(in srgb, ${v.color} 40%, transparent), 0 4px 10px rgba(0,0,0,0.2)`,
                      transition: "transform 0.2s ease"
                    }}
                  >
                    View Venture →
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Cyber Base Floor Line & Future Horizon Node */}
        <div style={{ position: "relative", zIndex: 2, marginTop: "10px", width: "100%", boxSizing: "border-box" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              padding: "24px",
              borderRadius: "24px",
              background: "color-mix(in srgb, var(--cyan) 10%, var(--card))",
              border: "1.5px dashed var(--cyan)",
              textAlign: "center",
              zIndex: 2,
              boxShadow: "0 0 35px color-mix(in srgb, var(--cyan) 20%, transparent), inset 0 0 20px rgba(34,211,238,0.1)",
              boxSizing: "border-box",
            }}
          >
            <div>
              <p style={{ fontSize: "1.15rem", fontWeight: "700", color: "var(--text)", margin: 0 }}>
                More ventures coming soon.
              </p>
            </div>
          </div>

          {/* Glowing Cyber Base Floor Line for Maximum 3D Depth */}
          <div style={{ width: "100%", height: "2px", background: "linear-gradient(90deg, transparent, var(--cyan), #f59e0b, var(--cyan), transparent)", marginTop: "40px", boxShadow: "0 0 20px var(--cyan)" }} />
        </div>

      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .roadmap-s-curve-bg {
            display: none !important;
          }
          .roadmap-steps::before {
            content: "";
            position: absolute;
            top: 28px;
            bottom: 150px;
            left: 50%;
            width: 3px;
            transform: translateX(-50%);
            border-radius: 3px;
            background: linear-gradient(to bottom, #0284c7, #f59e0b 50%, #22d3ee);
            box-shadow: 0 0 12px rgba(2, 132, 199, 0.65);
            opacity: 0.8;
            pointer-events: none;
          }
          .roadmap-step-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 12px !important;
            width: 100% !important;
          }
          .roadmap-connector-bar {
            display: block !important;
            flex: 0 0 24px !important;
            width: 4px !important;
            height: 24px !important;
            background: linear-gradient(to bottom, var(--cyan), color-mix(in srgb, var(--cyan) 40%, transparent)) !important;
          }
          .roadmap-connector-bar > div {
            display: none !important;
          }
          .roadmap-step-row > div:last-child {
            width: 100% !important;
            flex: none !important;
            padding: 20px !important;
            border-radius: 20px !important;
          }
          .roadmap-step-row h4 {
            font-size: clamp(1.05rem, 5vw, 1.35rem) !important;
            overflow-wrap: anywhere;
          }
          .roadmap-step-row > div:last-child > div:nth-child(2) {
            align-items: flex-start !important;
          }
          .roadmap-step-row > div:last-child > div:nth-child(2) > div {
            min-width: 0;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
