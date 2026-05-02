import { useState } from 'react';
import { usePrices } from '../hooks/usePrices';
import { PriceCard } from '../components/PriceCard';
import { Loader } from 'lucide-react';

export const Prices = () => {
  const [crop, setCrop] = useState('wheat');
  const [district, setDistrict] = useState('');
  const { data: prices, isLoading, error } = usePrices(crop, district);

  const crops = ['wheat', 'rice', 'maize', 'cotton', 'sugarcane', 'tomato'];
  const districts = ['Mumbai', 'Delhi', 'Punjab', 'Haryana', 'Karnataka', 'Gujarat'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Market Prices</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700"
              >
                {crops.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Enter district name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-primary-700" size={32} />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            Error loading prices. Please try again.
          </div>
        )}

        {/* Prices Grid */}
        {!isLoading && prices && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map?.((price, idx) => (
              <PriceCard
                key={idx}
                crop={price.crop}
                price={price.price}
                district={price.district}
                change={price.change || 0}
              />
            )) || (
              <div className="col-span-full text-center py-8 text-gray-500">
                No prices available for selected filters
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
