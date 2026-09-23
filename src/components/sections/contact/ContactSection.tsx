import React, { useState } from "react";
import { motion } from "motion/react";
import { Github, MapPin, Copy, Check, Send, ArrowUpRight } from "lucide-react";
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
    <section id="contact" className="py-20">
      {/* Section Subtitle & Heading */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          05 // {t("ช่องทางการติดต่อ", "GET IN TOUCH")}
        </span>
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
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
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {lang === "th"
                ? "พร้อมร่วมงานและสร้างสรรค์ผลงานใหม่ไปด้วยกัน"
                : "Let's connect and build reliable mobile software."}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {lang === "th"
                ? "ผมกำลังมองหาโอกาสร่วมงานในตำแหน่ง Mobile Developer (Flutter & Dart) หากมีคำถาม โครงการที่ต้องการปรึกษา หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อได้โดยตรงครับ"
                : "Currently open to full-time Mobile Developer (Flutter & Dart) positions and high-impact engineering projects. Feel free to reach out directly."}
            </p>
          </div>

          {/* Quick Copy Email Card */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 rounded-lg space-y-2 shadow-xs dark:shadow-none hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {t("อีเมลติดต่อหลัก", "Direct Email")}
            </span>
            <div className="flex items-center justify-between gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="text-sm sm:text-base font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:underline break-all"
              >
                {personal.email}
              </a>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={copyEmail}
                className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded transition-colors shrink-0 cursor-pointer"
                aria-label="Copy email address"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 block"
              >
                {t("คัดลอกอีเมลเรียบร้อยแล้ว", "Copied to clipboard!")}
              </motion.span>
            )}
          </motion.div>

          {/* Additional Coordinates */}
          <div className="space-y-3 text-xs font-mono text-zinc-600 dark:text-zinc-400 pt-2">
            <motion.a
              whileHover={{ x: 3 }}
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              <Github className="w-4 h-4 text-zinc-500" />
              <span>github.com/{personal.githubUsername}</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
            </motion.a>

            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-4 h-4 text-zinc-500" />
              <span>
                {lang === "th" ? personal.locationTh : personal.locationEn}
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
          className="lg:col-span-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 rounded-lg p-6 shadow-xs dark:shadow-none"
        >
          <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            {t("ส่งข้อความถึงผม (Direct Message)", "Send a Message")}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1"
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
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1"
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
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1"
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
                placeholder="Write your inquiry or project details here..."
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs font-mono rounded transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t("เปิดโปรแกรมเมลเพื่อส่งข้อความ", "Send Inquiry via Email")}</span>
            </motion.button>

            {formSubmitted && (
              <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 text-center pt-1">
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
