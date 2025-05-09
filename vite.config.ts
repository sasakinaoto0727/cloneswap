import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'stream-browserify', 'util'],
  },
});
