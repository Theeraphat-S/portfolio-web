import React, { useRef } from "react";
import { motion, useScroll } from "motion/react";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ExperienceItem } from "../../../types";

export const ExperienceTimeline: React.FC = () => {
  const { lang, t } = useLanguage();
  const { experiences } = portfolioData;
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });

  return (
    <section
      id="experience"
      className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/[0.07]"
    >
      {/* Section Eyebrow & Rule */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="eyebrow-pill text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-500/25">
          <Sparkles className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
          <span>{t("เส้นทางและประสบการณ์", "INDUSTRY & ACADEMIC MILESTONES")}</span>
        </span>
        <div className="h-px bg-slate-200 dark:bg-white/[0.08] flex-1" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="space-y-4 mb-14"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {lang === "th"
            ? "ประสบการณ์ทำงานและบทบาททางวิชาการ (Career & Milestones)"
            : "Industry Experience & Academic Milestones"}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {lang === "th"
            ? "จากการฝึกงานสร้างฟีเจอร์ Production ในบริษัทซอฟต์แวร์จริง สู่บทบาทผู้ช่วยสอน 3 ภาคการศึกษา และวิทยากรบรรยายพิเศษด้าน AI"
            : "From engineering production features during commercial software internships to 3 terms of university mentorship and guest AI keynote speaking."}
        </p>
      </motion.div>

      {/* Connected Precision Timeline Axis with Scroll-Driven Expansion (ADR 0004) */}
      <div ref={timelineRef} className="relative pl-6 sm:pl-8">
        {/* Static Background Guide Track */}
        <div className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-px bg-slate-200 dark:bg-white/[0.08]" />

        {/* Dynamic Scroll-Linked Cyan Glow Axis */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 via-sky-400 to-blue-500 origin-top shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        />

        <div className="space-y-10 sm:space-y-12">
          {experiences.map((exp: ExperienceItem, idx: number) => {
            const isAcademic =
              exp.badgeEn.toLowerCase().includes("teaching") ||
              exp.badgeEn.toLowerCase().includes("academic");

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Precision Axis Node Indicator */}
                <div className="absolute -left-[19px] sm:-left-[23px] top-6 z-10 w-7 h-7 rounded-full ring-1 ring-slate-300 dark:ring-white/10 bg-white dark:bg-[#07090e] flex items-center justify-center text-cyan-400 group-hover:ring-cyan-400 group-hover:scale-110 transition-all duration-300 shadow-xs">
                  {isAcademic ? (
                    <GraduationCap className="w-3.5 h-3.5" strokeWidth={1.5} />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                </div>

                {/* Doppelrand Double-Bezel Card Container */}
                <div className="p-1.5 rounded-[2.25rem] bg-slate-200/50 dark:bg-white/[0.03] ring-1 ring-slate-300/60 dark:ring-white/[0.08] shadow-xl hover:ring-cyan-400/40 transition-all duration-500">
                  <div className="rounded-[calc(2.25rem-0.375rem)] p-6 sm:p-8 bg-white/95 dark:bg-[#090d16]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Left Column: Period, Role Badge, Location */}
                      <div className="lg:col-span-4 space-y-3">
                        <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold block">
                          {lang === "th" ? exp.periodTh : exp.periodEn}
                        </span>

                        <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] px-3 py-1 rounded-full ring-1 ring-slate-200 dark:ring-white/[0.08] font-semibold">
                          {lang === "th" ? exp.badgeTh : exp.badgeEn}
                        </span>

                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5 pt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" strokeWidth={1.5} />
                          <span>
                            {lang === "th" ? exp.locationTh : exp.locationEn}
                          </span>
                        </p>
                      </div>

                      {/* Right Column: Title, Company, Description & Impact */}
                      <div className="lg:col-span-8 space-y-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                            {lang === "th" ? exp.roleTh : exp.roleEn}
                          </h3>
                          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-1 font-mono">
                            {lang === "th" ? exp.companyTh : exp.companyEn}
                          </p>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {lang === "th" ? exp.descriptionTh : exp.descriptionEn}
                        </p>

                        {/* Impact Highlights */}
                        <div className="space-y-2 pt-1">
                          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
                            <span>
                              {t(
                                "ผลงานและสิ่งที่ส่งมอบ:",
                                "Key Contributions & Impact:",
                              )}
                            </span>
                          </p>
                          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            {(lang === "th" ? exp.bulletsTh : exp.bulletsEn).map(
                              (bullet, bIdx) => (
                                <li
                                  key={bIdx}
                                  className="flex items-start gap-2.5"
                                >
                                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                                  <span className="leading-relaxed">
                                    {bullet}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        {/* Skill Pills */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-0.5 text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] ring-1 ring-slate-200 dark:ring-white/[0.08] rounded-full font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
