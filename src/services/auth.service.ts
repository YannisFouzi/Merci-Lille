import api from "./api";

export const authService = {
  async login(username: string, password: string) {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      // Démarrer la vérification périodique après connexion
      this.startPeriodicCheck();

      // Programmer le refresh automatique du token
      this.scheduleTokenRefresh(response.data.expiresIn);
    }
    return response.data;
  },

  async logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        // Notifier le serveur pour invalider le refresh token
        await api.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.warn("Erreur lors de la révocation du token:", error);
    } finally {
      // Nettoyer le stockage local dans tous les cas
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      this.stopPeriodicCheck();
      this.stopTokenRefresh();

      // Rediriger vers la page de connexion
      window.location.href = "/admin/login";
    }
  },

  // Vérification locale (rapide) - vérifie juste la présence du token
  hasToken() {
    return !!localStorage.getItem("token");
  },

  // Vérification serveur (sécurisée) - valide le token côté serveur
  async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    try {
      const response = await api.get("/auth/verify");
      return response.data.valid === true;
    } catch (error: any) {
      // Si le token a expiré, essayer de le rafraîchir
      if (error.response?.data?.expired) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Réessayer la vérification avec le nouveau token
          try {
            const retryResponse = await api.get("/auth/verify");
            return retryResponse.data.valid === true;
          } catch (retryError) {
            this.clearInvalidToken();
            return false;
          }
        }
      }

      // Si erreur 401 ou autre, le token n'est pas valide
      this.clearInvalidToken();
      return false;
    }
  },

  // Rafraîchir le token d'accès
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return false;
      }

      const response = await api.post("/auth/refresh", { refreshToken });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        // Programmer le prochain refresh
        this.scheduleTokenRefresh(response.data.expiresIn);

        return true;
      }

      return false;
    } catch (error) {
      console.warn("Impossible de rafraîchir le token:", error);
      this.clearInvalidToken();
      return false;
    }
  },

  // Méthode pour nettoyer les tokens invalides sans redirection
  clearInvalidToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.stopPeriodicCheck();
    this.stopTokenRefresh();
  },

  // Forcer la déconnexion (avec redirection)
  forceLogout() {
    this.clearInvalidToken();
    console.warn("Session expirée, redirection vers la page de connexion");
    window.location.href = "/admin/login";
  },

  // Gestion du refresh automatique des tokens
  _refreshTimeoutId: null as number | null,

  scheduleTokenRefresh(expiresInSeconds: number) {
    // Nettoyer l'ancien timeout
    this.stopTokenRefresh();

    // Rafraîchir le token 1 minute avant son expiration
    const refreshInMs = (expiresInSeconds - 60) * 1000;

    if (refreshInMs > 0) {
      this._refreshTimeoutId = window.setTimeout(async () => {
        const refreshed = await this.refreshToken();
        if (!refreshed) {
          this.forceLogout();
        }
      }, refreshInMs);
    }
  },

  stopTokenRefresh() {
    if (this._refreshTimeoutId) {
      clearTimeout(this._refreshTimeoutId);
      this._refreshTimeoutId = null;
    }
  },

  // Vérification périodique du token (toutes les 5 minutes)
  _intervalId: null as number | null,

  startPeriodicCheck() {
    // Nettoyer l'ancien interval s'il existe
    this.stopPeriodicCheck();

    // Vérifier le token toutes les 5 minutes
    this._intervalId = window.setInterval(async () => {
      if (this.hasToken()) {
        const isValid = await this.isAuthenticated();
        if (!isValid) {
          console.warn(
            "Token expiré détecté lors de la vérification périodique"
          );
          this.forceLogout();
        }
      }
    }, 5 * 60 * 1000); // 5 minutes
  },

  stopPeriodicCheck() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  },

  // Initialiser la vérification périodique si un token existe déjà
  initializePeriodicCheck() {
    if (this.hasToken()) {
      this.startPeriodicCheck();

      // Si on a un refresh token, programmer le refresh automatique
      // (on ne connaît pas l'expiration exacte, donc on utilise 14 min par défaut)
      if (localStorage.getItem("refreshToken")) {
        this.scheduleTokenRefresh(14 * 60); // 14 minutes
      }
    }
  },
};
