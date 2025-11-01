import React from "react";
import { useEvents } from "../../hooks/useEvents";
import EventSection from "./components/EventSection/EventSection";
import "./ShotgunEvents.scss";

const ShotgunEvents: React.FC = () => {
  const { featuredEvents, upcomingEvents, pastEvents, isLoading, error } = useEvents();

  if (isLoading) {
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
      {featuredEvents.length > 0 && (
        <EventSection title="Évènements phares" events={featuredEvents} />
      )}
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
