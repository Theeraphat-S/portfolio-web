import { createContext } from "react";
import { StoryScrollContextType } from "./types";

export const StoryScrollContext = createContext<
  StoryScrollContextType | undefined
>(undefined);
