import React, { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { BilingualStack } from "../../BilingualStack";
import { ChapterBridge } from "../../ChapterBridge";
import { m } from "motion/react";
import { FADE_UP, IN_VIEW } from "../../../lib/motion";
import {
  Github,
  Phone,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  MapPin,
  FileText,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { portfolioData, bridgeFor } from "../../../data";
import { ChapterEyebrow } from "../../ChapterEyebrow";
import { telHref } from "../../../lib/utils";

// Each coordinate tile is one link: the whole card is the target, and its
// label and value together are the link's accessible name.
const CONTACT_TILE =
  "group block min-h-11 p-3.5 rounded-xl bg-white/[0.015] border border-line hover:border-signal/30 hover:bg-signal/[0.04] space-y-1 transition-colors";
const TILE_LABEL = "flex items-center gap-1.5 text-xs font-mono text-zinc-400 ";
const TILE_VALUE =
  "flex items-center gap-1 text-sm font-mono font-semibold text-zinc-200 group-hover:text-signal transition-colors";
const TILE_ARROW =
  "w-3 h-3 text-zinc-400 group-hover:text-signal transition-colors";

type Field = "name" | "message";

const LIMITS: Record<Field, number> = { name: 100, message: 1500 };

const findErrors = (data: Record<Field, string>) => {
  const errors: Partial<Record<Field, true>> = {};
  if (!data.name.trim()) errors.name = true;
  if (!data.message.trim()) errors.message = true;
  return errors;
};

const ERROR_TEXT: Record<Field, { th: string; en: string }> = {
  name: {
    th: "กรุณาใส่ชื่อหรือชื่อบริษัท",
    en: "Please enter your name or company.",
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
      ? "border-rose-400/60 focus:border-rose-400 focus-visible:outline-rose-400"
      : "border-line focus:border-signal/60"
  } text-base sm:text-sm text-white placeholder-zinc-400 transition-colors font-mono`;

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
    // Render the error text before moving focus, so the field is announced
    // together with the message its aria-describedby now points at.
    flushSync(() => setErrors(found));
    const firstInvalid = (["name", "message"] as Field[]).find(
      (field) => found[field],
    );
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    const name = formData.name.trim();
    const message = formData.message.trim();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setDraftOpened(true);
  };

  return (
    <section
      id="contact"
      className="pt-12 pb-12 sm:pt-24 sm:pb-16 border-b border-line"
    >
      {/* Section Eyebrow */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW}
        variants={FADE_UP}
        className="flex items-center justify-between pb-6 mb-8 sm:mb-12 border-b border-line"
      >
        <ChapterEyebrow id="contact" />
        <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
          {t("ช่องทางติดต่อ", "Get in touch")}
        </span>
      </m.div>

      {/* Asymmetric 2-Column Editorial Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-start">
        {/* Left Column (Monumental Headline, Availability, Primary Email CTA & Coordinates) */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW}
          variants={FADE_UP}
          className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono text-xs min-h-[1.75rem]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="">
              {lang === "th"
                ? "เปิดรับตำแหน่ง Junior Mobile"
                : "Open for junior mobile roles"}
            </span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl xl:text-7xl font-semibold tracking-tight leading-[0.95] text-white min-h-[120px] sm:min-h-[180px] xl:min-h-[210px] flex flex-col justify-end">
              <span className="block text-zinc-400">
                {lang === "th" ? "กำลังมองหา" : "Looking for"}
              </span>{" "}
              <span className="block text-white">
                {lang === "th" ? "ตำแหน่ง Junior" : "a junior"}
              </span>{" "}
              <span className="block text-primary">
                {lang === "th" ? "Flutter dev" : "Flutter role"}
              </span>
            </h2>
          </div>

          {/* Value Proposition Narrative */}
          <ChapterBridge
            bridge={bridgeFor("contact")}
            className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl"
          />

          {/* Prominent Primary Email CTA Card */}
          <div className="bezel">
            <div className="bezel-core p-3.5 sm:p-[1.125rem] bg-surface border-2 border-edge space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>{t("อีเมล", "Email")}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center min-h-11 lg:min-h-0 text-base sm:text-xl font-mono font-semibold text-white hover:text-signal transition-colors break-all"
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
                  className="inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full bg-primary/10 hover:bg-signal/10 text-primary hover:text-signal border border-primary/30 hover:border-signal/30 font-mono text-xs font-semibold cursor-pointer transition self-start sm:self-auto shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t("คัดลอกแล้ว", "Copied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t("คัดลอกอีเมล", "Copy email")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Coordinates in Clean Hairline Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a href={telHref(personal.phone)} className={CONTACT_TILE}>
              <span className={TILE_LABEL}>
                <Phone className="w-3 h-3 text-primary" aria-hidden="true" />
                <span>{t("โทรศัพท์", "Phone")}</span>
              </span>
              <span className={TILE_VALUE}>{personal.phone}</span>
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="VISIT"
              className={CONTACT_TILE}
            >
              <span className={TILE_LABEL}>
                <Github className="w-3 h-3 text-primary" aria-hidden="true" />
                <span>{t("โปรไฟล์ GitHub", "GitHub profile")}</span>
              </span>
              <span className={TILE_VALUE}>
                <span>github.com/{personal.githubUsername}</span>
                <ArrowUpRight className={TILE_ARROW} aria-hidden="true" />
              </span>
            </a>

            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="RESUME"
              className={CONTACT_TILE}
            >
              <span className={TILE_LABEL}>
                <FileText className="w-3 h-3 text-primary" aria-hidden="true" />
                <span>
                  {t(personal.resumeLabel.th, personal.resumeLabel.en)}
                </span>
              </span>
              <span className={TILE_VALUE}>
                <span>
                  {t(personal.resumeLinkLabel.th, personal.resumeLinkLabel.en)}
                </span>
                <ArrowUpRight className={TILE_ARROW} aria-hidden="true" />
              </span>
            </a>

            <div className="p-3.5 rounded-xl bg-white/[0.015] border border-line space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <MapPin className="w-3 h-3 text-primary" />
                <span>
                  {t("ที่ตั้งและรูปแบบงาน", "Location & availability")}
                </span>
              </div>
              <BilingualStack
                as="span"
                className="text-xs font-mono text-zinc-300 block"
                th={personal.locationTh}
                en={personal.locationEn}
              />
            </div>
          </div>
        </m.div>

        {/* Right Column (Streamlined Integrated Dispatch Form) */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW}
          variants={FADE_UP}
          className="lg:col-span-6 xl:col-span-5"
        >
          <div className="bezel">
            <div className="bezel-core p-[1.125rem] sm:p-[1.625rem] bg-surface border-2 border-edge space-y-5">
              <div className="space-y-1 pb-3 border-b border-line">
                <BilingualStack
                  as="h3"
                  className="text-lg sm:text-xl font-semibold text-white tracking-tight"
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
                    className="text-xs font-mono text-zinc-400 block"
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
                    <p
                      id="contact-name-error"
                      className="text-xs text-rose-300"
                    >
                      {t(ERROR_TEXT.name.th, ERROR_TEXT.name.en)}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-mono text-zinc-400 block"
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
                      className={`text-xs font-mono tabular-nums shrink-0 ${
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
                    className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center space-y-2"
                  >
                    <span className="text-xs font-mono font-semibold text-primary block">
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
                        className="btn-editorial btn-editorial-tonal btn-sm cursor-pointer"
                      >
                        {copied
                          ? t("คัดลอกแล้ว", "Copied")
                          : t("คัดลอกอีเมล", "Copy email address")}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDraftOpened(false);
                        }}
                        className="text-xs font-mono text-primary hover:underline cursor-pointer"
                      >
                        {lang === "th" ? "แก้ไขข้อความ" : "Edit message"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    data-cursor-text="DISPATCH"
                    className="btn-editorial btn-editorial-primary w-full min-h-11 px-12 cursor-pointer"
                  >
                    <span>
                      {lang === "th"
                        ? "เปิดร่างในแอปอีเมล"
                        : "Open email draft"}
                    </span>
                    <span
                      aria-hidden="true"
                      className="cta-icon absolute right-2 inset-y-0 my-auto bg-void/15"
                    >
                      <Send className="w-3.5 h-3.5 text-void" />
                    </span>
                  </button>
                )}
              </form>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default ContactSection;
