'use client';

import { useState, useEffect } from 'react';

interface Creator {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  status: string;
  _count: {
    content: number;
    campaigns: number;
    earnings: number;
  };
}

export default function CreatorDashboardSimple() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    setCreator({
      id: '1',
      username: 'testuser',
      displayName: 'Test User',
      bio: 'Test bio',
      avatar: '',
      isVerified: true,
      status: 'active',
      _count: {
        content: 10,
        campaigns: 5,
        earnings: 1000
      }
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Creator Profile Not Found</h2>
          <p className="text-gray-600">Please complete your creator profile setup.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <div className="card-glass backdrop-blur-2xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative">
                  <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-3d-lg">
                    <span className="text-white font-bold text-xl">
                      {creator.displayName.charAt(0)}
                    </span>
                  </div>
                  {creator.isVerified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="ml-6">
                  <h1 className="heading-4 text-slate-900">{creator.displayName}</h1>
                  <p className="text-slate-600 font-medium">@{creator.username}</p>
                  {creator.isVerified && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100/80 text-green-700 border border-green-200/50 shadow-3d-sm mt-2">
                      Verified Creator
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
