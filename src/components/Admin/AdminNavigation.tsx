import { CalendarIcon, HomeIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { authService } from "../../services/auth.service";

const AdminNavigation: React.FC = () => {
  const location = useLocation();

  const navigation = [
    {
      name: "Événements",
      path: "/admin/events",
      icon: CalendarIcon,
    },
    {
      name: "Galerie",
      path: "/admin/gallery",
      icon: PhotoIcon,
    },
  ];

  const handleLogout = () => {
    // Utiliser authService.logout() qui gère les cookies httpOnly
    authService.logout();
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>

          <ul className="flex space-x-6">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 text-white hover:text-red-500 transition-colors ${
                      isActive ? "text-red-500" : ""
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Retour au site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
