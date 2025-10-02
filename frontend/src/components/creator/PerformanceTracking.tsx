'use client';

import { useState, useEffect } from 'react';
import { 
  NeoCard, 
  NeoButton, 
  NeoBadge,
  NeoProgress
} from '@/components/neo-materialism';

interface PerformanceData {
  contentId: string;
  title: string;
  type: string;
  isSponsored: boolean;
  platforms: string[];
  performance: {
    views: number;
    clicks: number;
    shares: number;
    comments: number;
    likes: number;
    revenue: number;
    trustScore: number;
    conversionRate: number;
  };
  trends: {
    viewsGrowth: number;
    engagementGrowth: number;
    revenueGrowth: number;
  };
  lastUpdated: string;
}

interface PerformanceTrackingProps {
  contentId?: string;
}

const MOCK_PERFORMANCE_DATA: PerformanceData[] = [
  {
    contentId: '1',
    title: 'iPhone 15 Pro Review',
    type: 'VIDEO',
    isSponsored: true,
    platforms: ['youtube', 'instagram', 'tiktok'],
    performance: {
      views: 45000,
      clicks: 1800,
      shares: 450,
      comments: 280,
      likes: 2100,
      revenue: 850.50,
      trustScore: 8.7,
      conversionRate: 4.2
    },
    trends: {
      viewsGrowth: 12.5,
      engagementGrowth: 8.3,
      revenueGrowth: 15.2
    },
    lastUpdated: '2024-01-15T10:00:00Z'
  },
  {
    contentId: '2',
    title: 'MacBook Air M3 First Look',
    type: 'ARTICLE',
    isSponsored: false,
    platforms: ['medium', 'linkedin'],
    performance: {
      views: 12000,
      clicks: 480,
      shares: 120,
      comments: 45,
      likes: 380,
      revenue: 125.75,
      trustScore: 7.9,
      conversionRate: 3.8
    },
    trends: {
      viewsGrowth: -2.1,
      engagementGrowth: 5.7,
      revenueGrowth: 8.9
    },
    lastUpdated: '2024-01-14T15:30:00Z'
  }
];

export default function PerformanceTracking({ contentId }: PerformanceTrackingProps) {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [selectedContent, setSelectedContent] = useState<PerformanceData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = contentId 
        ? MOCK_PERFORMANCE_DATA.filter(item => item.contentId === contentId)
        : MOCK_PERFORMANCE_DATA;
      
      setPerformanceData(data);
      if (data.length > 0) {
        setSelectedContent(data[0]);
      }
      setLoading(false);
    };

    fetchPerformanceData();
  }, [contentId, timeRange]);

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return (
        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTrustScoreBadgeVariant = (score: number) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="neo-loading-spinner mx-auto mb-4"></div>
          <p className="text-white/70">Loading performance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h3 className="neo-heading-3 text-white mb-2">Performance Tracking</h3>
          <p className="neo-text-small text-slate-400">
            Monitor your content performance across all platforms
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex space-x-2">
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <NeoButton
              key={range}
              variant={timeRange === range ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range.toUpperCase()}
            </NeoButton>
          ))}
        </div>
      </div>

      {/* Content Selection */}
      {!contentId && (
        <div className="space-y-4">
          <h4 className="neo-heading-4 text-white">Select Content to Analyze</h4>
          <div className="grid gap-4">
            {performanceData.map((content) => (
              <NeoCard
                key={content.contentId}
                variant={selectedContent?.contentId === content.contentId ? 'elevated' : 'glass'}
                className={`p-4 cursor-pointer transition-all ${
                  selectedContent?.contentId === content.contentId ? 'neo-glow' : 'hover:neo-elevation-1'
                }`}
                onClick={() => setSelectedContent(content)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="neo-heading-4 text-white">{content.title}</h5>
                      <NeoBadge variant="info" size="sm">{content.type}</NeoBadge>
                      {content.isSponsored && (
                        <NeoBadge variant="crystal" size="sm">Sponsored</NeoBadge>
                      )}
                    </div>
                    <p className="neo-text-small text-slate-400 mb-3">
                      {content.platforms.join(', ')} • Last updated: {new Date(content.lastUpdated).toLocaleDateString()}
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-4">
                      <div className="text-center">
                        <p className="neo-text-small text-slate-300">{content.performance.views.toLocaleString()}</p>
                        <p className="neo-text-small text-slate-400">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="neo-text-small text-slate-300">{content.performance.revenue.toLocaleString()}</p>
                        <p className="neo-text-small text-slate-400">Revenue</p>
                      </div>
                      <div className="text-center">
                        <p className={`neo-text-small ${getTrustScoreColor(content.performance.trustScore)}`}>
                          {content.performance.trustScore}/10
                        </p>
                        <p className="neo-text-small text-slate-400">Trust Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Performance Analysis */}
      {selectedContent && (
        <div className="space-y-6">
          {/* Content Header */}
          <NeoCard variant="glass" className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h4 className="neo-heading-4 text-white mb-2">{selectedContent.title}</h4>
                <div className="flex items-center space-x-3">
                  <NeoBadge variant="info" size="sm">{selectedContent.type}</NeoBadge>
                  {selectedContent.isSponsored && (
                    <NeoBadge variant="crystal" size="sm">Sponsored</NeoBadge>
                  )}
                  <NeoBadge 
                    variant={getTrustScoreBadgeVariant(selectedContent.performance.trustScore)}
                    size="sm"
                  >
                    Trust: {selectedContent.performance.trustScore}/10
                  </NeoBadge>
                </div>
              </div>
              <div className="text-right">
                <p className="neo-text-small text-slate-400">Last Updated</p>
                <p className="neo-text-small text-white">{new Date(selectedContent.lastUpdated).toLocaleString()}</p>
              </div>
            </div>
          </NeoCard>

          {/* Performance Metrics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Views */}
            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="neo-heading-4 text-white">Views</h5>
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="neo-heading-2 text-blue-400 mb-2">
                {selectedContent.performance.views.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(selectedContent.trends.viewsGrowth)}
                <span className={`neo-text-small ${selectedContent.trends.viewsGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedContent.trends.viewsGrowth > 0 ? '+' : ''}{selectedContent.trends.viewsGrowth}%
                </span>
              </div>
            </NeoCard>

            {/* Engagement */}
            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="neo-heading-4 text-white">Engagement</h5>
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="neo-heading-2 text-purple-400 mb-2">
                {selectedContent.performance.likes + selectedContent.performance.shares + selectedContent.performance.comments}
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(selectedContent.trends.engagementGrowth)}
                <span className={`neo-text-small ${selectedContent.trends.engagementGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedContent.trends.engagementGrowth > 0 ? '+' : ''}{selectedContent.trends.engagementGrowth}%
                </span>
              </div>
            </NeoCard>

            {/* Revenue */}
            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="neo-heading-4 text-white">Revenue</h5>
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="neo-heading-2 text-green-400 mb-2">
                ${selectedContent.performance.revenue.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(selectedContent.trends.revenueGrowth)}
                <span className={`neo-text-small ${selectedContent.trends.revenueGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedContent.trends.revenueGrowth > 0 ? '+' : ''}{selectedContent.trends.revenueGrowth}%
                </span>
              </div>
            </NeoCard>

            {/* Conversion Rate */}
            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="neo-heading-4 text-white">Conversion</h5>
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="neo-heading-2 text-orange-400 mb-2">
                {selectedContent.performance.conversionRate}%
              </div>
              <p className="neo-text-small text-slate-400">Click-through rate</p>
            </NeoCard>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Engagement Breakdown */}
            <NeoCard variant="glass" className="p-6">
              <h5 className="neo-heading-4 text-white mb-4">Engagement Breakdown</h5>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="neo-text-small text-slate-300">Likes</span>
                    <span className="neo-text-small text-white">{selectedContent.performance.likes.toLocaleString()}</span>
                  </div>
                  <NeoProgress value={(selectedContent.performance.likes / selectedContent.performance.views) * 100} color="purple" size="sm" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="neo-text-small text-slate-300">Shares</span>
                    <span className="neo-text-small text-white">{selectedContent.performance.shares.toLocaleString()}</span>
                  </div>
                  <NeoProgress value={(selectedContent.performance.shares / selectedContent.performance.views) * 100} color="blue" size="sm" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="neo-text-small text-slate-300">Comments</span>
                    <span className="neo-text-small text-white">{selectedContent.performance.comments.toLocaleString()}</span>
                  </div>
                  <NeoProgress value={(selectedContent.performance.comments / selectedContent.performance.views) * 100} color="green" size="sm" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="neo-text-small text-slate-300">Clicks</span>
                    <span className="neo-text-small text-white">{selectedContent.performance.clicks.toLocaleString()}</span>
                  </div>
                  <NeoProgress value={selectedContent.performance.conversionRate} color="orange" size="sm" />
                </div>
              </div>
            </NeoCard>

            {/* Platform Performance */}
            <NeoCard variant="glass" className="p-6">
              <h5 className="neo-heading-4 text-white mb-4">Platform Performance</h5>
              <div className="space-y-4">
                {selectedContent.platforms.map((platform, index) => {
                  const platformViews = Math.floor(selectedContent.performance.views / selectedContent.platforms.length);
                  const platformRevenue = selectedContent.performance.revenue / selectedContent.platforms.length;
                  
                  return (
                    <div key={platform} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{platform.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="neo-text-small text-white capitalize">{platform}</span>
                      </div>
                      <div className="text-right">
                        <p className="neo-text-small text-white">{platformViews.toLocaleString()}</p>
                        <p className="neo-text-small text-slate-400">${platformRevenue.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </NeoCard>
          </div>

          {/* Trust Score Impact */}
          <NeoCard variant="glass" className="p-6">
            <h5 className="neo-heading-4 text-white mb-4">Trust Score Impact</h5>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`text-3xl font-bold ${getTrustScoreColor(selectedContent.performance.trustScore)}`}>
                  {selectedContent.performance.trustScore}
                </div>
                <div>
                  <p className="neo-text-small text-white">Current Trust Score</p>
                  <p className="neo-text-small text-slate-400">Based on content quality and audience engagement</p>
                </div>
              </div>
              <NeoBadge variant={getTrustScoreBadgeVariant(selectedContent.performance.trustScore)}>
                {selectedContent.performance.trustScore >= 8 ? 'Excellent' : 
                 selectedContent.performance.trustScore >= 6 ? 'Good' : 'Needs Improvement'}
              </NeoBadge>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="neo-text-small text-slate-300">Content Quality</span>
                  <span className="neo-text-small text-white">85%</span>
                </div>
                <NeoProgress value={85} color="green" size="sm" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="neo-text-small text-slate-300">Audience Engagement</span>
                  <span className="neo-text-small text-white">72%</span>
                </div>
                <NeoProgress value={72} color="blue" size="sm" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="neo-text-small text-slate-300">Brand Safety</span>
                  <span className="neo-text-small text-white">90%</span>
                </div>
                <NeoProgress value={90} color="purple" size="sm" />
              </div>
            </div>
          </NeoCard>
        </div>
      )}
    </div>
  );
}
