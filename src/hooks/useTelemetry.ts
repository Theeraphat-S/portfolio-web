import { useState, useEffect } from "react";

export interface TelemetryData {
  localTime: string;
  latency: number;
}

export const useTelemetry = (): TelemetryData => {
  const [localTime, setLocalTime] = useState<string>("");
  const [latency, setLatency] = useState<number>(12);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const jitterInterval = setInterval(() => {
      const jitterValues = [10, 12, 11, 14, 12];
      const next =
        jitterValues[Math.floor(Math.random() * jitterValues.length)];
      setLatency(next);
    }, 4000);

    return () => clearInterval(jitterInterval);
  }, []);

  return { localTime, latency };
};
