import React, { useState } from "react";
import { EventCardProps } from "../../components/ShotgunEvents/types";
import { eventsService } from "../../services/events.service";

interface EventFormProps {
  event?: EventCardProps;
  onSubmit: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit }) => {
  console.log("Event reçu dans le form:", event);
  console.log("Format des genres:", {
    genres: event?.genres,
    type: typeof event?.genres,
    isArray: Array.isArray(event?.genres),
  });
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState<Omit<EventCardProps, "_id">>(
    event
      ? {
          ...event,
          date: formatDateForInput(event.date),
          genres: Array.isArray(event.genres)
            ? event.genres
            : typeof event.genres === "string"
            ? JSON.parse(event.genres)
            : [],
          price: event.price ? event.price.toString() : "",
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
          price: "",
          imageSrc: "",
        }
  );
  const [image, setImage] = useState<File | null>(null);
  const [displayFileName, setDisplayFileName] = useState<string>("");

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

    try {
      const data = new FormData();

      // Formatage du prix avant l'envoi
      const formDataToSend = {
        ...formData,
        price: formData.isFree
          ? "0"
          : formData.price?.trim()
          ? formData.price.replace(",", ".")
          : "0",
      };

      // Log complet des données avant envoi
      console.log("Complete form data before submission:", {
        ...formDataToSend,
        imageFile: image,
      });

      // Vérification des champs requis
      if (
        !formData.title ||
        !formData.city ||
        !formData.date ||
        !formData.time ||
        !formData.ticketLink
      ) {
        throw new Error("Veuillez remplir tous les champs requis");
      }

      // Vérification de l'image
      if (!image && !event?.imageSrc) {
        throw new Error("Une image est requise");
      }

      Object.entries(formDataToSend).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "genres") {
            // Envoyer chaque genre individuellement
            const genres = Array.isArray(value) ? value : [];
            genres.forEach((genre, index) => {
              data.append(`genres[${index}]`, genre);
            });
          } else {
            data.append(key, value.toString());
          }
        }
      });

      if (image) {
        // Vérifier la taille de l'image
        if (image.size > 5 * 1024 * 1024) {
          // 5MB
          throw new Error("L'image est trop volumineuse (max 5MB)");
        }
        data.append("image", image);
      }

      // Log du FormData final
      for (let pair of data.entries()) {
        console.log(`FormData - ${pair[0]}:`, pair[1]);
      }

      if (event?._id) {
        console.log("Data avant update:", Object.fromEntries(data.entries()));
        await eventsService.updateEvent(event._id, data);
      } else {
        await eventsService.createEvent(data);
      }
      onSubmit();
    } catch (error) {
      console.error("Erreur détaillée:", error);
      // Afficher l'erreur à l'utilisateur
      // TODO: Ajouter un état pour gérer les erreurs
    }
  };

  const extractFileNameFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  React.useEffect(() => {
    if (event?.imageSrc) {
      setDisplayFileName(extractFileNameFromUrl(event.imageSrc));
    }
  }, [event]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setDisplayFileName(file.name);
    }
  };

  // La partie return du composant
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-900 p-4 rounded-lg sm:p-6"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Titre de l'événement
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Titre de l'événement"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
              Numéro d'événement
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.eventNumber}
                onChange={(e) =>
                  setFormData({ ...formData, eventNumber: e.target.value })
                }
                placeholder="Numéro d'événement (auto si vide)"
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white w-full"
              />
              <div className="text-xs text-gray-400 mt-1">
                Laissez vide pour auto-incrémentation
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
              Ville
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="Ville"
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
              Heure
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white w-full"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Image de l'événement
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="imageInput"
              required={!event}
            />
            <label
              htmlFor="imageInput"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white cursor-pointer hover:bg-gray-700 flex justify-between items-center"
            >
              <span className="truncate">
                {displayFileName || "Choisir une image"}
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded ml-2">
                Parcourir
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Lien de billetterie
          </label>
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
        </div>

        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Genres musicaux
          </label>
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

          <div className="flex flex-col sm:flex-row gap-2">
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

        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Tarification
          </label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  isFree: e.target.checked,
                  price: e.target.checked ? "" : formData.price,
                });
              }}
              className="mr-2"
            />
            <label className="text-white">Gratuit</label>
          </div>

          {!formData.isFree && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.price}
                onChange={(e) => {
                  const value = e.target.value;
                  // Accepte uniquement les nombres avec point ou virgule, maximum 2 décimales
                  if (/^\d*[.,]?\d{0,2}$/.test(value)) {
                    setFormData({
                      ...formData,
                      price: value.replace(",", "."),
                    });
                  }
                }}
                placeholder="Prix"
                className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                required={!formData.isFree}
              />
              <span className="text-white">€</span>
            </div>
          )}
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
