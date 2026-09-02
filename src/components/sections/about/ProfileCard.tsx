import React from "react";
import { Code2, MapPin } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { PersonalInfo } from "../../../types";

interface ProfileCardProps {
  personal: PersonalInfo;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ personal }) => {
  const { lang } = useLanguage();

  return (
    <div className="md:col-span-1 lg:col-span-1" data-cursor-text="Oven">
      <div className="group relative h-full min-h-[380px] sm:min-h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950/90 shadow-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-500">
        {/* Profile Background Image with Smooth Hover Zoom */}
        <img
          src="/profile.jpg"
          alt={personal.nameEn}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Glassmorphic Cyberpunk Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-emerald-950/10 mix-blend-overlay pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="relative z-10 p-4 sm:p-5 flex items-center justify-end pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
            {personal.nickname} ({lang === "th" ? "โอเว่น" : "Oven"})
          </span>
        </div>

        {/* Bottom Profile Details Overlay */}
        <div className="relative z-10 p-5 sm:p-6 space-y-2">
          <div className="space-y-0.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
              {lang === "th" ? personal.nameTh : personal.nameEn}
            </h3>
            <p className="text-xs sm:text-sm font-semibold font-mono text-emerald-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              {lang === "th" ? personal.titleTh : personal.titleEn}
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300 font-mono">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              {lang === "th" ? "เชียงใหม่" : "Chiang Mai"}
            </span>
            <span className="text-[11px] text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/40">
              Maejo IT #2569
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
