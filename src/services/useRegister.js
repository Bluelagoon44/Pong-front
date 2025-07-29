// Hook React Query pour l'inscription
import { useMutation } from '@tanstack/react-query';
import api from './axios';

export function useRegister() {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/auth/register', data);
      return res.data;
    }
  });
}

