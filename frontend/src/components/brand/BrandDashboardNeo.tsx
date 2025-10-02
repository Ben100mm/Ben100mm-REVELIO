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

interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  industry: string;
  status: string;
}

interface Brief {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  applicationsCount: number;
  createdAt: string;
}

interface Contract {
  id: string;
  title: string;
  creatorName: string;
  totalAmount: number;
  status: string;
  progress: number;
  createdAt: string;
}

export default function BrandDashboardNeo() {
  const [activeTab, setActiveTab] = useState('overview');
  const [brand, setBrand] = useState<Brand | null>(null);
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [showCreateBrief, setShowCreateBrief] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBrand: Brand = {
      id: '1',
      name: 'TechCorp Solutions',
      description: 'Leading technology solutions provider',
      logo: '/api/placeholder/100/100',
      industry: 'Technology',
      status: 'ACTIVE'
    };

    const mockBriefs: Brief[] = [
      {
        id: '1',
        title: 'Tech Blog Series',
        description: 'Create engaging tech content for our blog',
        budget: 5000,
        status: 'PUBLISHED',
        applicationsCount: 12,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Social Media Campaign',
        description: 'LinkedIn and Twitter content strategy',
        budget: 3000,
        status: 'DRAFT',
        applicationsCount: 0,
        createdAt: '2024-01-20'
      }
    ];

    const mockContracts: Contract[] = [
      {
        id: '1',
        title: 'Q1 Content Strategy',
        creatorName: 'Sarah Johnson',
        totalAmount: 8000,
        status: 'ACTIVE',
        progress: 75,
        createdAt: '2024-01-10'
      },
      {
        id: '2',
        title: 'Product Launch Campaign',
        creatorName: 'Mike Chen',
        totalAmount: 12000,
        status: 'PENDING_SIGNATURE',
        progress: 0,
        createdAt: '2024-01-18'
      }
    ];

    setTimeout(() => {
      setBrand(mockBrand);
      setBriefs(mockBriefs);
      setContracts(mockContracts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateBrief = () => {
    setShowCreateBrief(true);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'briefs', label: 'Briefs', icon: '📝' },
    { id: 'contracts', label: 'Contracts', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="neo-container neo-section">
        {/* Header */}
        <section className="mb-8">
          <NeoCard variant="elevated" glow className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {brand?.name?.charAt(0) || 'B'}
                  </span>
                </div>
                <div>
                  <h1 className="neo-heading-2 neo-text-holographic">
                    {brand?.name || 'Brand Dashboard'}
                  </h1>
                  <p className="neo-text-body text-slate-300">
                    {brand?.industry} • {brand?.status}
                  </p>
                </div>
              </div>
              <NeoButton 
                variant="primary" 
                size="lg" 
                glow
                onClick={handleCreateBrief}
              >
                Create Brief
              </NeoButton>
            </div>
          </NeoCard>
        </section>

        {/* Navigation Tabs */}
        <section className="mb-8">
          <div className="neo-glass p-2 rounded-2xl">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <NeoButton
                  key={tab.id}
                  variant={activeTab === tab.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </NeoButton>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <section className="space-y-8">
            {/* Stats Cards */}
            <div className="neo-grid-3 neo-spacing-lg">
              <NeoCard variant="glass" className="text-center p-6">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  {briefs.length}
                </div>
                <div className="neo-text-body text-slate-300 mb-4">Active Briefs</div>
                <NeoProgress value={85} color="blue" variant="energy" />
              </NeoCard>
              
              <NeoCard variant="glass" className="text-center p-6">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  {contracts.length}
                </div>
                <div className="neo-text-body text-slate-300 mb-4">Active Contracts</div>
                <NeoProgress value={92} color="green" variant="crystal" />
              </NeoCard>
              
              <NeoCard variant="glass" className="text-center p-6">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  ${briefs.reduce((sum, brief) => sum + brief.budget, 0).toLocaleString()}
                </div>
                <div className="neo-text-body text-slate-300 mb-4">Total Budget</div>
                <NeoProgress value={78} color="purple" variant="glow" />
              </NeoCard>
            </div>

            {/* Recent Activity */}
            <NeoCard variant="elevated" className="p-8">
              <h3 className="neo-heading-3 text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {briefs.slice(0, 3).map((brief) => (
                  <div key={brief.id} className="flex items-center justify-between p-4 neo-glass rounded-xl">
                    <div>
                      <h4 className="neo-text-body text-white font-medium">{brief.title}</h4>
                      <p className="neo-text-small text-slate-400">{brief.applicationsCount} applications</p>
                    </div>
                    <NeoBadge variant={brief.status === 'PUBLISHED' ? 'success' : 'warning'}>
                      {brief.status}
                    </NeoBadge>
                  </div>
                ))}
              </div>
            </NeoCard>
          </section>
        )}

        {activeTab === 'briefs' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="neo-heading-2 neo-text-glow">Your Briefs</h2>
              <NeoButton variant="accent" onClick={handleCreateBrief}>
                + New Brief
              </NeoButton>
            </div>

            <div className="space-y-4">
              {briefs.map((brief) => (
                <NeoCard key={brief.id} variant="interactive" className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="neo-heading-4 text-white mb-2">{brief.title}</h3>
                      <p className="neo-text-body text-slate-300 mb-4">{brief.description}</p>
                      <div className="flex items-center space-x-4">
                        <NeoBadge variant="info">${brief.budget.toLocaleString()}</NeoBadge>
                        <NeoBadge variant="secondary">{brief.applicationsCount} applications</NeoBadge>
                        <span className="neo-text-small text-slate-400">
                          Created {new Date(brief.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <NeoBadge variant={brief.status === 'PUBLISHED' ? 'success' : 'warning'}>
                        {brief.status}
                      </NeoBadge>
                      <NeoButton variant="ghost" size="sm">
                        View
                      </NeoButton>
                    </div>
                  </div>
                </NeoCard>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'contracts' && (
          <section className="space-y-6">
            <h2 className="neo-heading-2 neo-text-glow">Active Contracts</h2>

            <div className="space-y-4">
              {contracts.map((contract) => (
                <NeoCard key={contract.id} variant="elevated" className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="neo-heading-4 text-white mb-2">{contract.title}</h3>
                      <p className="neo-text-body text-slate-300 mb-4">
                        Creator: {contract.creatorName}
                      </p>
                      <div className="flex items-center space-x-4 mb-4">
                        <NeoBadge variant="info">${contract.totalAmount.toLocaleString()}</NeoBadge>
                        <NeoBadge variant={contract.status === 'ACTIVE' ? 'success' : 'warning'}>
                          {contract.status.replace('_', ' ')}
                        </NeoBadge>
                      </div>
                      <NeoProgress 
                        value={contract.progress} 
                        color="green" 
                        variant="energy"
                        className="mb-2"
                      />
                      <span className="neo-text-small text-slate-400">
                        {contract.progress}% Complete
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <NeoButton variant="ghost" size="sm">
                        View Details
                      </NeoButton>
                    </div>
                  </div>
                </NeoCard>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'analytics' && (
          <section className="space-y-6">
            <h2 className="neo-heading-2 neo-text-glow">Performance Analytics</h2>
            
            <div className="neo-grid-2 neo-spacing-lg">
              <NeoCard variant="glass" className="p-6">
                <h3 className="neo-heading-4 text-white mb-4">Content Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">Total Views</span>
                    <span className="neo-text-body text-white font-medium">125K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">Engagement Rate</span>
                    <span className="neo-text-body text-white font-medium">8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">Click-through Rate</span>
                    <span className="neo-text-body text-white font-medium">3.2%</span>
                  </div>
                </div>
              </NeoCard>

              <NeoCard variant="glass" className="p-6">
                <h3 className="neo-heading-4 text-white mb-4">ROI Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">Total Investment</span>
                    <span className="neo-text-body text-white font-medium">$25K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">Revenue Generated</span>
                    <span className="neo-text-body text-white font-medium">$45K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">ROI</span>
                    <span className="neo-text-body text-green-400 font-medium">180%</span>
                  </div>
                </div>
              </NeoCard>
            </div>
          </section>
        )}

        {/* Create Brief Modal */}
        <NeoModal
          isOpen={showCreateBrief}
          onClose={() => setShowCreateBrief(false)}
          title="Create New Brief"
        >
          <div className="space-y-6">
            <NeoInput
              label="Brief Title"
              placeholder="Enter brief title..."
              variant="glass"
            />
            <NeoInput
              label="Description"
              placeholder="Describe your requirements..."
              variant="glass"
              multiline
              rows={4}
            />
            <NeoInput
              label="Budget"
              placeholder="Enter budget amount"
              variant="glass"
              type="number"
            />
            <div className="flex space-x-4">
              <NeoButton variant="primary" className="flex-1">
                Create Brief
              </NeoButton>
              <NeoButton variant="ghost" onClick={() => setShowCreateBrief(false)}>
                Cancel
              </NeoButton>
            </div>
          </div>
        </NeoModal>
      </div>
    </div>
  );
}
