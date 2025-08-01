import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Hook personnalisé pour gérer la sauvegarde et restauration de la position de scroll
export const useScrollPosition = () => {
  const location = useLocation();
  const scrollPositions = useRef<{ [key: string]: number }>({});

  // Fonction pour sauvegarder la position de scroll actuelle
  const saveScrollPosition = (key: string = location.pathname) => {
    scrollPositions.current[key] = window.scrollY;
    // Sauvegarder aussi dans sessionStorage pour persister entre les navigations
    sessionStorage.setItem(`scrollPosition_${key}`, window.scrollY.toString());
  };

  // Fonction pour restaurer la position de scroll
  const restoreScrollPosition = (key: string = location.pathname) => {
    const savedPosition = sessionStorage.getItem(`scrollPosition_${key}`);
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      // Utiliser setTimeout pour s'assurer que le DOM est rendu
      setTimeout(() => {
        window.scrollTo(0, position);
      }, 100);
    }
  };

  // Fonction pour supprimer une position sauvegardée
  const clearScrollPosition = (key: string = location.pathname) => {
    delete scrollPositions.current[key];
    sessionStorage.removeItem(`scrollPosition_${key}`);
  };

  return {
    saveScrollPosition,
    restoreScrollPosition,
    clearScrollPosition,
  };
};

// Hook pour automatiquement sauvegarder la position avant de quitter une page
export const useAutoSaveScrollPosition = () => {
  const location = useLocation();
  const { saveScrollPosition } = useScrollPosition();

  useEffect(() => {
    // Sauvegarder la position avant de quitter la page
    const handleBeforeUnload = () => {
      saveScrollPosition(location.pathname);
    };

    // Sauvegarder périodiquement pendant le scroll
    const handleScroll = () => {
      saveScrollPosition(location.pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Sauvegarder une dernière fois avant le cleanup
      saveScrollPosition(location.pathname);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, saveScrollPosition]);
};
