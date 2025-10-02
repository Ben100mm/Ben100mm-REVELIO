'use client';

import { useState, useEffect } from 'react';
import { 
  NeoCard, 
  NeoButton, 
  NeoBadge,
  NeoProgress,
  NeoModal,
  NeoInput
} from '@/components/neo-materialism';

interface EarningsData {
  id: string;
  type: 'CPM' | 'CPC' | 'CPV' | 'REVENUE_SHARE' | 'BONUS' | 'COMMISSION';
  amount: number;
  description: string;
  contentId?: string;
  contentTitle?: string;
  date: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  source: 'INDEPENDENT' | 'SPONSORED' | 'BONUS';
}

interface PayoutData {
  id: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  method: 'BANK_TRANSFER' | 'PAYPAL' | 'CRYPTO' | 'ESCROW';
  requestedAt: string;
  processedAt?: string;
  description: string;
}

interface EscrowData {
  id: string;
  contentId: string;
  contentTitle: string;
  amount: number;
  status: 'HELD' | 'RELEASED' | 'DISPUTED' | 'REFUNDED';
  releaseConditions: string[];
  brandName: string;
  createdAt: string;
  releaseDate?: string;
}

const MOCK_EARNINGS: EarningsData[] = [
  {
    id: '1',
    type: 'REVENUE_SHARE',
    amount: 1250.75,
    description: 'Performance-based earnings from iPhone 15 Pro Review',
    contentId: '1',
    contentTitle: 'iPhone 15 Pro Review',
    date: '2024-01-15T10:00:00Z',
    status: 'COMPLETED',
    source: 'INDEPENDENT'
  },
  {
    id: '2',
    type: 'BONUS',
    amount: 500.00,
    description: 'Performance bonus for exceeding engagement targets',
    contentId: '1',
    contentTitle: 'iPhone 15 Pro Review',
    date: '2024-01-15T10:00:00Z',
    status: 'COMPLETED',
    source: 'SPONSORED'
  },
  {
    id: '3',
    type: 'CPM',
    amount: 320.50,
    description: 'CPM earnings from MacBook Air M3 First Look',
    contentId: '2',
    contentTitle: 'MacBook Air M3 First Look',
    date: '2024-01-14T15:30:00Z',
    status: 'PENDING',
    source: 'INDEPENDENT'
  },
  {
    id: '4',
    type: 'COMMISSION',
    amount: 850.00,
    description: 'Sponsored content commission from TechCorp campaign',
    contentId: '3',
    contentTitle: 'Tech Product Launch Campaign',
    date: '2024-01-10T09:00:00Z',
    status: 'PROCESSING',
    source: 'SPONSORED'
  }
];

const MOCK_PAYOUTS: PayoutData[] = [
  {
    id: '1',
    amount: 1750.75,
    status: 'COMPLETED',
    method: 'BANK_TRANSFER',
    requestedAt: '2024-01-10T10:00:00Z',
    processedAt: '2024-01-12T14:30:00Z',
    description: 'Monthly earnings payout'
  },
  {
    id: '2',
    amount: 850.00,
    status: 'PROCESSING',
    method: 'ESCROW',
    requestedAt: '2024-01-15T10:00:00Z',
    description: 'Sponsored content escrow release'
  },
  {
    id: '3',
    amount: 500.00,
    status: 'PENDING',
    method: 'PAYPAL',
    requestedAt: '2024-01-16T09:00:00Z',
    description: 'Performance bonus payout'
  }
];

const MOCK_ESCROW: EscrowData[] = [
  {
    id: '1',
    contentId: '3',
    contentTitle: 'Tech Product Launch Campaign',
    amount: 5000.00,
    status: 'HELD',
    releaseConditions: [
      'Content meets brand guidelines',
      'Minimum 10K views achieved',
      'Engagement rate above 5%',
      'Brand approval received'
    ],
    brandName: 'TechCorp',
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: '2',
    contentId: '4',
    contentTitle: 'Sustainable Fashion Awareness',
    amount: 3000.00,
    status: 'RELEASED',
    releaseConditions: [
      'Content meets brand guidelines',
      'Minimum 5K views achieved',
      'Engagement rate above 4%',
      'Brand approval received'
    ],
    brandName: 'EcoStyle',
    createdAt: '2024-01-05T09:00:00Z',
    releaseDate: '2024-01-12T15:00:00Z'
  }
];

export default function EarningsDashboard() {
  const [earnings, setEarnings] = useState<EarningsData[]>([]);
  const [payouts, setPayouts] = useState<PayoutData[]>([]);
  const [escrowData, setEscrowData] = useState<EscrowData[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'earnings' | 'payouts' | 'escrow'>('overview');
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutForm, setPayoutForm] = useState({
    amount: '',
    method: 'BANK_TRANSFER',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEarnings(MOCK_EARNINGS);
      setPayouts(MOCK_PAYOUTS);
      setEscrowData(MOCK_ESCROW);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getEarningsTypeIcon = (type: string) => {
    const icons = {
      'CPM': '👁️',
      'CPC': '🖱️',
      'CPV': '▶️',
      'REVENUE_SHARE': '📈',
      'BONUS': '🎁',
      'COMMISSION': '💰'
    };
    return icons[type as keyof typeof icons] || '💵';
  };

  const getEarningsTypeColor = (type: string) => {
    const colors = {
      'CPM': 'blue',
      'CPC': 'purple',
      'CPV': 'green',
      'REVENUE_SHARE': 'crystal',
      'BONUS': 'warning',
      'COMMISSION': 'success'
    };
    return colors[type as keyof typeof colors] || 'info';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'PENDING': 'warning',
      'PROCESSING': 'info',
      'COMPLETED': 'success',
      'CANCELLED': 'error',
      'FAILED': 'error',
      'HELD': 'warning',
      'RELEASED': 'success',
      'DISPUTED': 'error',
      'REFUNDED': 'secondary'
    };
    return colors[status as keyof typeof colors] || 'info';
  };

  const getTotalEarnings = () => {
    return earnings.reduce((total, earning) => {
      if (earning.status === 'COMPLETED') {
        return total + earning.amount;
      }
      return total;
    }, 0);
  };

  const getPendingEarnings = () => {
    return earnings.reduce((total, earning) => {
      if (earning.status === 'PENDING' || earning.status === 'PROCESSING') {
        return total + earning.amount;
      }
      return total;
    }, 0);
  };

  const getEscrowAmount = () => {
    return escrowData.reduce((total, escrow) => {
      if (escrow.status === 'HELD') {
        return total + escrow.amount;
      }
      return total;
    }, 0);
  };

  const handlePayoutRequest = async () => {
    if (!payoutForm.amount || !payoutForm.method) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPayout: PayoutData = {
      id: Date.now().toString(),
      amount: parseFloat(payoutForm.amount),
      status: 'PENDING',
      method: payoutForm.method as any,
      requestedAt: new Date().toISOString(),
      description: payoutForm.description || 'Manual payout request'
    };
    
    setPayouts(prev => [newPayout, ...prev]);
    setPayoutForm({ amount: '', method: 'BANK_TRANSFER', description: '' });
    setIsPayoutModalOpen(false);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="neo-loading-spinner mx-auto mb-4"></div>
          <p className="text-white/70">Loading earnings data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h3 className="neo-heading-3 text-white mb-2">Earnings & Payouts</h3>
          <p className="neo-text-small text-slate-400">
            Track your earnings and manage payouts
          </p>
        </div>
        
        <NeoButton 
          variant="primary" 
          onClick={() => setIsPayoutModalOpen(true)}
          disabled={getPendingEarnings() === 0}
        >
          Request Payout
        </NeoButton>
      </div>

      {/* Navigation Tabs */}
      <div className="neo-glass p-2 rounded-2xl">
        <div className="flex space-x-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'payouts', label: 'Payouts' },
            { id: 'escrow', label: 'Escrow' }
          ].map((tab) => (
            <NeoButton
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex-1"
            >
              {tab.label}
            </NeoButton>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="neo-heading-4 text-white">Total Earnings</h4>
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="neo-heading-2 text-green-400 mb-2">
                ${getTotalEarnings().toLocaleString()}
              </div>
              <p className="neo-text-small text-slate-400">All time earnings</p>
            </NeoCard>

            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="neo-heading-4 text-white">Pending</h4>
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="neo-heading-2 text-yellow-400 mb-2">
                ${getPendingEarnings().toLocaleString()}
              </div>
              <p className="neo-text-small text-slate-400">Awaiting processing</p>
            </NeoCard>

            <NeoCard variant="elevated" glow className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="neo-heading-4 text-white">Escrow</h4>
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="neo-heading-2 text-blue-400 mb-2">
                ${getEscrowAmount().toLocaleString()}
              </div>
              <p className="neo-text-small text-slate-400">Held in escrow</p>
            </NeoCard>
          </div>

          {/* Recent Activity */}
          <NeoCard variant="glass" className="p-6">
            <h4 className="neo-heading-4 text-white mb-4">Recent Activity</h4>
            <div className="space-y-4">
              {[...earnings, ...payouts].slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">💰</span>
                    </div>
                    <div>
                      <p className="neo-text-small text-white">
                        {'contentTitle' in item ? item.contentTitle : item.description}
                      </p>
                      <p className="neo-text-small text-slate-400">
                        {new Date(item.date || item.requestedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="neo-text-small text-white">${item.amount.toLocaleString()}</p>
                    <NeoBadge variant={getStatusColor(item.status)} size="sm">
                      {item.status}
                    </NeoBadge>
                  </div>
                </div>
              ))}
            </div>
          </NeoCard>
        </div>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="neo-card-stack">
            {earnings.map((earning) => (
              <NeoCard key={earning.id} variant="interactive" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getEarningsTypeIcon(earning.type)}</span>
                      <h4 className="neo-heading-4 text-white">{earning.description}</h4>
                      <NeoBadge variant={getEarningsTypeColor(earning.type)} size="sm">
                        {earning.type.replace('_', ' ')}
                      </NeoBadge>
                    </div>
                    {earning.contentTitle && (
                      <p className="neo-text-small text-slate-300 mb-2">{earning.contentTitle}</p>
                    )}
                    <p className="neo-text-small text-slate-400 mb-4">
                      {new Date(earning.date).toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-4">
                      <NeoBadge variant={getStatusColor(earning.status)}>
                        {earning.status}
                      </NeoBadge>
                      <NeoBadge variant={earning.source === 'INDEPENDENT' ? 'info' : 'crystal'}>
                        {earning.source}
                      </NeoBadge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="neo-heading-3 text-green-400 mb-2">
                      ${earning.amount.toLocaleString()}
                    </div>
                    <p className="neo-text-small text-slate-400">Amount</p>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        </div>
      )}

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="neo-card-stack">
            {payouts.map((payout) => (
              <NeoCard key={payout.id} variant="interactive" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="neo-heading-4 text-white">{payout.description}</h4>
                      <NeoBadge variant={getStatusColor(payout.status)}>
                        {payout.status}
                      </NeoBadge>
                    </div>
                    <p className="neo-text-small text-slate-300 mb-2">
                      Method: {payout.method.replace('_', ' ')}
                    </p>
                    <p className="neo-text-small text-slate-400 mb-4">
                      Requested: {new Date(payout.requestedAt).toLocaleString()}
                      {payout.processedAt && (
                        <span> • Processed: {new Date(payout.processedAt).toLocaleString()}</span>
                      )}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="neo-heading-3 text-blue-400 mb-2">
                      ${payout.amount.toLocaleString()}
                    </div>
                    <p className="neo-text-small text-slate-400">Amount</p>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        </div>
      )}

      {/* Escrow Tab */}
      {activeTab === 'escrow' && (
        <div className="space-y-6">
          <div className="neo-card-stack">
            {escrowData.map((escrow) => (
              <NeoCard key={escrow.id} variant="interactive" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="neo-heading-4 text-white">{escrow.contentTitle}</h4>
                        <NeoBadge variant={getStatusColor(escrow.status)}>
                          {escrow.status}
                        </NeoBadge>
                      </div>
                      <p className="neo-text-small text-slate-300 mb-2">
                        Brand: {escrow.brandName}
                      </p>
                      <p className="neo-text-small text-slate-400">
                        Created: {new Date(escrow.createdAt).toLocaleString()}
                        {escrow.releaseDate && (
                          <span> • Released: {new Date(escrow.releaseDate).toLocaleString()}</span>
                        )}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="neo-heading-3 text-blue-400 mb-2">
                        ${escrow.amount.toLocaleString()}
                      </div>
                      <p className="neo-text-small text-slate-400">Escrow Amount</p>
                    </div>
                  </div>

                  {/* Release Conditions */}
                  <div>
                    <h5 className="neo-text-small text-white mb-2">Release Conditions:</h5>
                    <div className="grid md:grid-cols-2 gap-2">
                      {escrow.releaseConditions.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="neo-text-small text-slate-300">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        </div>
      )}

      {/* Payout Request Modal */}
      <NeoModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        title="Request Payout"
        variant="glass"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <NeoInput
              label="Amount"
              type="number"
              placeholder="Enter amount to withdraw"
              value={payoutForm.amount}
              onChange={(e) => setPayoutForm(prev => ({ ...prev, amount: e.target.value }))}
              variant="glass"
            />
            <p className="neo-text-small text-slate-400 mt-1">
              Available: ${getPendingEarnings().toLocaleString()}
            </p>
          </div>

          <div>
            <label className="neo-label text-white mb-2 block">Payout Method</label>
            <select
              className="neo-input neo-glass w-full p-4 rounded-xl border border-slate-600/50 bg-slate-800/50 text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={payoutForm.method}
              onChange={(e) => setPayoutForm(prev => ({ ...prev, method: e.target.value }))}
            >
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="PAYPAL">PayPal</option>
              <option value="CRYPTO">Cryptocurrency</option>
            </select>
          </div>

          <NeoInput
            label="Description (Optional)"
            placeholder="Add a note for this payout request"
            value={payoutForm.description}
            onChange={(e) => setPayoutForm(prev => ({ ...prev, description: e.target.value }))}
            variant="glass"
          />

          <div className="flex justify-end space-x-3">
            <NeoButton variant="ghost" onClick={() => setIsPayoutModalOpen(false)}>
              Cancel
            </NeoButton>
            <NeoButton 
              variant="primary" 
              onClick={handlePayoutRequest}
              disabled={!payoutForm.amount || parseFloat(payoutForm.amount) > getPendingEarnings()}
              loading={loading}
            >
              Request Payout
            </NeoButton>
          </div>
        </div>
      </NeoModal>
    </div>
  );
}
