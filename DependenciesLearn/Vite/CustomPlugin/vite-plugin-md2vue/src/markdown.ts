import { marked } from 'marked'
import type { MarkdownOptions } from './types'

/**
 * 配置 marked 选项
 */
function configureMarked(options: MarkdownOptions): void {
  marked.setOptions({
    gfm: options.gfm,
    breaks: options.breaks,
    pedantic: options.pedantic
  })
}

/**
 * 将 Markdown 转换为 HTML
 */
export function renderMarkdown(content: string, options: MarkdownOptions): string {
  configureMarked(options)
  
  try {
    const result = marked.parse(content)
    // marked.parse 可能返回 string 或 Promise<string>
    // 在同步模式下，它返回 string
    return typeof result === 'string' ? result : ''
  } catch (error) {
    console.error('[vite-plugin-md2vue] Markdown 解析错误:', error)
    return content
  }
}

/**
 * 获取 marked 配置
 */
export function getMarkedOptions(): MarkdownOptions {
  return {
    gfm: true,
    breaks: false,
    pedantic: false
  }
}
