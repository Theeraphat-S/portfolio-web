import React from "react";

export const MarqueeRibbons: React.FC = () => {
  const CORE_TECH_STACK_TICKER = [
    "Flutter & Dart",
    "Bloc Architecture",
    "Riverpod",
    "Clean Architecture",
    "RESTful APIs",
    "SQLite & Hive",
    "Firebase Integration",
    "Git & CI/CD",
    "Android & iOS",
    "Responsive Mobile UI",
    "State Management",
    "Offline-First Design",
  ];

  const ENGINEERING_FOCUS_TICKER = [
    "Mobile Application Developer",
    "Production-Grade Engineering",
    "Performance Optimization",
    "High-Stability API Integration",
    "Maejo University IT",
    "Chiang Mai, Thailand",
    "Open to Onsite / Hybrid / Remote",
    "Human-Centric UX",
    "Agile Development",
    "Unit & Widget Testing",
  ];

  return (
    <div className="py-10 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-zinc-950/80 overflow-hidden space-y-3 select-none">
      {/* Ribbon 1: Forward Marquee */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-mono font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase whitespace-nowrap">
          {[...CORE_TECH_STACK_TICKER, ...CORE_TECH_STACK_TICKER].map(
            (item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <span className="group-hover:text-cyan-500 transition-colors">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 shrink-0" />
              </div>
            ),
          )}
        </div>
      </div>

      {/* Ribbon 2: Reverse Marquee */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="animate-marquee-reverse flex items-center gap-8 text-[11px] sm:text-xs font-mono font-medium tracking-widest text-zinc-500 dark:text-zinc-500 uppercase whitespace-nowrap">
          {[...ENGINEERING_FOCUS_TICKER, ...ENGINEERING_FOCUS_TICKER].map(
            (item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <span className="group-hover:text-sky-500 transition-colors">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500/50 group-hover:bg-sky-400 shrink-0" />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MarqueeRibbons;
