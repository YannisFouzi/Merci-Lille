import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
      Array.from(selectedFiles).forEach((file) => {
        formData.append("images", file);
      });

      await galleryService.uploadImages(formData);
      await loadImages();
      setShowUploadForm(false);
      setSelectedFiles(null);
    } catch (err) {
      setError("Erreur lors de l'upload des images");
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
        <title>Gestion de la Galerie | Merci Lille</title>
        <meta
          name="description"
          content="Page de gestion de la galerie de Merci Lille."
        />
      </Helmet>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Gestion de la galerie</h1>
        <button
          onClick={() => setShowUploadForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Ajouter une image
        </button>
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
        <div className="fixed bottom-4 right-4 bg-gray-900 p-4 rounded-lg shadow-lg">
          <p className="text-white mb-2">
            {selectedImages.length} image(s) sélectionnée(s)
          </p>
          <button
            onClick={handleDeleteSelected}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer la sélection
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image._id}
            className={`relative group bg-gray-800 rounded-lg overflow-hidden ${
              selectedImages.includes(image._id) ? "ring-2 ring-red-500" : ""
            }`}
            onClick={() => toggleImageSelection(image._id)}
          >
            <img
              src={image.imageSrc}
              alt="Gallery"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={() => toggleImageSelection(image._id)}
                className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-opacity duration-300"
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
