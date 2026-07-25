import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechUniverseProps {
  isFrozen: boolean;
  mousePos: React.RefObject<{ x: number; y: number }>;
}

// Subtle Light Theme Floating Torus Accent
const LightTorusAccent: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const torusRef = useRef<THREE.Mesh>(null!);
  const timeAcc = useRef(0);

  useFrame((_, delta) => {
    if (!isFrozen && torusRef.current) {
      timeAcc.current += delta;
      const t = timeAcc.current;
      torusRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      torusRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <mesh ref={torusRef} position={[3.2, -1.6, -2.5]}>
      <torusGeometry args={[1.5, 0.12, 16, 64]} />
      <meshBasicMaterial color="#6366F1" wireframe transparent opacity={0.15} />
    </mesh>
  );
};

// Subtle Light Particle Ambient Dust
const LightParticleDust: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const particlesRef = useRef<THREE.Points>(null!);
  const timeAcc = useRef(0);

  const particlesPositions = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!isFrozen && particlesRef.current) {
      timeAcc.current += delta;
      const t = timeAcc.current;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < 120; i++) {
        positions[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.0015 + 0.001;
        if (positions[i * 3 + 1] > 4.5) {
          positions[i * 3 + 1] = -4.5;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlesPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#818CF8" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
};

export const TechUniverse: React.FC<TechUniverseProps> = ({ isFrozen }) => {
  return (
    <group>
      <LightTorusAccent isFrozen={isFrozen} />
      <LightParticleDust isFrozen={isFrozen} />
    </group>
  );
};
