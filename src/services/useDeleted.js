// src/services/useDeleteAd.js
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAd() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (adId) => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/ads/${adId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Suppression impossible");
      return adId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAds"] });
    },
  });
}