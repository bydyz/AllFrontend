import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@demo/ui': resolve(__dirname, '../ui/src')
      // 继续 PnpmWorkspaces2 进行调整   之前的是如下，其他是其上
      // '@demo/ui': resolve(__dirname, '../ui/src/index.js')
    }
  }
})