"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ─── Hero parallax: push 3D scene back + fade on scroll ─── */
      const hero = document.querySelector("#hero");
      if (hero) {
        const heroCanvas = hero.querySelector(".hero-canvas");
        const heroContent = hero.querySelector(".relative.z-10");

        if (heroCanvas) {
          gsap.to(heroCanvas, {
            scale: 1.15,
            opacity: 0.3,
            filter: "blur(4px)",
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (heroContent) {
          gsap.to(heroContent, {
            y: -80,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "20% top",
              end: "70% top",
              scrub: true,
            },
          });
        }

        // Scroll indicator — fade out fast
        const scrollInd = hero.querySelector(".scroll-indicator");
        if (scrollInd) {
          gsap.to(scrollInd, {
            opacity: 0,
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "5% top",
              end: "15% top",
              scrub: true,
            },
          });
        }
      }

      /* ─── Section reveals: cinematic slide-up + scale ─── */
      const sections = document.querySelectorAll(".section");
      sections.forEach((section, i) => {
        if (i === 0) return; // Hero handled above

        // Section title zoom-in
        const title = section.querySelector(".section-title");
        if (title) {
          gsap.fromTo(
            title,
            { scale: 0.85, opacity: 0, y: 40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 50%",
                scrub: 0.8,
              },
            }
          );
        }

        // Section content slide up with depth effect
        gsap.fromTo(
          section,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      });

      /* ─── Glass cards: staggered 3D entrance ─── */
      gsap.utils.toArray(".glass-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateX: 8,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 60%",
              scrub: 0.5,
            },
          }
        );
      });

      /* ─── Holographic cards: rise with glow ─── */
      gsap.utils.toArray(".holo-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 60%",
              scrub: 0.5,
            },
          }
        );
      });

      /* ─── Card flip containers: fly-in with 3D rotation ─── */
      gsap.utils.toArray(".card-flip-container").forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotateY: -15,
            scale: 0.85,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );
      });

      /* ─── Contact holographic panels: staggered entrance ─── */
      gsap.utils.toArray(".holo-contact-panel").forEach((panel, i) => {
        gsap.fromTo(
          panel,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 90%",
              end: "top 65%",
              scrub: 0.4,
            },
          }
        );
      });

      /* ─── Digital map parallax ─── */
      gsap.utils.toArray(".digital-map").forEach((map) => {
        gsap.to(map, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: map.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* ─── Section line: grow on scroll ─── */
      gsap.utils.toArray(".section-line").forEach((line) => {
        gsap.fromTo(
          line,
          { width: 0, opacity: 0 },
          {
            width: 60,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
