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
    <section className="py-16 md:py-24 border-b border-zinc-200 dark:border-[#243b30]">
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#18231d] dark:text-[#bfdb39] bg-[#bfdb39]/20 dark:bg-[#bfdb39]/15 border border-[#bfdb39]/40 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-[#bfdb39] animate-pulse" />
              {t("เปิดรับงานใหม่อย่างเป็นทางการ", "Available for Opportunities")}
            </span>
            <span className="text-xs font-mono text-zinc-500 dark:text-[#969696]">
              [03] Selected Works
            </span>
          </motion.div>

          {/* Karolina Hess-Style Giant Headline */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#18231d] dark:text-[#fafafa] leading-[1.05]">
              {lang === "th" ? (
                <>
                  {personal.nameTh}
                  <span className="text-zinc-400 dark:text-[#969696] font-normal text-2xl sm:text-3xl lg:text-4xl block mt-2">
                    Mobile Application Developer
                  </span>
                </>
              ) : (
                <>
                  Mobile Application
                  <span className="text-zinc-400 dark:text-[#969696] block font-light">
                    Developer
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Punchy Manifesto */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-lg sm:text-xl font-semibold text-[#18231d] dark:text-[#bfdb39] leading-snug">
              &ldquo;
              {lang === "th"
                ? "ผมสร้างแอปพลิเคชันด้วยความใส่ใจ ไม่มีเทมเพลต ไม่มีทางลัด"
                : "I build with care. No templates, no shortcuts."}
              &rdquo;
            </p>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-[#c2c2c2] max-w-xl leading-relaxed">
              {lang === "th" ? personal.taglineTh : personal.taglineEn}
            </p>
          </motion.div>

          {/* Key Engineering Pillars in Forest/Lime Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-zinc-600 dark:text-[#969696]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#bfdb39] shrink-0" />
              <span>Flutter, Dart & BLoC Pattern</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#bfdb39] shrink-0" />
              <span>Offline-First & Local DB (SQLite/Hive)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#bfdb39] shrink-0" />
              <span>Clean Architecture & Domain Models</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#bfdb39] shrink-0" />
              <span>RESTful APIs & Backend Integration</span>
            </div>
          </motion.div>

          {/* Action Links */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#bfdb39] hover:bg-[#aebd33] text-[#18231d] font-bold text-sm rounded transition-colors shadow-xs cursor-pointer"
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
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#121e17] dark:hover:bg-[#1a2b22] text-[#18231d] dark:text-[#e9e8e8] border border-zinc-200 dark:border-[#243b30] hover:border-[#bfdb39] text-sm font-mono rounded transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#bfdb39]" />
              <span>{t("ดาวน์โหลด CV", "Resume CV")}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#121e17] dark:hover:bg-[#1a2b22] text-[#18231d] dark:text-[#e9e8e8] border border-zinc-200 dark:border-[#243b30] hover:border-[#bfdb39] text-sm font-mono rounded transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>

            {personal.phone && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${personal.phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#121e17] dark:hover:bg-[#1a2b22] text-[#18231d] dark:text-[#e9e8e8] border border-zinc-200 dark:border-[#243b30] hover:border-[#bfdb39] text-sm font-mono rounded transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#bfdb39]" />
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
          <div className="border border-zinc-200 dark:border-[#243b30] bg-white dark:bg-[#121e17] rounded-xl p-6 shadow-xs dark:shadow-none hover:border-[#355243] transition-colors">
            {/* Header of spec sheet */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-[#243b30] text-xs font-mono text-zinc-500 dark:text-[#969696]">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#bfdb39]" />
                <span className="font-semibold">DEV_SPEC // THEERAPHAT</span>
              </div>
              <span className="text-[#bfdb39] font-bold">[ONLINE]</span>
            </div>

            {/* Profile Photo and Quick Coordinates */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="w-20 h-24 rounded-lg border border-zinc-300 dark:border-[#243b30] overflow-hidden bg-zinc-100 dark:bg-[#18231d] shrink-0 shadow-xs"
              >
                <img
                  src="/profile.jpg"
                  alt={personal.nameEn}
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
              <div className="space-y-1 text-xs">
                <p className="font-bold text-[#18231d] dark:text-[#fafafa] text-sm">
                  {lang === "th" ? personal.nameTh : personal.nameEn}
                </p>
                <p className="text-zinc-500 dark:text-[#969696] font-mono text-[11px]">
                  {personal.titleEn}
                </p>
                <p className="flex items-center gap-1 text-zinc-500 dark:text-[#969696] font-mono text-[11px] pt-1">
                  <MapPin className="w-3 h-3 text-[#bfdb39]" />
                  {lang === "th" ? personal.locationTh : personal.locationEn}
                </p>
              </div>
            </div>

            {/* Structured Specifications Table */}
            <dl className="space-y-2 text-xs font-mono divide-y divide-zinc-200 dark:divide-[#243b30] pt-1">
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-500 dark:text-[#969696]">{t("สถาบันศึกษา", "Education")}</dt>
                <dd className="text-[#18231d] dark:text-[#e9e8e8] text-right font-medium">
                  {lang === "th"
                    ? personal.education.universityTh
                    : "Maejo University (B.Sc. IT)"}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-500 dark:text-[#969696]">{t("สถานะการศึกษา", "Timeline")}</dt>
                <dd className="text-[#18231d] dark:text-[#e9e8e8] text-right">
                  {lang === "th"
                    ? personal.education.yearsTh
                    : personal.education.yearsEn}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-500 dark:text-[#969696]">{t("บทบาทพิเศษ", "Roles")}</dt>
                <dd className="text-[#bfdb39] text-right font-medium">
                  {t("3x TA & วิทยากร AI", "3x Teaching Assistant & Speaker")}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-500 dark:text-[#969696]">{t("รูปแบบงาน", "Work Mode")}</dt>
                <dd className="text-[#18231d] dark:text-[#e9e8e8] text-right">
                  Onsite / Hybrid / Remote
                </dd>
              </div>
              {personal.expectedSalaryEn && (
                <div className="flex justify-between pt-2">
                  <dt className="text-zinc-500 dark:text-[#969696]">{t("เงินเดือนที่คาดหวัง", "Expected Salary")}</dt>
                  <dd className="text-[#18231d] dark:text-[#bfdb39] font-bold text-right">
                    {lang === "th" ? personal.expectedSalaryTh : personal.expectedSalaryEn}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Engineering Quote / Philosophy Note */}
          <div className="p-3.5 border-l-2 border-[#bfdb39] bg-zinc-100 dark:bg-[#121e17] text-xs text-zinc-600 dark:text-[#c2c2c2] italic rounded-r-lg">
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
