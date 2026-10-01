import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Github,
  Phone,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  MapPin,
  Clock,
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
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(personal.email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = personal.email;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      if (copyTimerRef.current !== null) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
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

  const fadeIn = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 border-b border-white/[0.08]"
    >
      {/* Section Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="flex items-center justify-between pb-6 mb-12 border-b border-white/[0.06]"
      >
        <span className="editorial-eyebrow text-[#00f0ff]">
          05 // INITIATE COLLABORATION
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          DIRECT DISPATCH
        </span>
      </motion.div>

      {/* Asymmetric 2-Column Editorial Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left Column (Monumental Headline, Availability, Primary Email CTA & Coordinates) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide">
              {lang === "th"
                ? "พร้อมเริ่มงานทันที • ONSITE / HYBRID / REMOTE"
                : "AVAILABLE FOR PRODUCTION ROLES & COLLABORATION"}
            </span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[0.95] text-white">
              <span className="block text-zinc-400">
                {lang === "th" ? "มาร่วมสร้างสรรค์" : "LET'S BUILD"}
              </span>
              <span className="block text-white">
                {lang === "th" ? "ผลิตภัณฑ์ดิจิทัล" : "SOMETHING"}
              </span>
              <span className="block text-[#00f0ff]">
                {lang === "th" ? "ที่ยอดเยี่ยมด้วยกัน." : "EXCEPTIONAL."}
              </span>
            </h2>
          </div>

          {/* Value Proposition Narrative */}
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
            {lang === "th"
              ? "ผมพร้อมสำหรับการร่วมงานในตำแหน่ง Mobile Developer (Flutter & Dart) ในทุกรูปแบบ ทั้ง Onsite (กรุงเทพฯ / เชียงใหม่), Hybrid และ Remote พร้อมส่งมอบคุณค่าและสถาปัตยกรรมที่เสถียรตั้งแต่วันแรก"
              : "Open for full-time Mobile Developer positions and high-impact digital ventures. Based in Chiang Mai, Thailand (GMT+7) with full flexibility for Bangkok relocation, Hybrid, or Worldwide Remote."}
          </p>

          {/* Prominent Primary Email CTA Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>PRIMARY DIRECT CHANNEL</span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <Clock className="w-3 h-3" />
                RESPONDS IN &lt;24H
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <a
                href={`mailto:${personal.email}`}
                className="text-base sm:text-xl font-mono font-bold text-white hover:text-[#00f0ff] transition-colors break-all"
              >
                {personal.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor-text="COPY"
                aria-live="polite"
                aria-label={
                  copied
                    ? t(
                        "คัดลอกอีเมลเรียบร้อยแล้ว",
                        "Email address copied to clipboard",
                      )
                    : t(
                        "คัดลอกที่อยู่อีเมลลงคลิปบอร์ด",
                        "Copy email address to clipboard",
                      )
                }
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 font-mono text-xs font-semibold cursor-pointer transition-all self-start sm:self-auto shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>{t("คัดลอกสำเร็จ!", "COPIED!")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>{t("คัดลอกอีเมล", "COPY EMAIL")}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Secondary Coordinates in Clean Hairline Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase">
                <Phone className="w-3 h-3 text-[#00f0ff]" />
                <span>DIRECT PHONE</span>
              </div>
              <a
                href={`tel:${personal.phone}`}
                className="text-xs sm:text-sm font-mono font-bold text-zinc-200 hover:text-[#00f0ff] transition-colors block"
              >
                {personal.phone}
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase">
                <Github className="w-3 h-3 text-[#00f0ff]" />
                <span>GITHUB PROFILE</span>
              </div>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="VISIT"
                className="text-xs sm:text-sm font-mono font-bold text-zinc-200 hover:text-[#00f0ff] transition-colors flex items-center gap-1"
              >
                <span>github.com/{personal.githubUsername}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.06] space-y-1 sm:col-span-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase">
                <MapPin className="w-3 h-3 text-[#00f0ff]" />
                <span>BASE & AVAILABILITY</span>
              </div>
              <span className="text-xs font-mono text-zinc-300 block">
                {lang === "th" ? personal.locationTh : personal.locationEn}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column (Streamlined Integrated Dispatch Form) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="lg:col-span-6 xl:col-span-5"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.015] border border-white/[0.08] backdrop-blur-sm space-y-5">
            <div className="space-y-1 pb-3 border-b border-white/[0.06]">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {lang === "th" ? "ส่งข้อความโดยตรง" : "Direct Dispatch"}
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                {lang === "th"
                  ? "ระบุรายละเอียดโปรเจกต์หรือตำแหน่งงานเพื่อเริ่มต้นการสนทนา"
                  : "Drop project specifications or role inquiries directly to my inbox."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block"
                >
                  {lang === "th"
                    ? "ชื่อของคุณ / องค์กร"
                    : "Your Name / Organization"}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={
                    lang === "th"
                      ? "เช่น บริษัท เอบีซี จำกัด"
                      : "e.g. Acme Studio"
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] focus:border-[#00f0ff]/60 focus:ring-1 focus:ring-[#00f0ff]/30 text-xs sm:text-sm text-white placeholder-zinc-400 outline-none transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block"
                >
                  {lang === "th" ? "อีเมลติดต่อกลับ" : "Your Email"}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="contact@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] focus:border-[#00f0ff]/60 focus:ring-1 focus:ring-[#00f0ff]/30 text-xs sm:text-sm text-white placeholder-zinc-400 outline-none transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block"
                >
                  {lang === "th"
                    ? "ข้อความ / รายละเอียดงาน"
                    : "Message / Project Scope"}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={
                    lang === "th"
                      ? "รายละเอียดโปรเจกต์ หรือตำแหน่งงาน..."
                      : "Brief us on your timeline, architecture requirements, or role..."
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.08] focus:border-[#00f0ff]/60 focus:ring-1 focus:ring-[#00f0ff]/30 text-xs sm:text-sm text-white placeholder-zinc-400 outline-none transition-colors font-mono resize-none"
                />
              </div>

              {formSubmitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-center space-y-2"
                >
                  <span className="text-xs font-mono font-bold text-[#00f0ff] block">
                    {lang === "th" ? "ส่งข้อความสำเร็จ!" : "INQUIRY DISPATCHED"}
                  </span>
                  <span className="text-xs text-zinc-300 block">
                    {lang === "th"
                      ? "เปิดไคลเอนต์อีเมลของคุณเรียบร้อยแล้ว ขอบคุณที่ติดต่อครับ"
                      : "Email client launched. Looking forward to speaking with you!"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="inline-block mt-2 text-[11px] font-mono text-[#00f0ff] hover:underline cursor-pointer"
                  >
                    {lang === "th"
                      ? "← ส่งข้อความใหม่อีกครั้ง"
                      : "← Send another inquiry"}
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  data-cursor-text="DISPATCH"
                  className="w-full py-3 px-6 rounded-full bg-[#00f0ff] hover:bg-[#38bdf8] text-[#07080c] font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,240,255,0.28)] hover:shadow-[0_6px_24px_-4px_rgba(0,240,255,0.4)] hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00f0ff]"
                >
                  <span>
                    {lang === "th" ? "ส่งข้อความ ↗" : "DISPATCH INQUIRY ↗"}
                  </span>
                  <Send className="w-3.5 h-3.5 text-[#07080c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
