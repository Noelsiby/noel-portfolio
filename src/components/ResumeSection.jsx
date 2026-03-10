"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

function HolographicCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`holo-card ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        borderColor: "rgba(0, 245, 255, 0.35)",
        boxShadow:
          "0 0 40px rgba(0,245,255,0.12), 0 0 80px rgba(0,245,255,0.05), inset 0 0 30px rgba(0,245,255,0.03)",
      }}
      style={{
        background: "rgba(10, 15, 40, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 245, 255, 0.12)",
        borderRadius: "20px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Holographic scan line */}
      <div
        className="holo-scanline"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,245,255,0.5), transparent)",
          animation: "holoScan 3s linear infinite",
          pointerEvents: "none",
        }}
      />
      {children}
    </motion.div>
  );
}

export default function ResumeSection({ bio }) {
  const education = bio.education || [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "LEAD College of Management, Palakkad",
      year: "2024 — Present",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Farook College, Kozhikode",
      year: "2021 — 2024",
    },
  ];

  const certifications = bio.certifications || [
    "AWS Cloud Foundations",
    "Cybersecurity Essentials",
    "Python for Data Science",
  ];

  return (
    <section id="resume" className="section" style={{ position: "relative" }}>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span variants={fadeUp} custom={0} className="section-tag">
            &lt;resume&gt;
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            Resume
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="section-line mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education Panel */}
          <HolographicCard delay={0.3}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))",
                  border: "1px solid rgba(0,245,255,0.2)",
                }}
              >
                🎓
              </div>
              <h3
                className="text-white font-bold text-lg"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.04em",
                }}
              >
                Education
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="relative pl-6"
                  style={{
                    borderLeft: "2px solid rgba(0,245,255,0.2)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[7px] top-1 w-3 h-3 rounded-full"
                    style={{
                      background: "var(--glow-cyan)",
                      boxShadow: "0 0 8px rgba(0,245,255,0.5)",
                    }}
                  />
                  <h4
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {edu.institution}
                  </p>
                  <span
                    className="text-xs mt-1 inline-block px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(0,245,255,0.08)",
                      color: "var(--glow-cyan)",
                      border: "1px solid rgba(0,245,255,0.15)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {edu.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </HolographicCard>

          {/* Certifications Panel */}
          <HolographicCard delay={0.45}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,245,255,0.15))",
                  border: "1px solid rgba(124,58,237,0.2)",
                }}
              >
                📜
              </div>
              <h3
                className="text-white font-bold text-lg"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.04em",
                }}
              >
                Certifications
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: "rgba(0,245,255,0.04)",
                    border: "1px solid rgba(0,245,255,0.08)",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{
                    borderColor: "rgba(0,245,255,0.25)",
                    background: "rgba(0,245,255,0.06)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--glow-cyan)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                    }}
                  >
                    ▸
                  </span>
                  <span className="text-sm text-white">
                    {typeof cert === "string" ? cert : cert.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </HolographicCard>
        </div>

        {/* About + Download Row */}
        <HolographicCard className="mt-6 text-center" delay={0.6}>
          {/* Avatar */}
          <motion.div
            className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              background:
                "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))",
              border: "3px solid rgba(0,245,255,0.4)",
              color: "var(--glow-cyan)",
              boxShadow:
                "0 0 30px rgba(0,245,255,0.2), inset 0 0 20px rgba(0,245,255,0.1)",
            }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(0,245,255,0.2), inset 0 0 20px rgba(0,245,255,0.1)",
                "0 0 50px rgba(0,245,255,0.35), inset 0 0 30px rgba(0,245,255,0.2)",
                "0 0 30px rgba(0,245,255,0.2), inset 0 0 20px rgba(0,245,255,0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            NS
          </motion.div>

          <p
            className="max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
          >
            {bio.about}
          </p>

          {/* Info chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {[
              { icon: "📍", value: bio.location },
              { icon: "🎓", value: "MCA — LEAD College" },
              { icon: "🔬", value: "Cloud · Security · Dev" },
            ].map((chip) => (
              <span
                key={chip.value}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(0,245,255,0.06)",
                  border: "1px solid rgba(0,245,255,0.12)",
                  color: "var(--text-primary)",
                }}
              >
                <span>{chip.icon}</span> {chip.value}
              </span>
            ))}
          </div>

          {/* Download Resume */}
          <motion.a
            href={bio.resumeUrl || "#"}
            className="btn-cyber btn-primary-cyber inline-flex items-center gap-3"
            style={{ fontSize: "0.85rem", padding: "1rem 2.5rem" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </motion.a>
        </HolographicCard>
      </div>
    </section>
  );
}
