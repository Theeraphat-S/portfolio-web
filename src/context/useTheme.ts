import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "./ThemeContextInstance";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: "dark", toggleTheme: () => {} };
  }
  return context;
};
