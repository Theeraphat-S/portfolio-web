import { RefObject, useEffect, useRef } from "react";
import { getLenis } from "../lib/lenis";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Count of open dialogs, mirrored onto <html data-dialog-open> so fixed
// chrome (e.g. the chapter menu) can hide itself while any dialog is up.
let openDialogs = 0;

/**
 * Modal dialog behaviour shared by every overlay: scroll lock, Escape to
 * close, Tab focus trap, initial focus, and focus restore on close.
 */
export function useDialog(
  isOpen: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
): void {
  // Keep the latest onClose without re-running the effect on every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = getLenis();
    lenis?.stop();

    openDialogs += 1;
    document.documentElement.dataset.dialogOpen = "true";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !containerRef.current) return;

      const focusable =
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === containerRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!containerRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const rafId = requestAnimationFrame(() => {
      const target =
        containerRef.current?.querySelector<HTMLElement>(FOCUSABLE) ??
        containerRef.current;
      target?.focus();
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      lenis?.start();
      openDialogs -= 1;
      if (openDialogs === 0) delete document.documentElement.dataset.dialogOpen;
      previousFocus?.focus();
    };
  }, [isOpen, containerRef]);
}
