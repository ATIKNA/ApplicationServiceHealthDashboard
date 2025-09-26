import { STATUS_COLORS, METRICS_CONFIG, HEALTH_THRESHOLDS } from "../constants";

/**
 * Derives service type from ID or name
 * @param {string} id - Service ID
 * @param {string} name - Service name
 * @returns {string} Service type
 */
export const deriveServiceType = (id, name) => {
  const text = `${id} ${name}`.toLowerCase();

  if (text.includes("frontend") || text.includes("react")) return "frontend";
  if (text.includes("api")) return "api";
  if (text.includes("db") || text.includes("postgres")) return "database";
  if (text.includes("cache") || text.includes("redis")) return "cache";

  return "service";
};

/**
 * Gets color based on metric value and thresholds
 * @param {number} value - Metric value
 * @param {string} metricType - Type of metric (RPS, LATENCY, ERROR_RATE)
 * @returns {string} Color hex code
 */
export const getMetricColor = (value, metricType) => {
  const config = METRICS_CONFIG[metricType];
  if (!config) return STATUS_COLORS.HEALTHY;

  if (value >= config.HEALTHY_THRESHOLD) return STATUS_COLORS.HEALTHY;
  if (value >= config.WARNING_THRESHOLD) return STATUS_COLORS.DEGRADED;
  return STATUS_COLORS.OFFLINE;
};

/**
 * Gets health color based on percentage
 * @param {number} percentage - Health percentage
 * @returns {string} Color hex code
 */
export const getHealthColor = (percentage) => {
  if (percentage >= HEALTH_THRESHOLDS.EXCELLENT) return STATUS_COLORS.HEALTHY;
  if (percentage >= HEALTH_THRESHOLDS.GOOD) return STATUS_COLORS.DEGRADED;
  return STATUS_COLORS.OFFLINE;
};

/**
 * Formats percentage with 2 decimal places
 * @param {number} value - Number to format
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};

/**
 * Generates random metrics within configured ranges
 * @returns {Object} Random metrics object
 */
export const generateRandomMetrics = () => {
  const rpsConfig = METRICS_CONFIG.RPS;
  const latencyConfig = METRICS_CONFIG.LATENCY;
  const errorConfig = METRICS_CONFIG.ERROR_RATE;

  return {
    rps: Math.floor(
      rpsConfig.MIN + Math.random() * (rpsConfig.MAX - rpsConfig.MIN)
    ),
    latencyMs: Math.floor(
      latencyConfig.MIN +
        Math.random() * (latencyConfig.MAX - latencyConfig.MIN)
    ),
    errorPct: Math.random() * errorConfig.MAX,
  };
};

/**
 * Calculates overall health percentage
 * @param {Object} summary - Health summary object
 * @returns {number} Health percentage
 */
export const calculateOverallHealth = (summary) => {
  if (summary.total === 0) return 0;
  return Math.round(
    ((summary.healthy + summary.degraded * 0.5) / summary.total) * 100
  );
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
