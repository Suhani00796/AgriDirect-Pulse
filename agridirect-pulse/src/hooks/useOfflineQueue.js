import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { getQueue, syncQueue, addToQueue } from '../utils/offlineQueue';

export const useOfflineQueue = () => {
  const [queueCount, setQueueCount] = useState(0);

  // On mount: register online event listener
  useEffect(() => {
    const updateQueueCount = async () => {
      const queue = await getQueue();
      setQueueCount(queue.length);
    };

    // Initial count
    updateQueueCount();

    // Listen for online event
    const handleOnline = async () => {
      console.log('Browser online - syncing queue');
      await syncQueue(axiosInstance);
      await updateQueueCount();
    };

    window.addEventListener('online', handleOnline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return { 
    queueCount,
    addToQueue,
  };
};
