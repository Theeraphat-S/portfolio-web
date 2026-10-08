import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A boolean that switches on and turns itself off after `durationMs`.
 * Triggering again restarts the countdown instead of letting an earlier
 * timer switch it off early, and the timer is cleared on unmount.
 * `set` pins the flag to a value and cancels any pending countdown.
 */
export const useTransientFlag = (
  durationMs: number,
): [boolean, () => void, (value: boolean) => void] => {
  const [on, setOn] = useState(false);
  const timerRef = useRef<number | null>(null);

  const cancel = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => cancel, []);

  const trigger = useCallback(() => {
    cancel();
    setOn(true);
    timerRef.current = window.setTimeout(() => {
      setOn(false);
      timerRef.current = null;
    }, durationMs);
  }, [durationMs]);

  const set = useCallback((value: boolean) => {
    cancel();
    setOn(value);
  }, []);

  return [on, trigger, set];
};
