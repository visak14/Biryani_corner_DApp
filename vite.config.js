import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['ethers'],
      output: {
        // Ensure JSON files are treated as modules
        manualChunks: {
          json: ['./artifacts/contracts/**/*.json'],
        },
      },
    },
  },
});
