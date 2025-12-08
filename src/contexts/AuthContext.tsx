import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/auth.service";
import {
  clearUnauthorizedHandler,
  registerUnauthorizedHandler,
} from "../services/authChannel";

type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "expired";

interface AuthContextValue {
  status: AuthStatus;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  markUnauthenticated: (reason?: AuthStatus) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const isAuth = await authService.isAuthenticated();
        if (!mounted) return;
        setStatus(isAuth ? "authenticated" : "unauthenticated");
        if (isAuth) {
          authService.initializePeriodicCheck();
        }
      } catch {
        if (!mounted) return;
        setStatus("unauthenticated");
      }
    };

    checkSession();

    // S'abonner aux notifications 401/403
    registerUnauthorizedHandler((reason) => {
      setStatus(reason === "expired" ? "expired" : "unauthenticated");
      authService.clearInvalidToken();
    });

    return () => {
      mounted = false;
      clearUnauthorizedHandler();
    };
  }, []);

  const login = async (username: string, password: string) => {
    await authService.login(username, password);
    setStatus("authenticated");
  };

  const logout = async () => {
    await authService.logout();
    setStatus("unauthenticated");
  };

  const value = useMemo(
    () => ({
      status,
      login,
      logout,
      markUnauthenticated: (reason?: AuthStatus) =>
        setStatus(reason ?? "unauthenticated"),
    }),
    [status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
