import React from "react";
import { Briefcase } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { SpotlightCard } from "../../reactbits/SpotlightCard";

export const WorkModeCard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="md:col-span-1 lg:col-span-1">
      <SpotlightCard
        spotlightColor="rgba(59, 130, 246, 0.15)"
        className="h-full flex flex-col justify-between"
        data-cursor-text="Available"
      >
        <div>
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Briefcase className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              {t("รูปแบบการทำงาน", "Work Mode")}
            </span>
          </div>
          <h4 className="text-sm font-bold text-white">
            {t("Onsite / Hybrid / Remote", "Onsite / Hybrid / Remote")}
          </h4>
          <p className="text-xs text-zinc-400 mt-1">
            {t(
              "พร้อมทำงานในกรุงเทพฯ เชียงใหม่ หรือทำงานแบบ Remote ทั่วประเทศ",
              "Open to relocation to Bangkok, Chiang Mai, or full Remote setup",
            )}
          </p>
        </div>

        <div className="pt-3 border-t border-zinc-800 flex items-center">
          <span className="text-[11px] font-mono text-blue-300">
            Agile & Scrum Ready
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
};
