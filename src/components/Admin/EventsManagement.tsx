import React, { useState } from "react";
import { useAdminEvents } from "../../hooks/useAdminEvents";
import { useDragAndDropList } from "../../hooks/useDragAndDropList";
import { useSelection } from "../../hooks/useSelection";
import { useAdminFeedback } from "../../hooks/useAdminFeedback";
import { EventCardProps } from "../ShotgunEvents/types";
import EventCardItem from "./EventCardItem";
import EventFormModal from "./EventFormModal";
import EventsToolbar from "./EventsToolbar";
import ShotgunSync from "./ShotgunSync";
import AdminToast from "./AdminToast";

const EventsManagement = () => {
  const {
    events,
    setEvents,
    loading,
    refetch,
    deleteEvent,
    deleteMany,
    updateOrder,
    hideMany,
    unhideMany,
    hideOne,
    renumberAll,
  } = useAdminEvents();
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(
    null
  );
  const {
    draggedId,
    dragOverIndex,
    hasOrderChanged,
    setHasOrderChanged,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    resetOrderChanged,
  } = useDragAndDropList(events, setEvents, (evt) => evt._id as string);
  const [saveOrderLoading, setSaveOrderLoading] = useState(false);
  const {
    selectedIds: selectedEventIds,
    toggleSelection: toggleEventSelection,
    selectAll,
    deselectAll,
    setSelectedIds: setSelectedEventIds,
  } = useSelection();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const { toast, showError, showSuccess, clearToast } = useAdminFeedback();

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
      showError("ID d'événement invalide");
      return;
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await deleteEvent(id);
        setHasOrderChanged(false);
      } catch (err) {
        showError("Erreur lors de la suppression");
      }
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    await refetch();
    setHasOrderChanged(false);
  };

  const handleEventDragStart = (e: React.DragEvent, eventId: string) => {
    handleDragStart(e, eventId);
  };

  const handleEventDragOver = (e: React.DragEvent, index: number) => {
    handleDragOver(e, index);
  };

  const handleEventDragLeave = () => {
    handleDragLeave();
  };

  const handleEventDrop = async (e: React.DragEvent, dropIndex: number) => {
    handleDrop(e, dropIndex);
  };

  const saveEventOrder = async () => {
    if (!hasOrderChanged) return;

    try {
      setSaveOrderLoading(true);
      const orderedIds = events.map((evt) => evt._id as string);

      await updateOrder(orderedIds);

      setHasOrderChanged(false);
      showSuccess("Nouvel ordre enregistré");
    } catch (err) {
      showError("Erreur lors de la sauvegarde de l'ordre");
      console.error("Save order error:", err);
    } finally {
      setSaveOrderLoading(false);
    }
  };

  const cancelOrderChanges = async () => {
    resetOrderChanged();
    await refetch();
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedEventIds(new Set());
  };

  const deleteSelected = async () => {
    if (selectedEventIds.size === 0) return;

    if (
      !window.confirm(
        `Êtes-vous sûr de vouloir supprimer ${selectedEventIds.size} événement(s) ?`
      )
    ) {
      return;
    }

    try {
      await deleteMany(Array.from(selectedEventIds));

      setSelectedEventIds(new Set());
      setIsSelectionMode(false);
      resetOrderChanged();
      showSuccess("Événements supprimés");
    } catch (err) {
      showError("Erreur lors de la suppression des événements");
    }
  };

  const hideSelected = async () => {
    if (selectedEventIds.size === 0) return;

    try {
      await hideMany(Array.from(selectedEventIds));
      setSelectedEventIds(new Set());
      setIsSelectionMode(false);
      showSuccess("Événements masqués");
    } catch (err) {
      showError("Erreur lors du masquage des événements");
    }
  };

  const unhideSelected = async () => {
    if (selectedEventIds.size === 0) return;

    try {
      await unhideMany(Array.from(selectedEventIds));
      setSelectedEventIds(new Set());
      setIsSelectionMode(false);
      showSuccess("Événements affichés");
    } catch (err) {
      showError("Erreur lors du démasquage des événements");
    }
  };

  const toggleHideEvent = async (
    eventId: string | undefined,
    currentHiddenState: boolean
  ) => {
    if (!eventId) return;

    try {
      await hideOne(eventId, currentHiddenState);
    } catch (err) {
      showError("Erreur lors du masquage/démasquage de l'événement");
    }
  };

  const forceRenumber = async () => {
    if (
      !window.confirm("Renuméroter tous les événements visibles de 1 à N ?")
    ) {
      return;
    }

    try {
      await renumberAll();
      alert("Renumérotation effectuée avec succès !");
    } catch (err) {
      showError("Erreur lors de la renumérotation");
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
        <h1 className="text-2xl font-bold text-white">Gestion des événements</h1>
        <EventsToolbar
          hasOrderChanged={hasOrderChanged}
          saveOrderLoading={saveOrderLoading}
          isSelectionMode={isSelectionMode}
          selectedCount={selectedEventIds.size}
          onCancelOrder={cancelOrderChanges}
          onSaveOrder={saveEventOrder}
          onDeselectAll={deselectAll}
      onHideSelected={hideSelected}
      onUnhideSelected={unhideSelected}
      onDeleteSelected={deleteSelected}
      onSelectAll={() => selectAll(events.map((e) => e._id as string))}
      onToggleSelectionMode={toggleSelectionMode}
      onCreateNew={handleCreateNew}
      onRenumber={forceRenumber}
    />
      </div>

      {toast && <AdminToast toast={toast} onClose={clearToast} />}

      <ShotgunSync />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCardItem
            key={event._id}
            event={event}
            index={index}
            isSelectionMode={isSelectionMode}
            isSelected={selectedEventIds.has(event._id as string)}
            draggedEventId={draggedId}
            dragOverIndex={dragOverIndex}
            onToggleSelect={toggleEventSelection}
            onDragStart={handleEventDragStart}
            onDragOver={handleEventDragOver}
            onDragLeave={handleEventDragLeave}
            onDrop={handleEventDrop}
            onEdit={handleEdit}
            onToggleHide={toggleHideEvent}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {events.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-400">
          Aucun événement trouvé
        </div>
      )}

      <EventFormModal
        isOpen={showForm}
        event={selectedEvent}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default EventsManagement;
