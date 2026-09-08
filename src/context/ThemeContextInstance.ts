import { createContext } from "react";

export type Theme = "dark" | "light";
export type VisualTheme = "original" | "space";

export interface ThemeContextType {
  theme: Theme;
  visualTheme: VisualTheme;
  setVisualTheme: (theme: VisualTheme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
