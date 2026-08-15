import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const ExperienceTimeline: React.FC = () => {
  const { lang, t } = useLanguage();
  const { experiences } = portfolioData;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'internship':
        return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'ta':
        return <GraduationCap className="w-4 h-4 text-cyan-400" />;
      case 'speaker':
        return <Award className="w-4 h-4 text-amber-400" />;
      default:
        return <Briefcase className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            {t('เส้นทางและประสบการณ์', 'Experience & Milestones')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {t('ประสบการณ์ทำงานและผลงานวิชาการ', 'Career Journey & Academic Impact')}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            {t(
              'จากการฝึกงานพัฒนาแอปพลิเคชันเชิงพาณิชย์ สู่การเป็นผู้ช่วยสอน TA 3 เทอม และวิทยากรบรรยายด้าน AI',
              'Proven track record across commercial app development, 3 semesters of university TA mentorship, and AI keynote speaking.'
            )}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-indigo-500/30" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_15px_#10b981] z-10">
                    {getTypeIcon(exp.type)}
                  </div>

                  {/* Content Box */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8 w-full">
                    <SpotlightCard
                      spotlightColor={
                        exp.type === 'internship'
                          ? 'rgba(16, 185, 129, 0.15)'
                          : exp.type === 'ta'
                          ? 'rgba(6, 182, 212, 0.15)'
                          : 'rgba(245, 158, 11, 0.15)'
                      }
                      className="border-zinc-800 hover:border-zinc-700"
                    >
                      {/* Badge & Period */}
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-zinc-800 text-emerald-300 border border-zinc-700">
                          {lang === 'th' ? exp.badgeTh : exp.badgeEn}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {lang === 'th' ? exp.periodTh : exp.periodEn}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-lg font-bold text-white mt-1">
                        {lang === 'th' ? exp.roleTh : exp.roleEn}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-cyan-300">
                        {lang === 'th' ? exp.companyTh : exp.companyEn}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono mt-1 mb-3">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {lang === 'th' ? exp.locationTh : exp.locationEn}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                        {lang === 'th' ? exp.descriptionTh : exp.descriptionEn}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 border-t border-zinc-800/80 pt-3 mb-4">
                        {(lang === 'th' ? exp.bulletsTh : exp.bulletsEn).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
