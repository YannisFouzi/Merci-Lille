import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { galleryService } from "../../services/gallery.service";
import "./Gallery.scss";

interface GalleryImage {
  _id: string;
  imageSrc: string;
}

const Gallery: React.FC = () => {
  const ITEMS_PER_PAGE = 6;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await galleryService.getAllImages();
        setImages(data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Définition des couleurs disponibles
  const borderColors = [
    "alizarin",
    "wisteria",
    "emerland",
    "belizehole",
    "sunflower",
  ];

  const getRandomColor = (excludeColor?: string) => {
    const availableColors = borderColors.filter(
      (color) => color !== excludeColor
    );
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  const generateItems = () => {
    const items = [];
    let lastColor = "";
    let lastRowEndColor = "";

    for (let i = 0; i < images.length; i++) {
      if (i % 3 === 0) {
        lastColor = getRandomColor(lastRowEndColor);
      } else {
        lastColor = getRandomColor(lastColor);
      }

      items.push({
        id: images[i]._id,
        colorClass: lastColor,
        image: images[i].imageSrc,
      });

      if ((i + 1) % 3 === 0) {
        lastRowEndColor = lastColor;
      }
    }

    return items;
  };

  const items = generateItems();
  const showLoadMore = items.length > visibleItems;

  const handleLoadMore = () => {
    setVisibleItems((prev: number) => prev + ITEMS_PER_PAGE);
  };

  const handleImageClick = (imageSrc: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedImage(imageSrc);
  };

  const handleCloseFullscreen = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-white">Chargement des images...</div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <Helmet>
        <title>Galerie Photo | Merci Lille</title>
        <meta
          name="description"
          content="Explorez toute les photos de nos événements passés."
        />
      </Helmet>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 text-white">
        La Galerie
      </h1>
      <div className="gallery-grid">
        {items.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className={`gallery-item show ${item.colorClass} cursor-pointer`}
            onClick={(e) => handleImageClick(item.image, e)}
          >
            <div className="item-content">
              <img
                src={item.image}
                alt={`Gallery item ${item.id}`}
                className="gallery-image"
              />
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

      {/* Modal plein écran */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={handleCloseFullscreen}
        >
          <button
            className="absolute top-4 right-4 text-white text-xl hover:text-red-500 transition-colors"
            onClick={handleCloseFullscreen}
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Full screen view"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
