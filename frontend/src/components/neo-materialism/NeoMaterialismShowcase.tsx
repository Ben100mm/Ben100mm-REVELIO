'use client';

import React, { useState } from 'react';
import { 
  NeoCard, 
  NeoButton, 
  NeoGlass, 
  NeoInput, 
  NeoModal, 
  NeoProgress, 
  NeoBadge 
} from './index';

const NeoMaterialismShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progressValue, setProgressValue] = useState(65);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="neo-text-holographic text-5xl font-bold mb-4">
            Neo-Materialism Components
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced 3D UI components with realistic materials, physics-based interactions, 
            and luminous clarity following Neo-Materialism design principles.
          </p>
        </div>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="neo-text-glow text-3xl font-semibold mb-8">Neo-Material Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NeoCard variant="default" className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Default Card</h3>
              <p className="text-slate-300">
                Standard material card with realistic shadows and depth.
              </p>
            </NeoCard>

            <NeoCard variant="elevated" glow className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Elevated Card</h3>
              <p className="text-slate-300">
                Higher elevation with stronger shadows and glow effect.
              </p>
            </NeoCard>

            <NeoCard variant="interactive" energy className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Interactive Card</h3>
              <p className="text-slate-300">
                Clickable card with energy flow animation and hover effects.
              </p>
            </NeoCard>

            <NeoGlass variant="default" className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Glass Panel</h3>
              <p className="text-slate-300">
                Glass morphism with backdrop blur and transparency.
              </p>
            </NeoGlass>

            <NeoGlass variant="crystal" className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Crystal Panel</h3>
              <p className="text-slate-300">
                Crystal transparency with rainbow gradient effects.
              </p>
            </NeoGlass>

            <NeoCard variant="crystal" className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Crystal Card</h3>
              <p className="text-slate-300">
                Crystal variant with tinted glass and subtle colors.
              </p>
            </NeoCard>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="neo-text-glow text-3xl font-semibold mb-8">Neo-Material Buttons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <NeoButton variant="primary" size="lg" glow>
                Primary Button
              </NeoButton>
              <NeoButton variant="secondary" size="lg">
                Secondary Button
              </NeoButton>
              <NeoButton variant="accent" size="lg" energy>
                Accent Button
              </NeoButton>
            </div>

            <div className="space-y-4">
              <NeoButton variant="ghost" size="lg">
                Ghost Button
              </NeoButton>
              <NeoButton variant="danger" size="lg">
                Danger Button
              </NeoButton>
              <NeoButton variant="primary" size="lg" loading>
                Loading Button
              </NeoButton>
            </div>

            <div className="space-y-4">
              <NeoButton variant="primary" size="sm">
                Small
              </NeoButton>
              <NeoButton variant="primary" size="md">
                Medium
              </NeoButton>
              <NeoButton variant="primary" size="lg">
                Large
              </NeoButton>
              <NeoButton variant="primary" size="xl">
                Extra Large
              </NeoButton>
            </div>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="mb-16">
          <h2 className="neo-text-glow text-3xl font-semibold mb-8">Neo-Material Inputs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <NeoInput
                label="Default Input"
                placeholder="Enter your text..."
                value={inputValue}
                onChange={setInputValue}
              />
              
              <NeoInput
                label="Glass Input"
                placeholder="Glass morphism input..."
                variant="glass"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              
              <NeoInput
                label="Crystal Input"
                placeholder="Crystal input with gradient..."
                variant="crystal"
                success
              />
            </div>

            <div className="space-y-6">
              <NeoInput
                label="Energy Input"
                placeholder="Energy flow input..."
                variant="energy"
                glow
              />
              
              <NeoInput
                label="Error Input"
                placeholder="This has an error..."
                error="This field is required"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m12-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                iconPosition="right"
              />
              
              <NeoInput
                label="Disabled Input"
                placeholder="This input is disabled..."
                disabled
              />
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="mb-16">
          <h2 className="neo-text-glow text-3xl font-semibold mb-8">Neo-Material Progress</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <NeoProgress
                value={progressValue}
                label="Default Progress"
                color="blue"
              />
              
              <NeoProgress
                value={80}
                label="Energy Progress"
                variant="energy"
                color="purple"
              />
              
              <NeoProgress
                value={45}
                label="Crystal Progress"
                variant="crystal"
                color="cyan"
              />
            </div>

            <div className="space-y-6">
              <NeoProgress
                value={90}
                label="Glow Progress"
                variant="glow"
                color="green"
              />
              
              <NeoProgress
                value={25}
                label="Gradient Progress"
                color="gradient"
                size="lg"
              />
              
              <div className="space-y-2">
                <button 
                  onClick={() => setProgressValue(Math.random() * 100)}
                  className="neo-button-primary"
                >
                  Randomize Progress
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <h2 className="neo-text-glow text-3xl font-semibold mb-8">Neo-Material Badges</h2>
          <div className="flex flex-wrap gap-4">
            <NeoBadge variant="default">Default</NeoBadge>
            <NeoBadge variant="success">Success</NeoBadge>
            <NeoBadge variant="warning">Warning</NeoBadge>
            <NeoBadge variant="error">Error</NeoBadge>
            <NeoBadge variant="info">Info</NeoBadge>
            <NeoBadge variant="crystal">Crystal</NeoBadge>
            <NeoBadge variant="energy" animated>Energy</NeoBadge>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <NeoBadge variant="success" size="sm">Small</NeoBadge>
            <NeoBadge variant="info" size="md">Medium</NeoBadge>
            <NeoBadge variant="warning" size="lg">Large</NeoBadge>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <NeoBadge 
              variant="info" 
              glow 
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            >
              With Icon
            </NeoBadge>
          </div>
        </section>

        {/* Modal Section */}
        <section className="mb-16">
          <h2 className="neo-text-glow text-3xl font-semibold mb-8">Neo-Material Modal</h2>
          <div className="flex gap-4">
            <NeoButton 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </NeoButton>
          </div>
        </section>

        {/* Modal */}
        <NeoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Neo-Materialism Modal"
          variant="glass"
          size="lg"
        >
          <div className="space-y-6">
            <p className="text-slate-300">
              This is a Neo-Materialism modal with glass morphism effects, 
              backdrop blur, and realistic material styling.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <NeoInput
                label="Modal Input"
                placeholder="Enter something..."
                variant="glass"
              />
              
              <NeoProgress
                value={75}
                label="Modal Progress"
                variant="energy"
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <NeoButton variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </NeoButton>
              <NeoButton variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm
              </NeoButton>
            </div>
          </div>
        </NeoModal>
      </div>
    </div>
  );
};

export default NeoMaterialismShowcase;
