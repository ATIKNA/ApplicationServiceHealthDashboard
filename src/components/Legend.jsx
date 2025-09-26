import { Box, Stack, Typography, Paper, Chip } from "@mui/material";

import { STATUS_COLORS, A11Y_LABELS } from "../constants";

const statusItems = [
  {
    label: "Healthy",
    color: STATUS_COLORS.HEALTHY,
    description: "Service operating normally",
  },
  {
    label: "Degraded",
    color: STATUS_COLORS.DEGRADED,
    description: "Service experiencing issues",
  },
  {
    label: "Offline",
    color: STATUS_COLORS.OFFLINE,
    description: "Service unavailable",
  },
];

const serviceTypes = [
  { label: "Frontend", icon: "🌐" },
  { label: "API", icon: "🔌" },
  { label: "Database", icon: "🗄️" },
  { label: "Cache", icon: "⚡" },
];

export default function Legend() {
  return (
    <Paper
      elevation={2}
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 2,
        backgroundColor: "#f8fafc",
      }}
      aria-label="Service status and type legend"
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Legend
      </Typography>

      {/* Status Legend */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 500, mb: 1.5 }}
        >
          Service Status
        </Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
          {statusItems.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 1,
                  backgroundColor: item.color,
                  border: `2px solid ${item.color}`,
                  boxShadow: `0 0 0 2px ${item.color}22`,
                }}
              />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Service Types Legend */}
      <Box>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 500, mb: 1.5 }}
        >
          Service Types
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {serviceTypes.map((type) => (
            <Chip
              key={type.label}
              label={`${type.icon} ${type.label}`}
              variant="outlined"
              size="small"
              sx={{
                fontSize: "0.875rem",
                height: 28,
                "& .MuiChip-label": {
                  px: 1.5,
                },
              }}
            />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
