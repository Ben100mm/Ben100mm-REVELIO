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

interface OnboardingData {
  portfolio: {
    samples: File[];
    description: string;
  };
  socialConnections: {
    connected: string[];
    handles: Record<string, string>;
  };
  rates: {
    independentContent: {
      baseRate: number;
      performanceBonus: boolean;
    };
    sponsoredContent: {
      baseRate: number;
      performanceBonus: boolean;
    };
  };
  preferences: {
    contentTypes: string[];
    workingHours: string;
    timezone: string;
    availability: string;
  };
}

export default function CreatorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    portfolio: {
      samples: [],
      description: ''
    },
    socialConnections: {
      connected: [],
      handles: {}
    },
    rates: {
      independentContent: {
        baseRate: 0,
        performanceBonus: true
      },
      sponsoredContent: {
        baseRate: 0,
        performanceBonus: true
      }
    },
    preferences: {
      contentTypes: [],
      workingHours: '',
      timezone: '',
      availability: ''
    }
  });

  const router = useRouter();

  const steps = [
    { id: 1, title: 'Portfolio Setup', description: 'Upload your best work samples' },
    { id: 2, title: 'Social Connections', description: 'Connect your social media accounts' },
    { id: 3, title: 'Rate Settings', description: 'Set your rates and preferences' },
    { id: 4, title: 'Preferences', description: 'Configure your working preferences' }
  ];

  const contentTypes = [
    'Video', 'Article', 'Podcast', 'Social Media Post', 'Live Stream',
    'Tutorial', 'Review', 'Story', 'Infographic', 'Photography'
  ];

  const timezones = [
    'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00',
    'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00',
    'UTC-02:00', 'UTC-01:00', 'UTC+00:00', 'UTC+01:00', 'UTC+02:00',
    'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+06:00', 'UTC+07:00',
    'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00'
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store onboarding data
      localStorage.setItem('creatorOnboarding', JSON.stringify(formData));
      
      // Redirect to creator dashboard
      router.push('/creator/dashboard');
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        samples: [...prev.portfolio.samples, ...files]
      }
    }));
  };

  const handleSocialConnect = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      socialConnections: {
        ...prev.socialConnections,
        connected: [...prev.socialConnections.connected, platform]
      }
    }));
  };

  const handleContentTypeToggle = (type: string) => {
    setFormData(prev => {
      const currentTypes = prev.preferences.contentTypes;
      const newTypes = currentTypes.includes(type)
        ? currentTypes.filter(t => t !== type)
        : [...currentTypes, type];
      
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          contentTypes: newTypes
        }
      };
    });
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.portfolio.samples.length > 0 && formData.portfolio.description.length > 0;
      case 2:
        return formData.socialConnections.connected.length > 0;
      case 3:
        return formData.rates.independentContent.baseRate > 0 && formData.rates.sponsoredContent.baseRate > 0;
      case 4:
        return formData.preferences.contentTypes.length > 0 && formData.preferences.workingHours && formData.preferences.timezone;
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
              <h1 className="neo-heading-2 text-white">Creator Onboarding</h1>
              <p className="neo-text-body text-slate-400">Let's set up your creator workspace</p>
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
              <h3 className="neo-heading-3 text-white mb-6">Portfolio Setup</h3>
              
              <div>
                <label className="neo-form-label mb-3 block">Upload Your Best Work Samples</label>
                <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-slate-500 transition-colors">
                  <input
                    type="file"
                    id="portfolio-upload"
                    multiple
                    accept="image/*,video/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="portfolio-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="neo-text-body text-slate-300 mb-2">
                      Click to upload your portfolio samples
                    </p>
                    <p className="neo-text-small text-slate-400">
                      Images, videos, or PDFs up to 50MB each
                    </p>
                  </label>
                </div>
                
                {formData.portfolio.samples.length > 0 && (
                  <div className="mt-4">
                    <h4 className="neo-text-body text-white mb-2">Uploaded Files:</h4>
                    <div className="space-y-2">
                      {formData.portfolio.samples.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                          <span className="neo-text-small text-slate-300">{file.name}</span>
                          <NeoBadge variant="success" size="sm">Uploaded</NeoBadge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="neo-form-label mb-3 block">Portfolio Description</label>
                <textarea
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder="Describe your work, style, and what makes you unique as a creator..."
                  value={formData.portfolio.description}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    portfolio: {
                      ...prev.portfolio,
                      description: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="neo-heading-3 text-white mb-6">Social Media Connections</h3>
              
              <p className="neo-text-body text-slate-300 mb-6">
                Connect your social media accounts to showcase your work and increase your discoverability.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { platform: 'instagram', name: 'Instagram', icon: '📷', color: 'from-pink-500 to-purple-600' },
                  { platform: 'youtube', name: 'YouTube', icon: '📺', color: 'from-red-500 to-red-600' },
                  { platform: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-black to-gray-800' },
                  { platform: 'twitter', name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-600' },
                  { platform: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800' },
                  { platform: 'facebook', name: 'Facebook', icon: '👥', color: 'from-blue-500 to-blue-700' },
                  { platform: 'twitch', name: 'Twitch', icon: '🎮', color: 'from-purple-500 to-purple-700' },
                  { platform: 'discord', name: 'Discord', icon: '💬', color: 'from-indigo-500 to-indigo-700' }
                ].map((social) => (
                  <button
                    key={social.platform}
                    onClick={() => handleSocialConnect(social.platform)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.socialConnections.connected.includes(social.platform)
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{social.icon}</div>
                    <div className="neo-text-small font-medium">{social.name}</div>
                    {formData.socialConnections.connected.includes(social.platform) && (
                      <div className="neo-text-small text-green-400 mt-1">Connected</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <h3 className="neo-heading-3 text-white mb-6">Rate Settings</h3>
              
              {/* Independent Content Rates */}
              <div className="space-y-4">
                <h4 className="neo-heading-4 text-white">Independent Content Rates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <NeoInput
                    label="Base Rate (per 1000 views)"
                    type="number"
                    placeholder="0.00"
                    value={formData.rates.independentContent.baseRate}
                    onChange={(value) => setFormData(prev => ({
                      ...prev,
                      rates: {
                        ...prev.rates,
                        independentContent: {
                          ...prev.rates.independentContent,
                          baseRate: parseFloat(value) || 0
                        }
                      }
                    }))}
                    variant="glass"
                  />
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="independent-bonus"
                      checked={formData.rates.independentContent.performanceBonus}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        rates: {
                          ...prev.rates,
                          independentContent: {
                            ...prev.rates.independentContent,
                            performanceBonus: e.target.checked
                          }
                        }
                      }))}
                      className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="independent-bonus" className="neo-text-body text-slate-300">
                      Performance bonus enabled
                    </label>
                  </div>
                </div>
              </div>

              {/* Sponsored Content Rates */}
              <div className="space-y-4">
                <h4 className="neo-heading-4 text-white">Sponsored Content Rates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <NeoInput
                    label="Base Rate (per post)"
                    type="number"
                    placeholder="0.00"
                    value={formData.rates.sponsoredContent.baseRate}
                    onChange={(value) => setFormData(prev => ({
                      ...prev,
                      rates: {
                        ...prev.rates,
                        sponsoredContent: {
                          ...prev.rates.sponsoredContent,
                          baseRate: parseFloat(value) || 0
                        }
                      }
                    }))}
                    variant="glass"
                  />
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="sponsored-bonus"
                      checked={formData.rates.sponsoredContent.performanceBonus}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        rates: {
                          ...prev.rates,
                          sponsoredContent: {
                            ...prev.rates.sponsoredContent,
                            performanceBonus: e.target.checked
                          }
                        }
                      }))}
                      className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="sponsored-bonus" className="neo-text-body text-slate-300">
                      Performance bonus enabled
                    </label>
                  </div>
                </div>
              </div>

              <NeoGlass variant="tinted" className="p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="neo-text-small font-semibold text-white mb-2">Rate Information</h4>
                    <p className="neo-text-small text-slate-300">
                      You can adjust your rates anytime in your settings. Higher rates may reduce opportunities but increase your earnings per project.
                    </p>
                  </div>
                </div>
              </NeoGlass>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="neo-heading-3 text-white mb-6">Working Preferences</h3>
              
              <div>
                <label className="neo-form-label mb-3 block">Content Types You Create</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleContentTypeToggle(type)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.preferences.contentTypes.includes(type)
                          ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                          : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeoInput
                  label="Working Hours"
                  placeholder="e.g., 9 AM - 5 PM EST"
                  value={formData.preferences.workingHours}
                  onChange={(value) => setFormData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      workingHours: value
                    }
                  }))}
                  variant="glass"
                />
                
                <div>
                  <label className="neo-form-label mb-3 block">Timezone</label>
                  <select
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    value={formData.preferences.timezone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        timezone: e.target.value
                      }
                    }))}
                  >
                    <option value="">Select your timezone</option>
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="neo-form-label mb-3 block">Availability</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Full-time', 'Part-time', 'Freelance'].map((availability) => (
                    <button
                      key={availability}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          availability
                        }
                      }))}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.preferences.availability === availability
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {availability}
                    </button>
                  ))}
                </div>
              </div>
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
              {currentStep === steps.length ? 'Complete Onboarding' : 'Next'}
            </NeoButton>
          </div>
        </NeoCard>
      </div>
    </div>
  );
}
