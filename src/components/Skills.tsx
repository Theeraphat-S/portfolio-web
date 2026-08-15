import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Code2, 
  Database, 
  Users, 
  Sparkles, 
  Layers,
  Terminal
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const Skills: React.FC = () => {
  const { lang, t } = useLanguage();
  const { skillCategories } = portfolioData;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-blue-400" />;
      case 'users':
        return <Users className="w-5 h-5 text-indigo-400" />;
      default:
        return <Terminal className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            {t('ทักษะและความเชี่ยวชาญทางเทคนิค', 'Technical Arsenal')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {t('ชุดทักษะครบวงจรสำหรับ Mobile & Fullstack', 'Comprehensive Tech Stack')}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            {t(
              'เชี่ยวชาญ Mobile Development ด้วย Flutter & Dart ควบคู่กับรากฐาน Backend, Database และการทำงานร่วมกับทีมอย่างมีประสิทธิภาพ',
              'Specialized in Flutter cross-platform mobile engineering backed by solid Java/Spring Boot, SQL databases, and modern developer workflows.'
            )}
          </p>
        </div>

        {/* Skill Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightCard
                spotlightColor={
                  category.color === 'emerald'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : category.color === 'cyan'
                    ? 'rgba(6, 182, 212, 0.15)'
                    : category.color === 'blue'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(99, 102, 241, 0.15)'
                }
                className="h-full border-zinc-800/90"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-800 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center shadow-inner">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {lang === 'th' ? category.nameTh : category.nameEn}
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono">
                      {category.skills.length} {t('ทักษะหลัก', 'Core Competencies')}
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
          ))}
        </div>

        {/* Flutter Architecture Showcase Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                Flutter Clean Architecture & State Mastery
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                {t(
                  'โครงสร้างแยก Presentation (Bloc), Domain (UseCases) และ Data (Repository/API) ชัดเจน ทดสอบง่าย ดูแลรักษาระยะยาวได้อย่างมั่นคง',
                  'Strict separation of Presentation (Bloc), Domain (UseCases), and Data (Repository/REST APIs) for high maintainability and testability.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400">
              Bloc Pattern
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-cyan-400">
              RESTful APIs
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-blue-400">
              MySQL & SQLite
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
