import React from "react";
import "./SocialMediaMenu.scss";

const InstagramLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const SocialMediaMenu: React.FC = () => {
  return (
    <section className="social-media-section">
      <div className="social-media-menu">
        <ul>
          <li>
            <a
              href="https://www.instagram.com/merci.lille/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogo />
              <span> - Instagram</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SocialMediaMenu;
