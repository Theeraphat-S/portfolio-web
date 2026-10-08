import React from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Layers,
  ShieldCheck,
  Zap,
  Presentation,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

export const AboutBento: React.FC = () => {
  const { lang, t } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-white/[0.08]">
      {/* 1. Section Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="flex items-center justify-between pb-6 mb-10 border-b border-white/[0.06]"
      >
        <span className="editorial-eyebrow text-[#00f0ff]">
          01 // {t("ตัวตน & ปรัชญา", "IDENTITY & PHILOSOPHY")}
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          {t(
            "สถาปัตยกรรม & คุณภาพระดับ Production",
            "ENGINEERING PHILOSOPHY & METRICS",
          )}
        </span>
      </motion.div>

      {/* 2. Main Statement (Reduced ~15-20% for faster scanability) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="space-y-4 mb-10"
      >
        <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-white leading-[1.15] max-w-4xl min-h-[5.5rem] sm:min-h-[5rem] lg:min-h-[6.2rem]">
          {lang === "th" ? (
            <>
              ซอฟต์แวร์ที่ดีไม่ใช่เรื่องบังเอิญ{" "}
              <span className="text-[#00f0ff]">
                แต่คือสถาปัตยกรรมที่ตั้งใจออกแบบ
              </span>{" "}
              บนระเบียบ State ที่แน่นอน การทำงานแบบ Offline-first
              และความเข้าใจผู้ใช้งานจริง
            </>
          ) : (
            <>
              Good software is rarely an accident.{" "}
              <span className="text-[#00f0ff]">
                It is a deliberate architecture
              </span>{" "}
              built on strict state discipline, offline resilience, and human
              empathy.
            </>
          )}
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl min-h-[4.5rem] sm:min-h-[4rem] lg:min-h-[3.5rem]">
          {lang === "th"
            ? "บัณฑิตเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่โจ้ มุ่งมั่นพัฒนาโมบายแอปพลิเคชันตั้งแต่ปี 2565 เปลี่ยนหลักวิศวกรรมซอฟต์แวร์สู่ระบบจริงที่เสถียร ทั้งสถาปัตยกรรม Hybrid WebView และระบบคิดเงินที่ทำงานต่อได้เมื่อออฟไลน์"
            : "Mobile software engineer graduated in Information Technology from Maejo University. Focused since 2022 on turning software engineering rigor into reliable production systems — ranging from hybrid native WebView bridges to offline-capable retail checkout."}
        </p>
      </motion.div>

      {/* 3. Engineering Principles (3 clean columns, no heavy bloated cards) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-12"
      >
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
          {t("หลักการทางวิศวกรรม", "ENGINEERING PRINCIPLES")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Principle 01 */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between h-full min-h-[145px] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-zinc-400 font-mono">01</span>
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono min-h-[1.25rem]">
              Deterministic State
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed min-h-[2.8rem]">
              {lang === "th"
                ? "ใช้ BLoC จัดการ Event สู่ State เพื่อแยกตรรกะออกจาก UI และควบคุมสถานะได้อย่างแม่นยำ"
                : "Use BLoC event-to-state transitions to separate logic from screens and make state changes easier to test."}
            </p>
          </div>

          {/* Principle 02 */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between h-full min-h-[145px] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-zinc-400 font-mono">02</span>
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono min-h-[1.25rem]">
              Offline-First Resilience
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed min-h-[2.8rem]">
              {lang === "th"
                ? "ออกแบบการจัดเก็บข้อมูลในเครื่องพร้อมกลไก Retry เพื่อความต่อเนื่องบนเครือข่ายที่ไม่เสถียร"
                : "Design local data storage and retry handling for unreliable network connections."}
            </p>
          </div>

          {/* Principle 03 */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between h-full min-h-[145px] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-zinc-400 font-mono">03</span>
              <Zap className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-mono min-h-[1.25rem]">
              Fluid Performance
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed min-h-[2.8rem]">
              {lang === "th"
                ? "จำกัดขอบเขต Rebuild และควบคุม Memory เพื่อให้เฟรมเรตและอินเตอร์แอคชันลื่นไหล"
                : "Isolate rebuild boundaries and inspect memory usage to keep app interactions responsive."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 4. Real Data Metrics (Restrained typography, cyan only for values) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-12 p-4 sm:p-5 rounded-xl bg-white/[0.015] border border-white/[0.08]"
      >
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
          {t("ตัวชี้วัดหลัก", "KEY METRICS")}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          <div className="space-y-0.5 pt-2 md:pt-0 md:pr-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 block break-words min-h-[1.25rem]">
              {t("ความแม่นยำ NCDs", "NCDS INTEGRITY")}
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-[#00f0ff] block">
              100%
            </span>
            <span className="text-xs font-mono text-zinc-400 block min-h-[1.25rem]">
              {t("คำนวณสูตรแม่นยำ 100%", "Zero calculation error")}
            </span>
          </div>

          <div className="space-y-0.5 pt-2 md:pt-0 md:px-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 block break-words min-h-[1.25rem]">
              {t("นศ. ที่ให้คำปรึกษา", "STUDENTS MENTORED")}
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-[#00f0ff] block">
              100+
            </span>
            <span className="text-xs font-mono text-zinc-400 block min-h-[1.25rem]">
              {t("ให้คำปรึกษาระดับปริญญาตรี", "Undergraduate mentorship")}
            </span>
          </div>

          <div className="space-y-0.5 pt-2 md:pt-0 md:px-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 block break-words min-h-[1.25rem]">
              {t("วาระผู้ช่วยสอน", "TEACHING TERMS")}
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-[#00f0ff] block">
              3
            </span>
            <span className="text-xs font-mono text-zinc-400 block min-h-[1.25rem]">
              {t("3 ภาคการศึกษาต่อเนื่อง", "Consecutive terms")}
            </span>
          </div>

          <div className="space-y-0.5 pt-2 md:pt-0 md:pl-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 block break-words min-h-[1.25rem]">
              {t("เป้าหมายเฟรมเรต", "FRAME-RATE TARGET")}
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-[#00f0ff] block">
              60-120 FPS
            </span>
            <span className="text-xs font-mono text-zinc-400 block min-h-[1.25rem]">
              {t("เป้าหมายการออกแบบ UI", "Design target, UI thread")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 5. Impact & Academic Background (Compact supporting cards) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3.5 min-h-[110px]">
          <GraduationCap className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase">
                {t("วุฒิการศึกษา", "ACADEMIC CREDENTIALS")}
              </span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
                2022 - 2026
              </span>
            </div>
            <p className="text-sm font-sans font-medium text-zinc-200">
              {lang === "th"
                ? "วท.บ. สาขาวิชาเทคโนโลยีสารสนเทศ"
                : "B.Sc. in Information Technology"}
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              {lang === "th"
                ? "มหาวิทยาลัยแม่โจ้ • วิศวกรรมซอฟต์แวร์และระบบโมบาย"
                : "Maejo University • Software Engineering & Mobile Systems"}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3.5 min-h-[110px]">
          <Presentation className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase">
                {t("บทบาทผู้นำและการสอน", "LEADERSHIP & MENTORSHIP")}
              </span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
                {t("3 เทอมการศึกษา", "3 SEMESTERS")}
              </span>
            </div>
            <p className="text-sm font-sans font-medium text-zinc-200">
              {lang === "th"
                ? "ผู้ช่วยสอนประจำภาควิชา & วิทยากรรับเชิญ"
                : "Undergraduate Teaching Assistant & Guest Speaker"}
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              {lang === "th"
                ? "ดูแลและให้คำปรึกษานักศึกษา 100+ คน ด้าน Frontend และตรรกะโปรแกรม"
                : "Mentored 100+ students across Frontend, Database, and Algorithmic Logic"}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutBento;
