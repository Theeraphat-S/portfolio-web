import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  ArrowUpRight, 
  CheckCircle2, 
  Activity, 
  Flame, 
  ShoppingBag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData, ProjectItem } from '../data/portfolioData';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'mobile' | 'system'>('all');

  const filteredProjects = portfolioData.projects.filter((p: ProjectItem) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'ncds-screening':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'pinto-app':
        return <Flame className="w-5 h-5 text-cyan-400" />;
      case 'pos-system':
        return <ShoppingBag className="w-5 h-5 text-blue-400" />;
      default:
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
              {t('ผลงานที่โดดเด่น', 'Featured Work')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              {t('ผลงานแอปพลิเคชันและระบบที่พัฒนาจริง', 'Real-World Applications & Systems')}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              {t(
                'ผลงานจริงตั้งแต่แอปพลิเคชันคัดกรองโรคระดับการแพทย์, แอปพลิเคชันเชิงพาณิชย์ และระบบ POS เชื่อมต่อ REST API',
                'Production-tested applications spanning medical risk screening, commercial logistics & chat loyalty, and point-of-sale platforms.'
              )}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800 self-start md:self-auto">
            {[
              { id: 'all', label: t('ทั้งหมด', 'All Projects') },
              { id: 'mobile', label: t('Mobile Apps', 'Mobile Apps') },
              { id: 'system', label: t('Web & Systems', 'Systems & API') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as 'all' | 'mobile' | 'system')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project: ProjectItem, idx: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col h-full"
            >
              <SpotlightCard
                spotlightColor={project.color === '#10b981' ? 'rgba(16, 185, 129, 0.18)' : project.color === '#06b6d4' ? 'rgba(6, 182, 212, 0.18)' : 'rgba(59, 130, 246, 0.18)'}
                className="h-full flex flex-col justify-between group cursor-pointer border-zinc-800 hover:border-zinc-700"
                onClick={() => setSelectedProject(project)}
                data-cursor-text="Explore"
              >
                <div>
                  {/* Top Bar: Icon + Badge + Year */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      {getProjectIcon(project.id)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700">
                        {project.tag}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between gap-2">
                    <span>{lang === 'th' ? project.titleTh : project.titleEn}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-emerald-400 shrink-0" />
                  </h3>

                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    {lang === 'th' ? project.subtitleTh : project.subtitleEn}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed line-clamp-3">
                    {lang === 'th' ? project.descriptionTh : project.descriptionEn}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-4 space-y-1.5 border-t border-zinc-800/80 pt-3">
                    {(lang === 'th' ? project.highlightsTh : project.highlightsEn).slice(0, 2).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Badges & Action */}
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950/80 text-zinc-300 border border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    data-cursor-text="Open"
                    className="w-full py-2.5 rounded-xl bg-zinc-800/80 group-hover:bg-emerald-500 group-hover:text-zinc-950 text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>{t('ดูรายละเอียดสถาปัตยกรรม & ฟีเจอร์', 'View Architecture & Specs')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
