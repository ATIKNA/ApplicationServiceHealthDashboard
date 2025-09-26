import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'],
    exclude: ['@mui/icons-material/esm']
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Handle problematic Material-UI icon imports
        if (id.includes('@mui/icons-material') && id.includes('esm')) {
          return false;
        }
        return false;
      }
    }
  }
})
