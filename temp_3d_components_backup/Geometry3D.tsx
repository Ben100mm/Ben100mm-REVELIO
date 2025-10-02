'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
import { Mesh, Vector3, Color, Group } from 'three';
import { 
  IcosahedronGeometry, 
  OctahedronGeometry, 
  TetrahedronGeometry,
  TorusGeometry,
  SphereGeometry,
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry
} from 'three';

interface Geometry3DProps {
  type?: 'sphere' | 'box' | 'torus' | 'icosahedron' | 'octahedron' | 'tetrahedron' | 'cone' | 'cylinder';
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  color?: string;
  wireframe?: boolean;
  animated?: boolean;
  hovered?: boolean;
  onClick?: () => void;
  args?: any[];
}

// Animated sphere with morphing geometry
export function AnimatedSphere({ 
  position = [0, 0, 0], 
  color = '#00D4FF',
  animated = true,
  hovered = false 
}: Geometry3DProps) {
  const meshRef = useRef<Mesh>();
  const groupRef = useRef<Group>();

  const { scale } = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    config: { tension: 300, friction: 30 }
  });

  useFrame(({ clock }) => {
    if (animated && meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <a.group ref={groupRef} position={position} scale={scale}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.7}
          roughness={0.3}
          emissive={new Color(color).multiplyScalar(0.1)}
        />
      </mesh>
    </a.group>
  );
}

// Morphing icosahedron
export function MorphingIcosahedron({ 
  position = [0, 0, 0], 
  color = '#8338EC',
  animated = true 
}: Geometry3DProps) {
  const meshRef = useRef<Mesh>();

  useFrame(({ clock }) => {
    if (animated && meshRef.current) {
      const time = clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.z = time * 0.2;
      
      // Morphing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

// Floating torus with rotation
export function FloatingTorus({ 
  position = [0, 0, 0], 
  color = '#3A86FF',
  animated = true 
}: Geometry3DProps) {
  const meshRef = useRef<Mesh>();

  useFrame(({ clock }) => {
    if (animated && meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = clock.elapsedTime * 0.2;
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.6}
        roughness={0.4}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Complex geometric composition
export function GeometricComposition({ 
  position = [0, 0, 0],
  animated = true 
}: Geometry3DProps) {
  const groupRef = useRef<Group>();

  useFrame(({ clock }) => {
    if (animated && groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Central sphere */}
      <AnimatedSphere 
        position={[0, 0, 0]} 
        color="#00D4FF" 
        animated={animated}
      />
      
      {/* Orbiting shapes */}
      <FloatingTorus 
        position={[3, 0, 0]} 
        color="#3A86FF" 
        animated={animated}
      />
      
      <MorphingIcosahedron 
        position={[-3, 0, 0]} 
        color="#8338EC" 
        animated={animated}
      />
      
      {/* Additional orbiting elements */}
      <mesh position={[0, 3, 0]} castShadow>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial 
          color="#FF6B9D" 
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      
      <mesh position={[0, -3, 0]} castShadow>
        <tetrahedronGeometry args={[1]} />
        <meshStandardMaterial 
          color="#4ECDC4" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

// Interactive geometry with hover effects
export function InteractiveGeometry({ 
  type = 'sphere',
  position = [0, 0, 0],
  color = '#00D4FF',
  onClick,
  hovered = false
}: Geometry3DProps) {
  const meshRef = useRef<Mesh>();
  
  const geometry = useMemo(() => {
    switch (type) {
      case 'box': return <boxGeometry args={[1, 1, 1]} />;
      case 'torus': return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
      case 'octahedron': return <octahedronGeometry args={[1]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[1]} />;
      case 'cone': return <coneGeometry args={[1, 2, 8]} />;
      case 'cylinder': return <cylinderGeometry args={[1, 1, 2, 8]} />;
      default: return <sphereGeometry args={[1, 32, 32]} />;
    }
  }, [type]);

  const { scale } = useSpring({
    scale: hovered ? [1.3, 1.3, 1.3] : [1, 1, 1],
    config: { tension: 300, friction: 20 }
  });

  useFrame(({ clock }) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.5;
    }
  });

  return (
    <a.mesh 
      ref={meshRef} 
      position={position} 
      scale={scale}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      {geometry}
      <meshStandardMaterial 
        color={color} 
        metalness={0.7}
        roughness={0.3}
        emissive={hovered ? new Color(color).multiplyScalar(0.2) : new Color(0x000000)}
      />
    </a.mesh>
  );
}

// Procedural geometry generator
export function ProceduralGeometry({ 
  position = [0, 0, 0],
  seed = 0,
  animated = true 
}: Geometry3DProps & { seed?: number }) {
  const meshRef = useRef<Mesh>();
  
  // Generate procedural geometry based on seed
  const geometry = useMemo(() => {
    const geometries = [
      <sphereGeometry args={[1, 16, 16]} />,
      <boxGeometry args={[1.2, 1.2, 1.2]} />,
      <torusGeometry args={[1, 0.3, 8, 16]} />,
      <octahedronGeometry args={[1]} />,
      <tetrahedronGeometry args={[1.2]} />,
    ];
    return geometries[Math.abs(seed) % geometries.length];
  }, [seed]);

  const color = useMemo(() => {
    const colors = ['#00D4FF', '#3A86FF', '#8338EC', '#FF6B9D', '#4ECDC4'];
    return colors[Math.abs(seed) % colors.length];
  }, [seed]);

  useFrame(({ clock }) => {
    if (animated && meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime + seed) * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.2 + seed;
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2 + seed) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      {geometry}
      <meshStandardMaterial 
        color={color} 
        metalness={0.6}
        roughness={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
