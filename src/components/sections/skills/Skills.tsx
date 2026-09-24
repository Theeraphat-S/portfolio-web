import React from "react";
import { motion } from "motion/react";
import {
  Smartphone,
  Code,
  Server,
  Wrench,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SkillCategory } from "../../../types";

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />,
  code: <Code className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />,
  database: <Server className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />,
  users: <Wrench className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />,
};

export const Skills: React.FC = () => {
  const { lang, t } = useLanguage();
  const { skillCategories } = portfolioData;

  const coreMobileCategory = skillCategories[0];
  const secondaryCategories = skillCategories.slice(1);

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/[0.07]"
    >
      {/* Section Eyebrow & Rule */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="eyebrow-pill text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-500/25">
          <Sparkles className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
          <span>{t("ทักษะและความเชี่ยวชาญ", "TECHNICAL STACK & MASTERY")}</span>
        </span>
        <div className="h-px bg-slate-200 dark:bg-white/[0.08] flex-1" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="space-y-4 mb-14"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {lang === "th"
            ? "ชุดทักษะเชิงเทคนิคและความเชี่ยวชาญ (Technical Arsenal)"
            : "Technical Arsenal & Applied Capabilities"}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {lang === "th"
            ? "มุ่งเน้นสถาปัตยกรรม Mobile Cross-Platform ด้วย Flutter, Dart, BLoC และ Offline-First DB เป็นแกนหลัก ควบคู่ความเข้าใจด้าน Backend APIs และระเบียบวิธีวิศวกรรมซอฟต์แวร์"
            : "Core focus on cross-platform mobile architecture with Flutter, Dart, BLoC, and Local DBs, supported by enterprise backend APIs and collaborative engineering tooling."}
        </p>
      </motion.div>

      {/* Bento Matrix Structure */}
      <div className="space-y-8">
        {/* Core Mobile & Offline Engine Hero Bento Card (Doppelrand Double-Bezel) */}
        {coreMobileCategory && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
            className="doppelrand-shell group"
          >
            <div className="doppelrand-core p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200/80 dark:border-white/[0.07] gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-400/25">
                    {CATEGORY_ICON_MAP[coreMobileCategory.icon] ?? (
                      <Smartphone className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100">
                        {lang === "th"
                          ? coreMobileCategory.nameTh
                          : coreMobileCategory.nameEn}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-400/25">
                        <Sparkles className="w-3 h-3" strokeWidth={1.5} />
                        CORE STACK
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      Flutter &bull; Dart &bull; BLoC &bull; Clean Architecture
                      &bull; SQLite/Hive
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  {coreMobileCategory.skills.length} Production Disciplines
                </span>
              </div>

              {/* Grid of Core Skills from Typed Source */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coreMobileCategory.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-[#05070d] ring-1 ring-slate-200/80 dark:ring-white/[0.07] hover:ring-cyan-400/50 transition-all group/item"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover/item:scale-125 transition-transform" />
                        <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full ring-1 ring-cyan-400/20 font-semibold whitespace-nowrap">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed pl-4">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Skills Bento Grid (Backend APIs, Languages, Tooling) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryCategories.map((category: SkillCategory, idx: number) => (
            <motion.div
              key={category.nameEn}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              className="doppelrand-shell group flex flex-col justify-between"
            >
              <div className="doppelrand-core p-6 flex flex-col justify-between space-y-4">
                <div>
                  {/* Domain Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200/80 dark:border-white/[0.07]">
                    <div className="flex items-center gap-2">
                      {CATEGORY_ICON_MAP[category.icon] ?? (
                        <Code className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                      )}
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                        {lang === "th" ? category.nameTh : category.nameEn}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      {category.skills.length}
                    </span>
                  </div>

                  {/* Skills List from Typed Domain Data */}
                  <div className="space-y-3">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="pb-2.5 border-b border-slate-100 dark:border-white/[0.05] last:border-0 last:pb-0 space-y-0.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                          {skill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                  <span>Production Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
