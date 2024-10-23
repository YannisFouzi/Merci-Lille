import React from "react";
import styles from "./BouncingText.module.scss";

const BouncingText: React.FC = () => {
  const textLine1 = "à";
  const textLine2 = "bientôt";

  const renderBouncingText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={styles.bouncingLetter}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div className={styles.bouncingTextContainer}>
      <h1>
        <div className={styles.textLine}>{renderBouncingText(textLine1)}</div>
        <div className={styles.textLine}>{renderBouncingText(textLine2)}</div>
      </h1>
    </div>
  );
};

export default BouncingText;
