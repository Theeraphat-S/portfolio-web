import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Preloader } from "./components/Preloader";
import {
  Hero,
  TelemetryDeck,
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

        <div className="min-h-[100dvh] relative bg-[#f8fafc] text-slate-900 dark:bg-[#07090e] dark:text-slate-100 selection:bg-cyan-500/25 selection:text-cyan-400 transition-colors duration-300 flex flex-col font-sans overflow-x-hidden">
          {/* Subtle Ambient Dot Grid Layer */}
          <div className="fixed inset-0 pointer-events-none dot-matrix-bg opacity-30 dark:opacity-15 z-0" />

          {/* Ethereal Ambient Radial Mesh Glows (GPU Accelerated, Fixed) */}
          <div
            aria-hidden="true"
            className="fixed top-0 right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none -z-10 blur-[130px] opacity-25 dark:opacity-20 bg-gradient-to-br from-cyan-400 via-sky-500 to-transparent"
          />
          <div
            aria-hidden="true"
            className="fixed top-[40%] left-[-15%] w-[550px] h-[550px] rounded-full pointer-events-none -z-10 blur-[140px] opacity-20 dark:opacity-15 bg-gradient-to-tr from-blue-600 via-indigo-600 to-transparent"
          />

          {/* Floating Dynamic Island Navigation */}
          <Navbar />

          {/* Main Content Sections with Macro-Whitespace Breathing Room */}
          <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 space-y-24 sm:space-y-32 pb-24 sm:pb-36">
            <Hero />
            <TelemetryDeck />
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
