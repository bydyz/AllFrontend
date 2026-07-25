import { Plugin } from 'vite';

/**
 * Markdown 解析选项
 */
interface MarkdownOptions {
    /** 是否启用 GitHub Flavored Markdown */
    gfm?: boolean;
    /** 是否将 \n 转换为 <br> */
    breaks?: boolean;
    /** 是否使用宽容模式 */
    pedantic?: boolean;
}
/**
 * 代码高亮选项
 */
interface HighlightOptions {
    /** 是否启用代码高亮 */
    enabled?: boolean;
    /** 支持的编程语言列表 */
    languages?: string[];
    /** highlight.js 主题 */
    theme?: string;
}
/**
 * KaTeX 数学公式选项
 */
interface KatexOptions {
    /** 是否启用 KaTeX */
    enabled?: boolean;
    /** KaTeX 渲染选项 */
    options?: Record<string, unknown>;
}
/**
 * Vue 组件选项
 */
interface ComponentOptions {
    /** 组件名称 */
    name?: string;
    /** 包裹元素的 CSS 类名 */
    wrapperClass?: string;
    /** 是否暴露 frontmatter 为 props */
    exposeProps?: boolean;
}
/**
 * 插件配置选项
 */
interface Options {
    /** Markdown 解析选项 */
    markdown?: MarkdownOptions;
    /** 代码高亮选项 */
    highlight?: HighlightOptions;
    /** KaTeX 数学公式选项 */
    katex?: KatexOptions;
    /** Vue 组件选项 */
    component?: ComponentOptions;
}
/**
 * Frontmatter 数据
 */
interface FrontmatterData {
    /** 文章标题 */
    title?: string;
    /** 文章描述 */
    description?: string;
    /** 发布日期 */
    date?: string;
    /** 标签列表 */
    tags?: string[];
    /** 其他自定义字段 */
    [key: string]: unknown;
}

/**
 * Vite 插件：将 Markdown 文件转换为 Vue 组件
 *
 * @param options - 插件配置选项
 * @returns Vite 插件对象
 *
 * @example
 * ```js
 * // vite.config.js
 * import { defineConfig } from 'vite'
 * import md2vue from 'vite-plugin-md2vue'
 *
 * export default defineConfig({
 *   plugins: [
 *     md2vue({
 *       highlight: { enabled: true },
 *       katex: { enabled: true }
 *     })
 *   ]
 * })
 * ```
 */
declare function md2vue(options?: Options): Plugin;

export { type ComponentOptions, type FrontmatterData, type HighlightOptions, type KatexOptions, type MarkdownOptions, type Options, md2vue as default };
