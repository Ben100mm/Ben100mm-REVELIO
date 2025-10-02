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

interface AnalyticsData {
  totalViews: number;
  totalEngagement: number;
  totalClicks: number;
  conversionRate: number;
  roi: number;
  totalSpent: number;
  totalRevenue: number;
  activeCampaigns: number;
  completedCampaigns: number;
  topPerformers: {
    creator: string;
    views: number;
    engagement: number;
    revenue: number;
  }[];
  performanceByPlatform: {
    platform: string;
    views: number;
    engagement: number;
    percentage: number;
  }[];
  monthlyTrends: {
    month: string;
    views: number;
    engagement: number;
    revenue: number;
  }[];
}

interface TimeRange {
  label: string;
  value: string;
  days: number;
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
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
    const mockAnalytics: AnalyticsData = {
      totalViews: 1250000,
      totalEngagement: 85000,
      totalClicks: 32000,
      conversionRate: 8.5,
      roi: 180,
      totalSpent: 125000,
      totalRevenue: 225000,
      activeCampaigns: 8,
      completedCampaigns: 24,
      topPerformers: [
        { creator: 'Sarah Johnson', views: 450000, engagement: 12500, revenue: 45000 },
        { creator: 'Mike Chen', views: 320000, engagement: 8900, revenue: 32000 },
        { creator: 'Emma Rodriguez', views: 280000, engagement: 11200, revenue: 28000 },
        { creator: 'Alex Thompson', views: 200000, engagement: 6800, revenue: 20000 }
      ],
      performanceByPlatform: [
        { platform: 'Instagram', views: 450000, engagement: 15000, percentage: 36 },
        { platform: 'YouTube', views: 380000, engagement: 12000, percentage: 30.4 },
        { platform: 'TikTok', views: 250000, engagement: 18000, percentage: 20 },
        { platform: 'Twitter', views: 170000, engagement: 8500, percentage: 13.6 }
      ],
      monthlyTrends: [
        { month: 'Jan', views: 280000, engagement: 18500, revenue: 45000 },
        { month: 'Feb', views: 320000, engagement: 21000, revenue: 52000 },
        { month: 'Mar', views: 290000, engagement: 19500, revenue: 48000 },
        { month: 'Apr', views: 360000, engagement: 24500, revenue: 60000 }
      ]
    };

    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, [selectedTimeRange]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        currentViews: prev.currentViews + Math.floor(Math.random() * 10),
        currentEngagement: prev.currentEngagement + Math.floor(Math.random() * 3),
        currentClicks: prev.currentClicks + Math.floor(Math.random() * 2)
      }));
    }, 2000);

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
          <h2 className="neo-heading-2 neo-text-glow">Analytics Dashboard</h2>
          <p className="neo-text-body text-slate-300">Real-time performance tracking</p>
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
          <p className="neo-text-small text-slate-400">Last 2 minutes</p>
        </NeoCard>

        <NeoCard variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="neo-heading-4 text-white">Live Engagement</h3>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className="neo-heading-2 text-blue-400 mb-2">
            +{realTimeData.currentEngagement}
          </div>
          <p className="neo-text-small text-slate-400">Last 2 minutes</p>
        </NeoCard>

        <NeoCard variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="neo-heading-4 text-white">Live Clicks</h3>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          <div className="neo-heading-2 text-purple-400 mb-2">
            +{realTimeData.currentClicks}
          </div>
          <p className="neo-text-small text-slate-400">Last 2 minutes</p>
        </NeoCard>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatNumber(analytics?.totalViews || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Views</div>
          <NeoProgress value={85} color="blue" variant="energy" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatNumber(analytics?.totalEngagement || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Engagement</div>
          <NeoProgress value={92} color="green" variant="crystal" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {analytics?.conversionRate || 0}%
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Conversion Rate</div>
          <NeoProgress value={analytics?.conversionRate || 0} color="purple" variant="glow" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {analytics?.roi || 0}%
          </div>
          <div className="neo-text-body text-slate-300 mb-4">ROI</div>
          <NeoProgress value={Math.min(analytics?.roi || 0, 100)} color="orange" variant="energy" />
        </NeoCard>
      </div>

      {/* Revenue & ROI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NeoCard variant="glass" className="p-6">
          <h3 className="neo-heading-4 text-white mb-6">Revenue Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="neo-text-body text-slate-300">Total Spent</span>
              <span className="neo-text-body text-red-400 font-medium">
                ${analytics?.totalSpent?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="neo-text-body text-slate-300">Total Revenue</span>
              <span className="neo-text-body text-green-400 font-medium">
                ${analytics?.totalRevenue?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="neo-text-body text-slate-300">Net Profit</span>
              <span className="neo-text-body text-white font-medium">
                ${((analytics?.totalRevenue || 0) - (analytics?.totalSpent || 0)).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="neo-text-body text-slate-300">ROI</span>
              <span className="neo-text-body text-blue-400 font-medium">
                {analytics?.roi}%
              </span>
            </div>
          </div>
        </NeoCard>

        <NeoCard variant="glass" className="p-6">
          <h3 className="neo-heading-4 text-white mb-6">Campaign Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="neo-text-body text-slate-300">Active Campaigns</span>
              <span className="neo-text-body text-blue-400 font-medium">
                {analytics?.activeCampaigns}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="neo-text-body text-slate-300">Completed Campaigns</span>
              <span className="neo-text-body text-green-400 font-medium">
                {analytics?.completedCampaigns}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="neo-text-body text-slate-300">Success Rate</span>
              <span className="neo-text-body text-white font-medium">
                {Math.round(((analytics?.completedCampaigns || 0) / 
                  ((analytics?.activeCampaigns || 0) + (analytics?.completedCampaigns || 0))) * 100)}%
              </span>
            </div>
          </div>
        </NeoCard>
      </div>

      {/* Top Performers */}
      <NeoCard variant="elevated" className="p-6">
        <h3 className="neo-heading-4 text-white mb-6">Top Performing Creators</h3>
        <div className="space-y-4">
          {analytics?.topPerformers.map((performer, index) => (
            <div key={index} className="flex items-center justify-between p-4 neo-glass rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">
                    {performer.creator.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="neo-text-body text-white font-medium">{performer.creator}</h4>
                  <p className="neo-text-small text-slate-400">
                    {formatNumber(performer.views)} views • {performer.engagement} engagement
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="neo-text-body text-green-400 font-medium">
                  ${performer.revenue.toLocaleString()}
                </div>
                <div className="neo-text-small text-slate-400">Revenue</div>
              </div>
            </div>
          ))}
        </div>
      </NeoCard>

      {/* Platform Performance */}
      <NeoCard variant="glass" className="p-6">
        <h3 className="neo-heading-4 text-white mb-6">Performance by Platform</h3>
        <div className="space-y-4">
          {analytics?.performanceByPlatform.map((platform, index) => (
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
              </div>
            </div>
          ))}
        </div>
      </NeoCard>

      {/* Monthly Trends */}
      <NeoCard variant="elevated" className="p-6">
        <h3 className="neo-heading-4 text-white mb-6">Monthly Performance Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {analytics?.monthlyTrends.map((trend, index) => (
            <div key={index} className="neo-glass p-4 rounded-xl text-center">
              <div className="neo-heading-4 text-white mb-2">{trend.month}</div>
              <div className="neo-text-body text-blue-400 mb-1">
                {formatNumber(trend.views)} views
              </div>
              <div className="neo-text-small text-slate-400 mb-2">
                {formatNumber(trend.engagement)} engagement
              </div>
              <div className="neo-text-body text-green-400">
                ${trend.revenue.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </NeoCard>
    </div>
  );
}
