import React from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Layers,
  ShieldCheck,
  Users,
  Activity,
  Sparkles,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

export const AboutBento: React.FC = () => {
  const { lang, t } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about" className="py-20 sm:py-28 border-b border-white/[0.08]">
      {/* Section Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="flex items-center justify-between pb-8 mb-12 border-b border-white/[0.06]"
      >
        <span className="editorial-eyebrow text-[#00f0ff]">
          02 // IDENTITY & PHILOSOPHY
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          ENGINEERING PERSPECTIVE
        </span>
      </motion.div>

      {/* Main Statement Typography */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="space-y-6 mb-16"
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] max-w-5xl">
          {lang === "th" ? (
            <>
              ซอฟต์แวร์ที่ดีไม่ใช่แค่เรื่องของโค้ด{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#38bdf8]">
                แต่คือสถาปัตยกรรมการตัดสินใจ
              </span>{" "}
              ที่สร้างบนตรรกะ ความเสถียร และความเข้าใจผู้ใช้งานจริง
            </>
          ) : (
            <>
              Good software is rarely an accident.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#38bdf8]">
                It is a deliberate architecture
              </span>{" "}
              built on strict state discipline, offline resilience, and human
              empathy.
            </>
          )}
        </h2>
      </motion.div>

      {/* Asymmetrical Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Deep Narrative & Telemetry Proof (7 Columns) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="lg:col-span-7 space-y-8"
        >
          <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            <p>
              {lang === "th" ? (
                <>
                  ผมเป็น Mobile Developer
                  ที่เริ่มต้นสร้างสรรค์ผลงานอย่างเข้มข้นตั้งแต่ปี 2565
                  ในระหว่างศึกษาที่สาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่โจ้
                  จากความหลงใหลในความรวดเร็วและประสิทธิภาพของ Flutter & Dart
                  ผมได้ผลักดันขอบเขตการเรียนรู้ด้วยการสร้างระบบที่แก้ปัญหาจริงในสังคม
                </>
              ) : (
                <>
                  I am a mobile systems engineer who began building software in
                  2022 during my Information Technology degree at Maejo
                  University. Captivated by the performance, declarative
                  rendering, and expressive power of Flutter & Dart, I focused
                  on turning theoretical software engineering principles into
                  reliable production applications.
                </>
              )}
            </p>
            <p>
              {lang === "th" ? (
                <>
                  ประสบการณ์จากการฝึกงานจริงที่บริษัท Fakduay Logistics
                  ทำให้ผมเข้าใจความท้าทายของการผสานระบบ WebView เข้ากับ Native
                  Experience เพื่อรักษาความต่อเนื่องของแอปพลิเคชัน
                  ในขณะที่โปรเจกต์จบอย่างระบบคัดกรองโรคเรื้อรัง (NCDs)
                  ได้พิสูจน์การออกแบบระบบ Offline-first ที่ขจัด Human Error
                  ของอาสาสมัครสาธารณสุขได้ 100%
                </>
              ) : (
                <>
                  During my internship at Fakduay Logistics, I engineered
                  production features bridging high-performance Flutter native
                  screens with hybrid WebView menus and gamified loyalty
                  mechanics. For my capstone project, I designed a clinical NCDs
                  risk-screening platform that eliminated medical calculation
                  errors to zero while functioning seamlessly in
                  zero-connectivity rural clinics.
                </>
              )}
            </p>
          </div>

          {/* Integrated Telemetry & Impact Stats Deck */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                {t("ความแม่นยำ NCDs", "NCDs ACCURACY")}
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#00f0ff] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100%
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                {t("นศ. ที่ให้คำปรึกษา", "STUDENTS TAUGHT")}
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-white flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#00f0ff]" />
                100+
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                {t("วาระผู้ช่วยสอน", "TEACHING TERMS")}
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-white flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#00f0ff]" />3 TERMS
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                {t("เป้าหมายความลื่นไหล", "FRAME BUDGET")}
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#00f0ff] flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
                60-120 FPS
              </span>
            </div>
          </div>

          {/* Academic & Mentorship Block */}
          <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] hover:border-[#00f0ff]/30 transition-colors space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-[#00f0ff] uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#00f0ff]" />
              <span>ACADEMIC LEADERSHIP & TEACHING</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {lang === "th"
                ? "ทำหน้าที่ผู้ช่วยสอน (Teaching Assistant) ประจำสาขาวิชาเทคโนโลยีสารสนเทศต่อเนื่อง 3 ภาคการศึกษา ถ่ายทอดความรู้และให้คำปรึกษาแก่นักศึกษากว่า 100+ คนในวิชาการเขียนโปรแกรมและการแก้ปัญหาเชิงอัลกอริทึม พร้อมได้รับเกียรติเป็นวิทยากรบรรยายพิเศษหัวข้อการประยุกต์ใช้ AI"
                : "Served as University Teaching Assistant for 3 consecutive terms at Maejo University, mentoring 100+ undergraduate students through data structures, OOP, and algorithmic problem-solving. Invited as a keynote guest speaker on AI application in modern software engineering."}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Architectural Principles & Key Data (5 Columns) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="lg:col-span-5 space-y-4"
        >
          {/* Principle 1: BLoC & Determinism */}
          <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] hover:border-[#00f0ff]/35 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                PRINCIPLE // 01
              </span>
              <Layers className="w-4 h-4 text-[#00f0ff] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
              Deterministic State via BLoC
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              Unidirectional data flows and discrete event-to-state
              transformations that eliminate edge-case race conditions and
              ensure full regression testability.
            </p>
          </div>

          {/* Principle 2: Offline-First Reliability */}
          <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] hover:border-[#00f0ff]/35 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                PRINCIPLE // 02
              </span>
              <ShieldCheck className="w-4 h-4 text-[#00f0ff] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
              Offline-First Resilience
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              Local database caching (SQLite/Hive) and idempotent background
              synchronization queues ensure zero data loss during network
              dropouts.
            </p>
          </div>

          {/* Principle 3: Micro-Interactions & 60-120fps */}
          <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] hover:border-[#00f0ff]/35 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                PRINCIPLE // 03
              </span>
              <Activity className="w-4 h-4 text-[#00f0ff] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
              Fluid Frame-Rate Obsession
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              Constraining layout rebuilds, leveraging GPU-accelerated shaders,
              and tuning spring physics to achieve buttery 60-120fps interaction
              fidelity.
            </p>
          </div>

          {/* Academic Anchor Badge */}
          <div className="p-5 rounded-2xl bg-[#00f0ff]/[0.03] border border-[#00f0ff]/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-[#00f0ff]" />
              <div>
                <span className="text-xs font-mono font-bold text-white block">
                  B.Sc. in Information Technology
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  Maejo University (2022 - 2026)
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#00f0ff] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00f0ff]" />
              RECENT GRAD
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBento;
