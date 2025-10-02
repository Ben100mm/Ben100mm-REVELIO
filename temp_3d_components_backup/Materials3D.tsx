'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector3, Color } from 'three';
import { extend } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';

// Custom shader for holographic effect
const holographicVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const holographicFragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    float noise = sin(vPosition.x * 10.0 + time) * 0.5 + 0.5;
    noise += sin(vPosition.y * 15.0 + time * 1.5) * 0.3;
    noise += sin(vPosition.z * 8.0 + time * 0.8) * 0.2;
    
    vec3 color = mix(color1, color2, noise);
    color = mix(color, color3, sin(vUv.y * 3.14159 + time * 2.0) * 0.5 + 0.5);
    
    float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    fresnel = pow(fresnel, 2.0);
    
    gl_FragColor = vec4(color, fresnel * 0.8 + 0.2);
  }
`;

// Custom shader for liquid metal effect
const liquidMetalVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const liquidMetalFragmentShader = `
  uniform float time;
  uniform vec3 baseColor;
  uniform float metallic;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    float noise = sin(vPosition.x * 20.0 + time * 2.0) * 0.5 + 0.5;
    noise *= sin(vPosition.y * 15.0 + time * 1.5) * 0.5 + 0.5;
    noise *= sin(vPosition.z * 10.0 + time * 1.0) * 0.5 + 0.5;
    
    vec3 color = baseColor + noise * 0.3;
    
    float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    fresnel = pow(fresnel, 1.5);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Custom shader for energy field effect
const energyFieldVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const energyFieldFragmentShader = `
  uniform float time;
  uniform vec3 color;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    float intensity = sin(vPosition.x * 8.0 + time * 3.0) * 0.5 + 0.5;
    intensity *= sin(vPosition.y * 6.0 + time * 2.0) * 0.5 + 0.5;
    intensity *= sin(vPosition.z * 4.0 + time * 1.5) * 0.5 + 0.5;
    
    vec3 finalColor = color * intensity;
    
    float edge = 1.0 - smoothstep(0.0, 0.1, abs(dot(vNormal, vec3(0.0, 0.0, 1.0))));
    
    gl_FragColor = vec4(finalColor, intensity * edge);
  }
`;

// Holographic material component
export function HolographicMaterial({ 
  color1 = '#00D4FF', 
  color2 = '#3A86FF', 
  color3 = '#8338EC',
  time = 0 
}: {
  color1?: string;
  color2?: string;
  color3?: string;
  time?: number;
}) {
  const materialRef = useRef<ShaderMaterial>();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={holographicVertexShader}
      fragmentShader={holographicFragmentShader}
      uniforms={{
        time: { value: time },
        color1: { value: new Color(color1) },
        color2: { value: new Color(color2) },
        color3: { value: new Color(color3) }
      }}
      transparent
      side={2}
    />
  );
}

// Liquid metal material component
export function LiquidMetalMaterial({ 
  baseColor = '#C0C0C0',
  metallic = 0.9,
  time = 0 
}: {
  baseColor?: string;
  metallic?: number;
  time?: number;
}) {
  const materialRef = useRef<ShaderMaterial>();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={liquidMetalVertexShader}
      fragmentShader={liquidMetalFragmentShader}
      uniforms={{
        time: { value: time },
        baseColor: { value: new Color(baseColor) },
        metallic: { value: metallic }
      }}
    />
  );
}

// Energy field material component
export function EnergyFieldMaterial({ 
  color = '#00FF88',
  time = 0 
}: {
  color?: string;
  time?: number;
}) {
  const materialRef = useRef<ShaderMaterial>();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={energyFieldVertexShader}
      fragmentShader={energyFieldFragmentShader}
      uniforms={{
        time: { value: time },
        color: { value: new Color(color) }
      }}
      transparent
      side={2}
    />
  );
}

// Animated gradient material
export function AnimatedGradientMaterial({ 
  colors = ['#00D4FF', '#3A86FF', '#8338EC'],
  speed = 1.0 
}: {
  colors?: string[];
  speed?: number;
}) {
  const materialRef = useRef<any>();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const time = clock.elapsedTime * speed;
      const gradient = Math.sin(time) * 0.5 + 0.5;
      
      // Create animated gradient between colors
      const color1 = new Color(colors[0]);
      const color2 = new Color(colors[1]);
      const color3 = new Color(colors[2]);
      
      const finalColor = color1.clone().lerp(color2, gradient);
      finalColor.lerp(color3, Math.sin(time * 0.7) * 0.5 + 0.5);
      
      materialRef.current.color = finalColor;
    }
  });

  return (
    <meshStandardMaterial
      ref={materialRef}
      color={colors[0]}
      metalness={0.7}
      roughness={0.3}
      emissive={new Color(colors[0]).multiplyScalar(0.1)}
    />
  );
}

// Glass material with refraction
export function GlassMaterial({ 
  color = '#ffffff',
  opacity = 0.3,
  roughness = 0.1,
  metalness = 0.0 
}: {
  color?: string;
  opacity?: number;
  roughness?: number;
  metalness?: number;
}) {
  return (
    <meshPhysicalMaterial
      color={color}
      opacity={opacity}
      transparent
      roughness={roughness}
      metalness={metalness}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
      transmission={0.9}
      thickness={0.5}
      ior={1.5}
    />
  );
}

// Neon glow material
export function NeonGlowMaterial({ 
  color = '#00D4FF',
  intensity = 2.0 
}: {
  color?: string;
  intensity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      transparent
      opacity={0.8}
      side={2}
    />
  );
}

// Animated wireframe material
export function AnimatedWireframeMaterial({ 
  color = '#00D4FF',
  animated = true 
}: {
  color?: string;
  animated?: boolean;
}) {
  const materialRef = useRef<any>();

  useFrame(({ clock }) => {
    if (animated && materialRef.current) {
      const opacity = Math.sin(clock.elapsedTime * 2) * 0.3 + 0.7;
      materialRef.current.opacity = opacity;
    }
  });

  return (
    <meshBasicMaterial
      ref={materialRef}
      color={color}
      wireframe
      transparent
      opacity={0.8}
    />
  );
}
