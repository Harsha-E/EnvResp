import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechUniverseProps {
  isFrozen: boolean;
  mousePos: React.RefObject<{ x: number; y: number }>;
}

// 1. Wireframe Icosahedron & Core (AI / Quantum Core)
const QuantumCore: React.FC<{ isFrozen: boolean; mousePos: React.RefObject<{ x: number; y: number }> }> = ({
  isFrozen,
  mousePos,
}) => {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const timeAcc = useRef(0);

  useFrame((_, delta) => {
    if (!isFrozen) {
      timeAcc.current += delta;
      const t = timeAcc.current;

      // Low frequency breathing motion (never constant speed)
      const breathing = Math.sin(t * 0.8) * 0.08 + Math.cos(t * 1.3) * 0.04;
      outerRef.current.scale.setScalar(1.4 + breathing);
      innerRef.current.scale.setScalar(0.7 - breathing * 0.5);

      outerRef.current.rotation.x = Math.sin(t * 0.3) * 0.4;
      outerRef.current.rotation.y = Math.cos(t * 0.25) * 0.5;

      innerRef.current.rotation.x = -Math.cos(t * 0.4) * 0.6;
      innerRef.current.rotation.z = Math.sin(t * 0.35) * 0.4;
    }

    if (mousePos.current && outerRef.current) {
      const targetX = (mousePos.current.x - 0.5) * 1.2;
      const targetY = -(mousePos.current.y - 0.5) * 1.2;
      outerRef.current.position.x += (targetX - 2.8 - outerRef.current.position.x) * 0.03;
      outerRef.current.position.y += (targetY + 1.2 - outerRef.current.position.y) * 0.03;
    }
  });

  return (
    <group position={[-2.8, 1.2, -1]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.45} />
      </mesh>
      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#A855F7" wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// 2. Orbital Rings & Trajectory
const OrbitalRings: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const ringGroupRef = useRef<THREE.Group>(null!);
  const timeAcc = useRef(0);

  useFrame((_, delta) => {
    if (!isFrozen) {
      timeAcc.current += delta;
      const t = timeAcc.current;
      ringGroupRef.current.rotation.z = Math.sin(t * 0.2) * 0.3;
      ringGroupRef.current.rotation.x = Math.cos(t * 0.15) * 0.2;
    }
  });

  return (
    <group ref={ringGroupRef} position={[2.8, -1.4, -2]}>
      {/* Outer Orbital Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#0066FF" transparent opacity={0.5} />
      </mesh>
      {/* Middle Accent Ring */}
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[1.7, 0.012, 16, 80]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// 3. Neural Graph / Network Topology
const NeuralGraph: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const timeAcc = useRef(0);

  const { pointsPos, linePos } = useMemo(() => {
    const count = 35;
    const positions = new Float32Array(count * 3);
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 3;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    const lineCoords: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.8) {
          lineCoords.push(nodes[i].x, nodes[i].y, nodes[i].z);
          lineCoords.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    return {
      pointsPos: positions,
      linePos: new Float32Array(lineCoords),
    };
  }, []);

  useFrame((_, delta) => {
    if (!isFrozen && pointsRef.current) {
      timeAcc.current += delta;
      const t = timeAcc.current;
      pointsRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
      linesRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
    }
  });

  return (
    <group position={[3.2, 1.6, -3]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#00F0FF" transparent opacity={0.8} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePos, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0066FF" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
};

// 4. DNA Double Helix Structure
const DNAHelix: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const timeAcc = useRef(0);

  const helixPoints = useMemo(() => {
    const pointsCount = 40;
    const strandA: number[] = [];
    const strandB: number[] = [];
    const rungs: number[] = [];

    for (let i = 0; i < pointsCount; i++) {
      const t = (i / pointsCount) * Math.PI * 4;
      const y = (i / pointsCount) * 4 - 2;
      const x1 = Math.cos(t) * 0.6;
      const z1 = Math.sin(t) * 0.6;

      const x2 = Math.cos(t + Math.PI) * 0.6;
      const z2 = Math.sin(t + Math.PI) * 0.6;

      strandA.push(x1, y, z1);
      strandB.push(x2, y, z2);

      if (i % 2 === 0) {
        rungs.push(x1, y, z1, x2, y, z2);
      }
    }

    return {
      posA: new Float32Array(strandA),
      posB: new Float32Array(strandB),
      posRungs: new Float32Array(rungs),
    };
  }, []);

  useFrame((_, delta) => {
    if (!isFrozen && groupRef.current) {
      timeAcc.current += delta;
      const t = timeAcc.current;
      groupRef.current.rotation.y = t * 0.25;
      groupRef.current.position.y = -0.5 + Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[-3.4, -1.8, -2.5]} rotation={[0.3, 0, 0.2]}>
      {/* Strand A */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[helixPoints.posA, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#A855F7" transparent opacity={0.85} />
      </points>

      {/* Strand B */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[helixPoints.posB, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#00F0FF" transparent opacity={0.85} />
      </points>

      {/* Connecting Rungs */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[helixPoints.posRungs, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
};

// 5. Floating Binary Particles & Data Stream
const DataParticleStreams: React.FC<{ isFrozen: boolean }> = ({ isFrozen }) => {
  const particlesRef = useRef<THREE.Points>(null!);
  const timeAcc = useRef(0);

  const particlesPositions = useMemo(() => {
    const count = 180;
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

      for (let i = 0; i < 180; i++) {
        // Slow upward drift with per-particle noise phase
        positions[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.002 + 0.0015;
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
      <pointsMaterial size={0.04} color="#00F0FF" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// Main 3D Technology Universe Group
export const TechUniverse: React.FC<TechUniverseProps> = ({ isFrozen, mousePos }) => {
  return (
    <group>
      <QuantumCore isFrozen={isFrozen} mousePos={mousePos} />
      <OrbitalRings isFrozen={isFrozen} />
      <NeuralGraph isFrozen={isFrozen} />
      <DNAHelix isFrozen={isFrozen} />
      <DataParticleStreams isFrozen={isFrozen} />
    </group>
  );
};
