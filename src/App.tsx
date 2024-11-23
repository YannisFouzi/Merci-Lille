import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EventsManagement from "./components/Admin/EventsManagement";
import GalleryManagement from "./components/Admin/GalleryManagement";
import LoginForm from "./components/Admin/LoginForm";
import PrivateRoute from "./components/Admin/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";
import MainContent from "./page/App";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
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
