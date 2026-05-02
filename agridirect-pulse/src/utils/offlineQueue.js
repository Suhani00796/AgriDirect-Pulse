import { set, get, del, keys } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';

const QUEUE_STORE = 'offline-queue';

/**
 * Add listing to offline queue with UUID
 */
export const addToQueue = async (listing) => {
  try {
    const id = uuidv4();
    const queueItem = {
      id,
      ...listing,
      timestamp: Date.now(),
    };
    await set(`${QUEUE_STORE}:${id}`, queueItem);
    return id;
  } catch (error) {
    console.error('Error adding to queue:', error);
    throw error;
  }
};

/**
 * Get all queued items
 */
export const getQueue = async () => {
  try {
    const allKeys = await keys();
    const queueKeys = allKeys.filter(key => key.startsWith(QUEUE_STORE));
    
    const items = [];
    for (const key of queueKeys) {
      const item = await get(key);
      if (item) items.push(item);
    }
    
    return items;
  } catch (error) {
    console.error('Error getting queue:', error);
    return [];
  }
};

/**
 * Remove item from queue by ID
 */
export const removeFromQueue = async (id) => {
  try {
    await del(`${QUEUE_STORE}:${id}`);
  } catch (error) {
    console.error('Error removing from queue:', error);
    throw error;
  }
};

/**
 * Sync queue with server
 */
export const syncQueue = async (axiosInstance) => {
  const queue = await getQueue();
  
  if (queue.length === 0) return;

  for (const item of queue) {
    try {
      const { id, ...listing } = item;
      await axiosInstance.post('/api/v1/listings', listing);
      await removeFromQueue(id);
      console.log(`Successfully synced listing ${id}`);
    } catch (error) {
      console.error(`Failed to sync listing ${item.id}:`, error);
      // Continue with next item even if one fails
    }
  }
};
