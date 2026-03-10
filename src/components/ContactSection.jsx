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

function SocialIcon({ platform }) {
  if (platform === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }
  if (platform === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (platform === "Email") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    );
  }
  if (platform === "Twitter" || platform === "X") {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.816L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return null;
}

function getSubtext(link) {
  switch (link.platform) {
    case "GitHub":
      return "@Noelsiby";
    case "LinkedIn":
      return "Noel Siby";
    case "Email":
      return link.url.replace("mailto:", "");
    default:
      return link.url;
  }
}

function HolographicPanel({ link, index }) {
  return (
    <motion.a
      href={link.url}
      target={link.platform === "Email" ? undefined : "_blank"}
      rel={link.platform === "Email" ? undefined : "noopener noreferrer"}
      className="holo-contact-panel group relative flex flex-col items-center gap-4 no-underline"
      style={{
        color: "var(--glow-cyan)",
        background: "rgba(10, 15, 40, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 245, 255, 0.1)",
        borderRadius: "20px",
        padding: "32px 28px",
        minWidth: "180px",
        position: "relative",
        overflow: "hidden",
        textDecoration: "none",
      }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.15 }}
      whileHover={{
        scale: 1.08,
        borderColor: "rgba(0, 245, 255, 0.35)",
        boxShadow:
          "0 0 40px rgba(0,245,255,0.15), 0 0 80px rgba(0,245,255,0.05), inset 0 0 30px rgba(0,245,255,0.03)",
      }}
    >
      {/* Holographic scan line */}
      <div
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
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        className="group-hover:!opacity-100"
      />

      {/* Icon with glow */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-400"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,245,255,0.1), rgba(124,58,237,0.1))",
          border: "1px solid rgba(0,245,255,0.15)",
        }}
      >
        <SocialIcon platform={link.platform} />
      </div>

      <span
        className="text-sm font-semibold text-white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {link.platform}
      </span>
      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {getSubtext(link)}
      </span>

      {/* Bottom glow bar on hover */}
      <div
        className="absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--glow-cyan), transparent)",
        }}
      />
    </motion.a>
  );
}

export default function ContactSection({ social, bio }) {
  return (
    <section id="contact" className="section">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span variants={fadeUp} custom={0} className="section-tag">
            &lt;contact&gt;
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            Get In Touch
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="section-line mx-auto"
          />
        </motion.div>

        <motion.p
          className="mb-10 max-w-lg mx-auto"
          style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Interested in collaborating or discussing a project? Feel free to
          reach out through any of the platforms below.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6">
          {social.map((link, i) => (
            <HolographicPanel key={link.platform} link={link} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
