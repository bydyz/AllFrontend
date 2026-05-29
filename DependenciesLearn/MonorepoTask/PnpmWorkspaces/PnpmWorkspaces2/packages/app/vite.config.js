import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '@demo/ui': resolve(__dirname, '../ui/src/index.js')
      '@demo/ui': resolve(__dirname, '../ui/src')
    }
  }
})