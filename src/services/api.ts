import axios from "axios";
import { notifyUnauthorized } from "./authChannel";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api";
const CSRF_COOKIE_NAME = "csrfToken";
const SAFE_METHODS = ["get", "head", "options"];

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Pour les cookies httpOnly
});

const getCsrfTokenFromCookie = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CSRF_COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

let pendingCsrfPromise: Promise<string | null> | null = null;
const ensureCsrfToken = async (): Promise<string | null> => {
  const existing = getCsrfTokenFromCookie();
  if (existing) return existing;

  if (!pendingCsrfPromise) {
    pendingCsrfPromise = axios
      .get<{ csrfToken?: string }>(`${API_URL}/auth/csrf`, {
        withCredentials: true,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((res) => {
        pendingCsrfPromise = null;
        return res.data?.csrfToken ?? getCsrfTokenFromCookie();
      })
      .catch(() => {
        pendingCsrfPromise = null;
        return null;
      });
  }

  return pendingCsrfPromise;
};

// Variable pour Ã©viter les appels multiples de refresh
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

// Fonction pour rafraÃ®chir le token (sans dÃ©pendance circulaire)
const refreshTokenFunc = async (): Promise<boolean> => {
  try {
    const csrfToken = await ensureCsrfToken();
    const headers: Record<string, string> = { "X-Requested-With": "XMLHttpRequest" };
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }

    // Les tokens sont maintenant en cookies httpOnly
    // Le backend lira automatiquement le refreshToken cookie
    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {}, // Pas besoin d'envoyer le token dans le body
      {
        headers,
        withCredentials: true, // Envoie les cookies automatiquement
      }
    );

    // Le nouveau accessToken est automatiquement stockÃ© en cookie par le backend
    return response.data.message === "Token refreshed successfully";
  } catch (error) {
    console.warn("Impossible de rafraÃ®chir le token");
    return false;
  }
};

// Intercepteur pour ajouter les headers de securite aux requetes
api.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();

  // Header anti-CSRF pour toutes les requetes non-GET
  if (!SAFE_METHODS.includes(method)) {
    config.headers = config.headers ?? {};
    config.headers["X-Requested-With"] = "XMLHttpRequest";

    const csrfToken = await ensureCsrfToken();
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
  }

  return config;
});

// Intercepteur pour gÃ©rer les erreurs d'authentification avec refresh automatique
api.interceptors.response.use(
  (response) => {
    // Si la rÃ©ponse est OK, on la retourne
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si c'est une erreur 401 ET que le token a expirÃ©
    if (
      error.response?.status === 401 &&
      error.response?.data?.expired &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Si un refresh est dÃ©jÃ  en cours, mettre la requÃªte en queue
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Le cookie est automatiquement envoyÃ©, pas besoin d'ajouter le header
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Essayer de rafraÃ®chir le token
        const refreshed = await refreshTokenFunc();

        if (refreshed) {
          // Le nouveau token est automatiquement stockÃ© en cookie
          processQueue(null);

          // RÃ©essayer la requÃªte originale (le cookie sera envoyÃ© automatiquement)
          return api(originalRequest);
        } else {
          // Impossible de rafraÃ®chir, notifier l'UI
          processQueue(error);
          notifyUnauthorized("expired");
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        notifyUnauthorized("expired");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Pour les autres erreurs 401 ou 403 : notifier, pas de redirection ici
    if (error.response?.status === 401) {
      notifyUnauthorized(error.response?.data?.expired ? "expired" : "unauthorized");
    }
    if (error.response?.status === 403) {
      notifyUnauthorized("forbidden");
    }

    return Promise.reject(error);
  }
);

export default api;


