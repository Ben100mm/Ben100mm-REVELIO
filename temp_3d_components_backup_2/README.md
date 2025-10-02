# Advanced 3D Components

This directory contains advanced 3D components powered by Three.js and React Three Fiber, inspired by Lusion Labs' cutting-edge 3D web experiences.

## Features

### 🎯 Core Components

- **Scene3D**: Main 3D scene manager with camera controls and lighting
- **Geometry3D**: Advanced geometric shapes with morphing and animations
- **Materials3D**: Custom shaders, holographic effects, and advanced materials
- **Interactive3D**: Interactive elements with mouse/touch controls and physics
- **Particles3D**: Particle systems, explosions, and trail effects
- **Animations3D**: Complex animations, transitions, and physics simulations

### 🚀 Advanced Features

#### Real-time Physics
- Collision detection and response
- Gravity simulation
- Elastic animations with spring physics
- Interactive elements with realistic behavior

#### Particle Systems
- Dynamic particle effects with customizable shapes
- Explosion effects with realistic physics
- Trail effects following moving objects
- Interactive particle fields that respond to mouse movement

#### Advanced Materials
- Custom shaders for holographic effects
- Liquid metal materials with animated surfaces
- Energy field materials with glowing effects
- Glass morphism with refraction and transparency

#### Interactive Elements
- Mouse/touch gesture support
- Magnetic spheres that follow cursor
- Draggable and rotatable objects
- Interactive data visualizations

## Usage Examples

### Basic 3D Scene
```tsx
import Scene3D from '@/components/3d/Scene3D';
import { AnimatedSphere } from '@/components/3d/Geometry3D';

function MyComponent() {
  return (
    <Scene3D enableControls={true} cameraPosition={[0, 0, 5]}>
      <AnimatedSphere position={[0, 0, 0]} color="#00D4FF" animated={true} />
    </Scene3D>
  );
}
```

### Interactive Elements
```tsx
import { InteractiveCube3D, MagneticSphere3D } from '@/components/3d/Interactive3D';

function InteractiveScene() {
  return (
    <Scene3D>
      <InteractiveCube3D 
        position={[0, 0, 0]}
        color="#FF6B9D"
        onClick={() => console.log('Cube clicked!')}
      />
      <MagneticSphere3D 
        position={[2, 0, 0]}
        color="#4ECDC4"
        magneticStrength={0.8}
      />
    </Scene3D>
  );
}
```

### Particle Effects
```tsx
import { ParticleSystem3D, ExplosionEffect } from '@/components/3d/Particles3D';

function ParticleScene() {
  return (
    <Scene3D>
      <ParticleSystem3D 
        count={1000}
        position={[0, 0, 0]}
        color="#00D4FF"
        shape="sphere"
        animated={true}
        interactive={true}
      />
      <ExplosionEffect 
        position={[2, 0, 0]}
        color="#FF6B9D"
        count={500}
        duration={2000}
      />
    </Scene3D>
  );
}
```

### Advanced Materials
```tsx
import { HolographicMaterial, LiquidMetalMaterial } from '@/components/3d/Materials3D';

function MaterialScene() {
  return (
    <Scene3D>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <HolographicMaterial 
          color1="#00D4FF"
          color2="#3A86FF"
          color3="#8338EC"
        />
      </mesh>
    </Scene3D>
  );
}
```

## Performance Optimization

### Best Practices
1. **LOD (Level of Detail)**: Use different geometry complexity based on distance
2. **Instancing**: Use instanced meshes for repeated objects
3. **Culling**: Enable frustum culling for objects outside view
4. **Texture Compression**: Use compressed texture formats
5. **Frame Rate**: Target 60 FPS with adaptive quality

### Performance Monitoring
```tsx
import { useFrame } from '@react-three/fiber';

function PerformanceMonitor() {
  useFrame(({ gl }) => {
    const info = gl.info;
    console.log('Render calls:', info.render.calls);
    console.log('Triangles:', info.render.triangles);
  });
}
```

## Browser Compatibility

- **Chrome**: Full support with WebGL 2.0
- **Firefox**: Full support with WebGL 2.0
- **Safari**: Full support with WebGL 2.0
- **Edge**: Full support with WebGL 2.0

## Dependencies

```json
{
  "three": "^0.158.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "@react-three/postprocessing": "^2.15.0",
  "leva": "^0.9.35",
  "maath": "^0.10.0",
  "react-spring": "^9.7.0",
  "@react-spring/three": "^9.7.0"
}
```

## Installation

1. Install dependencies:
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing leva maath react-spring @react-spring/three
npm install --save-dev @types/three
```

2. Import components in your React application:
```tsx
import Scene3D from '@/components/3d/Scene3D';
```

## Customization

### Custom Shaders
Create custom materials by extending the shader components:

```tsx
// Custom shader material
const customVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const customFragmentShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(vUv, sin(time), 1.0);
  }
`;
```

### Custom Animations
Create complex animations using React Spring:

```tsx
import { useSpring } from '@react-spring/three';

function CustomAnimation() {
  const { rotation } = useSpring({
    rotation: [0, Math.PI * 2, 0],
    config: { duration: 2000, loop: true }
  });

  return (
    <a.mesh rotation={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00D4FF" />
    </a.mesh>
  );
}
```

## Troubleshooting

### Common Issues

1. **Performance Issues**
   - Reduce particle count
   - Lower geometry complexity
   - Disable unnecessary effects

2. **WebGL Context Lost**
   - Handle context restoration
   - Implement fallback UI

3. **Memory Leaks**
   - Dispose of geometries and materials
   - Clean up event listeners

### Debug Mode
Enable Three.js debug mode:

```tsx
import { useThree } from '@react-three/fiber';

function DebugInfo() {
  const { gl } = useThree();
  gl.setClearColor('#000000', 1);
  
  // Add stats panel
  import('three/examples/jsm/libs/stats.module').then(({ default: Stats }) => {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    
    useFrame(() => stats.update());
  });
}
```

## Contributing

When adding new 3D components:

1. Follow the existing component structure
2. Include TypeScript types
3. Add performance optimizations
4. Include usage examples
5. Test across different browsers

## License

This 3D component library is part of the Revelio project and follows the same licensing terms.
