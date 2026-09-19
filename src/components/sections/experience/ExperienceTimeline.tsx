import React, { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { ExperienceItem } from "../../../types";
import { ExperienceCard } from "./ExperienceCard";

export const ExperienceTimeline: React.FC = () => {
  const { t } = useLanguage();
  const { experiences } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"],
  });

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
            {t("เส้นทางและประสบการณ์", "Experience & Milestones")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {t(
              "ประสบการณ์ทำงานและผลงานวิชาการ",
              "Career Journey & Academic Impact",
            )}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            {t(
              "จากการฝึกงานพัฒนาแอปพลิเคชันเชิงพาณิชย์ สู่การเป็นผู้ช่วยสอน TA 3 เทอม และวิทยากรบรรยายด้าน AI",
              "Proven track record across commercial app development, 3 semesters of university TA mentorship, and AI keynote speaking.",
            )}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Background Track Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-zinc-800/70" />

          {/* Scroll-Linked Dynamic Filling Line */}
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-sky-400 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
          />

          <div className="space-y-12">
            {experiences.map((exp: ExperienceItem, idx: number) => (
              <ExperienceCard key={idx} experience={exp} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
