import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ExperienceItem } from "../../../types";

export const ExperienceTimeline: React.FC = () => {
  const { lang, t } = useLanguage();
  const { experiences, personal } = portfolioData;

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
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
        variants={fadeIn}
        className="flex items-center justify-between pb-6 mb-12 border-b border-white/[0.06]"
      >
        <span className="editorial-eyebrow text-[#00f0ff]">
          04 // INDUSTRY & ACADEMIC TIMELINE
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          TRACK RECORD
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="space-y-4 mb-16 max-w-4xl"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {lang === "th"
            ? "ประสบการณ์ทำงาน & บทบาททางวิชาการ (Career Milestones)"
            : "Professional Experience & Academic Milestones"}
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
          {lang === "th"
            ? "จากการฝึกงานจริงในการสร้างฟีเจอร์ระดับ Commercial Production สู่บทบาทผู้ช่วยสอนประจำภาควิชา 3 เทอม และวิทยากรบรรยายพิเศษด้าน AI"
            : "From shipping production features during commercial software engineering internships to 3 consecutive semesters of university mentorship and guest AI keynote speaking."}
        </p>
      </motion.div>

      {/* Connected Precision Timeline with Scroll-Linked Dynamic Axis (ADR 0004) */}
      <div ref={timelineRef} className="relative pl-6 sm:pl-10">
        {/* Static Background Guide Track */}
        <div className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-px bg-white/[0.08]" />

        {/* Dynamic Scroll-Linked Cyan Glow Axis */}
        <motion.div
          style={{ scaleY: smoothScaleY }}
          className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#00f0ff] via-[#38bdf8] to-[#0284c7] origin-top shadow-[0_0_12px_rgba(0,240,255,0.6)]"
        />

        <div className="space-y-12 sm:space-y-16">
          {experiences.map((exp: ExperienceItem, idx: number) => {
            const isAcademic =
              exp.badgeEn.toLowerCase().includes("teaching") ||
              exp.badgeEn.toLowerCase().includes("academic");
            const year = exp.periodEn.split(" ").slice(-1)[0] || "2026";

            return (
              <motion.article
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Precision Axis Node Indicator */}
                <div className="absolute -left-[19px] sm:-left-[23px] top-2 z-10 w-7 h-7 rounded-full border border-white/20 bg-[#07080c] flex items-center justify-center text-[#00f0ff] group-hover:border-[#00f0ff] group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                  {isAcademic ? (
                    <GraduationCap className="w-3.5 h-3.5 text-[#00f0ff]" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5 text-[#00f0ff]" />
                  )}
                </div>

                <div className="border-b border-white/[0.06] pb-12 sm:pb-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                    {/* Year & Period Column (3 Cols) */}
                    <div className="lg:col-span-3 space-y-1">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white group-hover:text-[#00f0ff] transition-colors block">
                        {year}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                        {lang === "th" ? exp.periodTh : exp.periodEn}
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/25 mt-2">
                        {lang === "th" ? exp.badgeTh : exp.badgeEn}
                      </span>
                      <p className="text-xs text-zinc-500 font-mono flex items-center gap-1 pt-1">
                        <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                        <span>
                          {lang === "th" ? exp.locationTh : exp.locationEn}
                        </span>
                      </p>
                    </div>

                    {/* Role, Company & Deliverables Column (9 Cols) */}
                    <div className="lg:col-span-9 space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {lang === "th" ? exp.roleTh : exp.roleEn}
                        </h3>
                        <p className="text-sm font-semibold text-[#00f0ff] font-mono mt-0.5">
                          {lang === "th" ? exp.companyTh : exp.companyEn}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                        {lang === "th" ? exp.descriptionTh : exp.descriptionEn}
                      </p>

                      {/* Bullet points */}
                      <div className="space-y-2 pt-1">
                        <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                          <span>
                            {t(
                              "ผลงานและสิ่งที่ส่งมอบ:",
                              "Key Contributions & Impact:",
                            )}
                          </span>
                        </p>
                        {(lang === "th" ? exp.bulletsTh : exp.bulletsEn).map(
                          (bullet, bIdx) => (
                            <div
                              key={bIdx}
                              className="flex items-start gap-3 text-xs sm:text-sm text-zinc-400"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-2 shrink-0" />
                              <span className="leading-relaxed">{bullet}</span>
                            </div>
                          ),
                        )}
                      </div>

                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.06]"
                          >
                            {s}
                          </span>
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

      {/* Academic Reference Strip */}
      {personal.reference && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block">
              ACADEMIC REFERENCE // MAEJO UNIVERSITY
            </span>
            <h4 className="text-lg font-bold text-white">
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

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {personal.reference.phone && (
              <a
                href={`tel:${personal.reference.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-zinc-300 hover:text-[#00f0ff] border border-white/[0.08] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{personal.reference.phone}</span>
              </a>
            )}
            {personal.reference.email && (
              <a
                href={`mailto:${personal.reference.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-zinc-300 hover:text-[#00f0ff] border border-white/[0.08] transition-colors"
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
