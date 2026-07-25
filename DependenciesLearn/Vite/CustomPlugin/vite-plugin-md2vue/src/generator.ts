import type { ComponentOptions, FrontmatterData } from './types'
import { generateFrontmatterVariable, generatePropsDefinition } from './frontmatter'

/**
 * 生成 Vue 组件代码
 */
export function generateVueComponent(
  html: string,
  frontmatter: FrontmatterData | null,
  options: ComponentOptions
): string {
  const componentName = options.name
  const wrapperClass = options.wrapperClass
  
  // 生成 frontmatter 变量
  const frontmatterVariable = generateFrontmatterVariable(frontmatter)
  
  // 生成 props 定义
  const propsDefinition = options.exposeProps ? generatePropsDefinition(frontmatter) : ''
  
  // 组合 script setup 内容
  const scriptSetupContent = [
    propsDefinition,
    frontmatterVariable
  ].filter(Boolean).join('\n\n')

  return `
<template>
  <div class="${wrapperClass}">
    ${html}
  </div>
</template>

<script setup>
${scriptSetupContent}
</script>

<style scoped>
.${wrapperClass} {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  padding: 20px;
}

.${wrapperClass} :deep(h1),
.${wrapperClass} :deep(h2),
.${wrapperClass} :deep(h3),
.${wrapperClass} :deep(h4),
.${wrapperClass} :deep(h5),
.${wrapperClass} :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.${wrapperClass} :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.${wrapperClass} :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.${wrapperClass} :deep(p) {
  margin-top: 0;
  margin-bottom: 16px;
}

.${wrapperClass} :deep(ul),
.${wrapperClass} :deep(ol) {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 16px;
}

.${wrapperClass} :deep(li) {
  margin-top: 0.25em;
}

.${wrapperClass} :deep(blockquote) {
  margin: 0 0 16px 0;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

.${wrapperClass} :deep(pre) {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
  margin-top: 0;
  margin-bottom: 16px;
}

.${wrapperClass} :deep(code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 85%;
}

.${wrapperClass} :deep(code:not(pre code)) {
  background: rgba(27, 31, 35, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.${wrapperClass} :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-top: 0;
  margin-bottom: 16px;
}

.${wrapperClass} :deep(th),
.${wrapperClass} :deep(td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.${wrapperClass} :deep(th) {
  font-weight: 600;
  background: #f6f8fa;
}

.${wrapperClass} :deep(tr:nth-child(2n)) {
  background: #f6f8fa;
}

.${wrapperClass} :deep(img) {
  max-width: 100%;
  height: auto;
}

.${wrapperClass} :deep(hr) {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}
</style>
  `.trim()
}
