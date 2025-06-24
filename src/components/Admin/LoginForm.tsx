import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.login(username, password);
      navigate("/admin/events", { replace: true });
    } catch (err: any) {
      console.error("Erreur de connexion:", err);

      if (err.response?.status === 401) {
        setError("Identifiants invalides");
      } else if (err.response?.status >= 500) {
        setError("Erreur serveur, veuillez réessayer plus tard");
      } else {
        setError("Erreur de connexion, vérifiez votre connexion internet");
      }
    } finally {
      setIsLoading(false);
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
            <div className="text-red-500 text-center text-sm bg-red-100 border border-red-400 rounded px-4 py-3">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              disabled={isLoading}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
