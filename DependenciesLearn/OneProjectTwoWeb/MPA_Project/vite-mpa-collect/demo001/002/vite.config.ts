import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        'page-a': resolve(__dirname, 'page-a.html'),
        'page-b': resolve(__dirname, 'page-b.html'),
      },
    },
  },
  base: './'  // 默认 /
})
