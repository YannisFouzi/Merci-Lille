import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import api from "../../services/api";

interface GalleryPhoto {
  _id: string;
  imageSrc: string;
  title?: string;
  description?: string;
}

const GalleryManagement: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await api.get("/gallery");
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await api.post("/gallery", formData);
      fetchPhotos();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) {
      try {
        await api.delete(`/gallery/${id}`);
        fetchPhotos();
      } catch (error) {
        console.error("Error deleting photo:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Gestion de la Galerie | Admin</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-6">Gestion de la Galerie</h1>

      <form onSubmit={handleUpload} className="mb-8">
        <div className="flex gap-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
          />
          <button
            type="submit"
            disabled={!selectedFile}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
          >
            Ajouter
          </button>
        </div>
      </form>

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo._id} className="relative group">
              <img
                src={photo.imageSrc}
                alt={photo.title || ""}
                className="w-full h-48 object-cover rounded"
              />
              <button
                onClick={() => handleDelete(photo._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
