import { describe, it, expect } from 'vitest'
import md2vue from '../src/index'
import type { Options } from '../src/types'

describe('md2vue 插件', () => {
  it('应该返回一个有效的 Vite 插件对象', () => {
    const plugin = md2vue()
    expect(plugin).toBeDefined()
    expect(plugin.name).toBe('vite-plugin-md2vue')
    expect(typeof plugin.transform).toBe('function')
  })

  it('应该接受配置选项', () => {
    const options: Options = {
      highlight: { enabled: false },
      component: { name: 'CustomMarkdown' }
    }
    const plugin = md2vue(options)
    expect(plugin.name).toBe('vite-plugin-md2vue')
  })

  it('应该只处理 .md 文件', () => {
    const plugin = md2vue()
    
    // 非 .md 文件应该返回 undefined
    const jsResult = plugin.transform?.('console.log("hello")', 'test.js', {} as any)
    expect(jsResult).toBeUndefined()
    
    const vueResult = plugin.transform?.('<template></template>', 'test.vue', {} as any)
    expect(vueResult).toBeUndefined()
  })

  it('应该处理 .md 文件', () => {
    const plugin = md2vue()
    const md = '# Hello World'
    const result = plugin.transform?.(md, 'test.md', {} as any)
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    if (typeof result === 'string') {
      expect(result).toContain('<template>')
      expect(result).toContain('Hello World')
    }
  })

  it('应该处理带有完整 frontmatter 的 Markdown', () => {
    const plugin = md2vue()
    const md = `---
title: 测试标题
description: 测试描述
tags: [vue, vite]
---

# 正文内容`
    
    const result = plugin.transform?.(md, 'test.md', {} as any)
    expect(result).toBeDefined()
    if (typeof result === 'string') {
      expect(result).toContain('测试标题')
      expect(result).toContain('测试描述')
      expect(result).toContain('vue')
      expect(result).toContain('vite')
    }
  })

  it('应该处理包含代码块的 Markdown', () => {
    const plugin = md2vue({ highlight: { enabled: true } })
    const md = `# 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello')
}
\`\`\`
`
    const result = plugin.transform?.(md, 'test.md', {} as any)
    expect(result).toBeDefined()
    if (typeof result === 'string') {
      expect(result).toContain('hljs')
      expect(result).toContain('language-javascript')
    }
  })

  it('应该处理包含数学公式的 Markdown', () => {
    const plugin = md2vue({ katex: { enabled: true } })
    const md = `# 数学公式

行内公式：$E = mc^2$

块级公式：

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$
`
    const result = plugin.transform?.(md, 'test.md', {} as any)
    expect(result).toBeDefined()
    if (typeof result === 'string') {
      expect(result).toContain('katex')
    }
  })
})
