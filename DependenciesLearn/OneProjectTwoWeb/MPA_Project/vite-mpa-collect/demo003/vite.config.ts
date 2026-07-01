import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readdirSync, renameSync, rmdirSync, existsSync } from 'fs'
import type { Plugin } from 'vite'

function flattenHtmlPlugin(): Plugin {
  let outDir = 'dist'

  function walkAndMove(dir: string, outRoot: string) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        walkAndMove(full, outRoot)
      } else if (entry.name.endsWith('.html')) {
        const target = resolve(outRoot, entry.name)
        if (full !== target && !existsSync(target)) {
          renameSync(full, target)
        }
      }
    }
    try {
      const remaining = readdirSync(dir)
      if (remaining.length === 0 && dir !== outRoot) {
        rmdirSync(dir)
      }
    } catch { /* ignore */ }
  }

  return {
    name: 'flatten-html',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const outRoot = resolve(process.cwd(), outDir)
      if (existsSync(outRoot)) {
        walkAndMove(outRoot, outRoot)
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), flattenHtmlPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        'page-a': resolve(__dirname, 'src/pages/page-a.html'),
        'page-b': resolve(__dirname, 'src/pages/page-b.html'),
      },
      output: {
        dir: 'dist',
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      },
    },
  },
})
