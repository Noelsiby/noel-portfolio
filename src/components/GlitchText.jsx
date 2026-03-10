"use client";

import { motion } from "framer-motion";

export default function GlitchText({ text, subtitle, className = "" }) {
  return (
    <div className={className}>
      {/* Main name — professional silver-white gradient */}
      <motion.h1
        className="glitch"
        data-text={text}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 800,
          letterSpacing: "0.06em",
          lineHeight: 1.1,
          background: "linear-gradient(135deg, #ffffff 0%, #c8d6e5 40%, #ffffff 60%, #a4b0be 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 30px rgba(200, 214, 229, 0.15))",
        }}
      >
        {text}
      </motion.h1>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.75rem, 2vw, 1.05rem)",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "#94a3b8",
            marginTop: "1rem",
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
