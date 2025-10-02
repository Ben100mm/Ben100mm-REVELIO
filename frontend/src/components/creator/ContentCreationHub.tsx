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

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'image' | 'article' | 'story';
  platform: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  isSponsored: boolean;
  publishedAt: string;
  scheduledFor?: string;
  metrics: {
    views: number;
    engagement: number;
    clicks: number;
  };
  tags: string[];
}

interface ContentTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: string;
  estimatedTime: string;
}

export default function ContentCreationHub() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(true);

  const contentTemplates: ContentTemplate[] = [
    {
      id: '1',
      name: 'Product Review',
      type: 'video',
      description: 'Create an engaging product review video',
      icon: 'video',
      estimatedTime: '2-3 hours'
    },
    {
      id: '2',
      name: 'Tutorial Guide',
      type: 'video',
      description: 'Step-by-step tutorial content',
      icon: 'tutorial',
      estimatedTime: '3-4 hours'
    },
    {
      id: '3',
      name: 'Behind the Scenes',
      type: 'image',
      description: 'Share your creative process',
      icon: 'camera',
      estimatedTime: '30 minutes'
    },
    {
      id: '4',
      name: 'Blog Post',
      type: 'article',
      description: 'Write an in-depth article',
      icon: 'article',
      estimatedTime: '1-2 hours'
    },
    {
      id: '5',
      name: 'Story Series',
      type: 'story',
      description: 'Create engaging story content',
      icon: 'story',
      estimatedTime: '45 minutes'
    },
    {
      id: '6',
      name: 'Live Stream',
      type: 'video',
      description: 'Connect with your audience live',
      icon: 'live',
      estimatedTime: '1+ hours'
    }
  ];

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockContentItems: ContentItem[] = [
      {
        id: '1',
        title: 'iPhone 15 Pro Unboxing & First Impressions',
        type: 'video',
        platform: 'YouTube',
        status: 'published',
        isSponsored: true,
        publishedAt: '2024-01-20T10:30:00Z',
        metrics: {
          views: 45000,
          engagement: 3200,
          clicks: 890
        },
        tags: ['iPhone', 'Apple', 'Unboxing', 'Review', 'Tech']
      },
      {
        id: '2',
        title: 'MacBook Air M3 Performance Test',
        type: 'article',
        platform: 'Blog',
        status: 'draft',
        isSponsored: false,
        publishedAt: '2024-01-19T14:20:00Z',
        metrics: {
          views: 0,
          engagement: 0,
          clicks: 0
        },
        tags: ['MacBook', 'Apple', 'Performance', 'Review', 'Laptop']
      },
      {
        id: '3',
        title: 'Apple Watch Series 9 Fitness Features',
        type: 'video',
        platform: 'Instagram',
        status: 'scheduled',
        isSponsored: true,
        publishedAt: '2024-01-18T09:15:00Z',
        scheduledFor: '2024-01-25T18:00:00Z',
        metrics: {
          views: 0,
          engagement: 0,
          clicks: 0
        },
        tags: ['Apple Watch', 'Fitness', 'Health', 'Wearable', 'Review']
      },
      {
        id: '4',
        title: 'iPad Pro M2 Creative Workflow',
        type: 'video',
        platform: 'TikTok',
        status: 'archived',
        isSponsored: false,
        publishedAt: '2024-01-17T16:45:00Z',
        metrics: {
          views: 28000,
          engagement: 2100,
          clicks: 450
        },
        tags: ['iPad', 'Creative', 'Art', 'Video Editing', 'Workflow']
      }
    ];

    setTimeout(() => {
      setContentItems(mockContentItems);
      setFilteredItems(mockContentItems);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilter = (filterType: string) => {
    setFilter(filterType);
    if (filterType === 'all') {
      setFilteredItems(contentItems);
    } else {
      setFilteredItems(contentItems.filter(item => item.status === filterType));
    }
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    const sorted = [...filteredItems].sort((a, b) => {
      switch (sortType) {
        case 'recent':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'views':
          return b.metrics.views - a.metrics.views;
        case 'engagement':
          return b.metrics.engagement - a.metrics.engagement;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    setFilteredItems(sorted);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'scheduled': return 'info';
      case 'archived': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case 'image': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'article': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'story': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      default: 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const handleCreateContent = (template: ContentTemplate) => {
    setSelectedTemplate(template);
    setShowCreateModal(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="neo-heading-2 neo-text-glow">Content Creation Hub</h2>
          <p className="neo-text-body text-slate-300">Create and manage your content</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600"
          >
            <option value="recent">Sort by Recent</option>
            <option value="views">Sort by Views</option>
            <option value="engagement">Sort by Engagement</option>
            <option value="title">Sort by Title</option>
          </select>
          <NeoButton variant="primary" onClick={() => setShowCreateModal(true)}>
            + Create Content
          </NeoButton>
        </div>
      </div>

      {/* Content Templates */}
      <NeoCard variant="elevated" className="p-6">
        <h3 className="neo-heading-4 text-white mb-6">Content Templates</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {contentTemplates.map((template) => (
            <NeoButton
              key={template.id}
              variant="ghost"
              className="h-24 flex flex-col items-center justify-center space-y-2 p-4"
              onClick={() => handleCreateContent(template)}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {template.icon === 'video' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
                {template.icon === 'tutorial' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )}
                {template.icon === 'camera' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                {template.icon === 'article' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                {template.icon === 'story' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
                {template.icon === 'live' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                )}
              </div>
              <span className="neo-text-small text-center">{template.name}</span>
            </NeoButton>
          ))}
        </div>
      </NeoCard>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {[
          { id: 'all', label: 'All', count: contentItems.length },
          { id: 'published', label: 'Published', count: contentItems.filter(item => item.status === 'published').length },
          { id: 'draft', label: 'Drafts', count: contentItems.filter(item => item.status === 'draft').length },
          { id: 'scheduled', label: 'Scheduled', count: contentItems.filter(item => item.status === 'scheduled').length },
          { id: 'archived', label: 'Archived', count: contentItems.filter(item => item.status === 'archived').length }
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

      {/* Content Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <NeoCard key={item.id} variant="interactive" className="p-6">
            <div className="flex items-start space-x-4">
              {/* Content Preview */}
              <div className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{getTypeIcon(item.type)}</span>
              </div>

              {/* Content Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="neo-heading-4 text-white mb-1">{item.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>{item.platform}</span>
                      <span>•</span>
                      <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      {item.scheduledFor && (
                        <>
                          <span>•</span>
                          <span>Scheduled: {new Date(item.scheduledFor).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <NeoBadge variant={getStatusColor(item.status)}>
                      {item.status}
                    </NeoBadge>
                    {item.isSponsored && (
                      <NeoBadge variant="crystal">Sponsored</NeoBadge>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, index) => (
                    <NeoBadge key={index} variant="secondary" size="sm">
                      {tag}
                    </NeoBadge>
                  ))}
                </div>

                {item.metrics.views > 0 && (
                  <div className="flex space-x-6 text-sm text-slate-400">
                    <span>{item.metrics.views.toLocaleString()} views</span>
                    <span>{item.metrics.engagement.toLocaleString()} engagement</span>
                    <span>{item.metrics.clicks.toLocaleString()} clicks</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <NeoButton variant="ghost" size="sm">
                  Edit
                </NeoButton>
                <NeoButton variant="secondary" size="sm">
                  Analytics
                </NeoButton>
                {item.status === 'draft' && (
                  <NeoButton variant="primary" size="sm">
                    Publish
                  </NeoButton>
                )}
              </div>
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Create Content Modal */}
      <NeoModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Content"
      >
        <div className="space-y-6">
          {!selectedTemplate ? (
            <div>
              <h3 className="neo-heading-4 text-white mb-4">Choose a Template</h3>
              <div className="grid grid-cols-2 gap-4">
                {contentTemplates.map((template) => (
                  <NeoButton
                    key={template.id}
                    variant="ghost"
                    className="h-20 flex flex-col items-center justify-center space-y-2 p-4"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <span className="text-2xl">{template.icon}</span>
                    <span className="neo-text-small text-center">{template.name}</span>
                  </NeoButton>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">{selectedTemplate.icon}</span>
                <div>
                  <h3 className="neo-heading-4 text-white">{selectedTemplate.name}</h3>
                  <p className="neo-text-small text-slate-400">{selectedTemplate.description}</p>
                  <p className="neo-text-small text-slate-500">Estimated time: {selectedTemplate.estimatedTime}</p>
                </div>
              </div>

              <div className="space-y-4">
                <NeoInput
                  label="Content Title"
                  placeholder="Enter your content title..."
                  variant="glass"
                />
                <NeoInput
                  label="Description"
                  placeholder="Describe your content..."
                  variant="glass"
                  multiline
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <NeoInput
                    label="Platform"
                    placeholder="Select platform..."
                    variant="glass"
                  />
                  <NeoInput
                    label="Tags"
                    placeholder="Enter tags (comma separated)..."
                    variant="glass"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sponsored"
                    className="rounded"
                  />
                  <label htmlFor="sponsored" className="neo-text-body text-white">
                    This is sponsored content
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <NeoButton variant="primary" className="flex-1">
                  Create Content
                </NeoButton>
                <NeoButton variant="ghost" onClick={() => setSelectedTemplate(null)}>
                  Back
                </NeoButton>
                <NeoButton variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </NeoButton>
              </div>
            </div>
          )}
        </div>
      </NeoModal>
    </div>
  );
}
