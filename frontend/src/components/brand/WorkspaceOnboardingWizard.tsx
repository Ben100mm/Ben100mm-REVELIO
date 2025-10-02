'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  NeoCard, 
  NeoButton, 
  NeoInput, 
  NeoGlass,
  NeoBadge,
  NeoProgress,
  NeoModal
} from '@/components/neo-materialism';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface OnboardingData {
  // Profile
  companyLogo: string;
  brandColors: string[];
  brandVoice: string;
  contentGuidelines: string;
  
  // Team Members
  teamMembers: TeamMember[];
  
  // Billing
  billingCycle: 'monthly' | 'yearly';
  paymentMethod: string;
  billingAddress: string;
  
  // Ad Preferences
  targetAudience: string[];
  contentTypes: string[];
  platforms: string[];
  budgetAllocation: Record<string, number>;
  campaignGoals: string[];
}

export default function WorkspaceOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<OnboardingData>({
    companyLogo: '',
    brandColors: [],
    brandVoice: '',
    contentGuidelines: '',
    teamMembers: [],
    billingCycle: 'monthly',
    paymentMethod: '',
    billingAddress: '',
    targetAudience: [],
    contentTypes: [],
    platforms: [],
    budgetAllocation: {},
    campaignGoals: []
  });

  const steps = [
    { id: 1, title: 'Brand Profile', description: 'Set up your brand identity and voice' },
    { id: 2, title: 'Team Members', description: 'Add team members and set permissions' },
    { id: 3, title: 'Billing Setup', description: 'Configure billing and payment preferences' },
    { id: 4, title: 'Ad Preferences', description: 'Define your advertising preferences' },
    { id: 5, title: 'Asset Upload', description: 'Upload logos and brand assets' }
  ];

  const handleInputChange = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store onboarding data
      localStorage.setItem('onboardingData', JSON.stringify(formData));
      
      // Redirect to brand dashboard
      router.push('/brand/dashboard');
    } catch (err) {
      setError('Onboarding failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeamMember = (member: TeamMember) => {
    if (editingMember) {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.map(m => m.id === editingMember.id ? member : m)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { ...member, id: Date.now().toString() }]
      }));
    }
    setShowTeamModal(false);
    setEditingMember(null);
  };

  const handleEditTeamMember = (member: TeamMember) => {
    setEditingMember(member);
    setShowTeamModal(true);
  };

  const handleDeleteTeamMember = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m.id !== memberId)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Brand Profile</h2>
              <p className="neo-text-body text-slate-300">Set up your brand identity and voice</p>
            </div>

            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {formData.companyLogo ? (
                  <img src={formData.companyLogo} alt="Company Logo" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span className="text-2xl font-bold text-white">Brand</span>
                )}
              </div>
              <NeoButton variant="ghost" size="sm">
                Upload Logo
              </NeoButton>
            </div>

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Brand Colors</label>
              <div className="grid grid-cols-6 gap-3">
                {['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444'].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      const newColors = formData.brandColors.includes(color)
                        ? formData.brandColors.filter(c => c !== color)
                        : [...formData.brandColors, color];
                      handleInputChange('brandColors', newColors);
                    }}
                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                      formData.brandColors.includes(color)
                        ? 'border-white scale-110'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <NeoInput
              label="Brand Voice"
              placeholder="Describe your brand's personality and tone..."
              multiline
              rows={3}
              value={formData.brandVoice}
              onChange={(value) => handleInputChange('brandVoice', value)}
              variant="glass"
              required
            />

            <NeoInput
              label="Content Guidelines"
              placeholder="Any specific guidelines for content creators..."
              multiline
              rows={4}
              value={formData.contentGuidelines}
              onChange={(value) => handleInputChange('contentGuidelines', value)}
              variant="glass"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Team Members</h2>
              <p className="neo-text-body text-slate-300">Add team members and set their permissions</p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h3 className="neo-heading-4 text-white">Team Members ({formData.teamMembers.length})</h3>
              <NeoButton
                variant="primary"
                size="sm"
                onClick={() => setShowTeamModal(true)}
              >
                + Add Member
              </NeoButton>
            </div>

            <div className="space-y-4">
              {formData.teamMembers.map((member) => (
                <NeoCard key={member.id} variant="glass" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="neo-text-body text-white font-medium">{member.name}</h4>
                        <p className="neo-text-small text-slate-400">{member.email}</p>
                        <p className="neo-text-small text-slate-400">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <NeoButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTeamMember(member)}
                      >
                        Edit
                      </NeoButton>
                      <NeoButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </NeoButton>
                    </div>
                  </div>
                </NeoCard>
              ))}

              {formData.teamMembers.length === 0 && (
                <NeoCard variant="glass" className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="neo-text-body text-white font-medium mb-2">No team members yet</h3>
                  <p className="neo-text-small text-slate-400 mb-4">Add team members to collaborate on campaigns</p>
                  <NeoButton
                    variant="primary"
                    size="sm"
                    onClick={() => setShowTeamModal(true)}
                  >
                    Add First Member
                  </NeoButton>
                </NeoCard>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Billing Setup</h2>
              <p className="neo-text-body text-slate-300">Configure your billing preferences</p>
            </div>

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Billing Cycle</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'monthly', label: 'Monthly', price: '$99/month', savings: '' },
                  { id: 'yearly', label: 'Yearly', price: '$999/year', savings: 'Save 15%' }
                ].map((cycle) => (
                  <button
                    key={cycle.id}
                    onClick={() => handleInputChange('billingCycle', cycle.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      formData.billingCycle === cycle.id
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-center">
                      <h3 className="neo-text-body font-semibold mb-2">{cycle.label}</h3>
                      <div className="neo-heading-4 text-white mb-1">{cycle.price}</div>
                      {cycle.savings && (
                        <NeoBadge variant="success" size="sm">{cycle.savings}</NeoBadge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <NeoInput
              label="Payment Method"
              placeholder="Visa ****1234"
              value={formData.paymentMethod}
              onChange={(value) => handleInputChange('paymentMethod', value)}
              variant="glass"
              required
            />

            <NeoInput
              label="Billing Address"
              placeholder="Enter your billing address..."
              multiline
              rows={3}
              value={formData.billingAddress}
              onChange={(value) => handleInputChange('billingAddress', value)}
              variant="glass"
              required
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Ad Preferences</h2>
              <p className="neo-text-body text-slate-300">Define your advertising preferences and goals</p>
            </div>

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Target Audience</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Gen Z', 'Millennials', 'Gen X', 'Baby Boomers', 'Professionals', 'Students', 'Parents', 'Tech Enthusiasts', 'Fashion Lovers'].map((audience) => (
                  <button
                    key={audience}
                    onClick={() => {
                      const newAudience = formData.targetAudience.includes(audience)
                        ? formData.targetAudience.filter(a => a !== audience)
                        : [...formData.targetAudience, audience];
                      handleInputChange('targetAudience', newAudience);
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      formData.targetAudience.includes(audience)
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {audience}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Content Types</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Blog Posts', 'Social Media', 'Video Content', 'Infographics', 'Case Studies', 'Webinars', 'Podcasts', 'E-books', 'White Papers'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      const newTypes = formData.contentTypes.includes(type)
                        ? formData.contentTypes.filter(t => t !== type)
                        : [...formData.contentTypes, type];
                      handleInputChange('contentTypes', newTypes);
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      formData.contentTypes.includes(type)
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Platforms</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['LinkedIn', 'Twitter', 'Instagram', 'YouTube', 'TikTok', 'Facebook', 'Medium', 'Reddit'].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => {
                      const newPlatforms = formData.platforms.includes(platform)
                        ? formData.platforms.filter(p => p !== platform)
                        : [...formData.platforms, platform];
                      handleInputChange('platforms', newPlatforms);
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      formData.platforms.includes(platform)
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Campaign Goals</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Brand Awareness', 'Lead Generation', 'Sales Conversion', 'Engagement', 'Thought Leadership', 'Product Launch', 'Event Promotion', 'Community Building'].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => {
                      const newGoals = formData.campaignGoals.includes(goal)
                        ? formData.campaignGoals.filter(g => g !== goal)
                        : [...formData.campaignGoals, goal];
                      handleInputChange('campaignGoals', newGoals);
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      formData.campaignGoals.includes(goal)
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Asset Upload</h2>
              <p className="neo-text-body text-slate-300">Upload your brand assets and resources</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NeoCard variant="glass" className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="neo-heading-4 text-white mb-2">Logo & Brand Assets</h3>
                <p className="neo-text-small text-slate-400 mb-4">Upload your logo and brand assets</p>
                <NeoButton variant="primary" size="sm">
                  Upload Assets
                </NeoButton>
              </NeoCard>

              <NeoCard variant="glass" className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="neo-heading-4 text-white mb-2">Brand Guidelines</h3>
                <p className="neo-text-small text-slate-400 mb-4">Upload your brand guidelines document</p>
                <NeoButton variant="accent" size="sm">
                  Upload Guidelines
                </NeoButton>
              </NeoCard>
            </div>

            <div className="text-center">
              <p className="neo-text-small text-slate-400 mb-4">
                You can always upload more assets later from your dashboard
              </p>
              <NeoButton variant="ghost" size="sm">
                Skip for Now
              </NeoButton>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="neo-heading-2 neo-text-glow">Workspace Onboarding</h1>
            <span className="neo-text-body text-slate-300">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <NeoProgress 
            value={(currentStep / steps.length) * 100} 
            color="purple" 
            variant="energy" 
          />
        </div>

        {/* Step Content */}
        <NeoCard variant="elevated" className="p-8">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700">
            <NeoButton
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </NeoButton>

            <div className="flex items-center space-x-4">
              {error && (
                <span className="neo-text-small text-red-400">{error}</span>
              )}
              <NeoButton
                variant="primary"
                onClick={handleNext}
                loading={loading}
                disabled={loading}
              >
                {currentStep === steps.length ? 'Complete Setup' : 'Next'}
              </NeoButton>
            </div>
          </div>
        </NeoCard>
      </div>

      {/* Team Member Modal */}
      <NeoModal
        isOpen={showTeamModal}
        onClose={() => {
          setShowTeamModal(false);
          setEditingMember(null);
        }}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
        size="md"
      >
        <TeamMemberForm
          member={editingMember}
          onSave={handleAddTeamMember}
          onCancel={() => {
            setShowTeamModal(false);
            setEditingMember(null);
          }}
        />
      </NeoModal>
    </div>
  );
}

// Team Member Form Component
function TeamMemberForm({ 
  member, 
  onSave, 
  onCancel 
}: { 
  member: TeamMember | null; 
  onSave: (member: TeamMember) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    role: member?.role || '',
    permissions: member?.permissions || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: member?.id || '',
      ...formData
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <NeoInput
        label="Name"
        placeholder="Enter team member's name"
        value={formData.name}
        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
        variant="glass"
        required
      />

      <NeoInput
        label="Email"
        type="email"
        placeholder="Enter team member's email"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
        variant="glass"
        required
      />

      <NeoInput
        label="Role"
        placeholder="e.g., Marketing Manager, Content Creator"
        value={formData.role}
        onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
        variant="glass"
        required
      />

      <div className="flex space-x-3">
        <NeoButton variant="primary" type="submit" className="flex-1">
          {member ? 'Update Member' : 'Add Member'}
        </NeoButton>
        <NeoButton variant="ghost" onClick={onCancel}>
          Cancel
        </NeoButton>
      </div>
    </form>
  );
}
