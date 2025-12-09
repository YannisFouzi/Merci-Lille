import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EventCardProps } from "../../components/ShotgunEvents/types";
import { eventFormSchema, type EventFormData, validateEventImage } from "../../schemas";
import { eventsService } from "../../services/events.service";
import { extractFileNameFromUrl, parseEventGenres } from "../../utils";

interface EventFormProps {
  event?: EventCardProps;
  onSubmit: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit }) => {
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    mode: "onBlur",
    defaultValues: event
      ? {
          ...event,
          date: formatDateForInput(event.date),
          genres: parseEventGenres(event.genres),
          isFeatured: event.isFeatured || false,
        }
      : {
          title: "",
          city: "",
          date: "",
          time: "",
          genres: [],
          ticketLink: "",
          isFeatured: false,
        },
  });

  const [image, setImage] = useState<File | null>(null);
  const [displayFileName, setDisplayFileName] = useState<string>("");
  const [newGenre, setNewGenre] = useState("");
  const [submitError, setSubmitError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  const genres = watch("genres");

  React.useEffect(() => {
    if (event?.imageSrc) {
      setDisplayFileName(extractFileNameFromUrl(event.imageSrc));
    }
  }, [event]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Valider l'image immédiatement
      const validation = validateEventImage(file, !!event);
      if (!validation.valid) {
        setImageError(validation.error || "Erreur de validation de l'image");
        setImage(null);
        setDisplayFileName("");
      } else {
        setImage(file);
        setDisplayFileName(file.name);
        setImageError("");
        setSubmitError("");
      }
    }
  };

  const handleAddGenre = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedGenre = newGenre.trim();
    if (trimmedGenre && !genres.includes(trimmedGenre)) {
      setValue("genres", [...genres, trimmedGenre], { shouldDirty: true });
      setNewGenre("");
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    setValue(
      "genres",
      genres.filter((genre) => genre !== genreToRemove),
      { shouldDirty: true }
    );
  };

  const onFormSubmit = async (data: EventFormData) => {
    setSubmitError("");
    setImageError("");

    // Validation de l'image
    const imageValidation = validateEventImage(image, !!event);
    if (!imageValidation.valid) {
      setImageError(imageValidation.error || "Erreur de validation de l'image");
      return;
    }

    try {
      const formData = new FormData();

      // Ajouter tous les champs du formulaire
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "genres") {
            // Envoyer chaque genre individuellement
            const genresArray = Array.isArray(value) ? value : [];
            genresArray.forEach((genre, index) => {
              formData.append(`genres[${index}]`, genre);
            });
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Ajouter l'image si présente
      if (image) {
        formData.append("image", image);
      }

      // Créer ou mettre à jour l'événement
      if (event?._id) {
        await eventsService.updateEvent(event._id, formData);
      } else {
        await eventsService.createEvent(formData);
      }

      onSubmit();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'enregistrement";
      setSubmitError(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6 bg-gray-900 p-4 rounded-lg sm:p-6"
    >
      {submitError && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Titre de l'événement
          </label>
          <input
            type="text"
            placeholder="Titre de l'événement"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            disabled={isSubmitting}
            {...register("title")}
          />
          {errors.title && (
            <div className="text-red-500 text-sm mt-1">{errors.title.message}</div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Ville
          </label>
          <input
            type="text"
            placeholder="Ville"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            disabled={isSubmitting}
            {...register("city")}
          />
          {errors.city && (
            <div className="text-red-500 text-sm mt-1">{errors.city.message}</div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
              Date
            </label>
            <input
              type="date"
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white w-full"
              disabled={isSubmitting}
              {...register("date")}
            />
            {errors.date && (
              <div className="text-red-500 text-sm mt-1">{errors.date.message}</div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
              Heure
            </label>
            <input
              type="time"
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white w-full"
              disabled={isSubmitting}
              {...register("time")}
            />
            {errors.time && (
              <div className="text-red-500 text-sm mt-1">{errors.time.message}</div>
            )}
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
              disabled={isSubmitting}
            />
            <label
              htmlFor="imageInput"
              className={`w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-700"
              } flex justify-between items-center`}
            >
              <span className="truncate">
                {displayFileName || "Choisir une image"}
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded ml-2">Parcourir</span>
            </label>
          </div>
          {imageError && (
            <div className="text-red-500 text-sm mt-1">{imageError}</div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Lien de billetterie
          </label>
          <input
            type="text"
            placeholder="Lien billetterie"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            disabled={isSubmitting}
            {...register("ticketLink")}
          />
          {errors.ticketLink && (
            <div className="text-red-500 text-sm mt-1">
              {errors.ticketLink.message}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Genres musicaux
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center"
              >
                {genre}
                <button
                  type="button"
                  onClick={() => handleRemoveGenre(genre)}
                  className="ml-2 text-red-500 hover:text-red-400"
                  disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={handleAddGenre}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Ajouter
            </button>
          </div>
          {errors.genres && (
            <div className="text-red-500 text-sm mt-1">{errors.genres.message}</div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-white block text-lg font-bold border-b border-gray-600 pb-1 mb-2">
            Options
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              disabled={isSubmitting}
              {...register("isFeatured")}
            />
            <label className="text-white">
              Mettre en avant (Événement phare)
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enregistrement..." : event ? "Modifier" : "Créer"}{" "}
        l'événement
      </button>
    </form>
  );
};

export default EventForm;
