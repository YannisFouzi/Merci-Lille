import React from "react";
import { EventCardProps } from "../ShotgunEvents/types";
import EventForm from "./EventForm";

type EventFormModalProps = {
  isOpen: boolean;
  event: EventCardProps | null;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};

const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  event,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto scrollbar-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-gray-900 rounded-lg p-4 w-full max-w-3xl max-h-[85vh] my-6 sm:my-8 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {event ? "Modifier un événement" : "Nouvel événement"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl px-2"
          >
            ✕
          </button>
        </div>
        <EventForm event={event || undefined} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default EventFormModal;
