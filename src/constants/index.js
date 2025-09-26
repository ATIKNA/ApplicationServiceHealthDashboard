// Status colors and configurations
export const STATUS_COLORS = {
  HEALTHY: "#22c55e",
  DEGRADED: "#f59e0b",
  OFFLINE: "#ef4444",
};

// Service type configurations
export const SERVICE_TYPES = {
  FRONTEND: "frontend",
  API: "api",
  DATABASE: "database",
  CACHE: "cache",
  SERVICE: "service",
};

// Metrics configuration
export const METRICS_CONFIG = {
  RPS: {
    MIN: 300,
    MAX: 1000,
    HEALTHY_THRESHOLD: 800,
    WARNING_THRESHOLD: 500,
  },
  LATENCY: {
    MIN: 50,
    MAX: 250,
    HEALTHY_THRESHOLD: 100,
    WARNING_THRESHOLD: 200,
  },
  ERROR_RATE: {
    MIN: 0,
    MAX: 5,
    HEALTHY_THRESHOLD: 1,
    WARNING_THRESHOLD: 3,
  },
  UPDATE_INTERVAL: {
    MIN: 2000,
    MAX: 3000,
  },
};

// Layout configuration
export const LAYOUT_CONFIG = {
  COLUMN_WIDTH: 420,
  ROW_HEIGHT: 110,
  NODE_WIDTH: 300,
  NODE_PADDING: 12,
  ENVIRONMENT_PADDING: 16,
  MIN_ENVIRONMENT_HEIGHT: 160,
};

// Animation configuration
export const ANIMATION_CONFIG = {
  TRANSITION_DURATION: "0.2s",
  TRANSITION_EASING: "ease-in-out",
  PULSE_DURATION: "2s",
  SPIN_DURATION: "1s",
};

// Health thresholds
export const HEALTH_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 70,
};

// API endpoints
export const API_ENDPOINTS = {
  DATA: "/data.json",
};

// Accessibility labels
export const A11Y_LABELS = {
  SERVICE_TOPOLOGY: "Service topology graph",
  STATUS_LEGEND: "Service status and type legend",
  DETAILS_PANEL: "Service and connection details",
  HEALTH_SUMMARY: "System health overview",
  EXPORT_BUTTON: "Export topology as image",
};
