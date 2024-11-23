import { CalendarIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const AdminNavigation: React.FC = () => {
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
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="text-white hover:text-red-500 transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavigation;
