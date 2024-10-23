import React from "react";
import scoobyImage from "../../media/artist/scooby.jpg";
import "./Gallery.css";

const Gallery: React.FC = () => {
  // Définition des couleurs disponibles
  const borderColors = [
    "alizarin", // rouge
    "wisteria", // violet
    "emerland", // vert
    "belizehole", // bleu
    "sunflower", // jaune
  ];

  // Fonction pour obtenir une couleur aléatoire différente de la précédente
  const getRandomColor = (excludeColor?: string) => {
    const availableColors = borderColors.filter(
      (color) => color !== excludeColor
    );
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  // Génération des items avec des couleurs différentes côte à côte
  const generateItems = (count: number) => {
    const items = [];
    let lastColor = "";
    let lastRowEndColor = ""; // Pour gérer les couleurs entre les lignes

    for (let i = 0; i < count; i++) {
      // Si on commence une nouvelle ligne (pour 4 items par ligne)
      if (i % 4 === 0) {
        // Éviter la même couleur que la fin de la ligne précédente
        lastColor = getRandomColor(lastRowEndColor);
      } else {
        // Éviter la même couleur que l'item précédent
        lastColor = getRandomColor(lastColor);
      }

      items.push({
        id: i + 1,
        colorClass: lastColor,
      });

      // Sauvegarder la couleur de fin de ligne
      if ((i + 1) % 4 === 0) {
        lastRowEndColor = lastColor;
      }
    }

    return items;
  };

  const items = generateItems(10);

  return (
    <div className="gallery-container">
      <h1 className="text-6xl font-bold text-center mb-16 text-white">
        La Galerie
      </h1>
      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item.id} className={`gallery-item show ${item.colorClass}`}>
            <div className="item-content">
              <img src={scoobyImage} alt="Scooby" className="gallery-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
