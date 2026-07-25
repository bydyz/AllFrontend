import type { Plugin } from 'vite'
import type { Options } from './types'
import { resolveOptions, isMarkdownFile } from './utils'
import { transform } from './transform'

/**
 * Vite 插件：将 Markdown 文件转换为 Vue 组件
 * 
 * @param options - 插件配置选项
 * @returns Vite 插件对象
 * 
 * @example
 * ```js
 * // vite.config.js
 * import { defineConfig } from 'vite'
 * import md2vue from 'vite-plugin-md2vue'
 * 
 * export default defineConfig({
 *   plugins: [
 *     md2vue({
 *       highlight: { enabled: true },
 *       katex: { enabled: true }
 *     })
 *   ]
 * })
 * ```
 */
export default function md2vue(options: Options = {}): Plugin {
  const resolvedOptions = resolveOptions(options)
  
  return {
    name: 'vite-plugin-md2vue',
    
    transform(code, id) {
      // 只处理 .md 文件
      if (!isMarkdownFile(id)) {
        return undefined
      }
      
      try {
        return transform(code, id, resolvedOptions)
      } catch (error) {
        console.error(`[vite-plugin-md2vue] 转换文件 ${id} 失败:`, error)
        return undefined
      }
    }
  }
}

// 导出类型
export type { Options, MarkdownOptions, HighlightOptions, KatexOptions, ComponentOptions, FrontmatterData } from './types'
