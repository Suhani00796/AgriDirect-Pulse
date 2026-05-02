import { useState } from 'react';
import { MapPin, Weight, Truck } from 'lucide-react';

export const LogisticsForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    originPin: '',
    destinationPin: '',
    weight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.originPin && formData.destinationPin && formData.weight) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary-700" />
            Origin Pincode
          </div>
        </label>
        <input
          type="text"
          name="originPin"
          value={formData.originPin}
          onChange={handleChange}
          placeholder="Enter origin pincode"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Truck size={18} className="text-primary-700" />
            Destination Pincode
          </div>
        </label>
        <input
          type="text"
          name="destinationPin"
          value={formData.destinationPin}
          onChange={handleChange}
          placeholder="Enter destination pincode"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Weight size={18} className="text-primary-700" />
            Weight (kg)
          </div>
        </label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Enter weight in kg"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700"
          min="0"
          step="0.1"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-700 text-white py-2 rounded-md hover:bg-primary-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Calculating...' : 'Calculate Cost'}
      </button>
    </form>
  );
};
