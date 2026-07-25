import type { Options, ResolvedOptions } from './types'

/**
 * 默认配置选项
 */
const defaultOptions: ResolvedOptions = {
  markdown: {
    gfm: true,
    breaks: false,
    pedantic: false
  },
  highlight: {
    enabled: true,
    languages: ['javascript', 'typescript', 'html', 'css', 'json', 'bash', 'python', 'java', 'c', 'cpp', 'go', 'rust'],
    theme: 'github'
  },
  katex: {
    enabled: true,
    options: { throwOnError: false }
  },
  component: {
    name: 'MarkdownContent',
    wrapperClass: 'markdown-body',
    exposeProps: true
  }
}

/**
 * 深度合并对象
 */
function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target } as Record<string, unknown>
  
  for (const key in source) {
    if (source[key] !== undefined) {
      const targetValue = (target as Record<string, unknown>)[key]
      const sourceValue = (source as Record<string, unknown>)[key]
      
      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        )
      } else {
        result[key] = sourceValue
      }
    }
  }
  
  return result as T
}

/**
 * 判断是否为普通对象
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * 解析配置选项，填充默认值
 */
export function resolveOptions(options: Options = {}): ResolvedOptions {
  return deepMerge(defaultOptions, options as Partial<ResolvedOptions>) as ResolvedOptions
}

/**
 * 检查文件是否为 Markdown 文件
 */
export function isMarkdownFile(id: string): boolean {
  return id.endsWith('.md') || id.endsWith('.markdown')
}

/**
 * 转义 HTML 特殊字符
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 生成唯一标识符
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
