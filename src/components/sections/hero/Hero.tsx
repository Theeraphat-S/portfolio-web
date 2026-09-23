import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Mail, MapPin, Terminal, CheckCircle2, FileText } from "lucide-react";
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
    <section className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Asymmetrical Editorial Narrative with Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col space-y-6"
        >
          {/* Status & Category Tag */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              {t("เปิดรับงานใหม่อย่างเป็นทางการ", "Available for Opportunities")}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              Chiang Mai / Bangkok / Remote
            </span>
          </motion.div>

          {/* Headline / Title */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1]">
              {lang === "th" ? (
                <>
                  {personal.nameTh}{" "}
                  <span className="text-zinc-400 dark:text-zinc-500 font-normal text-3xl sm:text-4xl block mt-1">
                    ({personal.nickname})
                  </span>
                </>
              ) : (
                <>
                  {personal.nameEn}
                  <span className="text-zinc-400 dark:text-zinc-500 font-normal text-2xl sm:text-3xl block mt-1">
                    Mobile Application Developer
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Clear Subtitle & Focus */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed"
          >
            {lang === "th" ? personal.taglineTh : personal.taglineEn}
          </motion.p>

          {/* Key Engineering Pillars */}
          <motion.div
            variants={itemVariants}
            className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-zinc-600 dark:text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Flutter, Dart & BLoC Pattern</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Offline-First & Local DB (SQLite/Hive)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Clean Architecture & Domain Models</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>RESTful APIs & Backend Integration</span>
            </div>
          </motion.div>

          {/* Action Links */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm rounded transition-colors shadow-sm cursor-pointer"
            >
              <span>{t("สำรวจผลงานและเคสทดสอบ", "Explore Case Studies")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-sm font-mono rounded transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>{t("ดาวน์โหลดเรซูเม่", "Resume PDF")}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-sm font-mono rounded transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-sm font-mono rounded transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column: Architectural Developer Spec Sheet & Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" as const }}
          className="lg:col-span-5 flex flex-col space-y-4"
        >
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 rounded-lg p-5 shadow-xs dark:shadow-none hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            {/* Header of spec sheet */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800/80 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>SPEC // DEV_PROFILE</span>
              </div>
              <span className="text-zinc-400 dark:text-zinc-500">v2026.09</span>
            </div>

            {/* Profile Photo and Quick Coordinates */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="w-20 h-24 rounded border border-zinc-300 dark:border-zinc-700 overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 shadow-xs"
              >
                <img
                  src="/profile.jpg"
                  alt={personal.nameEn}
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {lang === "th" ? personal.nameTh : personal.nameEn}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                  {personal.titleEn}
                </p>
                <p className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-mono text-[11px] pt-1">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  {lang === "th" ? personal.locationTh : personal.locationEn}
                </p>
              </div>
            </div>

            {/* Structured Specifications Table */}
            <dl className="space-y-2 text-xs font-mono divide-y divide-zinc-200 dark:divide-zinc-800/60 pt-1">
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-500">{t("สถาบันศึกษา", "Education")}</dt>
                <dd className="text-zinc-900 dark:text-zinc-200 text-right">
                  {lang === "th"
                    ? personal.education.universityTh
                    : "Maejo University (B.Sc. IT)"}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-500">{t("สถานะการศึกษา", "Timeline")}</dt>
                <dd className="text-zinc-900 dark:text-zinc-200 text-right">
                  {lang === "th"
                    ? personal.education.yearsTh
                    : personal.education.yearsEn}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-500">{t("บทบาทพิเศษ", "Roles")}</dt>
                <dd className="text-emerald-600 dark:text-emerald-400 text-right font-medium">
                  {t("3x TA & วิทยากร AI", "3x Teaching Assistant & Speaker")}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-500">{t("รูปแบบงาน", "Work Mode")}</dt>
                <dd className="text-zinc-900 dark:text-zinc-200 text-right">
                  Onsite / Hybrid / Remote
                </dd>
              </div>
              {personal.expectedSalaryEn && (
                <div className="flex justify-between pt-2">
                  <dt className="text-zinc-500">{t("เงินเดือนที่คาดหวัง", "Expected Salary")}</dt>
                  <dd className="text-emerald-600 dark:text-emerald-400 font-semibold text-right">
                    {lang === "th" ? personal.expectedSalaryTh : personal.expectedSalaryEn}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Engineering Quote / Philosophy Note */}
          <div className="p-3 border-l-2 border-emerald-500 bg-zinc-100 dark:bg-zinc-900/20 text-xs text-zinc-600 dark:text-zinc-400 italic">
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
