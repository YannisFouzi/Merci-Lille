import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Pour les cookies httpOnly
});

// Variable pour éviter les appels multiples de refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

// Fonction pour rafraîchir le token (sans dépendance circulaire)
const refreshTokenFunc = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return false;
    }

    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      { refreshToken },
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
      }
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return true;
    }

    return false;
  } catch (error) {
    console.warn("Impossible de rafraîchir le token");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return false;
  }
};

// Intercepteur pour ajouter les headers de sécurité aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

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
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
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
          const newToken = localStorage.getItem("token");
          processQueue(null, newToken);

          // Réessayer la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          // Impossible de rafraîchir, forcer la déconnexion
          processQueue(error, null);
          window.location.href = "/admin/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Pour les autres erreurs 401 ou autres codes d'erreur
    if (error.response?.status === 401) {
      // Nettoyer les tokens invalides
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

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
