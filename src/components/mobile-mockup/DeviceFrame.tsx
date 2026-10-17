import React from "react";

export type StatusBarTone = "dark" | "light";

interface DeviceFrameProps {
  children: React.ReactNode;
  /** Icon colour for the status bar; "dark" for apps with a light top bar. */
  tone?: StatusBarTone;
  /** Shows the Wi-Fi glyph as disconnected. */
  offline?: boolean;
  /** Accessible name for the screen region. */
  label: string;
  /** id of the screen region, referenced by the project tabs. */
  screenId?: string;
}

/**
 * Android handset shell (Pixel-class proportions, 9:19.5) for the Flutter
 * demos. The status bar and gesture pill are drawn over the app, so each
 * screen pads its own top bar by SAFE_TOP and its bottom bar by SAFE_BOTTOM,
 * the same way a Flutter app extends under the system bars.
 */
export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  tone = "dark",
  offline = false,
  label,
  screenId,
}) => {
  const ink = tone === "dark" ? "#1b1f27" : "#f7f8fa";

  return (
    <div className="relative w-full max-w-[318px] mx-auto">
      {/* Hardware keys sit on the right edge, like a Pixel. */}
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-[19%] h-[9%] w-[3px] rounded-r-sm bg-gradient-to-b from-[#3a4253] via-[#596377] to-[#3a4253]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-[32%] h-[15%] w-[3px] rounded-r-sm bg-gradient-to-b from-[#3a4253] via-[#596377] to-[#3a4253]"
      />

      {/* Aluminium band, then the black glass bezel. */}
      <div className="relative rounded-[46px] p-[3px] bg-[linear-gradient(145deg,#5b6476_0%,#2b3140_22%,#1a1e28_50%,#2b3140_78%,#5b6476_100%)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9),0_18px_36px_-18px_rgba(0,0,0,0.7)]">
        <div className="relative rounded-[43px] bg-black p-[9px]">
          <div
            id={screenId}
            role="region"
            aria-label={label}
            className="relative isolate aspect-[9/19.5] w-full overflow-hidden rounded-[34px] bg-white"
            // The site theme tints `white`; app screens need true white.
            style={{ "--color-white": "#ffffff" } as React.CSSProperties}
          >
            {children}

            {/* System status bar */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-between px-6 text-[11px] font-medium tabular-nums"
              style={{ color: ink }}
            >
              <span className="font-sans">9:41</span>
              <span className="flex items-center gap-1">
                <SignalGlyph color={ink} />
                {offline ? (
                  <WifiOffGlyph color={ink} />
                ) : (
                  <WifiGlyph color={ink} />
                )}
                <BatteryGlyph color={ink} />
              </span>
            </div>

            {/* Punch-hole camera */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[9px] z-30 h-[13px] w-[13px] -translate-x-1/2 rounded-full bg-[#05060a] ring-1 ring-white/10"
            />

            {/* Gesture navigation pill */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[34%] -translate-x-1/2 rounded-full"
              style={{ backgroundColor: ink, opacity: 0.85 }}
            />

            {/* Faint glass reflection */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-40 rounded-[34px] bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_32%)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/** Top padding that clears the status bar. */
export const SAFE_TOP = "pt-8";
/** Bottom padding that clears the gesture pill. */
export const SAFE_BOTTOM = "pb-4";

const SignalGlyph: React.FC<{ color: string }> = ({ color }) => (
  <svg width="13" height="10" viewBox="0 0 13 10" aria-hidden="true">
    <path d="M12 0.5 L12 9.5 L1 9.5 Z" fill={color} />
  </svg>
);

const WifiGlyph: React.FC<{ color: string }> = ({ color }) => (
  <svg width="13" height="10" viewBox="0 0 13 10" aria-hidden="true">
    <path
      d="M6.5 9.6 L0.4 2.9 C2 1.4 4.1 0.5 6.5 0.5 C8.9 0.5 11 1.4 12.6 2.9 Z"
      fill={color}
    />
  </svg>
);

const WifiOffGlyph: React.FC<{ color: string }> = ({ color }) => (
  <svg width="13" height="10" viewBox="0 0 13 10" aria-hidden="true">
    <path
      d="M6.5 9.6 L0.4 2.9 C2 1.4 4.1 0.5 6.5 0.5 C8.9 0.5 11 1.4 12.6 2.9 Z"
      fill={color}
      opacity="0.3"
    />
    <path
      d="M1.5 0.8 L11.5 9.2"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const BatteryGlyph: React.FC<{ color: string }> = ({ color }) => (
  <svg width="9" height="13" viewBox="0 0 9 13" aria-hidden="true">
    <rect x="2.75" y="0" width="3.5" height="1.6" rx="0.5" fill={color} />
    <rect
      x="0.6"
      y="1.6"
      width="7.8"
      height="10.8"
      rx="1.6"
      fill="none"
      stroke={color}
      strokeWidth="1.1"
    />
    <rect x="2" y="4" width="5" height="7" rx="0.6" fill={color} />
  </svg>
);

export default DeviceFrame;
