import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SkillCategory } from "../../../types";
import { SkillCategoryCard } from "./SkillCategoryCard";
import { SkillsBanner } from "./SkillsBanner";

export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const { skillCategories } = portfolioData;

  return (
    <section id="skills" className="py-24 relative bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
            {t("ทักษะและความเชี่ยวชาญทางเทคนิค", "Technical Arsenal")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {t(
              "ชุดทักษะครบวงจรสำหรับ Mobile & Fullstack",
              "Comprehensive Tech Stack",
            )}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            {t(
              "เชี่ยวชาญ Mobile Development ด้วย Flutter & Dart ควบคู่กับรากฐาน Backend, Database และการทำงานร่วมกับทีมอย่างมีประสิทธิภาพ",
              "Specialized in Flutter cross-platform mobile engineering backed by solid Java/Spring Boot, SQL databases, and modern developer workflows.",
            )}
          </p>
        </div>

        {/* Skill Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category: SkillCategory, idx: number) => (
            <SkillCategoryCard key={idx} category={category} index={idx} />
          ))}
        </div>

        {/* Flutter Architecture Showcase Banner */}
        <SkillsBanner />
      </div>
    </section>
  );
};

export default Skills;
