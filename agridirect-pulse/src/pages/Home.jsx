import { TrendingUp, ShoppingCart, Zap } from 'lucide-react';

export const Home = () => {
  const stats = [
    {
      icon: TrendingUp,
      label: 'Average Price',
      value: '₹2,450/kg',
      description: 'Last 24 hours',
    },
    {
      icon: ShoppingCart,
      label: 'Active Listings',
      value: '1,234',
      description: 'Near you',
    },
    {
      icon: Zap,
      label: 'Avg. Savings',
      value: '35%',
      description: 'By using platform',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Direct Connect to <span className="text-primary-700">Fair Prices</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AgriDirect Pulse connects farmers directly with buyers, eliminating middlemen 
            and ensuring competitive market prices in real-time.
          </p>
          <button className="bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-800 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-gray-500 text-sm mt-1">{stat.description}</p>
                  </div>
                  <div className="p-4 bg-primary-100 rounded-lg">
                    <Icon size={28} className="text-primary-700" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose AgriDirect Pulse?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Real-time Price Updates</h3>
            <p className="text-gray-600">Get live market prices updated every minute, helping you make informed decisions quickly.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Offline Support</h3>
            <p className="text-gray-600">Post listings and manage your business even without internet - sync automatically when online.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Logistics Integration</h3>
            <p className="text-gray-600">Calculate transportation costs instantly with our built-in logistics calculator.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Mobile First</h3>
            <p className="text-gray-600">Fully responsive design optimized for mobile devices - manage your business on the go.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
