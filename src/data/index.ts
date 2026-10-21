import { PortfolioData } from "../types";
import { personalData } from "./personal";
import { statsData } from "./stats";
import { projectsData } from "./projects";
import { skillCategoriesData } from "./skills";
import { experiencesData } from "./experiences";

export const portfolioData: PortfolioData = {
  personal: personalData,
  stats: statsData,
  projects: projectsData,
  skillCategories: skillCategoriesData,
  experiences: experiencesData,
};

export {
  personalData,
  statsData,
  projectsData,
  skillCategoriesData,
  experiencesData,
};
export { BEATS_BY_PROJECT } from "./scrollytellingBeats";
export { STORY_CHAPTERS } from "./chapters";
export * from "../types";
export { ncdsDemo, pintoDemo, posDemo } from "./deviceDemos";
