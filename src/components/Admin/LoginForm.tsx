import React, { useState } from "react";
import { authService } from "../../services/auth.service";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await authService.login(username, password);
      window.location.href = "/admin/events";
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-white text-center">
          Administration
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
