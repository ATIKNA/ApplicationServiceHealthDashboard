import { memo } from "react";
import { BaseEdge, getBezierPath } from "reactflow";

import { STATUS_COLORS } from "../constants";

const StatusEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  const color = STATUS_COLORS[data?.status] ?? "#94a3b8";
  const strokeWidth = data?.status === "OFFLINE" ? 2 : 3;

  const label = `${data?.source} → ${data?.target} • ${data?.status}`;

  return (
    <g>
      <title>{label}</title>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: color, strokeWidth }}
      />
      <foreignObject
        x={labelX - 80}
        y={labelY - 12}
        width={160}
        height={24}
        pointerEvents="none"
      >
        <div
          style={{
            background: "#0b0b0bcc",
            color: "#fff",
            fontSize: 10,
            lineHeight: "16px",
            padding: "2px 6px",
            borderRadius: 8,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {data?.status}
        </div>
      </foreignObject>
    </g>
  );
};

export default memo(StatusEdge);
