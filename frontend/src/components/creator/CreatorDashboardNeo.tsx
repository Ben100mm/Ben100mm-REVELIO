'use client';

import { useState, useEffect } from 'react';
import { 
  NeoCard, 
  NeoButton, 
  NeoGlass, 
  NeoBadge, 
  NeoProgress,
  NeoInput,
  NeoModal
} from '@/components/neo-materialism';
import ContentTypeSelector from './ContentTypeSelector';
import ContentCreationWizard from './ContentCreationWizard';
import PerformanceTracking from './PerformanceTracking';
import EarningsDashboard from './EarningsDashboard';

interface Creator {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  status: string;
  _count: {
    content: number;
    campaigns: number;
    earnings: number;
  };
}

interface Content {
  id: string;
  title: string;
  type: string;
  status: string;
  isSponsored: boolean;
  publishedAt: string;
  _count: {
    performance: number;
    distributions: number;
  };
}

interface Analytics {
  earnings: any[];
  performance: any[];
  totals: {
    earnings: number;
    views: number;
    clicks: number;
  };
}

export default function CreatorDashboardNeo() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [content, setContent] = useState<Content[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isContentTypeModalOpen, setIsContentTypeModalOpen] = useState(false);
  const [isCreationWizardOpen, setIsCreationWizardOpen] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<'independent' | 'sponsored' | null>(null);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      setLoading(true);
      
      // Mock data
      const mockCreator: Creator = {
        id: '1',
        username: 'johndoe',
        displayName: 'John Doe',
        bio: 'Content creator specializing in tech reviews and tutorials',
        avatar: '/avatars/john-doe.jpg',
        isVerified: true,
        status: 'active',
        _count: {
          content: 25,
          campaigns: 8,
          earnings: 12500
        }
      };

      const mockContent: Content[] = [
        {
          id: '1',
          title: 'iPhone 15 Pro Review',
          type: 'video',
          status: 'published',
          isSponsored: true,
          publishedAt: '2024-01-15T10:00:00Z',
          _count: {
            performance: 15000,
            distributions: 5
          }
        },
        {
          id: '2',
          title: 'MacBook Air M3 First Look',
          type: 'article',
          status: 'draft',
          isSponsored: false,
          publishedAt: '2024-01-14T15:30:00Z',
          _count: {
            performance: 0,
            distributions: 0
          }
        }
      ];

      const mockAnalytics: Analytics = {
        earnings: [
          { month: 'Jan', amount: 2500 },
          { month: 'Feb', amount: 3200 },
          { month: 'Mar', amount: 2800 },
          { month: 'Apr', amount: 4000 }
        ],
        performance: [
          { date: '2024-01-01', views: 12000, clicks: 480 },
          { date: '2024-01-02', views: 15000, clicks: 600 },
          { date: '2024-01-03', views: 18000, clicks: 720 }
        ],
        totals: {
          earnings: 12500,
          views: 450000,
          clicks: 18000
        }
      };

      setTimeout(() => {
        setCreator(mockCreator);
        setContent(mockContent);
        setAnalytics(mockAnalytics);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleContentTypeSelect = (type: 'independent' | 'sponsored') => {
    setSelectedContentType(type);
    setIsCreationWizardOpen(true);
  };

  const handleContentCreated = (newContent: any) => {
    setContent(prev => [newContent, ...prev]);
    setSelectedContentType(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="neo-container neo-section">
          <div className="text-center">
            <div className="neo-loading-spinner mx-auto mb-4"></div>
            <p className="text-white/70">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="neo-glass p-6 mb-8">
        <div className="neo-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="neo-heading-2 text-white">Creator Dashboard</h1>
              <NeoBadge variant="success" icon={
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }>
                {creator?.isVerified ? 'Verified' : 'Unverified'}
              </NeoBadge>
            </div>
            
            <div className="flex items-center space-x-4">
              <NeoButton variant="ghost" size="sm">
                Settings
              </NeoButton>
              <NeoButton variant="primary" size="sm" onClick={() => setIsContentTypeModalOpen(true)}>
                Create Content
              </NeoButton>
            </div>
          </div>
        </div>
      </header>

      <div className="neo-container neo-section">
        {/* Profile Section */}
        <section className="mb-12">
          <NeoCard variant="glass" className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {creator?.displayName?.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <h2 className="neo-heading-3 text-white mb-2">{creator?.displayName}</h2>
                <p className="text-slate-300 mb-4">@{creator?.username}</p>
                <p className="neo-text-body text-slate-400 mb-6">{creator?.bio}</p>
                
                <div className="flex flex-wrap gap-4">
                  <NeoBadge variant="info">
                    {creator?._count.content} Content Pieces
                  </NeoBadge>
                  <NeoBadge variant="success">
                    {creator?._count.campaigns} Active Campaigns
                  </NeoBadge>
                  <NeoBadge variant="crystal">
                    ${creator?._count.earnings?.toLocaleString()} Earnings
                  </NeoBadge>
                </div>
              </div>
            </div>
          </NeoCard>
        </section>

        {/* Navigation Tabs */}
        <section className="mb-8">
          <div className="neo-glass p-2 rounded-2xl">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'content', label: 'Content' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'performance', label: 'Performance' },
                { id: 'earnings', label: 'Earnings' },
                { id: 'campaigns', label: 'Campaigns' }
              ].map((tab) => (
                <NeoButton
                  key={tab.id}
                  variant={activeTab === tab.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1"
                >
                  {tab.label}
                </NeoButton>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <section className="neo-grid-3 neo-spacing-lg">
            {/* Earnings Card */}
            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="neo-heading-4 text-white">Total Earnings</h3>
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="neo-heading-2 text-green-400 mb-2">
                ${analytics?.totals.earnings.toLocaleString()}
              </div>
              <p className="neo-text-small text-slate-400 mb-4">This month</p>
              <NeoProgress value={75} color="green" variant="energy" />
            </NeoCard>

            {/* Views Card */}
            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="neo-heading-4 text-white">Total Views</h3>
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="neo-heading-2 text-blue-400 mb-2">
                {analytics?.totals.views.toLocaleString()}
              </div>
              <p className="neo-text-small text-slate-400 mb-4">All time</p>
              <NeoProgress value={68} color="blue" variant="crystal" />
            </NeoCard>

            {/* Engagement Card */}
            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="neo-heading-4 text-white">Engagement</h3>
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="neo-heading-2 text-purple-400 mb-2">
                {analytics?.totals.clicks.toLocaleString()}
              </div>
              <p className="neo-text-small text-slate-400 mb-4">Total clicks</p>
              <NeoProgress value={82} color="purple" variant="glow" />
            </NeoCard>
          </section>
        )}

        {activeTab === 'content' && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="neo-heading-3 text-white">Your Content</h3>
              <NeoButton variant="primary" onClick={() => setIsContentTypeModalOpen(true)}>
                Create New
              </NeoButton>
            </div>

            <div className="neo-card-stack">
              {content.map((item) => (
                <NeoCard key={item.id} variant="interactive" className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="neo-heading-4 text-white">{item.title}</h4>
                        <NeoBadge variant={item.status === 'published' ? 'success' : 'warning'}>
                          {item.status}
                        </NeoBadge>
                        {item.isSponsored && (
                          <NeoBadge variant="crystal">Sponsored</NeoBadge>
                        )}
                      </div>
                      <p className="neo-text-small text-slate-400 mb-4">
                        {item.type} • Published {new Date(item.publishedAt).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-4">
                        <span className="neo-text-small text-slate-300">
                          {item._count.performance.toLocaleString()} views
                        </span>
                        <span className="neo-text-small text-slate-300">
                          {item._count.distributions} distributions
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <NeoButton variant="ghost" size="sm">
                        Edit
                      </NeoButton>
                      <NeoButton variant="secondary" size="sm">
                        Analytics
                      </NeoButton>
                    </div>
                  </div>
                </NeoCard>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'analytics' && (
          <section>
            <h3 className="neo-heading-3 text-white mb-6">Analytics Overview</h3>
            
            <div className="neo-grid-2 neo-spacing-lg mb-8">
              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-4 text-white mb-4">Earnings Trend</h4>
                <div className="space-y-3">
                  {analytics?.earnings.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="neo-text-small text-slate-300">{item.month}</span>
                      <span className="neo-text-small text-green-400">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </NeoCard>
              
              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-4 text-white mb-4">Performance Metrics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="neo-text-small text-slate-300">Views</span>
                      <span className="neo-text-small text-white">85%</span>
                    </div>
                    <NeoProgress value={85} color="blue" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="neo-text-small text-slate-300">Engagement</span>
                      <span className="neo-text-small text-white">72%</span>
                    </div>
                    <NeoProgress value={72} color="purple" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="neo-text-small text-slate-300">Conversion</span>
                      <span className="neo-text-small text-white">58%</span>
                    </div>
                    <NeoProgress value={58} color="green" size="sm" />
                  </div>
                </div>
              </NeoCard>
            </div>
          </section>
        )}

        {activeTab === 'performance' && (
          <section>
            <PerformanceTracking />
          </section>
        )}

        {activeTab === 'earnings' && (
          <section>
            <EarningsDashboard />
          </section>
        )}

        {activeTab === 'campaigns' && (
          <section>
            <h3 className="neo-heading-3 text-white mb-6">Active Campaigns</h3>
            
            <div className="neo-card-stack">
              <NeoCard variant="elevated" glow className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="neo-heading-4 text-white">Tech Review Campaign</h4>
                  <NeoBadge variant="success">Active</NeoBadge>
                </div>
                <p className="neo-text-small text-slate-400 mb-4">
                  Partner: TechCorp • Budget: $5,000 • Duration: 30 days
                </p>
                <div className="flex justify-between items-center">
                  <NeoProgress value={65} color="blue" className="flex-1 mr-4" />
                  <span className="neo-text-small text-slate-300">65% Complete</span>
                </div>
              </NeoCard>
              
              <NeoCard variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="neo-heading-4 text-white">Lifestyle Partnership</h4>
                  <NeoBadge variant="warning">Pending</NeoBadge>
                </div>
                <p className="neo-text-small text-slate-400 mb-4">
                  Partner: LifestyleBrand • Budget: $3,500 • Duration: 14 days
                </p>
                <div className="flex justify-between items-center">
                  <NeoProgress value={0} color="purple" className="flex-1 mr-4" />
                  <span className="neo-text-small text-slate-300">Starting Soon</span>
                </div>
              </NeoCard>
            </div>
          </section>
        )}
      </div>

      {/* Content Type Selection Modal */}
      <ContentTypeSelector
        isOpen={isContentTypeModalOpen}
        onClose={() => setIsContentTypeModalOpen(false)}
        onSelectContentType={handleContentTypeSelect}
      />

      {/* Content Creation Wizard */}
      {selectedContentType && (
        <ContentCreationWizard
          isOpen={isCreationWizardOpen}
          onClose={() => {
            setIsCreationWizardOpen(false);
            setSelectedContentType(null);
          }}
          contentType={selectedContentType}
          onContentCreated={handleContentCreated}
        />
      )}
    </div>
  );
}
