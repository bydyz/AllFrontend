import { describe, it, expect } from 'vitest'
import { parseFrontmatter, generateFrontmatterVariable, generatePropsDefinition } from '../src/frontmatter'

describe('parseFrontmatter', () => {
  it('应该解析包含 frontmatter 的 Markdown', () => {
    const md = `---
title: 测试标题
description: 测试描述
date: "2024-01-15"
tags: [vue, vite]
---

# 正文内容`

    const result = parseFrontmatter(md)
    expect(result.frontmatter).toEqual({
      title: '测试标题',
      description: '测试描述',
      date: '2024-01-15',
      tags: ['vue', 'vite']
    })
    expect(result.content).toContain('# 正文内容')
  })

  it('应该处理没有 frontmatter 的 Markdown', () => {
    const md = '# 没有 frontmatter 的内容'
    const result = parseFrontmatter(md)
    expect(result.frontmatter).toBeNull()
    expect(result.content).toBe('# 没有 frontmatter 的内容')
  })

  it('应该处理空的 frontmatter', () => {
    const md = `---
---

# 空的 frontmatter`

    const result = parseFrontmatter(md)
    expect(result.frontmatter).toBeNull()
    expect(result.content).toContain('# 空的 frontmatter')
  })
})

describe('generateFrontmatterVariable', () => {
  it('应该生成 frontmatter 变量代码', () => {
    const frontmatter = { title: '测试', tags: ['vue'] }
    const code = generateFrontmatterVariable(frontmatter)
    expect(code).toContain('const frontmatter =')
    expect(code).toContain('"title": "测试"')
  })

  it('应该处理 null frontmatter', () => {
    const code = generateFrontmatterVariable(null)
    expect(code).toBe('const frontmatter = {}')
  })
})

describe('generatePropsDefinition', () => {
  it('应该生成 props 定义代码', () => {
    const frontmatter = { title: '测试标题', description: '测试描述' }
    const code = generatePropsDefinition(frontmatter)
    expect(code).toContain('defineProps')
    expect(code).toContain('title: { type: String')
    expect(code).toContain('description: { type: String')
  })

  it('应该处理没有标准字段的 frontmatter', () => {
    const frontmatter = { custom: 'value' }
    const code = generatePropsDefinition(frontmatter)
    expect(code).toBe('')
  })

  it('应该处理 null frontmatter', () => {
    const code = generatePropsDefinition(null)
    expect(code).toBe('')
  })
})
