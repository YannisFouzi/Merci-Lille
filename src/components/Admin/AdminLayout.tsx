import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-900 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin/events" className="text-white hover:text-gray-300">
              Evenements
            </Link>
            <Link to="/admin/gallery" className="text-white hover:text-gray-300">
              Galerie
            </Link>
            <a
              href="https://mercilille.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <span>Voir le site</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-white hover:text-gray-300 disabled:text-gray-500"
          >
            {isLoggingOut ? "Deconnexion..." : "Deconnexion"}
          </button>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children ?? <Outlet />}</main>
    </div>
  );
};

export default AdminLayout;
