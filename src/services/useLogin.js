// Hook React Query pour la connexion
import { useMutation } from '@tanstack/react-query';
import api from './axios';

import { useAuthStore } from '../features/authStore';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/auth/login', data);
      setAuth(res.data.user, res.data.token);
      return res.data;
    }
  });
}

