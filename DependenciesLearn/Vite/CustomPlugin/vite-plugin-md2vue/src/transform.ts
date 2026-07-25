import type { ResolvedOptions } from './types'
import { parseFrontmatter } from './frontmatter'
import { renderMarkdown } from './markdown'
import { highlightCode } from './highlight'
import { renderKatex } from './katex'
import { generateVueComponent } from './generator'

/**
 * 核心转换函数
 * 将 Markdown 内容转换为 Vue 组件代码
 */
export function transform(
  code: string,
  id: string,
  options: ResolvedOptions
): string {
  // 1. 提取 frontmatter
  const { frontmatter, content } = parseFrontmatter(code)
  
  // 2. Markdown → HTML
  let html = renderMarkdown(content, options.markdown)
  
  // 3. 代码高亮
  if (options.highlight.enabled) {
    html = highlightCode(html, options.highlight)
  }
  
  // 4. 数学公式渲染
  if (options.katex.enabled) {
    html = renderKatex(html, options.katex)
  }
  
  // 5. 生成 Vue 组件
  return generateVueComponent(html, frontmatter, options.component)
}
