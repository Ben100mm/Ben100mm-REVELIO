'use client';

import { useState, useRef } from 'react';
import Scene3D from './Scene3D';
import { 
  AnimatedSphere, 
  MorphingIcosahedron, 
  FloatingTorus, 
  GeometricComposition,
  InteractiveGeometry,
  ProceduralGeometry 
} from './Geometry3D';
import { 
  HolographicMaterial, 
  LiquidMetalMaterial, 
  EnergyFieldMaterial,
  AnimatedGradientMaterial,
  GlassMaterial 
} from './Materials3D';
import { 
  InteractiveWrapper, 
  InteractiveButton3D, 
  InteractiveCube3D, 
  MagneticSphere3D,
  InteractiveMenu3D,
  InteractiveDataViz3D 
} from './Interactive3D';
import { 
  ParticleSystem3D, 
  ExplosionEffect, 
  TrailEffect, 
  InteractiveParticleField 
} from './Particles3D';
import { 
  MorphingAnimation, 
  PathAnimation, 
  ElasticAnimation,
  SequenceAnimation,
  GestureAnimation,
  PhysicsAnimation 
} from './Animations3D';

interface AdvancedDashboard3DProps {
  className?: string;
  mode?: 'creator' | 'brand' | 'admin';
  data?: any;
}

export default function AdvancedDashboard3D({ 
  className = '',
  mode = 'creator',
  data 
}: AdvancedDashboard3DProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 8]);
  
  // Sample data for visualization
  const sampleData = [
    { value: 85, label: 'Views', color: '#00D4FF' },
    { value: 42, label: 'Clicks', color: '#3A86FF' },
    { value: 28, label: 'Shares', color: '#8338EC' },
    { value: 15, label: 'Comments', color: '#FF6B9D' }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', color: '#00D4FF' },
    { id: 'content', label: 'Content', color: '#3A86FF' },
    { id: 'analytics', label: 'Analytics', color: '#8338EC' },
    { id: 'earnings', label: 'Earnings', color: '#FF6B9D' }
  ];

  return (
    <div className={`w-full h-screen relative overflow-hidden ${className}`}>
      {/* 3D Scene Container */}
      <div className="absolute inset-0">
        <Scene3D 
          enableControls={true}
          enableEnvironment={true}
          cameraPosition={cameraPosition}
          autoRotate={false}
          background="#0f172a"
        >
          {/* Central Composition */}
          <GeometricComposition position={[0, 0, 0]} animated={true} />
          
          {/* Interactive Elements */}
          <InteractiveWrapper 
            position={[-4, 2, 0]}
            onClick={() => setActiveTab('overview')}
            onHover={(hovered) => setHoveredElement(hovered ? 'overview' : null)}
          >
            <InteractiveGeometry 
              type="sphere" 
              color="#00D4FF" 
              hovered={hoveredElement === 'overview'}
            />
          </InteractiveWrapper>

          <InteractiveWrapper 
            position={[-4, -2, 0]}
            onClick={() => setActiveTab('content')}
            onHover={(hovered) => setHoveredElement(hovered ? 'content' : null)}
          >
            <InteractiveGeometry 
              type="box" 
              color="#3A86FF" 
              hovered={hoveredElement === 'content'}
            />
          </InteractiveWrapper>

          <InteractiveWrapper 
            position={[4, 2, 0]}
            onClick={() => setActiveTab('analytics')}
            onHover={(hovered) => setHoveredElement(hovered ? 'analytics' : null)}
          >
            <InteractiveGeometry 
              type="torus" 
              color="#8338EC" 
              hovered={hoveredElement === 'analytics'}
            />
          </InteractiveWrapper>

          <InteractiveWrapper 
            position={[4, -2, 0]}
            onClick={() => setActiveTab('earnings')}
            onHover={(hovered) => setHoveredElement(hovered ? 'earnings' : null)}
          >
            <InteractiveGeometry 
              type="icosahedron" 
              color="#FF6B9D" 
              hovered={hoveredElement === 'earnings'}
            />
          </InteractiveWrapper>

          {/* Data Visualization */}
          <InteractiveDataViz3D 
            position={[0, -4, 0]}
            data={sampleData}
            onBarClick={(index) => console.log('Bar clicked:', index)}
          />

          {/* Magnetic Sphere for Interaction */}
          <MagneticSphere3D 
            position={[0, 3, 0]}
            color="#4ECDC4"
            magneticStrength={0.8}
          />

          {/* Particle Systems */}
          {showParticles && (
            <>
              <ParticleSystem3D 
                count={500}
                position={[0, 0, -5]}
                color="#00D4FF"
                shape="sphere"
                animated={true}
                interactive={true}
              />
              
              <InteractiveParticleField 
                count={1000}
                position={[0, 0, 0]}
                color="#8338EC"
              />
            </>
          )}

          {/* Trail Effects */}
          <TrailEffect 
            position={[0, 0, 0]}
            color="#FF6B9D"
            length={50}
          />

          {/* Physics Animation */}
          <PhysicsAnimation 
            position={[2, 3, 0]}
            mass={1}
            bounce={0.8}
            friction={0.98}
          />

          {/* Path Animations */}
          <PathAnimation 
            position={[0, 0, 0]}
            path="figure8"
            duration={8000}
            autoPlay={true}
          />

          {/* Morphing Animation */}
          <MorphingAnimation 
            position={[-6, 0, 0]}
            duration={3000}
            trigger={activeTab === 'overview'}
          />

          {/* Procedural Geometry */}
          <ProceduralGeometry 
            position={[6, 0, 0]}
            seed={Math.floor(Math.random() * 100)}
            animated={true}
          />
        </Scene3D>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Navigation */}
        <div className="absolute top-6 left-6 right-6 pointer-events-auto">
          <div className="card-glass backdrop-blur-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="heading-4 text-gradient">Revelio 3D Dashboard</h1>
                <span className="text-sm text-slate-400">Advanced Mode</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowParticles(!showParticles)}
                  className="btn-ghost text-sm px-4 py-2"
                >
                  {showParticles ? 'Hide Particles' : 'Show Particles'}
                </button>
                
                <button 
                  onClick={() => setCameraPosition([0, 0, 8])}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Reset Camera
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="absolute top-24 left-6 bottom-6 w-80 pointer-events-auto">
          <div className="card-glass backdrop-blur-2xl h-full p-6">
            <h2 className="heading-6 text-slate-900 mb-6">Controls</h2>
            
            {/* Tab Navigation */}
            <div className="space-y-2 mb-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-white/80 shadow-3d-md text-slate-900'
                      : 'text-slate-600 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700">Live Stats</h3>
              {sampleData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Camera Controls */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700">Camera</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { pos: [0, 0, 8], label: 'Front' },
                  { pos: [8, 0, 0], label: 'Right' },
                  { pos: [0, 8, 0], label: 'Top' }
                ].map((camera, index) => (
                  <button
                    key={index}
                    onClick={() => setCameraPosition(camera.pos as [number, number, number])}
                    className="btn-ghost text-xs px-3 py-2"
                  >
                    {camera.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Panel */}
        <div className="absolute bottom-6 left-6 right-6 pointer-events-auto">
          <div className="card-glass backdrop-blur-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">3D</div>
                  <div className="text-xs text-slate-500">Mode</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">
                    {hoveredElement || 'None'}
                  </div>
                  <div className="text-xs text-slate-500">Hovered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {activeTab}
                  </div>
                  <div className="text-xs text-slate-500">Active</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-slate-600">Performance</div>
                <div className="text-lg font-semibold text-green-600">60 FPS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
