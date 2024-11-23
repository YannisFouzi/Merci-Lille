import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Admin/LoginForm";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminRoutes from "./routes/AdminRoutes";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      />
      {/* Autres routes de votre application */}
    </Routes>
  );
};

export default App;
