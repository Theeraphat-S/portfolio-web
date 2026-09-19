import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface RotatingRoleBadgeProps {
  roles?: string[];
  intervalMs?: number;
  className?: string;
}

const ROLES_EN = [
  "Mobile Systems Architect",
  "Flutter Engineer",
  "Dart Specialist",
  "BLoC Architecture",
];

const ROLES_TH = [
  "สถาปัตยกรรมโมบายล์",
  "วิศวกร Flutter",
  "ผู้เชี่ยวชาญภาษา Dart",
  "BLoC & สถาปัตยกรรมสะอาด",
];

export const RotatingRoleBadge: React.FC<RotatingRoleBadgeProps> = ({
  roles,
  intervalMs = 3000,
  className = "",
}) => {
  const { lang } = useLanguage();
  const activeRoles = roles ?? (lang === "th" ? ROLES_TH : ROLES_EN);
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeRoles.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [activeRoles.length, intervalMs, prefersReducedMotion]);

  const currentRole = activeRoles[index % activeRoles.length];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 dark:bg-zinc-900/90 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 text-cyan-400">
        <Terminal className="w-3.5 h-3.5" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
      </div>

      <div className="h-5 overflow-hidden flex items-center min-w-[150px] sm:min-w-[175px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentRole}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 whitespace-nowrap block"
          >
            {currentRole}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
