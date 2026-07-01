import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'

export default defineConfig({
  plugins: [
    vue(),
    createMpaPlugin({
      template: 'template.html',
      pages: [
        {
          name: 'entry-a',
          entry: '/src/entry-a/main.ts',
          data: { title: '入口A - 首页' },
        },
        {
          name: 'entry-b',
          entry: '/src/entry-b/main.ts',
          data: { title: '入口B - 仪表盘' },
        },
      ],
    }),
  ],
})
