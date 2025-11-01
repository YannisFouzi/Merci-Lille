import { QueryClient } from "@tanstack/react-query";

// Configuration du QueryClient avec stratégie cache-first + background refresh
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Données considérées comme "fraîches" pendant 24h
      staleTime: 24 * 60 * 60 * 1000, // 24 heures

      // Pas de refresh automatique continu
      refetchInterval: false,

      // Refresh seulement quand nécessaire
      refetchOnWindowFocus: true, // Retour sur l'onglet
      refetchOnMount: true, // Nouvelle visite/mount du composant
      refetchOnReconnect: true, // Reconnexion internet

      // Retry en cas d'erreur
      retry: 2,
      retryDelay: (attemptIndex: number) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),

      // Cache les données même en cas d'erreur pendant 5 minutes
      gcTime: 5 * 60 * 1000, // Anciennement cacheTime
    },
  },
});
