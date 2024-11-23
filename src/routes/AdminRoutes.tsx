import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import EventsManagement from "../components/Admin/EventsManagement";
import GalleryManagement from "../components/Admin/GalleryManagement";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        }
      >
        <Route index element={<EventsManagement />} />
        <Route path="events" element={<EventsManagement />} />
        <Route path="gallery" element={<GalleryManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
