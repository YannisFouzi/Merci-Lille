import React from "react";
import { EventCardProps } from "../../types";
import { formatDate } from "../../utils/dateFormatter";

const EventCard: React.FC<EventCardProps> = ({
  imageSrc,
  title,
  eventNumber,
  city,
  country,
  date,
  time,
  isFree,
  price,
  genres,
  ticketLink,
  isPast = false,
}) => {
  return (
    <a
      href={ticketLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full hover:no-underline"
    >
      <div className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="w-full">
          <img src={imageSrc} alt={title} className="w-full object-contain" />
        </div>

        <div className="p-3 space-y-2 flex flex-col">
          <div className="flex justify-between items-start">
            <h2 className="text-base font-bold text-white pr-4">{title}</h2>{" "}
            <span className="text-gray-400 flex-shrink-0 ml-2 text-sm">
              #{eventNumber}
            </span>
          </div>

          <div className="text-gray-300 text-sm">
            <p>
              {city}
              {country ? `, ${country}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-500 font-bold">{formatDate(date)}</span>
            <span className="text-white">|</span>
            <span className="text-red-500 font-bold">{time}</span>
            <span className="text-white font-bold">
              {isFree ? "Gratuit" : `${price} €`}
            </span>
          </div>

          <div className="min-h-[3rem]">
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-xs text-gray-300 px-2 py-0.5 rounded-full border border-gray-600"
                >
                  {typeof genre === "string" && genre.startsWith("[")
                    ? JSON.parse(genre)[0]
                    : genre}
                </span>
              ))}
            </div>
          </div>

          {!isPast && (
            <div className="w-full mt-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(ticketLink, "_blank", "noopener,noreferrer");
                }}
                className="btn w-full"
              >
                Réserver
              </button>
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default EventCard;
