import React, { useRef } from "react";
import { BilingualStack } from "../../BilingualStack";
import { ChapterBridge } from "../../ChapterBridge";
import { m, useScroll, useSpring, useReducedMotion } from "motion/react";
import { FADE_UP, IN_VIEW } from "../../../lib/motion";
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
import { portfolioData, bridgeFor } from "../../../data";
import { ExperienceItem } from "../../../types";
import { ChapterEyebrow } from "../../ChapterEyebrow";
import { telHref } from "../../../lib/utils";

export const ExperienceTimeline: React.FC = () => {
  const { lang, t } = useLanguage();
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

  const getCategoryIcon = (type: string, isActive: boolean) => {
    const iconClass = `w-3.5 h-3.5 ${
      isActive ? "text-primary" : "text-zinc-400 group-hover:text-signal"
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
      className="relative py-12 sm:py-24 border-b border-line"
    >
      {/* Anchor Alias for backwards compatibility */}
      <div id="experience" className="absolute -top-24 pointer-events-none" />

      {/* Section Eyebrow */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW}
        variants={FADE_UP}
        className="flex items-center justify-between pb-6 mb-8 sm:mb-12 border-b border-line"
      >
        <ChapterEyebrow id="timeline" />
        <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
          {t("ฝึกงานและการสอน", "Internship & teaching")}
        </span>
      </m.div>

      {/* Headline & Subtitle */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW}
        variants={FADE_UP}
        className="space-y-4 mb-10 sm:mb-16 max-w-4xl"
      >
        <BilingualStack
          as="h2"
          className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight"
          th="ประสบการณ์"
          en="Experience"
        />
        <ChapterBridge
          bridge={bridgeFor("timeline")}
          className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed"
        />
      </m.div>

      {/* Connected Engineering Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Continuous Thin 1px Vertical Axis Track */}
        <div
          aria-hidden="true"
          className="absolute left-4 md:left-[24%] top-3 bottom-6 w-px bg-white/[0.06] pointer-events-none"
        />

        {/* Scroll-Linked Dynamic Subtle Axis */}
        <m.div
          aria-hidden="true"
          style={{ scaleY: shouldReduceMotion ? 1 : smoothScaleY }}
          className="absolute left-4 md:left-[24%] top-3 bottom-6 w-px bg-gradient-to-b from-signal/70 to-transparent origin-top pointer-events-none"
        />

        <div className="space-y-10 md:space-y-16">
          {experiences.map((exp: ExperienceItem, idx: number) => {
            const isActive = idx === 0;

            const yearTh = exp.yearTh || exp.year;
            const yearEn = exp.yearEn || exp.year;

            return (
              <m.article
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={IN_VIEW}
                variants={FADE_UP}
                className="relative group pb-10 md:pb-16 border-b border-line last:border-b-0 last:pb-0"
              >
                <div className="flex flex-col md:flex-row items-start">
                  {/* Left Column: Chronology (~24% Desktop) */}
                  <div className="md:w-[24%] pl-12 md:pl-0 md:pr-8 shrink-0 mb-4 md:mb-0 space-y-1.5">
                    {/* Year or year range: one format for every role */}
                    <BilingualStack
                      as="span"
                      className="text-lg sm:text-xl font-semibold font-mono tracking-tight block text-zinc-200"
                      th={yearTh}
                      en={yearEn}
                    />

                    {/* Months or semesters on the meta line */}
                    <BilingualStack
                      as="span"
                      className="text-xs font-mono text-zinc-400 block"
                      th={exp.periodTh}
                      en={exp.periodEn}
                    />

                    {/* Quiet Status Badge */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono   whitespace-nowrap ${
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/25"
                            : "bg-white/[0.03] text-zinc-400 border border-line"
                        }`}
                      >
                        {lang === "th" ? exp.badgeTh : exp.badgeEn}
                      </span>
                    </div>

                    {/* Location */}
                    {/* Wraps instead of truncating; both languages share
                        one cell so a wrap never shifts the layout. */}
                    <div className="text-xs text-zinc-400 font-mono flex items-start gap-1.5 pt-0.5">
                      <MapPin className="w-3 h-3 mt-0.5 text-zinc-400 shrink-0" />
                      <div className="min-w-0">
                        <BilingualStack
                          as="span"
                          className="block break-words"
                          th={exp.locationTh}
                          en={exp.locationEn}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Axis Node Indicator Marker */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-4 md:left-[24%] -translate-x-1/2 top-1.5 md:top-1 z-10 w-7 h-7 rounded-full bg-void flex items-center justify-center transition-colors duration-(--dur-base) ${
                      isActive
                        ? "border border-primary/60 "
                        : "border border-white/10 group-hover:border-signal/40"
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
                    {/* 1. Role & 2. Company */}
                    <div className="space-y-0.5">
                      <BilingualStack
                        as="h3"
                        className="text-xl sm:text-2xl font-semibold text-white tracking-tight"
                        th={exp.roleTh}
                        en={exp.roleEn}
                      />
                      <BilingualStack
                        className={`text-sm font-mono font-medium ${
                          isActive
                            ? "text-primary"
                            : "text-zinc-400 group-hover:text-zinc-200"
                        } transition-colors`}
                        th={exp.companyTh}
                        en={exp.companyEn}
                      />
                    </div>

                    {/* 3. Key Contributions & Engineering Impact */}
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-zinc-400 font-semibold flex items-center gap-1.5">
                          <Sparkles
                            className={`w-3 h-3 ${
                              isActive
                                ? "text-primary"
                                : "text-zinc-500 group-hover:text-zinc-300"
                            } transition-colors`}
                          />
                          <span>
                            {lang === "th"
                              ? "ผลงานสำคัญและผลกระทบเชิงวิศวกรรม"
                              : "Key contributions & impact"}
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
                                  aria-hidden="true"
                                  className={`mt-2 sm:mt-2.5 h-px w-3 ${
                                    isActive
                                      ? "bg-primary"
                                      : "bg-zinc-500 group-hover:bg-zinc-300"
                                  } transition-colors`}
                                />
                                <div>
                                  <span className="text-xs sm:text-sm font-mono font-semibold text-white/95">
                                    {lang === "th"
                                      ? contrib.labelTh
                                      : contrib.labelEn}
                                  </span>
                                  <BilingualStack
                                    className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal mt-0.5"
                                    th={contrib.descTh}
                                    en={contrib.descEn}
                                  />
                                </div>
                              </div>
                            ))
                          : exp.bulletsEn.map((bulletEn, bIdx) => (
                              <div
                                key={bIdx}
                                className="grid grid-cols-[auto_1fr] gap-x-3 items-start"
                              >
                                <span
                                  aria-hidden="true"
                                  className={`mt-[0.6rem] sm:mt-[0.7rem] h-px w-3 ${
                                    isActive
                                      ? "bg-primary"
                                      : "bg-zinc-500 group-hover:bg-zinc-300"
                                  } transition-colors`}
                                />
                                <BilingualStack
                                  className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal"
                                  th={exp.bulletsTh[bIdx] ?? bulletEn}
                                  en={bulletEn}
                                />
                              </div>
                            ))}
                      </div>
                    </div>

                    {/* 4. Engineering Narrative Description */}
                    <BilingualStack
                      className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-2xl pt-1"
                      th={exp.descriptionTh}
                      en={exp.descriptionEn}
                    />

                    {/* 6. Minimal Technical Stack Inline Row */}
                    <div className="pt-2 border-t border-white/[0.04]">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-zinc-400">
                        <span className="text-xs font-semibold text-zinc-400 mr-0.5">
                          Stack
                        </span>
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="hover:text-signal transition-colors font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>

      {/* Restyled Academic Reference Strip */}
      {personal.reference && (
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW}
          variants={FADE_UP}
          className="mt-10 sm:mt-14 p-6 sm:p-7 rounded-xl bg-surface border border-line flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <BilingualStack
              as="span"
              className="text-xs font-mono text-primary block font-medium"
              th="การรับรองทางวิชาการ (ACADEMIC VERIFICATION)"
              en="Academic verification & reference"
            />
            <BilingualStack
              as="h4"
              className="text-base sm:text-lg font-semibold text-white tracking-tight"
              th={personal.reference.nameTh}
              en={personal.reference.nameEn}
            />
            <BilingualStack
              className="text-xs text-zinc-400"
              th={personal.reference.roleTh}
              en={personal.reference.roleEn}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            {personal.reference.phone && (
              <a
                href={telHref(personal.reference.phone)}
                className="flex items-center min-h-11 lg:min-h-0 px-3.5 py-1.5 chip btn-lift gap-2 text-zinc-300 hover:text-signal hover:border-signal transition"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>{personal.reference.phone}</span>
              </a>
            )}
            {personal.reference.email && (
              <a
                href={`mailto:${personal.reference.email}`}
                className="flex items-center min-h-11 lg:min-h-0 px-3.5 py-1.5 chip btn-lift gap-2 text-zinc-300 hover:text-signal hover:border-signal transition"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>{personal.reference.email}</span>
              </a>
            )}
          </div>
        </m.div>
      )}
    </section>
  );
};

export default ExperienceTimeline;
