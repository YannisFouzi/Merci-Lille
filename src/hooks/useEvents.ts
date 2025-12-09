import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { EventCardProps } from "../components/ShotgunEvents/types";
import { eventsService } from "../services/events.service";
import {
  parseEventGenres,
  sortEventsByOrderOrDate,
  isEventPast,
} from "../utils";

/**
 * Hook personnalisé pour récupérer et traiter les événements
 * Implémente la stratégie cache-first avec background refresh
 */
export const useEvents = () => {
  const {
    data: rawEvents,
    isLoading,
    error: ignoredError,
    isError,
  } = useQuery({
    queryKey: ["events", "public"], // Clé différente pour le cache public vs admin
    queryFn: () => eventsService.getAllEvents(false), // NE PAS inclure les événements masqués côté public
    // Configuration spécifique pour les events (hérite de la config globale)
    staleTime: 10 * 60 * 1000, // 10 minutes pour les events (plus court car plus dynamique)
  });

  // Traitement et tri des événements en featured/upcoming/past
  const processedEvents = useMemo(() => {
    if (!rawEvents) {
      return { featuredEvents: [], upcomingEvents: [], pastEvents: [] };
    }

    const now = new Date();
    const featured: EventCardProps[] = [];
    const upcoming: EventCardProps[] = [];
    const past: EventCardProps[] = [];

    rawEvents.forEach((event: EventCardProps) => {
      const isPast = isEventPast(event.date, event.time, now);

      const processedEvent = {
        ...event,
        genres: parseEventGenres(event.genres),
      };

      // Si l'événement est marqué comme phare, l'ajouter à la liste featured
      if (event.isFeatured) {
        featured.push({
          ...processedEvent,
          isPast,
        });
      }

      // Ajouter aussi l'événement dans upcoming ou past (duplication intentionnelle)
      if (isPast) {
        past.push({
          ...processedEvent,
          isPast: true,
        });
      } else {
        upcoming.push({
          ...processedEvent,
          isPast: false,
        });
      }
    });

    // Tri par le champ 'order' (défini dans l'admin)
    // Si order n'est pas défini, on trie par date (du plus récent au plus ancien)
    const sortedFeatured = sortEventsByOrderOrDate(featured);
    const sortedUpcoming = sortEventsByOrderOrDate(upcoming);
    const sortedPast = sortEventsByOrderOrDate(past);

    return {
      featuredEvents: sortedFeatured,
      upcomingEvents: sortedUpcoming,
      pastEvents: sortedPast,
    };
  }, [rawEvents]);

  return {
    ...processedEvents,
    isLoading,
    error: isError ? "Erreur lors du chargement des événements" : null,
  };
};
