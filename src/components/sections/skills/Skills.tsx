import React from "react";
import { motion } from "motion/react";
import { Smartphone, Code, Database, Wrench } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SkillCategory } from "../../../types";

const ICON_MAP: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-4 h-4 text-[#bfdb39]" />,
  code: <Code className="w-4 h-4 text-[#bfdb39]" />,
  database: <Database className="w-4 h-4 text-[#bfdb39]" />,
  tool: <Wrench className="w-4 h-4 text-[#bfdb39]" />,
};

export const Skills: React.FC = () => {
  const { lang, t } = useLanguage();
  const { skillCategories } = portfolioData;

  return (
    <section id="skills" className="py-20 border-b border-zinc-200 dark:border-[#243b30]">
      {/* Section Subtitle & Heading */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="text-xs font-mono text-[#18231d] dark:text-[#bfdb39] uppercase tracking-widest font-semibold">
          03 // {t("ทักษะและความเชี่ยวชาญ", "TECHNICAL MATRIX")}
        </span>
        <div className="h-px bg-zinc-200 dark:bg-[#243b30] flex-1" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="space-y-4 mb-12"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#18231d] dark:text-[#fafafa]">
          {lang === "th"
            ? "ชุดทักษะเชิงเทคนิคและความเชี่ยวชาญ (Technical Arsenal)"
            : "Technical Arsenal & Applied Capabilities"}
        </h2>
        <p className="text-zinc-600 dark:text-[#c2c2c2] max-w-2xl text-sm sm:text-base leading-relaxed">
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
            className="border border-zinc-200 dark:border-[#243b30] bg-white dark:bg-[#121e17] rounded-xl p-6 space-y-4 shadow-xs dark:shadow-none hover:border-[#bfdb39]/50 transition-all"
          >
            {/* Domain Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-[#243b30]">
              <div className="flex items-center gap-2">
                {ICON_MAP[category.icon] ?? <Wrench className="w-4 h-4 text-[#bfdb39]" />}
                <h3 className="font-bold text-sm sm:text-base text-[#18231d] dark:text-[#fafafa]">
                  {lang === "th" ? category.nameTh : category.nameEn}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-[#969696]">
                {category.skills.length} skills
              </span>
            </div>

            {/* Skills List */}
            <div className="space-y-3">
              {category.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bfdb39] shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="font-semibold text-zinc-800 dark:text-[#fafafa]">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#18231d] dark:text-[#bfdb39] bg-[#bfdb39]/15 px-1.5 py-0.2 rounded border border-[#bfdb39]/30 font-medium">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-zinc-500 dark:text-[#969696] text-[11px] sm:text-right pl-3.5 sm:pl-0">
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
