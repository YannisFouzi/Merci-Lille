import React, { useState } from "react";
import { EventCardProps } from "../../components/ShotgunEvents/types";
import { eventsService } from "../../services/events.service";

interface EventFormProps {
  event?: EventCardProps;
  onSubmit: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit }) => {
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState<Omit<EventCardProps, "_id">>(
    event
      ? {
          ...event,
          date: formatDateForInput(event.date), // Formatage de la date existante
          genres: Array.isArray(event.genres)
            ? event.genres
            : typeof event.genres === "string"
            ? JSON.parse(event.genres)
            : [],
        }
      : {
          title: "",
          eventNumber: "",
          city: "",
          date: "",
          time: "",
          genres: [] as string[],
          ticketLink: "",
          isFree: false,
          imageSrc: "",
        }
  );
  const [image, setImage] = useState<File | null>(null);
  const [newGenre, setNewGenre] = useState("");

  const handleAddGenre = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGenre.trim() && !formData.genres.includes(newGenre.trim())) {
      setFormData({
        ...formData,
        genres: [...formData.genres, newGenre.trim()],
      });
      setNewGenre("");
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    setFormData({
      ...formData,
      genres: formData.genres.filter((genre) => genre !== genreToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "genres") {
        data.append(
          key,
          JSON.stringify(Array.isArray(value) ? value : [value])
        );
      } else {
        data.append(key, value.toString());
      }
    });

    if (image) {
      data.append("image", image);
    }

    try {
      if (event?._id) {
        await eventsService.updateEvent(event._id, data);
      } else {
        await eventsService.createEvent(data);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-900 p-6 rounded-lg"
    >
      <div className="space-y-4">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Titre de l'événement"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.eventNumber}
            onChange={(e) =>
              setFormData({ ...formData, eventNumber: e.target.value })
            }
            placeholder="Numéro d'événement"
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />

          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Ville"
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />

          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          accept="image/*"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          required={!event}
        />

        <input
          type="text"
          value={formData.ticketLink}
          onChange={(e) =>
            setFormData({ ...formData, ticketLink: e.target.value })
          }
          placeholder="Lien billetterie"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          required
        />

        {/* Section des genres */}
        <div className="space-y-2">
          <label className="text-white block">Genres musicaux</label>

          {/* Liste des genres actuels */}
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.genres.map((genre) => (
              <span
                key={genre}
                className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center"
              >
                {genre}
                <button
                  type="button"
                  onClick={() => handleRemoveGenre(genre)}
                  className="ml-2 text-red-500 hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Ajouter un nouveau genre */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              placeholder="Ajouter un genre"
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
            <button
              type="button"
              onClick={handleAddGenre}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Ajouter
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isFree}
            onChange={(e) =>
              setFormData({ ...formData, isFree: e.target.checked })
            }
            className="mr-2"
          />
          <label className="text-white">Gratuit</label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        {event ? "Modifier" : "Créer"} l'événement
      </button>
    </form>
  );
};

export default EventForm;
