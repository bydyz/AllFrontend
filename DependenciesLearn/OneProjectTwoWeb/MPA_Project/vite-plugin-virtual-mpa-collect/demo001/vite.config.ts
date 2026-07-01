import { defineConfig } from 'vite'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'

export default defineConfig({
  plugins: [
    createMpaPlugin({
      template: 'template.html',
      pages: [
        {
          name: 'page1',
          entry: '/src/page1/index.js',
          data: { title: '页面1' },
        },
        {
          name: 'page2',
          entry: '/src/page2/index.js',
          data: { title: '页面2' },
        },
      ],
    }),
  ],
})
