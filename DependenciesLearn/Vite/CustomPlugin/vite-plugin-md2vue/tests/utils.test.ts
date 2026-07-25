import { describe, it, expect } from 'vitest'
import { resolveOptions, isMarkdownFile, escapeHtml } from '../src/utils'

describe('resolveOptions', () => {
  it('应该返回默认配置', () => {
    const options = resolveOptions()
    expect(options.markdown.gfm).toBe(true)
    expect(options.markdown.breaks).toBe(false)
    expect(options.highlight.enabled).toBe(true)
    expect(options.katex.enabled).toBe(true)
    expect(options.component.name).toBe('MarkdownContent')
  })

  it('应该合并用户配置', () => {
    const options = resolveOptions({
      markdown: { breaks: true },
      highlight: { enabled: false }
    })
    expect(options.markdown.gfm).toBe(true)
    expect(options.markdown.breaks).toBe(true)
    expect(options.highlight.enabled).toBe(false)
  })

  it('应该深度合并配置', () => {
    const options = resolveOptions({
      component: { name: 'CustomComponent' }
    })
    expect(options.component.name).toBe('CustomComponent')
    expect(options.component.wrapperClass).toBe('markdown-body')
  })
})

describe('isMarkdownFile', () => {
  it('应该识别 .md 文件', () => {
    expect(isMarkdownFile('test.md')).toBe(true)
    expect(isMarkdownFile('path/to/file.md')).toBe(true)
    expect(isMarkdownFile('file.markdown')).toBe(true)
  })

  it('应该忽略非 Markdown 文件', () => {
    expect(isMarkdownFile('test.js')).toBe(false)
    expect(isMarkdownFile('test.vue')).toBe(false)
    expect(isMarkdownFile('test.ts')).toBe(false)
  })
})

describe('escapeHtml', () => {
  it('应该转义 HTML 特殊字符', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;')
    expect(escapeHtml("it's")).toBe("it&#039;s")
    expect(escapeHtml('a & b')).toBe('a &amp; b')
  })
})
