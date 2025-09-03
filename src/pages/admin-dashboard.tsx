
import { useState, useEffect } from 'react';
import { useAdmin } from '../lib/admin-auth';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Shield,
  MessageSquare,
  BarChart3,
  Monitor,
  Home,
  LogOut,
  CreditCard
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeDrivers: number;
  pendingKyc: number;
  disputedTransactions: number;
  escrowBalance: number;
  dailyVolume: number;
  supportTickets: number;
}

export function AdminDashboard() {
  const { user, logout, isAuthenticated, isLoading } = useAdmin();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 24847,
    totalOrders: 2847,
    totalRevenue: 156800000,
    activeDrivers: 2497,
    pendingKyc: 23,
    disputedTransactions: 7,
    escrowBalance: 12400000,
    dailyVolume: 156800000,
    supportTickets: 48
  });
  const [currentTime, setCurrentTime] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/admin/login';
    return null;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'users', label: 'User Management', icon: Users, badge: '23' },
    { id: 'escrow', label: 'Escrow Management', icon: Shield, badge: '7' },
    { id: 'transactions', label: 'Transactions', icon: CreditCard, badge: '3' },
    { id: 'support', label: 'Support & Tickets', icon: MessageSquare, badge: '15' },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3, badge: null },
    { id: 'security', label: 'Security & Fraud', icon: Shield, badge: 'pulse' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-['Montserrat']">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[rgb(11,26,81)]">
              <span className="text-white font-bold text-lg">BP</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[rgb(11,26,81)]">Brill Prime</h2>
              <p className="text-xs text-[rgb(78,82,95)]">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-[rgb(70,130,180)]' : 'text-[rgb(78,82,95)] hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge === 'pulse' && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
                {item.badge && item.badge !== 'pulse' && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-[rgb(13,13,13)]">{user?.fullName || 'Admin User'}</p>
              <p className="text-xs text-[rgb(78,82,95)]">Super Admin</p>
            </div>
            <button
              onClick={logout}
              className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 text-[rgb(78,82,95)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[rgb(11,26,81)]">Admin Dashboard</h1>
              <p className="text-sm text-[rgb(78,82,95)]">Platform overview and system monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Real-time Indicators */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-[rgb(27,151,84)]">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-[rgb(78,82,95)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm text-[rgb(78,82,95)]">{currentTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Critical Alerts */}
          <div className="mb-6">
            <div className="grid gap-4">
              <div className="bg-[rgba(200,16,46,0.1)] border-l-4 border-[rgb(200,16,46)] p-4 rounded-[25px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-[rgb(200,16,46)]" />
                    <div>
                      <h3 className="font-bold text-sm text-[rgb(200,16,46)]">Critical: Fraudulent Transaction Detected</h3>
                      <p className="text-xs text-[rgb(78,82,95)]">Transaction ID: TXN-4521 flagged for review - ₦45,000</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium px-4 py-2 rounded-[25px] bg-[rgb(200,16,46)] text-white">
                    Review Now
                  </button>
                </div>
              </div>

              <div className="bg-[rgba(245,158,11,0.1)] border-l-4 border-yellow-500 p-4 rounded-[25px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
                    <div>
                      <h3 className="font-bold text-sm text-yellow-700">Escrow Dispute Escalated</h3>
                      <p className="text-xs text-[rgb(78,82,95)]">Order #1245 - Customer vs Merchant dispute requires admin intervention</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium px-4 py-2 rounded-[25px] bg-yellow-500 text-white">
                    Handle Dispute
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-white rounded-[25px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[rgb(70,130,180)]" />
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">+12.5%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-[rgb(13,13,13)]">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-[rgb(78,82,95)]">Total Active Users</p>
                <div className="flex items-center mt-2 text-xs text-[rgb(78,82,95)]">
                  <span>Consumers: 18,250 • Merchants: 4,100 • Drivers: 2,497</span>
                </div>
              </div>
            </div>

            {/* Escrow Balance */}
            <div className="bg-white rounded-[25px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[rgb(27,151,84)]" />
                </div>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">7 Pending</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-[rgb(13,13,13)]">₦{(stats.escrowBalance / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-[rgb(78,82,95)]">Total Escrow Balance</p>
                <div className="flex items-center mt-2 text-xs text-[rgb(78,82,95)]">
                  <span>Active: ₦8.2M • Disputed: ₦4.2M</span>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-[25px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[rgb(124,45,252)]" />
                </div>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Real-time</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-[rgb(13,13,13)]">₦{(stats.dailyVolume / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-[rgb(78,82,95)]">Daily Transaction Volume</p>
                <div className="flex items-center mt-2 text-xs text-[rgb(78,82,95)]">
                  <span>{stats.totalOrders} transactions today</span>
                </div>
              </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-[25px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">15 Open</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-[rgb(13,13,13)]">{stats.supportTickets}</p>
                <p className="text-sm text-[rgb(78,82,95)]">Support Tickets Today</p>
                <div className="flex items-center mt-2 text-xs text-[rgb(78,82,95)]">
                  <span>Avg response: 2.4 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities & System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Admin Actions */}
            <div className="bg-white rounded-[25px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[rgb(11,26,81)]">Recent Admin Actions</h2>
                <button className="text-sm font-medium text-[rgb(70,130,180)]">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[rgb(13,13,13)]">Merchant Account Suspended</p>
                    <p className="text-xs text-[rgb(78,82,95)]">TechStore247 - Violation of terms • 5 min ago</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-4 h-4 text-[rgb(27,151,84)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[rgb(13,13,13)]">Escrow Released</p>
                    <p className="text-xs text-[rgb(78,82,95)]">Order #4521 - ₦12,500 released to merchant • 12 min ago</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 text-[rgb(70,130,180)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[rgb(13,13,13)]">Driver Account Approved</p>
                    <p className="text-xs text-[rgb(78,82,95)]">John Driver - Lagos Zone • 25 min ago</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[rgb(13,13,13)]">Fraud Alert Triggered</p>
                    <p className="text-xs text-[rgb(78,82,95)]">Multiple failed login attempts detected • 1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-[25px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[rgb(11,26,81)]">System Health</h2>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-[rgb(27,151,84)]">All Systems Operational</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-[rgb(13,13,13)]">Payment Gateway</span>
                  </div>
                  <span className="text-sm text-[rgb(27,151,84)]">Online</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-[rgb(13,13,13)]">Database</span>
                  </div>
                  <span className="text-sm text-[rgb(27,151,84)]">Optimal</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-[rgb(13,13,13)]">API Response Time</span>
                  </div>
                  <span className="text-sm text-yellow-600">245ms</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-[rgb(13,13,13)]">SMS Service</span>
                  </div>
                  <span className="text-sm text-[rgb(27,151,84)]">Active</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-[rgb(13,13,13)]">Escrow Service</span>
                  </div>
                  <span className="text-sm text-[rgb(27,151,84)]">Running</span>
                </div>

                {/* Server Stats */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-[rgb(13,13,13)]">99.9%</p>
                      <p className="text-xs text-[rgb(78,82,95)]">Uptime</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[rgb(13,13,13)]">2.1s</p>
                      <p className="text-xs text-[rgb(78,82,95)]">Avg Response</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[25px] shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6 text-[rgb(11,26,81)]">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => setActiveSection('escrow')}
                className="p-4 border border-[rgb(232,233,235)] rounded-[25px] hover:shadow-md transition-all duration-200"
              >
                <Shield className="w-8 h-8 mx-auto mb-2 text-[rgb(70,130,180)]" />
                <p className="text-sm font-medium text-[rgb(13,13,13)]">Manage Escrow</p>
              </button>

              <button 
                onClick={() => setActiveSection('users')}
                className="p-4 border border-[rgb(232,233,235)] rounded-[25px] hover:shadow-md transition-all duration-200"
              >
                <Users className="w-8 h-8 mx-auto mb-2 text-[rgb(27,151,84)]" />
                <p className="text-sm font-medium text-[rgb(13,13,13)]">Approve Users</p>
              </button>

              <button 
                onClick={() => setActiveSection('transactions')}
                className="p-4 border border-[rgb(232,233,235)] rounded-[25px] hover:shadow-md transition-all duration-200"
              >
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-[rgb(124,45,252)]" />
                <p className="text-sm font-medium text-[rgb(13,13,13)]">Review Transactions</p>
              </button>

              <button 
                onClick={() => setActiveSection('support')}
                className="p-4 border border-[rgb(232,233,235)] rounded-[25px] hover:shadow-md transition-all duration-200"
              >
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="text-sm font-medium text-[rgb(13,13,13)]">Handle Support</p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
