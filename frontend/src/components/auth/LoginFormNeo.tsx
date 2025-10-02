'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  NeoCard, 
  NeoButton, 
  NeoInput, 
  NeoGlass,
  NeoBadge 
} from '@/components/neo-materialism';

export default function LoginFormNeo() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine user type based on email
      let userRole = 'CREATOR';
      let userName = 'John Doe';
      let redirectPath = '/creator/dashboard';

      if (formData.email === 'brand@revelio.com') {
        userRole = 'BRAND';
        userName = 'TechCorp Solutions';
        redirectPath = '/brand/dashboard';
      } else if (formData.email === 'demo@revelio.com') {
        userRole = 'CREATOR';
        userName = 'Demo Creator';
        redirectPath = '/creator/dashboard';
      }
      
      // Mock successful login
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        email: formData.email,
        role: userRole,
        name: userName
      }));
      
      router.push(redirectPath);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password });
    // Auto-submit after setting credentials
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 -mt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-5"></div>
      
      {/* Login Card */}
      <NeoCard variant="elevated" glow className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="neo-heading-2 neo-text-holographic mb-2">
            Welcome Back
          </h1>
          <p className="neo-text-body text-slate-400">
            Sign in to your Revelio account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="neo-form-layout">
          <NeoInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            variant="glass"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />

          <NeoInput
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            variant="glass"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            iconPosition="right"
            error={error}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="neo-text-small text-slate-300">Remember me</span>
            </label>
            
            <button
              type="button"
              className="neo-text-small text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <NeoButton
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            fullWidth
            className="neo-touch-target"
          >
            Sign In
          </NeoButton>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <NeoButton variant="secondary" size="md">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </NeoButton>
            
            <NeoButton variant="secondary" size="md">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </NeoButton>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="neo-text-small text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                onClick={() => router.push('/auth/register')}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>

        {/* Demo Credentials */}
        <NeoGlass variant="tinted" className="mt-6 p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h4 className="neo-text-small font-semibold text-white mb-2">Demo Credentials</h4>
              <p className="neo-text-small text-slate-300 mb-3">
                Use these credentials to explore different workspaces:
              </p>
              
              {/* Creator Demo */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="neo-text-small font-medium text-white">Creator Workspace</span>
                  </div>
                  <NeoButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDemoLogin('demo@revelio.com', 'demo123')}
                    className="text-xs px-2 py-1"
                  >
                    Try Demo
                  </NeoButton>
                </div>
                <div className="space-y-1 ml-8">
                  <NeoBadge variant="info" size="sm">Email: demo@revelio.com</NeoBadge>
                  <NeoBadge variant="info" size="sm">Password: demo123</NeoBadge>
                </div>
              </div>

              {/* Brand Demo */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="neo-text-small font-medium text-white">Brand Workspace</span>
                  </div>
                  <NeoButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDemoLogin('brand@revelio.com', 'demo123')}
                    className="text-xs px-2 py-1"
                  >
                    Try Demo
                  </NeoButton>
                </div>
                <div className="space-y-1 ml-8">
                  <NeoBadge variant="accent" size="sm">Email: brand@revelio.com</NeoBadge>
                  <NeoBadge variant="accent" size="sm">Password: demo123</NeoBadge>
                </div>
              </div>
            </div>
          </div>
        </NeoGlass>
      </NeoCard>
    </div>
  );
}
