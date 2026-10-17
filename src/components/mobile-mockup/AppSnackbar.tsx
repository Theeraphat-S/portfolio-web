import React from "react";
import { m, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

/**
 * Material snackbar for the device demos, anchored above the element that
 * contains it (the containing block must be `relative`).
 */
export const AppSnackbar: React.FC<{ message: string | null }> = ({
  message,
}) => (
  <AnimatePresence>
    {message && (
      <m.div
        key={message}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        role="status"
        className="absolute inset-x-3 bottom-full mb-2 flex items-center gap-2 rounded-lg bg-[#303033] px-3 py-2.5 text-[12px] text-[#f2f0f4] shadow-lg"
      >
        <CheckCircle2
          className="h-4 w-4 shrink-0 text-[#8fe0ad]"
          aria-hidden="true"
        />
        {message}
      </m.div>
    )}
  </AnimatePresence>
);

export default AppSnackbar;
