import React, { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FADE_UP, STAGGER } from "../../../lib/motion";
import { ArrowUpRight, FileText, ArrowDown, MapPin } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { CHAPTER_OFFSET, scrollToElement } from "../../../lib/lenis";
import { personalData, portfolioData } from "../../../data";
import { BilingualStack } from "../../BilingualStack";
import { telHref } from "../../../lib/utils";

export const Hero: React.FC = () => {
  const { lang, t, toggleLang } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const cardParallax = useTransform(scrollYProgress, [0, 1], [0, 28]);
  // Hand-off to the next chapter: the display headline lifts and dims as
  // the hero scrolls out. Name, contacts and CTAs stay fully opaque.
  // The function form keeps opacity on the JS path: Motion's ScrollTimeline
  // acceleration lost the fade near the end of this offset range.
  const headlineOpacity = useTransform(
    scrollYProgress,
    (p) => 1 - 0.85 * Math.min(1, Math.max(0, (p - 0.1) / 0.7)),
  );
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="intro"
      ref={heroRef}
      className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 border-b border-line"
    >
      <m.div
        variants={STAGGER}
        initial="hidden"
        animate="visible"
        className="space-y-6 sm:space-y-8"
      >
        {/* Identity & Status Row: who this is and what role, before anything else */}
        <m.div
          variants={FADE_UP}
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
              className="btn-press min-h-11 px-3 text-xs font-mono text-zinc-400 hover:text-white border border-line hover:border-white/20 rounded-full transition shrink-0"
            >
              <span className={lang === "th" ? "text-primary" : ""}>TH</span>
              <span className="px-1.5 text-zinc-600">/</span>
              <span className={lang === "en" ? "text-primary" : ""}>EN</span>
            </button>
            <span className="inline-flex items-center justify-center gap-2 min-w-[170px] rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-xs font-mono text-emerald-300 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{t("เปิดรับตำแหน่งงาน", "Open for roles")}</span>
            </span>
          </div>
        </m.div>

        {/* Monumental Editorial Display Headline + Specs Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          {/* Each line is nowrap and sized to its container, so EN and TH
              always set as exactly three lines and the toggle never shifts layout. */}
          <m.div
            style={
              shouldReduceMotion
                ? undefined
                : { opacity: headlineOpacity, y: headlineY }
            }
            className="lg:col-span-8 @container flex flex-col justify-end"
          >
            <p className="text-[clamp(1.75rem,9.4cqi,4.85rem)] font-semibold tracking-[-0.035em] leading-[1.05] text-white whitespace-nowrap">
              <m.span variants={FADE_UP} className="block text-zinc-300">
                {lang === "th" ? "สร้างโมบายแอป" : "Building"}
              </m.span>
              <m.span variants={FADE_UP} className="block text-white">
                {lang === "th" ? "ที่ใช้งานได้จริง" : "mobile apps"}
              </m.span>
              <m.span variants={FADE_UP} className="block text-primary">
                {lang === "th" ? "ด้วย Flutter" : "with Flutter"}
              </m.span>
            </p>
          </m.div>

          {/* One verified outcome per project, so a recruiter
              sees proof in the first viewport instead of a spec list. */}
          <m.div
            variants={FADE_UP}
            style={{ y: shouldReduceMotion ? 0 : cardParallax }}
            className="lg:col-span-4 flex flex-col justify-end"
          >
            <div className="bezel backdrop-blur-[20px]">
              <div className="bezel-core p-2.5 sm:p-3.5 bg-surface/80 border border-line">
                <BilingualStack
                  as="span"
                  className="block font-mono text-xs text-zinc-400"
                  th="ผลงานที่ทำ"
                  en="What I built"
                />
                <ul className="mt-3 divide-y divide-line">
                  {portfolioData.projects.map((project) => (
                    <li
                      key={project.id}
                      className="py-2.5 first:pt-0 last:pb-0"
                    >
                      <a
                        href={`#case-${project.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToElement(`case-${project.id}`, CHAPTER_OFFSET);
                        }}
                        className="group block rounded"
                      >
                        <span className="block font-mono text-xs font-semibold text-white group-hover:text-signal transition-colors">
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
            </div>
          </m.div>
        </div>

        {/* Narrative & Action CTAs - Placed above the fold */}
        <m.div
          variants={FADE_UP}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-1"
        >
          {/* Both languages occupy the same grid cell; the inactive one is
              invisible, so the block always takes the taller height and the
              language toggle cannot shift the CTAs below. */}
          <div className="lg:col-span-7 grid">
            <p
              lang="th"
              aria-hidden={lang !== "th"}
              className={`col-start-1 row-start-1 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed ${lang === "th" ? "" : "invisible"}`}
            >
              บัณฑิต IT มหาวิทยาลัยแม่โจ้ นักพัฒนาโมบายระดับ Junior ที่ใช้{" "}
              <strong className="text-white font-medium underline decoration-primary/40 decoration-1 underline-offset-4">
                Flutter, Dart & BLoC
              </strong>{" "}
              เป็นหลัก พัฒนาแอปคัดกรองโรค NCDs เป็นโปรเจกต์จบ
              และได้ร่วมพัฒนาฟีเจอร์บนแอป Pinto และระบบ POS ระหว่างฝึกงาน
            </p>
            <p
              lang="en"
              aria-hidden={lang !== "en"}
              className={`col-start-1 row-start-1 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed ${lang === "en" ? "" : "invisible"}`}
            >
              Maejo University IT graduate and junior mobile developer working
              with{" "}
              <strong className="text-white font-medium underline decoration-primary/40 decoration-1 underline-offset-4">
                Flutter, Dart & BLoC
              </strong>
              . I built an NCDs risk-screening app for my capstone and shipped
              features to the Pinto app and a retail POS system during my
              internship.
            </p>
          </div>

          {/* Fixed button widths: the row wraps identically in TH and EN. */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center lg:justify-end">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToElement("work", CHAPTER_OFFSET);
              }}
              data-cursor-text="EXPLORE"
              className="btn-editorial btn-editorial-primary group h-12 pl-3.5 pr-1.5 max-sm:gap-1.5 sm:pl-4 sm:pr-2 sm:w-48 justify-center whitespace-nowrap"
            >
              <span>{t("ดูผลงาน", "Explore work")}</span>
              <span
                aria-hidden="true"
                className="cta-icon cta-icon-down bg-void/15"
              >
                <ArrowDown className="w-4 h-4 text-void" />
              </span>
            </a>

            <a
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="RESUME"
              className="btn-editorial btn-editorial-outline group h-12 px-4 sm:pr-2 sm:w-48 justify-center whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-zinc-400 group-hover:text-signal transition-colors" />
              <span>{t("เปิด CV", "Resume / CV")}</span>
              {/* No room for the circle beside the icon in the 2-up phone row. */}
              <span
                aria-hidden="true"
                className="cta-icon max-sm:hidden bg-white/[0.06]"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-signal transition-colors" />
              </span>
            </a>

            <a
              href={`mailto:${personalData.email}`}
              className="col-span-2 inline-flex h-12 items-center px-3 text-sm text-zinc-300 hover:text-signal underline underline-offset-4 transition-colors sm:w-36 justify-center sm:justify-start"
            >
              {t("ติดต่อทางอีเมล", "Email me")}
            </a>
          </div>
        </m.div>

        {/* Location & Modality Notice */}
        <m.p
          variants={FADE_UP}
          className="flex items-start gap-2 text-xs sm:text-sm font-mono text-zinc-400 pt-1 min-h-[1.5rem]"
        >
          {/* The pin stays on the first line; text and phone wrap together
              beside it, so the phone lines up under the text. */}
          <MapPin
            className="w-3.5 h-3.5 shrink-0 mt-[0.2em] sm:mt-[0.25em]"
            aria-hidden="true"
          />
          <span className="flex min-w-0 flex-wrap gap-x-4 gap-y-1">
            <span>
              {t(personalData.heroLocationTh, personalData.heroLocationEn)}
            </span>
            <a
              href={telHref(personalData.phone)}
              className="inline-flex items-center min-h-11 -my-3.5 sm:min-h-0 sm:my-0 hover:text-signal underline-offset-4 hover:underline transition-colors"
            >
              {personalData.phone}
            </a>
          </span>
        </m.p>
      </m.div>
    </section>
  );
};

export default Hero;
