import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import EmailForm from "../components/EmailForm/EmailForm";
import Gallery from "../components/Gallery/Gallery";
import ProfileCard from "../components/ProfilCard/ProfileCard";
import PuzzleGame from "../components/PuzzleGame/PuzzleGame";
import SocialMediaMenu from "../components/SocialMediaMenu/SocialMediaMenu";
import AnimatedSVGLogo from "../components/SVGAnimation/AnimatedSVGLogo";
import TextScramble from "../components/TextScramble/TextScramble";

const useElementOnScreen = (options: IntersectionObserverInit) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Une fois que l'élément est visible, on arrête d'observer
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible] as const;
};

const ShotgunWidget: React.FC = () => {
  const [ref, isVisible] = useElementOnScreen({ threshold: 0.1 });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://shotgun.live/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={ref} className="relative min-h-[800px]">
      <iframe
        src="https://shotgun.live/venues/merci-lille?embedded=1&ui=dark"
        allow="payment"
        className="w-full h-[800px] max-h-[calc(100vh-200px)] border-0"
        title="Shotgun Events"
      />
    </div>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const [ref, isVisible] = useElementOnScreen({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  return (
    <motion.section
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className={`mb-12 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const App: React.FC = () => {
  const [showPuzzle, setShowPuzzle] = useState(false);

  useEffect(() => {
    if (showPuzzle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPuzzle]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4">
        <header className="py-8 flex flex-col items-center">
          <AnimatedSVGLogo />
        </header>

        <main>
          <Section>
            <TextScramble />
          </Section>

          <Section>
            <ShotgunWidget />
          </Section>

          <Section>
            <ProfileCard />
          </Section>

          <Section>
            <Gallery />
          </Section>

          <Section>
            <EmailForm />
          </Section>

          <Section>
            <SocialMediaMenu />
          </Section>
        </main>

        <footer className="py-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Merci Lille. Tous droits réservés.{" "}
            <motion.span
              onClick={() => setShowPuzzle(true)}
              className="cursor-pointer hover:text-green-400 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              Terrorclown
            </motion.span>
          </p>
        </footer>
      </div>

      <AnimatePresence>
        {showPuzzle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowPuzzle(false)}
              className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              Fermer
            </motion.button>
            <div className="w-full h-full">
              <PuzzleGame />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
