import hljs from 'highlight.js'
import type { HighlightOptions } from './types'

/**
 * 对 HTML 中的代码块进行语法高亮
 */
export function highlightCode(html: string, options: HighlightOptions): string {
  if (!options.enabled) {
    return html
  }

  // 匹配 <code class="language-xxx">...</code> 或 <code>...</code>
  const codeBlockRegex = /<code(?:\s+class="(?:hljs\s+)?language-(\w+)")?>([\s\S]*?)<\/code>/g
  
  return html.replace(codeBlockRegex, (match, lang, code) => {
    // 如果没有语言标识，尝试自动检测
    if (!lang) {
      try {
        const result = hljs.highlightAuto(code, options.languages as string[])
        if (result.relevance > 0) {
          return `<code class="hljs language-${result.language}">${result.value}</code>`
        }
      } catch {
        // 自动检测失败，返回原始代码
      }
      return match
    }

    // 检查是否支持该语言
    if (options.languages?.includes(lang) && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(code, { language: lang }).value
        return `<code class="hljs language-${lang}">${highlighted}</code>`
      } catch (error) {
        console.warn(`[vite-plugin-md2vue] 代码高亮失败 (${lang}):`, error)
      }
    }

    return match
  })
}

/**
 * 获取所有支持的语言
 */
export function getSupportedLanguages(): string[] {
  return hljs.listLanguages() as string[]
}
