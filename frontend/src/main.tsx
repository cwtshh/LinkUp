import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { BrowserRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";
import InitStore from "./InitStore.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <HeroUIProvider>
          <ToastProvider />
          <InitStore>
            <App />
          </InitStore>
        </HeroUIProvider>
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>
);
