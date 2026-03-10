"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════ Mouse-Reactive Camera Rig ═══════════ */
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y * 0.8 + 0.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ═══════════ Interactive Particle Cloud Network ═══════════ */
function ParticleNetwork({ count = 350 }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const mouse3D = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  // Track mouse in 3D space
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * viewport.width * 2;
      const y = -(e.clientY / window.innerHeight - 0.5) * viewport.height * 2;
      mouse3D.current.set(x, y, 0);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [viewport]);

  const { positions, velocities, basePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 14 - 3;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return { positions: pos, velocities: vel, basePositions: base };
  }, [count]);

  // Line connections geometry — pre-allocate for max connections
  const maxLines = 600;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), []);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;
    const mx = mouse3D.current.x;
    const my = mouse3D.current.y;

    // Animate particles — drift + mouse repulsion
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Gentle drift
      arr[ix] += Math.sin(t * 0.15 + i * 0.7) * 0.003 + velocities[ix];
      arr[iy] += Math.cos(t * 0.12 + i * 0.5) * 0.003 + velocities[iy];
      arr[iz] += Math.sin(t * 0.1 + i * 0.3) * 0.001;

      // Mouse attraction/interaction — particles gently pulled toward mouse
      const dx = mx - arr[ix];
      const dy = my - arr[iy];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) {
        const force = (5 - dist) / 5 * 0.008;
        arr[ix] += dx * force;
        arr[iy] += dy * force;
      }

      // Soft boundary — return to general area
      const bx = basePositions[ix] - arr[ix];
      const by = basePositions[iy] - arr[iy];
      arr[ix] += bx * 0.001;
      arr[iy] += by * 0.001;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Build connection lines between nearby particles
    if (!linesRef.current) return;
    let lineIdx = 0;
    const connectionDist = 3.5;

    for (let i = 0; i < count && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < connectionDist) {
          const alpha = (1 - d / connectionDist) * 0.25;
          const base6 = lineIdx * 6;

          linePositions[base6] = arr[i * 3];
          linePositions[base6 + 1] = arr[i * 3 + 1];
          linePositions[base6 + 2] = arr[i * 3 + 2];
          linePositions[base6 + 3] = arr[j * 3];
          linePositions[base6 + 4] = arr[j * 3 + 1];
          linePositions[base6 + 5] = arr[j * 3 + 2];

          // Cyan-ish color with alpha fade
          lineColors[base6] = 0;
          lineColors[base6 + 1] = alpha * 3.8;
          lineColors[base6 + 2] = alpha * 4;
          lineColors[base6 + 3] = 0;
          lineColors[base6 + 4] = alpha * 3.8;
          lineColors[base6 + 5] = alpha * 4;

          lineIdx++;
        }
      }
    }

    // Zero out remaining lines
    for (let i = lineIdx * 6; i < maxLines * 6; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#5ac8fa"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={maxLines * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxLines * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

/* ═══════════ Glowing Core Shield (Central 3D Object) ═══════════ */
function CentralShield() {
  const groupRef = useRef();
  const glowRef = useRef();
  const innerRef = useRef();
  const pulseRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.12 + Math.sin(t * 1.5) * 0.06;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2;
      innerRef.current.rotation.z = t * 0.12;
    }
    // Pulsing volumetric glow
    if (pulseRef.current) {
      const s = 1 + Math.sin(t * 0.8) * 0.08;
      pulseRef.current.scale.set(s, s, s);
      pulseRef.current.material.opacity = 0.04 + Math.sin(t * 1.2) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer icosahedron wireframe — structural shell */}
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshPhysicalMaterial
          color="#1a2744"
          metalness={0.95}
          roughness={0.1}
          transparent
          opacity={0.25}
          wireframe
          emissive="#00f5ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner rotating dodecahedron — core */}
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color="#0d1b3e"
          metalness={0.9}
          roughness={0.15}
          transparent
          opacity={0.6}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Glowing inner sphere — energy core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Volumetric glow sphere — large soft bloom */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Glow aura behind */}
      <mesh ref={glowRef} position={[0, 0, -0.3]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Edge highlight rings */}
      {[1.6, 2.0, 2.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
          <ringGeometry args={[r - 0.02, r, 64]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.07 - i * 0.015}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════ NS Letters (Floating in front of core) ═══════════ */
function NSLetters() {
  const groupRef = useRef();
  const glowPlaneRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (glowPlaneRef.current) {
      glowPlaneRef.current.material.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 1.0) * 0.03;
    }
  });

  const mat = {
    color: "#ffffff",
    metalness: 0.95,
    roughness: 0.05,
    emissive: "#00f5ff",
    emissiveIntensity: 0.2,
    clearcoat: 1,
  };

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={groupRef} position={[0, 0, 3]} scale={0.7}>
        {/* Volumetric glow behind NS text */}
        <mesh ref={glowPlaneRef} position={[0.5, 0, -0.5]}>
          <planeGeometry args={[6, 3]} />
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* < */}
        <mesh position={[-2.0, 0.5, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.9, 0.12, 0.12]} />
          <meshPhysicalMaterial {...mat} emissive="#00f5ff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-2.0, -0.5, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.9, 0.12, 0.12]} />
          <meshPhysicalMaterial {...mat} emissive="#00f5ff" emissiveIntensity={0.5} />
        </mesh>

        {/* N */}
        <mesh position={[-0.55, 0, 0]}>
          <boxGeometry args={[0.14, 1.2, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.1, 1.35, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
        <mesh position={[0.55, 0, 0]}>
          <boxGeometry args={[0.14, 1.2, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>

        {/* S */}
        <mesh position={[1.35, 0.42, 0]}>
          <boxGeometry args={[0.65, 0.12, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
        <mesh position={[1.08, 0.22, 0]}>
          <boxGeometry args={[0.12, 0.42, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
        <mesh position={[1.35, 0, 0]}>
          <boxGeometry args={[0.65, 0.12, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
        <mesh position={[1.62, -0.22, 0]}>
          <boxGeometry args={[0.12, 0.42, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
        <mesh position={[1.35, -0.42, 0]}>
          <boxGeometry args={[0.65, 0.12, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>

        {/* /> */}
        <mesh position={[2.3, 0, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 1, 0.08]} />
          <meshPhysicalMaterial {...mat} emissive="#00f5ff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[2.9, 0.5, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.9, 0.12, 0.12]} />
          <meshPhysicalMaterial {...mat} emissive="#00f5ff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[2.9, -0.5, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.9, 0.12, 0.12]} />
          <meshPhysicalMaterial {...mat} emissive="#00f5ff" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

/* ═══════════ Orbiting Tech Shards ═══════════ */
function TechShard({ angle, radius, speed, label, color }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius * 0.6;
    ref.current.position.y = Math.sin(t * 1.3) * 0.8;
    ref.current.rotation.x += 0.008;
    ref.current.rotation.y += 0.012;
  });

  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.5}
          clearcoat={1}
        />
      </mesh>
      {/* Label */}
      <Html position={[0, -0.4, 0]} center distanceFactor={12} style={{ pointerEvents: "none" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            fontWeight: 500,
            color: "#94a3b8",
            whiteSpace: "nowrap",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

/* ═══════════ HUD Annotation Lines ═══════════ */
function HUDLines() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((line, i) => {
        if (line.material) {
          line.material.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 0.8 + i * 2) * 0.03;
        }
      });
    }
  });

  const lines = [
    { start: [2.5, 1.5, 0], end: [4.5, 2.5, -1] },
    { start: [-2.2, 1, 0], end: [-4.5, 2, -1] },
    { start: [1.8, -1.2, 0], end: [4, -2, -1] },
    { start: [-1.5, -1.5, 0], end: [-3.5, -2.5, -1] },
  ];

  return (
    <group ref={ref}>
      {lines.map((l, i) => {
        const points = [new THREE.Vector3(...l.start), new THREE.Vector3(...l.end)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial
              color="#00f5ff"
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
            />
          </line>
        );
      })}
    </group>
  );
}

/* ═══════════ Ground Plane Grid ═══════════ */
function GroundGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial
        color="#00f5ff"
        wireframe
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ═══════════ Main Scene ═══════════ */
function Scene() {
  const techShards = [
    { label: "JavaScript", color: "#f0db4f", angle: 0, radius: 5, speed: 0.15 },
    { label: "Python", color: "#3776AB", angle: Math.PI * 0.25, radius: 5.5, speed: 0.12 },
    { label: "Docker", color: "#2396ED", angle: Math.PI * 0.5, radius: 5, speed: 0.18 },
    { label: "Linux", color: "#FCC624", angle: Math.PI * 0.75, radius: 5.5, speed: 0.14 },
    { label: "Git", color: "#F05032", angle: Math.PI, radius: 5, speed: 0.16 },
    { label: "HTML", color: "#E44D26", angle: Math.PI * 1.25, radius: 5.5, speed: 0.13 },
    { label: "CSS", color: "#1572B6", angle: Math.PI * 1.5, radius: 5, speed: 0.17 },
    { label: "Flask", color: "#a0a0a0", angle: Math.PI * 1.75, radius: 5.5, speed: 0.11 },
  ];

  return (
    <>
      {/* Atmospheric fog */}
      <fog attach="fog" args={["#050816", 8, 28]} />

      {/* Cinematic lighting */}
      <ambientLight intensity={0.06} />
      <pointLight position={[0, 0, 0]} intensity={1.8} color="#00f5ff" distance={14} decay={2} />
      <pointLight position={[6, 4, 4]} intensity={1} color="#3b82f6" distance={20} />
      <pointLight position={[-6, -3, -4]} intensity={0.6} color="#7c3aed" distance={18} />
      <spotLight
        position={[0, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1.0}
        color="#00f5ff"
        distance={25}
      />

      {/* Mouse-reactive camera */}
      <CameraRig />

      {/* Starfield — deep space */}
      <Stars radius={40} depth={60} count={2000} factor={3} saturation={0.2} fade speed={0.3} />

      {/* Central 3D Object — shield-like geometry with volumetric glow */}
      <CentralShield />

      {/* NS Letters in front of shield */}
      <NSLetters />

      {/* HUD annotation lines */}
      <HUDLines />

      {/* Orbiting tech shards */}
      {techShards.map((shard) => (
        <TechShard key={shard.label} {...shard} />
      ))}

      {/* Interactive particle cloud network — replaces static dust */}
      <ParticleNetwork count={350} />

      {/* Ground grid */}
      <GroundGrid />
    </>
  );
}

/* ═══════════ Main Export ═══════════ */
export default function HeroScene() {
  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0.5, 9], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
