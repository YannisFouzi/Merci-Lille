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
          <div className="flex space-x-4">
            <Link to="/admin/events" className="text-white hover:text-gray-300">
              Événements
            </Link>
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
