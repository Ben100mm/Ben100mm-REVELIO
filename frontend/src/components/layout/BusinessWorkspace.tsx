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
import CreatorSelectionInterface from '../business/CreatorSelectionInterface';
import AnalyticsDashboard from '../business/AnalyticsDashboard';
import ContentApprovalWorkflow from '../business/ContentApprovalWorkflow';

interface Business {
  id: string;
  name: string;
  description: string;
  logo: string;
  industry: string;
  status: string;
}

interface WorkspaceStats {
  totalCreators: number;
  activeCampaigns: number;
  pendingApprovals: number;
  totalBudget: number;
}

export default function BusinessWorkspace() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [stats, setStats] = useState<WorkspaceStats | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBusiness: Business = {
      id: '1',
      name: 'TechCorp Solutions',
      description: 'Leading technology solutions provider',
      logo: '/api/placeholder/100/100',
      industry: 'Technology',
      status: 'ACTIVE'
    };

    const mockStats: WorkspaceStats = {
      totalCreators: 45,
      activeCampaigns: 8,
      pendingApprovals: 12,
      totalBudget: 125000
    };

    setTimeout(() => {
      setBusiness(mockBusiness);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: 'dashboard', description: 'Dashboard overview with stats and quick actions' },
    { id: 'creators', label: 'Creator Selection', icon: 'people', description: 'AI matching & manual selection' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics', description: 'Real-time performance tracking' },
    { id: 'messages', label: 'Messages', icon: 'messages', description: '3 panels: Message lists, Conversation window, person details' },
    { id: 'approval', label: 'Content Approval', icon: 'approval', description: 'Review and feedback system' },
    { id: 'campaigns', label: 'Campaigns', icon: 'campaigns', description: 'Manage active campaigns' },
    { id: 'contracts', label: 'Contracts', icon: 'contracts', description: 'Contract management' },
    { id: 'settings', label: 'Settings', icon: 'settings', description: 'Workspace settings' }
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {business?.name?.charAt(0) || 'B'}
              </span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="neo-heading-4 text-white">{business?.name}</h2>
                <p className="neo-text-small text-slate-400">{business?.industry}</p>
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
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {item.icon === 'dashboard' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                )}
                {item.icon === 'people' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {item.icon === 'analytics' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
                {item.icon === 'approval' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {item.icon === 'campaigns' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {item.icon === 'contracts' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
        {/* Top App Bar */}
        <header className="bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="neo-heading-3 text-white">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Workspace'}
              </h1>
              <NeoBadge variant="info">
                {business?.status}
              </NeoBadge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <span className="neo-text-body text-slate-300">John Doe</span>
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
                    {stats?.totalCreators}
                  </div>
                  <div className="neo-text-body text-slate-300 mb-4">Total Creators</div>
                  <NeoProgress value={85} color="blue" variant="energy" />
                </NeoCard>
                
                <NeoCard variant="glass" className="p-6 text-center">
                  <div className="neo-heading-2 neo-text-holographic mb-2">
                    {stats?.activeCampaigns}
                  </div>
                  <div className="neo-text-body text-slate-300 mb-4">Active Campaigns</div>
                  <NeoProgress value={92} color="green" variant="crystal" />
                </NeoCard>
                
                <NeoCard variant="glass" className="p-6 text-center">
                  <div className="neo-heading-2 neo-text-holographic mb-2">
                    {stats?.pendingApprovals}
                  </div>
                  <div className="neo-text-body text-slate-300 mb-4">Pending Approvals</div>
                  <NeoProgress value={68} color="orange" variant="glow" />
                </NeoCard>
                
                <NeoCard variant="glass" className="p-6 text-center">
                  <div className="neo-heading-2 neo-text-holographic mb-2">
                    ${stats?.totalBudget?.toLocaleString()}
                  </div>
                  <div className="neo-text-body text-slate-300 mb-4">Total Budget</div>
                  <NeoProgress value={78} color="purple" variant="energy" />
                </NeoCard>
              </div>

              {/* Quick Actions */}
              <NeoCard variant="elevated" className="p-8">
                <h3 className="neo-heading-3 text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <NeoButton 
                    variant="primary" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab('creators')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Find Creators</span>
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
                    onClick={() => setActiveTab('approval')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Review Content</span>
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
            </div>
          )}

          {activeTab === 'creators' && <CreatorSelectionInterface />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
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
                          <span className="text-white text-sm font-bold">SJ</span>
                        </div>
                        <div className="flex-1">
                          <div className="neo-text-body text-white font-medium">Sarah Johnson</div>
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
                          <span className="text-white text-sm font-bold">MC</span>
                        </div>
                        <div className="flex-1">
                          <div className="neo-text-body text-white font-medium">Mike Chen</div>
                          <div className="neo-text-small text-slate-400">MacBook Air M3 Performance Test</div>
                        </div>
                        <div className="text-right">
                          <div className="neo-text-small text-slate-400">1h ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 neo-glass rounded-lg cursor-pointer hover:bg-slate-700/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">ER</span>
                        </div>
                        <div className="flex-1">
                          <div className="neo-text-body text-white font-medium">Emma Rodriguez</div>
                          <div className="neo-text-small text-slate-400">Lifestyle Brand Collaboration</div>
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
                    <h3 className="neo-heading-4 text-white">Sarah Johnson</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="neo-text-small text-slate-400">Online</span>
                    </div>
                  </div>
                  <div className="space-y-4 h-80 overflow-y-auto">
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                        <p className="neo-text-small">Hi Sarah! How's the iPhone 15 Pro review coming along?</p>
                        <span className="neo-text-small text-blue-200">2:30 PM</span>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-slate-700 text-white p-3 rounded-lg max-w-xs">
                        <p className="neo-text-small">Great! I've finished the unboxing and first impressions. Should have the full review ready by tomorrow.</p>
                        <span className="neo-text-small text-slate-400">2:32 PM</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                        <p className="neo-text-small">Perfect! Don't forget to highlight the A17 Pro chip performance.</p>
                        <span className="neo-text-small text-blue-200">2:33 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
                    />
                    <NeoButton variant="primary" size="sm">Send</NeoButton>
                  </div>
                </NeoCard>

                {/* Person Details Panel */}
                <NeoCard variant="glass" className="p-4">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl font-bold">SJ</span>
                    </div>
                    <h3 className="neo-heading-4 text-white">Sarah Johnson</h3>
                    <p className="neo-text-small text-slate-400">@sarahj_tech</p>
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
                      <h4 className="neo-text-body text-white font-medium mb-2">Performance</h4>
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
                        View Profile
                      </NeoButton>
                      <NeoButton variant="ghost" className="w-full">
                        View Campaign
                      </NeoButton>
                    </div>
                  </div>
                </NeoCard>
              </div>
            </div>
          )}
          {activeTab === 'approval' && <ContentApprovalWorkflow />}
          
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Campaign Management</h2>
              <NeoCard variant="glass" className="p-6">
                <p className="neo-text-body text-slate-300">Campaign management interface coming soon...</p>
              </NeoCard>
            </div>
          )}
          
          {activeTab === 'contracts' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Contract Management</h2>
              <NeoCard variant="glass" className="p-6">
                <p className="neo-text-body text-slate-300">Contract management interface coming soon...</p>
              </NeoCard>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="neo-heading-2 neo-text-glow">Workspace Settings</h2>
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
