'use client';

import { useState, useEffect } from 'react';
import { creatorsAPI, contentAPI, analyticsAPI } from '@/services/api';

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

export default function CreatorDashboard() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [content, setContent] = useState<Content[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get user profile to find creator ID
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      
      const user = JSON.parse(userStr);
      
      // Find creator by user ID (this would need to be implemented in the API)
      const creatorsResponse = await creatorsAPI.getCreators();
      const userCreator = creatorsResponse.data.data.find((c: any) => c.user.email === user.email);
      
      if (userCreator) {
        setCreator(userCreator);
        
        // Load creator content
        const contentResponse = await creatorsAPI.getCreatorContent(userCreator.id);
        setContent(contentResponse.data.data);
        
        // Load analytics
        const analyticsResponse = await analyticsAPI.getCreatorAnalytics(userCreator.id);
        setAnalytics(analyticsResponse.data.data);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Creator Profile Not Found</h2>
          <p className="text-gray-600">Please complete your creator profile setup.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
      <div className="absolute inset-0 bg-mesh opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-xl float-element"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-lg float-element" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="card-glass backdrop-blur-2xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative">
                  <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-3d-lg">
                    <span className="text-white font-bold text-xl">
                      {creator.displayName.charAt(0)}
                    </span>
                  </div>
                  {creator.isVerified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="ml-6">
                  <h1 className="heading-4 text-slate-900">{creator.displayName}</h1>
                  <p className="text-slate-600 font-medium">@{creator.username}</p>
                  {creator.isVerified && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100/80 text-green-700 border border-green-200/50 shadow-3d-sm mt-2">
                      Verified Creator
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="btn-secondary">Settings</button>
                <button className="btn-primary group">
                  <span className="relative z-10">Create Content</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="card-glass backdrop-blur-xl rounded-2xl p-2">
            <nav className="flex space-x-2">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'content', name: 'Content', icon: '📝' },
                { id: 'analytics', name: 'Analytics', icon: '📈' },
                { id: 'earnings', name: 'Earnings', icon: '💰' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-item flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white/80 text-primary-600 shadow-3d-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card-elevated group">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-3d-lg group-hover:shadow-glow-primary transition-all duration-500 transform group-hover:scale-110">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-slate-600">Total Content</p>
                    <p className="text-2xl font-bold text-slate-900">{creator._count.content}</p>
                  </div>
                </div>
              </div>

              <div className="card-elevated group">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-3d-lg group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-500 transform group-hover:scale-110">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-slate-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${analytics?.totals.earnings.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-elevated group">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-3d-lg group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500 transform group-hover:scale-110">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-slate-600">Total Views</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics?.totals.views.toLocaleString() || '0'}</p>
                  </div>
                </div>
              </div>

              <div className="card-elevated group">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-3d-lg group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all duration-500 transform group-hover:scale-110">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-slate-600">Total Clicks</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics?.totals.clicks.toLocaleString() || '0'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Content */}
            <div className="card-elevated">
              <h3 className="heading-6 text-slate-900 mb-6">Recent Content</h3>
              <div className="space-y-4">
                {content.slice(0, 5).map((item) => (
                  <div key={item.id} className="group flex items-center justify-between p-6 bg-gradient-to-r from-white/50 to-slate-50/50 backdrop-blur-sm border border-white/50 rounded-xl shadow-3d-sm hover:shadow-3d-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors duration-300">{item.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        {item.type} • {item.status} • {new Date(item.publishedAt).toLocaleDateString()}
                        {item.isSponsored && (
                          <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300/50 shadow-3d-sm">
                            Sponsored
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold text-slate-600">{item._count.performance} views</span>
                      <button className="btn-ghost text-sm px-4 py-2 group-hover:bg-primary-100 group-hover:text-primary-600 transition-all duration-300">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
              <button className="btn-primary">Create New Content</button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {content.map((item) => (
                <div key={item.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.type} • {item.status} • Published {new Date(item.publishedAt).toLocaleDateString()}
                      </p>
                      {item.isSponsored && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                          Sponsored Content
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="btn-secondary text-sm">Edit</button>
                      <button className="btn-primary text-sm">View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-semibold">{analytics?.totals.views.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Clicks</span>
                    <span className="font-semibold">{analytics?.totals.clicks.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Click Rate</span>
                    <span className="font-semibold">
                      {analytics?.totals.views > 0 
                        ? ((analytics.totals.clicks / analytics.totals.views) * 100).toFixed(2) + '%'
                        : '0%'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Earnings</h3>
                <div className="space-y-3">
                  {analytics?.earnings.slice(0, 5).map((earning, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{earning.description}</p>
                        <p className="text-xs text-gray-500">{new Date(earning.date).toLocaleDateString()}</p>
                      </div>
                      <span className="font-semibold text-green-600">+${Number(earning.amount).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Earnings</h2>
            
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Earnings History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {analytics?.earnings.map((earning, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(earning.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {earning.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {earning.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          +${Number(earning.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
