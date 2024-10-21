import React, { useEffect } from "react";
import "./App.css";
import EmailForm from "./components/EmailForm/EmailForm";
import AnimatedSVGLogo from "./components/SVGAnimation/AnimatedSVGLogo";

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
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4">
        <header className="py-8 flex flex-col items-center">
          <AnimatedSVGLogo />
        </header>
        <main>
          <section className="mb-12">
            <ShotgunWidget />
          </section>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-green-400"></h2>
            <EmailForm />
          </section>
        </main>
        <footer className="py-8 text-center text-gray-400">
          <p>&copy; 2024 Merci Lille. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
