"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Floating Server Node ── */
function ServerNode({ position, scale = 1 }) {
  const ref = useRef();
  const baseY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = baseY + Math.sin(t * 0.5 + position[0]) * 0.3;
    ref.current.rotation.y = t * 0.1;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Server body */}
      <mesh>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshPhysicalMaterial
          color="#0d1b3e"
          metalness={0.9}
          roughness={0.15}
          emissive="#00f5ff"
          emissiveIntensity={0.08}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Status lights */}
      {[-0.3, 0, 0.3].map((y, i) => (
        <mesh key={i} position={[0.42, y, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color={i === 0 ? "#00ff88" : "#00f5ff"}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      {/* Wireframe shell */}
      <mesh>
        <boxGeometry args={[0.85, 1.25, 0.45]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ── Container Node ── */
function ContainerNode({ position, color = "#3b82f6" }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y =
      position[1] + Math.sin(t * 0.7 + position[0] * 2) * 0.2;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ── Data Stream Lines ── */
function DataStreams() {
  const ref = useRef();

  const geometries = useMemo(() => {
    const streams = [
      { from: [-3, 1, 0], to: [0, 0, 0] },
      { from: [3, 1.5, -1], to: [0, 0, 0] },
      { from: [-2, -1, 1], to: [1, 0.5, 0] },
      { from: [2.5, -0.5, 0.5], to: [0, 0, 0] },
    ];
    return streams.map((s) => {
      const pts = [new THREE.Vector3(...s.from), new THREE.Vector3(...s.to)];
      return new THREE.BufferGeometry().setFromPoints(pts);
    });
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((line, i) => {
      if (line.material) {
        line.material.opacity =
          0.08 + Math.sin(state.clock.elapsedTime * 1.5 + i * 1.5) * 0.06;
      }
    });
  });

  return (
    <group ref={ref}>
      {geometries.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}

/* ── Main Cloud Scene ── */
function CloudScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 3, 3]} intensity={1.2} color="#00f5ff" distance={15} />
      <pointLight position={[-4, -2, -2]} intensity={0.5} color="#7c3aed" distance={12} />
      <fog attach="fog" args={["#050816", 5, 18]} />

      <ServerNode position={[-3, 1, 0]} scale={0.8} />
      <ServerNode position={[3, 1.5, -1]} scale={0.7} />
      <ServerNode position={[0, -0.5, 1]} scale={0.9} />

      <ContainerNode position={[-1.5, 0.5, 0.5]} color="#2396ED" />
      <ContainerNode position={[1.5, -0.3, 0.8]} color="#7c3aed" />
      <ContainerNode position={[2.5, -0.5, 0.5]} color="#3b82f6" />
      <ContainerNode position={[-2, -1, 1]} color="#00f5ff" />

      <DataStreams />
    </>
  );
}

export default function AboutCloud() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <CloudScene />
    </Canvas>
  );
}
