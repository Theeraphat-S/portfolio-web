import React from "react";
import { Smartphone, Code, Database, Wrench } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SkillCategory } from "../../../types";

const ICON_MAP: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  code: <Code className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  database: <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  tool: <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
};

export const Skills: React.FC = () => {
  const { lang, t } = useLanguage();
  const { skillCategories } = portfolioData;

  return (
    <section id="skills" className="py-20 border-b border-zinc-200 dark:border-zinc-900">
      {/* Section Subtitle & Heading */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          03 // {t("ทักษะและความเชี่ยวชาญ", "TECHNICAL MATRIX")}
        </span>
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
      </div>

      <div className="space-y-4 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {lang === "th"
            ? "ชุดทักษะเชิงเทคนิคและความเชี่ยวชาญ (Technical Arsenal)"
            : "Technical Arsenal & Applied Capabilities"}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {lang === "th"
            ? "มุ่งเน้นสถาปัตยกรรม Mobile Cross-Platform ด้วย Flutter เป็นแกนหลัก ควบคู่ความเข้าใจด้าน Backend, ฐานข้อมูล และการควบคุมคุณภาพโค้ด"
            : "Core focus on cross-platform mobile architecture with Flutter, supported by enterprise backend foundations, relational databases, and collaborative tooling."}
        </p>
      </div>

      {/* Domain Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category: SkillCategory, idx: number) => (
          <div
            key={idx}
            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 rounded-lg p-6 space-y-4 shadow-xs dark:shadow-none"
          >
            {/* Domain Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                {ICON_MAP[category.icon] ?? <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                  {lang === "th" ? category.nameTh : category.nameEn}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                {category.skills.length} skills
              </span>
            </div>

            {/* Skills List */}
            <div className="space-y-3">
              {category.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400/90 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800/40">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-right pl-3.5 sm:pl-0">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
