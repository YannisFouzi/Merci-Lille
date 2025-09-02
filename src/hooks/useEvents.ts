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
    queryKey: ["events"],
    queryFn: eventsService.getAllEvents,
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

    // Tri par date avec heure
    upcoming.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const [hoursA, minutesA] = a.time.split(":");
      const [hoursB, minutesB] = b.time.split(":");
      dateA.setHours(parseInt(hoursA), parseInt(minutesA));
      dateB.setHours(parseInt(hoursB), parseInt(minutesB));
      return dateA.getTime() - dateB.getTime();
    });

    past.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const [hoursA, minutesA] = a.time.split(":");
      const [hoursB, minutesB] = b.time.split(":");
      dateA.setHours(parseInt(hoursA), parseInt(minutesA));
      dateB.setHours(parseInt(hoursB), parseInt(minutesB));
      return dateB.getTime() - dateA.getTime();
    });

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [rawEvents]);

  return {
    ...processedEvents,
    isLoading,
    error: isError ? "Erreur lors du chargement des événements" : null,
  };
};
