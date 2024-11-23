import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { galleryService } from "../../services/gallery.service";

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  imageSrc: string;
}

const ITEMS_PER_PAGE = 9;

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const colorClasses = [
    "alizarin",
    "wisteria",
    "emerland",
    "belizehole",
    "sunflower",
  ];

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await galleryService.getAllImages();
        setImages(data);
      } catch (err) {
        setError("Erreur lors du chargement des images");
        console.error("Erreur de chargement des images:", err);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const showLoadMore = images.length > visibleItems;

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
        {images.slice(0, visibleItems).map((image, index) => (
          <div
            key={image._id}
            className={`gallery-item show ${
              colorClasses[index % colorClasses.length]
            }`}
          >
            <div className="item-content">
              <img
                src={image.imageSrc}
                alt={image.title}
                className="gallery-image"
                loading="lazy"
              />
              {image.description && (
                <div className="image-description">
                  <p>{image.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showLoadMore && (
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
