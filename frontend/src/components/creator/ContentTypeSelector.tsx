'use client';

import { useState } from 'react';
import { 
  NeoCard, 
  NeoButton, 
  NeoModal,
  NeoBadge
} from '@/components/neo-materialism';

interface ContentTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContentType: (type: 'independent' | 'sponsored') => void;
}

export default function ContentTypeSelector({ 
  isOpen, 
  onClose, 
  onSelectContentType 
}: ContentTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<'independent' | 'sponsored' | null>(null);

  const handleSelectType = (type: 'independent' | 'sponsored') => {
    setSelectedType(type);
    onSelectContentType(type);
    onClose();
  };

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  return (
    <NeoModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Choose Your Content Path"
      variant="glass"
      size="xl"
    >
      <div className="space-y-6">
        {/* Header Description */}
        <div className="text-center">
          <p className="neo-text-body text-slate-300 mb-2">
            Select how you want to create and monetize your content
          </p>
        </div>

        {/* Content Type Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Independent Content */}
          <NeoCard 
            variant="interactive" 
            className={`p-8 cursor-pointer transition-all duration-300 ${
              selectedType === 'independent' 
                ? 'neo-glow neo-elevation-3' 
                : 'hover:neo-elevation-2'
            }`}
            onClick={() => setSelectedType('independent')}
          >
            <div className="text-center space-y-4">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="neo-heading-4 text-white">Independent Content</h3>
              
              {/* Description */}
              <p className="neo-text-small text-slate-400">
                Self-published content that earns based on performance metrics
              </p>

              {/* Features */}
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <NeoBadge variant="info" size="sm">Performance-Based</NeoBadge>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <NeoBadge variant="success" size="sm">Full Creative Control</NeoBadge>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <NeoBadge variant="crystal" size="sm">Direct Monetization</NeoBadge>
                </div>
              </div>

              {/* Benefits List */}
              <ul className="text-left space-y-2 text-sm text-slate-300">
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Earn from views, engagement, and conversions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Complete creative freedom</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Build your personal brand</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Long-term audience growth</span>
                </li>
              </ul>
            </div>
          </NeoCard>

          {/* Sponsored Content */}
          <NeoCard 
            variant="interactive" 
            className={`p-8 cursor-pointer transition-all duration-300 ${
              selectedType === 'sponsored' 
                ? 'neo-glow neo-elevation-3' 
                : 'hover:neo-elevation-2'
            }`}
            onClick={() => setSelectedType('sponsored')}
          >
            <div className="text-center space-y-4">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="neo-heading-4 text-white">Sponsored Content</h3>
              
              {/* Description */}
              <p className="neo-text-small text-slate-400">
                Collaborate with brands and respond to business briefs
              </p>

              {/* Features */}
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <NeoBadge variant="warning" size="sm">Brand Partnership</NeoBadge>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <NeoBadge variant="success" size="sm">Guaranteed Payment</NeoBadge>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <NeoBadge variant="crystal" size="sm">Professional Growth</NeoBadge>
                </div>
              </div>

              {/* Benefits List */}
              <ul className="text-left space-y-2 text-sm text-slate-300">
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Apply to curated brand briefs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Guaranteed payment + performance bonuses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Professional portfolio building</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Escrow-protected payments</span>
                </li>
              </ul>
            </div>
          </NeoCard>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <NeoButton 
            variant="ghost" 
            onClick={handleClose}
          >
            Cancel
          </NeoButton>
          <NeoButton 
            variant="primary" 
            onClick={() => selectedType && handleSelectType(selectedType)}
            disabled={!selectedType}
          >
            Continue with {selectedType === 'independent' ? 'Independent' : 'Sponsored'} Content
          </NeoButton>
        </div>

        {/* Additional Info */}
        <div className="text-center pt-4 border-t border-slate-700/50">
          <p className="neo-text-small text-slate-400">
            You can always switch between content types or create hybrid content later
          </p>
        </div>
      </div>
    </NeoModal>
  );
}
