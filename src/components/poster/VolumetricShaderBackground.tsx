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
  uniform float uFreeze;

  varying vec2 vUv;

  // 3D Simplex noise implementation for volumetric light drift
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
    
    // Space bending around cursor
    vec2 mouseOffset = (uMouse - 0.5) * 2.0;
    float distToMouse = length(st - mouseOffset * 0.4);
    float warp = exp(-distToMouse * 3.5) * 0.18;
    st += normalize(st - mouseOffset * 0.4 + 0.0001) * warp;

    // Slow organic time drift
    float t = uTime * 0.04;

    // Layer 1: Volumetric deep space atmosphere density
    float n1 = snoise(vec3(st * 1.2, t * 0.8));
    float n2 = snoise(vec3(st * 2.5 + vec2(n1 * 0.3), t * 1.2));
    float n3 = snoise(vec3(st * 4.0 - vec2(n2 * 0.2), t * 0.5));

    // Base Deep Space Palette
    vec3 deepBlack   = vec3(0.02, 0.03, 0.06); // Deep space background
    vec3 electricBlue = vec3(0.0, 0.35, 0.95);  // Primary tech glow
    vec3 cyanGlow     = vec3(0.0, 0.88, 0.96);  // Accent light refraction
    vec3 purpleNebula = vec3(0.55, 0.2, 0.92);  // Volumetric cloud energy

    // Composite volumetric light field
    float density = clamp(n1 * 0.5 + n2 * 0.35 + n3 * 0.15 + 0.3, 0.0, 1.0);
    
    // Smooth color redistribution based on noise density
    vec3 col = mix(deepBlack, purpleNebula, smoothstep(0.2, 0.75, density) * 0.45);
    col = mix(col, electricBlue, smoothstep(0.4, 0.85, density) * 0.55);
    col = mix(col, cyanGlow, pow(clamp(n2 * n3 + 0.2, 0.0, 1.0), 3.0) * 0.6);

    // Subtle radial vignetting
    float vignette = 1.0 - length(st * 0.65);
    col *= clamp(vignette, 0.3, 1.0);

    // Add subtle ambient grain
    float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
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
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uFreeze: { value: 0 },
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
      currentMouse.current.lerp(
        new THREE.Vector2(mousePos.current.x, mousePos.current.y),
        0.05
      );
      materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    }

    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    materialRef.current.uniforms.uFreeze.value = isFrozen ? 1.0 : 0.0;
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
