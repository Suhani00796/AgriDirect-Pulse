import { useQuery } from 'react-query';
import axiosInstance from '../api/axiosInstance';

export const usePrices = (crop, district) => {
  return useQuery(
    ['prices', crop, district],
    async () => {
      const params = new URLSearchParams();
      if (crop) params.append('crop', crop);
      if (district) params.append('district', district);
      
      const { data } = await axiosInstance.get(`/api/v1/prices?${params}`);
      return data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    }
  );
};
