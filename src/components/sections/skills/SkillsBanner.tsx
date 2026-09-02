import React from "react";
import { Layers, Sparkles } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

export const SkillsBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            Flutter Clean Architecture & State Mastery
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            {t(
              "โครงสร้างแยก Presentation (Bloc), Domain (UseCases) และ Data (Repository/API) ชัดเจน ทดสอบง่าย ดูแลรักษาระยะยาวได้อย่างมั่นคง",
              "Strict separation of Presentation (Bloc), Domain (UseCases), and Data (Repository/REST APIs) for high maintainability and testability.",
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
        <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400">
          Bloc Pattern
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-cyan-400">
          RESTful APIs
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-blue-400">
          MySQL & SQLite
        </span>
      </div>
    </div>
  );
};
