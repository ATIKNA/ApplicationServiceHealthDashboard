import { memo } from "react";
import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import StorageIcon from "@mui/icons-material/Storage";
import BoltIcon from "@mui/icons-material/Bolt";
import LanguageIcon from "@mui/icons-material/Language";

import { STATUS_COLORS, SERVICE_TYPES } from "../constants";
import { deriveServiceType } from "../utils";

const KindIcon = ({ kind }) => {
  const iconProps = { fontSize: "small" };

  switch (kind) {
    case SERVICE_TYPES.API:
      return <ApiIcon {...iconProps} />;
    case SERVICE_TYPES.DATABASE:
      return <StorageIcon {...iconProps} />;
    case SERVICE_TYPES.CACHE:
      return <BoltIcon {...iconProps} />;
    case SERVICE_TYPES.FRONTEND:
      return <LanguageIcon {...iconProps} />;
    default:
      return <ApiIcon {...iconProps} />;
  }
};

const ServiceNode = ({ id, data, selected }) => {
  const statusColor = STATUS_COLORS[data.status] ?? "#9ca3af";
  const kind = deriveServiceType(id, data.label);

  const content = (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 1.25,
        width: 300,
        bgcolor: "#fff",
        border: `2px solid ${selected ? "#2563eb" : statusColor}`,
        boxShadow: selected
          ? "0 0 0 3px rgba(37,99,235,0.2)"
          : "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: selected
            ? "0 0 0 3px rgba(37,99,235,0.2), 0 4px 12px rgba(0,0,0,0.15)"
            : "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <KindIcon kind={kind} />
          <Typography variant="subtitle2" noWrap>
            {data.label}
          </Typography>
        </Stack>
        <Chip
          label={data.status}
          size="small"
          sx={{
            height: 22,
            bgcolor: `${statusColor}22`,
            borderColor: statusColor,
            color: "#111827",
            fontWeight: 600,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: `${statusColor}33`,
              transform: "scale(1.05)",
            },
            ...(data.status === "DEGRADED" && {
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { opacity: 1 },
                "50%": { opacity: 0.7 },
                "100%": { opacity: 1 },
              },
            }),
          }}
          variant="outlined"
        />
      </Stack>
    </Box>
  );

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Tooltip title={`${data.label} • ${data.status}`} arrow>
        <div
          role="button"
          tabIndex={0}
          aria-label={`${data.label}, status ${data.status}`}
          data-node-id={id}
        >
          {content}
        </div>
      </Tooltip>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

ServiceNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["HEALTHY", "DEGRADED", "OFFLINE"]).isRequired,
  }).isRequired,
  selected: PropTypes.bool,
};

KindIcon.propTypes = {
  kind: PropTypes.string.isRequired,
};

export default memo(ServiceNode);
