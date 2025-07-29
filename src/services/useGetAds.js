// Hook React Query pour récupérer les annonces
import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function useGetAds(filters = {}) {
  return useQuery({
    queryKey: ['ads', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await api.get(`/ads${params ? '?' + params : ''}`);
      // On s'assure de toujours retourner un tableau
      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.data.ads)) return res.data.ads;
      return [];
    },
  });

}
