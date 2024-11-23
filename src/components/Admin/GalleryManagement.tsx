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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

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
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Veuillez sélectionner une image");
      return;
    }

    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      await galleryService.uploadImage(formData);
      await loadImages();
      setShowUploadForm(false);
      setSelectedFile(null);
    } catch (err) {
      setError("Erreur lors de l'upload de l'image");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      try {
        await galleryService.deleteImage(id);
        await loadImages();
      } catch (err) {
        setError("Erreur lors de la suppression");
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
              Ajouter une image
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="text-white"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploadLoading || !selectedFile}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {uploadLoading ? "Upload en cours..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image._id}
            className="relative group bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={image.imageSrc}
              alt="Gallery"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={() => handleDelete(image._id)}
                className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-opacity duration-300"
              >
                Supprimer
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
