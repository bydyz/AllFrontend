/**
 * Markdown 解析选项
 */
export interface MarkdownOptions {
  /** 是否启用 GitHub Flavored Markdown */
  gfm?: boolean
  /** 是否将 \n 转换为 <br> */
  breaks?: boolean
  /** 是否使用宽容模式 */
  pedantic?: boolean
}

/**
 * 代码高亮选项
 */
export interface HighlightOptions {
  /** 是否启用代码高亮 */
  enabled?: boolean
  /** 支持的编程语言列表 */
  languages?: string[]
  /** highlight.js 主题 */
  theme?: string
}

/**
 * KaTeX 数学公式选项
 */
export interface KatexOptions {
  /** 是否启用 KaTeX */
  enabled?: boolean
  /** KaTeX 渲染选项 */
  options?: Record<string, unknown>
}

/**
 * Vue 组件选项
 */
export interface ComponentOptions {
  /** 组件名称 */
  name?: string
  /** 包裹元素的 CSS 类名 */
  wrapperClass?: string
  /** 是否暴露 frontmatter 为 props */
  exposeProps?: boolean
}

/**
 * 插件配置选项
 */
export interface Options {
  /** Markdown 解析选项 */
  markdown?: MarkdownOptions
  /** 代码高亮选项 */
  highlight?: HighlightOptions
  /** KaTeX 数学公式选项 */
  katex?: KatexOptions
  /** Vue 组件选项 */
  component?: ComponentOptions
}

/**
 * Frontmatter 数据
 */
export interface FrontmatterData {
  /** 文章标题 */
  title?: string
  /** 文章描述 */
  description?: string
  /** 发布日期 */
  date?: string
  /** 标签列表 */
  tags?: string[]
  /** 其他自定义字段 */
  [key: string]: unknown
}

/**
 * 解析后的 Frontmatter 结果
 */
export interface ParsedFrontmatter {
  /** Frontmatter 数据，如果没有则为 null */
  frontmatter: FrontmatterData | null
  /** 去除 frontmatter 后的 Markdown 内容 */
  content: string
}

/**
 * 完整的配置选项（包含默认值）
 */
export interface ResolvedOptions {
  markdown: Required<MarkdownOptions>
  highlight: Required<HighlightOptions>
  katex: Required<KatexOptions>
  component: Required<ComponentOptions>
}
