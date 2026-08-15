import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: DockItem;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [44, 60, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.92 }}
      className="relative flex items-center justify-center rounded-full bg-zinc-800/80 border border-zinc-700/60 shadow-lg text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-zinc-800 transition-colors group cursor-pointer"
      onClick={item.onClick}
    >
      <div className="flex items-center justify-center w-full h-full">
        {item.icon}
      </div>

      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-zinc-900 border border-zinc-700 px-2 py-1 text-xs font-medium text-zinc-200 opacity-0 shadow-xl transition-opacity group-hover:opacity-100 whitespace-nowrap z-50">
        {item.title}
      </span>

      {/* Active Dot indicator */}
      {item.active && (
        <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
      )}
    </motion.div>
  );
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ items, className = '' }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex h-16 items-end gap-3 rounded-full border border-zinc-800/80 bg-zinc-950/70 px-4 pb-3 backdrop-blur-xl shadow-2xl ${className}`}
    >
      {items.map((item, idx) => (
        item.href ? (
          <a key={idx} href={item.href}>
            <DockIcon mouseX={mouseX} item={item} />
          </a>
        ) : (
          <div key={idx}>
            <DockIcon mouseX={mouseX} item={item} />
          </div>
        )
      ))}
    </motion.div>
  );
};
