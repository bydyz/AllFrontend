import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [
    nodePolyfills({
      include: ['buffer'],
    }),
  ],
  optimizeDeps: {
    include: ['buffer'],
  },
})
