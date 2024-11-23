import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { galleryService } from "../../services/gallery.service";

interface GalleryPhoto {
  _id: string;
  imageSrc: string;
  title?: string;
  description?: string;
}

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 6;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const data = await galleryService.getAllPhotos();
      setPhotos(data);
    } catch (error) {
      console.error("Erreur lors du chargement des photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="gallery-container">
      <Helmet>
        <title>Galerie Photo | Merci Lille</title>
        <meta
          name="description"
          content="Explorez les photos de nos événements passés."
        />
      </Helmet>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 text-white">
        La Galerie
      </h1>

      <div className="gallery-grid">
        {photos.slice(0, visibleItems).map((photo) => (
          <div key={photo._id} className="gallery-item show">
            <div className="item-content">
              <img
                src={photo.imageSrc}
                alt={photo.title || "Gallery item"}
                className="gallery-image"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {photos.length > visibleItems && (
        <div className="mt-8 text-center">
          <button onClick={handleLoadMore} className="btn-load-more">
            Voir plus
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
