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

interface Contract {
  id: string;
  title: string;
  description: string;
  campaignId: string;
  campaignTitle: string;
  creatorId: string;
  creatorName: string;
  creatorEmail: string;
  brandId: string;
  brandName: string;
  status: 'DRAFT' | 'PENDING_SIGNATURE' | 'SIGNED' | 'ACTIVE' | 'COMPLETED' | 'TERMINATED' | 'EXPIRED';
  type: 'CAMPAIGN_CONTRACT' | 'NDA' | 'SERVICE_AGREEMENT' | 'COLLABORATION_AGREEMENT';
  totalAmount: number;
  paymentSchedule: Array<{
    id: string;
    amount: number;
    dueDate: string;
    status: 'PENDING' | 'PAID' | 'OVERDUE';
    description: string;
  }>;
  terms: {
    duration: string;
    deliverables: string[];
    paymentTerms: string;
    cancellationPolicy: string;
    intellectualProperty: string;
    confidentiality: boolean;
    exclusivity: boolean;
    contentApproval: string;
    revisionRounds: number;
    forceMajeure: string;
  };
  signedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  documents: Array<{
    id: string;
    name: string;
    type: 'CONTRACT' | 'AMENDMENT' | 'ADDENDUM' | 'TERMINATION';
    url: string;
    uploadedAt: string;
  }>;
  signatures: Array<{
    id: string;
    signerType: 'BRAND' | 'CREATOR';
    signerName: string;
    signedAt: string;
    ipAddress: string;
    signatureData: string;
  }>;
}

interface ContractTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  template: any;
  isDefault: boolean;
  createdAt: string;
}

export default function ContractManagement() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [contractForm, setContractForm] = useState({
    title: '',
    description: '',
    campaignId: '',
    creatorId: '',
    type: 'CAMPAIGN_CONTRACT',
    totalAmount: '',
    duration: '',
    deliverables: '',
    paymentTerms: '',
    templateId: ''
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockContracts: Contract[] = [
      {
        id: '1',
        title: 'Tech Blog Series Contract',
        description: 'Contract for 4-part tech blog series covering AI trends',
        campaignId: '1',
        campaignTitle: 'Tech Blog Series',
        creatorId: '1',
        creatorName: 'Sarah Johnson',
        creatorEmail: 'sarah@techwriter.com',
        brandId: '1',
        brandName: 'TechCorp Solutions',
        status: 'ACTIVE',
        type: 'CAMPAIGN_CONTRACT',
        totalAmount: 5000,
        paymentSchedule: [
          {
            id: '1',
            amount: 1250,
            dueDate: '2024-01-15',
            status: 'PAID',
            description: '25% upfront payment'
          },
          {
            id: '2',
            amount: 1250,
            dueDate: '2024-02-15',
            status: 'PAID',
            description: '25% after first 2 posts'
          },
          {
            id: '3',
            amount: 1250,
            dueDate: '2024-03-15',
            status: 'PENDING',
            description: '25% after third post'
          },
          {
            id: '4',
            amount: 1250,
            dueDate: '2024-04-15',
            status: 'PENDING',
            description: '25% final payment'
          }
        ],
        terms: {
          duration: '4 months',
          deliverables: ['4 blog posts', '8 social media posts', '2 infographics'],
          paymentTerms: '25% upfront, 25% per milestone',
          cancellationPolicy: '14 days notice required',
          intellectualProperty: 'Brand owns final content, creator retains process rights',
          confidentiality: true,
          exclusivity: false,
          contentApproval: 'Brand has 48 hours to review and request changes',
          revisionRounds: 2,
          forceMajeure: 'Standard force majeure clause applies'
        },
        signedAt: '2024-01-10',
        expiresAt: '2024-05-10',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-20',
        documents: [
          {
            id: '1',
            name: 'Tech_Blog_Series_Contract_v1.pdf',
            type: 'CONTRACT',
            url: '/contracts/tech-blog-series-contract.pdf',
            uploadedAt: '2024-01-05'
          }
        ],
        signatures: [
          {
            id: '1',
            signerType: 'BRAND',
            signerName: 'John Doe',
            signedAt: '2024-01-10',
            ipAddress: '192.168.1.100',
            signatureData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
          },
          {
            id: '2',
            signerType: 'CREATOR',
            signerName: 'Sarah Johnson',
            signedAt: '2024-01-10',
            ipAddress: '192.168.1.101',
            signatureData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
          }
        ]
      },
      {
        id: '2',
        title: 'Social Media Campaign Agreement',
        description: 'Agreement for LinkedIn and Twitter content strategy',
        campaignId: '2',
        campaignTitle: 'Social Media Campaign',
        creatorId: '2',
        creatorName: 'Mike Rodriguez',
        creatorEmail: 'mike@financeexpert.com',
        brandId: '1',
        brandName: 'TechCorp Solutions',
        status: 'PENDING_SIGNATURE',
        type: 'CAMPAIGN_CONTRACT',
        totalAmount: 3000,
        paymentSchedule: [
          {
            id: '1',
            amount: 3000,
            dueDate: '2024-02-01',
            status: 'PENDING',
            description: 'Full payment upon completion'
          }
        ],
        terms: {
          duration: '1 month',
          deliverables: ['20 LinkedIn posts', '20 Twitter posts', '5 Instagram stories'],
          paymentTerms: 'Full payment upon completion',
          cancellationPolicy: '7 days notice required',
          intellectualProperty: 'Brand owns all content',
          confidentiality: true,
          exclusivity: true,
          contentApproval: 'Brand has 24 hours to review',
          revisionRounds: 1,
          forceMajeure: 'Standard force majeure clause applies'
        },
        signedAt: null,
        expiresAt: '2024-03-01',
        createdAt: '2024-01-18',
        updatedAt: '2024-01-18',
        documents: [
          {
            id: '2',
            name: 'Social_Media_Campaign_Agreement_v1.pdf',
            type: 'CONTRACT',
            url: '/contracts/social-media-campaign-agreement.pdf',
            uploadedAt: '2024-01-18'
          }
        ],
        signatures: [
          {
            id: '3',
            signerType: 'BRAND',
            signerName: 'John Doe',
            signedAt: '2024-01-18',
            ipAddress: '192.168.1.100',
            signatureData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
          }
        ]
      },
      {
        id: '3',
        title: 'Product Review NDA',
        description: 'Non-disclosure agreement for unreleased product review',
        campaignId: '3',
        campaignTitle: 'Product Review Series',
        creatorId: '3',
        creatorName: 'Lisa Thompson',
        creatorEmail: 'lisa@wellnesscoach.com',
        brandId: '1',
        brandName: 'TechCorp Solutions',
        status: 'SIGNED',
        type: 'NDA',
        totalAmount: 0,
        paymentSchedule: [],
        terms: {
          duration: '2 years',
          deliverables: ['Confidentiality maintained'],
          paymentTerms: 'No payment required',
          cancellationPolicy: 'Immediate termination for breach',
          intellectualProperty: 'All information remains confidential',
          confidentiality: true,
          exclusivity: true,
          contentApproval: 'N/A',
          revisionRounds: 0,
          forceMajeure: 'N/A'
        },
        signedAt: '2024-01-12',
        expiresAt: '2026-01-12',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-12',
        documents: [
          {
            id: '3',
            name: 'Product_Review_NDA_v1.pdf',
            type: 'CONTRACT',
            url: '/contracts/product-review-nda.pdf',
            uploadedAt: '2024-01-10'
          }
        ],
        signatures: [
          {
            id: '4',
            signerType: 'BRAND',
            signerName: 'John Doe',
            signedAt: '2024-01-12',
            ipAddress: '192.168.1.100',
            signatureData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
          },
          {
            id: '5',
            signerType: 'CREATOR',
            signerName: 'Lisa Thompson',
            signedAt: '2024-01-12',
            ipAddress: '192.168.1.102',
            signatureData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
          }
        ]
      }
    ];

    const mockTemplates: ContractTemplate[] = [
      {
        id: '1',
        name: 'Standard Campaign Contract',
        type: 'CAMPAIGN_CONTRACT',
        description: 'Template for standard influencer campaign contracts',
        template: {},
        isDefault: true,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        name: 'NDA Template',
        type: 'NDA',
        description: 'Non-disclosure agreement template',
        template: {},
        isDefault: true,
        createdAt: '2024-01-01'
      },
      {
        id: '3',
        name: 'Long-term Collaboration Agreement',
        type: 'COLLABORATION_AGREEMENT',
        description: 'Template for ongoing creator partnerships',
        template: {},
        isDefault: false,
        createdAt: '2024-01-15'
      }
    ];

    setTimeout(() => {
      setContracts(mockContracts);
      setTemplates(mockTemplates);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || contract.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SIGNED': return 'success';
      case 'ACTIVE': return 'success';
      case 'PENDING_SIGNATURE': return 'warning';
      case 'DRAFT': return 'info';
      case 'COMPLETED': return 'secondary';
      case 'TERMINATED': return 'error';
      case 'EXPIRED': return 'error';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SIGNED': return '✅';
      case 'ACTIVE': return '🟢';
      case 'PENDING_SIGNATURE': return '⏳';
      case 'DRAFT': return '📝';
      case 'COMPLETED': return '🏁';
      case 'TERMINATED': return '❌';
      case 'EXPIRED': return '⏰';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CAMPAIGN_CONTRACT': return 'primary';
      case 'NDA': return 'info';
      case 'SERVICE_AGREEMENT': return 'accent';
      case 'COLLABORATION_AGREEMENT': return 'secondary';
      default: return 'ghost';
    }
  };

  const handleCreateContract = () => {
    setContractForm({
      title: '',
      description: '',
      campaignId: '',
      creatorId: '',
      type: 'CAMPAIGN_CONTRACT',
      totalAmount: '',
      duration: '',
      deliverables: '',
      paymentTerms: '',
      templateId: ''
    });
    setShowCreateModal(true);
  };

  const handleEditContract = (contract: Contract) => {
    setSelectedContract(contract);
    setShowEditModal(true);
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setShowViewModal(true);
  };

  const handleSendForSignature = (contractId: string) => {
    // TODO: Implement API call to send contract for signature
    setContracts(contracts.map(c => 
      c.id === contractId ? { ...c, status: 'PENDING_SIGNATURE' as any } : c
    ));
  };

  const handleTerminateContract = (contractId: string) => {
    if (confirm('Are you sure you want to terminate this contract?')) {
      // TODO: Implement API call to terminate contract
      setContracts(contracts.map(c => 
        c.id === contractId ? { ...c, status: 'TERMINATED' as any } : c
      ));
    }
  };

  const handleSaveContract = () => {
    // TODO: Implement API call to save contract
    console.log('Saving contract:', contractForm);
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  const totalContracts = contracts.length;
  const activeContracts = contracts.filter(c => c.status === 'ACTIVE').length;
  const pendingSignature = contracts.filter(c => c.status === 'PENDING_SIGNATURE').length;
  const totalValue = contracts.reduce((sum, c) => sum + c.totalAmount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="neo-glass p-8 rounded-2xl text-center">
          <div className="neo-spinner mb-4"></div>
          <p className="neo-text-body text-slate-300">Loading contracts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="neo-heading-2 neo-text-glow">Contract Management</h2>
          <p className="neo-text-body text-slate-300 mt-1">
            Create, manage, and track contracts with creators
          </p>
        </div>
        <div className="flex space-x-3">
          <NeoButton variant="accent" onClick={() => setShowTemplateModal(true)}>
            Templates
          </NeoButton>
          <NeoButton variant="primary" onClick={handleCreateContract}>
            + Create Contract
          </NeoButton>
        </div>
      </div>

      {/* Contract Stats */}
      <div className="neo-grid-4 neo-spacing-lg">
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {totalContracts}
          </div>
          <div className="neo-text-body text-slate-300">Total Contracts</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {activeContracts}
          </div>
          <div className="neo-text-body text-slate-300">Active</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            {pendingSignature}
          </div>
          <div className="neo-text-body text-slate-300">Pending Signature</div>
        </NeoCard>
        
        <NeoCard variant="glass" className="p-6 text-center">
          <div className="neo-heading-2 neo-text-holographic mb-2">
            ${totalValue.toLocaleString()}
          </div>
          <div className="neo-text-body text-slate-300">Total Value</div>
        </NeoCard>
      </div>

      {/* Filters and Search */}
      <NeoCard variant="glass" className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <NeoInput
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="glass"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PENDING_SIGNATURE">Pending Signature</option>
              <option value="SIGNED">Signed</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="TERMINATED">Terminated</option>
              <option value="EXPIRED">Expired</option>
            </select>
          </div>
        </div>
      </NeoCard>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContracts.map((contract) => (
          <NeoCard key={contract.id} variant="interactive" className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="neo-heading-4 text-white">{contract.title}</h3>
                  <NeoBadge variant={getStatusColor(contract.status)}>
                    {getStatusIcon(contract.status)} {contract.status.replace('_', ' ')}
                  </NeoBadge>
                  <NeoBadge variant={getTypeColor(contract.type)}>
                    {contract.type.replace('_', ' ')}
                  </NeoBadge>
                </div>
                
                <p className="neo-text-body text-slate-300 mb-4">{contract.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="neo-text-small text-slate-400">Creator:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {contract.creatorName}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Campaign:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {contract.campaignTitle}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Value:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      ${contract.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {contract.paymentSchedule.length > 0 && (
                  <div className="mb-4">
                    <h4 className="neo-text-body text-white font-medium mb-2">Payment Schedule</h4>
                    <div className="space-y-2">
                      {contract.paymentSchedule.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-2 neo-glass rounded-lg">
                          <div>
                            <span className="neo-text-small text-white">{payment.description}</span>
                            <span className="neo-text-small text-slate-400 ml-2">
                              Due: {new Date(payment.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="neo-text-body text-white font-medium">
                              ${payment.amount.toLocaleString()}
                            </span>
                            <NeoBadge 
                              variant={payment.status === 'PAID' ? 'success' : payment.status === 'OVERDUE' ? 'error' : 'warning'}
                              size="sm"
                            >
                              {payment.status}
                            </NeoBadge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewContract(contract)}
                  >
                    View Details
                  </NeoButton>
                  <NeoButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditContract(contract)}
                  >
                    Edit
                  </NeoButton>
                  {contract.status === 'DRAFT' && (
                    <NeoButton 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleSendForSignature(contract.id)}
                    >
                      Send for Signature
                    </NeoButton>
                  )}
                  {contract.status === 'ACTIVE' && (
                    <NeoButton 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleTerminateContract(contract.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Terminate
                    </NeoButton>
                  )}
                </div>
              </div>
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Create Contract Modal */}
      <NeoModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Contract"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Contract Title"
              placeholder="Enter contract title..."
              value={contractForm.title}
              onChange={(e) => setContractForm({...contractForm, title: e.target.value})}
              variant="glass"
            />
            <select
              value={contractForm.type}
              onChange={(e) => setContractForm({...contractForm, type: e.target.value})}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="CAMPAIGN_CONTRACT">Campaign Contract</option>
              <option value="NDA">NDA</option>
              <option value="SERVICE_AGREEMENT">Service Agreement</option>
              <option value="COLLABORATION_AGREEMENT">Collaboration Agreement</option>
            </select>
          </div>
          
          <NeoInput
            label="Description"
            placeholder="Contract description..."
            multiline
            rows={3}
            value={contractForm.description}
            onChange={(e) => setContractForm({...contractForm, description: e.target.value})}
            variant="glass"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Campaign"
              placeholder="Select campaign..."
              value={contractForm.campaignId}
              onChange={(e) => setContractForm({...contractForm, campaignId: e.target.value})}
              variant="glass"
            />
            <NeoInput
              label="Creator"
              placeholder="Select creator..."
              value={contractForm.creatorId}
              onChange={(e) => setContractForm({...contractForm, creatorId: e.target.value})}
              variant="glass"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeoInput
              label="Total Amount"
              placeholder="Enter total amount..."
              type="number"
              value={contractForm.totalAmount}
              onChange={(e) => setContractForm({...contractForm, totalAmount: e.target.value})}
              variant="glass"
            />
            <NeoInput
              label="Duration"
              placeholder="e.g., 3 months, 6 weeks"
              value={contractForm.duration}
              onChange={(e) => setContractForm({...contractForm, duration: e.target.value})}
              variant="glass"
            />
          </div>

          <NeoInput
            label="Deliverables"
            placeholder="List deliverables (comma-separated)..."
            value={contractForm.deliverables}
            onChange={(e) => setContractForm({...contractForm, deliverables: e.target.value})}
            variant="glass"
          />

          <NeoInput
            label="Payment Terms"
            placeholder="Describe payment terms..."
            multiline
            rows={3}
            value={contractForm.paymentTerms}
            onChange={(e) => setContractForm({...contractForm, paymentTerms: e.target.value})}
            variant="glass"
          />

          <div className="flex space-x-4">
            <NeoButton variant="primary" className="flex-1" onClick={handleSaveContract}>
              Create Contract
            </NeoButton>
            <NeoButton variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </NeoButton>
          </div>
        </div>
      </NeoModal>

      {/* Contract Details Modal */}
      <NeoModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title={selectedContract?.title}
        size="xl"
      >
        {selectedContract && (
          <div className="space-y-6">
            {/* Contract Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <NeoBadge variant={getStatusColor(selectedContract.status)}>
                  {getStatusIcon(selectedContract.status)} {selectedContract.status.replace('_', ' ')}
                </NeoBadge>
                <NeoBadge variant={getTypeColor(selectedContract.type)}>
                  {selectedContract.type.replace('_', ' ')}
                </NeoBadge>
              </div>
              <div className="text-right">
                <div className="neo-heading-4 text-white">${selectedContract.totalAmount.toLocaleString()}</div>
                <div className="neo-text-small text-slate-400">Total Value</div>
              </div>
            </div>

            {/* Contract Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Parties</h4>
                <div className="space-y-3">
                  <div>
                    <span className="neo-text-small text-slate-400">Brand:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {selectedContract.brandName}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Creator:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {selectedContract.creatorName}
                    </span>
                  </div>
                  <div>
                    <span className="neo-text-small text-slate-400">Campaign:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {selectedContract.campaignTitle}
                    </span>
                  </div>
                </div>
              </NeoCard>

              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Timeline</h4>
                <div className="space-y-3">
                  <div>
                    <span className="neo-text-small text-slate-400">Created:</span>
                    <span className="neo-text-body text-white font-medium ml-2">
                      {new Date(selectedContract.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedContract.signedAt && (
                    <div>
                      <span className="neo-text-small text-slate-400">Signed:</span>
                      <span className="neo-text-body text-white font-medium ml-2">
                        {new Date(selectedContract.signedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {selectedContract.expiresAt && (
                    <div>
                      <span className="neo-text-small text-slate-400">Expires:</span>
                      <span className="neo-text-body text-white font-medium ml-2">
                        {new Date(selectedContract.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </NeoCard>
            </div>

            {/* Terms */}
            <NeoCard variant="glass" className="p-6">
              <h4 className="neo-heading-5 text-white mb-4">Contract Terms</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="neo-text-small text-slate-400">Duration:</span>
                  <span className="neo-text-body text-white font-medium ml-2">
                    {selectedContract.terms.duration}
                  </span>
                </div>
                <div>
                  <span className="neo-text-small text-slate-400">Payment Terms:</span>
                  <span className="neo-text-body text-white font-medium ml-2">
                    {selectedContract.terms.paymentTerms}
                  </span>
                </div>
                <div>
                  <span className="neo-text-small text-slate-400">Confidentiality:</span>
                  <span className="neo-text-body text-white font-medium ml-2">
                    {selectedContract.terms.confidentiality ? 'Yes' : 'No'}
                  </span>
                </div>
                <div>
                  <span className="neo-text-small text-slate-400">Exclusivity:</span>
                  <span className="neo-text-body text-white font-medium ml-2">
                    {selectedContract.terms.exclusivity ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="neo-text-small text-slate-400">Deliverables:</span>
                <ul className="mt-2 space-y-1">
                  {selectedContract.terms.deliverables.map((deliverable, index) => (
                    <li key={index} className="neo-text-body text-white">• {deliverable}</li>
                  ))}
                </ul>
              </div>
            </NeoCard>

            {/* Signatures */}
            {selectedContract.signatures.length > 0 && (
              <NeoCard variant="glass" className="p-6">
                <h4 className="neo-heading-5 text-white mb-4">Signatures</h4>
                <div className="space-y-3">
                  {selectedContract.signatures.map((signature) => (
                    <div key={signature.id} className="flex items-center justify-between p-3 neo-glass rounded-lg">
                      <div>
                        <span className="neo-text-body text-white font-medium">
                          {signature.signerName}
                        </span>
                        <span className="neo-text-small text-slate-400 ml-2">
                          ({signature.signerType})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="neo-text-small text-slate-400">
                          {new Date(signature.signedAt).toLocaleString()}
                        </div>
                        <div className="neo-text-small text-slate-400">
                          IP: {signature.ipAddress}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </NeoCard>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <NeoButton variant="primary" className="flex-1">
                Download PDF
              </NeoButton>
              <NeoButton variant="accent" className="flex-1">
                Send Reminder
              </NeoButton>
              <NeoButton variant="ghost">
                Edit Contract
              </NeoButton>
            </div>
          </div>
        )}
      </NeoModal>
    </div>
  );
}
