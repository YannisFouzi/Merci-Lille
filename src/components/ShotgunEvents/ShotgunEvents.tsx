import React, { useEffect, useState } from "react";
import { eventsService } from "../../services/events.service";
import EventSection from "./components/EventSection/EventSection";
import "./ShotgunEvents.scss";
import { EventCardProps } from "./types";

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

        const now = new Date();
        const upcoming: EventCardProps[] = [];
        const past: EventCardProps[] = [];

        allEvents.forEach((event: EventCardProps) => {
          const [hours, minutes] = event.time.split(":");
          const eventDate = new Date(event.date);
          eventDate.setHours(parseInt(hours), parseInt(minutes));

          if (eventDate > now) {
            upcoming.push({
              ...event,
              isFree: Boolean(event.isFree),
            });
          } else {
            past.push({
              ...event,
              isFree: Boolean(event.isFree),
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
