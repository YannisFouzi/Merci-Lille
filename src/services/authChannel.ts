// Canal léger pour notifier l'UI des 401/403 sans redirection forcée
// Le provider d'auth s'abonne et décide quoi faire (mettre l'utilisateur en déconnecté, afficher un message, etc.)

type UnauthorizedHandler = (reason?: "unauthorized" | "forbidden" | "expired") => void;

let handler: UnauthorizedHandler | null = null;

export const registerUnauthorizedHandler = (cb: UnauthorizedHandler) => {
  handler = cb;
};

export const notifyUnauthorized = (reason: "unauthorized" | "forbidden" | "expired" = "unauthorized") => {
  if (handler) {
    handler(reason);
  }
};

// Pour tester ou nettoyer (ex: lors du teardown)
export const clearUnauthorizedHandler = () => {
  handler = null;
};
