import { useEffect, useMemo, useCallback, useRef } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import { Box, Typography } from "@mui/material";
import { toPng } from "html-to-image";

import ServiceNode from "./ServiceNode.jsx";
import StatusEdge from "./StatusEdge.jsx";
import { useTopology } from "../hooks/useTopology.js";
import { STATUS_COLORS, LAYOUT_CONFIG, A11Y_LABELS } from "../constants";
import "reactflow/dist/style.css";

// Layout utility functions
const layoutNodes = (nodes) => {
  const environments = nodes.filter((node) => node.type === "environment");
  const services = nodes.filter((node) => node.type === "service");
  const environmentIndex = new Map(
    environments.map((env, index) => [env.id, index])
  );

  const environmentPositions = new Map(
    environments.map((env) => [
      env.id,
      {
        x:
          (environmentIndex.get(env.id) ?? 0) * LAYOUT_CONFIG.COLUMN_WIDTH + 40,
        y: 40,
      },
    ])
  );

  const serviceCountByEnvironment = new Map();
  services.forEach((service) => {
    const count = serviceCountByEnvironment.get(service.parent) ?? 0;
    serviceCountByEnvironment.set(service.parent, count + 1);
  });

  const currentRowByEnvironment = new Map(
    Array.from(serviceCountByEnvironment.keys()).map((key) => [key, 0])
  );

  const positionedNodes = [];

  // Add environment nodes
  environments.forEach((env) => {
    const position = environmentPositions.get(env.id);
    const envWidth = 400; // container width
    const envHeight = Math.max(
      LAYOUT_CONFIG.MIN_ENVIRONMENT_HEIGHT,
      (serviceCountByEnvironment.get(env.id) ?? 1) * LAYOUT_CONFIG.ROW_HEIGHT +
        80
    );

    positionedNodes.push({
      id: env.id,
      data: { label: env.name },
      position,
      type: "group",
      // Make environment containers non-interactive so they don't block edge clicks
      draggable: false,
      selectable: false,
      connectable: false,
      // Provide explicit width/height properties so React Flow can compute
      // parent bounds before placing child nodes with extent: 'parent'.
      width: envWidth,
      height: envHeight,
      style: {
        width: envWidth,
        height: envHeight,
        borderRadius: 8,
        border: "1px solid #d1d5db",
        padding: LAYOUT_CONFIG.ENVIRONMENT_PADDING,
        background: "transparent",
        pointerEvents: "none", // Allow mouse events to pass through to edges
      },
    });
  });

  // Add service nodes
  services.forEach((service) => {
    const envPosition = environmentPositions.get(service.parent);
    const row = currentRowByEnvironment.get(service.parent) ?? 0;
    currentRowByEnvironment.set(service.parent, row + 1);

    // Use absolute positioning to place service nodes inside environment containers
    // This is more reliable than React Flow's parent-child positioning
    const x = envPosition.x + LAYOUT_CONFIG.ENVIRONMENT_PADDING + 8;
    const ENV_HEADER_HEIGHT = 60; // increased space for the environment title/header
    const y =
      envPosition.y +
      LAYOUT_CONFIG.ENVIRONMENT_PADDING +
      ENV_HEADER_HEIGHT +
      row * LAYOUT_CONFIG.ROW_HEIGHT;

    positionedNodes.push({
      id: service.id,
      data: { label: service.name, status: service.status },
      // Use absolute positioning instead of parent-child relationship
      position: { x, y },
      // Remove parentId and extent to avoid React Flow positioning issues
      // parentId: service.parent,
      // extent: "parent",
      style: {
        padding: LAYOUT_CONFIG.NODE_PADDING,
        borderRadius: 10,
        border: `2px solid ${STATUS_COLORS[service.status] ?? "#9ca3af"}`,
        background: "#fff",
        width: LAYOUT_CONFIG.NODE_WIDTH,
      },
    });
  });

  return positionedNodes;
};

const createEdges = (connections) => {
  return connections.map((connection) => ({
    id: connection.id,
    source: connection.source,
    target: connection.target,
    animated: connection.status === "DEGRADED",
    style: {
      stroke: STATUS_COLORS[connection.status] ?? "#94a3b8",
      strokeWidth: connection.status === "OFFLINE" ? 2 : 3,
    },
    markerEnd: { type: "arrowclosed" },
  }));
};

export default function ServiceMap({ onSelect, onDataLoad, registerExport }) {
  const { data, loading, error } = useTopology();
  const containerRef = useRef(null);

  const elements = useMemo(() => {
    if (!data) return { nodes: [], edges: [] };

    return {
      nodes: layoutNodes(data.nodes),
      edges: createEdges(data.connections).map((edge) => ({
        ...edge,
        type: "status",
        data: {
          ...data.connections.find((connection) => connection.id === edge.id),
          ...edge,
        },
      })),
    };
  }, [data]);

  const handleNodeClick = useCallback(
    (_, node) => {
      if (!data) return;
      const raw = data.nodes.find((n) => n.id === node.id);
      if (raw && raw.type === "service")
        onSelect({ kind: "node", entity: raw });
    },
    [data, onSelect]
  );

  const handleEdgeClick = useCallback(
    (_, edge) => {
      if (!data) return;
      const raw = data.connections.find((c) => c.id === edge.id);
      if (raw) onSelect({ kind: "edge", entity: raw });
    },
    [data, onSelect]
  );

  const serviceOrderByEnv = useMemo(() => {
    if (!data) return new Map();
    const envToServices = new Map();
    data.nodes
      .filter((n) => n.type === "service")
      .forEach((s) => {
        const arr = envToServices.get(s.parent) ?? [];
        arr.push(s);
        envToServices.set(s.parent, arr);
      });
    // keep insertion order which matches layout order
    return envToServices;
  }, [data]);

  const adjacency = useMemo(() => {
    if (!data) return { out: new Map(), in: new Map() };
    const out = new Map();
    const inn = new Map();
    data.connections.forEach((c) => {
      if (!out.has(c.source)) out.set(c.source, []);
      if (!inn.has(c.target)) inn.set(c.target, []);
      out.get(c.source).push(c.target);
      inn.get(c.target).push(c.source);
    });
    return { out, in: inn };
  }, [data]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!data) return;
      const services = data.nodes.filter((n) => n.type === "service");
      if (services.length === 0) return;

      const currentId = document.activeElement?.getAttribute?.("data-node-id");
      let current = services.find((s) => s.id === currentId) ?? services[0];
      let nextId = current.id;
      const envServices = serviceOrderByEnv.get(current.parent) ?? [];
      const idx = envServices.findIndex((s) => s.id === current.id);

      if (e.key === "ArrowRight") {
        const outs = adjacency.out.get(current.id) ?? [];
        if (outs.length > 0) nextId = outs[0];
      } else if (e.key === "ArrowLeft") {
        const ins = adjacency.in.get(current.id) ?? [];
        if (ins.length > 0) nextId = ins[0];
      } else if (e.key === "ArrowDown") {
        const next = envServices[idx + 1];
        if (next) nextId = next.id;
      } else if (e.key === "ArrowUp") {
        const prev = envServices[idx - 1];
        if (prev) nextId = prev.id;
      } else {
        return;
      }

      e.preventDefault();
      const target = data.nodes.find((n) => n.id === nextId);
      if (target) onSelect({ kind: "node", entity: target });
      // move DOM focus for a11y
      const el = containerRef.current?.querySelector?.(
        `[data-node-id="${nextId}"]`
      );
      if (el) el.focus();
    },
    [data, adjacency, serviceOrderByEnv, onSelect]
  );

  const exportPng = useCallback(async () => {
    if (!containerRef.current) return;
    const png = await toPng(containerRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });
    const a = document.createElement("a");
    a.href = png;
    a.download = "service-topology.png";
    a.click();
  }, []);

  useEffect(() => {
    if (registerExport) registerExport(() => exportPng());
  }, [registerExport, exportPng]);

  useEffect(() => {
    if (data && onDataLoad) {
      onDataLoad(data);
    }
  }, [data, onDataLoad]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            border: "4px solid #e5e7eb",
            borderTop: "4px solid #2563eb",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />
        <Typography variant="h6" color="text.secondary">
          Loading service topology...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          p: 3,
        }}
      >
        <Typography variant="h6" color="error">
          Failed to load service data
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Please check your connection and try refreshing the page.
        </Typography>
      </Box>
    );
  }

  const nodeTypes = {
    default: ServiceNode,
    group: ServiceNode, // Use ServiceNode for group nodes too
  };
  const edgeTypes = { status: StatusEdge };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      style={{ height: "70vh", border: "1px solid #e5e7eb", borderRadius: 12 }}
    >
      <ReactFlow
        key={`reactflow-${data?.nodes?.length || 0}-${
          data?.connections?.length || 0
        }`}
        nodes={elements.nodes}
        edges={elements.edges}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onPaneClick={() => onSelect(null)}
        elementsSelectable
        panOnDrag
        selectionOnDrag
        aria-label="Service topology graph"
      >
        <Background />
        <MiniMap pannable zoomable />
        <Controls />
      </ReactFlow>
    </div>
  );
}
