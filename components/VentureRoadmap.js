"use client";

import { useState } from "react";

const VENTURES = [
  {
    id: "bm2-sipware",
    num: "01",
    name: "BM2 Sipware",
    status: "Coming Soon",
    category: "UPCOMING VENTURE",
    description: "Something new is taking shape. Full details will be revealed at launch.",
    highlights: ["Coming Soon", "In Development", "Private Preview"],
    href: "/ventures/bm2-sipware",
    color: "#0284c7",
    logoImg: "/SIPWARE.png",
    align: "left",
    btn1: "View Venture →",
    btn2: "Join Waitlist",
  },
  {
    id: "bm2-levelup",
    num: "02",
    name: "BM2 LevelUp",
    status: "Upcoming Launch",
    category: "UPCOMING PLATFORM",
    description: "A platform for learning, practical resources, and courses to help you grow.",
    highlights: ["In Development", "Early Access Soon", "For Creators"],
    href: "/ventures/bm2-levelup",
    color: "#f59e0b",
    logoImg: "/LevelUp.jpg",
    align: "right",
    btn1: "View Venture →",
    btn2: "Get Notified",
  },
  {
    id: "bm2-innovation",
    num: "03",
    name: "BM2 Innovation",
    status: "Upcoming Launch",
    category: "PROJECT STUDIO",
    description: "An in-house studio exploring new ideas, tools, and digital products.",
    highlights: ["In-House", "Experimental", "New Projects"],
    href: "/ventures/bm2-innovation",
    color: "#22d3ee",
    logoImg: "/INNOVATION.png",
    align: "left",
    btn1: "View Venture →",
    btn2: "Explore Lab",
  },
];

export default function VentureRoadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalVenture, setModalVenture] = useState(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [submittingWaitlist, setSubmittingWaitlist] = useState(false);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!waitlistEmail.trim() || !modalVenture) return;

    setSubmittingWaitlist(true);

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistEmail,
          ventureId: modalVenture.id,
          ventureName: modalVenture.name,
        }),
      });
    } catch (err) {
      console.warn("Waitlist API error:", err);
    } finally {
      setSubmittingWaitlist(false);
      setWaitlistSubmitted(true);
    }
  };

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
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />

          {/* Subtle Animated Laser Dashed Overlay */}
          <path
            d="M 120 80 C 680 180, 680 380, 680 440 C 680 500, -120 620, 120 780"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 14"
            opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" values="48;0" dur="4s" repeatCount="indefinite" />
          </path>
        </svg>

        {VENTURES.map((v, idx) => {
          const isActive = activeIndex === idx;
          const isHovered = hoveredIndex === idx;
          const isStepHighlighted = isHovered || (hoveredIndex === null && isActive);
          const isRight = v.align === "right";

          return (
            <div
              key={v.id}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
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
              {/* Node Container */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 4,
                }}
              >
                {/* 3D Depth Node Orb */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: isStepHighlighted ? v.color : "color-mix(in srgb, var(--card) 90%, #000)",
                    border: `3.5px solid ${v.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isStepHighlighted ? `0 0 35px ${v.color}, inset 0 0 15px rgba(0,0,0,0.5)` : `0 0 16px color-mix(in srgb, ${v.color} 35%, transparent)`,
                    flexShrink: 0,
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isStepHighlighted ? "scale(1.14)" : "scale(1)",
                    zIndex: 3,
                  }}
                >
                  <span style={{ fontSize: "1.2rem", fontWeight: "900", color: isStepHighlighted && v.color !== "#f59e0b" ? "#fff" : v.color, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                    {v.num}
                  </span>

                  {/* Subtle Outer Dashed Ring Slow Spin */}
                  <span
                    style={{
                      position: "absolute",
                      inset: "-10px",
                      borderRadius: "50%",
                      border: `2px dashed ${v.color}`,
                      animation: "spin 16s linear infinite",
                      opacity: isStepHighlighted ? 0.85 : 0.35,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                </div>
              </div>

              {/* Glowing Laser Connector Bar between Node and Card */}
              <div
                className="roadmap-connector-bar"
                style={{
                  flex: "0 0 36px",
                  height: "4px",
                  background: `linear-gradient(${isRight ? "270deg" : "90deg"}, ${v.color}, color-mix(in srgb, ${v.color} 40%, transparent))`,
                  boxShadow: isStepHighlighted ? `0 0 20px ${v.color}` : `0 0 8px color-mix(in srgb, ${v.color} 30%, transparent)`,
                  position: "relative",
                  borderRadius: "2px",
                  zIndex: 2,
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    [isRight ? "left" : "right"]: 0,
                    width: isStepHighlighted ? "9px" : "7px",
                    height: isStepHighlighted ? "9px" : "7px",
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: `0 0 12px ${v.color}`,
                    transition: "all 0.3s ease",
                  }}
                />
              </div>

              {/* Taller Rich 3D Depth Venture Card */}
              <div
                style={{
                  flex: 1,
                  width: "100%",
                  background: isStepHighlighted ? "color-mix(in srgb, var(--card) 95%, var(--cyan) 10%)" : "color-mix(in srgb, var(--card) 88%, transparent)",
                  border: `2px solid ${isStepHighlighted ? v.color : "var(--border)"}`,
                  borderRadius: "24px",
                  padding: "24px 28px",
                  cursor: "pointer",
                  boxShadow: isStepHighlighted ? `0 20px 45px color-mix(in srgb, ${v.color} 30%, transparent), 0 8px 20px rgba(0,0,0,0.2)` : "0 8px 25px rgba(0,0,0,0.15)",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isStepHighlighted ? "translateY(-4px)" : "translateY(0)",
                  zIndex: 2,
                  boxSizing: "border-box",
                }}
              >
                <div className="roadmap-card-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "22px", flexWrap: "wrap" }}>

                  {/* Left Column: Clean Edge-to-Edge Logo + Details */}
                  <div style={{ flex: "1 1 320px", minWidth: 0, display: "flex", alignItems: "center", gap: "20px" }}>

                    {/* Edge-to-edge Logo Container */}
                    <div
                      className="roadmap-card-logo-block"
                      style={{
                        width: "115px",
                        height: "115px",
                        borderRadius: "22px",
                        overflow: "hidden",
                        border: `2.5px solid color-mix(in srgb, ${v.color} 50%, var(--border))`,
                        background: "#000",
                        flexShrink: 0,
                        boxShadow: `0 8px 24px color-mix(in srgb, ${v.color} 30%, rgba(0,0,0,0.4))`,
                      }}
                    >
                      <img
                        src={v.logoImg}
                        alt={v.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>

                    {/* Content Block */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: 0 }}>

                      {/* Title & Status */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <h4 style={{ fontSize: "1.55rem", fontWeight: "800", color: "var(--text)", margin: 0, fontFamily: "Outfit", letterSpacing: "-0.01em" }}>
                          {v.name}
                        </h4>
                        <span style={{ fontSize: "0.76rem", fontWeight: "700", color: "#10b981", display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "999px", background: "color-mix(in srgb, #10b981 12%, var(--card))", border: "1px solid color-mix(in srgb, #10b981 30%, transparent)" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                          {v.status}
                        </span>
                      </div>

                      <span style={{ fontSize: "0.8rem", fontWeight: "700", color: v.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {v.category}
                      </span>

                      {/* Natural Description */}
                      <p style={{ fontSize: "0.93rem", lineHeight: "1.5", color: "var(--muted)", margin: 0 }}>
                        {v.description}
                      </p>

                      {/* Highlight Tags with Venture Color Dot */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                        {v.highlights.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontSize: "0.74rem",
                              fontWeight: "600",
                              color: "var(--text)",
                              background: "color-mix(in srgb, var(--card) 85%, transparent)",
                              border: `1px solid color-mix(in srgb, ${v.color} 30%, var(--border))`,
                              padding: "3px 9px",
                              borderRadius: "6px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: v.color, boxShadow: `0 0 6px ${v.color}` }} />
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Right Column: 2 Action Buttons */}
                  <div className="roadmap-card-actions" style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", flexShrink: 0, minWidth: "150px" }}>
                    {/* Primary Button */}
                    <a
                      href={v.href}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: "800",
                        color: v.color === "#f59e0b" || v.color === "#22d3ee" ? "#000" : "#fff",
                        background: v.color,
                        padding: "11px 22px",
                        borderRadius: "14px",
                        textDecoration: "none",
                        textAlign: "center",
                        boxShadow: `0 0 20px color-mix(in srgb, ${v.color} 40%, transparent), 0 4px 12px rgba(0,0,0,0.2)`,
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      {v.btn1}
                    </a>

                    {/* Secondary Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalVenture(v);
                        setWaitlistSubmitted(false);
                        setWaitlistEmail("");
                      }}
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: "700",
                        color: "var(--text)",
                        background: "color-mix(in srgb, var(--card) 90%, transparent)",
                        border: `1.5px solid color-mix(in srgb, ${v.color} 45%, var(--border))`,
                        padding: "10px 20px",
                        borderRadius: "14px",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      ✨ {v.btn2}
                    </button>
                  </div>

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

      {/* Sleek Ultra-Cool Waitlist / Early Access Modal */}
      {modalVenture && (
        <div
          onClick={() => setModalVenture(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "480px",
              background: "color-mix(in srgb, var(--card) 96%, #000)",
              border: `2px solid color-mix(in srgb, ${modalVenture.color} 60%, var(--border))`,
              borderRadius: "28px",
              padding: "40px 32px 36px",
              boxShadow: `0 25px 70px color-mix(in srgb, ${modalVenture.color} 45%, rgba(0,0,0,0.8)), inset 0 0 30px rgba(0,0,0,0.3)`,
              position: "relative",
              boxSizing: "border-box",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {/* Background Ambient Color Radial Glow */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${modalVenture.color} 0%, transparent 70%)`,
                filter: "blur(50px)",
                opacity: 0.4,
                pointerEvents: "none",
              }}
            />

            {/* Circular Close Icon Button */}
            <button
              type="button"
              onClick={() => setModalVenture(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "color-mix(in srgb, var(--card) 80%, transparent)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: "1.1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s ease",
              }}
            >
              ✕
            </button>

            {/* Big Prominent Logo Frame */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "115px",
                height: "115px",
                borderRadius: "26px",
                background: "#000",
                border: `2.5px solid ${modalVenture.color}`,
                margin: "0 auto 20px",
                overflow: "hidden",
                boxShadow: `0 12px 32px color-mix(in srgb, ${modalVenture.color} 50%, rgba(0,0,0,0.6)), inset 0 0 15px rgba(255,255,255,0.1)`,
              }}
            >
              <img
                src={modalVenture.logoImg}
                alt={modalVenture.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Early Access Badge Pill */}
            <div style={{ position: "relative", zIndex: 2, marginBottom: "12px" }}>
              <span
                style={{
                  fontSize: "0.76rem",
                  fontWeight: "800",
                  letterSpacing: "0.08em",
                  color: modalVenture.color,
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  background: `color-mix(in srgb, ${modalVenture.color} 14%, var(--card))`,
                  border: `1px solid color-mix(in srgb, ${modalVenture.color} 35%, transparent)`,
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: modalVenture.color, boxShadow: `0 0 8px ${modalVenture.color}` }} />
                Early Access Waitlist
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                position: "relative",
                zIndex: 2,
                fontSize: "1.85rem",
                fontWeight: "900",
                fontFamily: "Outfit",
                color: "var(--text)",
                margin: "0 0 8px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Join {modalVenture.name}
            </h3>

            <p style={{ position: "relative", zIndex: 2, fontSize: "0.93rem", color: "var(--muted)", margin: "0 0 24px 0", lineHeight: "1.6" }}>
              Be among the first to get exclusive early access, private preview invites, and launch updates.
            </p>

            {waitlistSubmitted ? (
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  background: "color-mix(in srgb, #10b981 14%, var(--card))",
                  border: "1.5px solid #10b981",
                  borderRadius: "18px",
                  padding: "20px 18px",
                  color: "#10b981",
                  fontWeight: "700",
                  fontSize: "0.98rem",
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "2rem" }}>🎉</span>
                <span>You&apos;re on the list! We&apos;ll notify you when {modalVenture.name} is ready.</span>
              </div>
            ) : (
              <form
                onSubmit={handleWaitlistSubmit}
                style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    disabled={submittingWaitlist}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      border: `1.5px solid color-mix(in srgb, ${modalVenture.color} 30%, var(--border))`,
                      background: "color-mix(in srgb, var(--card) 92%, #000)",
                      color: "var(--text)",
                      fontSize: "0.95rem",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "all 0.2s ease",
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingWaitlist}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background: modalVenture.color,
                    color: modalVenture.color === "#f59e0b" || modalVenture.color === "#22d3ee" ? "#000" : "#fff",
                    fontWeight: "900",
                    fontSize: "0.98rem",
                    cursor: submittingWaitlist ? "wait" : "pointer",
                    opacity: submittingWaitlist ? 0.8 : 1,
                    boxShadow: `0 6px 25px color-mix(in srgb, ${modalVenture.color} 50%, transparent), 0 2px 10px rgba(0,0,0,0.3)`,
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {submittingWaitlist ? "Submitting..." : "Get Early Access →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

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
          .roadmap-card-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .roadmap-card-logo-block {
            width: 90px !important;
            height: 90px !important;
            flex-shrink: 0 !important;
          }
          .roadmap-step-row h4 {
            font-size: clamp(1.2rem, 5vw, 1.45rem) !important;
            overflow-wrap: anywhere;
          }
          .roadmap-card-actions {
            width: 100% !important;
            flex-direction: row !important;
            gap: 10px !important;
          }
          .roadmap-card-actions a,
          .roadmap-card-actions button {
            flex: 1 !important;
            padding: 10px 14px !important;
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </div>
  );
}
