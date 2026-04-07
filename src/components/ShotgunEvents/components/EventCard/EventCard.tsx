import React from "react";
import { parseEventGenres } from "../../../../utils";
import { EventCardProps } from "../../types";
import { formatDate } from "../../utils/dateFormatter";

type EventCardContentProps = Pick<
  EventCardProps,
  "imageSrc" | "title" | "city" | "country" | "date" | "time" | "genres"
> & {
  eventNumberLabel: string;
  className?: string;
  footer?: React.ReactNode;
};

const getDisplayGenres = (genres: EventCardProps["genres"]): string[] =>
  parseEventGenres(genres).flatMap((genre) => {
    if (typeof genre !== "string") {
      return [];
    }

    const trimmedGenre = genre.trim();
    if (!trimmedGenre) {
      return [];
    }

    if (trimmedGenre.startsWith("[")) {
      try {
        const parsedGenre = JSON.parse(trimmedGenre);
        if (Array.isArray(parsedGenre)) {
          return parsedGenre.filter(
            (item): item is string => typeof item === "string" && item.trim().length > 0
          );
        }
      } catch {
        return [trimmedGenre];
      }
    }

    return [trimmedGenre];
  });

export const EventCardContent: React.FC<EventCardContentProps> = ({
  imageSrc,
  title,
  eventNumberLabel,
  city,
  country,
  date,
  time,
  genres,
  className = "",
  footer,
}) => {
  const displayGenres = getDisplayGenres(genres);

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-shadow duration-300 ${className}`.trim()}
    >
      <div className="w-full aspect-[16/9] overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-bold text-white">{title}</h2>
          <span className="flex-shrink-0 text-sm text-gray-400">#{eventNumberLabel}</span>
        </div>

        <div className="text-sm text-gray-300">
          <p>
            {city}
            {country ? `, ${country}` : ""}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-red-500">{formatDate(date)}</span>
          <span className="text-white">|</span>
          <span className="font-bold text-red-500">{time}</span>
        </div>

        <div className="min-h-[3rem]">
          <div className="flex flex-wrap gap-1.5">
            {displayGenres.map((genre, index) => (
              <span
                key={`${genre}-${index}`}
                className="rounded-full border border-gray-600 bg-gray-700 px-2 py-0.5 text-xs text-gray-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {footer ? <div className="mt-auto w-full">{footer}</div> : null}
      </div>
    </div>
  );
};

const EventCard: React.FC<EventCardProps> = ({
  imageSrc,
  title,
  eventNumber,
  city,
  country,
  date,
  time,
  genres,
  ticketLink,
  isPast = false,
}) => {
  return (
    <a
      href={ticketLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full w-full hover:no-underline"
    >
      <EventCardContent
        imageSrc={imageSrc}
        title={title}
        eventNumberLabel={eventNumber}
        city={city}
        country={country}
        date={date}
        time={time}
        genres={genres}
        className="hover:shadow-xl"
        footer={
          !isPast ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open(ticketLink, "_blank", "noopener,noreferrer");
              }}
              className="btn w-full"
            >
              {"R\u00E9server"}
            </button>
          ) : undefined
        }
      />
    </a>
  );
};

export default React.memo(EventCard);
