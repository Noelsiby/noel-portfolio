"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

/* ═══════════ 3D Cloud Background (dynamically imported) ═══════════ */
const CloudCanvas = dynamic(
  () => import("./AboutCloud"),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const interestCards = [
  {
    icon: "🛡️",
    title: "Cybersecurity",
    desc: "Building secure systems with zero-trust architecture and SOC operations",
  },
  {
    icon: "☁️",
    title: "Cloud Computing",
    desc: "Exploring modern cloud infrastructure, containers, and DevOps workflows",
  },
  {
    icon: "💻",
    title: "Software Dev",
    desc: "Crafting clean, performant applications with modern frameworks",
  },
];

export default function AboutSection({ bio }) {
  return (
    <section id="about" className="section" style={{ position: "relative" }}>
      {/* 3D Cloud Infrastructure Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Suspense fallback={null}>
          <CloudCanvas />
        </Suspense>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span variants={fadeUp} custom={0} className="section-tag">
            &lt;about&gt;
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            About Me
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="section-line" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bio Card */}
          <motion.div
            className="glass-card p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={3}
          >
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  background:
                    "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))",
                  border: "2px solid rgba(0,245,255,0.3)",
                  color: "var(--glow-cyan)",
                }}
              >
                NS
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {bio.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {bio.title}
                </p>
              </div>
            </div>

            <p
              className="leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
            >
              {bio.about}
            </p>

            {/* Details */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: "🎓",
                  label: "Education",
                  value: "MCA — LEAD College of Management",
                },
                { icon: "📍", label: "Location", value: bio.location },
                {
                  icon: "🔬",
                  label: "Focus Areas",
                  value: "Cloud · Cybersecurity · Software Dev",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <span
                      className="text-xs uppercase tracking-wider block"
                      style={{
                        color: "var(--glow-cyan)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {item.label}
                    </span>
                    <span className="text-sm text-white">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interest Cards */}
          <div className="grid grid-cols-1 gap-4">
            {interestCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="glass-card p-6 flex items-start gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 4}
              >
                <div
                  className="text-3xl w-14 h-14 flex items-center justify-center rounded-xl shrink-0"
                  style={{
                    background: "rgba(0,245,255,0.08)",
                    border: "1px solid rgba(0,245,255,0.15)",
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3
                    className="text-white font-semibold mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
