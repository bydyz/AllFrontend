import { describe, it, expect } from 'vitest'
import { transform } from '../src/transform'
import { resolveOptions } from '../src/utils'

describe('transform', () => {
  const options = resolveOptions()

  it('应该将 Markdown 转换为 Vue 组件', () => {
    const md = '# Hello World'
    const result = transform(md, 'test.md', options)
    expect(result).toContain('<template>')
    expect(result).toContain('<div class="markdown-body">')
    expect(result).toContain('Hello World')
    expect(result).toContain('</template>')
    expect(result).toContain('<script setup>')
  })

  it('应该包含 frontmatter 变量', () => {
    const md = `---
title: 测试
---

# 内容`
    const result = transform(md, 'test.md', options)
    expect(result).toContain('const frontmatter =')
    expect(result).toContain('"title": "测试"')
  })

  it('应该在没有 frontmatter 时返回空对象', () => {
    const md = '# 没有 frontmatter'
    const result = transform(md, 'test.md', options)
    expect(result).toContain('const frontmatter = {}')
  })

  it('应该包含样式', () => {
    const md = '# 内容'
    const result = transform(md, 'test.md', options)
    expect(result).toContain('<style scoped>')
    expect(result).toContain('.markdown-body')
  })

  it('应该支持自定义 wrapperClass', () => {
    const customOptions = resolveOptions({
      component: { wrapperClass: 'custom-class' }
    })
    const md = '# 内容'
    const result = transform(md, 'test.md', customOptions)
    expect(result).toContain('custom-class')
  })
})
