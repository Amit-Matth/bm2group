"use client";

import VentureRoadmap from "../../components/VentureRoadmap";
import Navbar from "@/components/Navbar";

export default function VenturesPage() {
  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="glow g1" />
        <span className="glow g2" />
        <span className="grid" />
      </div>

      <Navbar />

      <main style={{ width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
        {/* VENTURES CONTENT */}
        <div className="ventures-page" style={{ padding: "120px 16px 100px", maxWidth: "1100px", margin: "0 auto", width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <h1 style={{ fontSize: "2.8rem", fontWeight: "800", fontFamily: "Outfit", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                What&apos;s Next?
              </h1>
              <p style={{ fontSize: "1.15rem", color: "var(--muted)", maxWidth: "640px", margin: "0 auto" }}>
                A look at our upcoming ventures and what we&apos;re working on.
              </p>
            </div>

            <div style={{ width: "100%" }}>
              <VentureRoadmap />
            </div>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: "40px 24px", color: "var(--muted)", fontSize: "0.9rem", borderTop: "1px solid var(--border)", marginTop: "80px" }}>
        2026 @ All Rights Reserved BM2Group
      </footer>
    </>
  );
}
