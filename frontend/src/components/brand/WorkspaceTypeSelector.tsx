'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  NeoCard, 
  NeoButton, 
  NeoGlass,
  NeoBadge
} from '@/components/neo-materialism';

interface WorkspaceType {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  recommended: boolean;
}

export default function WorkspaceTypeSelector() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const workspaceTypes: WorkspaceType[] = [
    {
      id: 'brand',
      name: 'Brand Workspace',
      description: 'Perfect for brands and companies looking to create campaigns and work with creators',
      features: [
        'Create and manage campaigns',
        'Discover and connect with creators',
        'Track campaign performance',
        'Manage payments and contracts',
        'Advanced analytics dashboard',
        'Team collaboration tools'
      ],
      icon: 'Brand',
      color: 'from-purple-500 to-pink-600',
      recommended: true
    },
    {
      id: 'agency',
      name: 'Agency Workspace',
      description: 'Designed for marketing agencies managing multiple client campaigns',
      features: [
        'Multi-client campaign management',
        'White-label reporting',
        'Client collaboration tools',
        'Advanced team permissions',
        'Custom branding options',
        'API access for integrations'
      ],
      icon: 'Agency',
      color: 'from-blue-500 to-cyan-600',
      recommended: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise Workspace',
      description: 'For large organizations with complex needs and custom requirements',
      features: [
        'Custom integrations',
        'Dedicated account manager',
        'Advanced security features',
        'Custom reporting',
        'Priority support',
        'SLA guarantees'
      ],
      icon: 'Enterprise',
      color: 'from-green-500 to-emerald-600',
      recommended: false
    }
  ];

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = async () => {
    if (!selectedType) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store workspace type
      localStorage.setItem('workspaceType', selectedType);
      
      // Redirect to onboarding wizard
      router.push('/brand/onboarding');
    } catch (err) {
      console.error('Error selecting workspace type:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="neo-heading-1 neo-text-holographic mb-4">
            Choose Your{' '}
            <span className="neo-text-glow">Workspace Type</span>
          </h1>
          <p className="neo-text-large text-slate-300 max-w-3xl mx-auto">
            Select the workspace that best fits your needs. You can always upgrade or change your workspace type later.
          </p>
        </div>

        {/* Workspace Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {workspaceTypes.map((type) => (
            <NeoCard
              key={type.id}
              variant="interactive"
              className={`p-8 cursor-pointer transition-all duration-300 ${
                selectedType === type.id
                  ? 'ring-2 ring-blue-500 scale-105'
                  : 'hover:scale-105'
              }`}
              onClick={() => handleSelectType(type.id)}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-4xl">{type.icon}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h3 className="neo-heading-3 text-white">{type.name}</h3>
                  {type.recommended && (
                    <NeoBadge variant="success" size="sm">Recommended</NeoBadge>
                  )}
                </div>
                <p className="neo-text-body text-slate-300">{type.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="neo-text-small text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Selection Indicator */}
              <div className="text-center">
                {selectedType === type.id ? (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 border-2 border-slate-600 rounded-full mx-auto"></div>
                )}
              </div>
            </NeoCard>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <NeoButton
            variant="primary"
            size="lg"
            onClick={handleContinue}
            disabled={!selectedType || loading}
            loading={loading}
            className="px-12"
          >
            Continue to Onboarding
          </NeoButton>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="neo-text-small text-slate-400">
            Need help choosing?{' '}
            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
              Contact our team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
