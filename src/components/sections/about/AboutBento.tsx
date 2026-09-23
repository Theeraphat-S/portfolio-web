import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Award, Briefcase, UserCheck, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";

export const AboutBento: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  const approachPillars = [
    {
      num: "01",
      titleTh: "สถาปัตยกรรมที่คิดมาอย่างรอบคอบ",
      titleEn: "Thoughtful & Scalable Architecture",
      descTh:
        "ออกแบบโมบายแอปพลิเคชันด้วย Flutter & Dart ควบคู่สถาปัตยกรรม BLoC และ Clean Architecture เพื่อให้ State และ Business Logic มีความแน่นอน ดูแลรักษาและทดสอบได้ง่ายในระยะยาว",
      descEn:
        "Specialized in mobile engineering that is both clean and resilient. Leveraging Flutter, Dart, and BLoC to enforce deterministic state machines and testable domain layers.",
    },
    {
      num: "02",
      titleTh: "ระบบ Offline-First ที่วางใจได้ 100%",
      titleEn: "Predictable State & Offline-First",
      descTh:
        "ออกแบบระบบให้พร้อมทำงานได้เสมอแม้ไม่มีสัญญาณอินเทอร์เน็ต ย้าย Logic คำนวณความเสี่ยงและ Form Validation มาทำงานบน Client ช่วยให้ผู้ใช้งานหน้างานทำงานได้แบบ Zero-Latency",
      descEn:
        "Architecting systems that operate reliably without network connectivity. Migrating core algorithms to client-side caching and validation for zero-latency operations.",
    },
    {
      num: "03",
      titleTh: "จากแนวคิดสู่การใช้งานจริง (Human-Centric)",
      titleEn: "Concept to Execution with Real Humans",
      descTh:
        "ลงพื้นที่ทดสอบภาคสนาม (Field Testing) ร่วมกับบุคลากรทางการแพทย์และ อสม. จริง รับฟังฟีดแบ็กหน้างานเพื่อปรับปรุง UI ให้ใช้งานง่ายที่สุด ไม่ใช่แค่สร้างตามสเปกบนกระดาษ",
      descEn:
        "Field-testing with healthcare workers and volunteers in rural areas. Translating complex medical criteria into intuitive visual range sliders that eliminate user error.",
    },
  ];

  return (
    <section id="about" className="py-20 border-b border-zinc-200 dark:border-[#243b30]">
      {/* Section Subtitle & Heading */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="text-xs font-mono text-[#18231d] dark:text-[#bfdb39] uppercase tracking-widest font-semibold">
          01 // {t("แนวคิดและตัวตน", "APPROACH & VALUES")}
        </span>
        <div className="h-px bg-zinc-200 dark:bg-[#243b30] flex-1" />
      </motion.div>

      {/* Main Karolina-Style Intro */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="space-y-4 mb-14"
      >
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#18231d] dark:text-[#fafafa] leading-tight">
          {lang === "th"
            ? "ทุ่มเทและหลงใหลในการพัฒนา Mobile Application ตั้งแต่ปี 2565"
            : "Living and breathing mobile engineering since 2022"}
        </h2>
        <p className="text-zinc-600 dark:text-[#c2c2c2] max-w-3xl text-base sm:text-lg leading-relaxed">
          {lang === "th"
            ? "โค้ดที่ดีไม่ใช่แค่ทำงานได้ แต่คือระบบของการตัดสินใจที่อยู่บนพื้นฐานของตรรกะ สถาปัตยกรรมที่ยั่งยืน และความเข้าอกเข้าใจผู้ใช้งานจริง"
            : "Good software isn't just syntax. It's a system of thoughtful decisions rooted in logic, architecture, and genuine empathy for the humans using it."}
        </p>
      </motion.div>

      {/* 3 Numbered Approach Cards (Karolina Hess Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {approachPillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="p-6 rounded-xl border border-zinc-200 dark:border-[#243b30] bg-white dark:bg-[#121e17] shadow-xs dark:shadow-none hover:border-[#bfdb39]/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-2xl font-bold font-mono text-[#18231d] dark:text-[#bfdb39] block">
                [{pillar.num}]
              </span>
              <h3 className="text-lg font-bold text-[#18231d] dark:text-[#fafafa] leading-snug">
                {lang === "th" ? pillar.titleTh : pillar.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#c2c2c2] leading-relaxed">
                {lang === "th" ? pillar.descTh : pillar.descEn}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-[#243b30]/60">
              <span className="text-[11px] font-mono text-[#bfdb39] font-medium">
                Pillar {pillar.num} &bull; Core Value
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Structured Credentials & Academic Reference */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Education & Academic Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="md:col-span-8 p-6 rounded-xl border border-zinc-200 dark:border-[#243b30] bg-white dark:bg-[#121e17] space-y-4"
        >
          <div className="flex items-center gap-2 text-[#bfdb39]">
            <GraduationCap className="w-4 h-4" />
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
              {t("ประวัติการศึกษาและการถ่ายทอดความรู้", "Education & Departmental Leadership")}
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-bold text-base text-[#18231d] dark:text-[#fafafa]">
                {lang === "th" ? personal.education.universityTh : personal.education.universityEn}
              </p>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-[#c2c2c2]">
                {lang === "th" ? personal.education.degreeTh : personal.education.degreeEn} &bull; {personal.education.yearsEn}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-[#243b30] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold text-[#18231d] dark:text-[#fafafa] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#bfdb39]" />
                  <span>{t("ผู้ช่วยสอน (TA 3 ภาคการศึกษา)", "3x Teaching Assistant")}</span>
                </p>
                <p className="text-zinc-600 dark:text-[#969696] mt-1 leading-relaxed">
                  {t(
                    "ดูแลรายวิชา Web Programming, Database Systems และ Computer Logic",
                    "Mentored 100+ students in Web, Relational Databases, and Algorithmic Logic.",
                  )}
                </p>
              </div>

              <div>
                <p className="font-bold text-[#18231d] dark:text-[#fafafa] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#bfdb39]" />
                  <span>{t("วิทยากรบรรยายด้าน AI", "Guest AI Keynote Speaker")}</span>
                </p>
                <p className="text-zinc-600 dark:text-[#969696] mt-1 leading-relaxed">
                  {t(
                    "บรรยายแก่นักเรียน ม.4 ห้อง Gifted Computer โรงเรียนจักรคำคณาทร",
                    "Delivered workshop on Generative AI & Developer Tooling for Gifted students.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Academic Reference (Dr. Jakkrit Techo) */}
        {personal.reference && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="md:col-span-4 p-6 rounded-xl border border-zinc-200 dark:border-[#243b30] bg-white dark:bg-[#121e17] space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#bfdb39]">
                <UserCheck className="w-4 h-4" />
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold">
                  {t("บุคคลอ้างอิงทางวิชาการ", "Academic Reference")}
                </h4>
              </div>
              <p className="font-bold text-sm text-[#18231d] dark:text-[#fafafa]">
                {lang === "th" ? personal.reference.nameTh : personal.reference.nameEn}
              </p>
              <p className="text-xs text-zinc-600 dark:text-[#969696] leading-relaxed">
                {lang === "th" ? personal.reference.roleTh : personal.reference.roleEn}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-[#243b30] space-y-1 text-xs font-mono">
              <a
                href={`tel:${personal.reference.phone.replace(/[^0-9]/g, "")}`}
                className="text-zinc-700 dark:text-[#c2c2c2] hover:text-[#bfdb39] flex items-center gap-1"
              >
                <span>Tel: {personal.reference.phone}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </a>
              <a
                href={`mailto:${personal.reference.email}`}
                className="text-zinc-700 dark:text-[#c2c2c2] hover:text-[#bfdb39] flex items-center gap-1 break-all"
              >
                <span>{personal.reference.email}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutBento;
