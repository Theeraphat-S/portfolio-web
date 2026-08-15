import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Smartphone, 
  CheckCircle2, 
  Github, 
  Mail
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { DecryptedText } from './reactbits/DecryptedText';
import { ShinyText } from './reactbits/ShinyText';
import { Magnet } from './reactbits/Magnet';
import { MobileMockup } from './MobileMockup';

export const Hero: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal, stats } = portfolioData;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Gradients & Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b15_1px,transparent_1px),linear-gradient(to_bottom,#18181b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Hero Headlines */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Main Name & Title */}
            <div className="space-y-2">
              <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                Mobile Application Engineer
              </p>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                <DecryptedText
                  text={lang === 'th' ? personal.nameTh : personal.nameEn}
                  speed={40}
                  maxIterations={12}
                  className="text-white"
                  encryptedClassName="text-emerald-400"
                />
              </h1>

              <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                <ShinyText
                  text={lang === 'th' ? personal.titleTh : personal.titleEn}
                  speed={4}
                  className="font-bold text-zinc-300"
                />
              </div>
            </div>

            {/* Tagline / Value Proposition */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              {lang === 'th' ? personal.taglineTh : personal.taglineEn}
            </p>

            {/* Badges / Tech Highlights */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Flutter & Dart',
                'Bloc Architecture',
                'RESTful API & WebView',
                'MySQL & Database',
                'Maejo University (IT)'
              ].map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-zinc-700 transition-colors"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Action Buttons (Magnetized) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Magnet padding={40} magnetStrength={0.3}>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all active:scale-95 cursor-pointer"
                >
                  <span>{t('สำรวจผลงานโปรเจกต์', 'Explore Projects')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnet>

              <Magnet padding={40} magnetStrength={0.3}>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-700 hover:border-zinc-500 font-semibold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg backdrop-blur-md cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>{t('ติดต่อ / ดูข้อมูลเรซูเม่', 'Contact / Resume')}</span>
                </button>
              </Magnet>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6 border-t border-zinc-850">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400 block">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-400 leading-tight block mt-0.5">
                    {lang === 'th' ? stat.labelTh : stat.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Mobile Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="w-full">
              <div className="text-center mb-3">
                <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800">
                  {t('แตะแท็บด้านล่างเพื่อทดลองเล่น UI จริง', 'Tap tabs inside device to switch live demo screens')}
                </span>
              </div>
              <MobileMockup />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
