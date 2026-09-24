import React from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Github,
  FileText,
  Phone,
  Layers,
  Database,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { MobileMockup } from "../../MobileMockup";

export const Hero: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const pillars = [
    {
      icon: <Layers className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />,
      label: "Flutter & Dart • BLoC Pattern",
    },
    {
      icon: <Database className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />,
      label: "Offline-First • Local SQLite & Hive",
    },
    {
      icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />,
      label: "Clean Architecture • Domain Driven",
    },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />,
      label: "RESTful APIs • WebView Bridge",
    },
  ];

  const roles = [
    "Mobile Systems Architect",
    "Flutter & Dart Engineer",
    "Offline-First Specialist",
  ];
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section className="relative pt-4 sm:pt-8 pb-12 sm:pb-20 border-b border-slate-200/80 dark:border-white/[0.07]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Bold Broadsheet Typography & Manifesto (7 Cols) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7"
        >
          {/* Eyebrow Status Pill & Kinetic Rotating Role Badge */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="eyebrow-pill text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t("เปิดรับงานใหม่อย่างเป็นทางการ", "Available for Opportunities")}
            </span>

            {/* Kinetic UI Suite: Flip-Rotating Role Pill (CONTEXT.md #58) */}
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-500/25 text-xs font-mono overflow-hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-semibold whitespace-nowrap"
              >
                {roles[roleIndex]}
              </motion.span>
            </div>
          </motion.div>

          {/* Headline strictly conforming to 2-Line Iron Rule with Inline Domain Badge (CONTEXT.md #10) */}
          <motion.div variants={itemVariants} className="max-w-4xl space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.05]">
              {lang === "th" ? (
                <>
                  {personal.nameTh}
                  <span className="text-shiny block text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight mt-1.5">
                    Mobile Application Developer
                    <span className="inline-flex items-center gap-1 align-middle px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-400/30 text-xs sm:text-sm font-mono tracking-wider font-semibold ml-2 -translate-y-0.5">
                      FLUTTER
                    </span>
                  </span>
                </>
              ) : (
                <>
                  Theeraphat S.
                  <span className="text-shiny block text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight mt-1.5">
                    Mobile Application Developer
                    <span className="inline-flex items-center gap-1 align-middle px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-400/30 text-xs sm:text-sm font-mono tracking-wider font-semibold ml-2 -translate-y-0.5">
                      FLUTTER
                    </span>
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Manifesto & Purpose */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-lg sm:text-xl font-medium text-cyan-600 dark:text-cyan-400 leading-snug tracking-tight">
              &ldquo;
              {lang === "th"
                ? "ผมสร้างแอปพลิเคชันด้วยความใส่ใจ ไม่มีเทมเพลต ไม่มีทางลัด"
                : "Crafting robust mobile systems. No templates, no shortcuts."}
              &rdquo;
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              {lang === "th" ? personal.taglineTh : personal.taglineEn}
            </p>
          </motion.div>

          {/* High-Precision Engineering Hardware Pillars */}
          <motion.div
            variants={itemVariants}
            className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-slate-700 dark:text-slate-300"
          >
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] ring-1 ring-slate-200/80 dark:ring-white/[0.08] hover:ring-cyan-400/50 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all duration-300 shadow-xs"
              >
                <div className="p-1 rounded-lg bg-cyan-500/10 shrink-0">
                  {pillar.icon}
                </div>
                <span className="truncate font-medium">{pillar.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Nested CTA & Island Button Architecture */}
          <motion.div
            variants={itemVariants}
            className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Primary Island CTA with Button-in-Button Trailing Icon & Luminous Shine */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="btn--shine inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-bold text-sm rounded-full transition-all shadow-[0_12px_28px_-6px_rgba(6,182,212,0.45)] group cursor-pointer"
            >
              <span>
                {t("สำรวจผลงานและเคสทดสอบ", "Explore Selected Works")}
              </span>
              <span className="w-7 h-7 rounded-full bg-slate-950/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-slate-950" strokeWidth={2} />
              </span>
            </motion.a>

            {/* Secondary: Expandable Resume Pill (CONTEXT.md #33-36) */}
            <motion.a
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-white/[0.08] hover:ring-cyan-400/60 text-sm font-mono rounded-full transition-all shadow-xs cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span>{t("ดาวน์โหลด CV", "Resume CV")}</span>
              <span className="max-w-0 overflow-hidden group-hover:max-w-[40px] transition-all duration-300 text-[11px] text-cyan-400 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                (PDF)
              </span>
            </motion.a>

            {/* Secondary: GitHub */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-white/[0.08] hover:ring-cyan-400/60 text-sm font-mono rounded-full transition-all shadow-xs cursor-pointer"
            >
              <Github className="w-4 h-4" strokeWidth={1.5} />
              <span>GitHub</span>
            </motion.a>

            {personal.phone && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${personal.phone.replace(/[^0-9]/g, "")}`}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-white/[0.08] hover:ring-cyan-400/60 text-sm font-mono rounded-full transition-all shadow-xs cursor-pointer"
              >
                <Phone className="w-4 h-4 text-cyan-500 dark:text-cyan-400" strokeWidth={1.5} />
                <span>{personal.phone}</span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Hardware Mobile Simulator (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Subtle Concentric Glare Aura */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-full bg-radial from-cyan-500/15 via-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10"
          />

          {/* Interactive Mobile Device Hardware */}
          <MobileMockup />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
