"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useCallback } from "react";
import * as THREE from "three";

/* ═══════════ Orbiting 3D Skill Sphere ═══════════ */
function SkillSphere({ position, color, index, total }) {
  const ref = useRef();
  const angle = (index / total) * Math.PI * 2;
  const radius = 4;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.3 + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius * 0.5;
    ref.current.position.y = Math.sin(t * 1.5) * 1.2 + position[1];
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.015;
  });

  return (
    <Float speed={2} rotationIntensity={0.3}>
      <group ref={ref} position={position}>
        <mesh>
          <icosahedronGeometry args={[0.35, 2]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.8}
            roughness={0.15}
            emissive={color}
            emissiveIntensity={0.5}
            clearcoat={1}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.22, 1]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SkillsBackground({ skills }) {
  const colors = [
    "#f0db4f",
    "#3776AB",
    "#E44D26",
    "#1572B6",
    "#ffffff",
    "#2396ED",
    "#FCC624",
    "#F05032",
  ];

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00f5ff" />
      <pointLight position={[-5, -5, -3]} intensity={0.8} color="#7c3aed" />
      <Stars
        radius={30}
        depth={40}
        count={500}
        factor={2}
        saturation={0.3}
        fade
        speed={0.3}
      />
      {skills.map((skill, i) => (
        <SkillSphere
          key={skill.name}
          position={[0, 0, 0]}
          color={colors[i % colors.length]}
          index={i}
          total={skills.length}
        />
      ))}
    </>
  );
}

/* ═══════════ Mouse-Tracking 3D Tilt Skill Card ═══════════ */
const skillIcons = {
  Python: {
    emoji: "🐍",
    gradient: "linear-gradient(135deg, #306998, #FFD43B)",
  },
  JavaScript: {
    emoji: "⚡",
    gradient: "linear-gradient(135deg, #f0db4f, #323330)",
  },
  HTML: {
    emoji: "🌐",
    gradient: "linear-gradient(135deg, #E44D26, #F16529)",
  },
  CSS: {
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #1572B6, #33A9DC)",
  },
  Flask: {
    emoji: "🧪",
    gradient: "linear-gradient(135deg, #000000, #ffffff)",
  },
  Docker: {
    emoji: "🐳",
    gradient: "linear-gradient(135deg, #2396ED, #066da5)",
  },
  Linux: {
    emoji: "🐧",
    gradient: "linear-gradient(135deg, #FCC624, #333333)",
  },
  Git: {
    emoji: "📝",
    gradient: "linear-gradient(135deg, #F05032, #de4c36)",
  },
};

function TiltSkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const iconData = skillIcons[skill.name] || {
    emoji: skill.icon,
    gradient: "linear-gradient(135deg, #00f5ff, #7c3aed)",
  };

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-y * 20);
      rotateY.set(x * 20);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="glass-card p-6 flex flex-col items-center gap-3 relative overflow-hidden"
        style={{
          background: "rgba(10, 15, 40, 0.6)",
          border: "1px solid rgba(0, 245, 255, 0.1)",
          minHeight: "140px",
        }}
      >
        {/* Top glow bar */}
        <div
          className="absolute top-0 left-0 w-full h-1 opacity-60"
          style={{ background: iconData.gradient }}
        />

        {/* Large icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{
            background: iconData.gradient,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {iconData.emoji}
        </div>

        <h4
          className="text-white font-bold text-sm tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {skill.name}
        </h4>

        <span
          className="text-xs uppercase tracking-widest"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
          }}
        >
          {skill.category}
        </span>

        {/* Light reflection shimmer on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)",
            backgroundSize: "200% 200%",
            animation: "shimmer 2s linear infinite",
          }}
        />

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,245,255,0.08) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════ Main Skills Section ═══════════ */
export default function SkillsSection({ skills }) {
  return (
    <section id="skills" className="section" style={{ position: "relative" }}>
      {/* 3D Orbiting background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 1.5]}>
          <SkillsBackground skills={skills} />
        </Canvas>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">&lt;skills&gt;</span>
          <h2 className="section-title">My Skills</h2>
          <div className="section-line mx-auto" />
        </motion.div>

        {/* Skill grid with mouse-tracking tilt cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {skills.map((skill, i) => (
            <TiltSkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
