import React, { useEffect, useState } from "react";

const FloatingContactButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);

  useEffect(() => {
    // Animation d'entrée après 1 seconde
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Observer pour détecter quand on est au niveau du formulaire
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtContact(entry.isIntersecting);
      },
      { threshold: 0.5 } // Déclenche quand 50% du formulaire est visible
    );

    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (isAtContact) {
      // Remonter en haut
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Aller au formulaire
      const contactSection = document.getElementById("contact-section");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-8 left-1/2 transform -translate-x-1/2 
        bg-red-600 hover:bg-red-700 text-white px-6 py-3 
        rounded-full shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl z-50 flex items-center gap-2
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        transition-all duration-700 ease-out
      `}
    >
      {isAtContact ? (
        // Icône flèche vers le haut
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // Icône enveloppe
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )}
      {isAtContact ? "Remonter" : "Contact"}
    </button>
  );
};

export default FloatingContactButton;
