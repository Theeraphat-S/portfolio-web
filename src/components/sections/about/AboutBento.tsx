import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ProfileCard } from "./ProfileCard";
import { PhilosophyCard } from "./PhilosophyCard";
import { EducationCard } from "./EducationCard";
import { LeadershipCard } from "./LeadershipCard";
import { WorkModeCard } from "./WorkModeCard";

export const AboutBento: React.FC = () => {
  const { t } = useLanguage();
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60 inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {t("ประวัติและความเชี่ยวชาญ", "About & Profile")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {t(
              "พร้อมขับเคลื่อนโมบายแอปพลิเคชันสู่อนาคต",
              "Engineering High-Performance Mobile Apps",
            )}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            {t(
              "นักศึกษาจบใหม่ สาขา IT มหาวิทยาลัยแม่โจ้ ที่มีประสบการณ์สร้างแอปพลิเคชันใช้งานจริงทั้งในระดับโปรเจกต์จบและอุตสาหกรรม",
              "Graduating IT specialist from Maejo University with proven track record in production Flutter applications, state management, and real-world system integrations.",
            )}
          </p>
        </div>

        {/* Bento Grid Layout (Balanced 2 Rows x 3 Columns on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <ProfileCard personal={personal} />
          <PhilosophyCard />
          <EducationCard personal={personal} />
          <LeadershipCard />
          <WorkModeCard />
        </div>
      </div>
    </section>
  );
};

export default AboutBento;
