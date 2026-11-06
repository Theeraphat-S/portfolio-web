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
      className={`inline-block relative bg-clip-text text-transparent bg-[linear-gradient(110deg,var(--color-zinc-400),45%,var(--color-white),55%,var(--color-zinc-400))] bg-[length:250%_100%] ${
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
