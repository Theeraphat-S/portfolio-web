import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SkillCategory } from "../../../types";

const CATEGORY_META = [
  {
    index: "01",
    label: "MOBILE SYSTEMS",
    tagline:
      "Cross-platform mobile applications, state engines, and reactive UI architecture.",
  },
  {
    index: "02",
    label: "LANGUAGES & WEB",
    tagline:
      "Core enterprise programming languages, web standards, and API backends.",
  },
  {
    index: "03",
    label: "DATA & TOOLING",
    tagline:
      "Relational persistence, API testing tools, version control, and development workflows.",
  },
  {
    index: "04",
    label: "LEADERSHIP & MINDSET",
    tagline:
      "Mentorship impact, university teaching assistantship, and Agile sprint execution.",
  },
];

export const Skills: React.FC = () => {
  const { lang } = useLanguage();
  const { skillCategories } = portfolioData;

  const fadeIn = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="capabilities"
      className="relative py-20 sm:py-28 border-b border-white/[0.08]"
    >
      {/* Anchor Alias for backwards compatibility */}
      <div id="skills" className="absolute -top-24 pointer-events-none" />

      {/* Section Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="flex items-center justify-between pb-6 mb-12 border-b border-white/[0.06]"
      >
        <span className="editorial-eyebrow text-[#00f0ff]">
          03 // CAPABILITIES & SYSTEMS
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          ENGINEERING TREE MATRIX
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
            ? "ชุดความเชี่ยวชาญเชิงวิศวกรรมซอฟต์แวร์ (Technical Matrix)"
            : "Engineering Capabilities & Technical Stack"}
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
          {lang === "th"
            ? "การบูรณาการระหว่างความเชี่ยวชาญเชิงลึกในระบบ Flutter/Dart สถาปัตยกรรม BLoC และฐานข้อมูลออฟไลน์ ควบคู่ไปกับพื้นฐาน Backend และทักษะการสื่อสารที่ผ่านการสอนนักศึกษาจริง"
            : "A structured balance between deep cross-platform mobile engineering, deterministic state management, offline persistence, and clear technical communication."}
        </p>
      </motion.div>

      {/* Clean Monospace Tree Layout (2 Columns with Hairline Separation) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-12 lg:gap-y-14">
        {skillCategories.map((category: SkillCategory, catIdx: number) => {
          const meta = CATEGORY_META[catIdx] || {
            index: String(catIdx + 1).padStart(2, "0"),
            label: "CAPABILITY",
            tagline: "",
          };

          return (
            <motion.div
              key={catIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="space-y-5"
            >
              {/* Category Tree Root Header */}
              <div className="pb-3 border-b border-white/[0.08] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] font-semibold tracking-wider">
                    <span>{meta.index} //</span>
                    <span>{meta.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    {category.skills.length} MODULES
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {lang === "th" ? category.nameTh : category.nameEn}
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  {meta.tagline}
                </p>
              </div>

              {/* Monospace Tree Branches */}
              <div className="font-mono text-xs space-y-2.5 pl-1 sm:pl-2">
                {category.skills.map((skill, sIdx) => {
                  const isLast = sIdx === category.skills.length - 1;
                  const connector = isLast ? "└─" : "├─";

                  return (
                    <div
                      key={sIdx}
                      data-cursor-text="SKILL"
                      className="group/node flex items-start justify-between gap-3 py-1.5 px-2 rounded-lg hover:bg-white/[0.02] transition-colors cursor-default"
                    >
                      {/* Left: Monospace Connector + Name + Short Desc */}
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="text-zinc-600 select-none font-bold group-hover/node:text-[#00f0ff] transition-colors shrink-0">
                          {connector}
                        </span>
                        <div className="space-y-0.5 min-w-0">
                          <span className="font-medium text-zinc-200 group-hover/node:text-white transition-colors block truncate">
                            {skill.name}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-sans font-light block truncate">
                            {skill.desc}
                          </span>
                        </div>
                      </div>

                      {/* Right: Muted Skill Level Badge */}
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 group-hover/node:text-[#00f0ff] shrink-0 pt-0.5 transition-colors select-none font-medium">
                        [{skill.level.split("/")[0].trim().toUpperCase()}]
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
