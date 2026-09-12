import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    cssMinify: 'esbuild', // Prevents LightningCSS from breaking @theme rules
  },
});