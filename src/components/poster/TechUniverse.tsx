import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechUniverseProps {
  isFrozen: boolean;
  mousePos: React.RefObject<{ x: number; y: number }>;
}

// 1. 3D Refractive Quartz Crystal Core
const QuartzCrystalCore: React.FC<{ isFrozen: boolean; mousePos: React.RefObject<{ x: number; y: number }> }> = ({
  isFrozen,
  mousePos,
}) => {
  const crystalOuterRef = useRef<THREE.Mesh>(null!);
  const crystalInnerRef = useRef<THREE.Mesh>(null!);
  const timeAcc = useRef(0);

  useFrame((_, delta) => {
    if (!isFrozen) {
      timeAcc.current += delta;
      const t = timeAcc.current;

      // Low frequency breathing motion & faceted rotation
      const breathing = Math.sin(t * 0.7) * 0.06 + Math.cos(t * 1.1) * 0.03;
      crystalOuterRef.current.scale.setScalar(1.5 + breathing);
      crystalInnerRef.current.scale.setScalar(0.8 - breathing * 0.4);

      crystalOuterRef.current.rotation.x = Math.sin(t * 0.25) * 0.4;
      crystalOuterRef.current.rotation.y = t * 0.2;

      crystalInnerRef.current.rotation.x = -Math.cos(t * 0.3) * 0.5;
      crystalInnerRef.current.rotation.z = Math.sin(t * 0.2) * 0.4;
    }

    if (mousePos.current && crystalOuterRef.current) {
      const targetX = (mousePos.current.x - 0.5) * 1.2;
      const targetY = -(mousePos.current.y - 0.5) * 1.2;
      crystalOuterRef.current.position.x += (targetX - 2.8 - crystalOuterRef.current.position.x) * 0.03;
      crystalOuterRef.current.position.y += (targetY + 1.2 - crystalOuterRef.current.position.y) * 0.03;
    }
  });

  return (
    <group position={[-2.8, 1.2, -1]}>
      {/* Outer Faceted Quartz Prism */}
      <mesh ref={crystalOuterRef}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#FF5E97" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Inner Spatial Crystal Core */}
      <mesh ref={crystalInnerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// 2. Spatial Mobius Torus Knot
const MobiusKnot: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const knotRef = useRef<THREE.Mesh>(null!);
  const timeAcc = useRef(0);

  useFrame((_, delta) => {
    if (!isFrozen && knotRef.current) {
      timeAcc.current += delta;
      const t = timeAcc.current;
      knotRef.current.rotation.x = Math.sin(t * 0.3) * 0.4;
      knotRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <mesh ref={knotRef} position={[3.0, -1.5, -2]}>
      <torusKnotGeometry args={[1.4, 0.25, 128, 32, 2, 3]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.35} />
    </mesh>
  );
};

// 3. Concentric Glass Ring Discs
const HolographicDiscs: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const discGroupRef = useRef<THREE.Group>(null!);
  const timeAcc = useRef(0);

  useFrame((_, delta) => {
    if (!isFrozen && discGroupRef.current) {
      timeAcc.current += delta;
      const t = timeAcc.current;
      discGroupRef.current.rotation.z = Math.sin(t * 0.2) * 0.25;
      discGroupRef.current.rotation.x = Math.cos(t * 0.15) * 0.2;
    }
  });

  return (
    <group ref={discGroupRef} position={[3.2, 1.8, -3]}>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.5, 2.2, 64]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[0.9, 1.4, 64]} />
        <meshBasicMaterial color="#FF5E97" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// 4. Sparkle Dust Ambient Particle Field
const SparkleDustField: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const particlesRef = useRef<THREE.Points>(null!);
  const timeAcc = useRef(0);

  const particlesPositions = useMemo(() => {
    const count = 200;
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

      for (let i = 0; i < 200; i++) {
        positions[i * 3 + 1] += Math.sin(t * 0.4 + i) * 0.002 + 0.0012;
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
      <pointsMaterial size={0.045} color="#FF5E97" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

// Main 3D Spatial Quartz Universe Group
export const TechUniverse: React.FC<TechUniverseProps> = ({ isFrozen, mousePos }) => {
  return (
    <group>
      <QuartzCrystalCore isFrozen={isFrozen} mousePos={mousePos} />
      <MobiusKnot isFrozen={isFrozen} />
      <HolographicDiscs isFrozen={isFrozen} />
      <SparkleDustField isFrozen={isFrozen} />
    </group>
  );
};
