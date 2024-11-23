import { Route, Routes } from "react-router-dom";
import EventsManagement from "../components/Admin/EventsManagement";
import GalleryManagement from "../components/Admin/GalleryManagement";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/events" element={<EventsManagement />} />
      <Route path="/gallery" element={<GalleryManagement />} />
    </Routes>
  );
};

export default AdminRoutes;
