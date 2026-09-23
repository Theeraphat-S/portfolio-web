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
        <div className="min-h-screen bg-[#f7f7f6] text-[#18231d] dark:bg-[#18231d] dark:text-[#e9e8e8] selection:bg-[#bfdb39]/30 selection:text-[#bfdb39] transition-colors duration-200 flex flex-col font-sans">
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

