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

/** Landing offset for chapter jumps, so the heading clears the viewport edge. */
export const CHAPTER_OFFSET = 76;

export function scrollToElement(
  target: string | HTMLElement,
  offset: number = 80,
  { immediate = false }: { immediate?: boolean } = {},
): void {
  if (typeof window === "undefined") return;
  const el =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  const targetPosition =
    el.getBoundingClientRect().top + window.scrollY - offset;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(
      targetPosition,
      immediate ? { immediate: true, force: true } : { duration: 1.0 },
    );
  } else {
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: immediate ? "instant" : "smooth",
    });
  }
}
