import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { ExperienceItem } from "../../../types";
import { SpotlightCard } from "../../reactbits/SpotlightCard";

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
}) => {
  const { lang } = useLanguage();
  const isEven = index % 2 === 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "internship":
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case "ta":
        return <GraduationCap className="w-4 h-4 text-sky-400" />;
      case "speaker":
        return <Award className="w-4 h-4 text-amber-400" />;
      default:
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getSpotlightColor = (type: string) => {
    if (type === "internship") return "rgba(6, 182, 212, 0.15)";
    if (type === "ta") return "rgba(56, 189, 248, 0.15)";
    return "rgba(245, 158, 11, 0.15)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex flex-col md:flex-row items-start ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Timeline Center Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#06b6d4] z-10">
        {getTypeIcon(experience.type)}
      </div>

      {/* Content Box */}
      <div className="ml-12 md:ml-0 md:w-1/2 md:px-8 w-full">
        <SpotlightCard
          spotlightColor={getSpotlightColor(experience.type)}
          className="border-zinc-800 hover:border-zinc-700"
        >
          {/* Badge & Period */}
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-zinc-800 text-emerald-300 border border-zinc-700">
              {lang === "th" ? experience.badgeTh : experience.badgeEn}
            </span>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {lang === "th" ? experience.periodTh : experience.periodEn}
            </span>
          </div>

          {/* Role & Company */}
          <h3 className="text-xl font-bold text-white tracking-tight">
            {lang === "th" ? experience.roleTh : experience.roleEn}
          </h3>
          <p className="text-xs sm:text-sm font-semibold font-mono text-cyan-400 mt-0.5">
            {lang === "th" ? experience.companyTh : experience.companyEn}
          </p>

          <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono mt-1 mb-3">
            <MapPin className="w-3 h-3 text-rose-400" />
            {lang === "th" ? experience.locationTh : experience.locationEn}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 mt-3 leading-relaxed">
            {lang === "th"
              ? experience.descriptionTh
              : experience.descriptionEn}
          </p>

          {/* Key Achievements / Bullets */}
          <div className="mt-4 space-y-1.5 border-t border-zinc-800/80 pt-3">
            {(lang === "th"
              ? experience.bulletsTh
              : experience.bulletsEn
            ).map((bullet, aIdx) => (
              <div
                key={aIdx}
                className="flex items-start gap-2 text-xs text-zinc-400"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
            {experience.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </motion.div>
  );
};
