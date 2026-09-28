import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Preloader } from "./components/Preloader";
import { CustomCursor } from "./components/reactbits/CustomCursor";
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
      {/* Desktop-only Precision Custom Cursor */}
      <CustomCursor />

      {/* Preloader Sequence */}
      <Preloader />

      <div className="min-h-[100dvh] relative bg-[#07080c] text-[#f1f5f9] selection:bg-[#00f0ff] selection:text-[#07080c] flex flex-col font-sans overflow-x-hidden">
        {/* Subtle Technical Grid Background Layer */}
        <div className="fixed inset-0 pointer-events-none technical-grid-bg opacity-30 z-0" />

        {/* Floating Minimalist Dynamic Navbar */}
        <Navbar />

        {/* Main Content Sections with Generous Editorial Whitespace */}
        <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
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
    </LanguageProvider>
  );
};

export default App;
