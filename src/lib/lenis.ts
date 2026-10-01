import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__lenis;
}

export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.1 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
