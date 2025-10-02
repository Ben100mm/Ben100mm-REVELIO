'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { a, useSpring, useTransition } from '@react-spring/three';
import { Vector3, Color, Group, Mesh } from 'three';
import { useGesture } from '@use-gesture/react';

interface Animation3DProps {
  children?: React.ReactNode;
  position?: [number, number, number];
  duration?: number;
  delay?: number;
  trigger?: boolean;
}

// Morphing animation between different geometries
export function MorphingAnimation({
  position = [0, 0, 0],
  duration = 2000,
  trigger = true
}: Animation3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [morphTarget, setMorphTarget] = useState(0);
  
  const { scale } = useSpring({
    scale: trigger ? 1.2 : 1,
    config: { tension: 100, friction: 50 }
  });
  
  const rotation = trigger ? [Math.PI, Math.PI * 2, 0] as [number, number, number] : [0, 0, 0] as [number, number, number];

  useEffect(() => {
    if (trigger) {
      const interval = setInterval(() => {
        setMorphTarget(prev => (prev + 1) % 3);
      }, duration / 3);
      
      return () => clearInterval(interval);
    }
  }, [trigger, duration]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.elapsedTime;
      
      // Morphing effect
      const morph = Math.sin(time * 2) * 0.5 + 0.5;
      meshRef.current.scale.setScalar(1 + morph * 0.3);
    }
  });

  return (
    <a.group position={position} scale={scale} rotation={rotation}>
      <mesh ref={meshRef} castShadow>
        {morphTarget === 0 && <sphereGeometry args={[1, 32, 32]} />}
        {morphTarget === 1 && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {morphTarget === 2 && <torusGeometry args={[1, 0.4, 16, 100]} />}
        <meshStandardMaterial
          color="#00D4FF"
          metalness={0.7}
          roughness={0.3}
          emissive={new Color('#00D4FF').multiplyScalar(0.2)}
        />
      </mesh>
    </a.group>
  );
}

// Complex path animation
export function PathAnimation({
  position = [0, 0, 0],
  path = 'figure8',
  duration = 5000,
  autoPlay = true
}: {
  position?: [number, number, number];
  path?: 'circle' | 'figure8' | 'spiral' | 'wave';
  duration?: number;
  autoPlay?: boolean;
}) {
  const groupRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current && autoPlay) {
      const time = (clock.elapsedTime * 1000) % duration;
      const progress = time / duration;
      
      let x, y, z;
      
      switch (path) {
        case 'circle':
          x = Math.cos(progress * Math.PI * 2) * 3;
          y = 0;
          z = Math.sin(progress * Math.PI * 2) * 3;
          break;
        case 'figure8':
          x = Math.sin(progress * Math.PI * 4) * 3;
          y = Math.sin(progress * Math.PI * 2) * 1;
          z = Math.cos(progress * Math.PI * 2) * 2;
          break;
        case 'spiral':
          x = Math.cos(progress * Math.PI * 6) * (1 + progress * 2);
          y = progress * 4 - 2;
          z = Math.sin(progress * Math.PI * 6) * (1 + progress * 2);
          break;
        case 'wave':
          x = progress * 6 - 3;
          y = Math.sin(progress * Math.PI * 4) * 2;
          z = Math.cos(progress * Math.PI * 2) * 1;
          break;
        default:
          x = y = z = 0;
      }
      
      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.y = progress * Math.PI * 2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#FF6B9D"
          metalness={0.8}
          roughness={0.2}
          emissive={new Color('#FF6B9D').multiplyScalar(0.3)}
        />
      </mesh>
    </group>
  );
}

// Elastic animation with spring physics
export function ElasticAnimation({
  position = [0, 0, 0],
  trigger = false,
  children
}: Animation3DProps) {
  const groupRef = useRef<Group>(null);
  
  const { scale, position: springPosition } = useSpring({
    scale: trigger ? 1.5 : 1,
    position: trigger ? [position[0], position[1] + 1, position[2]] : position,
    config: { 
      tension: 300, 
      friction: 30,
      mass: 1
    }
  });
  
  const rotation = trigger ? [0, Math.PI * 2, 0] as [number, number, number] : [0, 0, 0] as [number, number, number];

  return (
    <a.group 
      ref={groupRef} 
      position={springPosition as unknown as [number, number, number]} 
      scale={scale as unknown as [number, number, number]} 
      rotation={rotation}
    >
      {children}
    </a.group>
  );
}

// Sequence animation for multiple elements
export function SequenceAnimation({
  children,
  stagger = 200,
  trigger = true
}: {
  children: React.ReactNode[];
  stagger?: number;
  trigger?: boolean;
}) {
  const transitions = useTransition(trigger ? children : [], {
    from: { opacity: 0, scale: 0, rotation: [0, Math.PI, 0] },
    enter: { opacity: 1, scale: 1, rotation: [0, 0, 0] },
    leave: { opacity: 0, scale: 0, rotation: [0, -Math.PI, 0] },
    trail: stagger,
    config: { tension: 300, friction: 30 }
  });

  return (
    <>
      {transitions((style, item, _, index) => (
        <a.group
          key={index}
          position={[index * 2 - children.length, 0, 0]}
          scale={style.scale as unknown as [number, number, number]}
          rotation={style.rotation as unknown as [number, number, number]}
        >
          {item}
        </a.group>
      ))}
    </>
  );
}

// Gesture-driven animation
export function GestureAnimation({
  children,
  position = [0, 0, 0]
}: {
  children: React.ReactNode;
  position?: [number, number, number];
}) {
  const groupRef = useRef<Group>(null);
  const [dragOffset, setDragOffset] = useState(new Vector3());
  
  const bind = useGesture({
    onDrag: ({ offset: [x, y], memo = [0, 0, 0] }) => {
      const newOffset = new Vector3(
        memo[0] + x * 0.01,
        memo[1] - y * 0.01,
        memo[2]
      );
      setDragOffset(newOffset);
      return [newOffset.x, newOffset.y, newOffset.z];
    },
    onDragStart: () => {
      // Add bounce effect on drag start
      if (groupRef.current) {
        groupRef.current.scale.setScalar(1.2);
      }
    },
    onDragEnd: () => {
      // Return to normal scale
      if (groupRef.current) {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group 
      ref={groupRef}
      position={[
        position[0] + dragOffset.x,
        position[1] + dragOffset.y,
        position[2] + dragOffset.z
      ]}
      {...bind()}
    >
      {children}
    </group>
  );
}

// Camera animation
export function CameraAnimation({
  target = [0, 0, 0],
  duration = 3000,
  trigger = false
}: {
  target?: [number, number, number];
  duration?: number;
  trigger?: boolean;
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    if (trigger) {
      const startPosition = camera.position.clone();
      const targetPosition = new Vector3(...target);
      
      const animate = (progress: number) => {
        const currentPosition = startPosition.clone().lerp(targetPosition, progress);
        camera.position.copy(currentPosition);
        camera.lookAt(0, 0, 0);
      };
      
      // Smooth easing function
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      let startTime: number;
      const animation = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        animate(easeInOutCubic(progress));
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
    }
  }, [trigger, target, duration, camera]);

  return null;
}

// Physics-based animation
export function PhysicsAnimation({
  position = [0, 0, 0],
  mass = 1,
  bounce = 0.8,
  friction = 0.99
}: {
  position?: [number, number, number];
  mass?: number;
  bounce?: number;
  friction?: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const velocity = useRef(new Vector3(0, 0, 0));
  const acceleration = useRef(new Vector3(0, -9.8, 0)); // gravity
  
  useFrame(() => {
    if (meshRef.current) {
      // Apply physics
      velocity.current.add(acceleration.current.clone().multiplyScalar(0.016));
      velocity.current.multiplyScalar(friction);
      
      const newPosition = meshRef.current.position.clone().add(velocity.current.clone().multiplyScalar(0.016));
      
      // Ground collision
      if (newPosition.y < -2) {
        newPosition.y = -2;
        velocity.current.y *= -bounce;
      }
      
      // Wall collisions
      if (newPosition.x > 3 || newPosition.x < -3) {
        velocity.current.x *= -bounce;
        newPosition.x = Math.max(-3, Math.min(3, newPosition.x));
      }
      
      if (newPosition.z > 3 || newPosition.z < -3) {
        velocity.current.z *= -bounce;
        newPosition.z = Math.max(-3, Math.min(3, newPosition.z));
      }
      
      meshRef.current.position.copy(newPosition);
    }
  });

  const applyForce = useCallback((force: Vector3) => {
    acceleration.current.add(force.clone().divideScalar(mass));
  }, [mass]);

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onClick={() => applyForce(new Vector3(
        (Math.random() - 0.5) * 20,
        10,
        (Math.random() - 0.5) * 20
      ))}
      castShadow
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color="#4ECDC4"
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

// Transition animation between scenes
export function SceneTransition({
  children,
  type = 'fade',
  duration = 1000,
  trigger = false
}: {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'rotate';
  duration?: number;
  trigger?: boolean;
}) {
  const getTransitionProps = () => {
    switch (type) {
      case 'fade':
        return {
          from: { opacity: 0 },
          enter: { opacity: 1 },
          leave: { opacity: 0 }
        };
      case 'slide':
        return {
          from: { position: [0, 5, 0] as [number, number, number] },
          enter: { position: [0, 0, 0] as [number, number, number] },
          leave: { position: [0, -5, 0] as [number, number, number] }
        };
      case 'scale':
        return {
          from: { scale: [0, 0, 0] as [number, number, number] },
          enter: { scale: [1, 1, 1] as [number, number, number] },
          leave: { scale: [0, 0, 0] as [number, number, number] }
        };
      case 'rotate':
        return {
          from: { rotation: [0, Math.PI * 2, 0] as [number, number, number] },
          enter: { rotation: [0, 0, 0] as [number, number, number] },
          leave: { rotation: [0, -Math.PI * 2, 0] as [number, number, number] }
        };
      default:
        return {
          from: { opacity: 0 },
          enter: { opacity: 1 },
          leave: { opacity: 0 }
        };
    }
  };

  const transitions = useTransition(trigger ? children : null, {
    ...getTransitionProps(),
    config: { duration },
    exitBeforeEnter: true
  });

  return (
    <>
      {transitions((style, item) => (
        <a.group style={style}>
          {item}
        </a.group>
      ))}
    </>
  );
}
