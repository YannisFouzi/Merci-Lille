import React, { useEffect, useState } from "react";
import "./App.css";
import BouncingText from "./components/BouncingText/BouncingText";
import EmailForm from "./components/EmailForm/EmailForm";
import PuzzleGame from "./components/PuzzleGame";
import AnimatedSVGLogo from "./components/SVGAnimation/AnimatedSVGLogo";
import TextScramble from "./components/TextScramble/TextScramble";

const ShotgunWidget: React.FC = () => {
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
    <iframe
      src="https://shotgun.live/venues/merci-lille?embedded=1&ui=dark"
      allow="payment"
      style={{
        width: "100%",
        height: "800px",
        maxHeight: "calc(100vh - 200px)",
        border: "0",
      }}
      title="Shotgun Events"
    />
  );
};

const App: React.FC = () => {
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
          <TextScramble />
          <section className="mb-12">
            <ShotgunWidget />
          </section>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-green-400"></h2>
            <EmailForm />
          </section>
          <section className="mb-12">
            <BouncingText />
          </section>
        </main>
        <footer className="py-8 text-center text-gray-400">
          <p>
            &copy; 2024 Merci Lille. Tous droits réservés.{" "}
            <span onClick={togglePuzzle}>Et vive TerrorClown !</span>
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

export default App;
