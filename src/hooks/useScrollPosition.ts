import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Hook personnalisé pour gérer la sauvegarde et restauration de la position de scroll
export const useScrollPosition = () => {
  const location = useLocation();
  const scrollPositions = useRef<{ [key: string]: number }>({});

  // Fonction pour sauvegarder la position de scroll actuelle
  const saveScrollPosition = (key: string = location.pathname) => {
    const position = window.scrollY;
    console.log(`🔄 Sauvegarde position scroll pour ${key}:`, position);
    scrollPositions.current[key] = position;
    // Sauvegarder aussi dans sessionStorage pour persister entre les navigations
    sessionStorage.setItem(`scrollPosition_${key}`, position.toString());
  };

  // Fonction pour restaurer la position de scroll
  const restoreScrollPosition = (key: string = location.pathname) => {
    const savedPosition = sessionStorage.getItem(`scrollPosition_${key}`);
    console.log(`🔍 Tentative de restauration pour ${key}:`, savedPosition);

    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      console.log(`📍 Restauration vers position:`, position);

      // Essayer plusieurs fois avec des délais croissants
      // pour s'assurer que React Router n'interfère pas
      const attemptRestore = (delay: number, attempt: number = 1) => {
        setTimeout(() => {
          console.log(
            `🚀 Tentative ${attempt} de scroll vers ${position}px (délai: ${delay}ms)`
          );
          window.scrollTo({
            top: position,
            left: 0,
            behavior: "auto", // Pas d'animation pour éviter les conflits
          });

          // Vérifier si le scroll a fonctionné
          setTimeout(() => {
            const currentScroll = window.scrollY;
            console.log(
              `✅ Position actuelle après restauration: ${currentScroll}px (objectif: ${position}px)`
            );

            // Si on n'est pas à la bonne position et qu'on n'a pas fait trop de tentatives
            if (Math.abs(currentScroll - position) > 50 && attempt < 3) {
              console.log(
                `🔄 Nouvelle tentative nécessaire (écart: ${Math.abs(
                  currentScroll - position
                )}px)`
              );
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
    console.log("🔄 Navigation interne marquée");
  };

  // Fonction pour vérifier si c'est un retour de navigation interne
  const isInternalNavigation = () => {
    const isInternal =
      sessionStorage.getItem("isInternalNavigation") === "true";
    console.log("🔍 Vérification navigation interne:", isInternal);
    return isInternal;
  };

  // Fonction pour nettoyer le marqueur de navigation interne
  const clearInternalNavigation = () => {
    sessionStorage.removeItem("isInternalNavigation");
    console.log("🧹 Marqueur navigation interne nettoyé");
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
