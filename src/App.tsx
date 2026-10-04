import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { SmoothScroll } from "./components/SmoothScroll";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { StoryProgress } from "./components/StoryProgress";
import {
  Hero,
  AboutBento,
  Projects,
  Skills,
  ExperienceTimeline,
  ContactSection,
} from "./components/sections";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SmoothScroll>
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00f0ff] focus:text-[#07080c] focus:font-mono focus:text-xs focus:font-bold focus:rounded-full focus:shadow-lg focus:outline-none"
        >
          Skip to content / ข้ามไปยังเนื้อหา
        </a>

        {/* Global Avionics Scroll Progress Indicator */}
        <ScrollProgressBar className="h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0284c7]" />

        <div className="min-h-[100dvh] relative bg-[#07080c] text-[#f1f5f9] selection:bg-[#00f0ff] selection:text-[#07080c] flex flex-col font-sans overflow-x-hidden">
          {/* Ultra-subtle Technical Grid Background Layer */}
          <div className="fixed inset-0 pointer-events-none technical-grid-bg opacity-12 z-0" />

          <StoryProgress />

          {/* Main Content Sections with Generous Editorial Whitespace */}
          <main
            id="main-content"
            tabIndex={-1}
            className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 space-y-16 sm:space-y-24 pb-20 sm:pb-32 outline-none"
          >
            <Hero />
            <AboutBento />
            <Projects />
            <Skills />
            <ExperienceTimeline />
            <ContactSection />
          </main>

          {/* Minimalist Editorial Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </LanguageProvider>
  );
};

export default App;
