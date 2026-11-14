import React from "react";
import { BilingualStack } from "../../BilingualStack";
import { ChapterBridge } from "../../ChapterBridge";
import { m } from "motion/react";
import { FADE_UP, IN_VIEW } from "../../../lib/motion";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData, bridgeFor } from "../../../data";
import { SkillCategory } from "../../../types";
import { ChapterEyebrow } from "../../ChapterEyebrow";

const LEAD_META = {
  labelEn: "Mobile",
  labelTh: "โมบาย",
  taglineEn:
    "Cross-platform apps with Flutter, state management, and reactive UI.",
  taglineTh: "แอปข้ามแพลตฟอร์มด้วย Flutter การจัดการ State และ UI แบบ Reactive",
};

export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [lead, ...rest] = portfolioData.skillCategories;

  return (
    <section
      id="capabilities"
      className="relative py-12 sm:py-24 border-b border-line"
    >
      {/* Anchor Alias for backwards compatibility */}
      <div id="skills" className="absolute -top-24 pointer-events-none" />

      {/* Section Eyebrow */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW}
        variants={FADE_UP}
        className="flex items-center justify-between pb-6 mb-8 sm:mb-12 border-b border-line"
      >
        <ChapterEyebrow id="capabilities" />
        <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
          {t("ทักษะแยกตามหมวด", "Skills by domain")}
        </span>
      </m.div>

      {/* Headline */}
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
          th={"ทักษะและเครื่องมือ"}
          en={"Skills & Tools"}
        />
        <ChapterBridge
          bridge={bridgeFor("capabilities")}
          className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed"
        />
      </m.div>

      {/* Mobile leads: it is the work this portfolio is for. The other
          domains are plain lists, since a wall of equal boxes has no entry. */}
      {lead && (
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW}
          variants={FADE_UP}
          className="rounded-xl bg-surface border border-line p-5 sm:p-6 lg:p-8 space-y-6"
        >
          <div className="pb-4 border-b border-line space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-primary font-semibold">
                {t(LEAD_META.labelTh, LEAD_META.labelEn)}
              </span>
              <span className="text-zinc-400">
                {t(
                  `${lead.skills.length} ทักษะ`,
                  `${lead.skills.length} skills`,
                )}
              </span>
            </div>
            <BilingualStack
              as="h3"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
              th={lead.nameTh}
              en={lead.nameEn}
            />
            <BilingualStack
              className="text-sm text-zinc-400 leading-normal"
              th={LEAD_META.taglineTh}
              en={LEAD_META.taglineEn}
            />
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {lead.skills.map((skill) => (
              <li
                key={skill.name}
                data-cursor-text="SKILL"
                className="rounded-lg bg-void border border-line px-4 py-3.5 space-y-1 min-w-0"
              >
                <span className="font-mono text-sm font-semibold text-zinc-100 block">
                  {skill.name}
                </span>
                <BilingualStack
                  as="span"
                  className="text-xs text-zinc-400 font-normal block leading-normal"
                  th={skill.descTh}
                  en={skill.descEn}
                />
              </li>
            ))}
          </ul>
        </m.div>
      )}

      <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10">
        {rest.map((category: SkillCategory) => (
          <m.div
            key={category.nameEn}
            initial="hidden"
            whileInView="visible"
            viewport={IN_VIEW}
            variants={FADE_UP}
            className="min-w-0"
          >
            <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-line">
              <BilingualStack
                as="h3"
                className="text-lg font-semibold text-white tracking-tight"
                th={category.nameTh}
                en={category.nameEn}
              />
              <span className="shrink-0 text-xs font-mono text-zinc-400">
                {category.skills.length}
              </span>
            </div>
            <ul className="divide-y divide-line">
              {category.skills.map((skill) => (
                <li
                  key={skill.name}
                  data-cursor-text="SKILL"
                  className="py-3 space-y-0.5"
                >
                  <span className="font-mono text-xs font-semibold text-zinc-100 block">
                    {skill.name}
                  </span>
                  <BilingualStack
                    as="span"
                    className="text-xs text-zinc-400 font-normal block leading-normal"
                    th={skill.descTh}
                    en={skill.descEn}
                  />
                </li>
              ))}
            </ul>
          </m.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
