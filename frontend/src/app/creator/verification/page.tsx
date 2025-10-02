'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  NeoCard, 
  NeoButton, 
  NeoInput, 
  NeoGlass,
  NeoBadge,
  NeoProgress
} from '@/components/neo-materialism';

interface VerificationData {
  emailVerified: boolean;
  idVerified: boolean;
  socialVerified: boolean;
  trustScore: number;
  verificationCode: string;
  idDocument: File | null;
  socialHandles: {
    instagram: string;
    youtube: string;
    tiktok: string;
    twitter: string;
  };
}

export default function CreatorVerificationPage() {
  const [verificationData, setVerificationData] = useState<VerificationData>({
    emailVerified: false,
    idVerified: false,
    socialVerified: false,
    trustScore: 0,
    verificationCode: '',
    idDocument: null,
    socialHandles: {
      instagram: '',
      youtube: '',
      tiktok: '',
      twitter: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailCodeVerified, setEmailCodeVerified] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [socialConnected, setSocialConnected] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Calculate trust score based on verifications
    let score = 0;
    if (emailCodeVerified) score += 30;
    if (idUploaded) score += 40;
    if (socialConnected) score += 30;
    
    setVerificationData(prev => ({
      ...prev,
      trustScore: score
    }));
  }, [emailCodeVerified, idUploaded, socialConnected]);

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      // Simulate sending verification email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEmailCodeSent(true);
    } catch (error) {
      console.error('Failed to send verification email:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    setLoading(true);
    try {
      // Simulate code verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailCodeVerified(true);
      setVerificationData(prev => ({
        ...prev,
        emailVerified: true
      }));
    } catch (error) {
      console.error('Failed to verify email code:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVerificationData(prev => ({
        ...prev,
        idDocument: file
      }));
      setIdUploaded(true);
    }
  };

  const handleSocialConnect = (platform: string) => {
    setVerificationData(prev => ({
      ...prev,
      socialHandles: {
        ...prev.socialHandles,
        [platform]: `@${platform}_verified`
      }
    }));
    setSocialConnected(true);
  };

  const handleCompleteVerification = async () => {
    setLoading(true);
    try {
      // Simulate verification completion
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store verification status
      localStorage.setItem('creatorVerification', JSON.stringify({
        ...verificationData,
        completed: true,
        completedAt: new Date().toISOString()
      }));
      
      // Redirect to workspace selection
      router.push('/creator/workspace-selection');
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getTrustScoreLabel = (score: number) => {
    if (score >= 80) return 'High Trust';
    if (score >= 60) return 'Medium Trust';
    if (score >= 40) return 'Low Trust';
    return 'Very Low Trust';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="neo-glass p-6 mb-8">
        <div className="neo-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="neo-heading-2 text-white">Creator Verification</h1>
              <p className="neo-text-body text-slate-400">Build trust and unlock more opportunities</p>
            </div>
            <div className="text-right">
              <div className={`neo-heading-3 ${getTrustScoreColor(verificationData.trustScore)}`}>
                {verificationData.trustScore}%
              </div>
              <div className="neo-text-small text-slate-400">
                {getTrustScoreLabel(verificationData.trustScore)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="neo-container neo-section">
        {/* Trust Score Progress */}
        <div className="mb-8">
          <NeoCard variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="neo-heading-4 text-white">Trust Score Progress</h3>
              <NeoBadge variant={verificationData.trustScore >= 80 ? 'success' : 'info'}>
                {verificationData.trustScore}%
              </NeoBadge>
            </div>
            <NeoProgress 
              value={verificationData.trustScore} 
              color={verificationData.trustScore >= 80 ? 'green' : 'blue'} 
              variant="energy" 
            />
            <p className="neo-text-small text-slate-400 mt-2">
              Higher trust scores unlock more opportunities and better rates
            </p>
          </NeoCard>
        </div>

        {/* Verification Steps */}
        <div className="space-y-6">
          {/* Email Verification */}
          <NeoCard variant="elevated" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  emailCodeVerified ? 'bg-green-500' : 'bg-slate-700'
                }`}>
                  {emailCodeVerified ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-white text-sm font-medium">1</span>
                  )}
                </div>
                <div>
                  <h3 className="neo-heading-4 text-white">Email Verification</h3>
                  <p className="neo-text-small text-slate-400">Verify your email address</p>
                </div>
              </div>
              <NeoBadge variant={emailCodeVerified ? 'success' : 'info'}>
                {emailCodeVerified ? 'Verified' : 'Required'}
              </NeoBadge>
            </div>

            {!emailCodeSent ? (
              <div className="space-y-4">
                <p className="neo-text-body text-slate-300">
                  We'll send a verification code to your email address to confirm your identity.
                </p>
                <NeoButton
                  variant="primary"
                  onClick={handleEmailVerification}
                  loading={loading}
                >
                  Send Verification Code
                </NeoButton>
              </div>
            ) : !emailCodeVerified ? (
              <div className="space-y-4">
                <p className="neo-text-body text-slate-300">
                  Enter the 6-digit code sent to your email address.
                </p>
                <div className="flex space-x-4">
                  <NeoInput
                    placeholder="Enter code"
                    value={verificationData.verificationCode}
                    onChange={(value) => setVerificationData(prev => ({ ...prev, verificationCode: value }))}
                    variant="glass"
                    className="flex-1"
                  />
                  <NeoButton
                    variant="primary"
                    onClick={handleVerifyEmailCode}
                    loading={loading}
                    disabled={verificationData.verificationCode.length !== 6}
                  >
                    Verify
                  </NeoButton>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="neo-text-body">Email verified successfully!</span>
              </div>
            )}
          </NeoCard>

          {/* ID Verification */}
          <NeoCard variant="elevated" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  idUploaded ? 'bg-green-500' : 'bg-slate-700'
                }`}>
                  {idUploaded ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-white text-sm font-medium">2</span>
                  )}
                </div>
                <div>
                  <h3 className="neo-heading-4 text-white">ID Verification</h3>
                  <p className="neo-text-small text-slate-400">Upload a government-issued ID (Optional)</p>
                </div>
              </div>
              <NeoBadge variant={idUploaded ? 'success' : 'warning'}>
                {idUploaded ? 'Uploaded' : 'Optional'}
              </NeoBadge>
            </div>

            <div className="space-y-4">
              <p className="neo-text-body text-slate-300">
                Upload a clear photo of your government-issued ID to increase your trust score and unlock premium features.
              </p>
              
              <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-slate-500 transition-colors">
                <input
                  type="file"
                  id="id-upload"
                  accept="image/*"
                  onChange={handleIdUpload}
                  className="hidden"
                />
                <label htmlFor="id-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="neo-text-body text-slate-300 mb-2">
                    {idUploaded ? 'ID Document Uploaded' : 'Click to upload ID document'}
                  </p>
                  <p className="neo-text-small text-slate-400">
                    PNG, JPG, or PDF up to 10MB
                  </p>
                </label>
              </div>

              {idUploaded && (
                <div className="flex items-center space-x-2 text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="neo-text-body">ID document uploaded successfully!</span>
                </div>
              )}
            </div>
          </NeoCard>

          {/* Social Media Verification */}
          <NeoCard variant="elevated" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  socialConnected ? 'bg-green-500' : 'bg-slate-700'
                }`}>
                  {socialConnected ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-white text-sm font-medium">3</span>
                  )}
                </div>
                <div>
                  <h3 className="neo-heading-4 text-white">Social Media Verification</h3>
                  <p className="neo-text-small text-slate-400">Connect your social media accounts (Optional)</p>
                </div>
              </div>
              <NeoBadge variant={socialConnected ? 'success' : 'warning'}>
                {socialConnected ? 'Connected' : 'Optional'}
              </NeoBadge>
            </div>

            <div className="space-y-4">
              <p className="neo-text-body text-slate-300">
                Connect your social media accounts to verify your online presence and increase your trust score.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { platform: 'instagram', name: 'Instagram', icon: '📷', color: 'from-pink-500 to-purple-600' },
                  { platform: 'youtube', name: 'YouTube', icon: '📺', color: 'from-red-500 to-red-600' },
                  { platform: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-black to-gray-800' },
                  { platform: 'twitter', name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-600' }
                ].map((social) => (
                  <button
                    key={social.platform}
                    onClick={() => handleSocialConnect(social.platform)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      verificationData.socialHandles[social.platform as keyof typeof verificationData.socialHandles]
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{social.icon}</div>
                    <div className="neo-text-small font-medium">{social.name}</div>
                    {verificationData.socialHandles[social.platform as keyof typeof verificationData.socialHandles] && (
                      <div className="neo-text-small text-green-400 mt-1">Connected</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </NeoCard>
        </div>

        {/* Completion */}
        <div className="mt-8">
          <NeoCard variant="glass" className="p-6">
            <div className="text-center">
              <h3 className="neo-heading-3 text-white mb-4">Ready to Complete Verification?</h3>
              <p className="neo-text-body text-slate-300 mb-6">
                You can always add more verification methods later to increase your trust score.
              </p>
              
              <div className="flex justify-center space-x-4">
                <NeoButton
                  variant="ghost"
                  onClick={() => router.push('/creator/workspace-selection')}
                >
                  Skip for Now
                </NeoButton>
                <NeoButton
                  variant="primary"
                  onClick={handleCompleteVerification}
                  loading={loading}
                  disabled={verificationData.trustScore < 30}
                >
                  Complete Verification
                </NeoButton>
              </div>
            </div>
          </NeoCard>
        </div>
      </div>
    </div>
  );
}
