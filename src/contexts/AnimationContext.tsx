import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";

interface AnimationContextType {
  shouldAnimate: boolean;
  disableAnimations: () => void;
  enableAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const { isInternalNavigation, clearInternalNavigation } = useScrollPosition();

  useEffect(() => {
    // Au montage du provider, vérifier si c'est un retour de navigation interne
    const isInternal = isInternalNavigation();

    if (isInternal) {
      setShouldAnimate(false);
      // Nettoyer le marqueur et réactiver les animations après que tout soit rendu
      setTimeout(() => {
        clearInternalNavigation();
        setShouldAnimate(true);
      }, 1500); // Délai plus long pour laisser le temps aux sections de se rendre
    } else {
      setShouldAnimate(true);
    }
  }, [isInternalNavigation, clearInternalNavigation]);

  // useCallback pour stabilité référence des fonctions
  const disableAnimations = useCallback(() => {
    setShouldAnimate(false);
  }, []);

  const enableAnimations = useCallback(() => {
    setShouldAnimate(true);
  }, []);

  // useMemo pour éviter de recréer l'objet value à chaque render
  const value = useMemo(
    () => ({
      shouldAnimate,
      disableAnimations,
      enableAnimations,
    }),
    [shouldAnimate, disableAnimations, enableAnimations]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
