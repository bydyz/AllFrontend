import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readdirSync, renameSync, rmdirSync, existsSync } from 'fs'
import type { Plugin } from 'vite'

/**
 * Vite 插件：构建后将嵌套在多级目录中的 HTML 文件平铺到输出目录根目录
 *
 * 背景：Vite MPA 模式下，多页面入口文件（如 src/pages/page-a.html）
 * 构建后会被放置在 dist/src/pages/ 等嵌套目录中。此插件在打包完成后，
 * 将所有 HTML 文件递归提升到 dist 根目录，并清理产生的空文件夹。
 *
 * 注意：若存在同名 HTML 文件，仅保留第一个（跳过后续冲突文件）。
 */
function flattenHtmlPlugin(): Plugin {
  let outDir = 'dist'

  /**
   * 递归遍历目录，将 HTML 文件移动到输出根目录，并清理空目录
   * @param dir     - 当前遍历的目录路径
   * @param outRoot - 输出根目录（一般是 dist），所有 HTML 都往这里移动
   */
  function walkAndMove(dir: string, outRoot: string) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        // 递归进入子目录
        walkAndMove(full, outRoot)
      } else if (entry.name.endsWith('.html')) {
        // 将 HTML 文件移动到输出根目录（仅当目标不存在时，避免覆盖）
        const target = resolve(outRoot, entry.name)
        if (full !== target && !existsSync(target)) {
          renameSync(full, target)
        }
      }
    }
    // 移动完成后，若当前目录为空且不是输出根目录，则删除它
    try {
      const remaining = readdirSync(dir)
      if (remaining.length === 0 && dir !== outRoot) {
        rmdirSync(dir)
      }
    } catch { /* 忽略权限不足等异常 */ }
  }

  return {
    // 插件标识
    name: 'flatten-html',

    // 获取 Vite 最终解析后的输出目录配置
    configResolved(config) {
      outDir = config.build.outDir
    },

    // 在打包完成后执行 HTML 平铺操作
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
