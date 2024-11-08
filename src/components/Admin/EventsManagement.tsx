import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { eventsService } from "../../services/events.service";
import { EventCardProps } from "../ShotgunEvents/types";
import { formatDate } from "../ShotgunEvents/utils/dateFormatter";
import EventForm from "./EventForm";

const EventsManagement = () => {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(
    null
  );
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsService.getAllEvents();
      setEvents(data);
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
      } catch (err) {
        setError("Erreur lors de la suppression");
      }
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    await loadEvents();
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
      <Helmet>
        <title>Gestion des Événements | Merci Lille</title>
        <meta
          name="description"
          content="Page de gestion des événements de Merci Lille."
        />
      </Helmet>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-white">
          Gestion des événements
        </h1>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Nouvel événement
        </button>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded">{error}</div>
      )}

      <div className="overflow-x-auto bg-gray-900 rounded-lg">
        <table className="w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-4 text-left text-sm sm:px-6">Date</th>
              <th className="px-4 py-4 text-left text-sm sm:px-6">Titre</th>
              <th className="px-4 py-4 text-left text-sm sm:px-6">Lieu</th>
              <th className="px-4 py-4 text-left text-sm sm:px-6">État</th>
              <th className="px-4 py-4 text-right text-sm sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event._id}
                className="border-t border-gray-800 hover:bg-gray-800/50"
              >
                <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                  {formatDate(event.date)}
                </td>
                <td className="px-4 py-4 sm:px-6 max-w-[200px] truncate">
                  {event.title}
                </td>
                <td className="px-4 py-4 sm:px-6">{event.city}</td>
                <td className="px-4 py-4 sm:px-6">
                  {(() => {
                    const now = new Date();
                    const eventDate = new Date(event.date);
                    const [hours, minutes] = event.time.split(":");
                    eventDate.setHours(parseInt(hours), parseInt(minutes));
                    return eventDate > now ? (
                      <span className="text-green-500">À venir</span>
                    ) : (
                      <span className="text-gray-500">Passé</span>
                    );
                  })()}
                </td>
                <td className="px-4 py-4 sm:px-6 text-right">
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-400 hover:text-blue-300 whitespace-nowrap"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-400 hover:text-red-300 whitespace-nowrap"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {events.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-400">
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
