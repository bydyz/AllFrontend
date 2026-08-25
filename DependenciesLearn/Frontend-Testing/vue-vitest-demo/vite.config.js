import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    // 使用 jsdom 作为测试环境，模拟浏览器环境
    environment: 'jsdom',
    // 全局启用测试 API（describe, it, expect 等）
    globals: true,
    // 测试文件匹配模式
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    // 覆盖率配置
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: ['src/main.js']
    }
  }
})
