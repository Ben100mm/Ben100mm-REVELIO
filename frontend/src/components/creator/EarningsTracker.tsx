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

interface EarningsData {
  totalEarnings: number;
  monthlyEarnings: number;
  pendingPayments: number;
  averagePerContent: number;
  earningsBySource: {
    source: string;
    amount: number;
    percentage: number;
  }[];
  monthlyTrends: {
    month: string;
    earnings: number;
    content: number;
  }[];
  recentTransactions: {
    id: string;
    description: string;
    amount: number;
    type: 'payment' | 'bonus' | 'refund';
    date: string;
    status: 'completed' | 'pending' | 'processing';
  }[];
  paymentMethods: {
    method: string;
    isDefault: boolean;
    lastUsed: string;
  }[];
}

interface TimeRange {
  label: string;
  value: string;
  days: number;
}

export default function EarningsTracker() {
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const timeRanges: TimeRange[] = [
    { label: 'Last 7 days', value: '7d', days: 7 },
    { label: 'Last 30 days', value: '30d', days: 30 },
    { label: 'Last 90 days', value: '90d', days: 90 },
    { label: 'Last year', value: '1y', days: 365 }
  ];

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockEarningsData: EarningsData = {
      totalEarnings: 12500,
      monthlyEarnings: 3200,
      pendingPayments: 850,
      averagePerContent: 500,
      earningsBySource: [
        { source: 'Sponsored Content', amount: 7500, percentage: 60 },
        { source: 'Affiliate Commissions', amount: 2500, percentage: 20 },
        { source: 'Platform Revenue', amount: 1500, percentage: 12 },
        { source: 'Direct Partnerships', amount: 1000, percentage: 8 }
      ],
      monthlyTrends: [
        { month: 'Jan', earnings: 2800, content: 6 },
        { month: 'Feb', earnings: 3200, content: 7 },
        { month: 'Mar', earnings: 2900, content: 5 },
        { month: 'Apr', earnings: 3600, content: 8 }
      ],
      recentTransactions: [
        {
          id: '1',
          description: 'TechCorp iPhone Review Campaign',
          amount: 2500,
          type: 'payment',
          date: '2024-01-20T10:30:00Z',
          status: 'completed'
        },
        {
          id: '2',
          description: 'Affiliate Commission - Amazon',
          amount: 150,
          type: 'payment',
          date: '2024-01-19T14:20:00Z',
          status: 'completed'
        },
        {
          id: '3',
          description: 'YouTube Ad Revenue',
          amount: 320,
          type: 'payment',
          date: '2024-01-18T09:15:00Z',
          status: 'completed'
        },
        {
          id: '4',
          description: 'LifestyleBrand Partnership',
          amount: 1800,
          type: 'payment',
          date: '2024-01-17T16:45:00Z',
          status: 'pending'
        },
        {
          id: '5',
          description: 'Performance Bonus',
          amount: 500,
          type: 'bonus',
          date: '2024-01-16T11:30:00Z',
          status: 'processing'
        }
      ],
      paymentMethods: [
        { method: 'Bank Transfer', isDefault: true, lastUsed: '2024-01-20' },
        { method: 'PayPal', isDefault: false, lastUsed: '2024-01-15' },
        { method: 'Stripe', isDefault: false, lastUsed: '2024-01-10' }
      ]
    };

    setTimeout(() => {
      setEarningsData(mockEarningsData);
      setLoading(false);
    }, 1000);
  }, [selectedTimeRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment': return '$';
      case 'bonus': return '🎁';
      case 'refund': return '↩';
      default: return '$';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading earnings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="neo-heading-2 neo-text-glow">Earnings Tracker</h2>
          <p className="neo-text-body text-slate-300">Track your income and payments</p>
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
          <NeoButton variant="accent" onClick={() => setShowPaymentModal(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Payment Settings
          </NeoButton>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatCurrency(earningsData?.totalEarnings || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Earnings</div>
          <NeoProgress value={85} color="green" variant="energy" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatCurrency(earningsData?.monthlyEarnings || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">This Month</div>
          <NeoProgress value={92} color="blue" variant="crystal" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatCurrency(earningsData?.pendingPayments || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Pending</div>
          <NeoProgress value={68} color="orange" variant="glow" />
        </NeoCard>
        
        <NeoCard variant="elevated" glow className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {formatCurrency(earningsData?.averagePerContent || 0)}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Avg per Content</div>
          <NeoProgress value={78} color="purple" variant="energy" />
        </NeoCard>
      </div>

      {/* Earnings by Source */}
      <NeoCard variant="glass" className="p-6">
        <h3 className="neo-heading-4 text-white mb-6">Earnings by Source</h3>
        <div className="space-y-4">
          {earningsData?.earningsBySource.map((source, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="neo-text-body text-white font-medium">{source.source}</span>
                <span className="neo-text-body text-slate-300">{source.percentage}%</span>
              </div>
              <NeoProgress 
                value={source.percentage} 
                color={index === 0 ? 'green' : index === 1 ? 'blue' : index === 2 ? 'purple' : 'orange'} 
                variant="energy" 
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>{formatCurrency(source.amount)}</span>
                <span>{source.percentage}% of total</span>
              </div>
            </div>
          ))}
        </div>
      </NeoCard>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NeoCard variant="elevated" className="p-6">
          <h3 className="neo-heading-4 text-white mb-6">Monthly Earnings Trend</h3>
          <div className="space-y-4">
            {earningsData?.monthlyTrends.map((trend, index) => (
              <div key={index} className="neo-glass p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="neo-text-body text-white font-medium">{trend.month}</span>
                  <span className="neo-text-body text-green-400 font-medium">
                    {formatCurrency(trend.earnings)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>{trend.content} content pieces</span>
                  <span>Avg: {formatCurrency(trend.earnings / trend.content)}</span>
                </div>
              </div>
            ))}
          </div>
        </NeoCard>

        <NeoCard variant="glass" className="p-6">
          <h3 className="neo-heading-4 text-white mb-6">Payment Methods</h3>
          <div className="space-y-3">
            {earningsData?.paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-3 neo-glass rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">💳</span>
                  <div>
                    <div className="neo-text-body text-white font-medium">{method.method}</div>
                    <div className="neo-text-small text-slate-400">
                      Last used: {new Date(method.lastUsed).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {method.isDefault && (
                  <NeoBadge variant="success" size="sm">Default</NeoBadge>
                )}
              </div>
            ))}
          </div>
        </NeoCard>
      </div>

      {/* Recent Transactions */}
      <NeoCard variant="elevated" className="p-6">
        <h3 className="neo-heading-4 text-white mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {earningsData?.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 neo-glass rounded-xl">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                <div>
                  <h4 className="neo-text-body text-white font-medium">{transaction.description}</h4>
                  <p className="neo-text-small text-slate-400">
                    {new Date(transaction.date).toLocaleDateString()} • {transaction.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="neo-text-body text-green-400 font-medium">
                    +{formatCurrency(transaction.amount)}
                  </div>
                  <NeoBadge variant={getStatusColor(transaction.status)} size="sm">
                    {transaction.status}
                  </NeoBadge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NeoCard>

      {/* Payment Settings Modal */}
      <NeoModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Payment Settings"
      >
        <div className="space-y-6">
          <div>
            <label className="neo-text-body text-white mb-2 block">Default Payment Method</label>
            <select className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600">
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Stripe</option>
            </select>
          </div>

          <div>
            <label className="neo-text-body text-white mb-2 block">Payment Threshold</label>
            <NeoInput
              type="number"
              placeholder="Minimum amount for payout"
              variant="glass"
            />
          </div>

          <div>
            <label className="neo-text-body text-white mb-2 block">Payment Frequency</label>
            <select className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600">
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <NeoButton variant="primary" className="flex-1">
              Save Settings
            </NeoButton>
            <NeoButton variant="ghost" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </NeoButton>
          </div>
        </div>
      </NeoModal>
    </div>
  );
}
