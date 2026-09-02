export interface ProjectMetric {
  labelTh: string;
  labelEn: string;
  value: string;
}

export type ProjectCategory = "mobile" | "system" | "featured";

export interface ProjectItem {
  id: string;
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  category: ProjectCategory;
  year: string;
  tag: string;
  descriptionTh: string;
  descriptionEn: string;
  problemTh?: string;
  problemEn?: string;
  decisionRationaleTh?: string;
  decisionRationaleEn?: string;
  tradeOffsTh?: string;
  tradeOffsEn?: string;
  evidenceTh?: string;
  evidenceEn?: string;
  outcomeTh?: string;
  outcomeEn?: string;
  highlightsTh: string[];
  highlightsEn: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  architectureTh: string;
  architectureEn: string;
  githubUrl?: string;
  demoUrl?: string;
  color: string;
}

export type ExperienceType = "internship" | "academic" | "speaker" | "ta";

export interface ExperienceItem {
  periodTh: string;
  periodEn: string;
  roleTh: string;
  roleEn: string;
  companyTh: string;
  companyEn: string;
  locationTh: string;
  locationEn: string;
  type: ExperienceType;
  badgeTh: string;
  badgeEn: string;
  descriptionTh: string;
  descriptionEn: string;
  bulletsTh: string[];
  bulletsEn: string[];
  skills: string[];
}

export interface EducationInfo {
  degreeTh: string;
  degreeEn: string;
  universityTh: string;
  universityEn: string;
  yearsTh: string;
  yearsEn: string;
}

export interface PersonalInfo {
  nameTh: string;
  nameEn: string;
  nickname: string;
  titleTh: string;
  titleEn: string;
  taglineTh: string;
  taglineEn: string;
  email: string;
  github: string;
  githubUsername: string;
  locationTh: string;
  locationEn: string;
  education: EducationInfo;
}

export interface StatItem {
  value: string;
  labelTh: string;
  labelEn: string;
}

export interface SkillDetail {
  name: string;
  level: string;
  desc: string;
}

export interface SkillCategory {
  nameTh: string;
  nameEn: string;
  icon: string;
  color: string;
  skills: SkillDetail[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  stats: StatItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  experiences: ExperienceItem[];
}
