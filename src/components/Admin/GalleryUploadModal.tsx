import React from "react";

type GalleryUploadModalProps = {
  isOpen: boolean;
  selectedFiles: FileList | null;
  uploadLoading: boolean;
  onClose: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({
  isOpen,
  selectedFiles,
  uploadLoading,
  onClose,
  onFileChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Ajouter des images</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="file"
              onChange={onFileChange}
              accept="image/*"
              multiple
              className="text-white w-full"
            />
            {selectedFiles && (
              <p className="text-gray-400 mt-2">
                {selectedFiles.length} fichier(s) sélectionné(s)
              </p>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={uploadLoading || !selectedFiles}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
            >
              {uploadLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {uploadLoading ? `Upload en cours...` : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryUploadModal;
