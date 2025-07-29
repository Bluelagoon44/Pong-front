// Hook React Query pour créer une annonce
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './axios';
import { useAuthStore } from '../features/authStore';

export function useCreateAd() {
  const token = useAuthStore(s => s.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/ads', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    }
  });
}
