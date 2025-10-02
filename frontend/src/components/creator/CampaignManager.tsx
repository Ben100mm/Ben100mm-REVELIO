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

interface Campaign {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  type: 'sponsored' | 'affiliate' | 'partnership' | 'collaboration';
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  budget: number;
  paidAmount: number;
  startDate: string;
  endDate: string;
  deliverables: string[];
  requirements: string[];
  content: {
    id: string;
    title: string;
    status: 'draft' | 'submitted' | 'approved' | 'published';
    dueDate: string;
  }[];
  metrics: {
    views: number;
    engagement: number;
    clicks: number;
    conversions: number;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalEarnings: number;
  averageCampaignValue: number;
  successRate: number;
}

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stats, setStats] = useState<CampaignStats | null>(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        title: 'iPhone 15 Pro Review Campaign',
        brand: 'TechCorp Solutions',
        brandLogo: '/logos/techcorp.png',
        type: 'sponsored',
        status: 'active',
        budget: 5000,
        paidAmount: 2500,
        startDate: '2024-01-15T00:00:00Z',
        endDate: '2024-02-15T00:00:00Z',
        deliverables: [
          '1 unboxing video (5-8 minutes)',
          '1 detailed review article (1000+ words)',
          '3 social media posts',
          '1 Instagram story series'
        ],
        requirements: [
          'Mention key features: A17 Pro chip, titanium design',
          'Include call-to-action for pre-orders',
          'Use brand hashtags: #TechCorp #iPhone15Pro',
          'Tag @techcorp in all posts'
        ],
        content: [
          {
            id: '1',
            title: 'iPhone 15 Pro Unboxing Video',
            status: 'published',
            dueDate: '2024-01-20T18:00:00Z'
          },
          {
            id: '2',
            title: 'Detailed Review Article',
            status: 'submitted',
            dueDate: '2024-01-25T18:00:00Z'
          },
          {
            id: '3',
            title: 'Social Media Posts',
            status: 'draft',
            dueDate: '2024-01-30T18:00:00Z'
          }
        ],
        metrics: {
          views: 125000,
          engagement: 8500,
          clicks: 2100,
          conversions: 45
        },
        contact: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@techcorp.com',
          phone: '+1-555-0123'
        }
      },
      {
        id: '2',
        title: 'MacBook Air M3 Performance Test',
        brand: 'Apple Inc.',
        brandLogo: '/logos/apple.png',
        type: 'partnership',
        status: 'pending',
        budget: 3000,
        paidAmount: 0,
        startDate: '2024-02-01T00:00:00Z',
        endDate: '2024-03-01T00:00:00Z',
        deliverables: [
          '1 performance benchmark video',
          '1 comparison article',
          '2 Instagram posts'
        ],
        requirements: [
          'Focus on M3 chip performance',
          'Compare with previous generation',
          'Include real-world usage scenarios'
        ],
        content: [],
        metrics: {
          views: 0,
          engagement: 0,
          clicks: 0,
          conversions: 0
        },
        contact: {
          name: 'Mike Chen',
          email: 'mike.chen@apple.com',
          phone: '+1-555-0456'
        }
      },
      {
        id: '3',
        title: 'Lifestyle Brand Collaboration',
        brand: 'LifestyleBrand',
        brandLogo: '/logos/lifestyle.png',
        type: 'collaboration',
        status: 'completed',
        budget: 2000,
        paidAmount: 2000,
        startDate: '2023-12-01T00:00:00Z',
        endDate: '2023-12-31T00:00:00Z',
        deliverables: [
          '1 lifestyle video',
          '5 Instagram posts',
          '2 Instagram stories'
        ],
        requirements: [
          'Showcase brand products naturally',
          'Use brand aesthetic',
          'Include discount code'
        ],
        content: [
          {
            id: '1',
            title: 'Lifestyle Video',
            status: 'published',
            dueDate: '2023-12-15T18:00:00Z'
          },
          {
            id: '2',
            title: 'Instagram Posts',
            status: 'published',
            dueDate: '2023-12-20T18:00:00Z'
          }
        ],
        metrics: {
          views: 75000,
          engagement: 5200,
          clicks: 1200,
          conversions: 28
        },
        contact: {
          name: 'Emma Rodriguez',
          email: 'emma.rodriguez@lifestylebrand.com',
          phone: '+1-555-0789'
        }
      }
    ];

    const mockStats: CampaignStats = {
      totalCampaigns: 12,
      activeCampaigns: 3,
      completedCampaigns: 8,
      totalEarnings: 25000,
      averageCampaignValue: 2083,
      successRate: 92
    };

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setFilteredCampaigns(mockCampaigns);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilter = (filterType: string) => {
    setFilter(filterType);
    if (filterType === 'all') {
      setFilteredCampaigns(campaigns);
    } else {
      setFilteredCampaigns(campaigns.filter(campaign => campaign.status === filterType));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sponsored': return '💰';
      case 'affiliate': return '🔗';
      case 'partnership': return '🤝';
      case 'collaboration': return '🎨';
      default: return '💰';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="neo-heading-2 neo-text-glow">Campaign Manager</h2>
          <p className="neo-text-body text-slate-300">Manage your brand partnerships and campaigns</p>
        </div>
        <div className="flex items-center space-x-4">
          <NeoButton variant="accent">
            📊 Analytics
          </NeoButton>
          <NeoButton variant="primary" onClick={() => setShowCreateModal(true)}>
            + New Campaign
          </NeoButton>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {stats?.totalCampaigns}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Campaigns</div>
          <NeoProgress value={85} color="blue" variant="energy" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {stats?.activeCampaigns}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Active</div>
          <NeoProgress value={92} color="green" variant="crystal" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatCurrency(stats?.totalEarnings || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Earnings</div>
          <NeoProgress value={78} color="purple" variant="glow" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {stats?.successRate}%
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Success Rate</div>
          <NeoProgress value={stats?.successRate || 0} color="orange" variant="energy" />
        </NeoCard>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {[
          { id: 'all', label: 'All', count: campaigns.length },
          { id: 'active', label: 'Active', count: campaigns.filter(c => c.status === 'active').length },
          { id: 'pending', label: 'Pending', count: campaigns.filter(c => c.status === 'pending').length },
          { id: 'completed', label: 'Completed', count: campaigns.filter(c => c.status === 'completed').length },
          { id: 'cancelled', label: 'Cancelled', count: campaigns.filter(c => c.status === 'cancelled').length }
        ].map((tab) => (
          <NeoButton
            key={tab.id}
            variant={filter === tab.id ? 'primary' : 'ghost'}
            onClick={() => handleFilter(tab.id)}
            className="flex items-center space-x-2"
          >
            <span>{tab.label}</span>
            <NeoBadge variant="secondary" size="sm">{tab.count}</NeoBadge>
          </NeoButton>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <NeoCard key={campaign.id} variant="interactive" className="p-6">
            <div className="flex items-start space-x-4">
              {/* Brand Logo */}
              <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{getTypeIcon(campaign.type)}</span>
              </div>

              {/* Campaign Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="neo-heading-4 text-white mb-1">{campaign.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>{campaign.brand}</span>
                      <span>•</span>
                      <span>{campaign.type}</span>
                      <span>•</span>
                      <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <NeoBadge variant={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </NeoBadge>
                    <NeoButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setShowCampaignModal(true);
                      }}
                    >
                      View Details
                    </NeoButton>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="neo-text-small text-slate-400">Budget</div>
                    <div className="neo-text-body text-white font-medium">
                      {formatCurrency(campaign.budget)}
                    </div>
                  </div>
                  <div>
                    <div className="neo-text-small text-slate-400">Paid</div>
                    <div className="neo-text-body text-green-400 font-medium">
                      {formatCurrency(campaign.paidAmount)}
                    </div>
                  </div>
                  <div>
                    <div className="neo-text-small text-slate-400">Progress</div>
                    <div className="neo-text-body text-white font-medium">
                      {Math.round((campaign.paidAmount / campaign.budget) * 100)}%
                    </div>
                  </div>
                  <div>
                    <div className="neo-text-small text-slate-400">Content</div>
                    <div className="neo-text-body text-white font-medium">
                      {campaign.content.length} pieces
                    </div>
                  </div>
                </div>

                {campaign.metrics.views > 0 && (
                  <div className="flex space-x-6 text-sm text-slate-400">
                    <span>{campaign.metrics.views.toLocaleString()} views</span>
                    <span>{campaign.metrics.engagement.toLocaleString()} engagement</span>
                    <span>{campaign.metrics.clicks.toLocaleString()} clicks</span>
                    <span>{campaign.metrics.conversions} conversions</span>
                  </div>
                )}
              </div>
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Campaign Details Modal */}
      <NeoModal
        isOpen={showCampaignModal}
        onClose={() => setShowCampaignModal(false)}
        title={selectedCampaign?.title || 'Campaign Details'}
      >
        {selectedCampaign && (
          <div className="space-y-6">
            {/* Campaign Overview */}
            <div className="neo-glass p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{getTypeIcon(selectedCampaign.type)}</span>
                <div>
                  <h4 className="neo-text-body text-white font-medium">{selectedCampaign.brand}</h4>
                  <p className="neo-text-small text-slate-400">{selectedCampaign.type}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Budget:</span>
                  <span className="text-white ml-2">{formatCurrency(selectedCampaign.budget)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Paid:</span>
                  <span className="text-green-400 ml-2">{formatCurrency(selectedCampaign.paidAmount)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Start:</span>
                  <span className="text-white ml-2">{new Date(selectedCampaign.startDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-slate-400">End:</span>
                  <span className="text-white ml-2">{new Date(selectedCampaign.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="neo-text-body text-white font-medium mb-3">Deliverables</h4>
              <ul className="space-y-2">
                {selectedCampaign.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="neo-text-small text-slate-300">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="neo-text-body text-white font-medium mb-3">Requirements</h4>
              <ul className="space-y-2">
                {selectedCampaign.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="neo-text-small text-slate-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Progress */}
            <div>
              <h4 className="neo-text-body text-white font-medium mb-3">Content Progress</h4>
              <div className="space-y-3">
                {selectedCampaign.content.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-3 neo-glass rounded-lg">
                    <div>
                      <div className="neo-text-small text-white font-medium">{content.title}</div>
                      <div className="neo-text-small text-slate-400">
                        Due: {new Date(content.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <NeoBadge variant={getStatusColor(content.status)}>
                      {content.status}
                    </NeoBadge>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="neo-text-body text-white font-medium mb-3">Contact Information</h4>
              <div className="neo-glass p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="neo-text-small text-slate-400">Name:</span>
                    <span className="neo-text-small text-white">{selectedCampaign.contact.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-small text-slate-400">Email:</span>
                    <span className="neo-text-small text-white">{selectedCampaign.contact.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-small text-slate-400">Phone:</span>
                    <span className="neo-text-small text-white">{selectedCampaign.contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <NeoButton variant="primary" className="flex-1">
                Contact Brand
              </NeoButton>
              <NeoButton variant="secondary" className="flex-1">
                View Analytics
              </NeoButton>
            </div>
          </div>
        )}
      </NeoModal>

      {/* Create Campaign Modal */}
      <NeoModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Campaign"
      >
        <div className="space-y-6">
          <NeoInput
            label="Campaign Title"
            placeholder="Enter campaign title..."
            variant="glass"
          />
          <NeoInput
            label="Brand Name"
            placeholder="Enter brand name..."
            variant="glass"
          />
          <div className="grid grid-cols-2 gap-4">
            <NeoInput
              label="Budget"
              placeholder="Enter budget amount"
              variant="glass"
              type="number"
            />
            <select className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600">
              <option>Sponsored</option>
              <option>Affiliate</option>
              <option>Partnership</option>
              <option>Collaboration</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NeoInput
              label="Start Date"
              placeholder="Select start date"
              variant="glass"
              type="date"
            />
            <NeoInput
              label="End Date"
              placeholder="Select end date"
              variant="glass"
              type="date"
            />
          </div>
          <NeoInput
            label="Description"
            placeholder="Describe the campaign..."
            variant="glass"
            multiline
            rows={3}
          />
          <div className="flex space-x-4">
            <NeoButton variant="primary" className="flex-1">
              Create Campaign
            </NeoButton>
            <NeoButton variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </NeoButton>
          </div>
        </div>
      </NeoModal>
    </div>
  );
}
