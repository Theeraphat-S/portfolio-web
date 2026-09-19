import React from "react";

interface FluidAmbientMeshProps {
  className?: string;
  intensity?: "subtle" | "medium" | "vibrant";
  speed?: "slow" | "normal";
  colors?: {
    primary?: string; // Default cyan
    secondary?: string; // Default electric blue
    accent?: string; // Default sky blue
  };
}

export const FluidAmbientMesh: React.FC<FluidAmbientMeshProps> = ({
  className = "",
  intensity = "medium",
  speed = "slow",
  colors,
}) => {
  const primaryBg = colors?.primary ?? "bg-cyan-500/30";
  const secondaryBg = colors?.secondary ?? "bg-blue-600/25";
  const accentBg = colors?.accent ?? "bg-sky-400/20";

  const getOpacity = () => {
    switch (intensity) {
      case "subtle":
        return "opacity-30 dark:opacity-20";
      case "vibrant":
        return "opacity-80 dark:opacity-60";
      default:
        return "opacity-50 dark:opacity-40";
    }
  };

  const getDuration = () => {
    return speed === "slow" ? "duration-[20s]" : "duration-[12s]";
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${getOpacity()} ${className}`}
    >
      {/* Orb 1: Primary Glow */}
      <div
        style={{
          transform: "translate(-20%, -20%)",
        }}
        className={`absolute top-0 left-1/4 w-[450px] h-[450px] rounded-full ${primaryBg} blur-[90px] mix-blend-screen animate-pulse-subtle transition-all motion-reduce:animate-none ${getDuration()}`}
      />

      {/* Orb 2: Secondary Drift */}
      <div
        style={{
          transform: "translate(20%, 20%)",
        }}
        className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full ${secondaryBg} blur-[100px] mix-blend-screen animate-pulse transition-all motion-reduce:animate-none ${getDuration()}`}
      />

      {/* Orb 3: Accent Sheen */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full ${accentBg} blur-[80px] mix-blend-screen`}
      />
    </div>
  );
};
