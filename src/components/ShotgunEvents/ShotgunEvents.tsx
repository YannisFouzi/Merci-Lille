import React from "react";
import EventSection from "./components/EventSection/EventSection";
import { pastEvents, upcomingEvents } from "./data/events";
import "./ShotgunEvents.scss";

const ShotgunEvents: React.FC = () => {
  return (
    <div className="space-y-24">
      {" "}
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
