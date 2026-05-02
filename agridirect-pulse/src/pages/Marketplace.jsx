import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useListings } from '../hooks/useListings';
import { useOfflineQueue } from '../hooks/useOfflineQueue';
import axiosInstance from '../api/axiosInstance';
import { ListingCard } from '../components/ListingCard';
import { addToQueue } from '../utils/offlineQueue';
import { Plus, Loader, Wifi, WifiOff } from 'lucide-react';

export const Marketplace = () => {
  const { data: listings, isLoading, error } = useListings();
  const { queueCount } = useOfflineQueue();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Handle posting listing
  const { mutate: postListing, isLoading: isPosting } = useMutation(
    async (listing) => {
      if (isOnline) {
        return await axiosInstance.post('/api/v1/listings', listing);
      } else {
        await addToQueue(listing);
      }
    },
    {
      onSuccess: () => {
        alert(isOnline ? 'Listing posted successfully!' : 'Listing saved offline - will sync when online');
      },
      onError: () => {
        alert('Error posting listing');
      },
    }
  );

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-600 mt-2">Browse and sell agricultural products</p>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isOnline ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {isOnline ? <Wifi size={18} /> : <WifiOff size={18} />}
              <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            
            {queueCount > 0 && (
              <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium">
                {queueCount} pending posts
              </div>
            )}
            
            <button
              onClick={() => {
                const dummyListing = {
                  crop: 'Tomato',
                  location: 'Mumbai',
                  price: 45,
                  quantity: 50,
                  unit: 'kg',
                  description: 'Fresh organic tomatoes',
                };
                postListing(dummyListing);
              }}
              disabled={isPosting}
              className="bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition flex items-center gap-2 font-medium disabled:opacity-50"
            >
              <Plus size={20} />
              Post Listing
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            Error loading marketplace. Please try again.
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-primary-700" size={32} />
          </div>
        )}

        {/* Listings Grid */}
        {!isLoading && listings && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map?.((listing, idx) => (
              <ListingCard
                key={idx}
                listing={listing}
                onPostOffline={() => postListing(listing)}
              />
            )) || (
              <div className="col-span-full text-center py-8 text-gray-500">
                No listings available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
