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

interface Brief {
  id: string;
  title: string;
  description: string;
  type: 'INDEPENDENT_BOOSTING' | 'MARKETPLACE_CAMPAIGN';
  status: 'DRAFT' | 'PUBLISHED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  budget: number;
  targetAudience: string[];
  contentRequirements: string[];
  platforms: string[];
  timeline: string;
  deliverables: string[];
  brandGuidelines: string;
  createdAt: string;
  updatedAt: string;
  applications: number;
  selectedCreators: number;
  performance: {
    views: number;
    engagement: number;
    clicks: number;
    conversions: number;
  };
}

export default function BriefManagement() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'INDEPENDENT_BOOSTING',
    budget: '',
    targetAudience: [] as string[],
    contentRequirements: [] as string[],
    platforms: [] as string[],
    timeline: '',
    deliverables: [] as string[],
    brandGuidelines: ''
  });

  // Mock data
  useEffect(() => {
    const mockBriefs: Brief[] = [
      {
        id: '1',
        title: 'Tech Blog Series - AI Trends',
        description: 'Create engaging blog content about AI trends and their impact on business',
        type: 'MARKETPLACE_CAMPAIGN',
        status: 'ACTIVE',
        budget: 5000,
        targetAudience: ['Tech Professionals', 'Business Leaders', 'Developers'],
        contentRequirements: ['Research-backed content', 'Technical accuracy', 'Engaging visuals'],
        platforms: ['LinkedIn', 'Medium', 'Company Blog'],
        timeline: '4 weeks',
        deliverables: ['4 blog posts', '8 social media posts', '2 infographics'],
        brandGuidelines: 'Professional tone, include technical details, use brand colors',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        applications: 12,
        selectedCreators: 3,
        performance: {
          views: 25000,
          engagement: 8.5,
          clicks: 1200,
          conversions: 45
        }
      },
      {
        id: '2',
        title: 'Social Media Content Boost',
        description: 'Boost existing social media content across LinkedIn and Twitter',
        type: 'INDEPENDENT_BOOSTING',
        status: 'PUBLISHED',
        budget: 2000,
        targetAudience: ['Marketing Professionals', 'Entrepreneurs'],
        contentRequirements: ['High engagement potential', 'Brand alignment'],
        platforms: ['LinkedIn', 'Twitter'],
        timeline: '2 weeks',
        deliverables: ['Content amplification', 'Engagement boost'],
        brandGuidelines: 'Maintain brand voice, professional appearance',
        createdAt: '2024-01-18',
        updatedAt: '2024-01-18',
        applications: 8,
        selectedCreators: 0,
        performance: {
          views: 0,
          engagement: 0,
          clicks: 0,
          conversions: 0
        }
      },
      {
        id: '3',
        title: 'Product Launch Campaign',
        description: 'Comprehensive product launch campaign across multiple platforms',
        type: 'MARKETPLACE_CAMPAIGN',
        status: 'DRAFT',
        budget: 10000,
        targetAudience: ['Early Adopters', 'Tech Enthusiasts', 'Industry Professionals'],
        contentRequirements: ['Product demos', 'User testimonials', 'Technical specifications'],
        platforms: ['YouTube', 'LinkedIn', 'Twitter', 'Instagram'],
        timeline: '6 weeks',
        deliverables: ['Video content', 'Social media posts', 'Blog articles', 'Press coverage'],
        brandGuidelines: 'Innovative tone, highlight key features, include call-to-action',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
        applications: 0,
        selectedCreators: 0,
        performance: {
          views: 0,
          engagement: 0,
          clicks: 0,
          conversions: 0
        }
      }
    ];

    setTimeout(() => {
      setBriefs(mockBriefs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBriefs = briefs.filter(brief => {
    const matchesSearch = brief.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brief.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || brief.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'PUBLISHED': return 'info';
      case 'DRAFT': return 'warning';
      case 'COMPLETED': return 'secondary';
      case 'CANCELLED': return 'error';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '▶️';
      case 'PUBLISHED': return '📢';
      case 'DRAFT': return '📝';
      case 'COMPLETED': return '✅';
      case 'CANCELLED': return '❌';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'INDEPENDENT_BOOSTING': return 'accent';
      case 'MARKETPLACE_CAMPAIGN': return 'primary';
      default: return 'ghost';
    }
  };

  const handleCreateBrief = () => {
    setFormData({
      title: '',
      description: '',
      type: 'INDEPENDENT_BOOSTING',
      budget: '',
      targetAudience: [],
      contentRequirements: [],
      platforms: [],
      timeline: '',
      deliverables: [],
      brandGuidelines: ''
    });
    setShowCreateModal(true);
  };

  const handleEditBrief = (brief: Brief) => {
    setSelectedBrief(brief);
    setFormData({
      title: brief.title,
      description: brief.description,
      type: brief.type,
      budget: brief.budget.toString(),
      targetAudience: brief.targetAudience,
      contentRequirements: brief.contentRequirements,
      platforms: brief.platforms,
      timeline: brief.timeline,
      deliverables: brief.deliverables,
      brandGuidelines: brief.brandGuidelines
    });
    setShowEditModal(true);
  };

  const handleViewBrief = (brief: Brief) => {
    setSelectedBrief(brief);
    setShowViewModal(true);
  };

  const handleSaveBrief = () => {
    // TODO: Implement API call to save brief
    console.log('Saving brief:', formData);
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  const handleDeleteBrief = (briefId: string) => {
    if (confirm('Are you sure you want to delete this brief?')) {
      // TODO: Implement API call to delete brief
      setBriefs(briefs.filter(b => b.id !== briefId));
    }
  };

  const totalBriefs = briefs.length;
  const activeBriefs = briefs.filter(b => b.status === 'ACTIVE').length;
  const totalBudget = briefs.reduce((sum, b) => sum + b.budget, 0);
  const totalApplications = briefs.reduce((sum, b) => sum + b.applications, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading briefs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="neo-heading-2 neo-text-glow">Brief Management</h2>
          <p className="neo-text-body text-slate-300 mt-1">
            Create and manage content briefs for creators
          </p>
        </div>
        <NeoButton 
          variant="primary" 
          size="lg" 
          glow
          onClick={handleCreateBrief}
        >
          + Create Brief
        </NeoButton>
      </div>

      {/* Stats */}
      <div className="neo-grid-4 neo-spacing-lg">
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {totalBriefs}
          </div>
          <div className="neo-text-body text-slate-300">Total Briefs</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {activeBriefs}
          </div>
          <div className="neo-text-body text-slate-300">Active</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            ${totalBudget.toLocaleString()}
          </div>
          <div className="neo-text-body text-slate-300">Total Budget</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {totalApplications}
          </div>
          <div className="neo-text-body text-slate-300">Applications</div>
        </NeoCard>
      </div>

      {/* Filters and Search */}
      <NeoCard variant="glass" className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <NeoInput
              placeholder="Search briefs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="glass"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </NeoCard>

      {/* Briefs List */}
      <div className="space-y-4">
        {filteredBriefs.map((brief) => (
          <NeoCard key={brief.id} variant="interactive" className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="neo-heading-4 text-white">{brief.title}</h3>
                  <NeoBadge variant={getStatusColor(brief.status)}>
                    {getStatusIcon(brief.status)} {brief.status}
                  </NeoBadge>
                  <NeoBadge variant={getTypeColor(brief.type)}>
                    {brief.type.replace('_', ' ')}
                  </NeoBadge>
                </div>
                
                <p className="neo-text-body text-slate-300 mb-4">{brief.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="neo-text-small text-slate-400">Budget:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      ${brief.budget.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Timeline:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {brief.timeline}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Applications:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {brief.applications}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Selected:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {brief.selectedCreators}
                    </span>
                  </div>
                </div>

                {brief.status === 'ACTIVE' && brief.performance.views > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="neo-text-body text-white font-medium">
                        {brief.performance.views.toLocaleString()}
                      </div>
                      <div className="neo-text-small text-slate-400">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="neo-text-body text-white font-medium">
                        {brief.performance.engagement}%
                      </div>
                      <div className="neo-text-small text-slate-400">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="neo-text-body text-white font-medium">
                        {brief.performance.clicks.toLocaleString()}
                      </div>
                      <div className="neo-text-small text-slate-400">Clicks</div>
                    </div>
                    <div className="text-center">
                      <div className="neo-text-body text-white font-medium">
                        {brief.performance.conversions}
                      </div>
                      <div className="neo-text-small text-slate-400">Conversions</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewBrief(brief)}
                  >
                    View Details
                  </NeoButton>
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditBrief(brief)}
                  >
                    Edit
                  </NeoButton>
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteBrief(brief.id)}
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

      {/* Create/Edit Brief Modal */}
      <NeoModal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
        }}
        title={showCreateModal ? 'Create New Brief' : 'Edit Brief'}
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Brief Title"
              placeholder="Enter brief title..."
              value={formData.title}
              onChange={(value) => setFormData({...formData, title: value})}
              variant="glass"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="INDEPENDENT_BOOSTING">Independent Content Boosting</option>
              <option value="MARKETPLACE_CAMPAIGN">Creator Marketplace Campaign</option>
            </select>
          </div>
          
          <NeoInput
            label="Description"
            placeholder="Describe your brief requirements..."
            multiline
            rows={4}
            value={formData.description}
            onChange={(value) => setFormData({...formData, description: value})}
            variant="glass"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Budget"
              placeholder="Enter budget amount"
              type="number"
              value={formData.budget}
              onChange={(value) => setFormData({...formData, budget: value})}
              variant="glass"
            />
            <NeoInput
              label="Timeline"
              placeholder="e.g., 2 weeks, 1 month"
              value={formData.timeline}
              onChange={(value) => setFormData({...formData, timeline: value})}
              variant="glass"
            />
          </div>

          <div className="space-y-4">
            <h4 className="neo-heading-5 text-white">Target Audience</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Gen Z', 'Millennials', 'Gen X', 'Professionals', 'Students', 'Tech Enthusiasts', 'Business Leaders', 'Developers', 'Marketing Professionals'].map((audience) => (
                <button
                  key={audience}
                  onClick={() => {
                    const newAudience = formData.targetAudience.includes(audience)
                      ? formData.targetAudience.filter(a => a !== audience)
                      : [...formData.targetAudience, audience];
                    setFormData({...formData, targetAudience: newAudience});
                  }}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    formData.targetAudience.includes(audience)
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {audience}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="neo-heading-5 text-white">Platforms</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['LinkedIn', 'Twitter', 'Instagram', 'YouTube', 'Medium', 'TikTok', 'Facebook', 'Reddit'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => {
                    const newPlatforms = formData.platforms.includes(platform)
                      ? formData.platforms.filter(p => p !== platform)
                      : [...formData.platforms, platform];
                    setFormData({...formData, platforms: newPlatforms});
                  }}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    formData.platforms.includes(platform)
                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                      : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <NeoInput
            label="Brand Guidelines"
            placeholder="Any specific brand guidelines or requirements..."
            multiline
            rows={3}
            value={formData.brandGuidelines}
            onChange={(value) => setFormData({...formData, brandGuidelines: value})}
            variant="glass"
          />

          <div className="flex space-x-4">
            <NeoButton variant="primary" className="flex-1" onClick={handleSaveBrief}>
              {showCreateModal ? 'Create Brief' : 'Update Brief'}
            </NeoButton>
            <NeoButton variant="ghost" onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
            }}>
              Cancel
            </NeoButton>
          </div>
        </div>
      </NeoModal>

      {/* Brief Details Modal */}
      <NeoModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title={selectedBrief?.title}
        size="xl"
      >
        {selectedBrief && (
          <div className="space-y-6">
            {/* Brief Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <NeoBadge variant={getStatusColor(selectedBrief.status)}>
                  {getStatusIcon(selectedBrief.status)} {selectedBrief.status}
                </NeoBadge>
                <NeoBadge variant={getTypeColor(selectedBrief.type)}>
                  {selectedBrief.type.replace('_', ' ')}
                </NeoBadge>
              </div>
              <div className="text-right">
                <div className="neo-heading-4 text-white">${selectedBrief.budget.toLocaleString()}</div>
                <div className="neo-text-small text-slate-400">Budget</div>
              </div>
            </div>

            {/* Brief Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Requirements</h4>
                <div className="space-y-3">
                  <div>
                    <span className="neo-text-small text-slate-400">Timeline:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {selectedBrief.timeline}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Applications:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {selectedBrief.applications}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Selected Creators:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {selectedBrief.selectedCreators}
                    </span>
                  </div>
                </div>
              </NeoCard>

              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Performance</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="neo-heading-4 neo-text-holographic">
                      {selectedBrief.performance.views.toLocaleString()}
                    </div>
                    <div className="neo-text-small text-slate-400">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="neo-heading-4 neo-text-holographic">
                      {selectedBrief.performance.engagement}%
                    </div>
                    <div className="neo-text-small text-slate-400">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="neo-heading-4 neo-text-holographic">
                      {selectedBrief.performance.clicks.toLocaleString()}
                    </div>
                    <div className="neo-text-small text-slate-400">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="neo-heading-4 neo-text-holographic">
                      {selectedBrief.performance.conversions}
                    </div>
                    <div className="neo-text-small text-slate-400">Conversions</div>
                  </div>
                </div>
              </NeoCard>
            </div>

            {/* Target Audience and Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Target Audience</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBrief.targetAudience.map((audience) => (
                    <NeoBadge key={audience} variant="secondary" size="sm">
                      {audience}
                    </NeoBadge>
                  ))}
                </div>
              </NeoCard>

              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBrief.platforms.map((platform) => (
                    <NeoBadge key={platform} variant="accent" size="sm">
                      {platform}
                    </NeoBadge>
                  ))}
                </div>
              </NeoCard>
            </div>

            {/* Brand Guidelines */}
            <NeoCard variant="glass" className="p-6">
              <h4 className="neo-heading-5 text-white mb-4">Brand Guidelines</h4>
              <p className="neo-text-body text-slate-300">{selectedBrief.brandGuidelines}</p>
            </NeoCard>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <NeoButton variant="primary" className="flex-1">
                View Applications
              </NeoButton>
              <NeoButton variant="accent" className="flex-1">
                Edit Brief
              </NeoButton>
              <NeoButton variant="ghost">
                Duplicate
              </NeoButton>
            </div>
          </div>
        )}
      </NeoModal>
    </div>
  );
}
