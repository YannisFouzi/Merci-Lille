import React from "react";
import { AdminToastState } from "../../hooks/useAdminFeedback";

type AdminToastProps = {
  toast: AdminToastState;
  onClose: () => void;
};

const variantStyles: Record<AdminToastState["type"], string> = {
  success: "bg-green-600",
  error: "bg-red-600",
};

const AdminToast: React.FC<AdminToastProps> = ({ toast, onClose }) => {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded shadow-lg text-white"
      style={{ minWidth: "280px" }}
      role="alert"
      aria-live="assertive"
    >
      <div className={`${variantStyles[toast.type]} rounded px-3 py-2 flex-1`}>
        <p className="font-semibold">
          {toast.type === "error" ? "Erreur" : "Succès"}
        </p>
        <p className="text-sm mt-1">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200"
        aria-label="Fermer la notification"
      >
        ✕
      </button>
    </div>
  );
};

export default AdminToast;
