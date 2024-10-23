import React, { useState } from "react";
import "./Gallery.scss";

// Import de toutes les images
import DSC04500 from "../../media/gallery/DSC04500.jpg";
import DSC04727 from "../../media/gallery/DSC04727.jpg";
import DSC04956 from "../../media/gallery/DSC04956.jpg";
import DSC04970 from "../../media/gallery/DSC04970.jpg";
import DSC05027 from "../../media/gallery/DSC05027.jpg";
import DSC05085 from "../../media/gallery/DSC05085.jpg";
import DSC05673 from "../../media/gallery/DSC05673-2.jpg";
import DSC05716 from "../../media/gallery/DSC05716.jpg";
import DSC05820 from "../../media/gallery/DSC05820.jpg";
import DSC05939 from "../../media/gallery/DSC05939.jpg";
import DSC06239 from "../../media/gallery/DSC06239.jpg";
import DSC06254 from "../../media/gallery/DSC06254.jpg";
import DSC06303 from "../../media/gallery/DSC06303.jpg";
import DSC06320 from "../../media/gallery/DSC06320.jpg";
import DSC06389 from "../../media/gallery/DSC06389.jpg";
import DSC06461 from "../../media/gallery/DSC06461.jpg";
import DSC06686 from "../../media/gallery/DSC06686.jpg";
import DSC06751 from "../../media/gallery/DSC06751.jpg";
import DSC06784 from "../../media/gallery/DSC06784.jpg";

const Gallery: React.FC = () => {
  const ITEMS_PER_PAGE = 6;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  // Tableau de toutes les images importées
  const galleryImages = [
    DSC06303,
    DSC04727,
    DSC04956,
    DSC04970,
    DSC05027,
    DSC05673,
    DSC05716,
    DSC05820,
    DSC05939,
    DSC06239,
    DSC06254,
    DSC04500,
    DSC06320,
    DSC06461,
    DSC06686,
    DSC06751,
    DSC06784,
    DSC05085,
    DSC06389,
  ];

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

    for (let i = 0; i < galleryImages.length; i++) {
      if (i % 3 === 0) {
        lastColor = getRandomColor(lastRowEndColor);
      } else {
        lastColor = getRandomColor(lastColor);
      }

      items.push({
        id: i + 1,
        colorClass: lastColor,
        image: galleryImages[i],
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
    setVisibleItems((prev: number) => prev + ITEMS_PER_PAGE); // Ajout du type number
  };

  return (
    <div className="gallery-container">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 text-white">
        La Galerie
      </h1>
      <div className="gallery-grid">
        {items.slice(0, visibleItems).map((item) => (
          <div key={item.id} className={`gallery-item show ${item.colorClass}`}>
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
    </div>
  );
};

export default Gallery;
