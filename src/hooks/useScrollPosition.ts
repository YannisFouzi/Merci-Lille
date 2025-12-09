import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Hook personnalisé pour gérer la sauvegarde et restauration de la position de scroll
export const useScrollPosition = () => {
  const location = useLocation();
  const scrollPositions = useRef<{ [key: string]: number }>({});

  // Fonction pour sauvegarder la position de scroll actuelle
  const saveScrollPosition = (key: string = location.pathname) => {
    const position = window.scrollY;
    scrollPositions.current[key] = position;
    // Sauvegarder aussi dans sessionStorage pour persister entre les navigations
    sessionStorage.setItem(`scrollPosition_${key}`, position.toString());
  };

  // Fonction pour restaurer la position de scroll
  const restoreScrollPosition = (key: string = location.pathname) => {
    const savedPosition = sessionStorage.getItem(`scrollPosition_${key}`);

    if (savedPosition) {
      const position = parseInt(savedPosition, 10);

      // Essayer plusieurs fois avec des délais croissants
      // pour s'assurer que React Router n'interfère pas
      const attemptRestore = (delay: number, attempt: number = 1) => {
        setTimeout(() => {
          window.scrollTo({
            top: position,
            left: 0,
            behavior: "auto", // Pas d'animation pour éviter les conflits
          });

          // Vérifier si le scroll a fonctionné
          setTimeout(() => {
            const currentScroll = window.scrollY;

            // Si on n'est pas à la bonne position et qu'on n'a pas fait trop de tentatives
            if (Math.abs(currentScroll - position) > 50 && attempt < 3) {
              attemptRestore(delay + 100, attempt + 1);
            }
          }, 50);
        }, delay);
      };

      // Première tentative immédiate
      attemptRestore(0);
      // Deuxième tentative après 200ms au cas où
      attemptRestore(200);
    }
  };

  // Fonction pour supprimer une position sauvegardée
  const clearScrollPosition = (key: string = location.pathname) => {
    delete scrollPositions.current[key];
    sessionStorage.removeItem(`scrollPosition_${key}`);
  };

  // Fonction pour marquer qu'on fait une navigation interne
  const markInternalNavigation = () => {
    sessionStorage.setItem("isInternalNavigation", "true");
  };

  // Fonction pour vérifier si c'est un retour de navigation interne
  const isInternalNavigation = () => {
    const isInternal =
      sessionStorage.getItem("isInternalNavigation") === "true";
    return isInternal;
  };

  // Fonction pour nettoyer le marqueur de navigation interne
  const clearInternalNavigation = () => {
    sessionStorage.removeItem("isInternalNavigation");
  };

  return {
    saveScrollPosition,
    restoreScrollPosition,
    clearScrollPosition,
    markInternalNavigation,
    isInternalNavigation,
    clearInternalNavigation,
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
