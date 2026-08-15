import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Github, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    
    // Subtle celebratory confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#06b6d4', '#ffffff'],
    });

    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
  };

  return (
    <section id="contact" className="py-24 relative bg-zinc-950/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t('ติดต่อและร่วมงาน', 'Get in Touch')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {t('สนใจร่วมงานหรือพูดคุยเกี่ยวกับโปรเจกต์', "Let's Connect & Build Great Apps")}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            {t(
              'หากต้องการติดต่อสอบถาม แลกเปลี่ยนไอเดีย หรือสนใจร่วมงาน สามารถติดต่อได้โดยตรงผ่านช่องทางด้านล่าง',
              'Feel free to reach out directly via Email or connect on GitHub for opportunities and collaboration.'
            )}
          </p>
        </div>

        {/* Centered Direct Contact Hub */}
        <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.15)" className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Email Box */}
            <div className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500/40 transition-all gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono text-zinc-400 block">{t('อีเมลหลัก (Direct Email)', 'Primary Email')}</span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-sm sm:text-base font-bold font-mono text-zinc-100 hover:text-emerald-400 transition-colors break-all block mt-0.5"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
                <button
                  onClick={() => copyEmailToClipboard(personal.email)}
                  className="flex-1 py-2 px-3.5 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-xs font-semibold text-zinc-200 transition-all flex items-center justify-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">{t('คัดลอกแล้ว!', 'Copied!')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('คัดลอกอีเมล', 'Copy Email')}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personal.email}`}
                  className="py-2 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1"
                >
                  <span>{t('ส่งอีเมล', 'Send')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* GitHub Box */}
            <div className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-cyan-500/40 transition-all gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200 shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono text-zinc-400 block">GitHub Profile</span>
                  <span className="text-sm sm:text-base font-bold font-mono text-zinc-100 block mt-0.5">
                    github.com/{personal.githubUsername}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{t('เข้าชมโปรไฟล์ GitHub', 'Visit GitHub Profile')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Status and Location Footer */}
          <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-2 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {lang === 'th' ? personal.statusTh : personal.statusEn}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" />
              {lang === 'th' ? personal.locationTh : personal.locationEn}
            </span>
          </div>
        </SpotlightCard>

      </div>
    </section>
  );
};
