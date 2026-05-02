import { useState } from 'react';
import { useMutation } from 'react-query';
import axiosInstance from '../api/axiosInstance';
import { LogisticsForm } from '../components/LogisticsForm';
import { Loader } from 'lucide-react';

export const Calculator = () => {
  const [result, setResult] = useState(null);

  const { mutate: calculateCost, isLoading } = useMutation(
    async (data) => {
      const response = await axiosInstance.post('/api/v1/calculate-logistics', data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setResult(data);
      },
      onError: () => {
        alert('Error calculating cost');
      },
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Logistics Calculator</h1>
        <p className="text-gray-600 mb-8">Calculate transportation costs for your shipments</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <LogisticsForm 
              onSubmit={(data) => calculateCost(data)}
              loading={isLoading}
            />
          </div>

          {/* Results */}
          <div>
            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-primary-700" size={32} />
              </div>
            )}

            {result && !isLoading && (
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Calculation Result</h3>
                
                <div className="border-b pb-4">
                  <p className="text-gray-600 text-sm">Base Cost</p>
                  <p className="text-2xl font-bold text-gray-900">₹{result.baseCost?.toFixed(2) || 'N/A'}</p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-gray-600 text-sm">Distance</p>
                  <p className="text-lg font-semibold text-gray-900">{result.distance || 'N/A'} km</p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-gray-600 text-sm">Taxes & Fees</p>
                  <p className="text-lg font-semibold text-gray-900">₹{result.taxes?.toFixed(2) || 'N/A'}</p>
                </div>

                <div className="bg-primary-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-2">Total Cost</p>
                  <p className="text-3xl font-bold text-primary-700">₹{result.totalCost?.toFixed(2) || 'N/A'}</p>
                </div>

                <div className="bg-accent-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-2">Cost per kg</p>
                  <p className="text-2xl font-bold text-accent-700">₹{result.costPerKg?.toFixed(2) || 'N/A'}</p>
                </div>

                <button className="w-full bg-primary-700 text-white py-2 rounded-md hover:bg-primary-800 transition font-medium mt-4">
                  Proceed with Shipment
                </button>
              </div>
            )}

            {!isLoading && !result && (
              <div className="bg-white rounded-lg shadow-md p-6 h-64 flex items-center justify-center text-gray-500 text-center">
                <p>Fill in the form and calculate to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
