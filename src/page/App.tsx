import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import EmailForm from "../components/EmailForm/EmailForm";
import Gallery from "../components/Gallery/Gallery";
import Introduction from "../components/Introduction/Introduction";
import ProfileCard from "../components/ProfilCard/ProfileCard";
import PuzzleGame from "../components/PuzzleGame/PuzzleGame";
import ShotgunEvents from "../components/ShotgunEvents/ShotgunEvents";
import SocialMediaMenu from "../components/SocialMediaMenu/SocialMediaMenu";
import AnimatedSVGLogo from "../components/SVGAnimation/AnimatedSVGLogo";
import TextScramble from "../components/TextScramble/TextScramble";
import "./App.css";

const IS_DEVELOPMENT = false;

const useElementOnScreen = (options: IntersectionObserverInit) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
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

const MainContent: React.FC = () => {
  const [showPuzzle, setShowPuzzle] = useState(false);

  const togglePuzzle = () => {
    setShowPuzzle(!showPuzzle);
  };

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
            <Introduction />
          </Section>

          <Section>
            <ShotgunEvents />
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
            &copy; 2024 Merci Lille. Tous droits réservés.{" "}
            <span onClick={togglePuzzle}>Terrorclown</span>
          </p>
        </footer>
      </div>

      {showPuzzle && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={togglePuzzle}
            className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Fermer
          </button>
          <div className="w-full h-full">
            <PuzzleGame />
          </div>
        </div>
      )}
    </div>
  );
};

const ComingSoon: React.FC = () => {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "rapturejetaime") {
      setIsAuthorized(true);
      setShowError(false);
      localStorage.setItem("isAuthorized", "true");
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("isAuthorized");
    if (auth === "true") {
      setIsAuthorized(true);
    }
  }, []);

  if (isAuthorized) {
    return <MainContent />;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="mb-24 transform scale-150">
        <AnimatedSVGLogo />
      </div>

      <h1 className="text-3xl md:text-5xl text-white font-bold text-center mb-6">
        Notre site arrive bientôt
      </h1>

      <p className="text-xl md:text-2xl text-gray-400 text-center max-w-2xl mb-12">
        Nous préparons quelque chose de spécial pour vous. Restez connectés !
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className={`bg-transparent border-2 ${
              showError ? "border-red-500" : "border-gray-700"
            } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white transition-colors`}
          />
          <div
            className={`absolute -bottom-6 left-0 right-0 text-center text-red-500 text-sm transition-opacity ${
              showError ? "opacity-100" : "opacity-0"
            }`}
          >
            Mot de passe incorrect
          </div>
        </div>
      </form>

      <div className="transform scale-75">
        <SocialMediaMenu />
      </div>

      <footer className="absolute bottom-8 text-center text-gray-400">
        <p>&copy; 2024 Merci Lille. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  if (!IS_DEVELOPMENT) {
    return <ComingSoon />;
  }

  return <MainContent />;
};

export default App;