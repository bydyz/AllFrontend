import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mpaModule from 'vite-plugin-mpa'

const mpa = mpaModule.default || mpaModule

export default defineConfig({
  plugins: [
    vue(),
    mpa()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
