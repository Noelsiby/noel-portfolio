"use client";

/* ─────── Minimal ambient effects — no scrolling text ─────── */
export default function CyberEffects() {
  return (
    <>
      {/* Subtle corner vignette for cinematic depth */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(5,8,22,0.6) 100%)",
        }}
      />

      {/* Very faint grid only at bottom — ground-plane feel */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.03,
          background:
            "linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      />
    </>
  );
}
