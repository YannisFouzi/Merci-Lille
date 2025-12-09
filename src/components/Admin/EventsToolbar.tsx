import React from "react";

type EventsToolbarProps = {
  hasOrderChanged: boolean;
  saveOrderLoading: boolean;
  isSelectionMode: boolean;
  selectedCount: number;
  onCancelOrder: () => void;
  onSaveOrder: () => void;
  onDeselectAll: () => void;
  onHideSelected: () => void;
  onUnhideSelected: () => void;
  onDeleteSelected: () => void;
  onSelectAll: () => void;
  onToggleSelectionMode: () => void;
  onCreateNew: () => void;
  onRenumber: () => void;
};

const EventsToolbar: React.FC<EventsToolbarProps> = ({
  hasOrderChanged,
  saveOrderLoading,
  isSelectionMode,
  selectedCount,
  onCancelOrder,
  onSaveOrder,
  onDeselectAll,
  onHideSelected,
  onUnhideSelected,
  onDeleteSelected,
  onSelectAll,
  onToggleSelectionMode,
  onCreateNew,
  onRenumber,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {hasOrderChanged && (
        <>
          <button
            onClick={onCancelOrder}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Annuler
          </button>
          <button
            onClick={onSaveOrder}
            disabled={saveOrderLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {saveOrderLoading ? "Sauvegarde..." : "Sauvegarder l'ordre"}
          </button>
        </>
      )}
      {isSelectionMode && selectedCount > 0 && (
        <>
          <button
            onClick={onDeselectAll}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Tout désélectionner
          </button>
          <button
            onClick={onHideSelected}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Masquer ({selectedCount})
          </button>
          <button
            onClick={onUnhideSelected}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Afficher ({selectedCount})
          </button>
          <button
            onClick={onDeleteSelected}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            Supprimer ({selectedCount})
          </button>
        </>
      )}
      {isSelectionMode && selectedCount === 0 && (
        <button
          onClick={onSelectAll}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Tout sélectionner
        </button>
      )}
      <button
        onClick={onToggleSelectionMode}
        className={`px-4 py-2 rounded ${
          isSelectionMode
            ? "bg-yellow-600 hover:bg-yellow-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {isSelectionMode ? "Annuler sélection" : "Sélectionner"}
      </button>
      <button
        onClick={onCreateNew}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Nouvel événement
      </button>
      <button
        onClick={onRenumber}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
        title="Renuméroter tous les événements visibles de 1 à N"
      >
        Renuméroter
      </button>
    </div>
  );
};

export default EventsToolbar;
