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

interface Creator {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  specialties: string[];
  platforms: string[];
  followerCount: number;
  engagementRate: number;
  hourlyRate: number;
  rating: number;
  isVerified: boolean;
  location: string;
  languages: string[];
  portfolio: {
    title: string;
    type: string;
    views: number;
    engagement: number;
  }[];
}

export default function MarketplaceNeo() {
  const [marketplaceType, setMarketplaceType] = useState<'creator' | 'business'>('creator');
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredBriefs, setFilteredBriefs] = useState<Brief[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
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

    const mockCreators: Creator[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        bio: 'Tech content creator specializing in AI and machine learning. 5+ years experience creating educational content.',
        avatar: '/api/placeholder/100/100',
        specialties: ['AI', 'Machine Learning', 'Tech Reviews', 'Tutorials'],
        platforms: ['YouTube', 'LinkedIn', 'Medium', 'Twitter'],
        followerCount: 125000,
        engagementRate: 8.5,
        hourlyRate: 150,
        rating: 4.9,
        isVerified: true,
        location: 'San Francisco, CA',
        languages: ['English', 'Mandarin'],
        portfolio: [
          { title: 'AI for Beginners', type: 'Video', views: 250000, engagement: 12.5 },
          { title: 'Machine Learning Explained', type: 'Article', views: 180000, engagement: 9.2 }
        ]
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        bio: 'Marketing strategist and content creator focused on B2B SaaS. Expert in LinkedIn and Twitter marketing.',
        avatar: '/api/placeholder/100/100',
        specialties: ['B2B Marketing', 'SaaS', 'LinkedIn', 'Content Strategy'],
        platforms: ['LinkedIn', 'Twitter', 'Medium'],
        followerCount: 85000,
        engagementRate: 6.8,
        hourlyRate: 120,
        rating: 4.7,
        isVerified: true,
        location: 'Austin, TX',
        languages: ['English'],
        portfolio: [
          { title: 'SaaS Growth Hacks', type: 'Article', views: 150000, engagement: 7.8 },
          { title: 'LinkedIn Marketing Tips', type: 'Video', views: 200000, engagement: 11.2 }
        ]
      },
      {
        id: '3',
        name: 'Elena Rodriguez',
        bio: 'Video producer and social media expert. Creates engaging content for lifestyle and fashion brands.',
        avatar: '/api/placeholder/100/100',
        specialties: ['Video Production', 'Social Media', 'Fashion', 'Lifestyle'],
        platforms: ['Instagram', 'TikTok', 'YouTube', 'Pinterest'],
        followerCount: 200000,
        engagementRate: 12.3,
        hourlyRate: 100,
        rating: 4.8,
        isVerified: true,
        location: 'Los Angeles, CA',
        languages: ['English', 'Spanish'],
        portfolio: [
          { title: 'Fashion Week Coverage', type: 'Video', views: 500000, engagement: 15.6 },
          { title: 'Style Guide Series', type: 'Carousel', views: 300000, engagement: 18.2 }
        ]
      }
    ];

    setTimeout(() => {
      setBriefs(mockBriefs);
      setCreators(mockCreators);
      setFilteredBriefs(mockBriefs);
      setFilteredCreators(mockCreators);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter briefs and creators based on search and category
  useEffect(() => {
    if (marketplaceType === 'creator') {
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
    } else {
      let filtered = creators;

      if (searchTerm) {
        filtered = filtered.filter(creator =>
          creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(creator => 
          creator.specialties.some(specialty => specialty.toLowerCase().includes(selectedCategory.toLowerCase()))
        );
      }

      setFilteredCreators(filtered);
    }
  }, [searchTerm, selectedCategory, briefs, creators, marketplaceType]);

  const handleApply = (brief: Brief) => {
    setSelectedBrief(brief);
    setShowApplicationModal(true);
  };

  const handleContactCreator = (creator: Creator) => {
    setSelectedCreator(creator);
    setShowContactModal(true);
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

  const handleSubmitContact = () => {
    // TODO: Submit contact request via API
    console.log('Contacting creator:', {
      creatorId: selectedCreator?.id,
      ...applicationData
    });
    setShowContactModal(false);
    setApplicationData({
      proposal: '',
      budget: '',
      timeline: '',
      message: ''
    });
  };

  const creatorCategories = [
    { id: 'all', label: 'All', icon: '' },
    { id: 'ARTICLE', label: 'Articles', icon: '' },
    { id: 'VIDEO', label: 'Videos', icon: '' },
    { id: 'SOCIAL_POST', label: 'Social Posts', icon: '' },
    { id: 'PODCAST', label: 'Podcasts', icon: '' }
  ];

  const businessCategories = [
    { id: 'all', label: 'All', icon: '' },
    { id: 'AI', label: 'AI', icon: '' },
    { id: 'Marketing', label: 'Marketing', icon: '' },
    { id: 'Video Production', label: 'Video Production', icon: '' },
    { id: 'Social Media', label: 'Social Media', icon: '' },
    { id: 'Tech', label: 'Tech', icon: '' }
  ];

  const categories = marketplaceType === 'creator' ? creatorCategories : businessCategories;

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
            {/* Marketplace Type Toggle */}
            <div className="mb-6">
              <div className="inline-flex bg-slate-800/50 rounded-xl p-1">
                <NeoButton
                  variant={marketplaceType === 'creator' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setMarketplaceType('creator')}
                  className="px-6"
                >
                  Creator Marketplace
                </NeoButton>
                <NeoButton
                  variant={marketplaceType === 'business' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setMarketplaceType('business')}
                  className="px-6"
                >
                  Business Marketplace
                </NeoButton>
              </div>
            </div>

            <h1 className="neo-heading-1 neo-text-holographic mb-4">
              {marketplaceType === 'creator' ? 'Creator' : 'Business'}{' '}
              <span className="neo-text-glow">Marketplace</span>
            </h1>
            <p className="neo-text-large text-slate-300 max-w-3xl mx-auto">
              {marketplaceType === 'creator' 
                ? 'Discover exciting opportunities and connect with brands looking for authentic, impactful content creators like you.'
                : 'Find talented creators and connect with them for your next campaign. Browse profiles, view portfolios, and start meaningful collaborations.'
              }
            </p>
          </NeoCard>
        </section>

        {/* Search and Filters */}
        <section className="mb-8">
          <div className="neo-grid-2 neo-spacing-lg">
            <NeoCard variant="glass" className="p-6">
              <h3 className="neo-heading-4 text-white mb-4">
                {marketplaceType === 'creator' ? 'Search Briefs' : 'Search Creators'}
              </h3>
              <NeoInput
                placeholder={marketplaceType === 'creator' 
                  ? "Search by title, description, or tags..." 
                  : "Search by name, bio, or specialties..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="glass"
              />
            </NeoCard>

            <NeoCard variant="glass" className="p-6">
              <h3 className="neo-heading-4 text-white mb-4">
                {marketplaceType === 'creator' ? 'Content Type' : 'Specialties'}
              </h3>
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
              {marketplaceType === 'creator' 
                ? `Available Briefs (${filteredBriefs.length})`
                : `Available Creators (${filteredCreators.length})`
              }
            </h2>
          </div>

          <div className="space-y-6">
            {marketplaceType === 'creator' ? (
              filteredBriefs.map((brief) => (
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
              ))
            ) : (
              filteredCreators.map((creator) => (
                <NeoCard key={creator.id} variant="interactive" className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {creator.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="neo-heading-4 text-white">{creator.name}</h3>
                            {creator.isVerified && (
                              <NeoBadge variant="success" size="sm">Verified</NeoBadge>
                            )}
                          </div>
                          <p className="neo-text-small text-slate-400">
                            {creator.location} • ${creator.hourlyRate}/hour
                          </p>
                        </div>
                      </div>

                      <p className="neo-text-body text-slate-300 mb-4">
                        {creator.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {creator.specialties.map((specialty) => (
                          <NeoBadge key={specialty} variant="secondary">
                            {specialty}
                          </NeoBadge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4">
                        <NeoBadge variant="info">
                          {creator.followerCount.toLocaleString()} followers
                        </NeoBadge>
                        <NeoBadge variant="warning">
                          {creator.engagementRate}% engagement
                        </NeoBadge>
                        <NeoBadge variant="success">
                          {creator.rating}★ rating
                        </NeoBadge>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <NeoButton
                        variant="primary"
                        size="md"
                        glow
                        onClick={() => handleContactCreator(creator)}
                      >
                        Contact Creator
                      </NeoButton>
                      <NeoButton variant="ghost" size="sm">
                        View Portfolio
                      </NeoButton>
                    </div>
                  </div>
                </NeoCard>
              ))
            )}
          </div>

          {(marketplaceType === 'creator' ? filteredBriefs.length === 0 : filteredCreators.length === 0) && (
            <NeoCard variant="glass" className="p-12 text-center">
              <div className="neo-heading-3 text-slate-400 mb-4">
                {marketplaceType === 'creator' ? 'No briefs found' : 'No creators found'}
              </div>
              <p className="neo-text-body text-slate-500">
                {marketplaceType === 'creator' 
                  ? 'Try adjusting your search criteria or check back later for new opportunities.'
                  : 'Try adjusting your search criteria or check back later for new creators.'
                }
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

        {/* Contact Creator Modal */}
        <NeoModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          title={`Contact: ${selectedCreator?.name}`}
        >
          <div className="space-y-6">
            <div className="neo-glass p-4 rounded-xl">
              <h4 className="neo-heading-5 text-white mb-2">Creator Details</h4>
              <p className="neo-text-small text-slate-300 mb-2">
                Rate: ${selectedCreator?.hourlyRate}/hour
              </p>
              <p className="neo-text-small text-slate-300 mb-2">
                Followers: {selectedCreator?.followerCount.toLocaleString()}
              </p>
              <p className="neo-text-small text-slate-300">
                Engagement: {selectedCreator?.engagementRate}%
              </p>
            </div>

            <NeoInput
              label="Project Description"
              placeholder="Describe your project or campaign..."
              value={applicationData.proposal}
              onChange={(e) => setApplicationData({...applicationData, proposal: e.target.value})}
              variant="glass"
              multiline
              rows={3}
            />

            <NeoInput
              label="Budget Range"
              placeholder="Your budget range (e.g., $1000-5000)"
              value={applicationData.budget}
              onChange={(e) => setApplicationData({...applicationData, budget: e.target.value})}
              variant="glass"
            />

            <NeoInput
              label="Timeline"
              placeholder="When do you need this completed?"
              value={applicationData.timeline}
              onChange={(e) => setApplicationData({...applicationData, timeline: e.target.value})}
              variant="glass"
            />

            <NeoInput
              label="Additional Message"
              placeholder="Any specific requirements or questions..."
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
                onClick={handleSubmitContact}
              >
                Send Message
              </NeoButton>
              <NeoButton 
                variant="ghost" 
                onClick={() => setShowContactModal(false)}
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
