---
title: 欢迎使用 vite-plugin-md2vue
description: 一个将 Markdown 文件转换为 Vue 组件的 Vite 插件
date: 2024-01-15
tags: [vue, vite, markdown]
---

# 欢迎使用 vite-plugin-md2vue

`vite-plugin-md2vue` 是一个 Vite 插件，可以将 Markdown 文件直接转换为 Vue 组件。

## 主要特性

- ✅ **基础转换**：将 Markdown 转换为 Vue 组件
- ✅ **代码高亮**：支持多种编程语言的语法高亮
- ✅ **数学公式**：支持 KaTeX 数学公式渲染
- ✅ **Frontmatter**：支持 YAML 格式的元数据
- ✅ **配置灵活**：提供丰富的配置选项

## 快速开始

### 安装

```bash
npm install vite-plugin-md2vue -D
```

### 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import md2vue from 'vite-plugin-md2vue'

export default defineConfig({
  plugins: [
    md2vue({
      highlight: { enabled: true },
      katex: { enabled: true }
    })
  ]
})
```

### 使用

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

## 代码示例

### JavaScript

```javascript
// 箭头函数
const greet = (name) => `Hello, ${name}!`

// 类定义
class Calculator {
  add(a, b) {
    return a + b
  }
  
  multiply(a, b) {
    return a * b
  }
}

const calc = new Calculator()
console.log(calc.add(2, 3)) // 5
```

### TypeScript

```typescript
interface User {
  id: number
  name: string
  email: string
}

function getUser(id: number): Promise<User | null> {
  // 模拟 API 调用
  return Promise.resolve(null)
}

const user = await getUser(1)
if (user) {
  console.log(user.name)
}
```

### CSS

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 数学公式

### 行内公式

质能方程：$E = mc^2$

勾股定理：$a^2 + b^2 = c^2$

### 块级公式

二次方程求根公式：

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## 链接

- [Vite 官网](https://vitejs.dev)
- [Vue.js 官网](https://vuejs.org)
- [GitHub 仓库](https://github.com)

---

*由 vite-plugin-md2vue 生成*
