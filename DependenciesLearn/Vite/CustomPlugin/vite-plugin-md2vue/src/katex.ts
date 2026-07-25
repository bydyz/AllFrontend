import katex from 'katex'
import type { KatexOptions } from './types'

/**
 * 渲染数学公式
 */
export function renderKatex(html: string, options: KatexOptions): string {
  if (!options.enabled) {
    return html
  }

  // 先处理块级公式 $$...$$
  const blockMathRegex = /\$\$([\s\S]+?)\$\$/g
  html = html.replace(blockMathRegex, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: true,
        ...options.options
      })
    } catch (error) {
      console.warn('[vite-plugin-md2vue] 块级数学公式渲染失败:', error)
      return match
    }
  })

  // 再处理行内公式 $...$
  const inlineMathRegex = /\$([^\$\n]+?)\$/g
  html = html.replace(inlineMathRegex, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        ...options.options
      })
    } catch (error) {
      console.warn('[vite-plugin-md2vue] 行内数学公式渲染失败:', error)
      return match
    }
  })

  return html
}
