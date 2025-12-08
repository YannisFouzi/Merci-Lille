import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./page/App";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="dark">
      <AuthProvider>
        <App />
      </AuthProvider>
    </div>
  </React.StrictMode>
);
