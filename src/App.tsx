import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import EventsManagement from "./components/Admin/EventsManagement";
import GalleryManagement from "./components/Admin/GalleryManagement";
import AdminLayout from "./layouts/AdminLayout";
const ShotgunWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://shotgun.live/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      src="https://shotgun.live/venues/merci-lille?embedded=1&ui=dark"
      allow="payment"
      style={{
        width: "100%",
        height: "800px",
        maxHeight: "calc(100vh - 200px)",
        border: "0",
      }}
      title="Shotgun Events"
    />
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="events" element={<EventsManagement />} />
        <Route path="gallery" element={<GalleryManagement />} />
      </Route>
    </Routes>
  );
};

export default App;
