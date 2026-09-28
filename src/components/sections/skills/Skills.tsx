import React from "react";
import { motion } from "motion/react";
import { Smartphone, Code, Database, Users, Layers } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SkillCategory } from "../../../types";

const CATEGORY_META = [
  {
    index: "01",
    label: "MOBILE SYSTEMS",
    icon: Smartphone,
    desc: "Cross-platform mobile applications, state engines, and reactive UI architecture.",
  },
  {
    index: "02",
    label: "LANGUAGES & WEB",
    icon: Code,
    desc: "Core enterprise programming languages, web standards, and API backends.",
  },
  {
    index: "03",
    label: "DATA & TOOLING",
    icon: Database,
    desc: "Relational persistence, API testing tools, version control, and development workflows.",
  },
  {
    index: "04",
    label: "LEADERSHIP & MINDSET",
    icon: Users,
    desc: "Mentorship impact, university teaching assistantship, and Agile sprint execution.",
  },
];

export const Skills: React.FC = () => {
  const { lang } = useLanguage();
  const { skillCategories } = portfolioData;

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
      id="skills"
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
          03 // TECHNICAL ARSENAL
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          CAPABILITY MATRIX
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

      {/* Editorial Matrix Grid (4 Category Blocks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {skillCategories.map((category: SkillCategory, catIdx: number) => {
          const meta = CATEGORY_META[catIdx] || {
            index: String(catIdx + 1).padStart(2, "0"),
            label: "CAPABILITY",
            icon: Layers,
            desc: "",
          };
          const IconComponent = meta.icon;

          return (
            <motion.div
              key={catIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeIn}
              className="p-6 sm:p-8 rounded-3xl bg-white/[0.015] border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Header */}
              <div className="pb-5 mb-5 border-b border-white/[0.06] flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff]">
                    <span>{meta.index} //</span>
                    <span className="font-bold tracking-wider">
                      {meta.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {lang === "th" ? category.nameTh : category.nameEn}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">{meta.desc}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#00f0ff] shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              {/* De-pilled Structured Skill Rows */}
              <div className="space-y-1.5">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    data-cursor-text="SKILL"
                    className="group/row p-3 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.08] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-default"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/row:bg-[#00f0ff] group-hover/row:scale-125 transition-all mt-1.5 sm:mt-0 shrink-0" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-bold text-white group-hover/row:text-[#00f0ff] group-hover/row:translate-x-0.5 transition-all">
                            {skill.name}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-light">
                          {skill.desc}
                        </p>
                      </div>
                    </div>

                    <span className="self-start sm:self-auto shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.08] group-hover/row:border-[#00f0ff]/40 group-hover/row:text-[#00f0ff] transition-colors">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
