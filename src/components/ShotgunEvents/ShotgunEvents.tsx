// src/components/ShotgunEvents/ShotgunEvents.tsx
import React, { useEffect, useState } from "react";
import { eventsService } from "../../services/events.service";
import EventSection from "./components/EventSection/EventSection";
import "./ShotgunEvents.scss";

const ShotgunEvents: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventCardProps[]>([]);
  const [pastEvents, setPastEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const allEvents = await eventsService.getAllEvents();

        // Tri des événements
        const now = new Date();
        const upcoming: EventCardProps[] = [];
        const past: EventCardProps[] = [];

        allEvents.forEach((event: EventCardProps) => {
          const eventDate = new Date(event.date);
          // On compare la date de l'événement avec aujourd'hui
          if (eventDate >= now) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });

        // Tri par date
        upcoming.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        past.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setError("");
      } catch (err) {
        setError("Erreur lors du chargement des événements");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-white">Chargement des événements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-24">
      {upcomingEvents.length > 0 && (
        <EventSection title="Évènements à venir" events={upcomingEvents} />
      )}
      {pastEvents.length > 0 && (
        <EventSection title="Évènements passés" events={pastEvents} />
      )}
    </div>
  );
};

export default ShotgunEvents;

// Mise à jour de types.ts pour inclure l'ID MongoDB
export interface EventCardProps {
  _id: string; // Ajout de l'ID MongoDB
  imageSrc: string;
  title: string;
  eventNumber: string;
  city: string;
  country?: string;
  date: string;
  time: string;
  isFree?: boolean;
  genres: string[];
  ticketLink: string;
  isPast?: boolean;
}
