import React from "react";

type EventsToolbarProps = {
  disabled?: boolean;
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
};

const EventsToolbar: React.FC<EventsToolbarProps> = ({
  disabled = false,
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
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {hasOrderChanged && (
        <>
          <button
            onClick={onCancelOrder}
            disabled={disabled}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onSaveOrder}
            disabled={disabled || saveOrderLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saveOrderLoading ? "Sauvegarde..." : "Sauvegarder l'ordre"}
          </button>
        </>
      )}

      {isSelectionMode && selectedCount > 0 && (
        <>
          <button
            onClick={onDeselectAll}
            disabled={disabled}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Tout deselectionner
          </button>
          <button
            onClick={onHideSelected}
            disabled={disabled}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Masquer ({selectedCount})
          </button>
          <button
            onClick={onUnhideSelected}
            disabled={disabled}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Afficher ({selectedCount})
          </button>
          <button
            onClick={onDeleteSelected}
            disabled={disabled}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Supprimer ({selectedCount})
          </button>
        </>
      )}

      {isSelectionMode && selectedCount === 0 && (
        <button
          onClick={onSelectAll}
          disabled={disabled}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Tout selectionner
        </button>
      )}

      <button
        onClick={onToggleSelectionMode}
        disabled={disabled}
        className={`px-4 py-2 rounded ${
          isSelectionMode
            ? "bg-yellow-600 hover:bg-yellow-700"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {isSelectionMode ? "Annuler selection" : "Selectionner"}
      </button>

      <button
        onClick={onCreateNew}
        disabled={disabled}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Nouvel evenement
      </button>
    </div>
  );
};

export default EventsToolbar;
