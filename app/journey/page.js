"use client";

import { useEffect, useState, useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const COMPANY = "BM2GROUP";

const ICONS = {
  calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>),
  chevronDown: (<polyline points="6 9 12 15 18 9" />),
  plus: (<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>),
  close: (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
  menu: (<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>),
  cpu: (<><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" /></>),
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

const DEFAULT_JOURNEY = [
  {
    id: "entry-1",
    date: "November 01, 2026",
    title: "Domain Acquisition",
    summary: "Secured a domain for BM2 Group",
    details: "Purchased the bm2group.in domain marking the first small step towards our vision.",
    imageUrl: "/GROUP.jpg"
  },
  {
    id: "entry-2",
    date: "November 09, 2026",
    title: "Launch of BM2 Group",
    summary: "Our journey begins from here.",
    details: "Today marks the launch of BM2 Group. An umbrella for multiple ventures, connecting hearts, creating opportunities and making the difference.",
    imageUrl: ""
  },
  {
    id: "entry-3",
    date: "November 16, 2026",
    title: "BM2 Sipware",
    summary: "Launch: 9:00 AM, November 16, 2026",
    details: "",
    imageUrl: ""
  }
];

export default function JourneyPage() {
  const [theme, toggleTheme] = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedIndices, setExpandedIndices] = useState({ 0: true });
  const [entries, setEntries] = useState(DEFAULT_JOURNEY);
  const [cardHeights, setCardHeights] = useState({});
  const [cardTabs, setCardTabs] = useState({}); // { [index]: "text" | "media" }
  const [lightboxImage, setLightboxImage] = useState(null); // { url, title }

  const fetchJourney = async () => {
    try {
      const res = await fetch("/api/journey");
      const data = await res.json();
      if (data.journey) setEntries(data.journey);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    fetchJourney();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cardRefs = useRef({});

  const toggleNode = (index) => {
    setExpandedIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Measure card heights dynamically using ResizeObserver
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers = [];
    entries.forEach((_, index) => {
      const el = cardRefs.current[index];
      if (el) {
        const observer = new ResizeObserver((observedEntries) => {
          for (let entry of observedEntries) {
            const h = Math.round(entry.target.offsetHeight);
            if (h > 0) {
              setCardHeights(prev => {
                if (prev[index] === h) return prev;
                return { ...prev, [index]: h };
              });
            }
          }
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [entries, expandedIndices, cardTabs]);

  const handleImageLoad = (index) => {
    const el = cardRefs.current[index];
    if (el) {
      const h = Math.round(el.offsetHeight);
      if (h > 0) {
        setCardHeights(prev => ({ ...prev, [index]: h }));
      }
    }
  };

  const getCardHeight = (idx) => {
    if (cardHeights[idx] && cardHeights[idx] > 0) {
      return cardHeights[idx];
    }
    const item = entries[idx];
    if (!item) return 180;
    const isExp = !!expandedIndices[idx];
    const isMediaTab = cardTabs[idx] === "media";
    if (isMediaTab) return 340;
    let base = 140;
    if (isExp) base += 200;
    return base;
  };

  const getCardY = (index) => {
    let totalRows = Math.ceil((index + 1) / 2);
    let rowTop = 0;

    for (let r = 0; r < totalRows - 1; r++) {
      let leftIdx = 2 * r;
      let rightIdx = 2 * r + 1;

      let hLeft = getCardHeight(leftIdx);
      let hRight = (rightIdx < entries.length) ? getCardHeight(rightIdx) : 0;

      let leftEnd = rowTop + hLeft;
      let rightEnd = (rightIdx < entries.length) ? (rowTop + 80 + hRight) : 0;

      let rowBottom = Math.max(leftEnd, rightEnd);
      rowTop = rowBottom + 50; // 50px vertical gap between rows
    }

    let isRight = index % 2 === 1;
    return isRight ? rowTop + 80 : rowTop;
  };

  const generateSPath = () => {
    let points = entries.map((_, index) => {
      let isRight = index % 2 === 1;
      let x = isRight ? 540 : 440;
      let y = getCardY(index) + 25; // 25px down into card header bar
      return { x, y };
    });

    if (points.length === 0) return "";

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      let p1 = points[i];
      let p2 = points[i + 1];

      if (p1.x < p2.x) {
        let c1x = 490;
        let c1y = p1.y;
        let c2x = 530;
        let c2y = p2.y;
        path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
      } else {
        let midY = p1.y + (p2.y - p1.y) * 0.45;
        let c1x = 520;
        let c1y = midY;
        let c2x = 485;
        let c2y = p2.y - 20;
        path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
      }
    }
    return path;
  };

  const computedTotalHeight = (() => {
    if (entries.length === 0) return 600;
    let totalRows = Math.ceil(entries.length / 2);
    let rowTop = 0;
    let maxBottom = 0;

    for (let r = 0; r < totalRows; r++) {
      let leftIdx = 2 * r;
      let rightIdx = 2 * r + 1;

      let hLeft = getCardHeight(leftIdx);
      let hRight = (rightIdx < entries.length) ? getCardHeight(rightIdx) : 0;

      let leftEnd = rowTop + hLeft;
      let rightEnd = (rightIdx < entries.length) ? (rowTop + 80 + hRight) : 0;

      maxBottom = Math.max(leftEnd, rightEnd);
      rowTop = maxBottom + 50;
    }

    return Math.max(600, maxBottom + 100);
  })();

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
          <a href="/ventures" onClick={() => setMobileMenuOpen(false)}>Ventures</a>
          <a href="/founder" onClick={() => setMobileMenuOpen(false)}>Founder</a>
          <a href="/journey" style={{ color: "var(--cyan)" }} onClick={() => setMobileMenuOpen(false)}>Journey</a>
        </nav>
        <div className="nav-mobile-actions">
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </header>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(14px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "88vh",
              background: "var(--card)",
              border: "1.5px solid var(--cyan)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 0 50px rgba(0, 212, 255, 0.35)",
            }}
          >
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(0,0,0,0.75)",
                color: "#fff",
                border: "1px solid var(--cyan)",
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
              title="Close modal"
            >
              <Icon name="close" size={20} />
            </button>

            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
                padding: "20px",
              }}
            />
            <div style={{ padding: "16px 24px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontFamily: "Outfit", color: "var(--text)" }}>
                {lightboxImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* JOURNEY CONTENT */}
        <div className="journey-page" style={{ padding: "120px 24px 140px", maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          {/* HEADER */}
          <div style={{ marginBottom: "50px", textAlign: "center" }}>
            <h1 style={{ fontSize: "2.8rem", fontWeight: "800", fontFamily: "'Great Vibes', cursive", marginBottom: "10px", letterSpacing: "-0.02em" }}>
              BM2 Group
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "1.15rem", margin: "0 auto", maxWidth: "640px" }}>
              The live timeline of our achievements, milestones, updates, and strategic evolution.
            </p>
          </div>

          {/* S-CURVE NETWORK LAYOUT WITH GUTTER-ROUTED CONNECTION PATH */}
          <div
            className="journey-container"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              margin: "0 auto",
              height: `${computedTotalHeight}px`,
              transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <svg
              className="journey-svg"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
              }}
              viewBox={`0 0 1000 ${computedTotalHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="scurveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="var(--blue)" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="var(--orange)" stopOpacity="0.75" />
                </linearGradient>
                <filter id="scurveGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <path
                key={JSON.stringify(expandedIndices) + JSON.stringify(cardHeights) + JSON.stringify(cardTabs)}
                className="animated-path"
                d={generateSPath()}
                fill="none"
                stroke="url(#scurveGrad)"
                strokeWidth="3.5"
                strokeDasharray="7 7"
                strokeLinecap="round"
                filter="url(#scurveGlow)"
                opacity="0.85"
              />

              {entries.map((_, index) => {
                const isRight = index % 2 === 1;
                const x = isRight ? 540 : 440;
                const y = getCardY(index) + 25;
                return (
                  <g key={`pin-dot-${index}`}>
                    <circle cx={x} cy={y} r="5" fill="var(--cyan)" filter="url(#scurveGlow)" />
                    <circle cx={x} cy={y} r="2.5" fill="#fff" />
                  </g>
                );
              })}
            </svg>

            {entries.map((item, index) => {
              const isExpanded = !!expandedIndices[index];
              const isRightColumn = index % 2 === 1;
              const isDomainNode = index === 0;
              const isGroupLaunchNode = index === 1;
              const isSipwareNode = index === 2;
              const topPos = getCardY(index);
              const activeTab = "text";

              return (
                <div
                  key={item.id || index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => {
                    if (!isSipwareNode) toggleNode(index);
                  }}
                  className={`journey-card ${isRightColumn ? "journey-card-right" : "journey-card-left"}`}
                  style={{
                    position: "absolute",
                    top: `${topPos}px`,
                    left: isRightColumn ? "540px" : "0px",
                    width: "440px",
                    background: isSipwareNode
                      ? "linear-gradient(135deg, color-mix(in srgb, var(--card) 92%, var(--cyan) 8%), color-mix(in srgb, var(--card) 88%, var(--blue) 12%))"
                      : isExpanded
                        ? "color-mix(in srgb, var(--card) 96%, var(--cyan) 8%)"
                        : "var(--card)",
                    border: isSipwareNode
                      ? "1.5px solid color-mix(in srgb, var(--cyan) 65%, var(--blue))"
                      : isExpanded ? "2px solid var(--cyan)" : "1.5px solid var(--border)",
                    borderRadius: "18px",
                    backdropFilter: "blur(18px)",
                    boxShadow: isSipwareNode
                      ? "0 0 30px color-mix(in srgb, var(--cyan) 22%, transparent), 0 18px 42px rgba(0,0,0,0.16)"
                      : isExpanded
                      ? "0 0 35px color-mix(in srgb, var(--cyan) 30%, transparent), 0 15px 40px rgba(0,0,0,0.3)"
                      : "0 8px 30px rgba(0,0,0,0.12)",
                    cursor: "pointer",
                    transition: "top 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                    zIndex: 1,
                    overflow: "hidden",
                  }}
                >
                  {isExpanded && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, transparent, var(--cyan), transparent)",
                        boxShadow: "0 0 15px var(--cyan)",
                      }}
                    />
                  )}

                  <div
                    style={{
                      background: isSipwareNode
                        ? "linear-gradient(100deg, color-mix(in srgb, var(--cyan) 28%, var(--bg)), color-mix(in srgb, var(--blue) 18%, var(--bg)))"
                        : "color-mix(in srgb, var(--cyan) 15%, var(--border))",
                      padding: "10px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid var(--border)",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          background: "var(--cyan)",
                          color: "#000",
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Outfit",
                          fontWeight: "900",
                          fontSize: "0.85rem",
                          boxShadow: "0 0 10px var(--cyan)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <span style={{ fontSize: "0.82rem", fontWeight: "800", fontFamily: "Outfit", color: "var(--text)", letterSpacing: "0.05em" }}>
                        NODE // {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {!isSipwareNode && (
                        <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "var(--muted)" }}>
                          {item.date}
                        </span>
                      )}
                      <div className="pin-output" />
                    </div>
                  </div>

                  <div style={{ padding: "22px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", gap: "10px" }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "700", fontFamily: "Outfit", color: "var(--text)", margin: 0 }}>
                        {isSipwareNode ? "BM2 Sipware" : isGroupLaunchNode ? "Launch of BM2 Group" : item.title}
                      </h3>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {false && item.imageUrl && (
                          <div
                            style={{ display: "flex", gap: "3px", background: "rgba(0,0,0,0.25)", padding: "3px", borderRadius: "8px", border: "1px solid var(--border)" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => setCardTabs(prev => ({ ...prev, [index]: "text" }))}
                              style={{
                                padding: "3px 8px",
                                fontSize: "0.72rem",
                                fontWeight: "800",
                                fontFamily: "Outfit",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                background: activeTab === "text" ? "var(--cyan)" : "transparent",
                                color: activeTab === "text" ? "#000" : "var(--muted)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              📄 Text
                            </button>
                            <button
                              onClick={() => setCardTabs(prev => ({ ...prev, [index]: "media" }))}
                              style={{
                                padding: "3px 8px",
                                fontSize: "0.72rem",
                                fontWeight: "800",
                                fontFamily: "Outfit",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                background: activeTab === "media" ? "var(--cyan)" : "transparent",
                                color: activeTab === "media" ? "#000" : "var(--muted)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              🖼️ Media
                            </button>
                          </div>
                        )}

                        {!isSipwareNode && <div
                          style={{
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.35s ease",
                            color: "var(--cyan)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon name="chevronDown" size={18} />
                        </div>}
                      </div>
                    </div>

                    {activeTab === "media" ? (
                      <div style={{ animation: "fadeIn 0.3s ease" }}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxImage({ url: item.imageUrl, title: item.title });
                          }}
                          style={{
                            position: "relative",
                            borderRadius: "14px",
                            overflow: "hidden",
                            height: "240px",
                            background: "rgba(0, 0, 0, 0.45)",
                            border: "1.5px solid var(--cyan)",
                            boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 20px color-mix(in srgb, var(--cyan) 15%, transparent)",
                            cursor: "zoom-in",
                            marginBottom: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            onLoad={() => handleImageLoad(index)}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                              display: "block",
                              padding: "8px",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              background: "rgba(0, 0, 0, 0.75)",
                              color: "var(--cyan)",
                              fontSize: "0.75rem",
                              fontWeight: "800",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              border: "1px solid var(--cyan)",
                              backdropFilter: "blur(6px)",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span>🔍 Expand Lightbox</span>
                          </div>
                        </div>
                        <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: "1.5", margin: 0, fontStyle: "italic" }}>
                          {isSipwareNode
                            ? "Launch: 9:00 AM, November 16, 2026"
                            : isDomainNode
                              ? "Secured a domain for BM2 Group"
                            : isGroupLaunchNode
                              ? "Our journey begins from here."
                              : item.summary}
                        </p>
                      </div>
                    ) : (
                      <div style={{ animation: "fadeIn 0.3s ease" }}>
                        <p style={isSipwareNode
                          ? {
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              color: "var(--text)",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                              fontWeight: "700",
                              margin: 0,
                              padding: "10px 14px",
                              borderRadius: "12px",
                              background: "color-mix(in srgb, var(--cyan) 12%, transparent)",
                              border: "1px solid color-mix(in srgb, var(--cyan) 30%, var(--border))",
                            }
                          : { color: "var(--muted)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                          {isSipwareNode && <Icon name="calendar" size={17} />}
                          {isSipwareNode
                            ? "Launch: 9:00 AM, November 16, 2026"
                            : isDomainNode
                              ? "Secured a domain for BM2 Group"
                            : isGroupLaunchNode
                              ? "Our journey begins from here."
                              : item.summary}
                        </p>

                        {!isSipwareNode && <div
                          style={{
                            maxHeight: isExpanded ? "320px" : "0px",
                            opacity: isExpanded ? 1 : 0,
                            overflow: "hidden",
                            transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, margin 0.3s ease",
                            marginTop: isExpanded ? "16px" : "0px",
                          }}
                        >
                          <div
                            style={{
                              paddingTop: "14px",
                              borderTop: "1px solid color-mix(in srgb, var(--cyan) 25%, var(--border))",
                              color: "var(--text)",
                              fontSize: "0.95rem",
                              lineHeight: "1.7",
                            }}
                          >
                            <p style={{ margin: 0 }}>
                              {isDomainNode
                                ? "Purchased the bm2group.in domain marking the first small step towards our vision."
                                : isGroupLaunchNode
                                  ? "Today marks the launch of BM2 Group. An umbrella for multiple ventures, connecting hearts, creating opportunities and making the difference."
                                  : item.details}
                            </p>
                          </div>
                        </div>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: "40px 24px", color: "var(--muted)", fontSize: "0.9rem", borderTop: "1px solid var(--border)", marginTop: "80px" }}>
        2026 @ All Rights Reserved BM2Group
      </footer>

      <ThemeToggle />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pin-output {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
        }
        @keyframes pathExpandPulse {
          0% {
            stroke-dashoffset: 40;
            opacity: 0.2;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.8;
          }
        }
        .animated-path {
          animation: pathExpandPulse 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: d 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 768px) {
          .journey-container {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 28px !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 12px 0 42px !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          .journey-container::before {
            content: "";
            position: absolute;
            top: 12px;
            bottom: 12px;
            left: 22px;
            width: 3px;
            border-radius: 3px;
            background: linear-gradient(to bottom, var(--cyan), var(--blue) 50%, var(--orange));
            box-shadow: 0 0 14px color-mix(in srgb, var(--cyan) 65%, transparent);
            z-index: 0;
          }
          .journey-card {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-left: 0 !important;
            overflow: visible !important;
            box-sizing: border-box !important;
          }
          .journey-card::before {
            content: "";
            position: absolute;
            left: -26px;
            top: 24px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--cyan);
            border: 2.5px solid var(--bg);
            box-shadow: 0 0 12px var(--cyan);
            z-index: 2;
          }
          .journey-card::after {
            content: "";
            position: absolute;
            left: -26px;
            top: 29px;
            width: 26px;
            height: 2px;
            background: var(--cyan);
            box-shadow: 0 0 8px var(--cyan);
            z-index: 1;
          }
          .journey-svg {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .journey-page { padding: 92px 18px 90px !important; }
          .journey-page > div:first-child { margin-bottom: 32px !important; }
          .journey-page h1 { font-size: 2.35rem !important; }
          .journey-page p { font-size: 1rem !important; }
        }
      `}</style>
    </>
  );
}
