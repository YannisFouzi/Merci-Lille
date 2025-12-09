import React, { useState } from "react";
import { useAdminGallery } from "../../hooks/useAdminGallery";
import { useDragAndDropList } from "../../hooks/useDragAndDropList";
import { useSelection } from "../../hooks/useSelection";
import GalleryGridItem from "./GalleryGridItem";
import GalleryToolbar from "./GalleryToolbar";
import GalleryUploadModal from "./GalleryUploadModal";

const GalleryManagement: React.FC = () => {
  const {
    images,
    setImages,
    loading,
    error,
    setError,
    refetch,
    uploadImages,
    deleteMany,
    updateOrder,
  } = useAdminGallery();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const {
    selectedIds: selectedImages,
    toggleSelection: toggleImageSelection,
    setSelectedIds: setSelectedImages,
  } = useSelection();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isGalleryDragOver, setIsGalleryDragOver] = useState(false);
  const {
    draggedId: draggedImage,
    dragOverIndex,
    hasOrderChanged,
    setHasOrderChanged,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    resetOrderChanged,
  } = useDragAndDropList(images, setImages, (img) => img._id);
  const [saveOrderLoading, setSaveOrderLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setError("Veuillez sélectionner au moins une image");
      return;
    }

    try {
      setUploadLoading(true);
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      await uploadImages(formData);
      setShowUploadForm(false);
      setSelectedFiles(null);
      resetOrderChanged();
    } catch (err) {
      setError("Erreur lors de l'upload des images");
      console.error("Upload error:", err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.size === 0) return;

    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer ${selectedImages.size} image(s) ?`
      )
    ) {
      try {
        await deleteMany(Array.from(selectedImages));
        setSelectedImages(new Set());
      } catch (err) {
        setError("Erreur lors de la suppression des images");
      }
    }
  };

  const handleUploadDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleUploadDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleUploadDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length > 0) {
        try {
          setUploadLoading(true);
          const formData = new FormData();

          imageFiles.forEach((file) => {
            formData.append("images", file);
          });

          await uploadImages(formData);
          setHasOrderChanged(false);
        } catch (err) {
          setError("Erreur lors de l'upload des images");
          console.error("Upload error:", err);
        } finally {
          setUploadLoading(false);
        }
      } else {
        setError("Veuillez déposer uniquement des fichiers image");
      }
    }
  };

  const handleGalleryDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("Files")) {
      setIsGalleryDragOver(true);
    }
  };

  const handleGalleryDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsGalleryDragOver(false);
    }
  };

  const handleGalleryDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsGalleryDragOver(false);

    if (draggedImage) {
      return;
    }

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length > 0) {
        try {
          setUploadLoading(true);
          const formData = new FormData();

          imageFiles.forEach((file) => {
            formData.append("images", file);
          });

          await uploadImages(formData);
          setHasOrderChanged(false);
        } catch (err) {
          setError("Erreur lors de l'upload des images");
          console.error("Upload error:", err);
        } finally {
          setUploadLoading(false);
        }
      } else {
        setError("Veuillez déposer uniquement des fichiers image");
      }
    }
  };

  const saveImageOrder = async () => {
    if (!hasOrderChanged) return;

    try {
      setSaveOrderLoading(true);
      const orderedIds = images.map((img) => img._id);

      await updateOrder(orderedIds);

      resetOrderChanged();
    } catch (err) {
      setError("Erreur lors de la sauvegarde de l'ordre");
      console.error("Save order error:", err);
    } finally {
      setSaveOrderLoading(false);
    }
  };

  const cancelOrderChanges = async () => {
    resetOrderChanged();
    await refetch();
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
      <GalleryToolbar
        hasOrderChanged={hasOrderChanged}
        saveOrderLoading={saveOrderLoading}
        uploadLoading={uploadLoading}
        isDragOver={isDragOver}
        onCancelOrder={cancelOrderChanges}
        onSaveOrder={saveImageOrder}
        onOpenUpload={() => setShowUploadForm(true)}
        onDragOver={handleUploadDragOver}
        onDragLeave={handleUploadDragLeave}
        onDrop={handleUploadDrop}
      />

      {error && (
        <div className="bg-red-500 text-white p-4 rounded">{error}</div>
      )}

      {uploadLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <h3 className="text-white text-lg font-medium mb-2">
              Upload en cours...
            </h3>
            <p className="text-gray-400">
              Veuillez patienter pendant l'ajout des images
            </p>
          </div>
        </div>
      )}

      <GalleryUploadModal
        isOpen={showUploadForm}
        selectedFiles={selectedFiles}
        uploadLoading={uploadLoading}
        onClose={() => {
          setShowUploadForm(false);
          setSelectedFiles(null);
        }}
        onFileChange={handleFileChange}
        onSubmit={handleUpload}
      />

      {selectedImages.size > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto bg-gray-900 p-4 rounded-lg shadow-lg z-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white text-center sm:text-left">
              {selectedImages.size} image(s) sélectionnée(s)
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => setSelectedImages(new Set())}
                className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteSelected}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer la sélection
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-200 ${
          isGalleryDragOver
            ? "bg-gray-800/50 ring-2 ring-red-400 ring-dashed p-6 rounded-lg"
            : ""
        }`}
        onDragOver={handleGalleryDragOver}
        onDragLeave={handleGalleryDragLeave}
        onDrop={handleGalleryDrop}
      >
        {isGalleryDragOver && (
          <div className="col-span-full flex items-center justify-center py-12 text-center">
            <div className="text-red-400 text-xl font-medium">
              Déposez vos images ici pour les ajouter à la galerie
            </div>
          </div>
        )}
        {images.map((image, index) => (
          <GalleryGridItem
            key={image._id}
            image={image}
            index={index}
            isSelected={selectedImages.has(image._id)}
            draggedImageId={draggedImage}
            dragOverIndex={dragOverIndex}
            onToggleSelect={toggleImageSelection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        ))}
      </div>

      {images.length === 0 && !loading && (
        <div
          className={`text-center py-12 transition-all duration-200 ${
            isGalleryDragOver
              ? "bg-gray-800/50 ring-2 ring-red-400 ring-dashed p-6 rounded-lg"
              : ""
          }`}
          onDragOver={handleGalleryDragOver}
          onDragLeave={handleGalleryDragLeave}
          onDrop={handleGalleryDrop}
        >
          {isGalleryDragOver ? (
            <div className="text-red-400 text-xl font-medium">
              Déposez vos images ici pour créer votre galerie
            </div>
          ) : (
            <div className="text-gray-400">
              Aucune image dans la galerie
              <br />
              <span className="text-sm">
                Glissez-déposez des images ici ou utilisez le bouton "Ajouter
                une image"
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
