import { useEffect, useState } from "react";
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
      <div className="flex justify-between items-center">
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

      {showForm ? (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                {selectedEvent ? "Modifier un événement" : "Nouvel événement"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white"
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

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Titre</th>
              <th className="px-6 py-3 text-left">Ville</th>
              <th className="px-6 py-3 text-left">État</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-t border-gray-800">
                <td className="px-6 py-4">{formatDate(event.date)}</td>
                <td className="px-6 py-4">{event.title}</td>
                <td className="px-6 py-4">{event.city}</td>
                <td className="px-6 py-4">
                  {event.isPast ? "Passé" : "À venir"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-400 hover:text-blue-300 mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsManagement;
