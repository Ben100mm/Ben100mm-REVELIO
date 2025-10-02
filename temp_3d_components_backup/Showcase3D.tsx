'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Color } from 'three';

interface Showcase3DProps {
  className?: string;
}

// Simple animated sphere component
function AnimatedSphere({ position = [0, 0, 0], color = '#00D4FF' }: { position?: [number, number, number], color?: string }) {
  const meshRef = useRef<any>();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.7}
        roughness={0.3}
        emissive={new Color(color).multiplyScalar(0.1)}
      />
    </mesh>
  );
}

// Simple floating cube component
function FloatingCube({ position = [0, 0, 0], color = '#3A86FF' }: { position?: [number, number, number], color?: string }) {
  const meshRef = useRef<any>();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2) * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[1, 1, 1]} />
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

export default function Showcase3D({ className = '' }: Showcase3DProps) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  return (
    <div className={`relative w-full h-96 rounded-2xl overflow-hidden ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: '#0f172a' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#8338EC" />

        {/* Environment */}
        <Environment preset="studio" />

        {/* 3D Objects */}
        <AnimatedSphere position={[0, 0, 0]} color="#00D4FF" />
        <FloatingCube position={[2, 0, 0]} color="#3A86FF" />
        <FloatingCube position={[-2, 0, 0]} color="#8338EC" />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={2}
          maxDistance={20}
        />
      </Canvas>

      {/* Overlay info */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="card-glass backdrop-blur-xl p-3">
          <h3 className="text-sm font-semibold text-white mb-1">3D Showcase</h3>
          <p className="text-xs text-slate-300">
            Interactive 3D elements with advanced materials
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <div className="flex space-x-2">
          <button 
            onClick={() => setHoveredElement(hoveredElement === 'sphere' ? null : 'sphere')}
            className="btn-ghost text-xs px-3 py-2 bg-white/10 backdrop-blur-sm"
          >
            Toggle Sphere
          </button>
        </div>
      </div>
    </div>
  );
}
