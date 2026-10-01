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

export function scrollToElement(
  target: string | HTMLElement,
  offset: number = 80,
): void {
  if (typeof window === "undefined") return;
  const el =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  const targetPosition =
    el.getBoundingClientRect().top + window.scrollY - offset;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(targetPosition, { duration: 1.0 });
  } else {
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  }
}
