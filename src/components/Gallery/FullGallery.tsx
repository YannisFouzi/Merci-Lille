import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { galleryService } from "../../services/gallery.service";
import "./Gallery.scss";

interface GalleryImage {
  _id: string;
  imageSrc: string;
}

const FullGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { restoreScrollPosition } = useScrollPosition();

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

  useEffect(() => {
    // Désactiver le défilement quand une image est sélectionnée
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

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

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Fonction pour gérer le retour à l'accueil avec restauration de scroll
  const handleBackToHome = () => {
    // La restauration se fera automatiquement dans MainContent
    // Pas besoin de faire quelque chose ici, juste permettre la navigation
  };

  const Modal = () => {
    if (!selectedImage) return null;
    return createPortal(
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-content">
          <img src={selectedImage} alt="Selected" className="modal-image" />
        </div>
      </div>,
      document.body
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement des images...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar fixe */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
              onClick={handleBackToHome}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-lg font-medium">Retour à l'accueil</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="gallery-container">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 text-white">
            Toute la Galerie
          </h1>

          {images.length > 0 ? (
            <>
              <div className="gallery-grid">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`gallery-item show ${item.colorClass}`}
                    onClick={() => handleImageClick(item.image)}
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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">
                Aucune image dans la galerie
              </p>
            </div>
          )}

          {selectedImage && <Modal />}
        </div>
      </div>
    </div>
  );
};

export default FullGallery;
