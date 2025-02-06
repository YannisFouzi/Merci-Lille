import React, { useEffect, useState } from "react";

const FloatingContactButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée après 1 seconde
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToContact}
      className={`
        fixed bottom-8 left-1/2 transform -translate-x-1/2 
        bg-red-600 hover:bg-red-700 text-white px-6 py-3 
        rounded-full shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl z-50 flex items-center gap-2
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        transition-all duration-700 ease-out
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
      Contact
    </button>
  );
};

export default FloatingContactButton;
