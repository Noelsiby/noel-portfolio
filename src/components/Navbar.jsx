"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-1 text-xl font-bold no-underline"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-[var(--glow-cyan)] opacity-60">&lt;</span>
          <span className="text-white">NS</span>
          <span className="text-[var(--glow-cyan)] opacity-60">&nbsp;/&gt;</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`text-sm font-medium tracking-wider uppercase no-underline transition-colors duration-300 ${
                  active === link.label
                    ? "text-[var(--glow-cyan)] glow-text"
                    : "text-[var(--text-secondary)] hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[var(--glow-cyan)]"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-[var(--glow-cyan)]"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[var(--glow-cyan)]"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass mt-4 p-6 rounded-2xl"
          >
            <ul className="flex flex-col gap-4 list-none">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActive(link.label);
                      setMobileOpen(false);
                    }}
                    className={`text-sm font-medium tracking-wider uppercase no-underline ${
                      active === link.label
                        ? "text-[var(--glow-cyan)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
