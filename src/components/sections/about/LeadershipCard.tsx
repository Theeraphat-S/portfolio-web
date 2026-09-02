import React from "react";
import { Award } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { SpotlightCard } from "../../reactbits/SpotlightCard";

export const LeadershipCard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="md:col-span-1 lg:col-span-1">
      <SpotlightCard
        spotlightColor="rgba(168, 85, 247, 0.15)"
        className="h-full flex flex-col justify-between"
        data-cursor-text="TA & Speaker"
      >
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Award className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              {t("บทบาทวิชาการ & การถ่ายทอด", "Academic Leadership")}
            </span>
          </div>
          <h4 className="text-base font-bold text-white">
            {t(
              "ผู้ช่วยสอน (TA 3 รายวิชา) & วิทยากร AI",
              "3x TA & AI Workshop Keynote",
            )}
          </h4>
          <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
            {t(
              "ถ่ายทอดความรู้แก่นักศึกษา IT ในวิชา Web Programming, Database และ Logic รวมถึงได้รับเกียรติเป็นวิทยากรบรรยายเรื่อง AI แก่นักเรียน Gifted Computer โรงเรียนจักรคำคณาทร",
              "Mentored 100+ students in Frontend, SQL Databases & Logic. Invited keynote speaker on AI for Gifted Computer students at Jakkhumkhanathorn School.",
            )}
          </p>
        </div>

        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-indigo-300 font-mono">
          <span>TA: Web, DB, Logic</span>
          <span>Speaker: M.4 Gifted AI</span>
        </div>
      </SpotlightCard>
    </div>
  );
};
