import React from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { PersonalInfo } from "../../../types";
import { SpotlightCard } from "../../reactbits/SpotlightCard";

interface EducationCardProps {
  personal: PersonalInfo;
}

export const EducationCard: React.FC<EducationCardProps> = ({ personal }) => {
  const { lang, t } = useLanguage();

  return (
    <div className="md:col-span-1 lg:col-span-1">
      <SpotlightCard
        spotlightColor="rgba(6, 182, 212, 0.15)"
        className="h-full flex flex-col justify-between"
        data-cursor-text="Maejo IT"
      >
        <div>
          <div className="flex items-center gap-2.5 text-cyan-400 mb-3">
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              {t("ประวัติการศึกษา", "Education")}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">
            {lang === "th"
              ? personal.education.universityTh
              : personal.education.universityEn}
          </h3>
          <p className="text-sm font-medium text-cyan-300 mt-1">
            {lang === "th"
              ? personal.education.degreeTh
              : personal.education.degreeEn}
          </p>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            {lang === "th"
              ? personal.education.yearsTh
              : personal.education.yearsEn}
          </p>
          <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
            {t(
              "ศึกษาเจาะลึกโครงสร้างข้อมูล อัลกอริทึม ระบบฐานข้อมูล การพัฒนาซอฟต์แวร์ฝั่งไคลเอนต์และเซิร์ฟเวอร์ และได้รับคัดเลือกเป็น TA ประจำภาควิชา 3 เทอม",
              "Comprehensive studies in Data Structures, Algorithms, Relational Databases, and Client/Server Engineering. Selected as departmental TA for 3 consecutive semesters.",
            )}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            เชียงใหม่ (Chiang Mai)
          </span>
          <span className="text-cyan-400 font-mono font-medium">
            Class 2565-2569
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
};
