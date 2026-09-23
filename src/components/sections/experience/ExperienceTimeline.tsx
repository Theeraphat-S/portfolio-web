import React from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ExperienceItem } from "../../../types";

export const ExperienceTimeline: React.FC = () => {
  const { lang, t } = useLanguage();
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="py-20 border-b border-zinc-200 dark:border-zinc-900">
      {/* Section Subtitle & Heading */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          04 // {t("เส้นทางและประสบการณ์", "EXPERIENCE & IMPACT")}
        </span>
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="space-y-4 mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {lang === "th"
            ? "ประสบการณ์ทำงานและบทบาททางวิชาการ (Career & Milestones)"
            : "Industry Experience & Academic Milestones"}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {lang === "th"
            ? "จากการฝึกงานสร้างฟีเจอร์ Production ในบริษัทจริง สู่บทบาทผู้ช่วยสอน 3 เทอม และวิทยากรบรรยายพิเศษ"
            : "From engineering production features during commercial software internships to 3 terms of undergraduate mentorship and guest AI keynote speaking."}
        </p>
      </motion.div>

      {/* Chronological Ledger */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
        {experiences.map((exp: ExperienceItem, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group"
          >
            {/* Left: Period & Type */}
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold block">
                {lang === "th" ? exp.periodTh : exp.periodEn}
              </span>
              <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
                {lang === "th" ? exp.badgeTh : exp.badgeEn}
              </span>
              <p className="text-xs text-zinc-500 font-mono flex items-center gap-1 pt-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                <span>{lang === "th" ? exp.locationTh : exp.locationEn}</span>
              </p>
            </div>

            {/* Right: Role, Company & Bullet Impact */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {lang === "th" ? exp.roleTh : exp.roleEn}
                </h3>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {lang === "th" ? exp.companyTh : exp.companyEn}
                </p>
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {lang === "th" ? exp.descriptionTh : exp.descriptionEn}
              </p>

              {/* Bullet points */}
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                {(lang === "th" ? exp.bulletsTh : exp.bulletsEn).map(
                  (bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-emerald-500 font-mono mt-0.5 text-xs">
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
                    className="px-2 py-0.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
