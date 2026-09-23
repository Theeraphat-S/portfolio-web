import React from "react";
import { motion } from "motion/react";
import { Smartphone, Code, Database, Wrench } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SkillCategory } from "../../../types";

const ICON_MAP: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-4 h-4 text-sky-400" />,
  code: <Code className="w-4 h-4 text-sky-400" />,
  database: <Database className="w-4 h-4 text-sky-400" />,
  tool: <Wrench className="w-4 h-4 text-sky-400" />,
};

export const Skills: React.FC = () => {
  const { lang, t } = useLanguage();
  const { skillCategories } = portfolioData;

  return (
    <section id="skills" className="py-20 border-b border-slate-200 dark:border-slate-800">
      {/* Section Subtitle & Heading */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="text-xs font-mono text-slate-900 dark:text-sky-400 uppercase tracking-widest font-semibold">
          03 // {t("ทักษะและความเชี่ยวชาญ", "TECHNICAL MATRIX")}
        </span>
        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="space-y-4 mb-12"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {lang === "th"
            ? "ชุดทักษะเชิงเทคนิคและความเชี่ยวชาญ (Technical Arsenal)"
            : "Technical Arsenal & Applied Capabilities"}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {lang === "th"
            ? "มุ่งเน้นสถาปัตยกรรม Mobile Cross-Platform ด้วย Flutter เป็นแกนหลัก ควบคู่ความเข้าใจด้าน Backend, ฐานข้อมูล และการควบคุมคุณภาพโค้ด"
            : "Core focus on cross-platform mobile architecture with Flutter, supported by enterprise backend foundations, relational databases, and collaborative tooling."}
        </p>
      </motion.div>

      {/* Domain Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category: SkillCategory, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -3 }}
            className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl p-5 sm:p-6 space-y-4 shadow-xs dark:shadow-none hover:border-sky-500/50 transition-all"
          >
            {/* Domain Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {ICON_MAP[category.icon] ?? <Wrench className="w-4 h-4 text-sky-400" />}
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  {lang === "th" ? category.nameTh : category.nameEn}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {category.skills.length} skills
              </span>
            </div>

            {/* Skills List */}
            <div className="space-y-3.5">
              {category.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0 space-y-1 group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="font-semibold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 font-medium whitespace-nowrap shrink-0">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed pl-3.5">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
