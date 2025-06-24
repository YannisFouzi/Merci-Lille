import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/auth.service";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérification rapide locale d'abord
        if (!authService.hasToken()) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Vérification côté serveur
        const isValid = await authService.isAuthenticated();
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification d'authentification:",
          error
        );
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Affichage de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Redirection si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
