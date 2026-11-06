import React, { useRef } from "react";
import { BilingualStack } from "../../BilingualStack";
import { ChapterBridge } from "../../ChapterBridge";
import { aboutData, bridgeFor } from "../../../data";
import type { AboutHeadline } from "../../../types";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../../../context/LanguageContext";

const Headline: React.FC<{ copy: AboutHeadline }> = ({ copy }) => (
  <>
    {copy.lead}
    <span className="text-primary">{copy.highlight}</span>
    {copy.rest}
  </>
);

/** The Approach chapter: one statement, how it shows up in practice, and the
 * credentials behind it, kept short so the work arrives sooner. */
export const AboutBento: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const about = aboutData;

  // The opening of the chapter rises with the scroll as the Hero headline
  // lifts away, settling once its top is 60% down the viewport.
  const openingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: openingRef,
    offset: ["start end", "start 60%"],
  });
  const openingOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const openingY = useTransform(scrollYProgress, [0, 1], [32, 0]);

  return (
    <section id="about" className="py-12 border-b border-line">
      <m.div
        ref={openingRef}
        style={
          shouldReduceMotion
            ? undefined
            : { opacity: openingOpacity, y: openingY }
        }
      >
        <span className="editorial-eyebrow text-primary mb-6">
          01 // {t(about.eyebrowTh, about.eyebrowEn)}
        </span>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="space-y-4 lg:col-span-7">
            <BilingualStack
              as="h2"
              className="text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-white leading-[1.2]"
              th={<Headline copy={about.headlineTh} />}
              en={<Headline copy={about.headlineEn} />}
            />
            <ChapterBridge
              bridge={bridgeFor("about")}
              className="text-base text-zinc-300 font-light leading-relaxed max-w-[65ch]"
            />
            <BilingualStack
              className="text-sm text-zinc-400 leading-relaxed max-w-[65ch]"
              th={about.practiceTh}
              en={about.practiceEn}
            />
          </div>

          <dl
            aria-label={t(about.credentialsLabelTh, about.credentialsLabelEn)}
            className="lg:col-span-5 self-start border-t border-line"
          >
            {about.credentials.map((item) => (
              <div
                key={item.id}
                className="py-3 border-b border-line flex flex-col gap-1"
              >
                <dt className="flex items-baseline justify-between gap-3 font-mono text-xs text-zinc-400">
                  <BilingualStack
                    as="span"
                    className="uppercase tracking-wider"
                    th={item.labelTh}
                    en={item.labelEn}
                  />
                  <BilingualStack
                    as="span"
                    className="tabular-nums whitespace-nowrap"
                    th={item.periodTh}
                    en={item.periodEn}
                  />
                </dt>
                <dd>
                  <BilingualStack
                    className="text-sm font-medium text-zinc-100 leading-snug"
                    th={item.valueTh}
                    en={item.valueEn}
                  />
                  <BilingualStack
                    className="text-xs text-zinc-400 leading-normal"
                    th={item.detailTh}
                    en={item.detailEn}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </m.div>
    </section>
  );
};

export default AboutBento;
