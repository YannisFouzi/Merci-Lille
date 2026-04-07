import api from "./api";

export const authService = {
  async login(username: string, password: string) {
    const response = await api.post("/auth/login", { username, password });

    this.startPeriodicCheck();

    if (response.data.expiresIn) {
      this.scheduleTokenRefresh(response.data.expiresIn);
    }

    return response.data;
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.warn("Erreur lors de la revocation du token:", error);
    } finally {
      this.stopPeriodicCheck();
      this.stopTokenRefresh();
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await api.get("/auth/verify");
      return response.data.valid === true;
    } catch {
      return false;
    }
  },

  async refreshToken(): Promise<boolean> {
    try {
      const response = await api.post("/auth/refresh", {});

      if (response.data.message === "Token refreshed successfully") {
        if (response.data.expiresIn) {
          this.scheduleTokenRefresh(response.data.expiresIn);
        }

        return true;
      }

      return false;
    } catch (error) {
      console.warn("Impossible de rafraichir le token:", error);
      this.clearInvalidToken();
      return false;
    }
  },

  clearInvalidToken() {
    this.stopPeriodicCheck();
    this.stopTokenRefresh();
  },

  forceLogout() {
    this.clearInvalidToken();
    console.warn("Session expiree");
  },

  _refreshTimeoutId: null as number | null,

  scheduleTokenRefresh(expiresInSeconds: number) {
    this.stopTokenRefresh();

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

  _intervalId: null as number | null,

  startPeriodicCheck() {
    this.stopPeriodicCheck();

    this._intervalId = window.setInterval(async () => {
      const isValid = await this.isAuthenticated();

      if (!isValid) {
        console.warn("Token expire detecte lors de la verification periodique");
        this.forceLogout();
      }
    }, 5 * 60 * 1000);
  },

  stopPeriodicCheck() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  },

  initializePeriodicCheck() {
    this.startPeriodicCheck();
    // Without access to the httpOnly cookie payload, restart from a safe TTL.
    this.scheduleTokenRefresh(14 * 60);
  },
};
