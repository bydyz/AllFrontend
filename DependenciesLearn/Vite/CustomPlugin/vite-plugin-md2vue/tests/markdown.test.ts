import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '../src/markdown'
import { resolveOptions } from '../src/utils'

describe('renderMarkdown', () => {
  const options = resolveOptions().markdown

  it('应该转换基础 Markdown 语法', () => {
    const md = '# Hello World'
    const html = renderMarkdown(md, options)
    expect(html).toContain('<h1')
    expect(html).toContain('Hello World')
  })

  it('应该支持粗体文本', () => {
    const md = '**粗体文本**'
    const html = renderMarkdown(md, options)
    expect(html).toContain('<strong>')
    expect(html).toContain('粗体文本')
  })

  it('应该支持斜体文本', () => {
    const md = '*斜体文本*'
    const html = renderMarkdown(md, options)
    expect(html).toContain('<em>')
    expect(html).toContain('斜体文本')
  })

  it('应该支持行内代码', () => {
    const md = '`code`'
    const html = renderMarkdown(md, options)
    expect(html).toContain('<code>')
    expect(html).toContain('code')
  })

  it('应该支持无序列表', () => {
    const md = '- item 1\n- item 2'
    const html = renderMarkdown(md, options)
    expect(html).toContain('<ul>')
    expect(html).toContain('<li>')
  })

  it('应该支持链接', () => {
    const md = '[link](https://example.com)'
    const html = renderMarkdown(md, options)
    expect(html).toContain('<a')
    expect(html).toContain('https://example.com')
  })

  it('应该支持 GFM 语法', () => {
    const md = '~~删除线~~'
    const html = renderMarkdown(md, options)
    expect(html).toContain('<del>')
  })
})
