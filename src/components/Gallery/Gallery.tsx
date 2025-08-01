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

const Gallery: React.FC = () => {
  const ITEMS_PER_PAGE = 6;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { saveScrollPosition, markInternalNavigation } = useScrollPosition();

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
  const showViewAll = items.length > visibleItems;

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Fonction pour gérer le clic sur "Voir toute la galerie"
  const handleViewAllGallery = () => {
    // Sauvegarder la position de scroll actuelle avant la navigation
    saveScrollPosition("/");
    // Marquer qu'on fait une navigation interne
    markInternalNavigation();
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
      <div className="text-center py-12">
        <div className="text-white">Chargement des images...</div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 text-white">
        Galerie
      </h1>
      <div className="gallery-grid">
        {items.slice(0, visibleItems).map((item) => (
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

      {selectedImage && <Modal />}

      {showViewAll && (
        <div className="mt-8 text-center">
          <Link
            to="/gallerie"
            className="btn-load-more"
            onClick={handleViewAllGallery}
          >
            Voir toute la galerie
          </Link>
        </div>
      )}
    </div>
  );
};

export default Gallery;
