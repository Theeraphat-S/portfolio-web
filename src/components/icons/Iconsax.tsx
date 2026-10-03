import React from "react";
import { motion } from "motion/react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

/**
 * Iconsax & Lordicon/LottieFlow Vector Suite
 * Inspired by Iconsax (Linear/Two-tone style with 1.5px stroke precision)
 * and Lordicon/LottieFlow animated micro-interactions.
 */

// 1. Heart Pulse (NCDs Risk Screener)
export const HeartPulseIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        animate={animated ? { scale: [1, 1.15, 1, 1.08, 1] } : undefined}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.38 3.1 10.99 3.98 12 5.34C13.01 3.98 14.63 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69C22 15.69 15.52 19.82 12.62 20.81Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11.5L9.5 9L11.5 13.5L14 11H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 2. Blood Glucose Drop (Lab Analysis)
export const BloodGlucoseIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2.69C10.15 4.88 5 11.4 5 15.69C5 19.56 8.13 22.69 12 22.69C15.87 22.69 19 19.56 19 15.69C19 11.4 13.85 4.88 12 2.69Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 16C9 14.34 10.34 13 12 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
};

// 3. Stethoscope / Blood Pressure
export const BloodPressureIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.5 10V6.5C4.5 4.01 6.51 2 9 2H10C12.49 2 14.5 4.01 14.5 6.5V10C14.5 12.76 12.26 15 9.5 15C6.74 15 4.5 12.76 4.5 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 15V18.5C9.5 20.43 11.07 22 13 22H14.5C16.43 22 18 20.43 18 18.5V13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="18"
        cy="11.5"
        r="2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 4. Routing / GPS Path (Pinto Logistics)
export const RoutingIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="6"
        cy="19"
        r="3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="18"
        cy="5"
        r="3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        animate={
          animated
            ? { pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }
            : undefined
        }
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        d="M6 16V11.5C6 8.46 8.46 6 11.5 6H15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={animated ? "4 3" : undefined}
      />
    </svg>
  );
};

// 5. Flame Streak (Gamification)
export const FlameStreakIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        animate={
          animated ? { scaleY: [1, 1.1, 0.96, 1.05, 1], originY: 1 } : undefined
        }
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        d="M14.57 3.5C14.07 4.96 13.06 6.13 11.75 6.94C10.02 8.01 9 9.94 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 9.77 16.5 8.1 17.5 7C19.24 9.1 20 11.83 20 14.5C20 18.64 16.64 22 12.5 22C8.36 22 5 18.64 5 14.5C5 10.5 7.6 6.8 11.2 5.3C12.5 4.7 13.7 4 14.57 3.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18C10.9 18 10 17.1 10 16C10 14.6 11.3 13.7 12.5 13C13.2 13.9 13.6 14.9 13.6 16C13.6 17.1 12.9 18 12 18Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
};

// 6. Code Bridge / WebView (Pinto Bridge)
export const CodeBridgeIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 8L3 12L7 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8L21 12L17 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4L10 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
};

// 7. Shopping Bag (Orders / Cart)
export const ShoppingBagIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.5 7.5V6.5C8.5 4.57 10.07 3 12 3C13.93 3 15.5 4.57 15.5 6.5V7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 11.43C20.97 8.99 20.27 7 16 7H8C3.73 7 3.03 8.99 3.3 11.43L4.05 18.43C4.26 20.39 4.98 22 9 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 11V12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 11V12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 8. POS Register / Point of Sale
export const PosRegisterIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 17V7C3 4.79 4.79 3 7 3H17C19.21 3 21 4.79 21 7V17C21 19.21 19.21 21 17 21H7C4.79 21 3 19.21 3 17Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11H11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="15" r="1.5" fill={color} />
      <circle cx="8" cy="15" r="1.5" fill={color} />
      <circle cx="12" cy="15" r="1.5" fill={color} />
    </svg>
  );
};

// 9. Receipt Text (Instant Checkout)
export const ReceiptTextIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 7.5C3 4.5 4.5 3 7.5 3H16.5C19.5 3 21 4.5 21 7.5V19.5C21 20.33 20.33 21 19.5 21L17.25 19.5L15 21L12.75 19.5L10.5 21L8.25 19.5L6 21C5.17 21 4.5 20.33 4.5 19.5V7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8H16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 10. Database Sync / SQLite
export const DatabaseSyncIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="12"
        cy="5"
        rx="8"
        ry="3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 5V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12V19C4 20.66 7.58 22 12 22C16.42 22 20 20.66 20 19V12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {animated && (
        <motion.circle
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          cx="17"
          cy="18"
          r="1.5"
          fill="#00f0ff"
        />
      )}
    </svg>
  );
};

// 11. Wifi Offline / Network Fault Tolerance
export const WifiOfflineIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 2L22 22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 16.5C9.55 15.58 10.96 15 12.5 15C13.2 15 13.87 15.12 14.5 15.35"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.93 12.93C7.08 10.78 9.92 9.6 12.85 9.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.42 9.42C4.1 6.74 7.6 5.25 11.35 5.03"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="19" r="1" fill={color} />
    </svg>
  );
};

// 12. Terminal & BLoC Stream Box
export const TerminalBoxIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 9L10 12L7 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
