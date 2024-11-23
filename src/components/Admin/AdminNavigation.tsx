import { CalendarIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link, useLocation } from "react-router-dom";

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

  return (
    <nav className="bg-gray-900 p-4">
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
    </nav>
  );
};

export default AdminNavigation;
