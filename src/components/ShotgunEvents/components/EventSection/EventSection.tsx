import React, { useState } from "react";
import { EventCardProps } from "../../types";
import EventCard from "../EventCard/EventCard";

interface EventSectionProps {
  title: string;
  events: EventCardProps[];
}

const EventSection: React.FC<EventSectionProps> = ({ title, events }) => {
  const ITEMS_PER_PAGE = 6;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const showLoadMore = events.length > visibleItems;

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div>
      <h1 className="text-6xl font-bold text-center mb-16 text-white">
        {title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {events.slice(0, visibleItems).map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
      {showLoadMore && (
        <div className="mt-8 text-center">
          <button onClick={handleLoadMore} className="btn-load-more">
            Voir plus
          </button>
        </div>
      )}
    </div>
  );
};

export default EventSection;
