import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block relative bg-clip-text text-transparent bg-[linear-gradient(110deg,#a1a1aa,45%,#ffffff,55%,#a1a1aa)] bg-[length:250%_100%] ${
        disabled ? "" : "animate-shiny-text"
      } ${className}`}
      style={{
        animationDuration: animationDuration,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      }}
    >
      {text}
    </span>
  );
};
