import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, MapPin, Terminal, CheckCircle2, FileText, Phone } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";

export const Hero: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Bold Broadsheet Typography & Manifesto */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col space-y-6"
        >
          {/* Status & Work Counter Pill */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse" />
              {t("เปิดรับงานใหม่อย่างเป็นทางการ", "Available for Opportunities")}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              [03] Selected Works
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.05]">
              {lang === "th" ? (
                <>
                  {personal.nameTh}
                  <span className="text-slate-500 dark:text-slate-400 font-normal text-2xl sm:text-3xl lg:text-4xl block mt-2">
                    Mobile Application Developer
                  </span>
                </>
              ) : (
                <>
                  Mobile Application
                  <span className="text-slate-500 dark:text-slate-400 block font-light">
                    Developer
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Punchy Manifesto */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-lg sm:text-xl font-semibold text-sky-600 dark:text-sky-400 leading-snug">
              &ldquo;
              {lang === "th"
                ? "ผมสร้างแอปพลิเคชันด้วยความใส่ใจ ไม่มีเทมเพลต ไม่มีทางลัด"
                : "I build with care. No templates, no shortcuts."}
              &rdquo;
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              {lang === "th" ? personal.taglineTh : personal.taglineEn}
            </p>
          </motion.div>

          {/* Key Engineering Pillars */}
          <motion.div
            variants={itemVariants}
            className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-600 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
              <span>Flutter, Dart & BLoC Pattern</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
              <span>Offline-First & Local DB (SQLite/Hive)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
              <span>Clean Architecture & Domain Models</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
              <span>RESTful APIs & Backend Integration</span>
            </div>
          </motion.div>

          {/* Action Links */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded transition-colors shadow-xs cursor-pointer"
            >
              <span>{t("สำรวจผลงานและเคสทดสอบ", "Explore Selected Works")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#111827] dark:hover:bg-[#1e293b] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-sm font-mono rounded transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-500 dark:text-sky-400" />
              <span>{t("ดาวน์โหลด CV", "Resume CV")}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#111827] dark:hover:bg-[#1e293b] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-sm font-mono rounded transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>

            {personal.phone && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${personal.phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#111827] dark:hover:bg-[#1e293b] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-sm font-mono rounded transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                <span>{personal.phone}</span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Architectural Developer Spec Sheet & Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" as const }}
          className="lg:col-span-5 flex flex-col space-y-4"
        >
          <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl p-6 shadow-xs dark:shadow-none hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            {/* Header of spec sheet */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                <span className="font-semibold">DEV_SPEC // THEERAPHAT</span>
              </div>
              <span className="text-sky-500 dark:text-sky-400 font-bold">[ONLINE]</span>
            </div>

            {/* Profile Photo and Quick Coordinates */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="w-20 h-24 rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-[#0b0f19] shrink-0 shadow-xs"
              >
                <img
                  src="/profile.jpg"
                  alt={personal.nameEn}
                  className="w-full h-full object-cover object-[55%_35%] transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {lang === "th" ? personal.nameTh : personal.nameEn}
                </p>
                <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  {personal.titleEn}
                </p>
                <p className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-mono text-[11px] pt-1">
                  <MapPin className="w-3 h-3 text-sky-500 dark:text-sky-400" />
                  {lang === "th" ? personal.locationTh : personal.locationEn}
                </p>
              </div>
            </div>

            {/* Structured Specifications Table */}
            <dl className="space-y-2 text-xs font-mono divide-y divide-slate-200 dark:divide-slate-800/80 pt-1">
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500 dark:text-slate-400">{t("สถาบันศึกษา", "Education")}</dt>
                <dd className="text-slate-900 dark:text-slate-200 text-right font-medium">
                  {lang === "th"
                    ? personal.education.universityTh
                    : "Maejo University (B.Sc. IT)"}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500 dark:text-slate-400">{t("สถานะการศึกษา", "Timeline")}</dt>
                <dd className="text-slate-900 dark:text-slate-200 text-right">
                  {lang === "th"
                    ? personal.education.yearsTh
                    : personal.education.yearsEn}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500 dark:text-slate-400">{t("บทบาทพิเศษ", "Roles")}</dt>
                <dd className="text-sky-600 dark:text-sky-400 text-right font-medium">
                  {t("3x TA & วิทยากร AI", "3x Teaching Assistant & Speaker")}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500 dark:text-slate-400">{t("รูปแบบงาน", "Work Mode")}</dt>
                <dd className="text-slate-900 dark:text-slate-200 text-right">
                  Onsite / Hybrid / Remote
                </dd>
              </div>
              {personal.expectedSalaryEn && (
                <div className="flex justify-between pt-2">
                  <dt className="text-slate-500 dark:text-slate-400">{t("เงินเดือนที่คาดหวัง", "Expected Salary")}</dt>
                  <dd className="text-sky-600 dark:text-sky-400 font-bold text-right">
                    {lang === "th" ? personal.expectedSalaryTh : personal.expectedSalaryEn}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Engineering Quote / Philosophy Note */}
          <div className="p-3.5 border-l-2 border-sky-500 bg-slate-100 dark:bg-[#111827] text-xs text-slate-600 dark:text-slate-300 italic rounded-r-lg">
            &ldquo;
            {lang === "th"
              ? "ความเสถียรของแอปพลิเคชันและการตอบโจทย์ผู้ใช้งานจริง คือหัวใจของการเขียนโค้ด"
              : "Stability and human usability in real-world environments define good mobile engineering."}
            &rdquo;
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
