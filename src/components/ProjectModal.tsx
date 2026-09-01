import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Github, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  AlertCircle,
  Cpu,
  Scale,
  Search,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl rounded-3xl bg-zinc-900/95 border border-zinc-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto"
        >
          {/* Top Decorative Border Highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${project.color}, #06b6d4, transparent)`,
            }}
          />

          {/* Modal Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800 shrink-0">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 text-emerald-400 border border-zinc-700">
                  {project.tag}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Year: {project.year}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {lang === 'th' ? project.titleTh : project.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
                {lang === 'th' ? project.subtitleTh : project.subtitleEn}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-1 custom-scrollbar">
            
            {/* Overview Description */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t('ภาพรวมโครงการ', 'Project Overview')}
              </h4>
              <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
                {lang === 'th' ? project.descriptionTh : project.descriptionEn}
              </p>
            </div>

            {/* Key Metrics / Stats */}
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center">
                  <span className="text-[11px] text-zinc-400 block mb-0.5 font-medium">
                    {lang === 'th' ? m.labelTh : m.labelEn}
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Engineering Decisions & Case Study Analysis */}
            {(() => {
              const analysisCards = [
                {
                  id: 'problem',
                  labelTh: '1. ปัญหาตั้งต้นหน้างาน (The Real Problem)',
                  labelEn: '1. The Real Problem',
                  content: lang === 'th' ? project.problemTh : project.problemEn,
                  icon: AlertCircle,
                  borderColor: 'border-rose-900/40',
                  textColor: 'text-rose-400',
                },
                {
                  id: 'decision',
                  labelTh: '2. การตัดสินใจเชิงเทคนิค (Architectural Decision)',
                  labelEn: '2. Key Decision & Rationale',
                  content: lang === 'th' ? project.decisionRationaleTh : project.decisionRationaleEn,
                  icon: Cpu,
                  borderColor: 'border-sky-900/40',
                  textColor: 'text-sky-400',
                },
                {
                  id: 'tradeoffs',
                  labelTh: '3. การยอมแลก (Key Trade-offs)',
                  labelEn: '3. Key Trade-offs',
                  content: lang === 'th' ? project.tradeOffsTh : project.tradeOffsEn,
                  icon: Scale,
                  borderColor: 'border-amber-900/40',
                  textColor: 'text-amber-400',
                },
                {
                  id: 'evidence',
                  labelTh: '4. สิ่งที่ค้นพบจากการทดสอบ (Field Evidence)',
                  labelEn: '4. Evidence & Usability Insight',
                  content: lang === 'th' ? project.evidenceTh : project.evidenceEn,
                  icon: Search,
                  borderColor: 'border-purple-900/40',
                  textColor: 'text-purple-400',
                },
              ].filter((card): card is typeof card & { content: string } => Boolean(card.content));

              const outcomeText = lang === 'th' ? project.outcomeTh : project.outcomeEn;
              const hasCaseStudy = analysisCards.length > 0 || Boolean(outcomeText);

              if (!hasCaseStudy) return null;

              return (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      {t('การตัดสินใจเชิงวิศวกรรม & ผลกระทบ', 'Engineering Decisions & Impact Analysis')}
                    </h4>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      Product Sense
                    </span>
                  </div>

                  {analysisCards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysisCards.map(card => {
                        const Icon = card.icon;
                        return (
                          <div
                            key={card.id}
                            className={`p-3.5 rounded-2xl bg-zinc-950/70 border ${card.borderColor} space-y-1.5`}
                          >
                            <div className={`flex items-center gap-1.5 text-xs font-mono font-semibold ${card.textColor}`}>
                              <Icon className="w-3.5 h-3.5 shrink-0" />
                              <span>{lang === 'th' ? card.labelTh : card.labelEn}</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {card.content}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 5. Measured Outcome & Business Impact */}
                  {outcomeText && (
                    <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                        <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                        <span>{t('5. ผลลัพธ์ที่พิสูจน์ได้จริง (Measured Outcome & Impact)', '5. Proven Outcome & Impact')}</span>
                      </div>
                      <p className="text-xs text-emerald-200/90 leading-relaxed">
                        {outcomeText}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Key Technical Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t('ฟีเจอร์หลักและการพัฒนาเชิงลึก', 'Key Highlights & Implementation')}
              </h4>
              <div className="space-y-2.5">
                {(lang === 'th' ? project.highlightsTh : project.highlightsEn).map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/60 text-xs sm:text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Architecture */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {t('สถาปัตยกรรมระบบ (Architecture)', 'System Architecture')}
              </h4>
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-indigo-300">
                {lang === 'th' ? project.architectureTh : project.architectureEn}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                {t('เทคโนโลยีและเครื่องมือที่ใช้', 'Technologies & Tools')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4 shrink-0">
            <div className="text-xs text-zinc-400 font-mono">
              Designed & Built by Theeraphat Srimontha
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-zinc-700"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all cursor-pointer"
              >
                {t('ปิดหน้าต่าง', 'Close')}
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
