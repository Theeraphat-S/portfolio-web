import React, { useState } from "react";
import { MapPin, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";
import { SpotlightCard } from "../../reactbits/SpotlightCard";
import { ContactEmailCard } from "./ContactEmailCard";
import { ContactGitHubCard } from "./ContactGitHubCard";

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger direct mailto client with pre-filled content
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 dark:border-cyan-800/60 inline-flex items-center gap-1.5">
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
              "หากต้องการติดต่อสอบถาม แลกเปลี่ยนไอเดีย หรือสนใจร่วมงาน สามารถส่งข้อความหรือติดต่อผ่านช่องทางด้านล่าง",
              "Feel free to send a direct message or reach out via Email/GitHub for opportunities and collaboration.",
            )}
          </p>
        </div>

        {/* High-Contrast Message Form & Quick Contact Deck */}
        <div className="space-y-6">
          <SpotlightCard
            spotlightColor="rgba(6, 182, 212, 0.15)"
            className="p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t("ชื่อของคุณ", "Your Name")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      lang === "th" ? "เช่น สมชาย ใจดี" : "e.g. Alex Smith"
                    }
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t("อีเมลของคุณ", "Your Email")}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  {t("ข้อความหรือรายละเอียดงาน", "Your Message")}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    lang === "th"
                      ? "รายละเอียดโปรเจกต์ โอกาสร่วมงาน หรือหัวข้อที่ต้องการปรึกษา..."
                      : "Briefly explain the role, opportunity, or collaboration idea..."
                  }
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                {formSubmitted ? (
                  <span className="text-xs font-mono text-cyan-500 flex items-center gap-1.5 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    {t(
                      "เปิดโปรแกรมส่งอีเมลเรียบร้อยแล้ว!",
                      "Mail client launched!",
                    )}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-zinc-500">
                    {t(
                      "* ส่งตรงไปยังกล่องจดหมายอีเมลส่วนตัว",
                      "* Opens direct mail client to inbox",
                    )}
                  </span>
                )}

                <button
                  type="submit"
                  data-cursor-text="Send"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t("ส่งข้อความ", "Send Message")}</span>
                </button>
              </div>
            </form>
          </SpotlightCard>

          {/* Direct Cards Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <ContactEmailCard email={personal.email} />
            <ContactGitHubCard
              githubUrl={personal.github}
              githubUsername={personal.githubUsername}
            />
          </div>

          {/* Location Footer */}
          <div className="pt-2 flex items-center justify-center text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              {lang === "th" ? personal.locationTh : personal.locationEn}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
