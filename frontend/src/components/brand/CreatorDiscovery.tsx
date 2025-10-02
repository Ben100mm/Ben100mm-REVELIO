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

interface Creator {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  socialLinks: Array<{
    platform: string;
    url: string;
    followers: number;
  }>;
  contentCount: number;
  averageEngagement: number;
  averageViews: number;
  specialties: string[];
  location: string;
  languages: string[];
  rates: {
    cpm: number;
    cpc: number;
    cpv: number;
    fixed: number;
  };
  availability: 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE';
  responseTime: string;
  rating: number;
  totalEarnings: number;
  completedCampaigns: number;
}

interface SearchFilters {
  search: string;
  specialties: string[];
  location: string;
  minFollowers: number;
  maxRate: number;
  availability: string;
  verified: boolean;
  languages: string[];
}

export default function CreatorDiscovery() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [selectedCreators, setSelectedCreators] = useState<Creator[]>([]);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'followers' | 'engagement' | 'rating' | 'rate'>('relevance');

  const [filters, setFilters] = useState<SearchFilters>({
    search: '',
    specialties: [],
    location: '',
    minFollowers: 0,
    maxRate: 10000,
    availability: 'all',
    verified: false,
    languages: []
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCreators: Creator[] = [
      {
        id: '1',
        username: 'sarah_tech',
        displayName: 'Sarah Johnson',
        bio: 'Tech writer and AI researcher. Passionate about emerging technologies and their impact on society.',
        avatar: '/api/placeholder/100/100',
        isVerified: true,
        status: 'ACTIVE',
        socialLinks: [
          { platform: 'linkedin', url: 'https://linkedin.com/in/sarahjohnson', followers: 25000 },
          { platform: 'twitter', url: 'https://twitter.com/sarah_tech', followers: 15000 },
          { platform: 'youtube', url: 'https://youtube.com/sarahtech', followers: 8000 }
        ],
        contentCount: 156,
        averageEngagement: 8.5,
        averageViews: 25000,
        specialties: ['AI/ML', 'Tech Reviews', 'Software Development', 'Data Science'],
        location: 'San Francisco, CA',
        languages: ['English', 'Spanish'],
        rates: {
          cpm: 2.50,
          cpc: 0.15,
          cpv: 0.001,
          fixed: 5000
        },
        availability: 'AVAILABLE',
        responseTime: '< 2 hours',
        rating: 4.9,
        totalEarnings: 125000,
        completedCampaigns: 23
      },
      {
        id: '2',
        username: 'mike_finance',
        displayName: 'Mike Rodriguez',
        bio: 'Personal finance expert helping people build wealth through smart investing and budgeting.',
        avatar: '/api/placeholder/100/100',
        isVerified: true,
        status: 'ACTIVE',
        socialLinks: [
          { platform: 'linkedin', url: 'https://linkedin.com/in/mikerodriguez', followers: 45000 },
          { platform: 'twitter', url: 'https://twitter.com/mike_finance', followers: 32000 },
          { platform: 'instagram', url: 'https://instagram.com/mike_finance', followers: 18000 }
        ],
        contentCount: 89,
        averageEngagement: 12.3,
        averageViews: 45000,
        specialties: ['Personal Finance', 'Investing', 'Budgeting', 'Real Estate'],
        location: 'New York, NY',
        languages: ['English'],
        rates: {
          cpm: 3.20,
          cpc: 0.20,
          cpv: 0.0015,
          fixed: 7500
        },
        availability: 'BUSY',
        responseTime: '< 4 hours',
        rating: 4.8,
        totalEarnings: 89000,
        completedCampaigns: 18
      },
      {
        id: '3',
        username: 'lisa_wellness',
        displayName: 'Lisa Thompson',
        bio: 'Certified nutritionist and wellness coach. Sharing evidence-based health and fitness advice.',
        avatar: '/api/placeholder/100/100',
        isVerified: true,
        status: 'ACTIVE',
        socialLinks: [
          { platform: 'instagram', url: 'https://instagram.com/lisa_wellness', followers: 65000 },
          { platform: 'youtube', url: 'https://youtube.com/lisawellness', followers: 25000 },
          { platform: 'tiktok', url: 'https://tiktok.com/@lisa_wellness', followers: 120000 }
        ],
        contentCount: 234,
        averageEngagement: 15.7,
        averageViews: 85000,
        specialties: ['Nutrition', 'Fitness', 'Wellness', 'Mental Health'],
        location: 'Los Angeles, CA',
        languages: ['English', 'French'],
        rates: {
          cpm: 2.80,
          cpc: 0.18,
          cpv: 0.0012,
          fixed: 6000
        },
        availability: 'AVAILABLE',
        responseTime: '< 1 hour',
        rating: 4.9,
        totalEarnings: 156000,
        completedCampaigns: 31
      },
      {
        id: '4',
        username: 'alex_startups',
        displayName: 'Alex Kumar',
        bio: 'Serial entrepreneur and startup advisor. Sharing insights on building and scaling businesses.',
        avatar: '/api/placeholder/100/100',
        isVerified: true,
        status: 'ACTIVE',
        socialLinks: [
          { platform: 'linkedin', url: 'https://linkedin.com/in/alexkumar', followers: 75000 },
          { platform: 'twitter', url: 'https://twitter.com/alex_startups', followers: 45000 },
          { platform: 'youtube', url: 'https://youtube.com/alexstartups', followers: 15000 }
        ],
        contentCount: 78,
        averageEngagement: 9.2,
        averageViews: 35000,
        specialties: ['Entrepreneurship', 'Startups', 'Business Strategy', 'Venture Capital'],
        location: 'Austin, TX',
        languages: ['English', 'Hindi'],
        rates: {
          cpm: 4.00,
          cpc: 0.25,
          cpv: 0.002,
          fixed: 10000
        },
        availability: 'UNAVAILABLE',
        responseTime: '< 6 hours',
        rating: 4.7,
        totalEarnings: 98000,
        completedCampaigns: 15
      },
      {
        id: '5',
        username: 'emma_design',
        displayName: 'Emma Wilson',
        bio: 'UI/UX designer and creative director. Passionate about creating beautiful, functional digital experiences.',
        avatar: '/api/placeholder/100/100',
        isVerified: true,
        status: 'ACTIVE',
        socialLinks: [
          { platform: 'instagram', url: 'https://instagram.com/emma_design', followers: 35000 },
          { platform: 'dribbble', url: 'https://dribbble.com/emmawilson', followers: 12000 },
          { platform: 'behance', url: 'https://behance.net/emmawilson', followers: 8000 }
        ],
        contentCount: 145,
        averageEngagement: 11.4,
        averageViews: 28000,
        specialties: ['UI/UX Design', 'Branding', 'Web Design', 'Mobile Apps'],
        location: 'Seattle, WA',
        languages: ['English'],
        rates: {
          cpm: 2.20,
          cpc: 0.12,
          cpv: 0.0008,
          fixed: 4000
        },
        availability: 'AVAILABLE',
        responseTime: '< 3 hours',
        rating: 4.8,
        totalEarnings: 67000,
        completedCampaigns: 19
      }
    ];

    setTimeout(() => {
      setCreators(mockCreators);
      setFilteredCreators(mockCreators);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort creators
  useEffect(() => {
    let filtered = creators.filter(creator => {
      const matchesSearch = creator.displayName.toLowerCase().includes(filters.search.toLowerCase()) ||
                           creator.bio.toLowerCase().includes(filters.search.toLowerCase()) ||
                           creator.specialties.some(s => s.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesSpecialties = filters.specialties.length === 0 || 
                                filters.specialties.some(s => creator.specialties.includes(s));
      
      const matchesLocation = !filters.location || creator.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesFollowers = creator.socialLinks.reduce((total, link) => total + link.followers, 0) >= filters.minFollowers;
      
      const matchesRate = creator.rates.fixed <= filters.maxRate;
      
      const matchesAvailability = filters.availability === 'all' || creator.availability === filters.availability;
      
      const matchesVerified = !filters.verified || creator.isVerified;
      
      const matchesLanguages = filters.languages.length === 0 || 
                              filters.languages.some(lang => creator.languages.includes(lang));

      return matchesSearch && matchesSpecialties && matchesLocation && matchesFollowers && 
             matchesRate && matchesAvailability && matchesVerified && matchesLanguages;
    });

    // Sort creators
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'followers':
          const aFollowers = a.socialLinks.reduce((total, link) => total + link.followers, 0);
          const bFollowers = b.socialLinks.reduce((total, link) => total + link.followers, 0);
          return bFollowers - aFollowers;
        case 'engagement':
          return b.averageEngagement - a.averageEngagement;
        case 'rating':
          return b.rating - a.rating;
        case 'rate':
          return a.rates.fixed - b.rates.fixed;
        default:
          return 0; // relevance - could implement more sophisticated scoring
      }
    });

    setFilteredCreators(filtered);
  }, [creators, filters, sortBy]);

  const handleCreatorSelect = (creator: Creator) => {
    if (selectedCreators.find(c => c.id === creator.id)) {
      setSelectedCreators(selectedCreators.filter(c => c.id !== creator.id));
    } else {
      setSelectedCreators([...selectedCreators, creator]);
    }
  };

  const handleViewCreator = (creator: Creator) => {
    setSelectedCreator(creator);
    setShowCreatorModal(true);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'AVAILABLE': return 'success';
      case 'BUSY': return 'warning';
      case 'UNAVAILABLE': return 'error';
      default: return 'secondary';
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'AVAILABLE': return '●';
      case 'BUSY': return '●';
      case 'UNAVAILABLE': return '●';
      default: return '○';
    }
  };

  const getTotalFollowers = (creator: Creator) => {
    return creator.socialLinks.reduce((total, link) => total + link.followers, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading creators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="neo-heading-2 neo-text-glow">Creator Discovery</h2>
          <p className="neo-text-body text-slate-300 mt-1">
            Find and connect with the perfect creators for your campaigns
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="neo-text-small text-slate-400">View:</span>
            <div className="flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-slate-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-slate-300'
                }`}
              >
                List
              </button>
            </div>
          </div>
          {selectedCreators.length > 0 && (
            <NeoButton variant="primary" size="sm">
              Contact Selected ({selectedCreators.length})
            </NeoButton>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <NeoCard variant="glass" className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <NeoInput
                placeholder="Search creators by name, bio, or specialties..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                variant="glass"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="followers">Followers</option>
                <option value="engagement">Engagement</option>
                <option value="rating">Rating</option>
                <option value="rate">Rate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <NeoInput
              label="Location"
              placeholder="e.g., San Francisco"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              variant="glass"
            />
            <NeoInput
              label="Min Followers"
              type="number"
              placeholder="0"
              value={filters.minFollowers}
              onChange={(e) => setFilters({...filters, minFollowers: parseInt(e.target.value) || 0})}
              variant="glass"
            />
            <NeoInput
              label="Max Rate"
              type="number"
              placeholder="10000"
              value={filters.maxRate}
              onChange={(e) => setFilters({...filters, maxRate: parseInt(e.target.value) || 10000})}
              variant="glass"
            />
            <select
              value={filters.availability}
              onChange={(e) => setFilters({...filters, availability: e.target.value})}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Availability</option>
              <option value="AVAILABLE">Available</option>
              <option value="BUSY">Busy</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <span className="neo-text-small text-slate-300">Verified only</span>
            </label>
          </div>
        </div>
      </NeoCard>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="neo-text-body text-slate-300">
          Found {filteredCreators.length} creators
        </p>
        <div className="flex items-center space-x-2">
          <span className="neo-text-small text-slate-400">Specialties:</span>
          <div className="flex flex-wrap gap-2">
            {['AI/ML', 'Tech Reviews', 'Personal Finance', 'Wellness', 'Design'].map(specialty => (
              <button
                key={specialty}
                onClick={() => {
                  const newSpecialties = filters.specialties.includes(specialty)
                    ? filters.specialties.filter(s => s !== specialty)
                    : [...filters.specialties, specialty];
                  setFilters({...filters, specialties: newSpecialties});
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.specialties.includes(specialty)
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Creators Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <NeoCard 
              key={creator.id} 
              variant="interactive" 
              className={`p-6 cursor-pointer ${
                selectedCreators.find(c => c.id === creator.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleCreatorSelect(creator)}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {creator.displayName.charAt(0)}
                    </span>
                  </div>
                  {creator.isVerified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="neo-heading-4 text-white">{creator.displayName}</h3>
                  <p className="neo-text-small text-slate-400">@{creator.username}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <NeoBadge variant={getAvailabilityColor(creator.availability)} size="sm">
                      {getAvailabilityIcon(creator.availability)} {creator.availability}
                    </NeoBadge>
                    <span className="neo-text-small text-slate-400">
                      {creator.responseTime}
                    </span>
                  </div>
                </div>
              </div>

              <p className="neo-text-body text-slate-300 mb-4 line-clamp-2">
                {creator.bio}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="neo-text-small text-slate-400">Total Followers</span>
                  <span className="neo-text-body text-white font-medium">
                    {getTotalFollowers(creator).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="neo-text-small text-slate-400">Engagement Rate</span>
                  <span className="neo-text-body text-white font-medium">
                    {creator.averageEngagement}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="neo-text-small text-slate-400">Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="neo-text-body text-white font-medium">{creator.rating}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="neo-text-small text-slate-400">Rate</span>
                  <span className="neo-text-body text-white font-medium">
                    ${creator.rates.fixed.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.specialties.slice(0, 3).map((specialty) => (
                    <NeoBadge key={specialty} variant="secondary" size="sm">
                      {specialty}
                    </NeoBadge>
                  ))}
                  {creator.specialties.length > 3 && (
                    <NeoBadge variant="ghost" size="sm">
                      +{creator.specialties.length - 3} more
                    </NeoBadge>
                  )}
                </div>

                <div className="flex space-x-2">
                  <NeoButton 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCreator(creator);
                    }}
                  >
                    View Profile
                  </NeoButton>
                  <NeoButton 
                    variant="primary" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreatorSelect(creator);
                    }}
                  >
                    {selectedCreators.find(c => c.id === creator.id) ? 'Selected' : 'Select'}
                  </NeoButton>
                </div>
              </div>
            </NeoCard>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCreators.map((creator) => (
            <NeoCard 
              key={creator.id} 
              variant="interactive" 
              className={`p-6 cursor-pointer ${
                selectedCreators.find(c => c.id === creator.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleCreatorSelect(creator)}
            >
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {creator.displayName.charAt(0)}
                    </span>
                  </div>
                  {creator.isVerified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="neo-heading-4 text-white">{creator.displayName}</h3>
                    <NeoBadge variant={getAvailabilityColor(creator.availability)} size="sm">
                      {getAvailabilityIcon(creator.availability)} {creator.availability}
                    </NeoBadge>
                    <span className="neo-text-small text-slate-400">
                      {creator.responseTime}
                    </span>
                  </div>
                  <p className="neo-text-body text-slate-300 mb-3">{creator.bio}</p>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <span className="neo-text-small text-slate-400">Followers:</span>
                      <span className="neo-text-body text-white font-medium">
                        {getTotalFollowers(creator).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="neo-text-small text-slate-400">Engagement:</span>
                      <span className="neo-text-body text-white font-medium">
                        {creator.averageEngagement}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="neo-text-small text-slate-400">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <span className="neo-text-body text-white font-medium">{creator.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="neo-text-small text-slate-400">Rate:</span>
                      <span className="neo-text-body text-white font-medium">
                        ${creator.rates.fixed.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {creator.specialties.map((specialty) => (
                      <NeoBadge key={specialty} variant="secondary" size="sm">
                        {specialty}
                      </NeoBadge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCreator(creator);
                    }}
                  >
                    View Profile
                  </NeoButton>
                  <NeoButton 
                    variant="primary" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreatorSelect(creator);
                    }}
                  >
                    {selectedCreators.find(c => c.id === creator.id) ? 'Selected' : 'Select'}
                  </NeoButton>
                </div>
              </div>
            </NeoCard>
          ))}
        </div>
      )}

      {/* Creator Profile Modal */}
      <NeoModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
        title={selectedCreator?.displayName}
        size="xl"
      >
        {selectedCreator && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">
                    {selectedCreator.displayName.charAt(0)}
                  </span>
                </div>
                {selectedCreator.isVerified && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="neo-heading-3 text-white">{selectedCreator.displayName}</h3>
                  <NeoBadge variant={getAvailabilityColor(selectedCreator.availability)}>
                    {getAvailabilityIcon(selectedCreator.availability)} {selectedCreator.availability}
                  </NeoBadge>
                </div>
                <p className="neo-text-body text-slate-300 mb-4">{selectedCreator.bio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="neo-heading-4 neo-text-holographic">
                      {getTotalFollowers(selectedCreator).toLocaleString()}
                    </div>
                    <div className="neo-text-small text-slate-400">Total Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="neo-heading-4 neo-text-holographic">
                      {selectedCreator.averageEngagement}%
                    </div>
                    <div className="neo-text-small text-slate-400">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="neo-heading-4 neo-text-holographic">
                      {selectedCreator.rating}
                    </div>
                    <div className="neo-text-small text-slate-400">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="neo-heading-4 neo-text-holographic">
                      {selectedCreator.completedCampaigns}
                    </div>
                    <div className="neo-text-small text-slate-400">Campaigns</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <NeoCard variant="glass" className="p-6">
              <h4 className="neo-heading-5 text-white mb-4">Social Media Presence</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedCreator.socialLinks.map((link) => (
                  <div key={link.platform} className="flex items-center justify-between p-3 neo-glass rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {link.platform.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="neo-text-body text-white capitalize">{link.platform}</span>
                    </div>
                    <span className="neo-text-body text-slate-300">
                      {link.followers.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </NeoCard>

            {/* Specialties and Rates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCreator.specialties.map((specialty) => (
                    <NeoBadge key={specialty} variant="secondary">
                      {specialty}
                    </NeoBadge>
                  ))}
                </div>
              </NeoCard>

              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Rates</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">CPM:</span>
                    <span className="neo-text-body text-white font-medium">${selectedCreator.rates.cpm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">CPC:</span>
                    <span className="neo-text-body text-white font-medium">${selectedCreator.rates.cpc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">CPV:</span>
                    <span className="neo-text-body text-white font-medium">${selectedCreator.rates.cpv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neo-text-body text-slate-300">Fixed Rate:</span>
                    <span className="neo-text-body text-white font-medium">${selectedCreator.rates.fixed.toLocaleString()}</span>
                  </div>
                </div>
              </NeoCard>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <NeoButton 
                variant="primary" 
                className="flex-1"
                onClick={() => {
                  handleCreatorSelect(selectedCreator);
                  setShowCreatorModal(false);
                }}
              >
                {selectedCreators.find(c => c.id === selectedCreator.id) ? 'Selected' : 'Select Creator'}
              </NeoButton>
              <NeoButton variant="accent" className="flex-1">
                Send Message
              </NeoButton>
              <NeoButton variant="ghost">
                View Portfolio
              </NeoButton>
            </div>
          </div>
        )}
      </NeoModal>
    </div>
  );
}
