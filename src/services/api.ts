import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Pour les cookies httpOnly
});

// Variable pour éviter les appels multiples de refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

// Fonction pour rafraîchir le token (sans dépendance circulaire)
const refreshTokenFunc = async (): Promise<boolean> => {
  try {
    // Les tokens sont maintenant en cookies httpOnly
    // Le backend lira automatiquement le refreshToken cookie
    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {}, // Pas besoin d'envoyer le token dans le body
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true, // Envoie les cookies automatiquement
      }
    );

    // Le nouveau accessToken est automatiquement stocké en cookie par le backend
    return response.data.message === "Token refreshed successfully";
  } catch (error) {
    console.warn("Impossible de rafraîchir le token");
    return false;
  }
};

// Intercepteur pour ajouter les headers de sécurité aux requêtes
api.interceptors.request.use((config) => {
  // Le token est maintenant en cookie httpOnly, pas besoin de l'ajouter manuellement
  // Le navigateur l'envoie automatiquement grâce à withCredentials: true

  // Header anti-CSRF pour toutes les requêtes non-GET
  if (config.method !== "get") {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
  }

  return config;
});

// Intercepteur pour gérer les erreurs d'authentification avec refresh automatique
api.interceptors.response.use(
  (response) => {
    // Si la réponse est OK, on la retourne
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si c'est une erreur 401 ET que le token a expiré
    if (
      error.response?.status === 401 &&
      error.response?.data?.expired &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Si un refresh est déjà en cours, mettre la requête en queue
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Le cookie est automatiquement envoyé, pas besoin d'ajouter le header
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Essayer de rafraîchir le token
        const refreshed = await refreshTokenFunc();

        if (refreshed) {
          // Le nouveau token est automatiquement stocké en cookie
          processQueue(null);

          // Réessayer la requête originale (le cookie sera envoyé automatiquement)
          return api(originalRequest);
        } else {
          // Impossible de rafraîchir, forcer la déconnexion
          processQueue(error);
          window.location.href = "/admin/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Pour les autres erreurs 401 ou autres codes d'erreur
    if (error.response?.status === 401) {
      // Les cookies seront effacés automatiquement par le backend lors du logout
      // ou expireront naturellement

      // Rediriger vers la page de connexion seulement si on n'y est pas déjà
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/admin/login")) {
        console.warn("Token invalide, redirection vers la page de connexion");
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
