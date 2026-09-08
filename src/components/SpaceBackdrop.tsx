import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "../context";
import { Particles } from "./reactbits/Particles";

const PARTICLE_COLORS = ["#0284c7", "#06b6d4", "#38bdf8"];

export const AtmosphericBackdrop = () => {
  const { visualTheme } = useTheme();
  const reducedMotion = useReducedMotion();

  if (visualTheme === "original") {
    return reducedMotion ? null : (
      <Particles
        particleColors={PARTICLE_COLORS}
        particleCount={40}
        speed={0.35}
        particleBaseSize={1.5}
      />
    );
  }

  return <div className="space-stars" aria-hidden="true" />;
};

export const SpaceHorizon = () => {
  const { visualTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const horizonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visualTheme !== "space" || reducedMotion) return;
    const horizon = horizonRef.current;
    if (!horizon) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = Math.min(window.scrollY, horizon.offsetHeight) * 0.08;
      horizon.style.setProperty("--orbit-offset", `${offset}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      horizon.style.removeProperty("--orbit-offset");
    };
  }, [visualTheme, reducedMotion]);

  if (visualTheme !== "space") return null;

  return (
    <div ref={horizonRef} className="space-horizon" aria-hidden="true">
      <img
        src="/images/earth-horizon.png"
        alt=""
        width="1536"
        height="1024"
        decoding="async"
      />
    </div>
  );
};
