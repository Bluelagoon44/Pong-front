import { useQuery } from '@tanstack/react-query';
import api from './axios';
import { useAuthStore } from '../features/authStore';

export function useGetMyAds() {
  const token = useAuthStore(s => s.token);
  return useQuery({
    queryKey: ['my-ads'],
    queryFn: async () => {
      const res = await api.get('/my-ads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  });
}
