import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { EventCardProps } from "../components/ShotgunEvents/types";
import { eventsService } from "../services/events.service";

/**
 * Hook personnalisé pour récupérer et traiter les événements
 * Implémente la stratégie cache-first avec background refresh
 */
export const useEvents = () => {
  const {
    data: rawEvents,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["events", "public"], // Clé différente pour le cache public vs admin
    queryFn: () => eventsService.getAllEvents(false), // NE PAS inclure les événements masqués côté public
    // Configuration spécifique pour les events (hérite de la config globale)
    staleTime: 10 * 60 * 1000, // 10 minutes pour les events (plus court car plus dynamique)
  });

  // Traitement et tri des événements en upcoming/past
  const processedEvents = useMemo(() => {
    if (!rawEvents) {
      return { upcomingEvents: [], pastEvents: [] };
    }

    const now = new Date();
    const upcoming: EventCardProps[] = [];
    const past: EventCardProps[] = [];

    rawEvents.forEach((event: EventCardProps) => {
      const [hours, minutes] = event.time.split(":");
      const eventDate = new Date(event.date);
      eventDate.setHours(parseInt(hours), parseInt(minutes));

      const processedGenres = Array.isArray(event.genres)
        ? event.genres
        : typeof event.genres === "string"
        ? JSON.parse(event.genres)
        : [];

      const processedEvent = {
        ...event,
        genres: processedGenres,
        isFree: Boolean(event.isFree),
      };

      if (eventDate > now) {
        upcoming.push({
          ...processedEvent,
          isPast: false,
        });
      } else {
        past.push({
          ...processedEvent,
          isPast: true,
        });
      }
    });

    // Tri par le champ 'order' (défini dans l'admin)
    // Si order n'est pas défini, on trie par date (du plus récent au plus ancien)
    upcoming.sort((a, b) => {
      // Si les deux ont un order défini, utiliser order
      if (a.order !== undefined && b.order !== undefined && a.order !== 0 && b.order !== 0) {
        return a.order - b.order;
      }
      // Sinon, trier par date (plus récent en premier)
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Ordre décroissant (plus récent d'abord)
    });
    
    past.sort((a, b) => {
      // Si les deux ont un order défini, utiliser order
      if (a.order !== undefined && b.order !== undefined && a.order !== 0 && b.order !== 0) {
        return a.order - b.order;
      }
      // Sinon, trier par date (plus récent en premier)
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Ordre décroissant (plus récent d'abord)
    });

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [rawEvents]);

  return {
    ...processedEvents,
    isLoading,
    error: isError ? "Erreur lors du chargement des événements" : null,
  };
};
