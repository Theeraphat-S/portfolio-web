import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// A stale deploy can leave this tab pointing at chunks that no longer
// exist. Reload once per session to pick up the new build; after that a
// missing chunk is left to the error boundary, which hides it.
const RELOAD_FLAG = "chunk-reload";
window.addEventListener("vite:preloadError", () => {
  try {
    if (sessionStorage.getItem(RELOAD_FLAG)) return;
    sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    return;
  }
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
