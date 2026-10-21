import { useContext } from "react";
import { StoryScrollContext } from "./StoryScrollContextInstance";
import { StoryScrollContextType } from "./types";

export const useStoryScroll = (): StoryScrollContextType => {
  const context = useContext(StoryScrollContext);
  if (!context) {
    throw new Error("useStoryScroll must be used within a StoryScrollProvider");
  }
  return context;
};
