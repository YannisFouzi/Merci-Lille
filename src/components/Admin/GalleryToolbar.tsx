import React from "react";

type GalleryToolbarProps = {
  hasOrderChanged: boolean;
  saveOrderLoading: boolean;
  uploadLoading: boolean;
  isDragOver: boolean;
  onCancelOrder: () => void;
  onSaveOrder: () => void;
  onOpenUpload: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
};

const GalleryToolbar: React.FC<GalleryToolbarProps> = ({
  hasOrderChanged,
  saveOrderLoading,
  uploadLoading,
  isDragOver,
  onCancelOrder,
  onSaveOrder,
  onOpenUpload,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold text-white">Gestion de la galerie</h1>
      <div className="flex gap-2">
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
        <button
          onClick={onOpenUpload}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          disabled={uploadLoading}
          className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 ${
            isDragOver ? "bg-red-500 scale-105 shadow-lg" : ""
          }`}
        >
          {uploadLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {uploadLoading
            ? "Upload en cours..."
            : isDragOver
            ? "Déposez vos images ici"
            : "Ajouter une image"}
        </button>
      </div>
    </div>
  );
};

export default GalleryToolbar;
