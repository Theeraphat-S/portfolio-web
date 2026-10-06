export interface ProjectMetric {
  labelTh: string;
  labelEn: string;
  /** Language-neutral value (numbers, product names). */
  value: string;
  /** Localized overrides when the value contains translatable words. */
  valueTh?: string;
  valueEn?: string;
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
  yearTh?: string;
  yearEn?: string;
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
  repositoryType?: "public" | "private" | "commercial";
  repositoryNoticeTh?: string;
  repositoryNoticeEn?: string;
  demoUrl?: string;
  color: string;
}

export type ExperienceType = "internship" | "academic" | "speaker" | "ta";

export interface ExperienceContribution {
  labelTh: string;
  labelEn: string;
  descTh: string;
  descEn: string;
}

export interface ExperienceItem {
  year: string;
  yearTh?: string;
  yearEn?: string;
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
  subBadgeTh?: string;
  subBadgeEn?: string;
  descriptionTh: string;
  descriptionEn: string;
  contributions?: ExperienceContribution[];
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

export interface ReferenceInfo {
  nameTh: string;
  nameEn: string;
  roleTh: string;
  roleEn: string;
  phone: string;
  email: string;
}

export interface PersonalInfo {
  nameTh: string;
  nameEn: string;
  nickname: string;
  /** Core stack shown beside the job title, e.g. "Flutter & Dart". */
  specialty: string;
  titleTh: string;
  titleEn: string;
  taglineTh: string;
  taglineEn: string;
  email: string;
  phone: string;
  expectedSalaryTh?: string;
  expectedSalaryEn?: string;
  addressTh?: string;
  addressEn?: string;
  github: string;
  githubUsername: string;
  locationTh: string;
  locationEn: string;
  education: EducationInfo;
  reference?: ReferenceInfo;
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

export interface StoryBeat {
  id: string;
  badgeTh: string;
  badgeEn: string;
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  streamTag: string;
  streamState: string;
  streamDetails: string;
  highlightSpecs: string[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  stats: StatItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  experiences: ExperienceItem[];
}
