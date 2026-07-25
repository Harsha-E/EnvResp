import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechUniverseProps {
  isFrozen: boolean;
  mousePos: React.RefObject<{ x: number; y: number }>;
}

const SubtlePaperDust: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const particlesRef = useRef<THREE.Points>(null!);
  const timeAcc = useRef(0);

  const particlesPositions = useMemo(() => {
    const count = 90;
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

      for (let i = 0; i < 90; i++) {
        positions[i * 3 + 1] += Math.sin(t * 0.2 + i) * 0.001 + 0.0005;
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
      <pointsMaterial size={0.035} color="#475569" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
};

export const TechUniverse: React.FC<TechUniverseProps> = ({ isFrozen }) => {
  return (
    <group>
      <SubtlePaperDust isFrozen={isFrozen} />
    </group>
  );
};
