import axios, { type AxiosError, type AxiosInstance } from "axios";
import { notifyUnauthorized } from "./authChannel";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api";
const CSRF_COOKIE_NAME = "csrfToken";
const SAFE_METHODS = ["get", "head", "options"];

export type NormalizedApiError = {
  status: number;
  message: string;
  data?: unknown;
};

const api: AxiosInstance = axios.create({
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

// Variable pour eviter les appels multiples de refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

// Fonction pour rafraichir le token (sans dependance circulaire)
const refreshTokenFunc = async (): Promise<boolean> => {
  try {
    const csrfToken = await ensureCsrfToken();
    const headers: Record<string, string> = { "X-Requested-With": "XMLHttpRequest" };
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }

    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      {
        headers,
        withCredentials: true,
      }
    );

    return response.data.message === "Token refreshed successfully";
  } catch (error) {
    console.warn("Impossible de rafraichir le token");
    return false;
  }
};

// Intercepteur pour ajouter les headers de securite aux requetes
api.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();

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

// Intercepteur pour gerer les erreurs d'authentification avec refresh automatique
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    let message: string = error.message || "Request failed";
    const serverData = error.response?.data;
    if (
      serverData &&
      typeof serverData === "object" &&
      "message" in (serverData as Record<string, unknown>) &&
      typeof (serverData as Record<string, unknown>).message === "string"
    ) {
      message = (serverData as Record<string, unknown>).message as string;
    }

    const normalizedError: NormalizedApiError = {
      status: error.response?.status ?? 0,
      message,
      data: error.response?.data,
    };
    (error as AxiosError & { normalized?: NormalizedApiError }).normalized = normalizedError;

    if (error.response?.status === 401 && (error.response?.data as any)?.expired && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshed = await refreshTokenFunc();

        if (refreshed) {
          processQueue(null);
          return api(originalRequest);
        } else {
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

    if (error.response?.status === 401) {
      notifyUnauthorized((error.response?.data as any)?.expired ? "expired" : "unauthorized");
    }
    if (error.response?.status === 403) {
      notifyUnauthorized("forbidden");
    }

    return Promise.reject(error);
  }
);

export default api;
