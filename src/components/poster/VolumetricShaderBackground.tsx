import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  varying vec2 vUv;

  // Micro-fine paper texture noise
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
    
    // Archival Off-White Fine Paper Palette (#F6F3EC)
    vec3 paperBase = vec3(0.965, 0.953, 0.925);
    vec3 paperWarm = vec3(0.980, 0.968, 0.941);

    float t = uTime * 0.015;
    float lightDrift = sin(st.x * 2.0 + t) * cos(st.y * 2.0 + t) * 0.015;

    vec3 col = mix(paperBase, paperWarm, lightDrift + 0.5);

    // Vignetting & paper edge shading
    float vignette = 1.0 - length(st * 0.4);
    col *= clamp(vignette, 0.94, 1.0);

    // Fine paper grain
    float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.012;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface VolumetricShaderBackgroundProps {
  isFrozen: boolean;
  mousePos: React.RefObject<{ x: number; y: number }>;
}

export const VolumetricShaderBackground: React.FC<VolumetricShaderBackgroundProps> = ({
  isFrozen,
  mousePos,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();
  const accumulatedTime = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [size.width, size.height]
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;

    if (!isFrozen) {
      accumulatedTime.current += delta;
      materialRef.current.uniforms.uTime.value = accumulatedTime.current;
    }

    if (mousePos.current) {
      materialRef.current.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);
    }

    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};
