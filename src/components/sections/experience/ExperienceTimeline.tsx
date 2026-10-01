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
  Calendar,
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const getCategoryIcon = (type: string, isActive: boolean) => {
    const iconClass = `w-3.5 h-3.5 ${
      isActive ? "text-[#00f0ff]" : "text-zinc-400 group-hover:text-[#00f0ff]"
    } transition-colors`;

    switch (type) {
      case "internship":
        return <Briefcase className={iconClass} />;
      case "ta":
      case "academic":
        return <GraduationCap className={iconClass} />;
      case "speaker":
        return <Presentation className={iconClass} />;
      default:
        return <Briefcase className={iconClass} />;
    }
  };

  return (
    <section
      id="timeline"
      className="relative py-20 sm:py-28 border-b border-white/[0.08]"
    >
      {/* Anchor Alias for backwards compatibility */}
      <div id="experience" className="absolute -top-24 pointer-events-none" />

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
        {/* Continuous Thin 1px Vertical Axis Track */}
        <div
          aria-hidden="true"
          className="absolute left-4 md:left-[24%] top-3 bottom-6 w-px bg-white/[0.06] pointer-events-none"
        />

        {/* Scroll-Linked Dynamic Subtle Axis */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: shouldReduceMotion ? 1 : smoothScaleY }}
          className="absolute left-4 md:left-[24%] top-3 bottom-6 w-px bg-gradient-to-b from-[#00f0ff]/70 via-[#00f0ff]/30 to-transparent origin-top pointer-events-none"
        />

        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp: ExperienceItem, idx: number) => {
            const isActive = idx === 0;
            const isAcademic = exp.type === "ta" || exp.type === "academic";

            const displayYear =
              lang === "th" ? exp.yearTh || exp.year : exp.yearEn || exp.year;

            // Format year label with semester note to eliminate line-wrap bugs
            const formattedYearHeader =
              exp.subBadgeEn && exp.year.includes("2024")
                ? lang === "th"
                  ? `${displayYear} / 3 เทอมการศึกษา`
                  : `${displayYear} / 3 SEMESTERS`
                : displayYear;

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
                  className="absolute inset-0 -mx-3 sm:-mx-6 px-3 sm:px-6 rounded-2xl bg-gradient-to-r from-[#00f0ff]/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                />

                <div className="flex flex-col md:flex-row items-start">
                  {/* Left Column: Chronology (~24% Desktop) */}
                  <div className="md:w-[24%] pl-12 md:pl-0 md:pr-8 shrink-0 mb-4 md:mb-0 space-y-1.5">
                    {/* Downsized, balanced year typography */}
                    <span
                      className={`text-lg sm:text-xl font-bold font-mono tracking-tight block ${
                        isActive
                          ? "text-[#00f0ff]"
                          : "text-zinc-200 group-hover:text-white"
                      } transition-colors`}
                    >
                      {formattedYearHeader}
                    </span>

                    {/* Exact Time Period */}
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                      {lang === "th" ? exp.periodTh : exp.periodEn}
                    </span>

                    {/* Quiet Status Badge */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase whitespace-nowrap ${
                          isActive
                            ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/25"
                            : "bg-white/[0.03] text-zinc-400 border border-white/[0.06]"
                        }`}
                      >
                        {lang === "th" ? exp.badgeTh : exp.badgeEn}
                      </span>
                    </div>

                    {/* Location */}
                    <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 pt-0.5">
                      <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span className="truncate">
                        {lang === "th" ? exp.locationTh : exp.locationEn}
                      </span>
                    </p>
                  </div>

                  {/* Axis Node Indicator Marker */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-4 md:left-[24%] -translate-x-1/2 top-1.5 md:top-1 z-10 w-7 h-7 rounded-full bg-[#07080c] flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "border border-[#00f0ff]/60 shadow-[0_0_10px_rgba(0,240,255,0.25)]"
                        : "border border-white/10 group-hover:border-[#00f0ff]/40 group-hover:scale-105"
                    }`}
                  >
                    {getCategoryIcon(exp.type, isActive)}
                  </div>

                  {/* Right Column: Experience Core Content (~76% Desktop)
                      Priority Order:
                      1. Role
                      2. Company
                      3. Engineering Impact
                      4. Description
                      5. Period / Context
                      6. Tech Stack
                  */}
                  <div className="md:w-[76%] pl-12 md:pl-10 flex-1 space-y-4">
                    {/* Academic Distinguisher Eyebrow */}
                    {isAcademic && (
                      <div className="text-[10px] font-mono tracking-wider text-sky-400 uppercase font-semibold flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>
                          {lang === "th"
                            ? "บทบาททางวิชาการและผู้ช่วยสอน"
                            : "ACADEMIC LEADERSHIP // UNIVERSITY MENTORSHIP"}
                        </span>
                      </div>
                    )}

                    {/* 1. Role & 2. Company */}
                    <div className="space-y-0.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {lang === "th" ? exp.roleTh : exp.roleEn}
                      </h3>
                      <p
                        className={`text-sm font-mono font-medium ${
                          isActive
                            ? "text-[#00f0ff]"
                            : "text-zinc-400 group-hover:text-zinc-200"
                        } transition-colors`}
                      >
                        {lang === "th" ? exp.companyTh : exp.companyEn}
                      </p>
                    </div>

                    {/* 3. Key Contributions & Engineering Impact */}
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold flex items-center gap-1.5">
                          <Sparkles
                            className={`w-3 h-3 ${
                              isActive
                                ? "text-[#00f0ff]"
                                : "text-zinc-500 group-hover:text-zinc-300"
                            } transition-colors`}
                          />
                          <span>
                            {lang === "th"
                              ? "ผลงานสำคัญและผลกระทบเชิงวิศวกรรม"
                              : "KEY CONTRIBUTIONS & IMPACT"}
                          </span>
                        </span>
                        <div className="h-px flex-1 bg-white/[0.06] max-w-[120px]" />
                      </div>

                      <div className="space-y-2.5 max-w-2xl">
                        {exp.contributions
                          ? exp.contributions.map((contrib, cIdx) => (
                              <div
                                key={cIdx}
                                className="grid grid-cols-[auto_1fr] gap-x-3 items-start group/item"
                              >
                                <span
                                  className={`text-xs font-mono font-bold ${
                                    isActive
                                      ? "text-[#00f0ff]"
                                      : "text-zinc-400 group-hover:text-zinc-200"
                                  } tracking-tighter pt-0.5 select-none transition-colors`}
                                >
                                  {String(cIdx + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <span className="text-xs sm:text-sm font-mono font-semibold text-white/95">
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
                                  className="grid grid-cols-[auto_1fr] gap-x-3 items-start"
                                >
                                  <span
                                    className={`text-xs font-mono font-bold ${
                                      isActive
                                        ? "text-[#00f0ff]"
                                        : "text-zinc-400 group-hover:text-zinc-200"
                                    } tracking-tighter pt-0.5 select-none transition-colors`}
                                  >
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

                    {/* 4. Engineering Narrative Description */}
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-2xl pt-1">
                      {lang === "th" ? exp.descriptionTh : exp.descriptionEn}
                    </p>

                    {/* 5. Period Context (Quiet Metadata Strip) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
                      <Calendar className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span>{lang === "th" ? exp.periodTh : exp.periodEn}</span>
                      <span>&bull;</span>
                      <span>
                        {lang === "th" ? exp.locationTh : exp.locationEn}
                      </span>
                    </div>

                    {/* 6. Minimal Technical Stack Inline Row */}
                    <div className="pt-2 border-t border-white/[0.04]">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono tracking-wider text-zinc-400">
                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mr-0.5">
                          SPECS:
                        </span>
                        {exp.skills.map((skill, sIdx) => (
                          <React.Fragment key={skill}>
                            {sIdx > 0 && (
                              <span className="text-zinc-600 select-none">
                                &bull;
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
          className="mt-14 p-6 sm:p-7 rounded-2xl bg-white/[0.015] border border-white/[0.08] hover:border-white/[0.15] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest block font-medium">
              {lang === "th"
                ? "04.1 // การรับรองทางวิชาการ (ACADEMIC VERIFICATION)"
                : "04.1 // ACADEMIC VERIFICATION & REFERENCE"}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {lang === "th"
                ? personal.reference.nameTh
                : personal.reference.nameEn}
            </h4>
            <p className="text-xs text-zinc-400 font-mono">
              {lang === "th"
                ? personal.reference.roleTh
                : personal.reference.roleEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            {personal.reference.phone && (
              <a
                href={`tel:${personal.reference.phone}`}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] text-zinc-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
              >
                <Phone className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{personal.reference.phone}</span>
              </a>
            )}
            {personal.reference.email && (
              <a
                href={`mailto:${personal.reference.email}`}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] text-zinc-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
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
