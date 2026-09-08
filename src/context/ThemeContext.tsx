import React, { useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContextInstance";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: light)";

const resolveTheme = (isLight: boolean): Theme => (isLight ? "light" : "dark");

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return resolveTheme(window.matchMedia(COLOR_SCHEME_QUERY).matches);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(getSystemTheme);

  useEffect(() => {
    // Clear stale persisted theme so OS preference is always respected
    try {
      localStorage.removeItem("portfolio-theme");
      localStorage.removeItem("portfolio-visual-theme");
      delete document.documentElement.dataset.visualTheme;
    } catch {
      // Ignore errors in storage-restricted environments
    }

    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeState(resolveTheme(e.matches));
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
