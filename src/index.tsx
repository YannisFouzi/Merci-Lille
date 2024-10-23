import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./page/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="dark">
      <App />
    </div>
  </React.StrictMode>
);
