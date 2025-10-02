'use client';

import { useState, useEffect } from 'react';
import { 
  NeoCard, 
  NeoButton, 
  NeoGlass, 
  NeoBadge,
  NeoInput,
  NeoModal
} from '@/components/neo-materialism';

interface Brief {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: string;
  tags: string[];
  platforms: string[];
  contentType: string;
  brand: {
    name: string;
    logo: string;
    industry: string;
  };
  applicationsCount: number;
  createdAt: string;
}

export default function MarketplaceNeo() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [filteredBriefs, setFilteredBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    proposal: '',
    budget: '',
    timeline: '',
    message: ''
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBriefs: Brief[] = [
      {
        id: '1',
        title: 'Tech Blog Series',
        description: 'Create engaging tech content for our blog covering AI, blockchain, and emerging technologies. Looking for in-depth analysis and thought leadership pieces.',
        budget: 5000,
        deadline: '2024-03-15',
        status: 'PUBLISHED',
        tags: ['technology', 'AI', 'blockchain', 'blog'],
        platforms: ['LinkedIn', 'Medium', 'Twitter'],
        contentType: 'ARTICLE',
        brand: {
          name: 'TechCorp Solutions',
          logo: '/api/placeholder/100/100',
          industry: 'Technology'
        },
        applicationsCount: 12,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Social Media Campaign',
        description: 'LinkedIn and Twitter content strategy for B2B SaaS product launch. Need engaging posts, carousels, and thought leadership content.',
        budget: 3000,
        deadline: '2024-02-28',
        status: 'PUBLISHED',
        tags: ['SaaS', 'B2B', 'social media', 'marketing'],
        platforms: ['LinkedIn', 'Twitter'],
        contentType: 'SOCIAL_POST',
        brand: {
          name: 'SaaS Innovations',
          logo: '/api/placeholder/100/100',
          industry: 'Software'
        },
        applicationsCount: 8,
        createdAt: '2024-01-20'
      },
      {
        id: '3',
        title: 'Video Content Series',
        description: 'Educational video series about digital marketing trends. Need script writing, video production, and distribution across platforms.',
        budget: 8000,
        deadline: '2024-04-01',
        status: 'PUBLISHED',
        tags: ['video', 'marketing', 'education', 'trends'],
        platforms: ['YouTube', 'LinkedIn', 'TikTok'],
        contentType: 'VIDEO',
        brand: {
          name: 'Marketing Masters',
          logo: '/api/placeholder/100/100',
          industry: 'Marketing'
        },
        applicationsCount: 15,
        createdAt: '2024-01-25'
      }
    ];

    setTimeout(() => {
      setBriefs(mockBriefs);
      setFilteredBriefs(mockBriefs);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter briefs based on search and category
  useEffect(() => {
    let filtered = briefs;

    if (searchTerm) {
      filtered = filtered.filter(brief =>
        brief.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brief.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brief.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(brief => brief.contentType === selectedCategory);
    }

    setFilteredBriefs(filtered);
  }, [searchTerm, selectedCategory, briefs]);

  const handleApply = (brief: Brief) => {
    setSelectedBrief(brief);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = () => {
    // TODO: Submit application via API
    console.log('Submitting application:', {
      briefId: selectedBrief?.id,
      ...applicationData
    });
    setShowApplicationModal(false);
    setApplicationData({
      proposal: '',
      budget: '',
      timeline: '',
      message: ''
    });
  };

  const categories = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'ARTICLE', label: 'Articles', icon: '📝' },
    { id: 'VIDEO', label: 'Videos', icon: '🎥' },
    { id: 'SOCIAL_POST', label: 'Social Posts', icon: '📱' },
    { id: 'PODCAST', label: 'Podcasts', icon: '🎧' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="neo-container neo-section">
        {/* Header */}
        <section className="mb-8">
          <NeoCard variant="elevated" glow className="p-8 text-center">
            <h1 className="neo-heading-1 neo-text-holographic mb-4">
              Creator{' '}
              <span className="neo-text-glow">Marketplace</span>
            </h1>
            <p className="neo-text-large text-slate-300 max-w-3xl mx-auto">
              Discover exciting opportunities and connect with brands looking for authentic, 
              impactful content creators like you.
            </p>
          </NeoCard>
        </section>

        {/* Search and Filters */}
        <section className="mb-8">
          <div className="neo-grid-2 neo-spacing-lg">
            <NeoCard variant="glass" className="p-6">
              <h3 className="neo-heading-4 text-white mb-4">Search Briefs</h3>
              <NeoInput
                placeholder="Search by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="glass"
                icon="🔍"
              />
            </NeoCard>

            <NeoCard variant="glass" className="p-6">
              <h3 className="neo-heading-4 text-white mb-4">Content Type</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <NeoButton
                    key={category.id}
                    variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-2"
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </NeoButton>
                ))}
              </div>
            </NeoCard>
          </div>
        </section>

        {/* Briefs Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="neo-heading-2 neo-text-glow">
              Available Briefs ({filteredBriefs.length})
            </h2>
          </div>

          <div className="space-y-6">
            {filteredBriefs.map((brief) => (
              <NeoCard key={brief.id} variant="interactive" className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {brief.brand.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="neo-heading-4 text-white">{brief.title}</h3>
                        <p className="neo-text-small text-slate-400">
                          {brief.brand.name} • {brief.brand.industry}
                        </p>
                      </div>
                    </div>

                    <p className="neo-text-body text-slate-300 mb-4">
                      {brief.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {brief.tags.map((tag) => (
                        <NeoBadge key={tag} variant="secondary">
                          #{tag}
                        </NeoBadge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4">
                      <NeoBadge variant="info">
                        ${brief.budget.toLocaleString()}
                      </NeoBadge>
                      <NeoBadge variant="warning">
                        {brief.applicationsCount} applications
                      </NeoBadge>
                      <span className="neo-text-small text-slate-400">
                        Deadline: {new Date(brief.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <NeoButton
                      variant="primary"
                      size="md"
                      glow
                      onClick={() => handleApply(brief)}
                    >
                      Apply Now
                    </NeoButton>
                    <NeoButton variant="ghost" size="sm">
                      View Details
                    </NeoButton>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>

          {filteredBriefs.length === 0 && (
            <NeoCard variant="glass" className="p-12 text-center">
              <div className="neo-heading-3 text-slate-400 mb-4">
                No briefs found
              </div>
              <p className="neo-text-body text-slate-500">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
            </NeoCard>
          )}
        </section>

        {/* Application Modal */}
        <NeoModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          title={`Apply to: ${selectedBrief?.title}`}
        >
          <div className="space-y-6">
            <div className="neo-glass p-4 rounded-xl">
              <h4 className="neo-heading-5 text-white mb-2">Brief Details</h4>
              <p className="neo-text-small text-slate-300 mb-2">
                Budget: ${selectedBrief?.budget.toLocaleString()}
              </p>
              <p className="neo-text-small text-slate-300 mb-2">
                Deadline: {selectedBrief?.deadline && new Date(selectedBrief.deadline).toLocaleDateString()}
              </p>
              <p className="neo-text-small text-slate-300">
                Brand: {selectedBrief?.brand.name}
              </p>
            </div>

            <NeoInput
              label="Your Proposal"
              placeholder="Describe your approach and why you're the right fit..."
              value={applicationData.proposal}
              onChange={(e) => setApplicationData({...applicationData, proposal: e.target.value})}
              variant="glass"
              multiline
              rows={4}
            />

            <NeoInput
              label="Proposed Budget"
              placeholder="Your proposed budget (can be different from brief budget)"
              value={applicationData.budget}
              onChange={(e) => setApplicationData({...applicationData, budget: e.target.value})}
              variant="glass"
              type="number"
            />

            <NeoInput
              label="Timeline"
              placeholder="Estimated delivery timeline"
              value={applicationData.timeline}
              onChange={(e) => setApplicationData({...applicationData, timeline: e.target.value})}
              variant="glass"
            />

            <NeoInput
              label="Additional Message"
              placeholder="Any additional information or questions..."
              value={applicationData.message}
              onChange={(e) => setApplicationData({...applicationData, message: e.target.value})}
              variant="glass"
              multiline
              rows={2}
            />

            <div className="flex space-x-4">
              <NeoButton 
                variant="primary" 
                className="flex-1"
                onClick={handleSubmitApplication}
              >
                Submit Application
              </NeoButton>
              <NeoButton 
                variant="ghost" 
                onClick={() => setShowApplicationModal(false)}
              >
                Cancel
              </NeoButton>
            </div>
          </div>
        </NeoModal>
      </div>
    </div>
  );
}
