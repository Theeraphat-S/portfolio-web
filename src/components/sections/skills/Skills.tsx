import React from "react";
import { BilingualStack } from "../../BilingualStack";
import { ChapterBridge } from "../../ChapterBridge";
import { m } from "motion/react";
import { FADE_UP, IN_VIEW } from "../../../lib/motion";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData, bridgeFor } from "../../../data";
import { SkillCategory } from "../../../types";
import { ChapterEyebrow } from "../../ChapterEyebrow";

const CATEGORY_META = [
  {
    labelEn: "Mobile",
    labelTh: "โมบาย",
    taglineEn:
      "Cross-platform apps with Flutter, state management, and reactive UI.",
    taglineTh:
      "แอปข้ามแพลตฟอร์มด้วย Flutter การจัดการ State และ UI แบบ Reactive",
  },
  {
    labelEn: "Languages & web",
    labelTh: "ภาษาและเว็บ",
    taglineEn: "Programming languages, web basics, and REST API backends.",
    taglineTh: "ภาษาโปรแกรม พื้นฐานเว็บ และ REST API ฝั่ง Backend",
  },
  {
    labelEn: "Data & tooling",
    labelTh: "ข้อมูลและเครื่องมือ",
    taglineEn:
      "Relational persistence, API testing tools, version control, and development workflows.",
    taglineTh:
      "ฐานข้อมูลเชิงสัมพันธ์ เครื่องมือทดสอบ API ระบบ Version Control และกระบวนการพัฒนา",
  },
  {
    labelEn: "Teamwork & teaching",
    labelTh: "การทำงานเป็นทีมและการสอน",
    taglineEn:
      "Teaching assistant work, helping students, and working in Agile sprints.",
    taglineTh:
      "การเป็นผู้ช่วยสอนประจำภาควิชา ให้คำปรึกษานักศึกษารุ่นน้อง และการทำงานแบบ Agile",
  },
];

export const Skills: React.FC = () => {
  const { lang, t } = useLanguage();
  const { skillCategories } = portfolioData;

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

      {/* One slab card per domain; its skills tile inside. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
        {skillCategories.map((category: SkillCategory, catIdx: number) => {
          const meta = CATEGORY_META[catIdx] || {
            labelEn: "Capability",
            labelTh: "ความสามารถ",
            taglineEn: "",
            taglineTh: "",
          };

          return (
            <m.div
              key={catIdx}
              initial="hidden"
              whileInView="visible"
              viewport={IN_VIEW}
              variants={FADE_UP}
              className="rounded-xl bg-surface border-[1.5px] border-edge shadow-hard p-5 sm:p-6 space-y-5"
            >
              {/* Category Tree Root Header */}
              <div className="pb-3 border-b border-line space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                    <span>{lang === "th" ? meta.labelTh : meta.labelEn}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    {t(
                      `${category.skills.length} ทักษะ`,
                      `${category.skills.length} SKILLS`,
                    )}
                  </span>
                </div>
                <BilingualStack
                  as="h3"
                  className="text-xl font-semibold text-white tracking-tight"
                  th={category.nameTh}
                  en={category.nameEn}
                />
                <BilingualStack
                  className="text-xs font-mono text-zinc-400 leading-normal md:min-h-[2lh]"
                  th={meta.taglineTh}
                  en={meta.taglineEn}
                />
              </div>

              {/* Skill tiles: outlined, no slab, since they are not controls. */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                {category.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    data-cursor-text="SKILL"
                    className="rounded-lg bg-void border-[1.5px] border-edge px-3 py-2.5 space-y-0.5 min-w-0"
                  >
                    <span className="font-semibold text-zinc-100 block">
                      {skill.name}
                    </span>
                    <BilingualStack
                      as="span"
                      className="text-xs text-zinc-400 font-sans font-normal block leading-normal"
                      th={skill.descTh}
                      en={skill.descEn}
                    />
                  </li>
                ))}
              </ul>
            </m.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
