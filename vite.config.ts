import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('@xyflow') || id.includes('recharts')) {
              return 'graph-vendor';
            }
            if (id.includes('@google/genai') || id.includes('@neondatabase')) {
              return 'ai-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
