import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EventsManagement from "./components/Admin/EventsManagement";
import GalleryManagement from "./components/Admin/GalleryManagement";
import LoginForm from "./components/Admin/LoginForm";
import PrivateRoute from "./components/Admin/PrivateRoute";
import FullGallery from "./components/Gallery/FullGallery";
import AdminLayout from "./layouts/AdminLayout";
import MainContent from "./page/App";
import { authService } from "./services/auth.service";

const App: React.FC = () => {
  useEffect(() => {
    // Initialiser la vérification périodique du token si l'utilisateur est déjà connecté
    authService.initializePeriodicCheck();

    // Nettoyer lors du démontage du composant
    return () => {
      authService.stopPeriodicCheck();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/gallerie" element={<FullGallery />} />
      <Route path="/admin/login" element={<LoginForm />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/admin/events" replace />} />
        <Route path="events" element={<EventsManagement />} />
        <Route path="gallery" element={<GalleryManagement />} />
      </Route>
    </Routes>
  );
};

export default App;
