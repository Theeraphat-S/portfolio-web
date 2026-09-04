import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Code2, Database, Users, Terminal } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { SkillCategory } from "../../../types";
import { SpotlightCard } from "../../reactbits/SpotlightCard";

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({
  category,
  index,
}) => {
  const { lang, t } = useLanguage();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "smartphone":
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case "code":
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case "database":
        return <Database className="w-5 h-5 text-blue-400" />;
      case "users":
        return <Users className="w-5 h-5 text-indigo-400" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getSpotlightColor = (color: string) => {
    switch (color) {
      case "emerald":
      case "cyan":
        return "rgba(6, 182, 212, 0.15)";
      case "blue":
        return "rgba(59, 130, 246, 0.15)";
      default:
        return "rgba(99, 102, 241, 0.15)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <SpotlightCard
        spotlightColor={getSpotlightColor(category.color)}
        className="h-full border-zinc-800/90"
      >
        {/* Category Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800 mb-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center shadow-inner">
            {getCategoryIcon(category.icon)}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {lang === "th" ? category.nameTh : category.nameEn}
            </h3>
            <span className="text-xs text-zinc-400 font-mono">
              {category.skills.length} {t("ทักษะหลัก", "Core Competencies")}
            </span>
          </div>
        </div>

        {/* Skills Item List */}
        <div className="space-y-3">
          {category.skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/90 text-emerald-300 border border-zinc-700">
                  {skill.level}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-normal pl-3">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
};
