import React from "react";
import { EventCardProps } from "../ShotgunEvents/types";
import { formatDate } from "../ShotgunEvents/utils/dateFormatter";

type EventCardItemProps = {
  event: EventCardProps;
  index: number;
  isSelectionMode: boolean;
  isSelected: boolean;
  draggedEventId: string | null;
  dragOverIndex: number | null;
  onToggleSelect: (eventId: string) => void;
  onDragStart: (e: React.DragEvent, eventId: string) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onEdit: (event: EventCardProps) => void;
  onToggleHide: (eventId: string | undefined, isHidden: boolean) => void;
  onDelete: (eventId: string | undefined) => void;
};

const EventCardItem: React.FC<EventCardItemProps> = ({
  event,
  index,
  isSelectionMode,
  isSelected,
  draggedEventId,
  dragOverIndex,
  onToggleSelect,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onEdit,
  onToggleHide,
  onDelete,
}) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  const [hours, minutes] = event.time.split(":");
  eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
  const isPast = eventDate <= now;

  return (
    <div
      key={event._id}
      draggable={!isSelectionMode}
      onDragStart={(e) => !isSelectionMode && onDragStart(e, event._id as string)}
      onDragOver={(e) => !isSelectionMode && onDragOver(e, index)}
      onDragLeave={!isSelectionMode ? onDragLeave : undefined}
      onDrop={(e) => !isSelectionMode && onDrop(e, index)}
      onClick={() => isSelectionMode && onToggleSelect(event._id as string)}
      className={`relative bg-gray-800 rounded-lg overflow-hidden transition-all duration-200 ${
        !isSelectionMode ? "cursor-move" : "cursor-pointer"
      } ${draggedEventId === event._id ? "opacity-50 scale-95" : ""} ${
        dragOverIndex === index ? "ring-2 ring-blue-400 scale-105" : ""
      } ${
        isSelectionMode && isSelected ? "ring-4 ring-red-500" : ""
      } ${event.isHidden ? "opacity-50" : ""}`}
    >
      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-sm font-bold px-3 py-1 rounded z-10">
        #
        {event.eventNumber?.startsWith("HIDDEN_") ||
        event.eventNumber?.startsWith("TEMP_")
          ? "---"
          : event.eventNumber || "---"}
      </div>

      {isSelectionMode && (
        <div className="absolute top-2 left-16 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onToggleSelect(event._id as string);
            }}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      )}

      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {event.isHidden && (
          <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded font-bold">
            Masqué
          </span>
        )}
        {event.isFeatured && (
          <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold">
            Phare
          </span>
        )}
        {isPast ? (
          <span className="bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded">
            Passé
          </span>
        ) : (
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
            À venir
          </span>
        )}
      </div>

      <div className="h-48 overflow-hidden">
        <img
          src={event.imageSrc}
          alt={event.title}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-white font-bold text-lg truncate">{event.title}</h3>
        <div className="text-gray-400 text-sm space-y-1">
          <p className="flex items-center gap-2">
            <span role="img" aria-label="date">
              📅
            </span>
            <span>{formatDate(event.date)}</span>
          </p>
          <p className="flex items-center gap-2">
            <span role="img" aria-label="location">
              📍
            </span>
            <span>{event.city}</span>
          </p>
          <p className="flex items-center gap-2">
            <span role="img" aria-label="genres">
              🎵
            </span>
            <span className="truncate">
              {event.genres && event.genres.length > 0
                ? event.genres.join(", ")
                : "Aucun genre"}
            </span>
          </p>
        </div>

        {!isSelectionMode && (
          <div className="flex gap-2 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(event);
              }}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Modifier
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleHide(event._id, event.isHidden || false);
              }}
              className={`flex-1 px-3 py-2 text-white text-sm rounded transition-colors ${
                event.isHidden
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {event.isHidden ? "Afficher" : "Masquer"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(event._id);
              }}
              className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCardItem;
