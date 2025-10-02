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

interface PerformanceData {
  totalViews: number;
  totalEngagement: number;
  totalClicks: number;
  averageEngagementRate: number;
  followerGrowth: number;
  topContent: {
    title: string;
    views: number;
    engagement: number;
    platform: string;
  }[];
  platformPerformance: {
    platform: string;
    views: number;
    engagement: number;
    followers: number;
    percentage: number;
  }[];
  monthlyTrends: {
    month: string;
    views: number;
    engagement: number;
    followers: number;
  }[];
  audienceInsights: {
    ageGroups: { age: string; percentage: number }[];
    topCountries: { country: string; percentage: number }[];
    genderDistribution: { gender: string; percentage: number }[];
  };
}

interface TimeRange {
  label: string;
  value: string;
  days: number;
}

export default function PerformanceAnalytics() {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('views');
  const [loading, setLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState({
    currentViews: 0,
    currentEngagement: 0,
    currentClicks: 0
  });

  const timeRanges: TimeRange[] = [
    { label: 'Last 7 days', value: '7d', days: 7 },
    { label: 'Last 30 days', value: '30d', days: 30 },
    { label: 'Last 90 days', value: '90d', days: 90 },
    { label: 'Last year', value: '1y', days: 365 }
  ];

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockPerformanceData: PerformanceData = {
      totalViews: 1250000,
      totalEngagement: 85000,
      totalClicks: 32000,
      averageEngagementRate: 8.5,
      followerGrowth: 12.5,
      topContent: [
        { title: 'iPhone 15 Pro Unboxing', views: 450000, engagement: 12500, platform: 'YouTube' },
        { title: 'MacBook Air M3 Review', views: 320000, engagement: 8900, platform: 'YouTube' },
        { title: 'Apple Watch Fitness Features', views: 280000, engagement: 11200, platform: 'Instagram' },
        { title: 'iPad Pro Creative Workflow', views: 200000, engagement: 6800, platform: 'TikTok' }
      ],
      platformPerformance: [
        { platform: 'YouTube', views: 650000, engagement: 18000, followers: 125000, percentage: 52 },
        { platform: 'Instagram', views: 350000, engagement: 25000, followers: 89000, percentage: 28 },
        { platform: 'TikTok', views: 200000, engagement: 15000, followers: 45000, percentage: 16 },
        { platform: 'Twitter', views: 50000, engagement: 5000, followers: 25000, percentage: 4 }
      ],
      monthlyTrends: [
        { month: 'Jan', views: 280000, engagement: 18500, followers: 120000 },
        { month: 'Feb', views: 320000, engagement: 21000, followers: 125000 },
        { month: 'Mar', views: 290000, engagement: 19500, followers: 130000 },
        { month: 'Apr', views: 360000, engagement: 24500, followers: 135000 }
      ],
      audienceInsights: {
        ageGroups: [
          { age: '18-24', percentage: 35 },
          { age: '25-34', percentage: 40 },
          { age: '35-44', percentage: 20 },
          { age: '45+', percentage: 5 }
        ],
        topCountries: [
          { country: 'United States', percentage: 45 },
          { country: 'United Kingdom', percentage: 15 },
          { country: 'Canada', percentage: 12 },
          { country: 'Australia', percentage: 8 },
          { country: 'Germany', percentage: 7 },
          { country: 'Others', percentage: 13 }
        ],
        genderDistribution: [
          { gender: 'Male', percentage: 60 },
          { gender: 'Female', percentage: 35 },
          { gender: 'Other', percentage: 5 }
        ]
      }
    };

    setTimeout(() => {
      setPerformanceData(mockPerformanceData);
      setLoading(false);
    }, 1000);
  }, [selectedTimeRange]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        currentViews: prev.currentViews + Math.floor(Math.random() * 5),
        currentEngagement: prev.currentEngagement + Math.floor(Math.random() * 2),
        currentClicks: prev.currentClicks + Math.floor(Math.random() * 1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="neo-heading-2 neo-text-glow">Performance Analytics</h2>
          <p className="neo-text-body text-slate-300">Track your content performance and growth</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <NeoButton variant="accent">
            📊 Export Report
          </NeoButton>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NeoCard variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="neo-heading-4 text-white">Live Views</h3>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="neo-heading-2 text-green-400 mb-2">
            +{realTimeData.currentViews}
          </div>
          <p className="neo-text-small text-slate-400">Last 3 minutes</p>
        </NeoCard>

        <NeoCard variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="neo-heading-4 text-white">Live Engagement</h3>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className="neo-heading-2 text-blue-400 mb-2">
            +{realTimeData.currentEngagement}
          </div>
          <p className="neo-text-small text-slate-400">Last 3 minutes</p>
        </NeoCard>

        <NeoCard variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="neo-heading-4 text-white">Live Clicks</h3>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          <div className="neo-heading-2 text-purple-400 mb-2">
            +{realTimeData.currentClicks}
          </div>
          <p className="neo-text-small text-slate-400">Last 3 minutes</p>
        </NeoCard>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatNumber(performanceData?.totalViews || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Views</div>
          <NeoProgress value={85} color="blue" variant="energy" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatNumber(performanceData?.totalEngagement || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Engagement</div>
          <NeoProgress value={92} color="green" variant="crystal" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {performanceData?.averageEngagementRate || 0}%
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Engagement Rate</div>
          <NeoProgress value={performanceData?.averageEngagementRate || 0} color="purple" variant="glow" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            +{performanceData?.followerGrowth || 0}%
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Follower Growth</div>
          <NeoProgress value={Math.min(performanceData?.followerGrowth || 0, 100)} color="orange" variant="energy" />
        </NeoCard>
      </div>

      {/* Top Performing Content */}
      <NeoCard variant="elevated" className="p-6">
        <h3 className="neo-heading-4 text-white mb-6">Top Performing Content</h3>
        <div className="space-y-4">
          {performanceData?.topContent.map((content, index) => (
            <div key={index} className="flex items-center justify-between p-4 neo-glass rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">#{index + 1}</span>
                </div>
                <div>
                  <h4 className="neo-text-body text-white font-medium">{content.title}</h4>
                  <p className="neo-text-small text-slate-400">{content.platform}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="neo-text-body text-blue-400 font-medium">
                    {formatNumber(content.views)}
                  </div>
                  <div className="neo-text-small text-slate-400">Views</div>
                </div>
                <div className="text-right">
                  <div className="neo-text-body text-green-400 font-medium">
                    {formatNumber(content.engagement)}
                  </div>
                  <div className="neo-text-small text-slate-400">Engagement</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NeoCard>

      {/* Platform Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NeoCard variant="glass" className="p-6">
          <h3 className="neo-heading-4 text-white mb-6">Platform Performance</h3>
          <div className="space-y-4">
            {performanceData?.platformPerformance.map((platform, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="neo-text-body text-white font-medium">{platform.platform}</span>
                  <span className="neo-text-body text-slate-300">{platform.percentage}%</span>
                </div>
                <NeoProgress 
                  value={platform.percentage} 
                  color={index === 0 ? 'blue' : index === 1 ? 'green' : index === 2 ? 'purple' : 'orange'} 
                  variant="energy" 
                />
                <div className="flex justify-between text-sm text-slate-400">
                  <span>{formatNumber(platform.views)} views</span>
                  <span>{formatNumber(platform.engagement)} engagement</span>
                  <span>{formatNumber(platform.followers)} followers</span>
                </div>
              </div>
            ))}
          </div>
        </NeoCard>

        <NeoCard variant="glass" className="p-6">
          <h3 className="neo-heading-4 text-white mb-6">Monthly Growth Trends</h3>
          <div className="space-y-4">
            {performanceData?.monthlyTrends.map((trend, index) => (
              <div key={index} className="neo-glass p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="neo-text-body text-white font-medium">{trend.month}</span>
                  <span className="neo-text-small text-slate-400">
                    {formatNumber(trend.followers)} followers
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Views:</span>
                    <span className="text-white ml-2">{formatNumber(trend.views)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Engagement:</span>
                    <span className="text-white ml-2">{formatNumber(trend.engagement)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </NeoCard>
      </div>

      {/* Audience Insights */}
      <NeoCard variant="elevated" className="p-6">
        <h3 className="neo-heading-4 text-white mb-6">Audience Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="neo-text-body text-white font-medium mb-4">Age Groups</h4>
            <div className="space-y-2">
              {performanceData?.audienceInsights.ageGroups.map((group, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="neo-text-small text-slate-300">{group.age}</span>
                  <span className="neo-text-small text-white">{group.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="neo-text-body text-white font-medium mb-4">Top Countries</h4>
            <div className="space-y-2">
              {performanceData?.audienceInsights.topCountries.map((country, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="neo-text-small text-slate-300">{country.country}</span>
                  <span className="neo-text-small text-white">{country.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="neo-text-body text-white font-medium mb-4">Gender Distribution</h4>
            <div className="space-y-2">
              {performanceData?.audienceInsights.genderDistribution.map((gender, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="neo-text-small text-slate-300">{gender.gender}</span>
                  <span className="neo-text-small text-white">{gender.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </NeoCard>
    </div>
  );
}
