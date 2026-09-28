import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  FileText,
  ArrowDown,
  Terminal,
  Activity,
  Radio,
  Cpu,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { useTelemetry } from "../../../hooks/useTelemetry";

export const Hero: React.FC = () => {
  const { lang, t } = useLanguage();
  const { localTime, latency } = useTelemetry();
  const shouldReduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Restrained parallax transforms for visual anchor (disabled if reduced motion)
  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    shouldReduceMotion ? [0, 0] : [5, -5],
  );
  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    shouldReduceMotion ? [0, 0] : [-6, 6],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-6 sm:pt-14 pb-16 sm:pb-24 border-b border-white/[0.08]"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col space-y-10 sm:space-y-14"
      >
        {/* Top Identity & Integrated Telemetry Bar */}
        <motion.div
          variants={lineVariants}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]"
        >
          {/* Identity & Domain */}
          <div className="flex items-center gap-3">
            <span className="editorial-eyebrow text-[#00f0ff]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              THEERAPHAT SRIMONTHA
            </span>
            <span className="text-zinc-600 font-mono text-xs hidden sm:inline">
              /
            </span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              MOBILE SYSTEMS ARCHITECT
            </span>
          </div>

          {/* Real-time Geographic & System Telemetry with Emerald status indicators */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">CHIANG MAI, TH (GMT+7)</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-white font-semibold">
                {localTime || "12:00:00"}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-zinc-400">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>~{latency}ms</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-medium">
                <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                <span>{t("พร้อมเริ่มงานทันที", "OPEN FOR ROLES")}</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Monumental Asymmetric Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9 space-y-3">
            <h1 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] font-extrabold tracking-tighter leading-[0.92] text-white">
              <motion.span
                variants={lineVariants}
                className="block text-zinc-300"
              >
                {lang === "th" ? "สถาปัตยกรรมโมบาย" : "ARCHITECTING"}
              </motion.span>
              <motion.span variants={lineVariants} className="block text-white">
                {lang === "th" ? "ระดับ PRODUCTION" : "HIGH-PERFORMANCE"}
              </motion.span>
              <motion.span
                variants={lineVariants}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0284c7]"
              >
                {lang === "th" ? "ด้วย FLUTTER & DART." : "MOBILE SYSTEMS."}
              </motion.span>
            </h1>
          </div>

          {/* Asymmetric Technical Telemetry Deck Anchor */}
          <motion.div
            variants={lineVariants}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="lg:col-span-3 flex flex-col justify-end"
          >
            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-md space-y-4 hover:border-[#00f0ff]/40 transition-colors group">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
                  SPECS // 01
                </span>
                <span className="text-[#00f0ff] font-bold">60-120 FPS</span>
              </div>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                Dart 3.x native concurrency, deterministic BLoC state streams,
                and offline-first SQLite synchronization.
              </p>
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-zinc-400" />
                  MAEJO IT
                </span>
                <span className="text-white font-bold">2022-2026</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Supporting Narrative & Strategic Positioning */}
        <motion.div
          variants={lineVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2"
        >
          <div className="lg:col-span-7">
            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-light">
              {lang === "th" ? (
                <>
                  บัณฑิตเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่โจ้
                  ผู้เชี่ยวชาญการออกแบบและพัฒนา Cross-platform Mobile
                  Application ด้วย{" "}
                  <strong className="text-white font-semibold underline decoration-[#00f0ff]/50 decoration-2 underline-offset-4">
                    Flutter, Dart & BLoC
                  </strong>{" "}
                  มีประสบการณ์ส่งมอบโปรเจกต์ใช้งานจริงระดับ Production
                  ทั้งระบบคัดกรองโรค (NCDs), ฟีเจอร์แอปพลิเคชัน Pinto และระบบ
                  POS ร้านค้า
                </>
              ) : (
                <>
                  Recent IT graduate from Maejo University specialized in
                  engineering high-end cross-platform mobile products with{" "}
                  <strong className="text-white font-semibold underline decoration-[#00f0ff]/50 decoration-2 underline-offset-4">
                    Flutter, Dart & BLoC
                  </strong>
                  . Proven experience shipping mission-critical systems from
                  healthcare screening (NCDs) to commercial logistics (Pinto)
                  and retail POS architectures.
                </>
              )}
            </p>
          </div>

          {/* Action CTAs with Magnetic feel */}
          <div className="lg:col-span-5 flex flex-wrap items-center gap-3 lg:justify-end">
            <a
              href="#projects"
              data-cursor-text="EXPLORE"
              className="btn-editorial btn-editorial-primary group"
            >
              <span>{t("สำรวจผลงาน", "EXPLORE CASE STUDIES")}</span>
              <ArrowDown className="w-4 h-4 text-[#07080c] group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="RESUME"
              className="btn-editorial btn-editorial-outline group"
            >
              <FileText className="w-4 h-4 text-zinc-400 group-hover:text-[#00f0ff] transition-colors" />
              <span>{t("ดาวน์โหลด CV", "RESUME / CV")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </motion.div>

        {/* Technical Specification Ribbon */}
        <motion.div
          variants={lineVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/[0.06]"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              PRIMARY ARCHITECTURE
            </span>
            <span className="text-sm font-mono font-bold text-white block">
              BLoC / Clean Architecture
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              DATA INTEGRITY
            </span>
            <span className="text-sm font-mono font-bold text-white block">
              Offline-First / REST & SQLite
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              LEADERSHIP & MENTORSHIP
            </span>
            <span className="text-sm font-mono font-bold text-white block">
              Teaching Assistant (3 Terms)
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              COMMERCIAL FOCUS
            </span>
            <span className="text-sm font-mono font-bold text-[#00f0ff] block">
              Production-Grade Mobile
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
