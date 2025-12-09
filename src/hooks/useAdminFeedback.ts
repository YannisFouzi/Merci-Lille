import { useCallback, useEffect, useState } from "react";

type ToastType = "success" | "error";

export interface AdminToastState {
  type: ToastType;
  message: string;
}

export const useAdminFeedback = (autoClearMs = 4000) => {
  const [toast, setToast] = useState<AdminToastState | null>(null);

  const clearToast = useCallback(() => setToast(null), []);

  const showToast = useCallback(
    (type: ToastType, message: string) => {
      setToast({ type, message });
    },
    []
  );

  const showError = useCallback(
    (message: string) => showToast("error", message),
    [showToast]
  );

  const showSuccess = useCallback(
    (message: string) => showToast("success", message),
    [showToast]
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), autoClearMs);
    return () => clearTimeout(timer);
  }, [toast, autoClearMs]);

  return {
    toast,
    showError,
    showSuccess,
    clearToast,
  };
};

export type UseAdminFeedbackReturn = ReturnType<typeof useAdminFeedback>;
