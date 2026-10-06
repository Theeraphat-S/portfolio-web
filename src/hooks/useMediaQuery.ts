import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query so layout branches render a single tree
 * instead of duplicating markup behind `hidden` / `lg:hidden` utilities.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
