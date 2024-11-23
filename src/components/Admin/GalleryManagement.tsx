import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { galleryService } from "../../services/gallery.service";

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imagePublicId: string;
  createdAt: string;
}

const GalleryManagement: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

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
      setUploadData({ ...uploadData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", uploadData.title);
      if (uploadData.description) {
        formData.append("description", uploadData.description);
      }
      if (uploadData.image) {
        formData.append("image", uploadData.image);
      }

      await galleryService.uploadImage(formData);
      await loadImages();
      setShowUploadForm(false);
      setUploadData({ title: "", description: "", image: null });
    } catch (err) {
      setError("Erreur lors de l'upload de l'image");
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
    return <div className="text-white text-center">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <Helmet>
        <title>Gestion de la Galerie | Merci Lille</title>
      </Helmet>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gestion de la Galerie</h1>
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">
              Ajouter une image
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Titre</label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Description</label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) =>
                    setUploadData({
                      ...uploadData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Uploader
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image._id}
            className="bg-gray-900 rounded-lg overflow-hidden"
          >
            <img
              src={image.imageSrc}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-white font-bold">{image.title}</h3>
              {image.description && (
                <p className="text-gray-400 mt-2">{image.description}</p>
              )}
              <button
                onClick={() => handleDelete(image._id)}
                className="mt-4 text-red-500 hover:text-red-400"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManagement;
