import React from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Award,
  Briefcase,
  UserCheck,
  ArrowUpRight,
  WifiOff,
  Users,
  Layers,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Database,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";

export const AboutBento: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  return (
    <section
      id="about"
      className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/[0.07]"
    >
      {/* Section Eyebrow & Rule */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="eyebrow-pill text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-500/25">
          <Sparkles className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
          <span>{t("แนวคิดและตัวตน", "ENGINEERING PHILOSOPHY & VALUES")}</span>
        </span>
        <div className="h-px bg-slate-200 dark:bg-white/[0.08] flex-1" />
      </motion.div>

      {/* Main Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="space-y-4 mb-14"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          {lang === "th"
            ? "ทุ่มเทและหลงใหลในการพัฒนา Mobile Application ตั้งแต่ปี 2565"
            : "Living and breathing mobile engineering since 2022"}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-base sm:text-lg leading-relaxed">
          {lang === "th"
            ? "โค้ดที่ดีไม่ใช่แค่ทำงานได้ แต่คือระบบของการตัดสินใจที่อยู่บนพื้นฐานของตรรกะ สถาปัตยกรรมที่ยั่งยืน และความเข้าอกเข้าใจผู้ใช้งานจริง"
            : "Good software isn't just syntax. It's a system of thoughtful decisions rooted in logic, architecture, and genuine empathy for the humans using it."}
        </p>
      </motion.div>

      {/* Gapless Bento Grid Architecture (12 Columns, Dense Packing) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 grid-flow-dense">
        {/* Tile 1: 8 Cols - Scalable Architecture (BLoC & Clean Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-8 doppelrand-shell group"
        >
          <div className="doppelrand-core p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full ring-1 ring-cyan-400/25">
                  SCALABLE ARCHITECTURE
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  BLoC &bull; Clean Architecture
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {lang === "th"
                  ? "สถาปัตยกรรมที่คิดมาอย่างรอบคอบ (Scalable Architecture)"
                  : "Thoughtful & Scalable Architecture"}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {lang === "th"
                  ? "ออกแบบโมบายแอปพลิเคชันด้วย Flutter & Dart ควบคู่สถาปัตยกรรม BLoC และ Clean Architecture เพื่อแยก State, Domain Logic และ Presentation Layer ออกจากกันอย่างเด็ดขาด ช่วยให้บำรุงรักษาและทดสอบได้ง่ายในระยะยาว"
                  : "Specialized in cross-platform mobile engineering with Flutter & Dart. Enforcing strict boundary separation with BLoC and Clean Architecture for deterministic state transitions and testable domain logic."}
              </p>

              {/* Interactive BLoC Flow Simulation Bar */}
              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-[#05070d]/80 ring-1 ring-slate-200/80 dark:ring-white/[0.07] font-mono text-xs text-slate-700 dark:text-slate-300">
                  <div className="text-[11px] text-slate-400 pb-2.5 flex items-center justify-between">
                    <span className="tracking-wider">DETERMINISTIC STATE PIPELINE:</span>
                    <span className="text-cyan-400 flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      REACTIVE STREAM
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#111827] ring-1 ring-slate-300 dark:ring-white/10 font-semibold shadow-xs">
                      User Event
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" strokeWidth={1.5} />
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-400/30 font-bold">
                      BLoC Machine
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" strokeWidth={1.5} />
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#111827] ring-1 ring-slate-300 dark:ring-white/10 font-semibold shadow-xs">
                      Domain Entity
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" strokeWidth={1.5} />
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30 font-bold">
                      Immutable State
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                <span>Strict Clean Separation</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                <span>Zero Side-Effect Testing</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tile 2: 4 Cols - Offline-First Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-4 doppelrand-shell group"
        >
          <div className="doppelrand-core p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full ring-1 ring-cyan-400/25">
                  OFFLINE-FIRST ENGINE
                </span>
                <WifiOff className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {lang === "th"
                  ? "ระบบ Offline-First ที่วางใจได้ 100%"
                  : "Predictable Offline-First"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === "th"
                  ? "ย้าย Logic การคำนวณและประเมินผลมาไว้บน Client พร้อมฐานข้อมูล Local (SQLite) ทำงานลื่นไหลแบบ Zero-Latency แม้ในพื้นที่อับสัญญาณ"
                  : "Architecting systems that operate reliably without network connectivity. Migrating evaluation algorithms to client caching for instant offline response."}
              </p>

              {/* Technical Telemetry Readout */}
              <div className="pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-[#05070d]/80 ring-1 ring-slate-200 dark:ring-white/[0.07] font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Database className="w-3 h-3 text-cyan-400" />
                      STORAGE ENGINE:
                    </span>
                    <span className="font-bold px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30">
                      SQLITE + HIVE
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>CACHE DISCIPLINE:</span>
                    <span className="text-cyan-400 font-semibold">Zero-Latency Local</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>SYNC QUEUE:</span>
                    <span className="text-slate-700 dark:text-slate-200">Background Retry</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] text-[11px] font-mono text-cyan-400 font-semibold">
              Deterministic &bull; Zero Lag &bull; 100% Reliable
            </div>
          </div>
        </motion.div>

        {/* Tile 3: 5 Cols - Human-Centric & Field Testing */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5 doppelrand-shell group"
        >
          <div className="doppelrand-core p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full ring-1 ring-cyan-400/25">
                  HUMAN-CENTRIC & FIELD TESTING
                </span>
                <HeartPulse className="w-4 h-4 text-rose-500" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {lang === "th"
                  ? "ทดสอบภาคสนามกับผู้ใช้งานจริง (Field Testing)"
                  : "Tested in Real Environments"}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === "th"
                  ? "ลงพื้นที่ทดสอบจริงร่วมกับบุคลากรทางการแพทย์และ อสม. เพื่อปรับปรุง Interface ให้ตอบโจทย์ผู้สูงอายุและเจ้าหน้าที่หน้างานจริง ลด Human Error ให้เหลือศูนย์"
                  : "Field-tested with real healthcare workers and volunteers in rural clinics. Turning complex medical guidelines into intuitive interfaces that prevent user error."}
              </p>

              <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-[#05070d]/80 ring-1 ring-slate-200 dark:ring-white/[0.07] text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>USER TEST GROUP:</span>
                  <span className="text-slate-900 dark:text-slate-200 font-bold">
                    อสม. & พยาบาล
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>ERROR REDUCTION:</span>
                  <span className="text-emerald-500 font-bold">
                    100% Validated Forms
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Users className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
              <span>Direct Community Impact</span>
            </div>
          </div>
        </motion.div>

        {/* Tile 4: 7 Cols - Academic Leadership & Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-7 doppelrand-shell group"
        >
          <div className="doppelrand-core p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full ring-1 ring-cyan-400/25">
                  ACADEMIC & LEADERSHIP FOUNDATION
                </span>
                <GraduationCap className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
              </div>

              <div>
                <p className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                  {lang === "th"
                    ? personal.education.universityTh
                    : personal.education.universityEn}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                  {lang === "th"
                    ? personal.education.degreeTh
                    : personal.education.degreeEn}{" "}
                  &bull; {personal.education.yearsEn}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-[#05070d]/70 ring-1 ring-slate-200 dark:ring-white/[0.06]">
                  <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                    <span>
                      {t("ผู้ช่วยสอน (TA 3 ภาค)", "3x Teaching Assistant")}
                    </span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-[11px]">
                    {t(
                      "ดูแลรายวิชา Web Programming, Database Systems และ Computer Logic",
                      "Mentored students in Web, Relational Databases, and Algorithmic Logic.",
                    )}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-[#05070d]/70 ring-1 ring-slate-200 dark:ring-white/[0.06]">
                  <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                    <span>
                      {t("วิทยากรบรรยายด้าน AI", "Guest AI Keynote Speaker")}
                    </span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-[11px]">
                    {t(
                      "บรรยายแก่นักเรียนห้อง Gifted Computer โรงเรียนจักรคำคณาทร",
                      "Delivered workshop on Generative AI & Developer Tooling for Gifted students.",
                    )}
                  </p>
                </div>
              </div>

              {/* Academic Reference */}
              {personal.reference && (
                <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                    <span className="text-slate-500">Academic Ref:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {lang === "th"
                        ? personal.reference.nameTh
                        : personal.reference.nameEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${personal.reference.phone.replace(/[^0-9]/g, "")}`}
                      className="text-slate-600 dark:text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <span>{personal.reference.phone}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a
                      href={`mailto:${personal.reference.email}`}
                      className="text-slate-600 dark:text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <span>Email</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBento;
