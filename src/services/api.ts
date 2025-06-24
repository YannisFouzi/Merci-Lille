import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => {
    // Si la réponse est OK, on la retourne
    return response;
  },
  (error) => {
    // Si c'est une erreur 401 (Unauthorized)
    if (error.response?.status === 401) {
      // Nettoyer le token invalide
      localStorage.removeItem("token");

      // Rediriger vers la page de connexion seulement si on n'y est pas déjà
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/admin/login")) {
        console.warn(
          "Token invalide ou expiré, redirection vers la page de connexion"
        );
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
