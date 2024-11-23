import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-900 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin/events" className="text-white hover:text-gray-300">
              Événements
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
            className="text-white hover:text-gray-300"
          >
            Déconnexion
          </button>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
