"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

function ProjectCard({ project, index }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const tags =
    typeof project.tags === "string"
      ? project.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : project.tags;

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current || flipped) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-y * 12);
      rotateY.set(x * 12);
    },
    [rotateX, rotateY, flipped]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      className="card-flip-container"
      style={{
        height: "340px",
        perspective: "1200px",
        rotateX: flipped ? 0 : springX,
        rotateY: flipped ? 0 : springY,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onClick={() => setFlipped(!flipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div
        className={`card-flip-inner ${flipped ? "flipped" : ""}`}
        style={{ height: "100%" }}
      >
        {/* FRONT */}
        <div
          className="card-front flex flex-col justify-between group"
          style={{
            background: "rgba(10, 15, 40, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 245, 255, 0.1)",
            padding: "28px",
            height: "100%",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(0,245,255,0.03)",
            transition: "box-shadow 0.4s ease, border-color 0.4s ease",
          }}
        >
          {/* Top glow bar */}
          <div
            className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
            style={{
              background:
                "linear-gradient(90deg, var(--glow-cyan), var(--glow-purple), var(--glow-cyan))",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s linear infinite",
            }}
          />

          {/* Hover glow pulse */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              boxShadow:
                "inset 0 0 30px rgba(0,245,255,0.05), 0 0 40px rgba(0,245,255,0.08)",
            }}
          />

          <div>
            <div className="flex items-start justify-between mb-5">
              <div
                className="text-4xl w-14 h-14 flex items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,245,255,0.1), rgba(124,58,237,0.1))",
                  border: "1px solid rgba(0,245,255,0.15)",
                }}
              >
                {project.icon}
              </div>
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(0,245,255,0.08)",
                  border: "1px solid rgba(0,245,255,0.15)",
                  fontSize: "0.75rem",
                  color: "var(--glow-cyan)",
                }}
                animate={{ rotate: flipped ? 180 : 0 }}
              >
                ↻
              </motion.div>
            </div>
            <h3
              className="text-white font-bold mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                letterSpacing: "0.02em",
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}
            >
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(0,245,255,0.06)",
                  color: "var(--glow-cyan)",
                  border: "1px solid rgba(0,245,255,0.12)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* BACK */}
        <div
          className="card-back flex flex-col items-center justify-center text-center"
          style={{
            background: "rgba(8, 12, 35, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(124, 58, 237, 0.2)",
            padding: "28px",
            height: "100%",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(124,58,237,0.05)",
          }}
        >
          <span className="text-5xl mb-5">{project.icon}</span>
          <h3
            className="text-white font-bold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-xs mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Click to flip back
          </p>
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber btn-primary-cyber"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectCards({ projects }) {
  return (
    <section id="projects" className="section" style={{ position: "relative" }}>
      {/* Digital Map Background */}
      <div className="digital-map" />
      <div className="map-pulse" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span variants={fadeUp} custom={0} className="section-tag">
            &lt;projects&gt;
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="section-title">
            My Projects
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="section-line mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
