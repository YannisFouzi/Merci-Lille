import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/auth.service";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
