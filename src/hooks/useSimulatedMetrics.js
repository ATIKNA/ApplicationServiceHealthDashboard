import { useState, useEffect, useRef } from "react";
import { METRICS_CONFIG, generateRandomMetrics } from "../utils";

/**
 * Custom hook for simulating real-time metrics
 * @param {boolean} active - Whether metrics should be active
 * @returns {Object} Current metrics values
 */
export const useSimulatedMetrics = (active) => {
  const [metrics, setMetrics] = useState({
    rps: 0,
    latencyMs: 0,
    errorPct: 0,
  });
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const updateMetrics = () => {
      setMetrics(generateRandomMetrics());
    };

    // Initial update
    updateMetrics();

    // Set up interval with random timing
    const interval =
      METRICS_CONFIG.UPDATE_INTERVAL.MIN +
      Math.random() *
        (METRICS_CONFIG.UPDATE_INTERVAL.MAX -
          METRICS_CONFIG.UPDATE_INTERVAL.MIN);

    timerRef.current = setInterval(updateMetrics, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active]);

  return metrics;
};
