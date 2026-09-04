import React from "react";
import { MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SpotlightCard } from "../../reactbits/SpotlightCard";
import { ContactEmailCard } from "./ContactEmailCard";
import { ContactGitHubCard } from "./ContactGitHubCard";
import { FAQAccordion } from "./FAQAccordion";

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 dark:border-emerald-800/60 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t("ติดต่อและร่วมงาน", "Get in Touch")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-3 tracking-tight">
            {t(
              "สนใจร่วมงานหรือพูดคุยเกี่ยวกับโปรเจกต์",
              "Let's Connect & Build Great Apps",
            )}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
            {t(
              "หากต้องการติดต่อสอบถาม แลกเปลี่ยนไอเดีย หรือสนใจร่วมงาน สามารถติดต่อได้โดยตรงผ่านช่องทางด้านล่าง",
              "Feel free to reach out directly via Email or connect on GitHub for opportunities and collaboration.",
            )}
          </p>
        </div>

        {/* Centered Direct Contact Hub */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.15)"
          className="p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <ContactEmailCard email={personal.email} />
            <ContactGitHubCard
              githubUrl={personal.github}
              githubUsername={personal.githubUsername}
            />
          </div>

          {/* Location Footer */}
          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              {lang === "th" ? personal.locationTh : personal.locationEn}
            </span>
          </div>
        </SpotlightCard>

        {/* Clean FAQ Accordion */}
        <FAQAccordion />
      </div>
    </section>
  );
};

export default ContactSection;
