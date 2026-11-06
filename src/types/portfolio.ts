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
  /** Short name and one verified outcome for the hero "shipped work" card. */
  shortName?: string;
  /** Where the work was done; drives the Selected Work filter. */
  origin?: "capstone" | "internship";
  proofTh?: string;
  proofEn?: string;
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
  /** Publish only with the referee's consent. */
  phone?: string;
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
  /** Public path of the PDF resume. */
  resumeUrl: string;
  /** Label of the résumé card and its link text. */
  resumeLabel: BilingualText;
  resumeLinkLabel: BilingualText;
  locationTh: string;
  locationEn: string;
  /** Shorter location line for the hero meta row. */
  heroLocationTh: string;
  heroLocationEn: string;
  education: EducationInfo;
  reference?: ReferenceInfo;
}

/** A headline split so one phrase can carry the accent colour. */
export interface AboutHeadline {
  lead: string;
  highlight: string;
  rest: string;
}

/** One line of the Approach chapter's credentials list. */
export interface AboutCredential {
  id: string;
  labelTh: string;
  labelEn: string;
  valueTh: string;
  valueEn: string;
  detailTh: string;
  detailEn: string;
  periodTh: string;
  periodEn: string;
}

/** Copy for the Approach (About) chapter. */
export interface AboutContent {
  headlineTh: AboutHeadline;
  headlineEn: AboutHeadline;
  practiceTh: string;
  practiceEn: string;
  credentialsLabelTh: string;
  credentialsLabelEn: string;
  credentials: AboutCredential[];
}

export interface StatItem {
  value: string;
  labelTh: string;
  labelEn: string;
}

export interface SkillDetail {
  name: string;
  level: string;
  descTh: string;
  descEn: string;
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
  /** State the device shows at this beat, sent as the event payload. */
  streamPayload: Record<string, unknown>;
  highlightSpecs: string[];
}

/** One chapter of the single-page story, in scroll order. */
export interface StoryChapter {
  /** Section element id, also written to the URL hash. */
  id: string;
  labelTh: string;
  labelEn: string;
  /** Lead line under the chapter heading that picks up from the chapter
   * before it. Every chapter after the intro has one. */
  bridge?: BilingualText;
}

export interface PortfolioData {
  personal: PersonalInfo;
  stats: StatItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  experiences: ExperienceItem[];
}

/** A Thai / English string pair for in-device demo copy. */
export interface BilingualText {
  th: string;
  en: string;
}

export type PintoMenuVisual = "noodles" | "salad" | "drink" | "dessert";

/** A dish on the web menu shown inside the Pinto WebView demo. */
export interface PintoMenuItem {
  id: string;
  name: BilingualText;
  price: number;
  visual: PintoMenuVisual;
}

export interface PosDemoItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  qty: number;
}
