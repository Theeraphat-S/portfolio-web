import React, { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Presentation,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ExperienceItem } from "../../../types";

export const ExperienceTimeline: React.FC = () => {
  const { lang } = useLanguage();
  const { experiences, personal } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });

  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  const sectionFadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "internship":
        return (
          <Briefcase className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#00f0ff] transition-colors" />
        );
      case "ta":
      case "academic":
        return (
          <GraduationCap className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#00f0ff] transition-colors" />
        );
      case "speaker":
        return (
          <Presentation className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#00f0ff] transition-colors" />
        );
      default:
        return (
          <Briefcase className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#00f0ff] transition-colors" />
        );
    }
  };

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      {/* Section Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionFadeIn}
        className="flex items-center justify-between pb-6 mb-12 border-b border-white/[0.06]"
      >
        <span className="editorial-eyebrow text-[#00f0ff]">
          04 // ENGINEERING CAREER TIMELINE
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          TRACK RECORD
        </span>
      </motion.div>

      {/* Headline & Subtitle */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionFadeIn}
        className="space-y-4 mb-16 max-w-4xl"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {lang === "th"
            ? "เส้นทางวิศวกรรม & ประสบการณ์ทำงาน (Career Milestones)"
            : "Engineering Career Timeline & Milestones"}
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
          {lang === "th"
            ? "จากการฝึกงานจริงในการสร้างฟีเจอร์ระดับ Commercial Production สู่บทบาทผู้ช่วยสอนประจำภาควิชา 3 เทอม และวิทยากรบรรยายพิเศษด้าน AI"
            : "From shipping production features during commercial software engineering internships to 3 consecutive semesters of university mentorship and guest AI keynote speaking."}
        </p>
      </motion.div>

      {/* Connected Engineering Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Continuous 1px Vertical Axis Track */}
        <div
          aria-hidden="true"
          className="absolute left-4 md:left-[28%] top-3 bottom-6 w-px bg-white/[0.08] pointer-events-none"
        />

        {/* Scroll-Linked Dynamic Cyan Glow Axis */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: shouldReduceMotion ? 1 : smoothScaleY }}
          className="absolute left-4 md:left-[28%] top-3 bottom-6 w-[1.5px] -ml-[0.25px] bg-gradient-to-b from-[#00f0ff] via-[#38bdf8] to-[#0284c7] origin-top shadow-[0_0_10px_rgba(0,240,255,0.45)] pointer-events-none"
        />

        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp: ExperienceItem, idx: number) => {
            const isAcademic = exp.type === "ta" || exp.type === "academic";

            return (
              <motion.article
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={itemVariants}
                className="relative group pb-12 md:pb-16 border-b border-white/[0.06] last:border-b-0 last:pb-0"
              >
                {/* Subtle Radial Blue Ambient Highlight on Hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -mx-3 sm:-mx-6 px-3 sm:px-6 rounded-2xl bg-gradient-to-r from-[#00f0ff]/[0.025] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                />

                <div className="flex flex-col md:flex-row items-start">
                  {/* Left Column: Chronology & Context (~28% Desktop) */}
                  <div className="md:w-[28%] pl-12 md:pl-0 md:pr-10 shrink-0 mb-4 md:mb-0 space-y-2">
                    {/* Balanced Year Typography */}
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-white/95 group-hover:text-[#00f0ff] transition-colors block tracking-tight">
                      {exp.year}
                    </span>

                    {/* Exact Time Period */}
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                      {lang === "th" ? exp.periodTh : exp.periodEn}
                    </span>

                    {/* Unbreakable Badges (Fixes Semester Wrap Bug) */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 whitespace-nowrap">
                        {lang === "th" ? exp.badgeTh : exp.badgeEn}
                      </span>
                      {exp.subBadgeEn && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-white/[0.04] text-zinc-400 border border-white/[0.08] whitespace-nowrap">
                          {lang === "th" ? exp.subBadgeTh : exp.subBadgeEn}
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <p className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>
                        {lang === "th" ? exp.locationTh : exp.locationEn}
                      </span>
                    </p>
                  </div>

                  {/* Axis Node Indicator Marker */}
                  <div
                    aria-hidden="true"
                    className="absolute left-4 md:left-[28%] -translate-x-1/2 top-1.5 md:top-2 z-10 w-8 h-8 rounded-full border border-white/20 bg-[#07080c] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-[#00f0ff] group-hover:shadow-[0_0_14px_rgba(0,240,255,0.4)]"
                  >
                    {getCategoryIcon(exp.type)}
                  </div>

                  {/* Right Column: Experience Core Content (~72% Desktop) */}
                  <div className="md:w-[72%] pl-12 md:pl-10 flex-1 space-y-5">
                    {/* Academic Distinguisher Eyebrow */}
                    {isAcademic && (
                      <div className="text-[11px] font-mono tracking-wider text-sky-400 uppercase font-semibold flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>
                          {lang === "th"
                            ? "บทบาททางวิชาการและผู้ช่วยสอน"
                            : "ACADEMIC LEADERSHIP // UNIVERSITY MENTORSHIP"}
                        </span>
                      </div>
                    )}

                    {/* Role & Company Header */}
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:translate-x-1 transition-transform duration-200">
                        {lang === "th" ? exp.roleTh : exp.roleEn}
                      </h3>
                      <p className="text-sm sm:text-[15px] font-mono font-medium text-[#00f0ff] group-hover:text-[#38bdf8] transition-colors">
                        {lang === "th" ? exp.companyTh : exp.companyEn}
                      </p>
                    </div>

                    {/* Engineering Narrative Description */}
                    <p className="text-sm sm:text-[15px] text-zinc-300 font-light leading-relaxed max-w-2xl">
                      {lang === "th" ? exp.descriptionTh : exp.descriptionEn}
                    </p>

                    {/* Key Contributions & Technical Impact */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                          <span>
                            {lang === "th"
                              ? "ผลงานสำคัญและผลกระทบเชิงวิศวกรรม"
                              : "KEY CONTRIBUTIONS & IMPACT"}
                          </span>
                        </span>
                        <div className="h-px flex-1 bg-white/[0.06] max-w-[140px]" />
                      </div>

                      <div className="space-y-3 max-w-2xl">
                        {exp.contributions
                          ? exp.contributions.map((contrib, cIdx) => (
                              <div
                                key={cIdx}
                                className="grid grid-cols-[auto_1fr] gap-x-3.5 items-start group/item"
                              >
                                <span className="text-xs font-mono font-bold text-[#00f0ff] tracking-tighter pt-0.5 select-none">
                                  {String(cIdx + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <span className="text-xs sm:text-sm font-mono font-semibold text-white/90">
                                    {lang === "th"
                                      ? contrib.labelTh
                                      : contrib.labelEn}
                                  </span>
                                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light mt-0.5">
                                    {lang === "th"
                                      ? contrib.descTh
                                      : contrib.descEn}
                                  </p>
                                </div>
                              </div>
                            ))
                          : (lang === "th" ? exp.bulletsTh : exp.bulletsEn).map(
                              (bullet, bIdx) => (
                                <div
                                  key={bIdx}
                                  className="grid grid-cols-[auto_1fr] gap-x-3.5 items-start"
                                >
                                  <span className="text-xs font-mono font-bold text-[#00f0ff] tracking-tighter pt-0.5 select-none">
                                    {String(bIdx + 1).padStart(2, "0")}
                                  </span>
                                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                                    {bullet}
                                  </p>
                                </div>
                              ),
                            )}
                      </div>
                    </div>

                    {/* Minimal Technical Stack Inline Row */}
                    <div className="pt-3 border-t border-white/[0.04]">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-mono tracking-wider text-zinc-400">
                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mr-0.5">
                          TECH STACK //
                        </span>
                        {exp.skills.map((skill, sIdx) => (
                          <React.Fragment key={skill}>
                            {sIdx > 0 && (
                              <span className="text-zinc-600 select-none">
                                ·
                              </span>
                            )}
                            <span className="hover:text-[#00f0ff] transition-colors uppercase font-medium">
                              {skill}
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Restyled Academic Reference Strip */}
      {personal.reference && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFadeIn}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-[#00f0ff] uppercase tracking-widest block font-medium">
              {lang === "th"
                ? "04.1 // การรับรองทางวิชาการ (ACADEMIC VERIFICATION)"
                : "04.1 // ACADEMIC VERIFICATION & REFERENCE"}
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {lang === "th"
                ? personal.reference.nameTh
                : personal.reference.nameEn}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {lang === "th"
                ? personal.reference.roleTh
                : personal.reference.roleEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            {personal.reference.phone && (
              <a
                href={`tel:${personal.reference.phone}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] text-zinc-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{personal.reference.phone}</span>
              </a>
            )}
            {personal.reference.email && (
              <a
                href={`mailto:${personal.reference.email}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] text-zinc-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{personal.reference.email}</span>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ExperienceTimeline;
