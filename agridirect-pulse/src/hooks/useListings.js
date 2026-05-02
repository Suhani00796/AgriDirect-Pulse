import { useQuery } from 'react-query';
import axiosInstance from '../api/axiosInstance';

export const useListings = (page = 1, limit = 10) => {
  return useQuery(
    ['listings', page],
    async () => {
      const { data } = await axiosInstance.get(
        `/api/v1/listings?page=${page}&limit=${limit}`
      );
      return data;
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
      cacheTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
};
