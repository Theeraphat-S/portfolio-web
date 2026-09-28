import React, { useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContextInstance";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: light)";

const resolveTheme = (isLight: boolean): Theme => (isLight ? "light" : "dark");

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Ignore storage issues
  }
  if (window.matchMedia) {
    return resolveTheme(window.matchMedia(COLOR_SCHEME_QUERY).matches);
  }
  return "dark";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Sync with OS preference if user hasn't explicitly chosen or on system changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem("portfolio-theme");
        if (!saved) {
          setThemeState(resolveTheme(e.matches));
        }
      } catch {
        setThemeState(resolveTheme(e.matches));
      }
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
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
