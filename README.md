# Application Service Health Dashboard

A responsive, single-page dashboard for visualizing microservices architecture and monitoring service health in real-time. Built for DevOps Engineers and Site Reliability Engineers (SREs) to quickly understand service status and performance.

## 🚀 Features

### Core Functionality
- **Service Topology Visualization**: Interactive graph showing service connections and relationships
- **Environment Grouping**: Services organized by Production and Staging environments
- **Real-time Metrics**: Simulated live data for RPS, latency, and error rates
- **Interactive Selection**: Click nodes/connections to view detailed information
- **Status Indicators**: Color-coded health status (Healthy/Degraded/Offline)

### Enhanced Features
- **System Health Overview**: Dashboard summary with overall health percentage
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Professional UI**: Material-UI components with responsive design
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Export Functionality**: PNG export of service topology
- **Loading States**: Professional loading spinners and error handling

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite
- **UI Framework**: Material-UI (MUI) v5
- **Visualization**: React Flow for graph rendering
- **Styling**: Emotion (CSS-in-JS) with Material-UI theming
- **Icons**: Material-UI Icons
- **Export**: html-to-image for PNG generation

## 📋 Requirements Implementation

✅ **Canvas & Service Map**: Graph topology with environment grouping  
✅ **Node & Connection Rendering**: Visual status indicators and colored connections  
✅ **Interactivity**: Hover tooltips, click selection, canvas deselection  
✅ **Details Panel**: Service attributes and real-time metrics simulation  
✅ **Real-time Data**: Metrics update every 2-3 seconds with specified ranges  
✅ **Data Structure**: Uses exact JSON schema from requirements  
✅ **Responsive Design**: Works on desktop and tablet sizes  
✅ **Professional Aesthetic**: Clean, modern, and polished UI  

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tcl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to the URL shown in terminal (typically `http://localhost:5173`)
   - The dashboard will load with sample service data

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Data Structure

The application uses the exact JSON structure specified in the requirements:

```json
{
  "nodes": [
    { "id": "prod-env", "type": "environment", "name": "Production" },
    { "id": "frontend-app", "type": "service", "parent": "prod-env", "name": "React Frontend", "tech": "React", "version": "2.1.0", "status": "HEALTHY" }
  ],
  "connections": [
    { "id": "conn-1", "source": "frontend-app", "target": "user-api", "status": "HEALTHY" }
  ]
}
```

## 🎨 Design Decisions

### Architecture
- **React Flow**: Chosen for robust graph visualization with built-in features like zoom, pan, and selection
- **Material-UI**: Provides accessible, professional components with consistent theming
- **Component Structure**: Modular design with separate components for nodes, edges, and panels

### User Experience
- **Color Coding**: Green (Healthy), Orange (Degraded), Red (Offline) for immediate status recognition
- **Hover Effects**: Subtle animations provide visual feedback
- **Responsive Layout**: Drawer collapses on mobile, maintains functionality
- **Loading States**: Professional spinners prevent user confusion

### Performance
- **Memoization**: React.memo and useMemo prevent unnecessary re-renders
- **Efficient Updates**: Real-time metrics only update when connection is selected
- **Optimized Rendering**: React Flow handles large graphs efficiently

## 🔧 Development Notes

### Challenges Faced
1. **Material-UI Icons**: Resolved missing icon files by reinstalling and configuring Vite
2. **React Flow Integration**: Custom node types and edge styling for status visualization
3. **Real-time Simulation**: Implemented efficient interval management with cleanup

### Future Enhancements
- WebSocket integration for real-time data
- Service filtering and search functionality
- Historical metrics and trend visualization
- Alert management and notification system

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This is a take-home project submission. For questions or issues, please refer to the original requirements in `BRIEF.md`.

## 📄 License

This project is part of a technical assessment and is not intended for production use.
