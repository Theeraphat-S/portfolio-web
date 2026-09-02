import React, { useState } from "react";
import { LanguageContext } from "./LanguageContextInstance";
import { Language } from "./types";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio_lang");
    return saved === "th" || saved === "en" ? saved : "th";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("portfolio_lang", newLang);
  };

  const toggleLang = () => {
    const nextLang = lang === "th" ? "en" : "th";
    setLangState(nextLang);
    localStorage.setItem("portfolio_lang", nextLang);
  };

  const t = (thText: string, enText: string) => {
    return lang === "th" ? thText : enText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export { useLanguage } from "./useLanguage";
export * from "./types";
