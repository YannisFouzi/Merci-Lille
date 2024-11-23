import React from "react";
import { Link } from "react-router-dom";

const AdminNavigation: React.FC = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/admin/events"
            className="text-white hover:text-red-500 transition-colors"
          >
            Événements
          </Link>
        </li>
        <li>
          <Link
            to="/admin/gallery"
            className="text-white hover:text-red-500 transition-colors"
          >
            Galerie
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
