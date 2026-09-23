import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
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
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#09090b] dark:text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-500 dark:selection:text-emerald-400 transition-colors duration-200 flex flex-col font-sans">
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

