import React, { useState, useRef, useEffect } from "react";
import { BilingualStack } from "../../BilingualStack";
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

type Field = "name" | "email" | "message";

const LIMITS: Record<Field, number> = { name: 100, email: 254, message: 1500 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const findErrors = (data: Record<Field, string>) => {
  const errors: Partial<Record<Field, true>> = {};
  if (!data.name.trim()) errors.name = true;
  if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = true;
  if (!data.message.trim()) errors.message = true;
  return errors;
};

const ERROR_TEXT: Record<Field, { th: string; en: string }> = {
  name: {
    th: "กรุณาใส่ชื่อหรือชื่อบริษัท",
    en: "Please enter your name or company.",
  },
  email: {
    th: "กรุณาใส่อีเมลให้ถูกรูปแบบ เช่น name@company.com",
    en: "Please enter a valid email, e.g. name@company.com.",
  },
  message: {
    th: "กรุณาเขียนข้อความสั้น ๆ",
    en: "Please write a short message.",
  },
};

// 16px text on phones: iOS Safari zooms the page when a smaller input gets focus.
const inputClass = (invalid: boolean) =>
  `w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border ${
    invalid
      ? "border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/30"
      : "border-white/[0.08] focus:border-[#00f0ff]/60 focus:ring-[#00f0ff]/30"
  } focus:ring-1 text-base sm:text-sm text-white placeholder-zinc-400 outline-none transition-colors font-mono`;

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, true>>>({});
  const copyTimerRef = useRef<number | null>(null);

  const updateField = (field: Field, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

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
    const found = findErrors(formData);
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as Field[]).find(
      (field) => found[field],
    );
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setDraftOpened(true);
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
      className="py-16 sm:py-24 border-b border-white/[0.08]"
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
          05 // {t("ติดต่อ", "CONTACT")}
        </span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
          {t("ช่องทางติดต่อ", "GET IN TOUCH")}
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs min-h-[1.75rem]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide">
              {lang === "th"
                ? "เปิดรับตำแหน่ง JUNIOR MOBILE"
                : "OPEN FOR JUNIOR MOBILE ROLES"}
            </span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter [word-spacing:0.12em] leading-[0.95] text-white min-h-[120px] sm:min-h-[180px] xl:min-h-[210px] flex flex-col justify-end">
              <span className="block text-zinc-400">
                {lang === "th" ? "กำลังมองหา" : "LOOKING FOR"}
              </span>{" "}
              <span className="block text-white">
                {lang === "th" ? "ตำแหน่ง JUNIOR" : "A JUNIOR"}
              </span>{" "}
              <span className="block text-[#00f0ff]">
                {lang === "th" ? "FLUTTER DEV." : "FLUTTER ROLE."}
              </span>
            </h2>
          </div>

          {/* Value Proposition Narrative */}
          <BilingualStack
            className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl"
            th={
              "พร้อมร่วมงานตำแหน่ง Junior Mobile Developer (Flutter & Dart) แบบเต็มเวลา ทั้ง Onsite, Hybrid และ Remote อยากทำงานกับทีมที่ได้เรียนรู้และเติบโตไปด้วยกัน"
            }
            en={
              "Looking for a full-time junior Mobile Developer role (Flutter & Dart) on a team where I can keep learning. Based in Chiang Mai, Thailand (GMT+7); open to onsite, hybrid, or remote work."
            }
          />

          {/* Prominent Primary Email CTA Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#00f0ff]/30 transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span>{t("อีเมล", "Email")}</span>
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
                className="inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 font-mono text-xs font-semibold cursor-pointer transition-all self-start sm:self-auto shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
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
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase">
                <Phone className="w-3 h-3 text-[#00f0ff]" />
                <span>{t("โทรศัพท์", "Phone")}</span>
              </div>
              <a
                href={`tel:${personal.phone}`}
                className="text-xs sm:text-sm font-mono font-bold text-zinc-200 hover:text-[#00f0ff] transition-colors block"
              >
                {personal.phone}
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase">
                <Github className="w-3 h-3 text-[#00f0ff]" />
                <span>{t("โปรไฟล์ GitHub", "GitHub profile")}</span>
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
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase">
                <MapPin className="w-3 h-3 text-[#00f0ff]" />
                <span>
                  {t("ที่ตั้งและรูปแบบงาน", "Location & availability")}
                </span>
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
              <BilingualStack
                as="h3"
                className="text-lg sm:text-xl font-bold text-white tracking-tight"
                th={"เขียนอีเมลถึงผม"}
                en={"Write an email"}
              />
              <BilingualStack
                className="text-xs font-mono text-zinc-400"
                th={
                  "แบบฟอร์มนี้จะเปิดร่างในแอปอีเมลของคุณ กรุณากดส่งจากแอปนั้น"
                }
                en={
                  "This opens a draft in your email app. Send it there to complete your inquiry."
                }
              />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-mono text-zinc-400 uppercase tracking-wider block"
                >
                  {lang === "th" ? "ชื่อ / บริษัท" : "Name / Company"}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={LIMITS.name}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={
                    lang === "th"
                      ? "เช่น สมชาย, บริษัท เอบีซี จำกัด"
                      : "e.g. Jane Lee, Acme Studio"
                  }
                  className={inputClass(!!errors.name)}
                />
                {errors.name && (
                  <p id="contact-name-error" className="text-xs text-rose-300">
                    {t(ERROR_TEXT.name.th, ERROR_TEXT.name.en)}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-mono text-zinc-400 uppercase tracking-wider block"
                >
                  {lang === "th"
                    ? "อีเมลสำหรับตอบกลับ"
                    : "Your email (for my reply)"}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  maxLength={LIMITS.email}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="name@company.com"
                  className={inputClass(!!errors.email)}
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-xs text-rose-300">
                    {t(ERROR_TEXT.email.th, ERROR_TEXT.email.en)}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-mono text-zinc-400 uppercase tracking-wider block"
                >
                  {lang === "th" ? "ข้อความ" : "Message"}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  maxLength={LIMITS.message}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={`contact-message-count${
                    errors.message ? " contact-message-error" : ""
                  }`}
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder={
                    lang === "th"
                      ? "ตำแหน่งงาน ทีม หรือโปรเจกต์ที่อยากคุยด้วย"
                      : "The role, team, or project you have in mind"
                  }
                  className={`${inputClass(!!errors.message)} resize-none`}
                />
                <div className="flex items-start justify-between gap-3">
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      className="text-xs text-rose-300"
                    >
                      {t(ERROR_TEXT.message.th, ERROR_TEXT.message.en)}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span
                    id="contact-message-count"
                    className={`text-[11px] font-mono tabular-nums shrink-0 ${
                      formData.message.length >= LIMITS.message
                        ? "text-rose-300"
                        : "text-zinc-500"
                    }`}
                  >
                    {formData.message.length.toLocaleString()} /{" "}
                    {LIMITS.message.toLocaleString()}
                  </span>
                </div>
              </div>

              {draftOpened ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-center space-y-2"
                >
                  <span className="text-xs font-mono font-bold text-[#00f0ff] block">
                    {lang === "th"
                      ? "พร้อมเปิดร่างอีเมล"
                      : "Email draft requested"}
                  </span>
                  <span className="text-xs text-zinc-300 block">
                    {lang === "th"
                      ? "หากแอปอีเมลเปิดขึ้น กรุณากดส่งจากแอปนั้น หากไม่เปิด ให้คัดลอกที่อยู่อีเมลบนหน้านี้ไปเขียนข้อความเอง"
                      : "If your email app opened, send the draft there. If it did not, copy my email address and compose your message manually."}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-white transition-all cursor-pointer border border-white/[0.1]"
                    >
                      {copied
                        ? t("คัดลอกแล้ว!", "Copied!")
                        : t("คัดลอกอีเมล", "Copy email address")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftOpened(false);
                      }}
                      className="text-xs font-mono text-[#00f0ff] hover:underline cursor-pointer"
                    >
                      {lang === "th" ? "แก้ไขข้อความ" : "Edit message"}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  data-cursor-text="DISPATCH"
                  className="w-full py-3 px-6 rounded-full bg-[#00f0ff] hover:bg-[#38bdf8] text-[#07080c] font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,240,255,0.28)] hover:shadow-[0_6px_24px_-4px_rgba(0,240,255,0.4)] hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00f0ff]"
                >
                  <span>
                    {lang === "th" ? "เปิดร่างในแอปอีเมล" : "Open email draft"}
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
