import matter from 'gray-matter'
import type { FrontmatterData, ParsedFrontmatter } from './types'

/**
 * 解析 Markdown 文件中的 frontmatter
 */
export function parseFrontmatter(code: string): ParsedFrontmatter {
  try {
    const { data, content } = matter(code)
    
    // 检查是否有有效的 frontmatter
    const hasFrontmatter = Object.keys(data).length > 0
    
    return {
      frontmatter: hasFrontmatter ? (data as FrontmatterData) : null,
      content: content.trim()
    }
  } catch (error) {
    console.warn('[vite-plugin-md2vue] Frontmatter 解析失败:', error)
    return {
      frontmatter: null,
      content: code.trim()
    }
  }
}

/**
 * 生成 frontmatter 变量代码
 */
export function generateFrontmatterVariable(frontmatter: FrontmatterData | null): string {
  if (!frontmatter) {
    return 'const frontmatter = {}'
  }
  
  return `const frontmatter = ${JSON.stringify(frontmatter, null, 2)}`
}

/**
 * 生成 props 定义代码
 */
export function generatePropsDefinition(frontmatter: FrontmatterData | null): string {
  if (!frontmatter) {
    return ''
  }

  const props: string[] = []
  
  if (frontmatter.title !== undefined) {
    props.push(`  title: { type: String, default: '${escapeString(frontmatter.title)}' }`)
  }
  
  if (frontmatter.description !== undefined) {
    props.push(`  description: { type: String, default: '${escapeString(frontmatter.description)}' }`)
  }
  
  if (frontmatter.date !== undefined) {
    props.push(`  date: { type: String, default: '${escapeString(frontmatter.date)}' }`)
  }
  
  if (frontmatter.tags !== undefined) {
    props.push(`  tags: { type: Array, default: () => ${JSON.stringify(frontmatter.tags)} }`)
  }

  if (props.length === 0) {
    return ''
  }

  return `const props = defineProps({
${props.join(',\n')}
})`
}

/**
 * 转义字符串中的特殊字符
 */
function escapeString(str: string | number | boolean): string {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}
