import React from "react";
import { isEventPast } from "../../utils";
import { EventCardContent } from "../ShotgunEvents/components/EventCard/EventCard";
import { EventCardProps } from "../ShotgunEvents/types";

type EventCardItemProps = {
  event: EventCardProps;
  index: number;
  isPreviewMode: boolean;
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
  isPreviewMode,
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
  const eventIsPast = isEventPast(event.date, event.time);
  const isDragEnabled = !isSelectionMode && !isPreviewMode;
  const displayEventNumber =
    event.eventNumber?.startsWith("HIDDEN_") || event.eventNumber?.startsWith("TEMP_")
      ? "---"
      : event.eventNumber || "---";
  const previewBadgeLabel =
    event.previewStatus === "created"
      ? "A ajouter"
      : event.previewStatus === "updated"
        ? "MAJ prevue"
        : null;

  return (
    <div
      key={event._id}
      draggable={isDragEnabled}
      onDragStart={(e) => isDragEnabled && onDragStart(e, event._id as string)}
      onDragOver={(e) => isDragEnabled && onDragOver(e, index)}
      onDragLeave={isDragEnabled ? onDragLeave : undefined}
      onDrop={(e) => isDragEnabled && onDrop(e, index)}
      onClick={() => isSelectionMode && !isPreviewMode && onToggleSelect(event._id as string)}
      className={`relative rounded-lg transition-all duration-200 ${
        isDragEnabled ? "cursor-move" : isSelectionMode ? "cursor-pointer" : "cursor-default"
      } ${draggedEventId === event._id ? "scale-95 opacity-50" : ""} ${
        dragOverIndex === index ? "scale-105 ring-2 ring-blue-400" : ""
      } ${isSelectionMode && isSelected ? "ring-4 ring-red-500" : ""} ${
        event.isHidden ? "opacity-50" : ""
      }`}
    >
      {previewBadgeLabel && (
        <div className="absolute left-3 top-3 z-10">
          <span
            className={`rounded px-2 py-1 text-xs font-bold ${
              event.previewStatus === "created"
                ? "bg-emerald-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {previewBadgeLabel}
          </span>
        </div>
      )}

      {isSelectionMode && !isPreviewMode && (
        <div className="absolute left-3 top-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onToggleSelect(event._id as string);
            }}
            className="h-6 w-6 cursor-pointer rounded"
          />
        </div>
      )}

      <div className="absolute right-3 top-3 z-10 flex gap-2">
        {event.isHidden && (
          <span className="rounded bg-orange-600 px-2 py-1 text-xs font-bold text-white">
            Masque
          </span>
        )}
        {event.isFeatured && (
          <span className="rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
            Phare
          </span>
        )}
        {eventIsPast ? (
          <span className="rounded bg-gray-600 px-2 py-1 text-xs text-gray-300">Passe</span>
        ) : (
          <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">A venir</span>
        )}
      </div>

      <EventCardContent
        imageSrc={event.imageSrc}
        title={event.title}
        eventNumberLabel={displayEventNumber}
        city={event.city}
        country={event.country}
        date={event.date}
        time={event.time}
        genres={event.genres}
        className="h-full hover:shadow-xl"
        footer={
          !isSelectionMode && !isPreviewMode ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(event);
                }}
                className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
              >
                Modifier
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleHide(event._id, event.isHidden || false);
                }}
                className={`flex-1 rounded px-3 py-2 text-sm text-white transition-colors ${
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
                className="flex-1 rounded bg-red-600 px-3 py-2 text-sm text-white transition-colors hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          ) : undefined
        }
      />
    </div>
  );
};

export default EventCardItem;
