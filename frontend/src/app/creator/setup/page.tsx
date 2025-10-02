'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  NeoCard, 
  NeoButton, 
  NeoInput, 
  NeoGlass,
  NeoBadge,
  NeoProgress
} from '@/components/neo-materialism';

interface CreatorSetupData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
  };
  creatorProfile: {
    displayName: string;
    username: string;
    bio: string;
    niche: string;
    contentFormats: string[];
    socialHandles: {
      instagram: string;
      youtube: string;
      tiktok: string;
      twitter: string;
      linkedin: string;
    };
  };
  payoutInfo: {
    method: 'bank' | 'paypal' | 'stripe' | 'crypto';
    accountDetails: string;
    taxId: string;
  };
}

export default function CreatorSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreatorSetupData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: ''
    },
    creatorProfile: {
      displayName: '',
      username: '',
      bio: '',
      niche: '',
      contentFormats: [],
      socialHandles: {
        instagram: '',
        youtube: '',
        tiktok: '',
        twitter: '',
        linkedin: ''
      }
    },
    payoutInfo: {
      method: 'bank',
      accountDetails: '',
      taxId: ''
    }
  });

  const router = useRouter();

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic information about you' },
    { id: 2, title: 'Creator Profile', description: 'Your creator identity and content' },
    { id: 3, title: 'Payout Setup', description: 'How you want to get paid' }
  ];

  const niches = [
    'Technology', 'Lifestyle', 'Fashion', 'Beauty', 'Fitness', 'Food',
    'Travel', 'Gaming', 'Education', 'Business', 'Finance', 'Health',
    'Entertainment', 'Sports', 'Art', 'Music', 'Photography', 'Other'
  ];

  const contentFormats = [
    'Video', 'Article', 'Podcast', 'Social Media Post', 'Live Stream',
    'Tutorial', 'Review', 'Tutorial', 'Story', 'Infographic'
  ];

  const handleInputChange = (section: keyof CreatorSetupData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayToggle = (section: keyof CreatorSetupData, field: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[section][field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store creator data
      localStorage.setItem('creatorSetup', JSON.stringify(formData));
      
      // Redirect to verification
      router.push('/creator/verification');
    } catch (error) {
      console.error('Setup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.personalInfo.firstName && 
               formData.personalInfo.lastName && 
               formData.personalInfo.email;
      case 2:
        return formData.creatorProfile.displayName && 
               formData.creatorProfile.username && 
               formData.creatorProfile.niche &&
               formData.creatorProfile.contentFormats.length > 0;
      case 3:
        return formData.payoutInfo.method && formData.payoutInfo.accountDetails;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="neo-glass p-6 mb-8">
        <div className="neo-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="neo-heading-2 text-white">Creator Account Setup</h1>
              <p className="neo-text-body text-slate-400">Let's set up your creator profile</p>
            </div>
            <NeoBadge variant="info">Step {currentStep} of {steps.length}</NeoBadge>
          </div>
        </div>
      </header>

      <div className="neo-container neo-section">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-blue-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="neo-heading-4 text-white">{steps[currentStep - 1].title}</h3>
            <p className="neo-text-small text-slate-400">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <NeoCard variant="elevated" className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="neo-heading-3 text-white mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeoInput
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.personalInfo.firstName}
                  onChange={(value) => handleInputChange('personalInfo', 'firstName', value)}
                  variant="glass"
                />
                
                <NeoInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.personalInfo.lastName}
                  onChange={(value) => handleInputChange('personalInfo', 'lastName', value)}
                  variant="glass"
                />
              </div>

              <NeoInput
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.personalInfo.email}
                onChange={(value) => handleInputChange('personalInfo', 'email', value)}
                variant="glass"
              />

              <NeoInput
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formData.personalInfo.phone}
                onChange={(value) => handleInputChange('personalInfo', 'phone', value)}
                variant="glass"
              />

              <NeoInput
                label="Location"
                placeholder="City, Country"
                value={formData.personalInfo.location}
                onChange={(value) => handleInputChange('personalInfo', 'location', value)}
                variant="glass"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="neo-heading-3 text-white mb-6">Creator Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeoInput
                  label="Display Name"
                  placeholder="How you want to be known"
                  value={formData.creatorProfile.displayName}
                  onChange={(value) => handleInputChange('creatorProfile', 'displayName', value)}
                  variant="glass"
                />
                
                <NeoInput
                  label="Username"
                  placeholder="@yourusername"
                  value={formData.creatorProfile.username}
                  onChange={(value) => handleInputChange('creatorProfile', 'username', value)}
                  variant="glass"
                />
              </div>

              <div>
                <label className="neo-form-label mb-3 block">Bio</label>
                <textarea
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder="Tell us about yourself and your content..."
                  value={formData.creatorProfile.bio}
                  onChange={(e) => handleInputChange('creatorProfile', 'bio', e.target.value)}
                />
              </div>

              <div>
                <label className="neo-form-label mb-3 block">Content Niche</label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {niches.map((niche) => (
                    <button
                      key={niche}
                      type="button"
                      onClick={() => handleInputChange('creatorProfile', 'niche', niche)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.creatorProfile.niche === niche
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="neo-form-label mb-3 block">Content Formats (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {contentFormats.map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => handleArrayToggle('creatorProfile', 'contentFormats', format)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.creatorProfile.contentFormats.includes(format)
                          ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                          : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="neo-form-label mb-3 block">Social Media Handles</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NeoInput
                    label="Instagram"
                    placeholder="@username"
                    value={formData.creatorProfile.socialHandles.instagram}
                    onChange={(value) => handleInputChange('creatorProfile', 'socialHandles', { ...formData.creatorProfile.socialHandles, instagram: value })}
                    variant="glass"
                  />
                  <NeoInput
                    label="YouTube"
                    placeholder="@username"
                    value={formData.creatorProfile.socialHandles.youtube}
                    onChange={(value) => handleInputChange('creatorProfile', 'socialHandles', { ...formData.creatorProfile.socialHandles, youtube: value })}
                    variant="glass"
                  />
                  <NeoInput
                    label="TikTok"
                    placeholder="@username"
                    value={formData.creatorProfile.socialHandles.tiktok}
                    onChange={(value) => handleInputChange('creatorProfile', 'socialHandles', { ...formData.creatorProfile.socialHandles, tiktok: value })}
                    variant="glass"
                  />
                  <NeoInput
                    label="Twitter"
                    placeholder="@username"
                    value={formData.creatorProfile.socialHandles.twitter}
                    onChange={(value) => handleInputChange('creatorProfile', 'socialHandles', { ...formData.creatorProfile.socialHandles, twitter: value })}
                    variant="glass"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="neo-heading-3 text-white mb-6">Payout Setup</h3>
              
              <div>
                <label className="neo-form-label mb-3 block">Payout Method</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                    { id: 'paypal', label: 'PayPal', icon: '💳' },
                    { id: 'stripe', label: 'Stripe', icon: '💎' },
                    { id: 'crypto', label: 'Crypto', icon: '₿' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => handleInputChange('payoutInfo', 'method', method.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        formData.payoutInfo.method === method.id
                          ? 'border-green-500 bg-green-500/10 text-green-400'
                          : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="neo-text-small font-medium">{method.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <NeoInput
                label="Account Details"
                placeholder="Enter account number, email, or wallet address"
                value={formData.payoutInfo.accountDetails}
                onChange={(value) => handleInputChange('payoutInfo', 'accountDetails', value)}
                variant="glass"
              />

              <NeoInput
                label="Tax ID (Optional)"
                placeholder="Enter your tax identification number"
                value={formData.payoutInfo.taxId}
                onChange={(value) => handleInputChange('payoutInfo', 'taxId', value)}
                variant="glass"
              />

              <NeoGlass variant="tinted" className="p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="neo-text-small font-semibold text-white mb-2">Payout Information</h4>
                    <p className="neo-text-small text-slate-300">
                      Your payout information is encrypted and secure. You can update this information anytime in your settings.
                    </p>
                  </div>
                </div>
              </NeoGlass>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            <NeoButton
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </NeoButton>
            
            <NeoButton
              variant="primary"
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              loading={loading}
            >
              {currentStep === steps.length ? 'Complete Setup' : 'Next'}
            </NeoButton>
          </div>
        </NeoCard>
      </div>
    </div>
  );
}
