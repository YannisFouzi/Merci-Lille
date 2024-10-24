import api from "./api";

export const authService = {
  async login(username: string, password: string) {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};
