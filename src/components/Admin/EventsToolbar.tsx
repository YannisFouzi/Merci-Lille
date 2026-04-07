import React from "react";

type EventsToolbarProps = {
  disabled?: boolean;
  isRenumberPreviewActive: boolean;
  renumberLoading: boolean;
  hasOrderChanged: boolean;
  saveOrderLoading: boolean;
  isSelectionMode: boolean;
  selectedCount: number;
  onCancelRenumberPreview: () => void;
  onCancelOrder: () => void;
  onConfirmRenumber: () => void;
  onPreviewRenumber: () => void;
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
  isRenumberPreviewActive,
  renumberLoading,
  hasOrderChanged,
  saveOrderLoading,
  isSelectionMode,
  selectedCount,
  onCancelRenumberPreview,
  onCancelOrder,
  onConfirmRenumber,
  onPreviewRenumber,
  onSaveOrder,
  onDeselectAll,
  onHideSelected,
  onUnhideSelected,
  onDeleteSelected,
  onSelectAll,
  onToggleSelectionMode,
  onCreateNew,
}) => {
  const normalActionsDisabled = disabled || isRenumberPreviewActive;

  return (
    <div className="flex gap-2 flex-wrap">
      {isRenumberPreviewActive ? (
        <>
          <button
            onClick={onCancelRenumberPreview}
            disabled={renumberLoading}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler la previsualisation
          </button>
          <button
            onClick={onConfirmRenumber}
            disabled={renumberLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {renumberLoading ? "Validation..." : "Valider"}
          </button>
        </>
      ) : (
        <button
          onClick={onPreviewRenumber}
          disabled={disabled}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Renumeroter
        </button>
      )}

      {hasOrderChanged && (
        <>
          <button
            onClick={onCancelOrder}
            disabled={normalActionsDisabled}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onSaveOrder}
            disabled={normalActionsDisabled || saveOrderLoading}
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
            disabled={normalActionsDisabled}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Tout deselectionner
          </button>
          <button
            onClick={onHideSelected}
            disabled={normalActionsDisabled}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Masquer ({selectedCount})
          </button>
          <button
            onClick={onUnhideSelected}
            disabled={normalActionsDisabled}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Afficher ({selectedCount})
          </button>
          <button
            onClick={onDeleteSelected}
            disabled={normalActionsDisabled}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Supprimer ({selectedCount})
          </button>
        </>
      )}

      {isSelectionMode && selectedCount === 0 && (
        <button
          onClick={onSelectAll}
          disabled={normalActionsDisabled}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Tout selectionner
        </button>
      )}

      <button
        onClick={onToggleSelectionMode}
        disabled={normalActionsDisabled}
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
        disabled={normalActionsDisabled}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Nouvel evenement
      </button>
    </div>
  );
};

export default EventsToolbar;
