import { useContext } from "react";
import { LanguageContext } from "./LanguageContextInstance";
import { LanguageContextType } from "./types";

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
