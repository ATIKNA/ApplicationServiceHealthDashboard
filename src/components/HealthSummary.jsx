import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
import { CheckCircle, Warning, Error } from "@mui/icons-material";

import { useHealthSummary } from "../hooks/useHealthSummary";
import { getHealthColor, STATUS_COLORS } from "../utils";
import { A11Y_LABELS } from "../constants";

const HealthSummary = ({ data }) => {
  const { summary, overallHealth } = useHealthSummary(data);

  const getHealthIcon = (percentage) => {
    if (percentage >= 90)
      return <CheckCircle sx={{ color: STATUS_COLORS.HEALTHY }} />;
    if (percentage >= 70)
      return <Warning sx={{ color: STATUS_COLORS.DEGRADED }} />;
    return <Error sx={{ color: STATUS_COLORS.OFFLINE }} />;
  };

  if (summary.total === 0) return null;

  return (
    <Card
      elevation={2}
      sx={{
        mb: 3,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            System Health Overview
          </Typography>
          {getHealthIcon(overallHealth)}
        </Stack>

        <Box sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Overall Health
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {overallHealth}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={overallHealth}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: getHealthColor(overallHealth),
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Stack direction="row" spacing={3} justifyContent="center">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: STATUS_COLORS.HEALTHY }}
            >
              {summary.healthy}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Healthy
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: STATUS_COLORS.DEGRADED }}
            >
              {summary.degraded}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Degraded
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: STATUS_COLORS.OFFLINE }}
            >
              {summary.offline}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Offline
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

HealthSummary.propTypes = {
  data: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        status: PropTypes.oneOf(["HEALTHY", "DEGRADED", "OFFLINE"]),
      })
    ),
  }),
};

export default HealthSummary;
