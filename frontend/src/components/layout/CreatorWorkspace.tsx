'use client';

import { useState, useEffect } from 'react';
import { 
  NeoCard, 
  NeoButton, 
  NeoGlass, 
  NeoBadge,
  NeoProgress,
  NeoModal,
  NeoInput
} from '@/components/neo-materialism';
import ContentCreationHub from '../creator/ContentCreationHub';
import PerformanceAnalytics from '../creator/PerformanceAnalytics';
import EarningsTracker from '../creator/EarningsTracker';
import CampaignManager from '../creator/CampaignManager';

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

interface WorkspaceStats {
  totalEarnings: number;
  activeCampaigns: number;
  contentPieces: number;
  totalViews: number;
  engagementRate: number;
  followerGrowth: number;
}

export default function CreatorWorkspace() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [stats, setStats] = useState<WorkspaceStats | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCreator: Creator = {
      id: '1',
      username: 'johndoe',
      displayName: 'John Doe',
      bio: 'Content creator specializing in tech reviews and tutorials',
      avatar: '/avatars/john-doe.jpg',
      isVerified: true,
      status: 'active',
      _count: {
        content: 25,
        campaigns: 8,
        earnings: 12500
      }
    };

    const mockStats: WorkspaceStats = {
      totalEarnings: 12500,
      activeCampaigns: 8,
      contentPieces: 25,
      totalViews: 450000,
      engagementRate: 8.5,
      followerGrowth: 12.5
    };

    setTimeout(() => {
      setCreator(mockCreator);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: 'dashboard', description: 'Dashboard overview with earnings and activity' },
    { id: 'opportunities', label: 'Opportunities', icon: 'opportunities', description: 'Browse briefs and apply to campaigns' },
    { id: 'content', label: 'Independent Content', icon: 'content', description: 'Create and manage your own content' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics', description: 'Performance insights and metrics' },
    { id: 'earnings', label: 'Earnings', icon: 'earnings', description: 'Track your income and payouts' },
    { id: 'payouts', label: 'Payouts', icon: 'payouts', description: 'Manage your payment methods' },
    { id: 'messages', label: 'Messages', icon: 'messages', description: '3 panels: Message lists, Conversation window, person details' },
    { id: 'campaigns', label: 'Campaigns', icon: 'campaigns', description: 'Manage active partnerships' },
    { id: 'audience', label: 'Audience', icon: 'audience', description: 'Follower insights' },
    { id: 'collaborations', label: 'Collaborations', icon: 'collaborations', description: 'Brand partnerships' },
    { id: 'settings', label: 'Settings', icon: 'settings', description: 'Account settings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-base font-normal text-white">Revelio</h2>
                <p className="neo-text-small text-slate-400">Creator Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {item.icon === 'dashboard' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                )}
                {item.icon === 'opportunities' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                )}
                {item.icon === 'content' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
                {item.icon === 'analytics' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
                {item.icon === 'earnings' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                )}
                {item.icon === 'payouts' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                )}
                {item.icon === 'campaigns' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {item.icon === 'audience' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {item.icon === 'collaborations' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
                {item.icon === 'messages' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )}
                {item.icon === 'settings' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="neo-text-body font-medium">{item.label}</div>
                  <div className="neo-text-small text-slate-400">{item.description}</div>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200"
          >
            <span className="text-xl">
              {sidebarCollapsed ? '→' : '←'}
            </span>
            {!sidebarCollapsed && <span className="ml-2 neo-text-small">Collapse</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Overview */}
              <div className="neo-grid-4 neo-spacing-lg">
                <NeoCard variant="glass" className="p-6 text-center">
                  <div className="neo-heading-2 neo-text-holographic mb-2">
                    ${stats?.totalEarnings?.toLocaleString()}
                  </div>
                  <div className="neo-text-body text-slate-300 mb-4">Total Earnings</div>
                  <NeoProgress value={85} color="green" variant="energy" />
                </NeoCard>
                
                <NeoCard variant="glass" className="p-6 text-center">
                  <div className="neo-heading-2 neo-text-holographic mb-2">
                    {stats?.contentPieces}
                  </div>
                  <div className="neo-text-body text-slate-300 mb-4">Content Pieces</div>
                  <NeoProgress value={92} color="blue" variant="crystal" />
                </NeoCard>
                
                <NeoCard variant="glass" className="p-6 text-center">
                  <div className="neo-heading-2 neo-text-holographic mb-2">
                    {stats?.totalViews?.toLocaleString()}
                  </div>
                  <div className="neo-text-body text-slate-300 mb-4">Total Views</div>
                  <NeoProgress value={78} color="purple" variant="glow" />
                </NeoCard>
                
                <NeoCard variant="glass" className="p-6 text-center">
                  <div className="neo-heading-2 neo-text-holographic mb-2">
                    {stats?.engagementRate}%
                  </div>
                  <div className="neo-text-body text-slate-300 mb-4">Engagement Rate</div>
                  <NeoProgress value={stats?.engagementRate || 0} color="orange" variant="energy" />
                </NeoCard>
              </div>

              {/* Quick Actions */}
              <NeoCard variant="elevated" className="p-8">
                <h3 className="neo-heading-3 text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <NeoButton 
                    variant="primary" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab('content')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Create Content</span>
                  </NeoButton>
                  <NeoButton 
                    variant="accent" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab('analytics')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>View Analytics</span>
                  </NeoButton>
                  <NeoButton 
                    variant="secondary" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab('earnings')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>Track Earnings</span>
                  </NeoButton>
                  <NeoButton 
                    variant="ghost" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab('campaigns')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Manage Campaigns</span>
                  </NeoButton>
                </div>
              </NeoCard>

              {/* Recent Activity */}
              <NeoCard variant="elevated" className="p-8">
                <h3 className="neo-heading-3 text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 neo-glass rounded-xl">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h4 className="neo-text-body text-white font-medium">iPhone 15 Pro Review</h4>
                        <p className="neo-text-small text-slate-400">Published 2 hours ago</p>
                      </div>
                    </div>
                    <NeoBadge variant="success">Published</NeoBadge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 neo-glass rounded-xl">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <div>
                        <h4 className="neo-text-body text-white font-medium">Payment Received</h4>
                        <p className="neo-text-small text-slate-400">$2,500 from TechCorp Campaign</p>
                      </div>
                    </div>
                    <NeoBadge variant="crystal">$2,500</NeoBadge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 neo-glass rounded-xl">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <div>
                        <h4 className="neo-text-body text-white font-medium">Analytics Update</h4>
                        <p className="neo-text-small text-slate-400">15K new views on latest video</p>
                      </div>
                    </div>
                    <NeoBadge variant="info">+15K</NeoBadge>
                  </div>
                </div>
              </NeoCard>
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Opportunities</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Available Briefs */}
                <NeoCard variant="glass" className="p-6">
                  <h3 className="neo-heading-4 text-white mb-4">Available Briefs</h3>
                  <div className="space-y-4">
                    <div className="p-4 neo-glass rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="neo-text-body text-white font-medium">Tech Review Campaign</h4>
                        <NeoBadge variant="success" size="sm">$5,000</NeoBadge>
                      </div>
                      <p className="neo-text-small text-slate-400 mb-2">TechCorp Solutions</p>
                      <p className="neo-text-small text-slate-300">Review the latest iPhone 15 Pro features and performance</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="neo-text-small text-slate-400">Deadline: 7 days</span>
                        <NeoButton variant="primary" size="sm">Apply</NeoButton>
                      </div>
                    </div>
                    
                    <div className="p-4 neo-glass rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="neo-text-body text-white font-medium">Lifestyle Partnership</h4>
                        <NeoBadge variant="warning" size="sm">$3,500</NeoBadge>
                      </div>
                      <p className="neo-text-small text-slate-400 mb-2">LifestyleBrand</p>
                      <p className="neo-text-small text-slate-300">Create content showcasing sustainable living products</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="neo-text-small text-slate-400">Deadline: 14 days</span>
                        <NeoButton variant="primary" size="sm">Apply</NeoButton>
                      </div>
                    </div>
                  </div>
                </NeoCard>

                {/* My Applications */}
                <NeoCard variant="glass" className="p-6">
                  <h3 className="neo-heading-4 text-white mb-4">My Applications</h3>
                  <div className="space-y-4">
                    <div className="p-4 neo-glass rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="neo-text-body text-white font-medium">Fitness App Review</h4>
                        <NeoBadge variant="info" size="sm">Pending</NeoBadge>
                      </div>
                      <p className="neo-text-small text-slate-400 mb-2">FitTech Inc.</p>
                      <p className="neo-text-small text-slate-300">Applied 2 days ago</p>
                    </div>
                    
                    <div className="p-4 neo-glass rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="neo-text-body text-white font-medium">Gaming Setup Tour</h4>
                        <NeoBadge variant="success" size="sm">Accepted</NeoBadge>
                      </div>
                      <p className="neo-text-small text-slate-400 mb-2">GameGear Co.</p>
                      <p className="neo-text-small text-slate-300">Contract signed, starting next week</p>
                    </div>
                  </div>
                </NeoCard>

                {/* Quick Stats */}
                <NeoCard variant="glass" className="p-6">
                  <h3 className="neo-heading-4 text-white mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="neo-text-small text-slate-300">Applications Sent</span>
                      <span className="neo-text-body text-white font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="neo-text-small text-slate-300">Acceptance Rate</span>
                      <span className="neo-text-body text-green-400 font-medium">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="neo-text-small text-slate-300">Avg. Response Time</span>
                      <span className="neo-text-body text-white font-medium">2.3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="neo-text-small text-slate-300">Total Earned</span>
                      <span className="neo-text-body text-green-400 font-medium">$8,500</span>
                    </div>
                  </div>
                </NeoCard>
              </div>
            </div>
          )}

          {activeTab === 'content' && <ContentCreationHub />}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Messages</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Message Lists Panel */}
                <NeoCard variant="glass" className="p-4">
                  <h3 className="neo-heading-4 text-white mb-4">Conversations</h3>
                  <div className="space-y-2">
                    <div className="p-3 neo-glass rounded-lg cursor-pointer hover:bg-slate-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">TC</span>
                        </div>
                        <div className="flex-1">
                          <div className="neo-text-body text-white font-medium">TechCorp Solutions</div>
                          <div className="neo-text-small text-slate-400">iPhone 15 Pro Review Campaign</div>
                        </div>
                        <div className="text-right">
                          <div className="neo-text-small text-slate-400">2m ago</div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 neo-glass rounded-lg cursor-pointer hover:bg-slate-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">LB</span>
                        </div>
                        <div className="flex-1">
                          <div className="neo-text-body text-white font-medium">LifestyleBrand</div>
                          <div className="neo-text-small text-slate-400">Partnership Opportunity</div>
                        </div>
                        <div className="text-right">
                          <div className="neo-text-small text-slate-400">1h ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 neo-glass rounded-lg cursor-pointer hover:bg-slate-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">AP</span>
                        </div>
                        <div className="flex-1">
                          <div className="neo-text-body text-white font-medium">Apple Inc.</div>
                          <div className="neo-text-small text-slate-400">MacBook Air M3 Performance Test</div>
                        </div>
                        <div className="text-right">
                          <div className="neo-text-small text-slate-400">3h ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NeoCard>

                {/* Conversation Window Panel */}
                <NeoCard variant="glass" className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="neo-heading-4 text-white">TechCorp Solutions</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="neo-text-small text-slate-400">Online</span>
                    </div>
                  </div>
                  <div className="space-y-4 h-80 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="bg-slate-700 text-white p-3 rounded-lg max-w-xs">
                        <p className="neo-text-small">Hi! I've finished the unboxing and first impressions. Should have the full review ready by tomorrow.</p>
                        <span className="neo-text-small text-slate-400">2:30 PM</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                        <p className="neo-text-small">Perfect! How's the iPhone 15 Pro review coming along?</p>
                        <span className="neo-text-small text-blue-200">2:32 PM</span>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-slate-700 text-white p-3 rounded-lg max-w-xs">
                        <p className="neo-text-small">Great! I've finished the unboxing and first impressions. Should have the full review ready by tomorrow.</p>
                        <span className="neo-text-small text-slate-400">2:33 PM</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                        <p className="neo-text-small">Excellent! Don't forget to highlight the A17 Pro chip performance.</p>
                        <span className="neo-text-small text-blue-200">2:34 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-purple-500"
                    />
                    <NeoButton variant="primary" size="sm">Send</NeoButton>
                  </div>
                </NeoCard>

                {/* Person Details Panel */}
                <NeoCard variant="glass" className="p-4">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl font-bold">TC</span>
                    </div>
                    <h3 className="neo-heading-4 text-white">TechCorp Solutions</h3>
                    <p className="neo-text-small text-slate-400">@techcorp_official</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="neo-text-small text-green-400">Online</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="neo-text-body text-white font-medium mb-2">Campaign Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="neo-text-small text-slate-400">Campaign:</span>
                          <span className="neo-text-small text-white">iPhone 15 Pro Review</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="neo-text-small text-slate-400">Budget:</span>
                          <span className="neo-text-small text-white">$5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="neo-text-small text-slate-400">Status:</span>
                          <NeoBadge variant="success" size="sm">Active</NeoBadge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="neo-text-body text-white font-medium mb-2">Your Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="neo-text-small text-slate-400">Content Delivered:</span>
                          <span className="neo-text-small text-white">2/4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="neo-text-small text-slate-400">Engagement Rate:</span>
                          <span className="neo-text-small text-white">8.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="neo-text-small text-slate-400">Total Views:</span>
                          <span className="neo-text-small text-white">125K</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                      <NeoButton variant="primary" className="w-full mb-2">
                        View Campaign
                      </NeoButton>
                      <NeoButton variant="ghost" className="w-full">
                        View Brand Profile
                      </NeoButton>
                    </div>
                  </div>
                </NeoCard>
              </div>
            </div>
          )}
          {activeTab === 'analytics' && <PerformanceAnalytics />}
          {activeTab === 'earnings' && <EarningsTracker />}
          
          {activeTab === 'payouts' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Payouts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payout Methods */}
                <NeoCard variant="glass" className="p-6">
                  <h3 className="neo-heading-4 text-white mb-4">Payout Methods</h3>
                  <div className="space-y-4">
                    <div className="p-4 neo-glass rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">Bank</span>
                          </div>
                          <div>
                            <h4 className="neo-text-body text-white font-medium">Bank Transfer</h4>
                            <p className="neo-text-small text-slate-400">****1234</p>
                          </div>
                        </div>
                        <NeoBadge variant="success" size="sm">Primary</NeoBadge>
                      </div>
                      <p className="neo-text-small text-slate-300">Next payout: $2,500 on Dec 15</p>
                    </div>
                    
                    <div className="p-4 neo-glass rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">Card</span>
                          </div>
                          <div>
                            <h4 className="neo-text-body text-white font-medium">PayPal</h4>
                            <p className="neo-text-small text-slate-400">john.doe@email.com</p>
                          </div>
                        </div>
                        <NeoBadge variant="info" size="sm">Backup</NeoBadge>
                      </div>
                      <p className="neo-text-small text-slate-300">Available for instant transfers</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <NeoButton variant="primary" className="w-full">
                      Add Payment Method
                    </NeoButton>
                  </div>
                </NeoCard>

                {/* Payout History */}
                <NeoCard variant="glass" className="p-6">
                  <h3 className="neo-heading-4 text-white mb-4">Recent Payouts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 neo-glass rounded-lg">
                      <div>
                        <h4 className="neo-text-body text-white font-medium">November Payout</h4>
                        <p className="neo-text-small text-slate-400">Nov 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <span className="neo-text-body text-green-400 font-medium">$2,500</span>
                        <p className="neo-text-small text-slate-400">Bank Transfer</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 neo-glass rounded-lg">
                      <div>
                        <h4 className="neo-text-body text-white font-medium">October Payout</h4>
                        <p className="neo-text-small text-slate-400">Oct 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <span className="neo-text-body text-green-400 font-medium">$1,800</span>
                        <p className="neo-text-small text-slate-400">Bank Transfer</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 neo-glass rounded-lg">
                      <div>
                        <h4 className="neo-text-body text-white font-medium">September Payout</h4>
                        <p className="neo-text-small text-slate-400">Sep 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <span className="neo-text-body text-green-400 font-medium">$3,200</span>
                        <p className="neo-text-small text-slate-400">PayPal</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <NeoButton variant="ghost" className="w-full">
                      View All Payouts
                    </NeoButton>
                  </div>
                </NeoCard>
              </div>

              {/* Payout Settings */}
              <NeoCard variant="glass" className="p-6">
                <h3 className="neo-heading-4 text-white mb-4">Payout Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="neo-form-label mb-2 block">Payout Frequency</label>
                    <select className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500">
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly" selected>Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="neo-form-label mb-2 block">Minimum Payout</label>
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="neo-form-label mb-2 block">Tax Settings</label>
                    <select className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500">
                      <option value="individual">Individual</option>
                      <option value="business">Business</option>
                      <option value="contractor">Contractor</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <NeoButton variant="primary">
                    Save Settings
                  </NeoButton>
                </div>
              </NeoCard>
            </div>
          )}
          {activeTab === 'campaigns' && <CampaignManager />}
          
          {activeTab === 'audience' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Audience Insights</h2>
              <NeoCard variant="glass" className="p-6">
                <p className="neo-text-body text-slate-300">Audience insights interface coming soon...</p>
              </NeoCard>
            </div>
          )}
          
          {activeTab === 'collaborations' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Brand Collaborations</h2>
              <NeoCard variant="glass" className="p-6">
                <p className="neo-text-body text-slate-300">Collaborations interface coming soon...</p>
              </NeoCard>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Account Settings</h2>
              <NeoCard variant="glass" className="p-6">
                <p className="neo-text-body text-slate-300">Settings interface coming soon...</p>
              </NeoCard>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
