
import React, { useState } from 'react';
import { 
  Shield, 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  X,
  Star,
  Truck,
  CreditCard
} from 'lucide-react';

interface EscrowTransaction {
  id: string;
  amount: number;
  customer: string;
  customerEmail: string;
  merchant: string;
  merchantEmail: string;
  orderId: string;
  status: 'active' | 'disputed' | 'pending' | 'released';
  description: string;
  heldSince: string;
  autoReleaseIn?: string;
  lastActivity?: string;
  rating?: number;
  evidence?: number;
  critical?: boolean;
}

const mockEscrowData: EscrowTransaction[] = [
  {
    id: 'ESC-4521',
    amount: 45000,
    customer: 'John Doe',
    customerEmail: 'john.doe@email.com',
    merchant: 'TechStore247',
    merchantEmail: 'tech@techstore247.com',
    orderId: '1245',
    status: 'disputed',
    description: 'Product not as described',
    heldSince: '3 days ago',
    lastActivity: '30 min ago',
    evidence: 4,
    critical: true
  },
  {
    id: 'ESC-4520',
    amount: 18500,
    customer: 'Alice Johnson',
    customerEmail: 'alice@email.com',
    merchant: 'QuickMart',
    merchantEmail: 'orders@quickmart.com',
    orderId: '1244',
    status: 'active',
    description: 'Electronics Purchase',
    heldSince: '1 day ago',
    autoReleaseIn: '6 days',
    rating: 5
  },
  {
    id: 'ESC-4519',
    amount: 8200,
    customer: 'Mike Wilson',
    customerEmail: 'mike@email.com',
    merchant: 'PhoneHub',
    merchantEmail: 'sales@phonehub.com',
    orderId: '1243',
    status: 'pending',
    description: 'Mobile Accessories',
    heldSince: '7 days ago',
    rating: 5
  },
  {
    id: 'ESC-4518',
    amount: 12800,
    customer: 'Sarah Chen',
    customerEmail: 'sarah@email.com',
    merchant: 'BookStore',
    merchantEmail: 'orders@bookstore.com',
    orderId: '1242',
    status: 'released',
    description: 'Educational Books',
    heldSince: '2 hours ago',
    rating: 5
  }
];

export function AdminEscrowManagement() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState<EscrowTransaction | null>(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeNotes, setDisputeNotes] = useState('');

  const getStatusBadge = (status: string, critical?: boolean) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-[rgb(27,151,84)]`;
      case 'disputed':
        return `${baseClasses} bg-red-100 text-[rgb(200,16,46)]`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'released':
        return `${baseClasses} bg-gray-100 text-gray-600`;
      default:
        return baseClasses;
    }
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const openDispute = (transaction: EscrowTransaction) => {
    setSelectedDispute(transaction);
    setShowDisputeModal(true);
  };

  const closeDisputeModal = () => {
    setShowDisputeModal(false);
    setSelectedDispute(null);
    setDisputeNotes('');
  };

  const resolveDispute = (action: string) => {
    console.log(`Resolving dispute with action: ${action}`);
    closeDisputeModal();
    // Show success toast
  };

  const filteredTransactions = mockEscrowData.filter(transaction => {
    if (activeFilter === 'all') return true;
    return transaction.status === activeFilter;
  });

  const getFilterCount = (status: string) => {
    if (status === 'all') return mockEscrowData.length;
    return mockEscrowData.filter(t => t.status === status).length;
  };

  return (
    <div className="flex h-screen bg-gray-50 montserrat">
      {/* Dispute Resolution Modal */}
      {showDisputeModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-[25px] shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[rgb(11,26,81)]">Dispute Resolution</h2>
                <button 
                  onClick={closeDisputeModal}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-[rgb(78,82,95)]" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Dispute Details */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-[rgb(78,82,95)]">Escrow ID</p>
                    <p className="text-lg font-bold text-[rgb(13,13,13)]">{selectedDispute.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[rgb(78,82,95)]">Amount</p>
                    <p className="text-lg font-bold text-[rgb(13,13,13)]">{formatCurrency(selectedDispute.amount)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-[rgb(78,82,95)]">Customer</p>
                    <p className="font-medium text-[rgb(13,13,13)]">{selectedDispute.customer}</p>
                    <p className="text-xs text-[rgb(78,82,95)]">{selectedDispute.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[rgb(78,82,95)]">Merchant</p>
                    <p className="font-medium text-[rgb(13,13,13)]">{selectedDispute.merchant}</p>
                    <p className="text-xs text-[rgb(78,82,95)]">{selectedDispute.merchantEmail}</p>
                  </div>
                </div>
              </div>

              {/* Dispute Timeline */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-[rgb(11,26,81)]">Dispute Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-[rgb(13,13,13)]">Dispute Filed</p>
                      <p className="text-xs text-[rgb(78,82,95)]">Customer reported product not as described • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1 mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-[rgb(13,13,13)]">Merchant Response</p>
                      <p className="text-xs text-[rgb(78,82,95)]">Merchant provided tracking and proof of delivery • 1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1 mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-[rgb(13,13,13)]">Escalated to Admin</p>
                      <p className="text-xs text-[rgb(78,82,95)]">Automatic escalation due to unresolved dispute • 30 min ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-[rgb(11,26,81)]">Evidence</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-[rgb(232,233,235)] rounded-[25px] p-4">
                    <h4 className="font-medium mb-2 text-[rgb(13,13,13)]">Customer Evidence</h4>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <FileText className="w-4 h-4 mr-2 text-[rgb(78,82,95)]" />
                        <span className="text-xs">product_received.jpg</span>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <FileText className="w-4 h-4 mr-2 text-[rgb(78,82,95)]" />
                        <span className="text-xs">damage_photo.jpg</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[rgb(232,233,235)] rounded-[25px] p-4">
                    <h4 className="font-medium mb-2 text-[rgb(13,13,13)]">Merchant Evidence</h4>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <CheckCircle className="w-4 h-4 mr-2 text-[rgb(78,82,95)]" />
                        <span className="text-xs">delivery_receipt.pdf</span>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <FileText className="w-4 h-4 mr-2 text-[rgb(78,82,95)]" />
                        <span className="text-xs">packaging_photo.jpg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-[rgb(11,26,81)]">Resolution Actions</h3>
                <textarea 
                  className="w-full p-4 border border-[rgb(232,233,235)] rounded-[25px] mb-4 text-sm" 
                  rows={4}
                  placeholder="Enter admin notes and resolution details..."
                  value={disputeNotes}
                  onChange={(e) => setDisputeNotes(e.target.value)}
                />
                
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => resolveDispute('refund')}
                    className="py-3 px-4 bg-red-500 text-white rounded-[25px] text-sm font-medium hover:bg-red-600"
                  >
                    Refund Customer
                  </button>
                  <button 
                    onClick={() => resolveDispute('release')}
                    className="py-3 px-4 bg-[rgb(27,151,84)] text-white rounded-[25px] text-sm font-medium hover:bg-green-600"
                  >
                    Release to Merchant
                  </button>
                  <button 
                    onClick={() => resolveDispute('partial')}
                    className="py-3 px-4 bg-[rgb(70,130,180)] text-white rounded-[25px] text-sm font-medium hover:bg-blue-600"
                  >
                    Partial Refund
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini Sidebar */}
      <div className="w-16 bg-white shadow-lg flex flex-col items-center py-4 space-y-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-[rgb(11,26,81)]" />
        </button>
        
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgb(11,26,81)]">
          <Shield className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[rgb(11,26,81)]">Escrow Management</h1>
              <p className="text-sm text-[rgb(78,82,95)]">Monitor and manage payment escrow transactions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-lg font-bold text-[rgb(13,13,13)]">₦12.4M</p>
                <p className="text-xs text-[rgb(78,82,95)]">Total Escrow Balance</p>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">7</p>
                <p className="text-xs text-[rgb(78,82,95)]">Pending Disputes</p>
              </div>
            </div>
          </div>
        </header>

        {/* Filter Tabs */}
        <div className="bg-white px-6 py-4 border-b">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-[25px] text-sm font-medium ${
                activeFilter === 'all' 
                  ? 'bg-[rgb(70,130,180)] text-white' 
                  : 'border border-[rgb(232,233,235)] text-[rgb(78,82,95)]'
              }`}
            >
              All Escrow ({getFilterCount('all')})
            </button>
            <button 
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-[25px] text-sm font-medium ${
                activeFilter === 'active' 
                  ? 'bg-[rgb(70,130,180)] text-white' 
                  : 'border border-[rgb(232,233,235)] text-[rgb(78,82,95)]'
              }`}
            >
              Active ({getFilterCount('active')})
            </button>
            <button 
              onClick={() => setActiveFilter('disputed')}
              className={`px-4 py-2 rounded-[25px] text-sm font-medium ${
                activeFilter === 'disputed' 
                  ? 'bg-[rgb(70,130,180)] text-white' 
                  : 'border border-[rgb(232,233,235)] text-[rgb(78,82,95)]'
              }`}
            >
              Disputed ({getFilterCount('disputed')})
            </button>
            <button 
              onClick={() => setActiveFilter('pending')}
              className={`px-4 py-2 rounded-[25px] text-sm font-medium ${
                activeFilter === 'pending' 
                  ? 'bg-[rgb(70,130,180)] text-white' 
                  : 'border border-[rgb(232,233,235)] text-[rgb(78,82,95)]'
              }`}
            >
              Pending Release ({getFilterCount('pending')})
            </button>
          </div>
        </div>

        {/* Escrow List */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className={`bg-white rounded-[25px] shadow-sm p-6 ${
                  transaction.critical ? 'border-l-4 border-red-500' : ''
                } ${transaction.status === 'released' ? 'opacity-75' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold mr-3 text-[rgb(13,13,13)]">{transaction.id}</h3>
                      <span className={getStatusBadge(transaction.status)}>
                        {transaction.status.toUpperCase()}
                      </span>
                      {transaction.critical && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">
                          CRITICAL
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-1 text-[rgb(78,82,95)]">
                      <strong>Customer:</strong> {transaction.customer} → <strong>Merchant:</strong> {transaction.merchant}
                    </p>
                    <p className="text-sm text-[rgb(78,82,95)]">
                      Order #{transaction.orderId} • {transaction.description} • 
                      {transaction.status === 'disputed' ? ' Filed 2 hours ago' : 
                       transaction.status === 'released' ? ' Successfully completed' : ' Order delivered'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[rgb(13,13,13)]">{formatCurrency(transaction.amount)}</p>
                    <p className="text-xs text-[rgb(78,82,95)]">
                      {transaction.status === 'released' ? 'Released' : 'Held since'} {transaction.heldSince}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-[rgb(78,82,95)]">
                    {transaction.status === 'disputed' && (
                      <>
                        <span>📁 Evidence: {transaction.evidence} files</span>
                        <span>⏰ Auto-release in: 4 days</span>
                        <span>🔄 Last activity: {transaction.lastActivity}</span>
                      </>
                    )}
                    {transaction.status === 'active' && (
                      <>
                        <span>✅ Delivered successfully</span>
                        <span>⏰ Auto-release in: {transaction.autoReleaseIn}</span>
                        <span>⭐ Customer satisfaction pending</span>
                      </>
                    )}
                    {transaction.status === 'pending' && (
                      <>
                        <span>✅ 7-day holding period complete</span>
                        <span>⭐ {transaction.rating}-star customer rating</span>
                        <span>📝 No disputes filed</span>
                      </>
                    )}
                    {transaction.status === 'released' && (
                      <>
                        <span>✅ Transaction completed</span>
                        <span>💰 Funds transferred to merchant</span>
                        <span>⭐ {transaction.rating}-star rating received</span>
                      </>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {transaction.status === 'disputed' && (
                      <button 
                        onClick={() => openDispute(transaction)}
                        className="px-4 py-2 bg-red-500 text-white rounded-[25px] text-sm font-medium hover:bg-red-600"
                      >
                        Resolve Dispute
                      </button>
                    )}
                    {(transaction.status === 'active' || transaction.status === 'pending') && (
                      <button className="px-4 py-2 bg-[rgb(27,151,84)] text-white rounded-[25px] text-sm font-medium hover:bg-green-600">
                        {transaction.status === 'pending' ? 'Release Funds' : 'Release Early'}
                      </button>
                    )}
                    <button className="px-4 py-2 border border-[rgb(232,233,235)] text-[rgb(70,130,180)] rounded-[25px] text-sm font-medium hover:bg-gray-50">
                      {transaction.status === 'released' ? 'View Archive' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="px-6 py-3 border border-[rgb(232,233,235)] text-[rgb(70,130,180)] rounded-[25px] text-sm font-medium hover:bg-gray-50">
              Load More Transactions
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminEscrowManagement;
