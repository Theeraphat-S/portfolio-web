import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Zap,
  Github,
  Mail,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { Magnet } from "../../reactbits/Magnet";

export const Hero: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 sm:pt-36 pb-16 overflow-hidden select-none">
      {/* 1. Atmospheric Backdrop: Dot Grid Matrix */}
      <div className="absolute inset-0 z-0 dot-matrix-bg pointer-events-none" />

      {/* 2. Angled Sheen Light Beams (Top-left & Top-right) */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-60 dark:opacity-40">
        {/* Left Beam */}
        <div
          style={{
            transform: "translateY(-240px) rotate(-45deg)",
            width: "560px",
            height: "1300px",
          }}
          className="sheen-beam-left absolute top-0 left-0"
        />
        {/* Right Beam */}
        <div
          style={{
            transform: "translateY(-240px) rotate(45deg)",
            width: "560px",
            height: "1300px",
          }}
          className="sheen-beam-right absolute top-0 right-0"
        />
      </div>

      {/* 3. Pinned Left Side Badge: AVAILABLE FOR OPPORTUNITY */}
      <div className="absolute left-0 top-1/2 z-30 hidden lg:flex items-center -translate-y-1/2 group">
        <a
          href="#contact"
          className="relative block bg-zinc-900 text-zinc-100 dark:bg-white dark:text-zinc-950 py-8 px-3.5 text-[10px] font-black uppercase tracking-[0.45em] shadow-2xl rounded-r-2xl border-r border-y border-zinc-700/50 dark:border-zinc-200 transition-all duration-300 hover:translate-x-1"
        >
          <span className="[writing-mode:vertical-rl] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            {t("พร้อมรับโอกาสร่วมงานใหม่", "AVAILABLE FOR OPPORTUNITY")}
          </span>
        </a>
      </div>

      {/* 4. Main Editorial Display Container */}
      <div className="relative z-10 max-w-[105rem] w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col justify-center flex-1">
        <div className="flex flex-col gap-2 sm:gap-4 md:items-center w-full justify-center">
          {/* Line 1: Bio Lead + MOBILE & APP + Floating GitHub */}
          <div className="md:flex gap-6 lg:gap-10 items-center relative">
            <motion.p
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 text-start md:text-right leading-relaxed max-w-[240px] md:max-w-[260px] font-medium uppercase tracking-[0.2em]"
            >
              {lang === "th"
                ? `สวัสดีครับ ผมธีรภัทร (${personal.nickname}) มุ่งมั่นสร้างโมบายแอปพลิเคชันระดับ Production ด้วย Flutter & Dart`
                : `Hi, I'm Theeraphat (${personal.nickname}). I build high-performance mobile systems with Flutter & Dart.`}
            </motion.p>

            <div className="relative">
              {/* Floating GitHub Link */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -top-6 right-2 sm:right-4 z-20"
              >
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  data-cursor-text="GitHub"
                  className="flex items-center justify-center p-2 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:scale-110 shadow-md"
                >
                  <Github className="w-5 h-5" />
                </a>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.2rem,11.5vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny px-2 sm:px-4"
              >
                MOBILE &amp; APP
              </motion.h1>
            </div>
          </div>

          {/* Line 2: FLUT [📱] TER + Floating Social / Contact */}
          <div className="md:flex gap-6 lg:gap-10 items-center relative">
            <div className="relative">
              {/* Floating Contact Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-6 left-6 z-20"
              >
                <button
                  onClick={scrollToContact}
                  data-cursor-text="Email"
                  aria-label="Contact Email"
                  className="flex items-center justify-center p-2 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:scale-110 shadow-md cursor-pointer"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[clamp(3.2rem,11.5vw,13rem)] flex items-center font-black leading-[0.85] tracking-tighter text-shiny px-2 sm:px-4"
              >
                <span>FLUT</span>
                {/* Embedded Phone Icon Pill */}
                <span className="inline-flex items-center justify-center mx-[0.03em] relative group/icon cursor-pointer">
                  <span className="p-2 sm:p-3 md:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 group-hover/icon:bg-emerald-500/20 group-hover/icon:border-emerald-400 transition-all duration-300">
                    <Smartphone className="w-[0.55em] h-[0.55em] text-emerald-500 group-hover/icon:scale-110 transition-transform duration-300" />
                  </span>
                </span>
                <span>TER</span>
              </motion.h1>
            </div>
          </div>

          {/* Line 3: DEV [⚡] ELOPER + Collaboration Tag */}
          <div className="md:flex gap-6 lg:gap-10 items-center relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(3.2rem,11.5vw,13rem)] flex items-center font-black leading-[0.85] tracking-tighter text-shiny px-2 sm:px-4"
            >
              <span>DEV</span>
              {/* Embedded Zap Icon Pill */}
              <span className="inline-flex items-center justify-center mx-[0.03em] relative group/zap cursor-pointer">
                <span className="p-2 sm:p-3 md:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 group-hover/zap:bg-amber-500/20 group-hover/zap:border-amber-400 transition-all duration-300">
                  <Zap className="w-[0.55em] h-[0.55em] text-amber-500 fill-amber-500/20 group-hover/zap:scale-110 transition-transform duration-300" />
                </span>
              </span>
              <span>ELOPER</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 pt-3 md:pt-6 leading-relaxed max-w-[260px] md:max-w-[240px] font-medium uppercase tracking-widest"
            >
              {lang === "th"
                ? "พร้อมร่วมงานทุกรูปแบบ ทั้ง Onsite, Hybrid และ Remote มุ่งเน้นสถาปัตยกรรม Bloc & Clean Code"
                : "Open to all forms of collaboration (Onsite / Hybrid / Remote). Specialized in Bloc Architecture."}
            </motion.p>
          </div>
        </div>

        {/* 5. Footer Bar: Location Tag + Divider + Expandable "View Resume" Pill */}
        <div className="w-full mt-10 sm:mt-16 md:mt-20">
          <div className="flex items-center justify-between gap-4 sm:gap-6 border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
            {/* Location & Year */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-zinc-500 dark:text-zinc-400 uppercase">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>CHIANG MAI, TH — 2026</span>
            </div>

            {/* Expandable Resume Pill Button */}
            <Magnet padding={24} magnetStrength={0.25}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume"
                data-cursor-text="Resume"
                className="group flex items-center"
              >
                <div className="relative flex items-center bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 h-12 w-12 group-hover:w-44 rounded-full transition-all duration-500 ease-[0.23,1,0.32,1] overflow-hidden shadow-xl border border-zinc-700/60 dark:border-zinc-300">
                  <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:delay-150 text-[11px] font-black uppercase tracking-widest pl-5 pr-10">
                    {t("ดูเรซูเม่", "View Resume")}
                  </span>
                  <div className="absolute right-0 flex items-center justify-center size-12 group-hover:rotate-45 transition-transform duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </a>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
