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
    { id: 'overview', label: 'Overview', icon: '📊', description: 'Dashboard overview' },
    { id: 'content', label: 'Content Hub', icon: '🎬', description: 'Create and manage content' },
    { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Performance insights' },
    { id: 'earnings', label: 'Earnings', icon: '💰', description: 'Track your income' },
    { id: 'campaigns', label: 'Campaigns', icon: '🎯', description: 'Manage partnerships' },
    { id: 'audience', label: 'Audience', icon: '👥', description: 'Follower insights' },
    { id: 'collaborations', label: 'Collaborations', icon: '🤝', description: 'Brand partnerships' },
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'Account settings' }
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
              <span className="text-white font-bold text-lg">
                {creator?.displayName?.charAt(0) || 'C'}
              </span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="neo-heading-4 text-white">{creator?.displayName}</h2>
                <p className="neo-text-small text-slate-400">@{creator?.username}</p>
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
              <span className="text-xl">{item.icon}</span>
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
        {/* Top App Bar */}
        <header className="bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="neo-heading-3 text-white">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Workspace'}
              </h1>
              <NeoBadge variant="success">
                {creator?.isVerified ? 'Verified' : 'Unverified'}
              </NeoBadge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <span className="neo-text-body text-slate-300">{creator?.displayName}</span>
              </div>
              <NeoButton variant="ghost" size="sm">
                Settings
              </NeoButton>
            </div>
          </div>
        </header>

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
                    <span className="text-2xl">🎬</span>
                    <span>Create Content</span>
                  </NeoButton>
                  <NeoButton 
                    variant="accent" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab('analytics')}
                  >
                    <span className="text-2xl">📈</span>
                    <span>View Analytics</span>
                  </NeoButton>
                  <NeoButton 
                    variant="secondary" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab('earnings')}
                  >
                    <span className="text-2xl">💰</span>
                    <span>Track Earnings</span>
                  </NeoButton>
                  <NeoButton 
                    variant="ghost" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab('campaigns')}
                  >
                    <span className="text-2xl">🎯</span>
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
                      <span className="text-2xl">🎥</span>
                      <div>
                        <h4 className="neo-text-body text-white font-medium">iPhone 15 Pro Review</h4>
                        <p className="neo-text-small text-slate-400">Published 2 hours ago</p>
                      </div>
                    </div>
                    <NeoBadge variant="success">Published</NeoBadge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 neo-glass rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <h4 className="neo-text-body text-white font-medium">Payment Received</h4>
                        <p className="neo-text-small text-slate-400">$2,500 from TechCorp Campaign</p>
                      </div>
                    </div>
                    <NeoBadge variant="crystal">$2,500</NeoBadge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 neo-glass rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📈</span>
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

          {activeTab === 'content' && <ContentCreationHub />}
          {activeTab === 'analytics' && <PerformanceAnalytics />}
          {activeTab === 'earnings' && <EarningsTracker />}
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
