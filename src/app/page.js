"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GlitchText from "@/components/GlitchText";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectCards from "@/components/ProjectCards";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import { bioData, projectsData, skillsData, socialData } from "@/lib/data";

// Dynamic 3D components
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="hero-canvas" style={{ background: "var(--bg-primary)" }} />
  ),
});
const CyberEffects = dynamic(() => import("@/components/CyberEffects"), {
  ssr: false,
});

export default function Home() {
  const [data, setData] = useState({
    bio: bioData,
    projects: projectsData,
    skills: skillsData,
    social: socialData,
  });

  // Load data from API (Supabase) with fallback to local defaults
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/data");
        if (!res.ok) throw new Error("API error");
        const apiData = await res.json();
        // Normalize projects tags
        if (apiData.projects) {
          apiData.projects = apiData.projects.map((p) => ({
            ...p,
            tags:
              typeof p.tags === "string"
                ? p.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : p.tags,
          }));
        }
        setData({
          bio: { ...bioData, ...(apiData.bio || {}) },
          projects: apiData.projects || projectsData,
          skills: apiData.skills || skillsData,
          social: apiData.social || socialData,
        });
      } catch (e) {
        // Fallback: try localStorage, then defaults
        try {
          const stored = localStorage.getItem("portfolio-data");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.projects) {
              parsed.projects = parsed.projects.map((p) => ({
                ...p,
                tags:
                  typeof p.tags === "string"
                    ? p.tags.split(",").map((t) => t.trim()).filter(Boolean)
                    : p.tags,
              }));
            }
            setData({
              bio: { ...bioData, ...(parsed.bio || {}) },
              projects: parsed.projects || projectsData,
              skills: parsed.skills || skillsData,
              social: parsed.social || socialData,
            });
          }
        } catch {}
      }
    }
    loadData();
  }, []);

  return (
    <main>
      {/* Cyber overlay effects */}
      <Suspense>
        <CyberEffects />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      <ScrollAnimations>
        {/* ═══════════ HERO ═══════════ */}
        <section id="hero" className="section" style={{ position: "relative" }}>
          <Suspense
            fallback={
              <div
                className="hero-canvas"
                style={{ background: "var(--bg-primary)" }}
              />
            }
          >
            <HeroScene />
          </Suspense>

          {/* Hero Content Overlay */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.p
              className="mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.9rem",
                color: "var(--glow-cyan)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="opacity-60">&gt;</span> Hello, I&apos;m
            </motion.p>

            <GlitchText text={data.bio.name} subtitle={data.bio.title} />

            <motion.p
              className="mt-6 max-w-xl mx-auto"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              I build secure software systems, explore cloud infrastructure, and
              develop technology solutions focused on performance and security.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <a href="#projects" className="btn-cyber btn-primary-cyber">
                <span>◆</span> View Projects
              </a>
              <a
                href={data.bio.resumeUrl || "#"}
                className="btn-cyber"
              >
                <svg
                  width="14"
                  height="14"
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
              </a>
              <a href="#contact" className="btn-cyber">
                <span>▸</span> Contact
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex justify-center gap-10 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              {[
                { value: String(data.projects.length), label: "Projects" },
                { value: String(data.skills.length), label: "Technologies" },
                { value: "MCA", label: "Pursuing" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span
                    className="block text-2xl font-bold glow-text"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--glow-cyan)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
            <span
              className="text-xs uppercase tracking-wider"
              style={{
                color: "var(--glow-cyan)",
                fontFamily: "var(--font-display)",
              }}
            >
              Scroll Down
            </span>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <AboutSection bio={data.bio} />

        {/* ═══════════ RESUME ═══════════ */}
        <ResumeSection bio={data.bio} />

        {/* ═══════════ SKILLS ═══════════ */}
        <SkillsSection skills={data.skills} />

        {/* ═══════════ PROJECTS ═══════════ */}
        <ProjectCards projects={data.projects} />

        {/* ═══════════ CONTACT ═══════════ */}
        <ContactSection social={data.social} bio={data.bio} />
      </ScrollAnimations>

      <Footer />
    </main>
  );
}
