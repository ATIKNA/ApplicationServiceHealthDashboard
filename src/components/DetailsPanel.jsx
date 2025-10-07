import PropTypes from "prop-types";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

import { useSimulatedMetrics } from "../hooks/useSimulatedMetrics";
import { getMetricColor, formatPercentage } from "../utils";
import { A11Y_LABELS } from "../constants";

export default function DetailsPanel({ selection }) {
  const kind = selection?.kind;
  const entity = selection?.entity;
  const isEdge = kind === "edge";
  const isNode = kind === "node";
  //[ENHANCEMENT]
  const metrics = useSimulatedMetrics(isNode || isEdge);

  if (!selection) {
    return (
      <Box sx={{ p: 2 }} aria-live="polite" aria-atomic>
        <Typography variant="h6">Details</Typography>
        <Typography variant="body2" color="text.secondary">
          Select a node or connection to view details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }} aria-live="polite" aria-atomic>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">
          {isNode ? entity.name : `${entity.source} → ${entity.target}`}
        </Typography>
        {isNode && (
          <Chip
            label={entity.status}
            color={
              entity.status === "HEALTHY"
                ? "success"
                : entity.status === "DEGRADED"
                ? "warning"
                : "error"
            }
            size="small"
          />
        )}
        {isEdge && (
          <Chip
            label={entity.status}
            color={
              entity.status === "HEALTHY"
                ? "success"
                : entity.status === "DEGRADED"
                ? "warning"
                : "error"
            }
            size="small"
          />
        )}
      </Stack>

      {isNode && (
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Typography>
            <strong>Type:</strong> {entity.type}
          </Typography>
          <Typography>
            <strong>Tech:</strong> {entity.tech}
          </Typography>
          <Typography>
            <strong>Version:</strong> {entity.version}
          </Typography>
        </Stack>
      )}

      {(isNode || isEdge) && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1">Real-time Metrics</Typography>
          <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
            <Box sx={{ textAlign: "center", minWidth: 80 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Requests/sec
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: getMetricColor(metrics.rps, "RPS"),
                  transition: "color 0.3s ease",
                }}
              >
                {metrics.rps}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", minWidth: 80 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Avg Latency
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: getMetricColor(metrics.latencyMs, "LATENCY"),
                  transition: "color 0.3s ease",
                }}
              >
                {metrics.latencyMs}ms
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", minWidth: 80 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Error Rate
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: getMetricColor(metrics.errorPct, "ERROR_RATE"),
                  transition: "color 0.3s ease",
                }}
              >
                {formatPercentage(metrics.errorPct)}
              </Typography>
            </Box>
          </Stack>
        </>
      )}
    </Box>
  );
}

DetailsPanel.propTypes = {
  selection: PropTypes.shape({
    kind: PropTypes.oneOf(["node", "edge"]),
    entity: PropTypes.object,
  }),
};
