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
    { id: 'overview', label: 'Overview', icon: '📊', description: 'Dashboard overview' },
    { id: 'creators', label: 'Creator Selection', icon: '👥', description: 'AI matching & manual selection' },
    { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Real-time performance tracking' },
    { id: 'approval', label: 'Content Approval', icon: '✅', description: 'Review and feedback system' },
    { id: 'campaigns', label: 'Campaigns', icon: '🎯', description: 'Manage active campaigns' },
    { id: 'contracts', label: 'Contracts', icon: '📋', description: 'Contract management' },
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'Workspace settings' }
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
                    <span className="text-2xl">👥</span>
                    <span>Find Creators</span>
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
                    onClick={() => setActiveTab('approval')}
                  >
                    <span className="text-2xl">✅</span>
                    <span>Review Content</span>
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
            </div>
          )}

          {activeTab === 'creators' && <CreatorSelectionInterface />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
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
