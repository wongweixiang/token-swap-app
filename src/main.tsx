import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SelectedTokensProvider } from "./SelectedTokensContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelectedTokensProvider>
      <App />
    </SelectedTokensProvider>
    ,
  </StrictMode>
);
