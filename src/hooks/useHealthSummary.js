import { useMemo } from "react";
import { calculateOverallHealth } from "../utils";

/**
 * Custom hook for calculating health summary
 * @param {Object} data - Topology data
 * @returns {Object} Health summary and overall health percentage
 */
export const useHealthSummary = (data) => {
  const summary = useMemo(() => {
    if (!data) {
      return { healthy: 0, degraded: 0, offline: 0, total: 0 };
    }

    const services = data.nodes.filter((node) => node.type === "service");
    const healthy = services.filter(
      (service) => service.status === "HEALTHY"
    ).length;
    const degraded = services.filter(
      (service) => service.status === "DEGRADED"
    ).length;
    const offline = services.filter(
      (service) => service.status === "OFFLINE"
    ).length;
    const total = services.length;

    return { healthy, degraded, offline, total };
  }, [data]);

  const overallHealth = useMemo(() => {
    return calculateOverallHealth(summary);
  }, [summary]);

  return { summary, overallHealth };
};
