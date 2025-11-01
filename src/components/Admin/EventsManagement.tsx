import { useEffect, useState } from "react";
import { eventsService } from "../../services/events.service";
import { EventCardProps } from "../ShotgunEvents/types";
import { formatDate } from "../ShotgunEvents/utils/dateFormatter";
import EventForm from "./EventForm";
import ShotgunSync from "./ShotgunSync";

const EventsManagement = () => {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(
    null
  );
  const [error, setError] = useState("");
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [saveOrderLoading, setSaveOrderLoading] = useState(false);
  const [selectedEventIds, setSelectedEventIds] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // Dans l'admin, récupérer TOUS les événements (y compris les masqués)
      const data = await eventsService.getAllEvents(true);
      
      // Trier du plus récent au plus ancien (comme sur le client public)
      const sortedData = [...data].sort((a, b) => {
        // Si les deux ont un order défini, utiliser order (ordre décroissant)
        if (a.order !== undefined && b.order !== undefined && a.order !== 0 && b.order !== 0) {
          return b.order - a.order;
        }
        // Sinon, trier par date (plus récent en premier)
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; // Ordre décroissant (plus récent d'abord)
      });
      
      setEvents(sortedData);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des événements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreateNew = () => {
    setSelectedEvent(null);
    setShowForm(true);
  };

  const handleEdit = (event: EventCardProps) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      setError("ID d'événement invalide");
      return;
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await eventsService.deleteEvent(id);
        await loadEvents();
        setHasOrderChanged(false);
      } catch (err) {
        setError("Erreur lors de la suppression");
      }
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    await loadEvents();
    setHasOrderChanged(false);
  };

  const handleEventDragStart = (e: React.DragEvent, eventId: string) => {
    setDraggedEvent(eventId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleEventDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleEventDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleEventDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedEvent) return;

    const draggedIndex = events.findIndex((evt) => evt._id === draggedEvent);
    if (draggedIndex === -1 || draggedIndex === dropIndex) {
      setDraggedEvent(null);
      return;
    }

    // Créer un nouveau tableau avec l'ordre modifié
    const newEvents = [...events];
    const [draggedItem] = newEvents.splice(draggedIndex, 1);
    newEvents.splice(dropIndex, 0, draggedItem);

    // Mettre à jour localement pour un feedback immédiat
    setEvents(newEvents);
    setDraggedEvent(null);
    setHasOrderChanged(true);
  };

  const saveEventOrder = async () => {
    if (!hasOrderChanged) return;

    try {
      setSaveOrderLoading(true);
      const orderedIds = events.map((evt) => evt._id as string);

      await eventsService.updateEventOrder(orderedIds);

      setHasOrderChanged(false);
      // Recharger pour obtenir les nouveaux eventNumber depuis le serveur
      await loadEvents();
    } catch (err) {
      setError("Erreur lors de la sauvegarde de l'ordre");
      console.error("Save order error:", err);
    } finally {
      setSaveOrderLoading(false);
    }
  };

  const cancelOrderChanges = async () => {
    setHasOrderChanged(false);
    await loadEvents(); // Recharger l'ordre original
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedEventIds(new Set()); // Réinitialiser la sélection
  };

  const toggleEventSelection = (eventId: string) => {
    const newSelection = new Set(selectedEventIds);
    if (newSelection.has(eventId)) {
      newSelection.delete(eventId);
    } else {
      newSelection.add(eventId);
    }
    setSelectedEventIds(newSelection);
  };

  const selectAll = () => {
    setSelectedEventIds(new Set(events.map(e => e._id as string)));
  };

  const deselectAll = () => {
    setSelectedEventIds(new Set());
  };

  const deleteSelected = async () => {
    if (selectedEventIds.size === 0) return;

    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedEventIds.size} événement(s) ?`)) {
      return;
    }

    try {
      // Supprimer tous les événements sélectionnés
      await Promise.all(
        Array.from(selectedEventIds).map(id => eventsService.deleteEvent(id))
      );
      
      setSelectedEventIds(new Set());
      setIsSelectionMode(false);
      await loadEvents();
      setHasOrderChanged(false);
    } catch (err) {
      setError("Erreur lors de la suppression des événements");
    }
  };

  const hideSelected = async () => {
    if (selectedEventIds.size === 0) return;

    try {
      await eventsService.hideMultipleEvents(Array.from(selectedEventIds));
      setSelectedEventIds(new Set());
      setIsSelectionMode(false);
      await loadEvents();
    } catch (err) {
      setError("Erreur lors du masquage des événements");
    }
  };

  const unhideSelected = async () => {
    if (selectedEventIds.size === 0) return;

    try {
      await eventsService.unhideMultipleEvents(Array.from(selectedEventIds));
      setSelectedEventIds(new Set());
      setIsSelectionMode(false);
      await loadEvents();
    } catch (err) {
      setError("Erreur lors du démasquage des événements");
    }
  };

  const toggleHideEvent = async (eventId: string | undefined, currentHiddenState: boolean) => {
    if (!eventId) return;

    try {
      if (currentHiddenState) {
        await eventsService.unhideEvent(eventId);
      } else {
        await eventsService.hideEvent(eventId);
      }
      await loadEvents();
    } catch (err) {
      setError("Erreur lors du masquage/démasquage de l'événement");
    }
  };

  const forceRenumber = async () => {
    if (!window.confirm("Renuméroter tous les événements visibles de 1 à N ?")) {
      return;
    }

    try {
      await eventsService.renumberAllEvents();
      await loadEvents();
      alert("✅ Renumérotation effectuée avec succès !");
    } catch (err) {
      setError("Erreur lors de la renumérotation");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-white">
          Gestion des événements
        </h1>
        <div className="flex gap-2 flex-wrap">
          {hasOrderChanged && (
            <>
              <button
                onClick={cancelOrderChanges}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={saveEventOrder}
                disabled={saveOrderLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {saveOrderLoading ? "Sauvegarde..." : "Sauvegarder l'ordre"}
              </button>
            </>
          )}
          {isSelectionMode && selectedEventIds.size > 0 && (
            <>
              <button
                onClick={deselectAll}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Tout désélectionner
              </button>
              <button
                onClick={hideSelected}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                👁️‍🗨️ Masquer ({selectedEventIds.size})
              </button>
              <button
                onClick={unhideSelected}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                👁️ Afficher ({selectedEventIds.size})
              </button>
              <button
                onClick={deleteSelected}
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
              >
                🗑️ Supprimer ({selectedEventIds.size})
              </button>
            </>
          )}
          {isSelectionMode && selectedEventIds.size === 0 && (
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Tout sélectionner
            </button>
          )}
          <button
            onClick={toggleSelectionMode}
            className={`px-4 py-2 rounded ${
              isSelectionMode
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isSelectionMode ? "Annuler sélection" : "Sélectionner"}
          </button>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Nouvel événement
          </button>
          <button
            onClick={forceRenumber}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
            title="Renuméroter tous les événements visibles de 1 à N"
          >
            🔢 Renuméroter
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded">{error}</div>
      )}

      {/* Composant de synchronisation Shotgun */}
      <ShotgunSync />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => {
          const now = new Date();
          const eventDate = new Date(event.date);
          const [hours, minutes] = event.time.split(":");
          eventDate.setHours(parseInt(hours), parseInt(minutes));
          const isPast = eventDate <= now;

          return (
            <div
              key={event._id}
              draggable={!isSelectionMode}
              onDragStart={(e) => !isSelectionMode && handleEventDragStart(e, event._id as string)}
              onDragOver={(e) => !isSelectionMode && handleEventDragOver(e, index)}
              onDragLeave={!isSelectionMode ? handleEventDragLeave : undefined}
              onDrop={(e) => !isSelectionMode && handleEventDrop(e, index)}
              onClick={() => isSelectionMode && toggleEventSelection(event._id as string)}
              className={`relative bg-gray-800 rounded-lg overflow-hidden transition-all duration-200 ${
                !isSelectionMode ? "cursor-move" : "cursor-pointer"
              } ${
                draggedEvent === event._id ? "opacity-50 scale-95" : ""
              } ${
                dragOverIndex === index ? "ring-2 ring-blue-400 scale-105" : ""
              } ${
                isSelectionMode && selectedEventIds.has(event._id as string)
                  ? "ring-4 ring-red-500"
                  : ""
              } ${
                event.isHidden ? "opacity-50" : ""
              }`}
            >
              {/* Numéro d'événement en haut à gauche */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-sm font-bold px-3 py-1 rounded z-10">
                #{event.eventNumber?.startsWith("HIDDEN_") || event.eventNumber?.startsWith("TEMP_") ? "---" : event.eventNumber || "---"}
              </div>

              {/* Checkbox de sélection */}
              {isSelectionMode && (
                <div className="absolute top-2 left-16 z-10">
                  <input
                    type="checkbox"
                    checked={selectedEventIds.has(event._id as string)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleEventSelection(event._id as string);
                    }}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              )}

              {/* Badge statut en haut à droite */}
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                {event.isHidden && (
                  <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded font-bold">
                    👁️‍🗨️ Masqué
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

              {/* Image de l'événement */}
              <div className="h-48 overflow-hidden">
                <img
                  src={event.imageSrc}
                  alt={event.title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* Contenu */}
              <div className="p-4 space-y-2">
                <h3 className="text-white font-bold text-lg truncate">
                  {event.title}
                </h3>
                <div className="text-gray-400 text-sm space-y-1">
                  <p className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{formatDate(event.date)}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.city}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🎵</span>
                    <span className="truncate">
                      {event.genres && event.genres.length > 0
                        ? event.genres.join(", ")
                        : "Aucun genre"}
                    </span>
                  </p>
                </div>

                {/* Boutons d'action */}
                {!isSelectionMode && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(event);
                      }}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleHideEvent(event._id, event.isHidden || false);
                      }}
                      className={`flex-1 px-3 py-2 text-white text-sm rounded transition-colors ${
                        event.isHidden
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      {event.isHidden ? "👁️ Afficher" : "👁️‍🗨️ Masquer"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(event._id);
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
        })}
      </div>

      {events.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-400">
          Aucun événement trouvé
        </div>
      )}

      {showForm ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto scrollbar-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div
            className="bg-gray-900 rounded-lg p-4 w-full max-w-3xl max-h-[85vh] my-6 sm:my-8 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {selectedEvent ? "Modifier un événement" : "Nouvel événement"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white text-xl px-2"
              >
                ✕
              </button>
            </div>
            <EventForm
              event={selectedEvent || undefined}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventsManagement;
