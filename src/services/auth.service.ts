import api from "./api";

export const authService = {
  async login(username: string, password: string) {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      // Démarrer la vérification périodique après connexion
      this.startPeriodicCheck();
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    // Arrêter la vérification périodique
    this.stopPeriodicCheck();
    // Rediriger vers la page de connexion
    window.location.href = "/admin/login";
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
    } catch (error) {
      // Si erreur 401 ou autre, le token n'est pas valide
      this.clearInvalidToken();
      return false;
    }
  },

  // Méthode pour nettoyer les tokens invalides sans redirection
  clearInvalidToken() {
    localStorage.removeItem("token");
    this.stopPeriodicCheck();
  },

  // Méthode pour forcer la déconnexion en cas de token invalide
  forceLogout() {
    this.clearInvalidToken();
    window.location.href = "/admin/login";
  },

  // Vérification périodique du token (toutes les 5 minutes)
  _intervalId: null as number | null,

  startPeriodicCheck() {
    // Nettoyer l'ancien interval s'il existe
    this.stopPeriodicCheck();

    // Vérifier le token toutes les 5 minutes
    this._intervalId = setInterval(async () => {
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
    }
  },
};
