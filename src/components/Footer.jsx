"use client";

export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{
        borderTop: "1px solid rgba(0,245,255,0.06)",
        background: "rgba(5,8,22,0.8)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
        <span
          className="text-lg font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-[var(--glow-cyan)] opacity-60">&lt;</span>
          <span className="text-white">NS</span>
          <span className="text-[var(--glow-cyan)] opacity-60">&nbsp;/&gt;</span>
        </span>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          &copy; {new Date().getFullYear()} Noel Siby. Built with precision & purpose.
        </p>
      </div>
    </footer>
  );
}
