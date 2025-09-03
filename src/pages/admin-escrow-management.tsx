
import React, { useState } from 'react';
import { Search, Filter, Eye, AlertTriangle, CheckCircle, XCircle, Clock, Shield } from 'lucide-react';

interface EscrowTransaction {
  id: string;
  orderId: string;
  amount: number;
  status: 'active' | 'disputed' | 'pending' | 'released';
  customer: string;
  merchant: string;
  date: string;
  escrowDate: string;
  releaseDate?: string;
  disputeReason?: string;
}

const mockTransactions: EscrowTransaction[] = [
  {
    id: '1',
    orderId: '#ESC001',
    amount: 45000,
    status: 'disputed',
    customer: 'John Doe',
    merchant: 'TechMart Store',
    date: '2024-01-15',
    escrowDate: '2024-01-15',
    disputeReason: 'Product not as described'
  },
  {
    id: '2',
    orderId: '#ESC002',
    amount: 28500,
    status: 'active',
    customer: 'Sarah Johnson',
    merchant: 'Fashion Hub',
    date: '2024-01-16',
    escrowDate: '2024-01-16'
  },
  {
    id: '3',
    orderId: '#ESC003',
    amount: 75000,
    status: 'pending',
    customer: 'Mike Wilson',
    merchant: 'Electronics Pro',
    date: '2024-01-17',
    escrowDate: '2024-01-17'
  }
];

export function AdminEscrowManagement() {
  const [selectedTransaction, setSelectedTransaction] = useState<EscrowTransaction | null>(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'disputed': return 'status-disputed';
      case 'pending': return 'status-pending';
      case 'released': return 'status-released';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'disputed': return <AlertTriangle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'released': return <Shield className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleDisputeResolution = (transaction: EscrowTransaction) => {
    setSelectedTransaction(transaction);
    setShowDisputeModal(true);
  };

  const closeDisputeModal = () => {
    setShowDisputeModal(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <style jsx>{`
        :root {
          --button-color: rgb(70, 130, 180);
          --deep-blue-color: rgb(11, 26, 81);
          --card-color: rgb(232, 233, 235);
          --light-text-color: rgb(78, 82, 95);
          --black-text-color: rgb(13, 13, 13);
          --savings-green: rgb(27, 151, 84);
          --error-color: rgb(200, 16, 46);
        }

        .montserrat { font-family: 'Montserrat', sans-serif; }
        .curved-card { border-radius: 25px; }
        .curved-button { border-radius: 25px; }
        .status-active { background-color: rgba(27, 151, 84, 0.1); color: rgb(27, 151, 84); }
        .status-disputed { background-color: rgba(200, 16, 46, 0.1); color: rgb(200, 16, 46); }
        .status-pending { background-color: rgba(245, 158, 11, 0.1); color: #d97706; }
        .status-released { background-color: rgba(107, 114, 128, 0.1); color: rgb(107, 114, 128); }
        .modal-overlay { background-color: rgba(19, 19, 19, 0.8); }
      `}</style>

      <div className="bg-gray-50 min-h-screen montserrat">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--deep-blue-color)' }}>
                  Escrow Management
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--light-text-color)' }}>
                  Monitor and manage escrow transactions and disputes
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm" style={{ color: 'var(--light-text-color)' }}>
                    System Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white curved-card shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6" style={{ color: 'var(--button-color)' }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--black-text-color)' }}>₦12.4M</h3>
              <p className="text-sm" style={{ color: 'var(--light-text-color)' }}>Total Escrow Balance</p>
              <div className="flex items-center mt-2 text-xs" style={{ color: 'var(--light-text-color)' }}>
                <span>↗ 8.2% from last month</span>
              </div>
            </div>

            <div className="bg-white curved-card shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" style={{ color: 'var(--savings-green)' }} />
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  342 Active
                </span>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--black-text-color)' }}>₦8.2M</h3>
              <p className="text-sm" style={{ color: 'var(--light-text-color)' }}>Active Escrows</p>
            </div>

            <div className="bg-white curved-card shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  7 Pending
                </span>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--black-text-color)' }}>₦1.8M</h3>
              <p className="text-sm" style={{ color: 'var(--light-text-color)' }}>Pending Releases</p>
            </div>

            <div className="bg-white curved-card shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" style={{ color: 'var(--error-color)' }} />
                </div>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                  12 Disputes
                </span>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--black-text-color)' }}>₦2.4M</h3>
              <p className="text-sm" style={{ color: 'var(--light-text-color)' }}>Disputed Amount</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white curved-card shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--light-text-color)' }} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 curved-button focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" style={{ color: 'var(--light-text-color)' }} />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 curved-button focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="disputed">Disputed</option>
                    <option value="released">Released</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 curved-button border border-gray-300 hover:bg-gray-50">
                  Export
                </button>
                <button className="px-4 py-2 curved-button text-white hover:opacity-90" style={{ backgroundColor: 'var(--button-color)' }}>
                  Bulk Actions
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white curved-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--deep-blue-color)' }}>
                Escrow Transactions
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium" style={{ color: 'var(--light-text-color)' }}>
                      Order ID
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium" style={{ color: 'var(--light-text-color)' }}>
                      Amount
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium" style={{ color: 'var(--light-text-color)' }}>
                      Customer
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium" style={{ color: 'var(--light-text-color)' }}>
                      Merchant
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium" style={{ color: 'var(--light-text-color)' }}>
                      Status
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium" style={{ color: 'var(--light-text-color)' }}>
                      Escrow Date
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium" style={{ color: 'var(--light-text-color)' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="font-medium" style={{ color: 'var(--black-text-color)' }}>
                          {transaction.orderId}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold" style={{ color: 'var(--black-text-color)' }}>
                          ₦{transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span style={{ color: 'var(--light-text-color)' }}>{transaction.customer}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span style={{ color: 'var(--light-text-color)' }}>{transaction.merchant}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          <span className="capitalize">{transaction.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span style={{ color: 'var(--light-text-color)' }}>{transaction.escrowDate}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Eye className="w-4 h-4" style={{ color: 'var(--light-text-color)' }} />
                          </button>
                          {transaction.status === 'disputed' && (
                            <button
                              onClick={() => handleDisputeResolution(transaction)}
                              className="px-3 py-1 text-xs rounded-full text-white"
                              style={{ backgroundColor: 'var(--error-color)' }}
                            >
                              Resolve
                            </button>
                          )}
                          {transaction.status === 'pending' && (
                            <button className="px-3 py-1 text-xs rounded-full text-white" style={{ backgroundColor: 'var(--savings-green)' }}>
                              Release
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dispute Resolution Modal */}
        {showDisputeModal && selectedTransaction && (
          <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
            <div className="bg-white curved-card shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--deep-blue-color)' }}>
                    Dispute Resolution
                  </h2>
                  <button
                    onClick={closeDisputeModal}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                  >
                    <XCircle className="w-5 h-5" style={{ color: 'var(--light-text-color)' }} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-red-50 border border-red-200 curved-card p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" style={{ color: 'var(--error-color)' }} />
                    <span className="font-medium" style={{ color: 'var(--error-color)' }}>
                      Dispute Details
                    </span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: 'var(--light-text-color)' }}>
                    Order: {selectedTransaction.orderId} • Amount: ₦{selectedTransaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--light-text-color)' }}>
                    Reason: {selectedTransaction.disputeReason}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 curved-card p-4">
                    <h3 className="font-medium mb-2" style={{ color: 'var(--black-text-color)' }}>Customer</h3>
                    <p className="text-sm" style={{ color: 'var(--light-text-color)' }}>
                      {selectedTransaction.customer}
                    </p>
                  </div>
                  <div className="bg-gray-50 curved-card p-4">
                    <h3 className="font-medium mb-2" style={{ color: 'var(--black-text-color)' }}>Merchant</h3>
                    <p className="text-sm" style={{ color: 'var(--light-text-color)' }}>
                      {selectedTransaction.merchant}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--black-text-color)' }}>
                    Resolution Notes
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 curved-card focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter resolution details and decision rationale..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeDisputeModal}
                    className="px-4 py-2 curved-button border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 curved-button text-white" style={{ backgroundColor: 'var(--savings-green)' }}>
                    Release to Customer
                  </button>
                  <button className="px-4 py-2 curved-button text-white" style={{ backgroundColor: 'var(--button-color)' }}>
                    Release to Merchant
                  </button>
                  <button className="px-4 py-2 curved-button text-white" style={{ backgroundColor: 'var(--error-color)' }}>
                    Escalate Further
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminEscrowManagement;
