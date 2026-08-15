import React, { createContext, useContext, useState } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (thText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'th' || saved === 'en') ? saved : 'th';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const toggleLang = () => {
    const nextLang = lang === 'th' ? 'en' : 'th';
    setLangState(nextLang);
    localStorage.setItem('portfolio_lang', nextLang);
  };

  const t = (thText: string, enText: string) => {
    return lang === 'th' ? thText : enText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
