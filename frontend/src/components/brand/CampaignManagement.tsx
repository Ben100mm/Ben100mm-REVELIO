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
  description: string;
  budget: number;
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  startDate: string | null;
  endDate: string | null;
  requirements: any;
  brand: {
    id: string;
    name: string;
    logo: string;
  };
  creator: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isVerified: boolean;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface CampaignPerformance {
  totalViews: number;
  totalClicks: number;
  totalShares: number;
  totalComments: number;
  totalLikes: number;
  totalRevenue: number;
  performance: Array<{
    id: string;
    date: string;
    views: number;
    clicks: number;
    shares: number;
    comments: number;
    likes: number;
    revenue: number;
    content: {
      id: string;
      title: string;
      type: string;
      creator: {
        username: string;
        displayName: string;
      };
    };
  }>;
}

export default function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignPerformance, setCampaignPerformance] = useState<CampaignPerformance | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form state for create/edit
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    creatorId: '',
    startDate: '',
    endDate: '',
    requirements: {
      contentType: '',
      platforms: [] as string[],
      deliverables: '',
      timeline: '',
      guidelines: ''
    }
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        title: 'Tech Blog Series',
        description: 'Create engaging tech content for our blog covering AI trends and innovations',
        budget: 5000,
        status: 'ACTIVE',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        requirements: {
          contentType: 'blog',
          platforms: ['linkedin', 'twitter'],
          deliverables: '4 blog posts, 8 social media posts',
          timeline: '2 months',
          guidelines: 'Professional tone, include technical details'
        },
        brand: {
          id: '1',
          name: 'TechCorp Solutions',
          logo: '/api/placeholder/100/100'
        },
        creator: {
          id: '1',
          username: 'sarah_tech',
          displayName: 'Sarah Johnson',
          avatar: '/api/placeholder/50/50',
          isVerified: true
        },
        createdAt: '2024-01-10',
        updatedAt: '2024-01-20'
      },
      {
        id: '2',
        title: 'Social Media Campaign',
        description: 'LinkedIn and Twitter content strategy for product launch',
        budget: 3000,
        status: 'DRAFT',
        startDate: null,
        endDate: null,
        requirements: {
          contentType: 'social',
          platforms: ['linkedin', 'twitter', 'instagram'],
          deliverables: '20 social posts, 5 stories',
          timeline: '1 month',
          guidelines: 'Engaging visuals, brand colors'
        },
        brand: {
          id: '1',
          name: 'TechCorp Solutions',
          logo: '/api/placeholder/100/100'
        },
        creator: null,
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20'
      },
      {
        id: '3',
        title: 'Product Review Series',
        description: 'Comprehensive product reviews for our latest software release',
        budget: 8000,
        status: 'COMPLETED',
        startDate: '2023-12-01',
        endDate: '2024-01-31',
        requirements: {
          contentType: 'video',
          platforms: ['youtube', 'linkedin'],
          deliverables: '3 video reviews, 6 social posts',
          timeline: '2 months',
          guidelines: 'Honest reviews, highlight key features'
        },
        brand: {
          id: '1',
          name: 'TechCorp Solutions',
          logo: '/api/placeholder/100/100'
        },
        creator: {
          id: '2',
          username: 'mike_tech',
          displayName: 'Mike Chen',
          avatar: '/api/placeholder/50/50',
          isVerified: true
        },
        createdAt: '2023-11-25',
        updatedAt: '2024-01-31'
      }
    ];

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'DRAFT': return 'warning';
      case 'PAUSED': return 'info';
      case 'COMPLETED': return 'secondary';
      case 'CANCELLED': return 'error';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '▶';
      case 'DRAFT': return '📝';
      case 'PAUSED': return '⏸';
      case 'COMPLETED': return '✓';
      case 'CANCELLED': return '✗';
      default: return '📄';
    }
  };

  const handleCreateCampaign = () => {
    setFormData({
      title: '',
      description: '',
      budget: '',
      creatorId: '',
      startDate: '',
      endDate: '',
      requirements: {
        contentType: '',
        platforms: [],
        deliverables: '',
        timeline: '',
        guidelines: ''
      }
    });
    setShowCreateModal(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      budget: campaign.budget.toString(),
      creatorId: campaign.creator?.id || '',
      startDate: campaign.startDate || '',
      endDate: campaign.endDate || '',
      requirements: campaign.requirements
    });
    setShowEditModal(true);
  };

  const handleViewPerformance = async (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    
    // Mock performance data - replace with actual API call
    const mockPerformance: CampaignPerformance = {
      totalViews: 125000,
      totalClicks: 3500,
      totalShares: 850,
      totalComments: 420,
      totalLikes: 2100,
      totalRevenue: 8750,
      performance: [
        {
          id: '1',
          date: '2024-01-15',
          views: 15000,
          clicks: 450,
          shares: 120,
          comments: 65,
          likes: 320,
          revenue: 1050,
          content: {
            id: '1',
            title: 'AI Trends in 2024',
            type: 'blog',
            creator: {
              username: 'sarah_tech',
              displayName: 'Sarah Johnson'
            }
          }
        },
        {
          id: '2',
          date: '2024-01-20',
          views: 22000,
          clicks: 680,
          shares: 180,
          comments: 95,
          likes: 480,
          revenue: 1560,
          content: {
            id: '2',
            title: 'Machine Learning Best Practices',
            type: 'blog',
            creator: {
              username: 'sarah_tech',
              displayName: 'Sarah Johnson'
            }
          }
        }
      ]
    };
    
    setCampaignPerformance(mockPerformance);
    setShowPerformanceModal(true);
  };

  const handleSaveCampaign = () => {
    // TODO: Implement API call to save campaign
    console.log('Saving campaign:', formData);
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      // TODO: Implement API call to delete campaign
      console.log('Deleting campaign:', campaignId);
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
    }
  };

  const handleStatusChange = (campaignId: string, newStatus: string) => {
    // TODO: Implement API call to update status
    setCampaigns(campaigns.map(c => 
      c.id === campaignId ? { ...c, status: newStatus as any } : c
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
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
          <h2 className="neo-heading-2 neo-text-glow">Campaign Management</h2>
          <p className="neo-text-body text-slate-300 mt-1">
            Create, manage, and track your marketing campaigns
          </p>
        </div>
        <NeoButton 
          variant="primary" 
          size="lg" 
          glow
          onClick={handleCreateCampaign}
        >
          + Create Campaign
        </NeoButton>
      </div>

      {/* Filters and Search */}
      <NeoCard variant="glass" className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <NeoInput
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="glass"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </NeoCard>

      {/* Campaign Stats */}
      <div className="neo-grid-4 neo-spacing-lg">
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {campaigns.length}
          </div>
          <div className="neo-text-body text-slate-300">Total Campaigns</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {campaigns.filter(c => c.status === 'ACTIVE').length}
          </div>
          <div className="neo-text-body text-slate-300">Active</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            ${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
          </div>
          <div className="neo-text-body text-slate-300">Total Budget</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {campaigns.filter(c => c.creator).length}
          </div>
          <div className="neo-text-body text-slate-300">With Creators</div>
        </NeoCard>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <NeoCard key={campaign.id} variant="interactive" className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="neo-heading-4 text-white">{campaign.title}</h3>
                  <NeoBadge variant={getStatusColor(campaign.status)}>
                    {getStatusIcon(campaign.status)} {campaign.status}
                  </NeoBadge>
                </div>
                
                <p className="neo-text-body text-slate-300 mb-4">{campaign.description}</p>
                
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="neo-text-small text-slate-400">Budget:</span>
                    <span className="neo-text-body text-white font-medium">
                      ${campaign.budget.toLocaleString()}
                    </span>
                  </div>
                  
                  {campaign.creator && (
                    <div className="flex items-center space-x-2">
                      <span className="neo-text-small text-slate-400">Creator:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {campaign.creator.displayName.charAt(0)}
                          </span>
                        </div>
                        <span className="neo-text-body text-white">
                          {campaign.creator.displayName}
                        </span>
                        {campaign.creator.isVerified && (
                          <span className="text-blue-400">✓</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {campaign.startDate && (
                    <div className="flex items-center space-x-2">
                      <span className="neo-text-small text-slate-400">Duration:</span>
                      <span className="neo-text-body text-white">
                        {new Date(campaign.startDate).toLocaleDateString()} - 
                        {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'Ongoing'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewPerformance(campaign)}
                  >
                    View Performance
                  </NeoButton>
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditCampaign(campaign)}
                  >
                    Edit
                  </NeoButton>
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </NeoButton>
                </div>
              </div>
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Create Campaign Modal */}
      <NeoModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Campaign"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Campaign Title"
              placeholder="Enter campaign title..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              variant="glass"
            />
            <NeoInput
              label="Budget"
              placeholder="Enter budget amount"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              variant="glass"
            />
          </div>
          
          <NeoInput
            label="Description"
            placeholder="Describe your campaign requirements..."
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            variant="glass"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              variant="glass"
            />
            <NeoInput
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              variant="glass"
            />
          </div>

          <div className="space-y-4">
            <h4 className="neo-heading-5 text-white">Campaign Requirements</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeoInput
                label="Content Type"
                placeholder="e.g., blog, video, social"
                value={formData.requirements.contentType}
                onChange={(e) => setFormData({
                  ...formData, 
                  requirements: {...formData.requirements, contentType: e.target.value}
                })}
                variant="glass"
              />
              <NeoInput
                label="Timeline"
                placeholder="e.g., 2 weeks, 1 month"
                value={formData.requirements.timeline}
                onChange={(e) => setFormData({
                  ...formData, 
                  requirements: {...formData.requirements, timeline: e.target.value}
                })}
                variant="glass"
              />
            </div>

            <NeoInput
              label="Deliverables"
              placeholder="Describe what needs to be delivered..."
              multiline
              rows={3}
              value={formData.requirements.deliverables}
              onChange={(e) => setFormData({
                ...formData, 
                requirements: {...formData.requirements, deliverables: e.target.value}
              })}
              variant="glass"
            />

            <NeoInput
              label="Guidelines"
              placeholder="Any specific guidelines or requirements..."
              multiline
              rows={3}
              value={formData.requirements.guidelines}
              onChange={(e) => setFormData({
                ...formData, 
                requirements: {...formData.requirements, guidelines: e.target.value}
              })}
              variant="glass"
            />
          </div>

          <div className="flex space-x-4">
            <NeoButton variant="primary" className="flex-1" onClick={handleSaveCampaign}>
              Create Campaign
            </NeoButton>
            <NeoButton variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </NeoButton>
          </div>
        </div>
      </NeoModal>

      {/* Performance Modal */}
      <NeoModal
        isOpen={showPerformanceModal}
        onClose={() => setShowPerformanceModal(false)}
        title={`Performance - ${selectedCampaign?.title}`}
        size="xl"
      >
        {campaignPerformance && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="neo-grid-3 neo-spacing-lg">
              <NeoCard variant="glass" className="p-6 text-center">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  {campaignPerformance.totalViews.toLocaleString()}
                </div>
                <div className="neo-text-body text-slate-300">Total Views</div>
              </NeoCard>
              
              <NeoCard variant="glass" className="p-6 text-center">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  {campaignPerformance.totalClicks.toLocaleString()}
                </div>
                <div className="neo-text-body text-slate-300">Total Clicks</div>
              </NeoCard>
              
              <NeoCard variant="glass" className="p-6 text-center">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  ${campaignPerformance.totalRevenue.toLocaleString()}
                </div>
                <div className="neo-text-body text-slate-300">Total Revenue</div>
              </NeoCard>
            </div>

            {/* Engagement Metrics */}
            <div className="neo-grid-3 neo-spacing-lg">
              <NeoCard variant="glass" className="p-6 text-center">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  {campaignPerformance.totalShares.toLocaleString()}
                </div>
                <div className="neo-text-body text-slate-300">Shares</div>
              </NeoCard>
              
              <NeoCard variant="glass" className="p-6 text-center">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  {campaignPerformance.totalComments.toLocaleString()}
                </div>
                <div className="neo-text-body text-slate-300">Comments</div>
              </NeoCard>
              
              <NeoCard variant="glass" className="p-6 text-center">
                <div className="neo-heading-2 neo-text-holographic mb-2">
                  {campaignPerformance.totalLikes.toLocaleString()}
                </div>
                <div className="neo-text-body text-slate-300">Likes</div>
              </NeoCard>
            </div>

            {/* Performance History */}
            <NeoCard variant="elevated" className="p-6">
              <h3 className="neo-heading-4 text-white mb-4">Performance History</h3>
              <div className="space-y-4">
                {campaignPerformance.performance.map((perf) => (
                  <div key={perf.id} className="flex items-center justify-between p-4 neo-glass rounded-xl">
                    <div className="flex-1">
                      <h4 className="neo-text-body text-white font-medium">{perf.content.title}</h4>
                      <p className="neo-text-small text-slate-400">
                        {perf.content.creator.displayName} • {perf.content.type} • {new Date(perf.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="neo-text-body text-white font-medium">{perf.views.toLocaleString()}</div>
                        <div className="neo-text-small text-slate-400">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="neo-text-body text-white font-medium">{perf.clicks.toLocaleString()}</div>
                        <div className="neo-text-small text-slate-400">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="neo-text-body text-white font-medium">${perf.revenue.toLocaleString()}</div>
                        <div className="neo-text-small text-slate-400">Revenue</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </NeoCard>
          </div>
        )}
      </NeoModal>
    </div>
  );
}
