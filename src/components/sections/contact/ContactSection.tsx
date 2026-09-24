import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Github,
  MapPin,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

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
    <section id="contact" className="py-16 sm:py-24">
      {/* Editorial Giant Typographic CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <span className="eyebrow-pill text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-500/25 mb-4 inline-flex">
          <Sparkles className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
          <span>{t("เริ่มงานด้วยกัน", "CONTACT & COLLABORATION")}</span>
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.02]">
          {lang === "th" ? (
            <>
              ร่วมงานกัน{" "}
              <span className="text-shiny block font-light">
                สร้างสรรค์แอปที่ดี
              </span>
            </>
          ) : (
            <>
              Let’s work{" "}
              <span className="text-shiny block font-light">
                together.
              </span>
            </>
          )}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Invitation & Coordinates */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
            {lang === "th"
              ? "ผมกำลังมองหาโอกาสร่วมงานในตำแหน่ง Mobile Developer (Flutter & Dart) พร้อมเริ่มงานทันทีทั้ง Onsite (กรุงเทพฯ/เชียงใหม่), Hybrid หรือ Remote หากมีโปรเจกต์ที่น่าสนใจ สามารถติดต่อได้โดยตรงครับ"
              : "Currently open to full-time Mobile Developer (Flutter & Dart) positions and high-impact digital products. Based in Chiang Mai, Thailand. Open to Bangkok relocation, Hybrid, or Worldwide Remote."}
          </p>

          {/* Quick Copy Email Bento Card (Doppelrand Double-Bezel) */}
          <div className="doppelrand-shell">
            <div className="doppelrand-core p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                <span>{t("ส่งอีเมลถึงผมโดยตรง", "Drop me an email:")}</span>
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <a
                  href={`mailto:${personal.email}`}
                  className="text-base sm:text-xl font-mono font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-400 transition-colors break-all"
                >
                  {personal.email}
                </a>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={copyEmail}
                  className="p-2.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white ring-1 ring-slate-200 dark:ring-white/10 hover:ring-cyan-400 bg-slate-100 dark:bg-[#05070d] rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
                  aria-label="Copy email address"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-mono text-emerald-400 block font-medium"
                >
                  {t("คัดลอกอีเมลเรียบร้อยแล้ว!", "Copied to clipboard!")}
                </motion.span>
              )}
            </div>
          </div>

          {/* Coordinates Deck (Doppelrand Double-Bezel) */}
          <div className="doppelrand-shell">
            <div className="doppelrand-core p-6 space-y-3.5 text-xs font-mono text-slate-600 dark:text-slate-400">
              {personal.phone && (
                <motion.a
                  whileHover={{ x: 3 }}
                  href={`tel:${personal.phone.replace(/[^0-9]/g, "")}`}
                  className="flex items-center justify-between hover:text-cyan-400 transition-colors py-1 border-b border-slate-100 dark:border-white/[0.05]"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      {personal.phone}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">Direct Call</span>
                </motion.a>
              )}

              <motion.a
                whileHover={{ x: 3 }}
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between hover:text-cyan-400 transition-colors py-1 border-b border-slate-100 dark:border-white/[0.05]"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    github.com/{personal.githubUsername}
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </motion.a>

              <div className="flex items-start gap-2 pt-1 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  {lang === "th"
                    ? (personal.addressTh ?? personal.locationTh)
                    : (personal.addressEn ?? personal.locationEn)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean Minimalist Message Form (Doppelrand Double-Bezel) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-6 doppelrand-shell"
        >
          <div className="doppelrand-core p-6 sm:p-8">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-5 pb-3 border-b border-slate-200/80 dark:border-white/[0.07]">
              {t("ส่งข้อความถึงผม (Direct Message)", "Send an Instant Message")}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {t("ชื่อของคุณ / องค์กร", "Your Name / Organization")}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. John Doe / Tech Studio"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#05070d] ring-1 ring-slate-200 dark:ring-white/[0.08] focus:ring-cyan-400 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {t("อีเมลติดต่อกลับ", "Your Email Address")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="e.g. recruiter@company.com"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#05070d] ring-1 ring-slate-200 dark:ring-white/[0.08] focus:ring-cyan-400 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {t("ข้อความ", "Message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your mobile project, stack, or career opportunity..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#05070d] ring-1 ring-slate-200 dark:ring-white/[0.08] focus:ring-cyan-400 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-all font-mono resize-none"
                />
              </div>

              {/* Nested Island Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-bold text-xs font-mono rounded-full transition-all cursor-pointer shadow-[0_12px_28px_-6px_rgba(6,182,212,0.4)] mt-2 group"
              >
                <span>
                  {t("เปิดโปรแกรมเมลเพื่อส่งข้อความ", "Send Inquiry via Email")}
                </span>
                <span className="w-6 h-6 rounded-full bg-slate-950/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                  <Send className="w-3.5 h-3.5 text-slate-950" />
                </span>
              </motion.button>

              {formSubmitted && (
                <p className="text-[11px] font-mono text-cyan-400 text-center pt-1 font-medium">
                  {t(
                    "กำลังเปิดโปรแกรมเมลของคุณเพื่อส่งข้อความ...",
                    "Opening your mail client...",
                  )}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
