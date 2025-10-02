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

interface BrandSetupData {
  // Company Details
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  description: string;
  
  // Contact Information
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Payment Information
  paymentMethod: 'card' | 'bank' | 'paypal';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  
  // Brand Profile
  brandValues: string[];
  targetAudience: string;
  contentPreferences: string[];
  budgetRange: string;
  
  // Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  kycCompleted: boolean;
}

export default function BrandSetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<BrandSetupData>({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    brandValues: [],
    targetAudience: '',
    contentPreferences: [],
    budgetRange: '',
    emailVerified: false,
    phoneVerified: false,
    kycCompleted: false
  });

  const steps = [
    { id: 1, title: 'Company Details', description: 'Basic information about your company' },
    { id: 2, title: 'Contact Information', description: 'Primary contact details' },
    { id: 3, title: 'Payment Method', description: 'Set up billing and payment' },
    { id: 4, title: 'Brand Profile', description: 'Define your brand and preferences' },
    { id: 5, title: 'Verification', description: 'Verify your account' }
  ];

  const handleInputChange = (field: keyof BrandSetupData, value: any) => {
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
      
      // Mock successful setup
      localStorage.setItem('brandSetup', JSON.stringify(formData));
      
      // Redirect to workspace type selection
      router.push('/brand/workspace-type');
    } catch (err) {
      setError('Setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (type: 'email' | 'phone' | 'kyc') => {
    setLoading(true);
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormData(prev => ({
        ...prev,
        [`${type}Verified`]: true
      }));
      
      setShowVerificationModal(false);
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Company Details</h2>
              <p className="neo-text-body text-slate-300">Tell us about your company</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeoInput
                label="Company Name"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={(value) => handleInputChange('companyName', value)}
                variant="glass"
                required
              />
              <NeoInput
                label="Industry"
                placeholder="e.g., Technology, Healthcare, Finance"
                value={formData.industry}
                onChange={(value) => handleInputChange('industry', value)}
                variant="glass"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeoInput
                label="Company Size"
                placeholder="e.g., 1-10, 11-50, 51-200, 200+"
                value={formData.companySize}
                onChange={(value) => handleInputChange('companySize', value)}
                variant="glass"
                required
              />
              <NeoInput
                label="Website"
                placeholder="https://yourcompany.com"
                value={formData.website}
                onChange={(value) => handleInputChange('website', value)}
                variant="glass"
              />
            </div>

            <NeoInput
              label="Company Description"
              placeholder="Describe your company and what you do..."
              multiline
              rows={4}
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
              variant="glass"
              required
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Contact Information</h2>
              <p className="neo-text-body text-slate-300">Primary contact details for your account</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeoInput
                label="Contact Name"
                placeholder="Your full name"
                value={formData.contactName}
                onChange={(value) => handleInputChange('contactName', value)}
                variant="glass"
                required
              />
              <NeoInput
                label="Contact Email"
                type="email"
                placeholder="your.email@company.com"
                value={formData.contactEmail}
                onChange={(value) => handleInputChange('contactEmail', value)}
                variant="glass"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeoInput
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                value={formData.contactPhone}
                onChange={(value) => handleInputChange('contactPhone', value)}
                variant="glass"
                required
              />
              <NeoInput
                label="Country"
                placeholder="United States"
                value={formData.country}
                onChange={(value) => handleInputChange('country', value)}
                variant="glass"
                required
              />
            </div>

            <NeoInput
              label="Street Address"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={(value) => handleInputChange('address', value)}
              variant="glass"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NeoInput
                label="City"
                placeholder="San Francisco"
                value={formData.city}
                onChange={(value) => handleInputChange('city', value)}
                variant="glass"
                required
              />
              <NeoInput
                label="State"
                placeholder="CA"
                value={formData.state}
                onChange={(value) => handleInputChange('state', value)}
                variant="glass"
                required
              />
              <NeoInput
                label="ZIP Code"
                placeholder="94105"
                value={formData.zipCode}
                onChange={(value) => handleInputChange('zipCode', value)}
                variant="glass"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Payment Method</h2>
              <p className="neo-text-body text-slate-300">Set up billing for your campaigns</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { id: 'card', label: 'Credit Card', icon: '💳' },
                { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                { id: 'paypal', label: 'PayPal', icon: '💰' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleInputChange('paymentMethod', method.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{method.icon}</div>
                    <div className="neo-text-small font-semibold">{method.label}</div>
                  </div>
                </button>
              ))}
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4">
                <NeoInput
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(value) => handleInputChange('cardNumber', value)}
                  variant="glass"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NeoInput
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(value) => handleInputChange('expiryDate', value)}
                    variant="glass"
                    required
                  />
                  <NeoInput
                    label="CVV"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(value) => handleInputChange('cvv', value)}
                    variant="glass"
                    required
                  />
                </div>
                <NeoInput
                  label="Cardholder Name"
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={(value) => handleInputChange('cardholderName', value)}
                  variant="glass"
                  required
                />
              </div>
            )}

            <NeoInput
              label="Billing Address"
              placeholder="Same as company address or different billing address"
              multiline
              rows={3}
              value={formData.billingAddress}
              onChange={(value) => handleInputChange('billingAddress', value)}
              variant="glass"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="neo-heading-2 neo-text-glow mb-2">Brand Profile</h2>
              <p className="neo-text-body text-slate-300">Help us understand your brand and preferences</p>
            </div>

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Brand Values</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Innovation', 'Sustainability', 'Quality', 'Authenticity', 'Diversity', 'Community', 'Excellence', 'Transparency', 'Creativity'].map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      const newValues = formData.brandValues.includes(value)
                        ? formData.brandValues.filter(v => v !== value)
                        : [...formData.brandValues, value];
                      handleInputChange('brandValues', newValues);
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      formData.brandValues.includes(value)
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <NeoInput
              label="Target Audience"
              placeholder="Describe your ideal customers and audience..."
              multiline
              rows={3}
              value={formData.targetAudience}
              onChange={(value) => handleInputChange('targetAudience', value)}
              variant="glass"
              required
            />

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Content Preferences</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Blog Posts', 'Social Media', 'Video Content', 'Infographics', 'Case Studies', 'Webinars', 'Podcasts', 'E-books', 'White Papers'].map((preference) => (
                  <button
                    key={preference}
                    onClick={() => {
                      const newPreferences = formData.contentPreferences.includes(preference)
                        ? formData.contentPreferences.filter(p => p !== preference)
                        : [...formData.contentPreferences, preference];
                      handleInputChange('contentPreferences', newPreferences);
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      formData.contentPreferences.includes(preference)
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {preference}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="neo-text-body text-white font-medium mb-3 block">Monthly Budget Range</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['$1K-5K', '$5K-10K', '$10K-25K', '$25K+'].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleInputChange('budgetRange', range)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      formData.budgetRange === range
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {range}
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
              <h2 className="neo-heading-2 neo-text-glow mb-2">Account Verification</h2>
              <p className="neo-text-body text-slate-300">Verify your account to get started</p>
            </div>

            <div className="space-y-4">
              <NeoCard variant="glass" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="neo-text-body text-white font-medium">Email Verification</h3>
                      <p className="neo-text-small text-slate-400">Verify your email address</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {formData.emailVerified ? (
                      <NeoBadge variant="success">Verified</NeoBadge>
                    ) : (
                      <NeoButton 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleVerification('email')}
                        loading={loading}
                      >
                        Verify
                      </NeoButton>
                    )}
                  </div>
                </div>
              </NeoCard>

              <NeoCard variant="glass" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="neo-text-body text-white font-medium">Phone Verification</h3>
                      <p className="neo-text-small text-slate-400">Verify your phone number</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {formData.phoneVerified ? (
                      <NeoBadge variant="success">Verified</NeoBadge>
                    ) : (
                      <NeoButton 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleVerification('phone')}
                        loading={loading}
                      >
                        Verify
                      </NeoButton>
                    )}
                  </div>
                </div>
              </NeoCard>

              {formData.budgetRange === '$25K+' && (
                <NeoCard variant="glass" className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="neo-text-body text-white font-medium">KYC Verification</h3>
                        <p className="neo-text-small text-slate-400">Required for high-value accounts</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {formData.kycCompleted ? (
                        <NeoBadge variant="success">Completed</NeoBadge>
                      ) : (
                        <NeoButton 
                          variant="accent" 
                          size="sm"
                          onClick={() => handleVerification('kyc')}
                          loading={loading}
                        >
                          Complete KYC
                        </NeoButton>
                      )}
                    </div>
                  </div>
                </NeoCard>
              )}
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
            <h1 className="neo-heading-2 neo-text-glow">Brand Account Setup</h1>
            <span className="neo-text-body text-slate-300">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <NeoProgress 
            value={(currentStep / steps.length) * 100} 
            color="blue" 
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

      {/* Verification Modal */}
      <NeoModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        title="Verification Required"
        size="md"
      >
        <div className="text-center space-y-4">
          <p className="neo-text-body text-slate-300">
            Please check your email for a verification link and follow the instructions to complete your account setup.
          </p>
          <NeoButton variant="primary" onClick={() => setShowVerificationModal(false)}>
            Got it
          </NeoButton>
        </div>
      </NeoModal>
    </div>
  );
}
