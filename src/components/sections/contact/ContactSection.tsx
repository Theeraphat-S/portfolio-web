import React, { useState } from "react";
import { motion } from "motion/react";
import { Github, MapPin, Copy, Check, Send, ArrowUpRight, Phone } from "lucide-react";
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

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24">
      {/* Karolina Hess Giant Typographic CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="text-xs font-mono text-slate-900 dark:text-sky-400 uppercase tracking-widest font-semibold block mb-3">
          05 // {t("เริ่มงานด้วยกัน", "CONTACT & COLLABORATION")}
        </span>
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-[0.95]">
          {lang === "th" ? (
            <>
              ร่วมงานกัน <span className="text-sky-400 block">สร้างสรรค์แอปที่ดี</span>
            </>
          ) : (
            <>
              Let’s work
              <span className="text-sky-400 block">together.</span>
            </>
          )}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Invitation & Coordinates */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-6 space-y-6"
        >
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            {lang === "th"
              ? "ผมกำลังมองหาโอกาสร่วมงานในตำแหน่ง Mobile Developer (Flutter & Dart) พร้อมเริ่มงานทันทีทั้ง Onsite (กรุงเทพฯ/เชียงใหม่), Hybrid หรือ Remote หากมีโปรเจกต์ที่น่าสนใจ สามารถติดต่อได้โดยตรงครับ"
              : "Currently open to full-time Mobile Developer (Flutter & Dart) positions and high-impact digital products. Based in Chiang Mai, Thailand. Open to Bangkok relocation, Hybrid, or Worldwide Remote."}
          </p>

          {/* Quick Copy Email Card */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl space-y-2 shadow-xs dark:shadow-none hover:border-sky-500/60 transition-colors"
          >
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              {t("ส่งอีเมลถึงผมโดยตรง", "Drop me an email:")}
            </span>
            <div className="flex items-center justify-between gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="text-lg sm:text-xl font-mono font-bold text-slate-900 dark:text-sky-400 hover:underline break-all"
              >
                {personal.email}
              </a>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={copyEmail}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-sky-400 bg-slate-50 dark:bg-[#0b0f19] rounded-lg transition-colors shrink-0 cursor-pointer"
                aria-label="Copy email address"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-sky-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono text-sky-400 block font-medium"
              >
                {t("คัดลอกอีเมลเรียบร้อยแล้ว!", "Copied to clipboard!")}
              </motion.span>
            )}
          </motion.div>

          {/* Additional Coordinates */}
          <div className="space-y-3 text-xs font-mono text-slate-600 dark:text-slate-400 pt-2">
            {personal.phone && (
              <motion.a
                whileHover={{ x: 3 }}
                href={`tel:${personal.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-sky-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span className="font-semibold">{personal.phone}</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">({t("โทรติดต่อได้โดยตรง", "Direct call")})</span>
              </motion.a>
            )}

            <motion.a
              whileHover={{ x: 3 }}
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-slate-900 dark:hover:text-sky-400 transition-colors"
            >
              <Github className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>github.com/{personal.githubUsername}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </motion.a>

            <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
              <span>
                {lang === "th"
                  ? (personal.addressTh ?? personal.locationTh)
                  : (personal.addressEn ?? personal.locationEn)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean Minimalist Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="lg:col-span-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-xl p-6 shadow-xs dark:shadow-none"
        >
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            {t("ส่งข้อความถึงผม (Direct Message)", "Send a Message")}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1"
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
                placeholder="e.g. John Doe / Tech Company"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1"
              >
                {t("อีเมลติดต่อกลับ", "Your Email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g. contact@example.com"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1"
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
                placeholder="Tell me about your mobile project or career opportunity..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors font-mono resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t("เปิดโปรแกรมเมลเพื่อส่งข้อความ", "Send Inquiry via Email")}</span>
            </motion.button>

            {formSubmitted && (
              <p className="text-[11px] font-mono text-sky-400 text-center pt-1 font-medium">
                {t(
                  "กำลังเปิดโปรแกรมเมลของคุณเพื่อส่งข้อความ...",
                  "Opening your mail client...",
                )}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
