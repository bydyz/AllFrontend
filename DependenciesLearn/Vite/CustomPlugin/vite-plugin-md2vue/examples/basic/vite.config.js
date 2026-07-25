import { defineConfig } from 'vite'
import md2vue from 'vite-plugin-md2vue'

export default defineConfig({
  plugins: [
    md2vue({
      highlight: {
        enabled: true,
        languages: ['javascript', 'typescript', 'html', 'css']
      },
      katex: {
        enabled: true
      },
      component: {
        name: 'MarkdownContent',
        wrapperClass: 'markdown-body',
        exposeProps: true
      }
    })
  ]
})
