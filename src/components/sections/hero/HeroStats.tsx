import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { StatItem } from "../../../types";

interface HeroStatsProps {
  stats: StatItem[];
}

export const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6 border-t border-zinc-850">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60"
        >
          <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400 block">
            {stat.value}
          </span>
          <span className="text-xs text-zinc-400 leading-tight block mt-0.5">
            {lang === "th" ? stat.labelTh : stat.labelEn}
          </span>
        </div>
      ))}
    </div>
  );
};
