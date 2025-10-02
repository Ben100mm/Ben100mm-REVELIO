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

interface Payment {
  id: string;
  campaignId: string;
  campaignTitle: string;
  creatorId: string;
  creatorName: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  type: 'CAMPAIGN_PAYMENT' | 'MILESTONE_PAYMENT' | 'BONUS' | 'REFUND';
  description: string;
  createdAt: string;
  processedAt: string | null;
  paymentMethod: string;
  transactionId: string | null;
}

interface Budget {
  id: string;
  campaignId: string;
  campaignTitle: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  status: 'ACTIVE' | 'EXCEEDED' | 'COMPLETED' | 'PAUSED';
  createdAt: string;
  updatedAt: string;
}

interface BudgetAlert {
  id: string;
  campaignId: string;
  campaignTitle: string;
  type: 'WARNING' | 'CRITICAL' | 'EXCEEDED';
  message: string;
  threshold: number;
  currentAmount: number;
  createdAt: string;
}

interface PaymentMethod {
  id: string;
  type: 'CARD' | 'BANK' | 'PAYPAL';
  last4: string;
  brand: string;
  isDefault: boolean;
  expiryMonth: number;
  expiryYear: number;
}

export default function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetAlerts, setBudgetAlerts] = useState<BudgetAlert[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Form state
  const [paymentForm, setPaymentForm] = useState({
    campaignId: '',
    creatorId: '',
    amount: '',
    type: 'CAMPAIGN_PAYMENT',
    description: '',
    paymentMethodId: ''
  });

  const [budgetForm, setBudgetForm] = useState({
    campaignId: '',
    totalBudget: '',
    description: ''
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockPayments: Payment[] = [
      {
        id: '1',
        campaignId: '1',
        campaignTitle: 'Tech Blog Series',
        creatorId: '1',
        creatorName: 'Sarah Johnson',
        amount: 2500,
        status: 'COMPLETED',
        type: 'MILESTONE_PAYMENT',
        description: 'First milestone payment for 2 blog posts',
        createdAt: '2024-01-15',
        processedAt: '2024-01-15',
        paymentMethod: 'Visa ****1234',
        transactionId: 'txn_1234567890'
      },
      {
        id: '2',
        campaignId: '1',
        campaignTitle: 'Tech Blog Series',
        creatorId: '1',
        creatorName: 'Sarah Johnson',
        amount: 2500,
        status: 'PENDING',
        type: 'MILESTONE_PAYMENT',
        description: 'Second milestone payment for remaining 2 blog posts',
        createdAt: '2024-01-20',
        processedAt: null,
        paymentMethod: 'Visa ****1234',
        transactionId: null
      },
      {
        id: '3',
        campaignId: '2',
        campaignTitle: 'Social Media Campaign',
        creatorId: '2',
        creatorName: 'Mike Rodriguez',
        amount: 3000,
        status: 'PROCESSING',
        type: 'CAMPAIGN_PAYMENT',
        description: 'Full campaign payment for social media content',
        createdAt: '2024-01-18',
        processedAt: null,
        paymentMethod: 'Mastercard ****5678',
        transactionId: 'txn_0987654321'
      },
      {
        id: '4',
        campaignId: '3',
        campaignTitle: 'Product Review Series',
        creatorId: '3',
        creatorName: 'Lisa Thompson',
        amount: 500,
        status: 'COMPLETED',
        type: 'BONUS',
        description: 'Performance bonus for exceeding engagement targets',
        createdAt: '2024-01-10',
        processedAt: '2024-01-10',
        paymentMethod: 'PayPal',
        transactionId: 'pp_1234567890'
      }
    ];

    const mockBudgets: Budget[] = [
      {
        id: '1',
        campaignId: '1',
        campaignTitle: 'Tech Blog Series',
        totalBudget: 5000,
        spent: 2500,
        remaining: 2500,
        status: 'ACTIVE',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-20'
      },
      {
        id: '2',
        campaignId: '2',
        campaignTitle: 'Social Media Campaign',
        totalBudget: 3000,
        spent: 3000,
        remaining: 0,
        status: 'COMPLETED',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-25'
      },
      {
        id: '3',
        campaignId: '3',
        campaignTitle: 'Product Review Series',
        totalBudget: 8000,
        spent: 8500,
        remaining: -500,
        status: 'EXCEEDED',
        createdAt: '2023-12-01',
        updatedAt: '2024-01-31'
      }
    ];

    const mockBudgetAlerts: BudgetAlert[] = [
      {
        id: '1',
        campaignId: '3',
        campaignTitle: 'Product Review Series',
        type: 'EXCEEDED',
        message: 'Budget exceeded by $500',
        threshold: 8000,
        currentAmount: 8500,
        createdAt: '2024-01-31'
      },
      {
        id: '2',
        campaignId: '1',
        campaignTitle: 'Tech Blog Series',
        type: 'WARNING',
        message: '80% of budget used',
        threshold: 4000,
        currentAmount: 2500,
        createdAt: '2024-01-20'
      }
    ];

    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: '1',
        type: 'CARD',
        last4: '1234',
        brand: 'Visa',
        isDefault: true,
        expiryMonth: 12,
        expiryYear: 2025
      },
      {
        id: '2',
        type: 'CARD',
        last4: '5678',
        brand: 'Mastercard',
        isDefault: false,
        expiryMonth: 8,
        expiryYear: 2026
      },
      {
        id: '3',
        type: 'BANK',
        last4: '9876',
        brand: 'Chase Bank',
        isDefault: false,
        expiryMonth: 0,
        expiryYear: 0
      }
    ];

    setTimeout(() => {
      setPayments(mockPayments);
      setBudgets(mockBudgets);
      setBudgetAlerts(mockBudgetAlerts);
      setPaymentMethods(mockPaymentMethods);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'PROCESSING': return 'info';
      case 'FAILED': return 'error';
      case 'CANCELLED': return 'secondary';
      case 'ACTIVE': return 'success';
      case 'EXCEEDED': return 'error';
      case 'PAUSED': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '✓';
      case 'PENDING': return '⏳';
      case 'PROCESSING': return '⟲';
      case 'FAILED': return '✗';
      case 'CANCELLED': return '✗';
      case 'ACTIVE': return '●';
      case 'EXCEEDED': return '●';
      case 'PAUSED': return '⏸';
      default: return '📄';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'WARNING': return 'warning';
      case 'CRITICAL': return 'error';
      case 'EXCEEDED': return 'error';
      default: return 'info';
    }
  };

  const handleCreatePayment = () => {
    setPaymentForm({
      campaignId: '',
      creatorId: '',
      amount: '',
      type: 'CAMPAIGN_PAYMENT',
      description: '',
      paymentMethodId: ''
    });
    setShowPaymentModal(true);
  };

  const handleCreateBudget = () => {
    setBudgetForm({
      campaignId: '',
      totalBudget: '',
      description: ''
    });
    setShowBudgetModal(true);
  };

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const handleProcessPayment = (paymentId: string) => {
    // TODO: Implement API call to process payment
    setPayments(payments.map(p => 
      p.id === paymentId ? { ...p, status: 'PROCESSING' as any } : p
    ));
  };

  const handleCancelPayment = (paymentId: string) => {
    if (confirm('Are you sure you want to cancel this payment?')) {
      // TODO: Implement API call to cancel payment
      setPayments(payments.map(p => 
        p.id === paymentId ? { ...p, status: 'CANCELLED' as any } : p
      ));
    }
  };

  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.totalBudget, 0);
  const pendingPayments = payments.filter(p => p.status === 'PENDING').length;
  const processingPayments = payments.filter(p => p.status === 'PROCESSING').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading payment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="neo-heading-2 neo-text-glow">Payment & Budget Management</h2>
          <p className="neo-text-body text-slate-300 mt-1">
            Manage payments, budgets, and financial tracking for your campaigns
          </p>
        </div>
        <div className="flex space-x-3">
          <NeoButton variant="accent" onClick={handleCreateBudget}>
            + Create Budget
          </NeoButton>
          <NeoButton variant="primary" onClick={handleCreatePayment}>
            + Make Payment
          </NeoButton>
        </div>
      </div>

      {/* Budget Alerts */}
      {budgetAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="neo-heading-4 text-white">Budget Alerts</h3>
          {budgetAlerts.map((alert) => (
            <NeoCard key={alert.id} variant="glass" className={`p-4 border-l-4 ${
              alert.type === 'EXCEEDED' ? 'border-red-500' : 
              alert.type === 'CRITICAL' ? 'border-orange-500' : 'border-yellow-500'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="neo-text-body text-white font-medium">{alert.campaignTitle}</h4>
                  <p className="neo-text-small text-slate-300">{alert.message}</p>
                </div>
                <NeoBadge variant={getAlertColor(alert.type)}>
                  {alert.type}
                </NeoBadge>
              </div>
            </NeoCard>
          ))}
        </div>
      )}

      {/* Financial Overview */}
      <div className="neo-grid-4 neo-spacing-lg">
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            ${totalBudget.toLocaleString()}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Budget</div>
          <NeoProgress value={100} color="blue" variant="energy" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            ${totalSpent.toLocaleString()}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Total Spent</div>
          <NeoProgress value={(totalSpent / totalBudget) * 100} color="green" variant="crystal" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            ${(totalBudget - totalSpent).toLocaleString()}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Remaining</div>
          <NeoProgress value={((totalBudget - totalSpent) / totalBudget) * 100} color="purple" variant="glow" />
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {pendingPayments + processingPayments}
          </div>
          <div className="neo-text-body text-slate-300 mb-4">Pending Payments</div>
          <NeoProgress value={75} color="orange" variant="energy" />
        </NeoCard>
      </div>

      {/* Tabs */}
      <div className="neo-glass p-2 rounded-2xl">
        <div className="flex space-x-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'payments', label: 'Payments' },
            { id: 'budgets', label: 'Budgets' },
            { id: 'methods', label: 'Payment Methods' }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Recent Payments */}
          <NeoCard variant="elevated" className="p-6">
            <h3 className="neo-heading-3 text-white mb-4">Recent Payments</h3>
            <div className="space-y-3">
              {payments.slice(0, 5).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 neo-glass rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {payment.creatorName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="neo-text-body text-white font-medium">{payment.creatorName}</h4>
                      <p className="neo-text-small text-slate-400">{payment.campaignTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="neo-text-body text-white font-medium">
                      ${payment.amount.toLocaleString()}
                    </span>
                    <NeoBadge variant={getStatusColor(payment.status)}>
                      {getStatusIcon(payment.status)} {payment.status}
                    </NeoBadge>
                  </div>
                </div>
              ))}
            </div>
          </NeoCard>

          {/* Budget Status */}
          <NeoCard variant="elevated" className="p-6">
            <h3 className="neo-heading-3 text-white mb-4">Budget Status</h3>
            <div className="space-y-4">
              {budgets.map((budget) => (
                <div key={budget.id} className="p-4 neo-glass rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="neo-text-body text-white font-medium">{budget.campaignTitle}</h4>
                    <NeoBadge variant={getStatusColor(budget.status)}>
                      {getStatusIcon(budget.status)} {budget.status}
                    </NeoBadge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="neo-text-small text-slate-400">Budget: ${budget.totalBudget.toLocaleString()}</span>
                    <span className="neo-text-small text-slate-400">Spent: ${budget.spent.toLocaleString()}</span>
                    <span className="neo-text-small text-slate-400">Remaining: ${budget.remaining.toLocaleString()}</span>
                  </div>
                  <NeoProgress 
                    value={(budget.spent / budget.totalBudget) * 100} 
                    color={budget.status === 'EXCEEDED' ? 'red' : 'blue'} 
                    variant="energy"
                  />
                </div>
              ))}
            </div>
          </NeoCard>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="neo-heading-3 text-white">All Payments</h3>
            <NeoButton variant="primary" onClick={handleCreatePayment}>
              + New Payment
            </NeoButton>
          </div>

          <div className="space-y-4">
            {payments.map((payment) => (
              <NeoCard key={payment.id} variant="interactive" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {payment.creatorName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="neo-heading-4 text-white">{payment.creatorName}</h4>
                      <p className="neo-text-small text-slate-400">{payment.campaignTitle}</p>
                      <p className="neo-text-small text-slate-400">{payment.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="neo-heading-4 text-white">${payment.amount.toLocaleString()}</div>
                      <div className="neo-text-small text-slate-400">{payment.paymentMethod}</div>
                      {payment.transactionId && (
                        <div className="neo-text-small text-slate-400">ID: {payment.transactionId}</div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <NeoBadge variant={getStatusColor(payment.status)}>
                        {getStatusIcon(payment.status)} {payment.status}
                      </NeoBadge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <NeoButton 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewPayment(payment)}
                      >
                        View
                      </NeoButton>
                      {payment.status === 'PENDING' && (
                        <>
                          <NeoButton 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleProcessPayment(payment.id)}
                          >
                            Process
                          </NeoButton>
                          <NeoButton 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCancelPayment(payment.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Cancel
                          </NeoButton>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        </div>
      )}

      {/* Budgets Tab */}
      {activeTab === 'budgets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="neo-heading-3 text-white">Campaign Budgets</h3>
            <NeoButton variant="primary" onClick={handleCreateBudget}>
              + New Budget
            </NeoButton>
          </div>

          <div className="space-y-4">
            {budgets.map((budget) => (
              <NeoCard key={budget.id} variant="interactive" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="neo-heading-4 text-white mb-2">{budget.campaignTitle}</h4>
                    <div className="flex items-center space-x-6 mb-4">
                      <div>
                        <span className="neo-text-small text-slate-400">Total Budget:</span>
                        <span className="neo-text-body text-white font-medium ml-2">
                          ${budget.totalBudget.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="neo-text-small text-slate-400">Spent:</span>
                        <span className="neo-text-body text-white font-medium ml-2">
                          ${budget.spent.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="neo-text-small text-slate-400">Remaining:</span>
                        <span className={`neo-text-body font-medium ml-2 ${
                          budget.remaining < 0 ? 'text-red-400' : 'text-white'
                        }`}>
                          ${budget.remaining.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <NeoProgress 
                      value={(budget.spent / budget.totalBudget) * 100} 
                      color={budget.status === 'EXCEEDED' ? 'red' : 'blue'} 
                      variant="energy"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    <NeoBadge variant={getStatusColor(budget.status)}>
                      {getStatusIcon(budget.status)} {budget.status}
                    </NeoBadge>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'methods' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="neo-heading-3 text-white">Payment Methods</h3>
            <NeoButton variant="primary" onClick={() => setShowPaymentMethodModal(true)}>
              + Add Method
            </NeoButton>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <NeoCard key={method.id} variant="interactive" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {method.brand.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="neo-text-body text-white font-medium">
                        {method.brand} ****{method.last4}
                      </h4>
                      <p className="neo-text-small text-slate-400">
                        {method.type === 'CARD' ? `Expires ${method.expiryMonth}/${method.expiryYear}` : 'Bank Account'}
                      </p>
                    </div>
                    {method.isDefault && (
                      <NeoBadge variant="success" size="sm">Default</NeoBadge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <NeoButton variant="ghost" size="sm">
                      Edit
                    </NeoButton>
                    <NeoButton variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      Remove
                    </NeoButton>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <NeoModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Create Payment"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Campaign"
              placeholder="Select campaign..."
              value={paymentForm.campaignId}
              onChange={(e) => setPaymentForm({...paymentForm, campaignId: e.target.value})}
              variant="glass"
            />
            <NeoInput
              label="Creator"
              placeholder="Select creator..."
              value={paymentForm.creatorId}
              onChange={(e) => setPaymentForm({...paymentForm, creatorId: e.target.value})}
              variant="glass"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Amount"
              placeholder="Enter amount..."
              type="number"
              value={paymentForm.amount}
              onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
              variant="glass"
            />
            <select
              value={paymentForm.type}
              onChange={(e) => setPaymentForm({...paymentForm, type: e.target.value})}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="CAMPAIGN_PAYMENT">Campaign Payment</option>
              <option value="MILESTONE_PAYMENT">Milestone Payment</option>
              <option value="BONUS">Bonus</option>
              <option value="REFUND">Refund</option>
            </select>
          </div>

          <NeoInput
            label="Description"
            placeholder="Payment description..."
            multiline
            rows={3}
            value={paymentForm.description}
            onChange={(e) => setPaymentForm({...paymentForm, description: e.target.value})}
            variant="glass"
          />

          <select
            value={paymentForm.paymentMethodId}
            onChange={(e) => setPaymentForm({...paymentForm, paymentMethodId: e.target.value})}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.brand} ****{method.last4}
              </option>
            ))}
          </select>

          <div className="flex space-x-4">
            <NeoButton variant="primary" className="flex-1" onClick={() => setShowPaymentModal(false)}>
              Create Payment
            </NeoButton>
            <NeoButton variant="ghost" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </NeoButton>
          </div>
        </div>
      </NeoModal>

      {/* Budget Modal */}
      <NeoModal
        isOpen={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        title="Create Budget"
        size="lg"
      >
        <div className="space-y-6">
          <NeoInput
            label="Campaign"
            placeholder="Select campaign..."
            value={budgetForm.campaignId}
            onChange={(e) => setBudgetForm({...budgetForm, campaignId: e.target.value})}
            variant="glass"
          />
          
          <NeoInput
            label="Total Budget"
            placeholder="Enter budget amount..."
            type="number"
            value={budgetForm.totalBudget}
            onChange={(e) => setBudgetForm({...budgetForm, totalBudget: e.target.value})}
            variant="glass"
          />

          <NeoInput
            label="Description"
            placeholder="Budget description..."
            multiline
            rows={3}
            value={budgetForm.description}
            onChange={(e) => setBudgetForm({...budgetForm, description: e.target.value})}
            variant="glass"
          />

          <div className="flex space-x-4">
            <NeoButton variant="primary" className="flex-1" onClick={() => setShowBudgetModal(false)}>
              Create Budget
            </NeoButton>
            <NeoButton variant="ghost" onClick={() => setShowBudgetModal(false)}>
              Cancel
            </NeoButton>
          </div>
        </div>
      </NeoModal>
    </div>
  );
}
