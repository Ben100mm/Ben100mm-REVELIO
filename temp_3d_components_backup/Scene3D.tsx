'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Color } from 'three';
import { a, useSpring } from '@react-spring/three';

interface Scene3DProps {
  children?: React.ReactNode;
  className?: string;
  enableControls?: boolean;
  enableEnvironment?: boolean;
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  background?: string;
  style?: React.CSSProperties;
}

// Camera controller component
function CameraController({ 
  position = [0, 0, 5], 
  autoRotate = false,
  enableControls = true 
}: {
  position?: [number, number, number];
  autoRotate?: boolean;
  enableControls?: boolean;
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(0, 0, 0);
  }, [camera, position]);

  return (
    <>
      <PerspectiveCamera makeDefault position={position} />
      {enableControls && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={2}
          maxDistance={20}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      )}
    </>
  );
}

// Animated background component
function AnimatedBackground({ color = '#0f172a' }: { color?: string }) {
  const meshRef = useRef<any>();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={[100, 100, 100]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={color} side={2} />
    </mesh>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00D4FF" wireframe />
    </mesh>
  );
}

export default function Scene3D({
  children,
  className = '',
  enableControls = true,
  enableEnvironment = true,
  cameraPosition = [0, 0, 5],
  autoRotate = false,
  background = '#0f172a',
  style = {}
}: Scene3DProps) {
  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      <Canvas
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        camera={{ position: cameraPosition, fov: 75 }}
        style={{ background }}
      >
        {/* Camera and Controls */}
        <CameraController 
          position={cameraPosition} 
          autoRotate={autoRotate}
          enableControls={enableControls}
        />

        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#8338EC" />

        {/* Environment */}
        {enableEnvironment && (
          <Environment preset="studio" />
        )}

        {/* Animated Background */}
        <AnimatedBackground color={background} />

        {/* Scene Content */}
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </Canvas>
      
      {/* Loading overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white/50 text-sm">Loading 3D Scene...</div>
      </div>
    </div>
  );
}
