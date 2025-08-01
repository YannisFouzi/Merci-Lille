import PuzzleGame from "@/components/PuzzleGame/PuzzleGame";
import TextScramble from "@/components/TextScramble/TextScramble";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import EventsManagement from "../components/Admin/EventsManagement";
import GalleryManagement from "../components/Admin/GalleryManagement";
import LoginForm from "../components/Admin/LoginForm";
import PrivateRoute from "../components/Admin/PrivateRoute";
import Aftermovies from "../components/Aftermovies/Aftermovies";
import EmailForm from "../components/EmailForm/EmailForm";
import FloatingContactButton from "../components/FloatingContactButton/FloatingContactButton";
import FullGallery from "../components/Gallery/FullGallery";
import Gallery from "../components/Gallery/Gallery";
import Introduction from "../components/Introduction/Introduction";
import ProfileCard from "../components/ProfilCard/ProfileCard";
import ShotgunEvents from "../components/ShotgunEvents/ShotgunEvents";
import SocialMediaMenu from "../components/SocialMediaMenu/SocialMediaMenu";
import AnimatedSVGLogo from "../components/SVGAnimation/AnimatedSVGLogo";
import { useScrollPosition } from "../hooks/useScrollPosition";

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
  const { restoreScrollPosition, saveScrollPosition } = useScrollPosition();

  const togglePuzzle = () => {
    setShowPuzzle(!showPuzzle);
  };

  // Restaurer la position de scroll quand on revient sur la page d'accueil
  useEffect(() => {
    console.log("🏠 MainContent monté, tentative de restauration...");
    restoreScrollPosition("/");
  }, [restoreScrollPosition]);

  // Sauvegarder automatiquement la position lors du scroll
  useEffect(() => {
    const handleScroll = () => {
      // Sauvegarder la position en continu
      saveScrollPosition("/");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [saveScrollPosition]);

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
            <Aftermovies />
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

        <footer className="py-8 pb-24 text-center text-gray-400">
          <p>
            &copy; 2024 Merci Lille. Tous droits réservés. Développé par{" "}
            <a
              href="https://fouzi-dev.fr"
              target="_blank"
              className="font-bold"
            >
              fouzi-dev.fr
            </a>
            . <span onClick={togglePuzzle}>Terrorclown</span>
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
      <FloatingContactButton showPuzzle={showPuzzle} />
    </div>
  );
};

// Système "Coming Soon" supprimé pour des raisons de sécurité
// Le mot de passe en dur était visible dans le code source client

const App: React.FC = () => {
  return (
    <Router>
      <Helmet>
        <title>Merci Lille</title>
        <meta
          name="description"
          content="Découvrez nos événements électro à Lille. Rejoignez-nous pour une expérience musicale unique !"
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/gallerie" element={<FullGallery />} />
        <Route path="/admin/login" element={<LoginForm />} />
        <Route
          path="/admin/events"
          element={
            <PrivateRoute>
              <AdminLayout>
                <EventsManagement />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <PrivateRoute>
              <AdminLayout>
                <GalleryManagement />
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
