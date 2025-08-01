import React, { createContext, useContext, useEffect, useState } from "react";
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
      console.log(
        "🚫 Désactivation des animations (retour de navigation interne)"
      );
      setShouldAnimate(false);
      // Nettoyer le marqueur et réactiver les animations après que tout soit rendu
      setTimeout(() => {
        clearInternalNavigation();
        console.log("✅ Animations réactivées après nettoyage");
        setShouldAnimate(true);
      }, 1500); // Délai plus long pour laisser le temps aux sections de se rendre
    } else {
      console.log(
        "✨ Animations activées (première visite ou navigation externe)"
      );
      setShouldAnimate(true);
    }
  }, [isInternalNavigation, clearInternalNavigation]);

  const disableAnimations = () => {
    console.log("🚫 Animations désactivées manuellement");
    setShouldAnimate(false);
  };

  const enableAnimations = () => {
    console.log("✨ Animations activées manuellement");
    setShouldAnimate(true);
  };

  return (
    <AnimationContext.Provider
      value={{
        shouldAnimate,
        disableAnimations,
        enableAnimations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
