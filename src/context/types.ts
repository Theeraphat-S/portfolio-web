export type Language = "th" | "en";

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (thText: string, enText: string) => string;
}
