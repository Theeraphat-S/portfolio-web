import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Github,
  Phone,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData } from "../../../data";

export const ContactSection: React.FC = () => {
  const { lang } = useLanguage();
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="contact" className="py-24 sm:py-36">
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
          START A PROJECT OR ROLE
        </span>
      </motion.div>

      {/* Monumental Headline */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-16 sm:mb-20"
      >
        <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.92] text-white">
          <span className="block text-zinc-400">
            {lang === "th" ? "มาร่วมสร้างสรรค์" : "LET'S BUILD"}
          </span>
          <span className="block text-white">
            {lang === "th" ? "ผลิตภัณฑ์ดิจิทัล" : "SOMETHING"}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0284c7]">
            {lang === "th" ? "ที่ยอดเยี่ยมด้วยกัน." : "EXCEPTIONAL."}
          </span>
        </h2>
      </motion.div>

      {/* Grid: Coordinates & Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Coordinates (6 Cols) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="lg:col-span-6 space-y-8"
        >
          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
            {lang === "th"
              ? "ผมพร้อมสำหรับการร่วมงานในตำแหน่ง Mobile Developer (Flutter & Dart) ในทุกรูปแบบ ทั้ง Onsite (กรุงเทพฯ / เชียงใหม่), Hybrid และ Remote พร้อมส่งมอบคุณค่าและสถาปัตยกรรมที่เสถียรตั้งแต่วันแรก"
              : "Open for full-time Mobile Developer positions and high-impact digital ventures. Based in Chiang Mai, Thailand (GMT+7) with full flexibility for Bangkok relocation, Hybrid, or Worldwide Remote."}
          </p>

          {/* Quick Copy Email Card */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-[#00f0ff]/30 transition-colors space-y-4">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              PRIMARY COMMUNICATION CHANNEL
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-base sm:text-xl font-mono font-bold text-white tracking-tight break-all">
                {personal.email}
              </span>
              <button
                onClick={copyEmail}
                data-cursor-text="COPY"
                className="btn-editorial btn-editorial-primary text-xs py-2 px-4 cursor-pointer self-start sm:self-auto shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#07080c]" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#07080c]" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Technical Metadata Coordinate Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00f0ff]/30 transition-colors space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
                <Phone className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>DIRECT LINE</span>
              </div>
              <a
                href={`tel:${personal.phone}`}
                className="text-sm font-mono font-bold text-white hover:text-[#00f0ff] transition-colors block"
              >
                {personal.phone}
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00f0ff]/30 transition-colors space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
                <Github className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>GITHUB PROFILE</span>
              </div>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="VISIT"
                className="text-sm font-mono font-bold text-white hover:text-[#00f0ff] transition-colors flex items-center gap-1"
              >
                <span>github.com/{personal.githubUsername}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00f0ff]/30 transition-colors space-y-1 sm:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>BASE & AVAILABILITY</span>
              </div>
              <span className="text-sm font-mono text-zinc-300 block">
                {lang === "th" ? personal.locationTh : personal.locationEn}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Direct Dispatch Form (6 Cols) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="lg:col-span-6"
        >
          <div className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
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
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  {lang === "th"
                    ? "ชื่อของคุณ / องค์กร"
                    : "Your Name / Organization"}
                </label>
                <input
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
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00f0ff] text-sm text-white placeholder-zinc-600 outline-none transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  {lang === "th" ? "อีเมลติดต่อกลับ" : "Your Email"}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="contact@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00f0ff] text-sm text-white placeholder-zinc-600 outline-none transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  {lang === "th"
                    ? "ข้อความ / รายละเอียดงาน"
                    : "Message / Project Scope"}
                </label>
                <textarea
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
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00f0ff] text-sm text-white placeholder-zinc-600 outline-none transition-colors font-mono resize-none"
                />
              </div>

              {formSubmitted ? (
                <div className="p-4 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-center space-y-1">
                  <span className="text-xs font-mono font-bold text-[#00f0ff] block">
                    {lang === "th" ? "ส่งข้อความสำเร็จ!" : "INQUIRY DISPATCHED"}
                  </span>
                  <span className="text-xs text-zinc-300">
                    {lang === "th"
                      ? "เปิดไคลเอนต์อีเมลของคุณเรียบร้อยแล้ว ขอบคุณที่ติดต่อครับ"
                      : "Email client launched. Looking forward to speaking with you!"}
                  </span>
                </div>
              ) : (
                <button
                  type="submit"
                  data-cursor-text="SEND"
                  className="w-full btn-editorial btn-editorial-primary py-3.5 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>
                    {lang === "th" ? "ส่งข้อความ" : "DISPATCH INQUIRY"}
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
