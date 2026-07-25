# vite-plugin-md2vue

一个将 Markdown 文件转换为 Vue 组件的 Vite 插件，支持代码高亮和数学公式渲染。

## 特性

- ✅ **基础转换**：将 Markdown 转换为 Vue 组件
- ✅ **代码高亮**：支持多种编程语言的语法高亮（highlight.js）
- ✅ **数学公式**：支持 KaTeX 数学公式渲染
- ✅ **Frontmatter**：支持 YAML 格式的元数据提取
- ✅ **配置灵活**：提供丰富的配置选项
- ✅ **TypeScript**：完整的 TypeScript 支持

## 安装

```bash
npm install vite-plugin-md2vue -D
# 或
yarn add vite-plugin-md2vue -D
# 或
pnpm add vite-plugin-md2vue -D
```

## 快速开始

### 1. 配置插件

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import md2vue from 'vite-plugin-md2vue'

export default defineConfig({
  plugins: [
    md2vue()
  ]
})
```

### 2. 创建 Markdown 文件

```markdown
<!-- src/docs/intro.md -->
---
title: 我的文章
description: 这是一篇测试文章
---

# 文章标题

这是文章内容。

## 代码示例

```javascript
console.log('Hello World!')
```
```

### 3. 在 Vue 组件中使用

```vue
<template>
  <div>
    <MarkdownContent />
  </div>
</template>

<script setup>
import MarkdownContent from './docs/intro.md'
</script>
```

## 配置选项

```typescript
interface Options {
  // Markdown 解析选项
  markdown?: {
    gfm?: boolean          // 支持 GitHub Flavored Markdown（默认：true）
    breaks?: boolean       // 将 \n 转换为 <br>（默认：false）
    pedantic?: boolean     // 宽容模式（默认：false）
  }
  
  // 代码高亮选项
  highlight?: {
    enabled?: boolean      // 是否启用代码高亮（默认：true）
    languages?: string[]   // 支持的语言列表
    theme?: string         // highlight.js 主题（默认：'github'）
  }
  
  // 数学公式选项
  katex?: {
    enabled?: boolean      // 是否启用 KaTeX（默认：true）
    options?: object       // KaTeX 配置选项
  }
  
  // Vue 组件选项
  component?: {
    name?: string          // 组件名称（默认：'MarkdownContent'）
    wrapperClass?: string  // 包裹元素的 CSS 类名（默认：'markdown-body'）
    exposeProps?: boolean  // 是否暴露 props（默认：true）
  }
}
```

### 完整配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import md2vue from 'vite-plugin-md2vue'

export default defineConfig({
  plugins: [
    md2vue({
      markdown: {
        gfm: true,
        breaks: true
      },
      highlight: {
        enabled: true,
        languages: ['javascript', 'typescript', 'html', 'css', 'python'],
        theme: 'monokai'
      },
      katex: {
        enabled: true,
        options: { throwOnError: false }
      },
      component: {
        name: 'MyMarkdown',
        wrapperClass: 'markdown-content',
        exposeProps: true
      }
    })
  ]
})
```

## 功能演示

### 代码高亮

支持多种编程语言的语法高亮：

```javascript
// JavaScript
const greet = (name) => `Hello, ${name}!`
```

```typescript
// TypeScript
interface User {
  id: number
  name: string
}
```

```python
# Python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
```

### 数学公式

支持行内和块级数学公式：

行内公式：$E = mc^2$

块级公式：

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

### Frontmatter

支持在 Markdown 文件中添加元数据：

```markdown
---
title: 文章标题
description: 文章描述
date: 2024-01-15
tags: [vue, vite]
---

# 文章内容
```

## 示例项目

查看 `examples/basic/` 目录获取完整的使用示例。

## 开发

### 安装依赖

```bash
npm install
```

### 运行测试

```bash
npm test
```

### 构建

```bash
npm run build
```

## TypeScript

本插件使用 TypeScript 编写，提供完整的类型定义。

```typescript
import type { Options } from 'vite-plugin-md2vue'

const options: Options = {
  highlight: { enabled: true },
  katex: { enabled: true }
}
```

## 浏览器兼容性

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT
