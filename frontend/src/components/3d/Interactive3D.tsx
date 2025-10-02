'use client';

import { useRef, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
import { Vector3, Color, Raycaster, Intersection } from 'three';
import { useGesture } from '@use-gesture/react';

interface Interactive3DProps {
  children?: React.ReactNode;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  onClick?: (event: any) => void;
  onHover?: (hovered: boolean) => void;
  draggable?: boolean;
  rotatable?: boolean;
  resizable?: boolean;
}

// Interactive wrapper component
export function InteractiveWrapper({
  children,
  position = [0, 0, 0],
  onClick,
  onHover,
  draggable = false,
  rotatable = false,
  resizable = false
}: Interactive3DProps) {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [dragOffset, setDragOffset] = useState<Vector3>(new Vector3());

  const { scale, position: springPosition } = useSpring({
    scale: active ? 1.1 : 1,
    position: position,
    config: { tension: 300, friction: 30 }
  });
  
  const rotation = rotatable && active ? [0, Math.PI, 0] as [number, number, number] : [0, 0, 0] as [number, number, number];

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    onHover?.(true);
  }, [onHover]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    onHover?.(false);
  }, [onHover]);

  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
    onClick?.(event);
  }, [onClick]);

  // Drag gesture handling
  const bind = useGesture({
    onDrag: ({ offset: [x, y], memo = [0, 0, 0] }) => {
      if (draggable) {
        const newPosition = [memo[0] + x * 0.01, memo[1] - y * 0.01, memo[2]];
        return newPosition;
      }
      return memo;
    },
    onDragStart: () => setActive(true),
    onDragEnd: () => setActive(false),
  });

  return (
    <a.group
      ref={meshRef}
      position={springPosition as unknown as [number, number, number]}
      scale={scale as unknown as [number, number, number]}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...(draggable ? bind() : {})}
    >
      {children}
    </a.group>
  );
}

// Interactive button component
export function InteractiveButton3D({
  position = [0, 0, 0],
  onClick,
  children,
  color = '#00D4FF',
  size = 1
}: {
  position?: [number, number, number];
  onClick?: () => void;
  children?: React.ReactNode;
  color?: string;
  size?: number;
}) {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const { scale } = useSpring({
    scale: pressed ? 0.9 : hovered ? 1.1 : 1,
    config: { tension: 300, friction: 30 }
  });
  
  const rotation = hovered ? [0, Math.PI * 0.1, 0] as [number, number, number] : [0, 0, 0] as [number, number, number];

  const handleClick = useCallback(() => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
    onClick?.();
  }, [onClick]);

  return (
    <a.group
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh castShadow>
        <boxGeometry args={[size, size * 0.3, size * 0.1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={hovered ? new Color(color).multiplyScalar(0.3) : new Color(0x000000)}
        />
      </mesh>
      {children}
    </a.group>
  );
}

// Interactive cube with physics-like behavior
export function InteractiveCube3D({
  position = [0, 0, 0],
  color = '#00D4FF',
  onClick
}: {
  position?: [number, number, number];
  color?: string;
  onClick?: () => void;
}) {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0));

  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { tension: 200, friction: 20 }
  });
  
  const rotation = [velocity.x, velocity.y, velocity.z] as [number, number, number];

  useFrame(() => {
    if (meshRef.current) {
      // Apply velocity and damping
      meshRef.current.position.add(velocity.clone().multiplyScalar(0.016));
      setVelocity(velocity.clone().multiplyScalar(0.95));
    }
  });

  const handleClick = useCallback(() => {
    // Add impulse on click
    const impulse = new Vector3(
      (Math.random() - 0.5) * 2,
      Math.random() * 2,
      (Math.random() - 0.5) * 2
    );
    setVelocity(impulse);
    onClick?.();
  }, [onClick]);

  return (
    <a.mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={hovered ? new Color(color).multiplyScalar(0.2) : new Color(0x000000)}
      />
    </a.mesh>
  );
}

// Interactive sphere with magnetic behavior
export function MagneticSphere3D({
  position = [0, 0, 0],
  color = '#8338EC',
  magneticStrength = 0.5
}: {
  position?: [number, number, number];
  color?: string;
  magneticStrength?: number;
}) {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [targetPosition, setTargetPosition] = useState(new Vector3(...position));

  const { scale, position: springPosition } = useSpring({
    scale: hovered ? 1.3 : 1,
    position: [targetPosition.x, targetPosition.y, targetPosition.z],
    config: { tension: 100, friction: 30 }
  });

  useFrame(({ camera, mouse }) => {
    if (meshRef.current) {
      // Create magnetic effect towards mouse position
      const mouse3D = new Vector3(
        (mouse.x * 5),
        (mouse.y * 5),
        camera.position.z - 5
      );
      
      const currentPos = meshRef.current.position;
      const direction = mouse3D.clone().sub(currentPos).normalize();
      const distance = currentPos.distanceTo(mouse3D);
      
      if (distance < 3) {
        const force = direction.multiplyScalar(magneticStrength * (3 - distance) / 3);
        setTargetPosition(currentPos.clone().add(force));
      } else {
        setTargetPosition(new Vector3(...position));
      }
    }
  });

  return (
    <a.mesh
      ref={meshRef}
      position={springPosition}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.3}
        emissive={hovered ? new Color(color).multiplyScalar(0.4) : new Color(0x000000)}
      />
    </a.mesh>
  );
}

// Interactive menu system
export function InteractiveMenu3D({
  position = [0, 0, 0],
  items = [],
  onItemClick
}: {
  position?: [number, number, number];
  items?: Array<{ id: string; label: string; color?: string }>;
  onItemClick?: (itemId: string) => void;
}) {
  const groupRef = useRef<any>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const rotation = [0, selectedItem ? Math.PI * 0.1 : 0, 0] as [number, number, number];

  return (
    <a.group ref={groupRef} position={position} rotation={rotation}>
      {items.map((item, index) => (
        <InteractiveButton3D
          key={item.id}
          position={[0, index * -1.5, 0]}
          color={item.color || '#00D4FF'}
          onClick={() => {
            setSelectedItem(item.id);
            onItemClick?.(item.id);
          }}
        >
          <mesh position={[0, 0, 0.6]}>
            <planeGeometry args={[1.5, 0.3]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
        </InteractiveButton3D>
      ))}
    </a.group>
  );
}

// Interactive data visualization
export function InteractiveDataViz3D({
  position = [0, 0, 0],
  data = [],
  onBarClick
}: {
  position?: [number, number, number];
  data?: Array<{ value: number; label: string; color?: string }>;
  onBarClick?: (index: number) => void;
}) {
  const groupRef = useRef<any>(null);

  return (
    <group ref={groupRef} position={position}>
      {data.map((item, index) => {
        const height = Math.max(item.value * 0.1, 0.1);
        const x = (index - data.length / 2) * 1.5;
        
        return (
          <InteractiveWrapper
            key={index}
            position={[x, height / 2, 0]}
            onClick={() => onBarClick?.(index)}
          >
            <mesh castShadow>
              <boxGeometry args={[1, height, 1]} />
              <meshStandardMaterial
                color={item.color || '#00D4FF'}
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>
          </InteractiveWrapper>
        );
      })}
    </group>
  );
}
