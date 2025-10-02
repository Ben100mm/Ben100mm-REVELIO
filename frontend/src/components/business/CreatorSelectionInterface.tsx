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
  name: string;
  username: string;
  avatar: string;
  bio: string;
  specialties: string[];
  rating: number;
  followers: number;
  engagementRate: number;
  priceRange: { min: number; max: number };
  isVerified: boolean;
  isAIMatched: boolean;
  matchScore?: number;
}

interface SearchFilters {
  specialties: string[];
  priceRange: { min: number; max: number };
  followers: { min: number; max: number };
  rating: number;
  verified: boolean;
}

export default function CreatorSelectionInterface() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    specialties: [],
    priceRange: { min: 0, max: 10000 },
    followers: { min: 0, max: 1000000 },
    rating: 0,
    verified: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [aiMatching, setAiMatching] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCreators: Creator[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        username: '@sarahj_tech',
        avatar: '/avatars/sarah.jpg',
        bio: 'Tech reviewer and gadget enthusiast with 5+ years experience',
        specialties: ['Technology', 'Gadgets', 'Reviews'],
        rating: 4.8,
        followers: 125000,
        engagementRate: 8.5,
        priceRange: { min: 500, max: 2000 },
        isVerified: true,
        isAIMatched: true,
        matchScore: 95
      },
      {
        id: '2',
        name: 'Mike Chen',
        username: '@mikechen_creates',
        avatar: '/avatars/mike.jpg',
        bio: 'Lifestyle content creator specializing in fashion and travel',
        specialties: ['Lifestyle', 'Fashion', 'Travel'],
        rating: 4.6,
        followers: 89000,
        engagementRate: 7.2,
        priceRange: { min: 300, max: 1500 },
        isVerified: true,
        isAIMatched: true,
        matchScore: 88
      },
      {
        id: '3',
        name: 'Emma Rodriguez',
        username: '@emma_foodie',
        avatar: '/avatars/emma.jpg',
        bio: 'Food blogger and recipe developer with authentic content',
        specialties: ['Food', 'Cooking', 'Lifestyle'],
        rating: 4.9,
        followers: 200000,
        engagementRate: 9.1,
        priceRange: { min: 400, max: 1800 },
        isVerified: true,
        isAIMatched: false,
        matchScore: 72
      },
      {
        id: '4',
        name: 'Alex Thompson',
        username: '@alex_gaming',
        avatar: '/avatars/alex.jpg',
        bio: 'Gaming content creator and streamer',
        specialties: ['Gaming', 'Entertainment', 'Tech'],
        rating: 4.4,
        followers: 75000,
        engagementRate: 6.8,
        priceRange: { min: 200, max: 1200 },
        isVerified: false,
        isAIMatched: false,
        matchScore: 65
      }
    ];

    setTimeout(() => {
      setCreators(mockCreators);
      setFilteredCreators(mockCreators);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAIMatching = async () => {
    setAiMatching(true);
    // Simulate AI matching process
    setTimeout(() => {
      const matchedCreators = creators.map(creator => ({
        ...creator,
        isAIMatched: Math.random() > 0.3,
        matchScore: Math.floor(Math.random() * 40) + 60
      }));
      setCreators(matchedCreators);
      setFilteredCreators(matchedCreators);
      setAiMatching(false);
    }, 2000);
  };

  const handleCreatorSelect = (creatorId: string) => {
    setSelectedCreators(prev => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = creators.filter(creator => 
      creator.name.toLowerCase().includes(query.toLowerCase()) ||
      creator.username.toLowerCase().includes(query.toLowerCase()) ||
      creator.bio.toLowerCase().includes(query.toLowerCase()) ||
      creator.specialties.some(spec => spec.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredCreators(filtered);
  };

  const applyFilters = () => {
    let filtered = creators;

    if (filters.specialties.length > 0) {
      filtered = filtered.filter(creator => 
        creator.specialties.some(spec => filters.specialties.includes(spec))
      );
    }

    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) {
      filtered = filtered.filter(creator => 
        creator.priceRange.min >= filters.priceRange.min &&
        creator.priceRange.max <= filters.priceRange.max
      );
    }

    if (filters.followers.min > 0 || filters.followers.max < 1000000) {
      filtered = filtered.filter(creator => 
        creator.followers >= filters.followers.min &&
        creator.followers <= filters.followers.max
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(creator => creator.rating >= filters.rating);
    }

    if (filters.verified) {
      filtered = filtered.filter(creator => creator.isVerified);
    }

    setFilteredCreators(filtered);
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
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
          <h2 className="neo-heading-2 neo-text-glow">Creator Selection</h2>
          <p className="neo-text-body text-slate-300">AI-powered matching and manual selection</p>
        </div>
        <div className="flex items-center space-x-4">
          <NeoButton 
            variant="accent" 
            onClick={handleAIMatching}
            disabled={aiMatching}
          >
            {aiMatching ? 'AI Matching...' : '🤖 AI Match'}
          </NeoButton>
          <NeoButton 
            variant="secondary" 
            onClick={() => setShowFilters(true)}
          >
            🔍 Filters
          </NeoButton>
        </div>
      </div>

      {/* Search Bar */}
      <NeoCard variant="glass" className="p-6">
        <NeoInput
          placeholder="Search creators by name, username, bio, or specialties..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          variant="glass"
          className="w-full"
        />
      </NeoCard>

      {/* Selected Creators */}
      {selectedCreators.length > 0 && (
        <NeoCard variant="elevated" className="p-6">
          <h3 className="neo-heading-4 text-white mb-4">
            Selected Creators ({selectedCreators.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedCreators.map(creatorId => {
              const creator = creators.find(c => c.id === creatorId);
              return creator ? (
                <NeoBadge 
                  key={creatorId} 
                  variant="crystal" 
                  className="flex items-center space-x-2"
                >
                  <span>{creator.name}</span>
                  <button 
                    onClick={() => handleCreatorSelect(creatorId)}
                    className="ml-2 hover:text-red-400"
                  >
                    ×
                  </button>
                </NeoBadge>
              ) : null;
            })}
          </div>
          <div className="mt-4 flex space-x-4">
            <NeoButton variant="primary">
              Create Campaign
            </NeoButton>
            <NeoButton variant="ghost">
              Save Selection
            </NeoButton>
          </div>
        </NeoCard>
      )}

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => (
          <NeoCard 
            key={creator.id} 
            variant="interactive" 
            className={`p-6 cursor-pointer transition-all duration-200 ${
              selectedCreators.includes(creator.id) 
                ? 'ring-2 ring-blue-500 bg-blue-500/10' 
                : 'hover:bg-slate-700/30'
            }`}
            onClick={() => handleCreatorSelect(creator.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">
                    {creator.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="neo-heading-4 text-white">{creator.name}</h3>
                  <p className="neo-text-small text-slate-400">{creator.username}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {creator.isVerified && (
                  <NeoBadge variant="success" size="sm">✓</NeoBadge>
                )}
                {creator.isAIMatched && (
                  <NeoBadge variant="crystal" size="sm">AI</NeoBadge>
                )}
              </div>
            </div>

            <p className="neo-text-small text-slate-300 mb-4">{creator.bio}</p>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {creator.specialties.map((specialty, index) => (
                  <NeoBadge key={index} variant="secondary" size="sm">
                    {specialty}
                  </NeoBadge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Rating:</span>
                  <span className="text-white ml-2">{creator.rating}/5</span>
                </div>
                <div>
                  <span className="text-slate-400">Followers:</span>
                  <span className="text-white ml-2">{creator.followers.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400">Engagement:</span>
                  <span className="text-white ml-2">{creator.engagementRate}%</span>
                </div>
                <div>
                  <span className="text-slate-400">Price:</span>
                  <span className="text-white ml-2">
                    ${creator.priceRange.min}-${creator.priceRange.max}
                  </span>
                </div>
              </div>

              {creator.isAIMatched && creator.matchScore && (
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">AI Match Score</span>
                    <span className="text-white">{creator.matchScore}%</span>
                  </div>
                  <NeoProgress 
                    value={creator.matchScore} 
                    color="blue" 
                    variant="energy" 
                    size="sm"
                  />
                </div>
              )}
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Filters Modal */}
      <NeoModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filter Creators"
      >
        <div className="space-y-6">
          <div>
            <label className="neo-text-body text-white mb-2 block">Specialties</label>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Lifestyle', 'Food', 'Gaming', 'Fashion', 'Travel'].map(specialty => (
                <NeoButton
                  key={specialty}
                  variant={filters.specialties.includes(specialty) ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      specialties: prev.specialties.includes(specialty)
                        ? prev.specialties.filter(s => s !== specialty)
                        : [...prev.specialties, specialty]
                    }));
                  }}
                >
                  {specialty}
                </NeoButton>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="neo-text-body text-white mb-2 block">Min Price</label>
              <NeoInput
                type="number"
                value={filters.priceRange.min}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, min: parseInt(e.target.value) || 0 }
                }))}
                variant="glass"
              />
            </div>
            <div>
              <label className="neo-text-body text-white mb-2 block">Max Price</label>
              <NeoInput
                type="number"
                value={filters.priceRange.max}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, max: parseInt(e.target.value) || 10000 }
                }))}
                variant="glass"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="neo-text-body text-white mb-2 block">Min Followers</label>
              <NeoInput
                type="number"
                value={filters.followers.min}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  followers: { ...prev.followers, min: parseInt(e.target.value) || 0 }
                }))}
                variant="glass"
              />
            </div>
            <div>
              <label className="neo-text-body text-white mb-2 block">Max Followers</label>
              <NeoInput
                type="number"
                value={filters.followers.max}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  followers: { ...prev.followers, max: parseInt(e.target.value) || 1000000 }
                }))}
                variant="glass"
              />
            </div>
          </div>

          <div>
            <label className="neo-text-body text-white mb-2 block">Min Rating</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={filters.rating}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                rating: parseFloat(e.target.value)
              }))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate-400">
              <span>0</span>
              <span>{filters.rating}</span>
              <span>5</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="verified"
              checked={filters.verified}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                verified: e.target.checked
              }))}
              className="rounded"
            />
            <label htmlFor="verified" className="neo-text-body text-white">
              Verified creators only
            </label>
          </div>

          <div className="flex space-x-4">
            <NeoButton variant="primary" onClick={applyFilters} className="flex-1">
              Apply Filters
            </NeoButton>
            <NeoButton variant="ghost" onClick={() => setShowFilters(false)}>
              Cancel
            </NeoButton>
          </div>
        </div>
      </NeoModal>
    </div>
  );
}
