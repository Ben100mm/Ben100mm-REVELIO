'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/services/api';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CREATOR',
    creatorData: {
      username: '',
      displayName: '',
      bio: '',
      website: '',
      location: '',
    },
    brandData: {
      name: '',
      description: '',
      website: '',
      industry: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await authAPI.register(submitData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect based on user role
      if (user.role === 'CREATOR') {
        router.push('/creator/dashboard');
      } else if (user.role === 'BRAND') {
        router.push('/brand/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('creatorData.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        creatorData: {
          ...formData.creatorData,
          [field]: value,
        },
      });
    } else if (name.startsWith('brandData.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        brandData: {
          ...formData.brandData,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join Revelio
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start your journey as a creator or brand
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field mt-1"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="input-field mt-1"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="input-field mt-1"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  className="input-field mt-1"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="CREATOR">Creator</option>
                  <option value="BRAND">Brand</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {formData.role === 'CREATOR' ? (
                <>
                  <h3 className="text-lg font-medium text-gray-900">Creator Profile</h3>
                  
                  <div>
                    <label htmlFor="creatorData.username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      id="creatorData.username"
                      name="creatorData.username"
                      type="text"
                      required
                      className="input-field mt-1"
                      placeholder="Choose a username"
                      value={formData.creatorData.username}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="creatorData.displayName" className="block text-sm font-medium text-gray-700">
                      Display Name
                    </label>
                    <input
                      id="creatorData.displayName"
                      name="creatorData.displayName"
                      type="text"
                      required
                      className="input-field mt-1"
                      placeholder="Your display name"
                      value={formData.creatorData.displayName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="creatorData.bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      id="creatorData.bio"
                      name="creatorData.bio"
                      rows={3}
                      className="input-field mt-1"
                      placeholder="Tell us about yourself"
                      value={formData.creatorData.bio}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="creatorData.website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      id="creatorData.website"
                      name="creatorData.website"
                      type="url"
                      className="input-field mt-1"
                      placeholder="https://yourwebsite.com"
                      value={formData.creatorData.website}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="creatorData.location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      id="creatorData.location"
                      name="creatorData.location"
                      type="text"
                      className="input-field mt-1"
                      placeholder="City, Country"
                      value={formData.creatorData.location}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900">Brand Profile</h3>
                  
                  <div>
                    <label htmlFor="brandData.name" className="block text-sm font-medium text-gray-700">
                      Brand Name
                    </label>
                    <input
                      id="brandData.name"
                      name="brandData.name"
                      type="text"
                      required
                      className="input-field mt-1"
                      placeholder="Your brand name"
                      value={formData.brandData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="brandData.description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="brandData.description"
                      name="brandData.description"
                      rows={3}
                      className="input-field mt-1"
                      placeholder="Describe your brand"
                      value={formData.brandData.description}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="brandData.website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      id="brandData.website"
                      name="brandData.website"
                      type="url"
                      className="input-field mt-1"
                      placeholder="https://yourbrand.com"
                      value={formData.brandData.website}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="brandData.industry" className="block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <input
                      id="brandData.industry"
                      name="brandData.industry"
                      type="text"
                      className="input-field mt-1"
                      placeholder="Technology, Finance, Health, etc."
                      value={formData.brandData.industry}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center py-2 px-4"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
