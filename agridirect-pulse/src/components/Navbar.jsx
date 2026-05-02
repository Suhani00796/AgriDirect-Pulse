import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'text-primary-700 border-b-2 border-primary-700' : 'text-gray-600 hover:text-primary-700';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">AP</span>
            </div>
            <h1 className="text-xl font-bold text-primary-700 hidden sm:block">AgriDirect Pulse</h1>
          </Link>

          <div className="flex gap-6 items-center">
            <Link to="/prices" className={`pb-2 transition ${isActive('/prices')}`}>
              Prices
            </Link>
            <Link to="/marketplace" className={`pb-2 transition ${isActive('/marketplace')}`}>
              Marketplace
            </Link>
            <Link to="/calculator" className={`pb-2 transition ${isActive('/calculator')}`}>
              Calculator
            </Link>
            <Link 
              to="/login" 
              className="bg-primary-700 text-white px-4 py-2 rounded-md hover:bg-primary-800 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
