import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Preloader } from "./components/Preloader";
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
    <ThemeProvider>
      <LanguageProvider>
        {/* Preloader Sequence - animated handwriting followed by soft dissolve fade out */}
        <Preloader />

        <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 selection:bg-sky-500/25 selection:text-sky-400 transition-colors duration-200 flex flex-col font-sans">
          {/* Crisp Top Navigation Header */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
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
    </ThemeProvider>
  );
};

export default App;
