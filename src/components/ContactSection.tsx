import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  UserCheck, 
  ExternalLink,
  Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    
    // Fire subtle celebratory confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#06b6d4', '#ffffff'],
    });

    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    
    setIsSent(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#10b981', '#06b6d4', '#3b82f6'],
    });

    window.location.href = `mailto:${personal.email}?subject=Contact from Portfolio by ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message + '\n\nSender Email: ' + formState.email)}`;

    setTimeout(() => {
      setIsSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            {t('ติดต่อและร่วมงาน', 'Get in Touch')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {t('พร้อมร่วมงานและสร้างสรรค์ผลงานร่วมกัน', "Let's Build Great Mobile Apps Together")}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            {t(
              'เปิดรับโอกาสการทำงานในตำแหน่ง Mobile Developer (Flutter/Dart) ทั้งในรูปแบบ Onsite, Hybrid หรือ Remote',
              'Actively open to full-time Mobile Developer positions (Flutter/Dart) across onsite, hybrid, or remote environments.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Contact Spotlight Hub */}
            <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.15)">
              <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                {t('ข้อมูลการติดต่อโดยตรง (Direct Contact)', 'Direct Contact Channels')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                {t('คลิกเพื่อคัดลอกอีเมลหรือเบอร์โทรศัพท์ได้ทันที', 'Click to copy email or phone number in one click')}
              </p>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 gap-3 group hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-zinc-400 block">{t('อีเมลหลัก', 'Primary Email')}</span>
                      <a
                        href={`mailto:${personal.email}`}
                        className="text-sm sm:text-base font-bold font-mono text-zinc-100 hover:text-emerald-400 transition-colors"
                      >
                        {personal.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(personal.email, 'email')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-xs font-semibold text-zinc-200 transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    {copiedType === 'email' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">{t('คัดลอกแล้ว!', 'Copied!')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('คัดลอกอีเมล', 'Copy Email')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone Box */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 gap-3 group hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-zinc-400 block">{t('เบอร์โทรศัพท์', 'Phone Number')}</span>
                      <a
                        href={`tel:${personal.phone}`}
                        className="text-sm sm:text-base font-bold font-mono text-zinc-100 hover:text-cyan-400 transition-colors"
                      >
                        {personal.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(personal.phone, 'phone')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-zinc-800 hover:bg-cyan-500 hover:text-zinc-950 text-xs font-semibold text-zinc-200 transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    {copiedType === 'phone' ? (
                      <>
                        <Check className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-bold">{t('คัดลอกแล้ว!', 'Copied!')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('คัดลอกเบอร์', 'Copy Phone')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* GitHub Box */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-zinc-400 block">GitHub Profile</span>
                      <span className="text-sm sm:text-base font-bold font-mono text-zinc-200">
                        github.com/Theeraphat-S
                      </span>
                    </div>
                  </div>

                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>{t('เปิดลิงก์', 'Visit')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Status and Salary Tag Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-400" />
                  {t('เงินเดือนที่คาดหวัง:', 'Expected Salary:')}{' '}
                  <strong className="text-white font-mono">{personal.expectedSalaryTh}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  {lang === 'th' ? personal.locationTh : personal.locationEn}
                </span>
              </div>
            </SpotlightCard>

            {/* Academic Reference Card (อาจารย์อ้างอิง) */}
            <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.15)">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
                    {t('บุคคลอ้างอิงทางวิชาการ (Academic Reference)', 'Academic Reference')}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {lang === 'th' ? personal.reference.nameTh : personal.reference.nameEn}
                  </h4>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    {lang === 'th' ? personal.reference.positionTh : personal.reference.positionEn}
                  </p>

                  <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-zinc-500" />
                      {personal.reference.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      {personal.reference.email}
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>

          </div>

          {/* Right Column: Direct Message Form (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard spotlightColor="rgba(6, 182, 212, 0.15)">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                {t('ส่งข้อความถึงคุณธีรภัทร', 'Send a Direct Message')}
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                {t('ส่งข้อความเพื่อติดต่อสัมภาษณ์งาน หรือพูดคุยเรื่องโปรเจกต์', 'Reach out for job interviews, freelance, or inquiries')}
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    {t('ชื่อของคุณ / บริษัท', 'Your Name / Company')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={t('เช่น HR Tech Solutions / สมชาย', 'e.g. HR Tech Solutions / Sarah')}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    {t('อีเมลสำหรับติดต่อกลับ', 'Your Email Address')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    {t('รายละเอียดข้อความ / ตำแหน่งงาน', 'Message / Job Position')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={t(
                      'สนใจนัดสัมภาษณ์ตำแหน่ง Mobile Developer (Flutter)...',
                      'We would love to invite you for a Mobile Developer interview...'
                    )}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSent ? t('กำลังเปิดโปรแกรมอีเมล...', 'Opening Email Client...') : t('ส่งข้อความทันที', 'Send Message')}</span>
                </button>
              </form>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
};
