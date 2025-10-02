'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, BufferGeometry, BufferAttribute, Color, Vector3, AdditiveBlending } from 'three';
import { a, useSpring } from '@react-spring/three';

interface ParticleSystem3DProps {
  count?: number;
  position?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
  shape?: 'sphere' | 'cube' | 'helix' | 'wave' | 'explosion';
  animated?: boolean;
  interactive?: boolean;
}

// Basic particle system
export function ParticleSystem3D({
  count = 1000,
  position = [0, 0, 0],
  color = '#00D4FF',
  size = 0.02,
  speed = 1,
  shape = 'sphere',
  animated = true,
  interactive = false
}: ParticleSystem3DProps) {
  const pointsRef = useRef<Points>();
  const { camera, mouse } = useThree();
  
  // Generate particle positions
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const colorObj = new Color(color);
    
    for (let i = 0; i < count; i++) {
      let x, y, z;
      
      switch (shape) {
        case 'sphere':
          const radius = Math.random() * 2 + 1;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          x = radius * Math.sin(phi) * Math.cos(theta);
          y = radius * Math.sin(phi) * Math.sin(theta);
          z = radius * Math.cos(phi);
          break;
        case 'cube':
          x = (Math.random() - 0.5) * 4;
          y = (Math.random() - 0.5) * 4;
          z = (Math.random() - 0.5) * 4;
          break;
        case 'helix':
          const t = (i / count) * Math.PI * 8;
          const radius_helix = 2;
          x = radius_helix * Math.cos(t);
          y = t * 0.5;
          z = radius_helix * Math.sin(t);
          break;
        case 'wave':
          x = (i / count - 0.5) * 8;
          y = Math.sin(i * 0.1) * 2;
          z = (Math.random() - 0.5) * 2;
          break;
        default:
          x = (Math.random() - 0.5) * 4;
          y = (Math.random() - 0.5) * 4;
          z = (Math.random() - 0.5) * 4;
      }
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
      
      sizes[i] = size * (Math.random() * 0.5 + 0.5);
    }
    
    return [positions, colors, sizes];
  }, [count, color, size, shape]);

  useFrame(({ clock }) => {
    if (animated && pointsRef.current) {
      const time = clock.elapsedTime * speed;
      
      // Rotate the entire particle system
      pointsRef.current.rotation.x = time * 0.1;
      pointsRef.current.rotation.y = time * 0.2;
      
      // Animate individual particles
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        if (shape === 'wave') {
          positions[i3 + 1] = Math.sin(positions[i3] * 0.5 + time * 2) * 2;
        } else if (shape === 'helix') {
          const t = (i / count) * Math.PI * 8 + time;
          positions[i3] = 2 * Math.cos(t);
          positions[i3 + 2] = 2 * Math.sin(t);
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Interactive mouse following
    if (interactive) {
      const mouse3D = new Vector3(
        mouse.x * 2,
        mouse.y * 2,
        0
      );
      pointsRef.current?.position.lerp(mouse3D, 0.05);
    }
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        blending={AdditiveBlending}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Explosion effect
export function ExplosionEffect({
  position = [0, 0, 0],
  color = '#FF6B9D',
  count = 500,
  duration = 2000
}: {
  position?: [number, number, number];
  color?: string;
  count?: number;
  duration?: number;
}) {
  const pointsRef = useRef<Points>();
  const startTime = useRef(Date.now());

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Start from center
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      
      // Random velocity direction
      const velocity = new Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ).normalize().multiplyScalar(Math.random() * 5 + 2);
      
      velocities[i * 3] = velocity.x;
      velocities[i * 3 + 1] = velocity.y;
      velocities[i * 3 + 2] = velocity.z;
    }
    
    return [positions, velocities];
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      const elapsed = Date.now() - startTime.current;
      const progress = elapsed / duration;
      
      if (progress >= 1) {
        // Reset explosion
        startTime.current = Date.now();
        return;
      }
      
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const velocity = new Vector3(
          velocities[i3],
          velocities[i3 + 1],
          velocities[i3 + 2]
        );
        
        // Apply gravity and velocity
        velocity.y -= 0.1; // gravity
        const delta = velocity.clone().multiplyScalar(0.016);
        
        positions[i3] += delta.x;
        positions[i3 + 1] += delta.y;
        positions[i3 + 2] += delta.z;
        
        velocities[i3] = velocity.x;
        velocities[i3 + 1] = velocity.y;
        velocities[i3 + 2] = velocity.z;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Fade out over time
      const opacity = 1 - progress;
      (pointsRef.current.material as any).opacity = opacity;
    }
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.1}
        transparent
        opacity={1}
        blending={AdditiveBlending}
      />
    </points>
  );
}

// Trail effect
export function TrailEffect({
  position = [0, 0, 0],
  color = '#00D4FF',
  length = 100
}: {
  position?: [number, number, number];
  color?: string;
  length?: number;
}) {
  const pointsRef = useRef<Points>();
  const trailPositions = useRef<Vector3[]>([]);

  const [positions] = useMemo(() => {
    const positions = new Float32Array(length * 3);
    
    for (let i = 0; i < length; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }
    
    return [positions];
  }, [length]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.elapsedTime;
      
      // Create new trail point
      const newPoint = new Vector3(
        Math.sin(time) * 2,
        Math.cos(time * 0.7) * 2,
        Math.sin(time * 0.3) * 2
      );
      
      trailPositions.current.unshift(newPoint);
      if (trailPositions.current.length > length) {
        trailPositions.current.pop();
      }
      
      // Update positions
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      trailPositions.current.forEach((pos, index) => {
        positions[index * 3] = pos.x;
        positions[index * 3 + 1] = pos.y;
        positions[index * 3 + 2] = pos.z;
      });
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={length}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.6}
        blending={AdditiveBlending}
      />
    </points>
  );
}

// Interactive particle field
export function InteractiveParticleField({
  position = [0, 0, 0],
  color = '#8338EC',
  count = 2000
}: {
  position?: [number, number, number];
  color?: string;
  count?: number;
}) {
  const pointsRef = useRef<Points>();
  const { mouse, camera } = useThree();

  const [positions, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    
    return [positions, originalPositions];
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.elapsedTime;
      const mouse3D = new Vector3(mouse.x * 5, mouse.y * 5, 0);
      
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const originalPos = new Vector3(
          originalPositions[i3],
          originalPositions[i3 + 1],
          originalPositions[i3 + 2]
        );
        
        const currentPos = new Vector3(
          positions[i3],
          positions[i3 + 1],
          positions[i3 + 2]
        );
        
        // Mouse interaction
        const mouseDistance = currentPos.distanceTo(mouse3D);
        const repulsion = mouseDistance < 2 ? (2 - mouseDistance) / 2 : 0;
        
        const direction = currentPos.clone().sub(mouse3D).normalize();
        const targetPos = originalPos.clone().add(direction.multiplyScalar(repulsion * 2));
        
        // Smooth return to original position
        positions[i3] = currentPos.lerp(targetPos, 0.1).x;
        positions[i3 + 1] = currentPos.lerp(targetPos, 0.1).y;
        positions[i3 + 2] = currentPos.lerp(targetPos, 0.1).z;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.02}
        transparent
        opacity={0.6}
        blending={AdditiveBlending}
      />
    </points>
  );
}
