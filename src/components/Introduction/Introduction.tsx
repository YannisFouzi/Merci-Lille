import React, { useEffect, useState } from "react";
import "./Introduction.scss";

const Introduction: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const text =
    "Né de l'esprit malade de deux zigotos sympathiques mais simplets, Merci Lille est une association de musique électronique éclectique (un mot difficile à prononcer pour ses deux fondateurs) visant à rassembler les divers styles et genres qui composent le très vaste éventail de l'électro.";

  useEffect(() => {
    const wordsArray = text.split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= wordsArray.length) {
        setWords(wordsArray.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="introduction-container">
      <div className="introduction-wrapper">
        <div className="introduction-placeholder" aria-hidden="true">
          {text}
        </div>

        {/* Texte animé */}
        <div className="introduction-content">
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <span className="fade-in-word">{word}</span>
              {index < words.length - 1 && " "}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
