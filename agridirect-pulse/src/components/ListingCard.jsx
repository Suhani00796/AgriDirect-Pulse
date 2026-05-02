import { Heart } from 'lucide-react';
import { useState } from 'react';

export const ListingCard = ({ listing, onPostOffline }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="aspect-square bg-gray-200 flex items-center justify-center">
        <img 
          src={listing.image || 'https://via.placeholder.com/300?text=' + listing.crop}
          alt={listing.crop}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{listing.crop}</h3>
            <p className="text-sm text-gray-500">{listing.location}</p>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <Heart 
              size={20} 
              className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </button>
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-primary-700">₹{listing.price}</span>
          <span className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded">
            {listing.quantity} {listing.unit}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">{listing.description}</p>

        <button
          onClick={() => onPostOffline?.(listing)}
          className="w-full bg-primary-700 text-white py-2 rounded-md hover:bg-primary-800 transition font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
