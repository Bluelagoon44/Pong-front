import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './axios';
import { useAuthStore } from '../features/authStore';

export function useRegisterToAd() {
  const token = useAuthStore(s => s.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (adId) => {
      const res = await api.post(`/ads/${adId}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['my-ads'] });
    }
  });
}
