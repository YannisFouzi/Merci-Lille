import React, { useEffect, useRef, useState } from "react";
import "./TextScramble.scss";

class TextScrambleLogic {
  private el: HTMLElement;
  private chars: string;
  private queue: Array<{
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
  }>;
  private frame: number;
  private frameRequest: number;
  private resolve: (() => void) | null;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.queue = [];
    this.frame = 0;
    this.frameRequest = 0;
    this.resolve = null;
    this.update = this.update.bind(this);
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  private update(): void {
    // Vider le contenu existant de manière sécurisée
    this.el.textContent = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        // Ajouter le caractère final de manière sécurisée
        const finalSpan = document.createElement("span");
        finalSpan.textContent = to;
        this.el.appendChild(finalSpan);
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        // Créer un span avec classe "dud" de manière sécurisée
        const dudSpan = document.createElement("span");
        dudSpan.className = "dud";
        dudSpan.textContent = char;
        this.el.appendChild(dudSpan);
      } else {
        // Ajouter le caractère "from" de manière sécurisée
        const fromSpan = document.createElement("span");
        fromSpan.textContent = from;
        this.el.appendChild(fromSpan);
      }
    }

    if (complete === this.queue.length) {
      this.resolve?.();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases: string[] = [
  "Hardstyle",
  "Hardcore",
  "Hard Groove",
  "UK Garage",
  "Eurodance",
  "Techno",
  "Drum 'n' Bass",
  "Freestyle",
];

const TextScramble: React.FC = () => {
  const el = useRef<HTMLDivElement>(null);
  const fx = useRef<TextScrambleLogic | null>(null);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (el.current) {
      fx.current = new TextScrambleLogic(el.current);
    }
  }, []);

  useEffect(() => {
    const next = () => {
      if (fx.current) {
        fx.current.setText(phrases[counter]).then(() => {
          setTimeout(() => {
            setCounter((prevCounter) => (prevCounter + 1) % phrases.length);
          }, 800);
        });
      }
    };

    if (fx.current) {
      next();
    }
  }, [counter]);

  return (
    <div>
      <div className="container mx-auto px-4">
        <div ref={el} className="text-scramble text-5xl text-center"></div>
      </div>
    </div>
  );
};

export default TextScramble;
