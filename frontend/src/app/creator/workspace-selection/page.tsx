'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  NeoCard, 
  NeoButton, 
  NeoGlass,
  NeoBadge
} from '@/components/neo-materialism';

export default function WorkspaceSelectionPage() {
  const [selectedWorkspace, setSelectedWorkspace] = useState<'creator' | 'brand' | null>(null);
  const router = useRouter();

  const handleWorkspaceSelect = (workspace: 'creator' | 'brand') => {
    setSelectedWorkspace(workspace);
  };

  const handleContinue = () => {
    if (selectedWorkspace === 'creator') {
      router.push('/creator/onboarding');
    } else if (selectedWorkspace === 'brand') {
      router.push('/brand/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="neo-glass p-6 mb-8">
        <div className="neo-container">
          <div className="text-center">
            <h1 className="neo-heading-2 text-white">Choose Your Workspace</h1>
            <p className="neo-text-body text-slate-400">Select the workspace that best fits your needs</p>
          </div>
        </div>
      </header>

      <div className="neo-container neo-section">
        <div className="max-w-4xl mx-auto">
          {/* Workspace Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Creator Workspace */}
            <NeoCard 
              variant="interactive" 
              className={`p-8 cursor-pointer transition-all duration-300 ${
                selectedWorkspace === 'creator' 
                  ? 'neo-glow neo-elevation-3 border-blue-500' 
                  : 'hover:neo-elevation-2'
              }`}
              onClick={() => handleWorkspaceSelect('creator')}
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="neo-heading-3 text-white">Creator Workspace</h3>
                
                {/* Description */}
                <p className="neo-text-body text-slate-300">
                  Perfect for content creators who want to monetize their content and collaborate with brands
                </p>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <NeoBadge variant="info" size="sm">Content Creation</NeoBadge>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <NeoBadge variant="success" size="sm">Performance Analytics</NeoBadge>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <NeoBadge variant="crystal" size="sm">Earnings Tracking</NeoBadge>
                  </div>
                </div>

                {/* Benefits List */}
                <ul className="text-left space-y-3 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Create and publish independent content</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Apply to brand briefs and campaigns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Track performance and earnings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Manage content distribution</span>
                  </li>
                </ul>

                {/* Selection Indicator */}
                {selectedWorkspace === 'creator' && (
                  <div className="flex items-center justify-center space-x-2 text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="neo-text-body font-medium">Selected</span>
                  </div>
                )}
              </div>
            </NeoCard>

            {/* Brand Workspace */}
            <NeoCard 
              variant="interactive" 
              className={`p-8 cursor-pointer transition-all duration-300 ${
                selectedWorkspace === 'brand' 
                  ? 'neo-glow neo-elevation-3 border-purple-500' 
                  : 'hover:neo-elevation-2'
              }`}
              onClick={() => handleWorkspaceSelect('brand')}
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="neo-heading-3 text-white">Brand Workspace</h3>
                
                {/* Description */}
                <p className="neo-text-body text-slate-300">
                  Ideal for businesses looking to collaborate with creators and manage marketing campaigns
                </p>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <NeoBadge variant="warning" size="sm">Campaign Management</NeoBadge>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <NeoBadge variant="success" size="sm">Creator Discovery</NeoBadge>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <NeoBadge variant="crystal" size="sm">Analytics Dashboard</NeoBadge>
                  </div>
                </div>

                {/* Benefits List */}
                <ul className="text-left space-y-3 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Create and manage marketing campaigns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Discover and connect with creators</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Track campaign performance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Manage contracts and payments</span>
                  </li>
                </ul>

                {/* Selection Indicator */}
                {selectedWorkspace === 'brand' && (
                  <div className="flex items-center justify-center space-x-2 text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="neo-text-body font-medium">Selected</span>
                  </div>
                )}
              </div>
            </NeoCard>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <NeoButton
              variant="primary"
              size="lg"
              onClick={handleContinue}
              disabled={!selectedWorkspace}
              className="px-8"
            >
              Continue to {selectedWorkspace === 'creator' ? 'Creator' : 'Brand'} Onboarding
            </NeoButton>
          </div>

          {/* Additional Info */}
          <div className="mt-8">
            <NeoGlass variant="tinted" className="p-6">
              <div className="text-center">
                <h4 className="neo-heading-4 text-white mb-3">Need Help Choosing?</h4>
                <p className="neo-text-body text-slate-300 mb-4">
                  You can always switch between workspace types later, or even use both if you're both a creator and a brand.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <NeoBadge variant="info">Switch Anytime</NeoBadge>
                  <NeoBadge variant="success">Multiple Workspaces</NeoBadge>
                  <NeoBadge variant="crystal">Flexible Options</NeoBadge>
                </div>
              </div>
            </NeoGlass>
          </div>
        </div>
      </div>
    </div>
  );
}
