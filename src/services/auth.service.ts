import api from "./api";

export const authService = {
  async login(username: string, password: string) {
    const response = await api.post("/auth/login", { username, password });
    
    // Les tokens sont maintenant stockés en cookies httpOnly par le backend
    // Plus besoin de localStorage !
    
    // Démarrer la vérification périodique après connexion
    this.startPeriodicCheck();

    // Programmer le refresh automatique du token
    if (response.data.expiresIn) {
      this.scheduleTokenRefresh(response.data.expiresIn);
    }
    
    return response.data;
  },

  async logout() {
    try {
      // Le backend lira le refreshToken depuis les cookies
      await api.post("/auth/logout");
    } catch (error) {
      console.warn("Erreur lors de la révocation du token:", error);
    } finally {
      // Arrêter les vérifications périodiques
      this.stopPeriodicCheck();
      this.stopTokenRefresh();
    }
  },

  // Vérification serveur (sécurisée) - valide le token côté serveur
  // Les cookies sont automatiquement envoyés avec la requête
  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await api.get("/auth/verify");
      return response.data.valid === true;
    } catch (error: unknown) {
      // Si le token a expiré, l'intercepteur axios essaiera automatiquement
      // de le rafraîchir. Si ça échoue, on retourne false.
      return false;
    }
  },

  // Rafraîchir le token d'accès
  // Le refreshToken est automatiquement lu depuis les cookies par le backend
  async refreshToken(): Promise<boolean> {
    try {
      const response = await api.post("/auth/refresh", {});

      if (response.data.message === "Token refreshed successfully") {
        // Le nouveau token est automatiquement stocké en cookie
        // Programmer le prochain refresh
        if (response.data.expiresIn) {
          this.scheduleTokenRefresh(response.data.expiresIn);
        }
        return true;
      }

      return false;
    } catch (error) {
      console.warn("Impossible de rafraîchir le token:", error);
      this.clearInvalidToken();
      return false;
    }
  },

  // Méthode pour nettoyer l'état local sans redirection
  clearInvalidToken() {
    // Les cookies sont gérés par le backend, on arrête juste les timers
    this.stopPeriodicCheck();
    this.stopTokenRefresh();
  },

  // Forcer la déconnexion (avec redirection)
  forceLogout() {
    this.clearInvalidToken();
    console.warn("Session expirée");
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
      const isValid = await this.isAuthenticated();
      if (!isValid) {
        console.warn(
          "Token expiré détecté lors de la vérification périodique"
        );
        this.forceLogout();
      }
    }, 5 * 60 * 1000); // 5 minutes
  },

  stopPeriodicCheck() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  },

  // Initialiser la vérification périodique au démarrage de l'app
  async initializePeriodicCheck() {
    // Vérifier si on a une session valide (via cookie)
    const isAuth = await this.isAuthenticated();
    if (isAuth) {
      this.startPeriodicCheck();
      // Programmer le refresh automatique (14 min par défaut)
      this.scheduleTokenRefresh(14 * 60);
    }
  },
};

