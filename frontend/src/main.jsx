import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import logoUrl from "./assets/images/logo.png";

// Ensure favicon uses bundled logo asset (works in dev and build)
(() => {
  try {
    const head = document.head || document.getElementsByTagName("head")[0];
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "icon");
      head.appendChild(link);
    }
    link.setAttribute("href", logoUrl);
    link.setAttribute("type", "image/png");
  } catch {}
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
