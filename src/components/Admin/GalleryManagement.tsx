import React, { useEffect, useState } from "react";
import { galleryService } from "../../services/gallery.service";

interface GalleryImage {
  _id: string;
  imageSrc: string;
  createdAt: string;
}

const GalleryManagement: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [saveOrderLoading, setSaveOrderLoading] = useState(false);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAllImages();
      setImages(data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

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

      await galleryService.uploadImages(formData);
      await loadImages();
      setShowUploadForm(false);
      setSelectedFiles(null);
      setHasOrderChanged(false); // Reset car on recharge les images
    } catch (err) {
      setError("Erreur lors de l'upload des images");
      console.error("Upload error:", err);
    } finally {
      setUploadLoading(false);
    }
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id)
        ? prev.filter((imageId) => imageId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.length === 0) return;

    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer ${selectedImages.length} image(s) ?`
      )
    ) {
      try {
        await galleryService.deleteImages(selectedImages);
        await loadImages();
        setSelectedImages([]);
      } catch (err) {
        setError("Erreur lors de la suppression des images");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Filtrer pour ne garder que les images
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

          await galleryService.uploadImages(formData);
          await loadImages();
          setHasOrderChanged(false); // Reset car on recharge les images
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

  const handleImageDragStart = (e: React.DragEvent, imageId: string) => {
    setDraggedImage(imageId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleImageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleImageDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleImageDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedImage) return;

    const draggedIndex = images.findIndex((img) => img._id === draggedImage);
    if (draggedIndex === -1 || draggedIndex === dropIndex) {
      setDraggedImage(null);
      return;
    }

    // Créer un nouveau tableau avec l'ordre modifié
    const newImages = [...images];
    const [draggedItem] = newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedItem);

    // Mettre à jour localement pour un feedback immédiat
    setImages(newImages);
    setDraggedImage(null);
    setHasOrderChanged(true);
  };

  const saveImageOrder = async () => {
    if (!hasOrderChanged) return;

    try {
      setSaveOrderLoading(true);
      const orderedIds = images.map((img) => img._id);

      await galleryService.updateImageOrder(orderedIds);

      setHasOrderChanged(false);
      // Optionnel: recharger pour confirmer l'ordre depuis le serveur
      // await loadImages();
    } catch (err) {
      setError("Erreur lors de la sauvegarde de l'ordre");
      console.error("Save order error:", err);
    } finally {
      setSaveOrderLoading(false);
    }
  };

  const cancelOrderChanges = async () => {
    setHasOrderChanged(false);
    await loadImages(); // Recharger l'ordre original
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
        <h1 className="text-2xl font-bold text-white">Gestion de la galerie</h1>
        <div className="flex gap-2">
          {hasOrderChanged && (
            <>
              <button
                onClick={cancelOrderChanges}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={saveImageOrder}
                disabled={saveOrderLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {saveOrderLoading ? "Sauvegarde..." : "Sauvegarder l'ordre"}
              </button>
            </>
          )}
          <button
            onClick={() => setShowUploadForm(true)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-200 ${
              isDragOver ? "bg-red-500 scale-105 shadow-lg" : ""
            }`}
          >
            {isDragOver ? "Déposez vos images ici" : "Ajouter une image"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded">{error}</div>
      )}

      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              Ajouter des images
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
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
                  onClick={() => {
                    setShowUploadForm(false);
                    setSelectedFiles(null);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploadLoading || !selectedFiles}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {uploadLoading
                    ? `Upload en cours (0/${selectedFiles?.length || 0})...`
                    : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedImages.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto bg-gray-900 p-4 rounded-lg shadow-lg z-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white text-center sm:text-left">
              {selectedImages.length} image(s) sélectionnée(s)
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => setSelectedImages([])}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={image._id}
            draggable
            onDragStart={(e) => handleImageDragStart(e, image._id)}
            onDragOver={(e) => handleImageDragOver(e, index)}
            onDragLeave={handleImageDragLeave}
            onDrop={(e) => handleImageDrop(e, index)}
            className={`relative group bg-gray-800 rounded-lg overflow-hidden cursor-move transition-all duration-200 ${
              selectedImages.includes(image._id) ? "ring-2 ring-red-500" : ""
            } ${draggedImage === image._id ? "opacity-50 scale-95" : ""} ${
              dragOverIndex === index ? "ring-2 ring-blue-400 scale-105" : ""
            }`}
            onClick={() => toggleImageSelection(image._id)}
          >
            <img
              src={image.imageSrc}
              alt="Gallery"
              className="w-full h-48 object-cover pointer-events-none"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleImageSelection(image._id);
                }}
                className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-opacity duration-300 pointer-events-auto"
              >
                {selectedImages.includes(image._id)
                  ? "Désélectionner"
                  : "Sélectionner"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-400">
          Aucune image dans la galerie
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
