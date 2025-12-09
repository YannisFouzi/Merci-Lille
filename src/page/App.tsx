import PuzzleGame from "@/components/PuzzleGame/PuzzleGame";
import TextScramble from "@/components/TextScramble/TextScramble";
import { QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FloatingContactButton from "../components/FloatingContactButton/FloatingContactButton";
import Gallery from "../components/Gallery/Gallery";
import Introduction from "../components/Introduction/Introduction";
import ProfileCard from "../components/ProfilCard/ProfileCard";
import ShotgunEvents from "../components/ShotgunEvents/ShotgunEvents";
import SocialMediaMenu from "../components/SocialMediaMenu/SocialMediaMenu";
import AnimatedSVGLogo from "../components/SVGAnimation/AnimatedSVGLogo";
import { AuthProvider } from "../contexts/AuthContext";
import { AnimationProvider, useAnimation } from "../contexts/AnimationContext";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { queryClient } from "../lib/queryClient";
import { useInView } from "react-intersection-observer";

const Aftermovies = lazy(() => import("../components/Aftermovies/Aftermovies"));
const EmailForm = lazy(() => import("../components/EmailForm/EmailForm"));
const FullGallery = lazy(() => import("../components/Gallery/FullGallery"));
const AdminLayout = lazy(() => import("../components/Admin/AdminLayout"));
const EventsManagement = lazy(
  () => import("../components/Admin/EventsManagement")
);
const GalleryManagement = lazy(
  () => import("../components/Admin/GalleryManagement")
);
const LoginForm = lazy(() => import("../components/Admin/LoginForm"));
const PrivateRoute = lazy(() => import("../components/Admin/PrivateRoute"));

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const { shouldAnimate } = useAnimation();

  // Si les animations sont désactivées, afficher directement sans animation
  if (!shouldAnimate) {
    return (
      <section
        ref={ref}
        className={`mb-12 ${className}`}
        style={{ opacity: 1, transform: "translateY(0)" }}
      >
        {children}
      </section>
    );
  }

  // Sinon, utiliser les animations normalement
  return (
    <motion.section
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Helmet>
            <title>Merci Lille</title>
            <meta
              name="description"
              content="DÇ¸couvrez nos Ç¸vÇ¸nements Ç¸lectro Çÿ Lille. Rejoignez-nous pour une expÇ¸rience musicale unique !"
            />
          </Helmet>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Chargement...
              </div>
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  <AnimationProvider>
                    <MainContent />
                  </AnimationProvider>
                }
              />
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
          </Suspense>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
