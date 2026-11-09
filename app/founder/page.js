"use client";

import { useEffect, useState, useRef } from "react";

const COMPANY = "BM2GROUP";
const FOUNDER_EMAIL = "amitmatth121@gmail.com";

const ICONS = {
  user: (<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>),
  calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>),
  phone: (<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></>),
  video: (<><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></>),
  chevron: (<polyline points="6 9 12 15 18 9" />),
  check: (<polyline points="20 6 9 17 4 12" />),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
  menu: (<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>),
  close: (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
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

export default function FounderPage() {
  const [theme, toggleTheme] = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Connect Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [connectType, setConnectType] = useState("Google Meeting");
  const [request, setRequest] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !request.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setRequest("");
    }, 800);
  };

  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>

      <header className="nav visible" style={{ justifyContent: "center" }}>
        <nav className={`links ${mobileMenuOpen ? "open" : ""}`} style={{ margin: "0 auto", display: "flex", justifyContent: "center" }}>
          <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/ventures" onClick={() => setMobileMenuOpen(false)}>Ventures</a>
          <a href="/founder" style={{ color: "var(--cyan)" }} onClick={() => setMobileMenuOpen(false)}>Founder</a>
          <a href="/journey" onClick={() => setMobileMenuOpen(false)}>Journey</a>
        </nav>
        <div className="nav-mobile-actions">
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </header>

      <main>
        {/* FOUNDER CONTENT */}
        <div style={{ padding: "120px 24px 90px", maxWidth: "860px", margin: "0 auto" }}>
          {/* PROFILE HERO HEADER */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap", marginBottom: "40px" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "135px",
                  height: "135px",
                  borderRadius: "50%",
                  background: "color-mix(in srgb, var(--cyan) 18%, transparent)",
                  border: "2.5px solid var(--cyan)",
                  boxShadow: "0 0 35px color-mix(in srgb, var(--cyan) 35%, transparent)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--cyan)",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/img.jpg"
                  alt="Amit Matth"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                    userSelect: "none",
                    WebkitUserDrag: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <h1 style={{ fontSize: "2.8rem", fontWeight: "800", fontFamily: "Outfit", marginBottom: "6px", letterSpacing: "-0.02em" }}>
                Amit Matth
              </h1>
              <p style={{ color: "var(--cyan)", fontWeight: "700", fontSize: "1.1rem", marginBottom: "4px" }}>
                Founder, BM2 Group
              </p>
              <a href={`mailto:${FOUNDER_EMAIL}`} style={{ color: "var(--muted)", fontSize: "0.95rem", textDecoration: "none", fontWeight: "500" }}>
                {FOUNDER_EMAIL}
              </a>
            </div>
          </div>

          {/* BIO CONTENT */}
          <div style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "var(--text)", marginBottom: "48px" }}>
            <p style={{ marginBottom: "20px" }}>
              Self-taught programmer who chose an unconventional path after 12th grade. Made the difficult decision to skip traditional college degree route, left JEE coaching, and pursued independent learning. Became an Android developer and cracked Google Summer of Code (GSoC) twice.
            </p>
            <p style={{ color: "var(--muted)" }}>
              And now BM2 is just the beginning. ❤️
            </p>
          </div>

          {/* BOOK A CALL / CONNECT CARD */}
          <div style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: "20px", padding: "36px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "color-mix(in srgb, var(--cyan) 15%, transparent)", color: "var(--cyan)", display: "grid", placeItems: "center", marginBottom: "20px" }}>
              <Icon name="calendar" size={22} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "800", fontFamily: "Outfit", marginBottom: "24px" }}>Connect & Book a Meeting</h3>

            {submitted ? (
              <div style={{ background: "color-mix(in srgb, #10b981 15%, transparent)", border: "1px solid #10b981", padding: "20px", borderRadius: "12px", color: "#10b981", fontWeight: "600", textAlign: "center", marginTop: "24px" }}>
                🎉 Request sent successfully! Amit will review your connection request and reach out soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--muted)" }}>Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amit Kumar"
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: "0.95rem", outline: "none" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--muted)" }}>
                      {connectType === "Phone Call" ? "Phone Number" : "Your Email"}
                    </label>
                    <input
                      type={connectType === "Phone Call" ? "tel" : "email"}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={connectType === "Phone Call" ? "e.g. 9999999999" : "e.g. amit@example.com"}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: "0.95rem", outline: "none" }}
                    />
                  </div>
                </div>

                {/* STYLISH CUSTOM ANIMATED DROPDOWN FOR CONNECTION METHOD */}
                <div style={{ position: "relative" }} ref={dropdownRef}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--muted)" }}>Connection Method</label>
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--text)",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      userSelect: "none",
                      boxShadow: dropdownOpen ? "0 0 0 3px color-mix(in srgb, var(--cyan) 25%, transparent)" : "none",
                      borderColor: dropdownOpen ? "var(--cyan)" : "var(--border)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "600" }}>
                      <span style={{ color: "var(--cyan)", display: "flex", alignItems: "center" }}>
                        <Icon name={connectType === "Phone Call" ? "phone" : "video"} size={18} />
                      </span>
                      <span>{connectType}</span>
                    </div>
                    <span style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", color: "var(--muted)", display: "flex", alignItems: "center" }}>
                      <Icon name="chevron" size={16} />
                    </span>
                  </div>

                  {dropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        background: "var(--card)",
                        border: "1.5px solid var(--border)",
                        borderRadius: "14px",
                        boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
                        zIndex: 50,
                        padding: "6px",
                        animation: "dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      }}
                    >
                      {[
                        { label: "Phone Call", icon: "phone" },
                        { label: "Google Meeting", icon: "video" },
                      ].map((opt) => {
                        const isSelected = connectType === opt.label;
                        return (
                          <div
                            key={opt.label}
                            onClick={() => {
                              setConnectType(opt.label);
                              setDropdownOpen(false);
                            }}
                            style={{
                              padding: "12px 14px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              background: isSelected ? "color-mix(in srgb, var(--cyan) 15%, transparent)" : "transparent",
                              color: isSelected ? "var(--cyan)" : "var(--text)",
                              fontWeight: isSelected ? "700" : "600",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = "color-mix(in srgb, var(--cyan) 8%, transparent)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = "transparent";
                              }
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <span style={{ color: isSelected ? "var(--cyan)" : "var(--muted)", display: "flex", alignItems: "center" }}>
                                <Icon name={opt.icon} size={18} />
                              </span>
                              <span>{opt.label}</span>
                            </div>
                            {isSelected && (
                              <span style={{ color: "var(--cyan)", display: "flex", alignItems: "center" }}>
                                <Icon name="check" size={16} />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "var(--muted)" }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="Briefly describe what you'd like to discuss..."
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: "0.95rem", outline: "none", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn primary"
                  style={{ width: "100%", padding: "14px", borderRadius: "12px", fontWeight: "800", cursor: "pointer", border: "none", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "4px" }}
                >
                  <Icon name="calendar" size={18} />
                  <span>{submitting ? "Submitting..." : "Submit"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "40px 24px", color: "var(--muted)", fontSize: "0.9rem", borderTop: "1px solid var(--border)", marginTop: "80px" }}>
        2026 @ All Rights Reserved BM2Group
      </footer>

      <button className="floating-theme-btn" onClick={toggleTheme} title="Toggle theme">
        <Icon name={theme === "dark" ? "sun" : "moon"} size={22} />
      </button>
    </>
  );
}
