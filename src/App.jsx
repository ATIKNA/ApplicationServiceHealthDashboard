import { useState, useCallback } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ServiceMap, DetailsPanel, Legend, HealthSummary } from "./components";
import "./App.css";

const drawerWidth = 340;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const [topologyData, setTopologyData] = useState(null);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((open) => !open);
  }, []);

  const drawer = (
    <Box role="complementary" sx={{ width: drawerWidth }}>
      <DetailsPanel selection={selection} />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Application Service Health Dashboard
          </Typography>
          <Box sx={{ flex: 1 }} />
          <IconButton
            color="inherit"
            aria-label="Export as image"
            onClick={() => window.__exportTopology?.()}
          >
            <span role="img" aria-label="download">
              ⬇️
            </span>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="details panel"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <HealthSummary data={topologyData} />
        <ServiceMap
          onSelect={setSelection}
          onDataLoad={setTopologyData}
          registerExport={(fn) => (window.__exportTopology = fn)}
        />
        <Legend />
      </Box>
    </Box>
  );
}

export default App;
