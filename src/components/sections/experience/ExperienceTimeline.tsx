import React from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ExperienceItem } from "../../../types";

export const ExperienceTimeline: React.FC = () => {
  const { lang, t } = useLanguage();
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="py-20 border-b border-zinc-900">
      {/* Section Subtitle & Heading */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
          04 // {t("เส้นทางและประสบการณ์", "EXPERIENCE & IMPACT")}
        </span>
        <div className="h-px bg-zinc-800 flex-1" />
      </div>

      <div className="space-y-4 mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          {lang === "th"
            ? "ประสบการณ์ทำงานและบทบาททางวิชาการ (Career & Milestones)"
            : "Industry Experience & Academic Milestones"}
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {lang === "th"
            ? "จากการฝึกงานสร้างฟีเจอร์ Production ในบริษัทจริง สู่บทบาทผู้ช่วยสอน 3 เทอม และวิทยากรบรรยายพิเศษ"
            : "From engineering production features during commercial software internships to 3 terms of undergraduate mentorship and guest AI keynote speaking."}
        </p>
      </div>

      {/* Chronological Ledger */}
      <div className="divide-y divide-zinc-800/80">
        {experiences.map((exp: ExperienceItem, idx: number) => (
          <div
            key={idx}
            className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
          >
            {/* Left: Period & Type */}
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold block">
                {lang === "th" ? exp.periodTh : exp.periodEn}
              </span>
              <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                {lang === "th" ? exp.badgeTh : exp.badgeEn}
              </span>
              <p className="text-xs text-zinc-500 font-mono flex items-center gap-1 pt-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{lang === "th" ? exp.locationTh : exp.locationEn}</span>
              </p>
            </div>

            {/* Right: Role, Company & Bullet Impact */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
                  {lang === "th" ? exp.roleTh : exp.roleEn}
                </h3>
                <p className="text-sm font-medium text-emerald-400/90 mt-0.5">
                  {lang === "th" ? exp.companyTh : exp.companyEn}
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {lang === "th" ? exp.descriptionTh : exp.descriptionEn}
              </p>

              {/* Bullet points */}
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {(lang === "th" ? exp.bulletsTh : exp.bulletsEn).map(
                  (bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-mono mt-1 text-xs">
                        &gt;
                      </span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ),
                )}
              </ul>

              {/* Skills used */}
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800/80 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
