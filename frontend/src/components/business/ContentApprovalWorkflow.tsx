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
  creator: string;
  creatorAvatar: string;
  type: 'video' | 'image' | 'article' | 'story';
  platform: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision_requested';
  submittedAt: string;
  dueDate: string;
  previewUrl: string;
  description: string;
  tags: string[];
  metrics?: {
    views: number;
    engagement: number;
    clicks: number;
  };
  feedback?: {
    comments: string;
    rating: number;
    requestedChanges: string[];
  };
}

interface ApprovalStats {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  averageApprovalTime: number;
  approvalRate: number;
}

export default function ContentApprovalWorkflow() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [stats, setStats] = useState<ApprovalStats | null>(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('submitted');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({
    comments: '',
    rating: 0,
    requestedChanges: [] as string[]
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockContentItems: ContentItem[] = [
      {
        id: '1',
        title: 'iPhone 15 Pro Unboxing & First Impressions',
        creator: 'Sarah Johnson',
        creatorAvatar: '/avatars/sarah.jpg',
        type: 'video',
        platform: 'YouTube',
        status: 'pending',
        submittedAt: '2024-01-20T10:30:00Z',
        dueDate: '2024-01-25T18:00:00Z',
        previewUrl: '/previews/iphone15-unboxing.jpg',
        description: 'Comprehensive unboxing and first impressions of the new iPhone 15 Pro, covering design, features, and initial performance.',
        tags: ['iPhone', 'Apple', 'Unboxing', 'Review', 'Tech'],
        metrics: {
          views: 0,
          engagement: 0,
          clicks: 0
        }
      },
      {
        id: '2',
        title: 'MacBook Air M3 Performance Test',
        creator: 'Mike Chen',
        creatorAvatar: '/avatars/mike.jpg',
        type: 'article',
        platform: 'Blog',
        status: 'revision_requested',
        submittedAt: '2024-01-19T14:20:00Z',
        dueDate: '2024-01-24T18:00:00Z',
        previewUrl: '/previews/macbook-air-test.jpg',
        description: 'Detailed performance analysis of the MacBook Air M3, including benchmarks, battery life, and real-world usage scenarios.',
        tags: ['MacBook', 'Apple', 'Performance', 'Review', 'Laptop'],
        feedback: {
          comments: 'Please add more specific benchmark comparisons with previous models and include battery life testing under different workloads.',
          rating: 3,
          requestedChanges: ['Add benchmark comparisons', 'Include battery life tests', 'Add thermal performance data']
        }
      },
      {
        id: '3',
        title: 'Apple Watch Series 9 Fitness Features',
        creator: 'Emma Rodriguez',
        creatorAvatar: '/avatars/emma.jpg',
        type: 'video',
        platform: 'Instagram',
        status: 'approved',
        submittedAt: '2024-01-18T09:15:00Z',
        dueDate: '2024-01-23T18:00:00Z',
        previewUrl: '/previews/apple-watch-fitness.jpg',
        description: 'Showcase of the new fitness features in Apple Watch Series 9, including workout tracking and health monitoring capabilities.',
        tags: ['Apple Watch', 'Fitness', 'Health', 'Wearable', 'Review'],
        metrics: {
          views: 45000,
          engagement: 3200,
          clicks: 890
        }
      },
      {
        id: '4',
        title: 'iPad Pro M2 Creative Workflow',
        creator: 'Alex Thompson',
        creatorAvatar: '/avatars/alex.jpg',
        type: 'video',
        platform: 'TikTok',
        status: 'rejected',
        submittedAt: '2024-01-17T16:45:00Z',
        dueDate: '2024-01-22T18:00:00Z',
        previewUrl: '/previews/ipad-pro-creative.jpg',
        description: 'Creative workflow demonstration using iPad Pro M2 for digital art and video editing.',
        tags: ['iPad', 'Creative', 'Art', 'Video Editing', 'Workflow'],
        feedback: {
          comments: 'Content does not align with brand guidelines. Please focus more on productivity features rather than creative applications.',
          rating: 2,
          requestedChanges: ['Focus on productivity', 'Align with brand guidelines', 'Reduce creative emphasis']
        }
      }
    ];

    const mockStats: ApprovalStats = {
      totalPending: 8,
      totalApproved: 24,
      totalRejected: 3,
      averageApprovalTime: 2.5,
      approvalRate: 89
    };

    setTimeout(() => {
      setContentItems(mockContentItems);
      setFilteredItems(mockContentItems);
      setStats(mockStats);
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
        case 'submitted':
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        case 'due':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'creator':
          return a.creator.localeCompare(b.creator);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    setFilteredItems(sorted);
  };

  const handleApprove = (itemId: string) => {
    setContentItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'approved' as const }
          : item
      )
    );
    setFilteredItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'approved' as const }
          : item
      )
    );
    setShowApprovalModal(false);
  };

  const handleReject = (itemId: string) => {
    setContentItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'rejected' as const, feedback }
          : item
      )
    );
    setFilteredItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'rejected' as const, feedback }
          : item
      )
    );
    setShowApprovalModal(false);
    setFeedback({ comments: '', rating: 0, requestedChanges: [] });
  };

  const handleRequestRevision = (itemId: string) => {
    setContentItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'revision_requested' as const, feedback }
          : item
      )
    );
    setFilteredItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'revision_requested' as const, feedback }
          : item
      )
    );
    setShowApprovalModal(false);
    setFeedback({ comments: '', rating: 0, requestedChanges: [] });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'revision_requested': return 'info';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'image': return '🖼️';
      case 'article': return '📄';
      case 'story': return '📱';
      default: return '📄';
    }
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
          <h2 className="neo-heading-2 neo-text-glow">Content Approval Workflow</h2>
          <p className="neo-text-body text-slate-300">Review and feedback system</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600"
          >
            <option value="submitted">Sort by Submitted</option>
            <option value="due">Sort by Due Date</option>
            <option value="creator">Sort by Creator</option>
            <option value="title">Sort by Title</option>
          </select>
          <NeoButton variant="accent">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </NeoButton>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {stats?.totalPending}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Pending Review</div>
          <NeoProgress value={75} color="orange" variant="energy" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {stats?.totalApproved}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Approved</div>
          <NeoProgress value={92} color="green" variant="crystal" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {stats?.totalRejected}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Rejected</div>
          <NeoProgress value={15} color="red" variant="glow" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {stats?.approvalRate}%
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Approval Rate</div>
          <NeoProgress value={stats?.approvalRate || 0} color="blue" variant="energy" />
        </NeoCard>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {[
          { id: 'all', label: 'All', count: contentItems.length },
          { id: 'pending', label: 'Pending', count: contentItems.filter(item => item.status === 'pending').length },
          { id: 'revision_requested', label: 'Revision', count: contentItems.filter(item => item.status === 'revision_requested').length },
          { id: 'approved', label: 'Approved', count: contentItems.filter(item => item.status === 'approved').length },
          { id: 'rejected', label: 'Rejected', count: contentItems.filter(item => item.status === 'rejected').length }
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
              {/* Preview */}
              <div className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{getTypeIcon(item.type)}</span>
              </div>

              {/* Content Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="neo-heading-4 text-white mb-1">{item.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>{item.creator}</span>
                      <span>•</span>
                      <span>{item.platform}</span>
                      <span>•</span>
                      <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <NeoBadge variant={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
                    </NeoBadge>
                    <NeoButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowApprovalModal(true);
                      }}
                    >
                      Review
                    </NeoButton>
                  </div>
                </div>

                <p className="neo-text-small text-slate-300 mb-3">{item.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, index) => (
                    <NeoBadge key={index} variant="secondary" size="sm">
                      {tag}
                    </NeoBadge>
                  ))}
                </div>

                {item.feedback && (
                  <div className="neo-glass p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="neo-text-small text-slate-400">Feedback:</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < item.feedback!.rating ? 'text-yellow-400' : 'text-slate-600'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="neo-text-small text-slate-300 mb-2">{item.feedback.comments}</p>
                    {item.feedback.requestedChanges.length > 0 && (
                      <div>
                        <span className="neo-text-small text-slate-400">Requested Changes:</span>
                        <ul className="list-disc list-inside text-sm text-slate-300 mt-1">
                          {item.feedback.requestedChanges.map((change, index) => (
                            <li key={index}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {item.metrics && (
                  <div className="flex space-x-6 text-sm text-slate-400">
                    <span>{item.metrics.views.toLocaleString()} views</span>
                    <span>{item.metrics.engagement.toLocaleString()} engagement</span>
                    <span>{item.metrics.clicks.toLocaleString()} clicks</span>
                  </div>
                )}
              </div>
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Approval Modal */}
      <NeoModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title={`Review: ${selectedItem?.title}`}
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="neo-glass p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">
                    {selectedItem.creator.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="neo-text-body text-white font-medium">{selectedItem.creator}</h4>
                  <p className="neo-text-small text-slate-400">{selectedItem.platform}</p>
                </div>
              </div>
              <p className="neo-text-small text-slate-300">{selectedItem.description}</p>
            </div>

            <div>
              <label className="neo-text-body text-white mb-2 block">Comments</label>
              <NeoInput
                value={feedback.comments}
                onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
                placeholder="Add your feedback..."
                variant="glass"
                multiline
                rows={3}
              />
            </div>

            <div>
              <label className="neo-text-body text-white mb-2 block">Rating</label>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeedback(prev => ({ ...prev, rating: i + 1 }))}
                    className={`text-2xl ${i < feedback.rating ? 'text-yellow-400' : 'text-slate-600'} hover:text-yellow-400 transition-colors`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <NeoButton 
                variant="success" 
                onClick={() => handleApprove(selectedItem.id)}
                className="flex-1"
              >
                ✅ Approve
              </NeoButton>
              <NeoButton 
                variant="warning" 
                onClick={() => handleRequestRevision(selectedItem.id)}
                className="flex-1"
              >
                🔄 Request Revision
              </NeoButton>
              <NeoButton 
                variant="error" 
                onClick={() => handleReject(selectedItem.id)}
                className="flex-1"
              >
                ❌ Reject
              </NeoButton>
            </div>
          </div>
        )}
      </NeoModal>
    </div>
  );
}
