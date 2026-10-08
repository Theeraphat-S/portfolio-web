import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, FileText, ArrowDown, MapPin } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { scrollToElement } from "../../../lib/lenis";
import { personalData, portfolioData } from "../../../data";
import { BilingualStack } from "../../BilingualStack";

export const Hero: React.FC = () => {
  const { lang, t, toggleLang } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const cardParallax = useTransform(scrollYProgress, [0, 1], [0, 28]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="intro"
      ref={heroRef}
      className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 border-b border-white/[0.08]"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 sm:space-y-8"
      >
        {/* Identity & Status Row: who this is and what role, before anything else */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/profile.jpg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover border border-white/[0.12]"
            />
            <h1 className="flex flex-col gap-0.5 min-w-0 leading-snug tracking-tight">
              <span className="text-base sm:text-lg font-semibold text-white">
                {lang === "th" ? personalData.nameTh : personalData.nameEn}{" "}
                <span className="font-normal text-zinc-400">
                  ({personalData.nickname})
                </span>
              </span>
              <span className="text-sm font-normal text-zinc-300">
                {lang === "th" ? personalData.titleTh : personalData.titleEn}{" "}
                <span className="text-zinc-500" aria-hidden="true">
                  ·
                </span>{" "}
                {personalData.specialty}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={`Switch language. Current language is ${lang.toUpperCase()}`}
              className="min-h-11 px-3 text-[11px] font-mono tracking-wider text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 rounded-full transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff] shrink-0"
            >
              <span className={lang === "th" ? "text-[#00f0ff]" : ""}>TH</span>
              <span className="px-1.5 text-zinc-600">/</span>
              <span className={lang === "en" ? "text-[#00f0ff]" : ""}>EN</span>
            </button>
            <span className="inline-flex items-center justify-center gap-2 min-w-[170px] rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-mono text-emerald-300 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t("พร้อมเริ่มงานทันที", "OPEN FOR ROLES")}</span>
            </span>
          </div>
        </motion.div>

        {/* Monumental Editorial Display Headline + Specs Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          {/* Each line is nowrap and sized to its container, so EN and TH
              always set as exactly three lines and the toggle never shifts layout. */}
          <div className="lg:col-span-8 @container flex flex-col justify-end">
            <p className="text-[clamp(1.75rem,9.4cqi,4.85rem)] font-extrabold tracking-[-0.035em] leading-[1.05] text-white whitespace-nowrap">
              <motion.span
                variants={itemVariants}
                className="block text-zinc-300"
              >
                {lang === "th" ? "วิศวกรรมโมบาย" : "ENGINEERING"}
              </motion.span>
              <motion.span variants={itemVariants} className="block text-white">
                {lang === "th" ? "ระดับ PRODUCTION" : "HIGH-PERFORMANCE"}
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="block text-[#00f0ff]"
              >
                {lang === "th" ? "FLUTTER & DART." : "MOBILE SYSTEMS."}
              </motion.span>
            </p>
          </div>

          {/* Shipped work: one verified outcome per project, so a recruiter
              sees proof in the first viewport instead of a spec list. */}
          <motion.div
            variants={itemVariants}
            style={{ y: shouldReduceMotion ? 0 : cardParallax }}
            className="lg:col-span-4 flex flex-col justify-end"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-[20px]">
              <BilingualStack
                as="span"
                className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400"
                th="ผลงานที่ส่งมอบ"
                en="Shipped work"
              />
              <ul className="mt-3 divide-y divide-white/[0.06]">
                {portfolioData.projects.map((project) => (
                  <li key={project.id} className="py-2.5 first:pt-0 last:pb-0">
                    <a
                      href="#work"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToElement("work", 76);
                      }}
                      className="group block rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
                    >
                      <span className="block font-mono text-xs font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
                        {project.shortName ?? project.titleEn}
                      </span>
                      <BilingualStack
                        as="span"
                        className="mt-0.5 block text-sm leading-snug text-zinc-300"
                        th={project.proofTh ?? project.descriptionTh}
                        en={project.proofEn ?? project.descriptionEn}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Narrative & Action CTAs - Placed above the fold */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-1"
        >
          {/* Both languages occupy the same grid cell; the inactive one is
              invisible, so the block always takes the taller height and the
              language toggle cannot shift the CTAs below. */}
          <div className="lg:col-span-7 grid">
            <p
              lang="th"
              aria-hidden={lang !== "th"}
              className={`col-start-1 row-start-1 text-base sm:text-lg text-zinc-300 font-light leading-relaxed ${lang === "th" ? "" : "invisible"}`}
            >
              บัณฑิต IT มหาวิทยาลัยแม่โจ้ ผู้เชี่ยวชาญการออกแบบและพัฒนา
              Cross-platform Mobile Application ด้วย{" "}
              <strong className="text-white font-medium underline decoration-[#00f0ff]/40 decoration-1 underline-offset-4">
                Flutter, Dart & BLoC
              </strong>{" "}
              ส่งมอบโปรเจกต์ใช้งานจริงระดับ Production ทั้งระบบคัดกรองโรค
              (NCDs), ฟีเจอร์แอปพลิเคชัน Pinto และระบบ POS ออฟไลน์
            </p>
            <p
              lang="en"
              aria-hidden={lang !== "en"}
              className={`col-start-1 row-start-1 text-base sm:text-lg text-zinc-300 font-light leading-relaxed ${lang === "en" ? "" : "invisible"}`}
            >
              Maejo University IT graduate specializing in cross-platform mobile
              engineering with{" "}
              <strong className="text-white font-medium underline decoration-[#00f0ff]/40 decoration-1 underline-offset-4">
                Flutter, Dart & BLoC
              </strong>
              . Proven track record shipping production applications across
              preventive healthcare screening (NCDs), commercial logistics
              (Pinto), and offline-capable retail POS architectures.
            </p>
          </div>

          {/* Fixed button widths: the row wraps identically in TH and EN. */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center lg:justify-end">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToElement("work", 76);
              }}
              data-cursor-text="EXPLORE"
              className="btn-editorial btn-editorial-primary group h-12 px-4 sm:w-48 justify-center whitespace-nowrap"
            >
              <span>{t("ดูผลงาน", "EXPLORE WORK")}</span>
              <ArrowDown className="w-4 h-4 text-[#07080c] group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="RESUME"
              className="btn-editorial btn-editorial-outline group h-12 px-4 sm:w-48 justify-center whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-zinc-400 group-hover:text-[#00f0ff] transition-colors" />
              <span>{t("เปิด CV", "RESUME / CV")}</span>
              <ArrowUpRight className="hidden sm:block w-3.5 h-3.5 text-zinc-500 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href={`mailto:${personalData.email}`}
              className="col-span-2 inline-flex h-12 items-center px-3 text-sm text-zinc-300 hover:text-[#00f0ff] underline underline-offset-4 transition-colors sm:w-36 justify-center sm:justify-start"
            >
              {t("ติดต่อทางอีเมล", "Email me")}
            </a>
          </div>
        </motion.div>

        {/* Location & Modality Notice */}
        <motion.p
          variants={itemVariants}
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-mono text-zinc-400 pt-1 min-h-[1.5rem]"
        >
          <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>
            {t(
              "เชียงใหม่ ประเทศไทย • ยินดีทำงาน Onsite / Hybrid / Remote",
              "Chiang Mai, Thailand • Open to Onsite, Hybrid, or Remote roles",
            )}
          </span>
          <span className="text-zinc-600" aria-hidden="true">
            •
          </span>
          <a
            href={`tel:${personalData.phone.replace(/-/g, "")}`}
            className="hover:text-[#00f0ff] underline-offset-4 hover:underline transition-colors"
          >
            {personalData.phone}
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
