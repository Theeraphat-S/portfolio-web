import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProjectMetric } from "../types";
import type { Language } from "../context/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Localized metric value, falling back to the language-neutral `value`. */
export function getMetricValue(metric: ProjectMetric, lang: Language): string {
  return (lang === "th" ? metric.valueTh : metric.valueEn) ?? metric.value;
}

/** `tel:` href with digits only, so every phone link dials the same way. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}
