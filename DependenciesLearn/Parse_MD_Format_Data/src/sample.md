---
title: Markdown 示例文档
author: md-parser-demo
date: 2026-05-23
tags:
  - markdown
  - demo
  - parser
  - 前端
---

# Markdown 解析技术演示

## 什么是 Markdown？

Markdown 是一种**轻量级标记语言**，它允许人们使用易读易写的*纯文本格式*编写文档，然后~~转换成~~有效的 HTML。`Markdown` 由 John Gruber 于 2004 年创建。

### 常见应用场景

1. **技术文档** — README、Wiki、API 文档
2. **博客写作** — 静态站点生成器（如 Hexo、VitePress）
3. **笔记记录** — Obsidian、Notion、语雀
4. **论坛交流** — GitHub Issues、Stack Overflow

### 列表示例

#### 无序列表

- 前端技术
  - HTML / CSS
  - JavaScript / TypeScript
  - 框架
    - Vue.js
    - React
    - Svelte
- 后端技术
  - Node.js
  - Python
  - Go

#### 有序列表

1. 安装依赖
2. 配置项目
3. 编写代码
4. 运行调试
5. 部署上线

### 引用

> 代码是写给人看的，顺便能在机器上运行。
>
> — Harold Abelson

> 任何傻瓜都能写出计算机可以理解的代码。优秀的程序员能写出人类可以理解的代码。
>
> — Martin Fowler

### 代码块

内联代码示例：使用 `Array.prototype.map()` 方法。

JavaScript 示例：

```javascript
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const result = [1, 2, 3, 4, 5].map(x => x * 2)
console.log(result) // [2, 4, 6, 8, 10]
```

CSS 示例：

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 16px;
}
```

### 表格

| 解析工具      | 类型        | AST 支持 | 性能   | 插件生态 |
|--------------|------------|---------|--------|---------|
| remark       | AST 解析器  | mdast   | 中等   | 丰富    |
| marked       | 编译器      | tokens  | 快     | 有限    |
| markdown-it  | 编译器      | tokens  | 快     | 丰富    |
| micromark    | 流式解析器  | events  | 最快   | 扩展    |
| gray-matter  | frontmatter | 无      | 快     | 无      |

### 任务列表

- [x] 了解 Markdown 解析原理
- [x] 选择合适的解析工具
- [ ] 实现文档解析功能
- [ ] 编写单元测试
- [ ] 部署上线

### 链接和图片

[GitHub](https://github.com)

[Vite 官方文档](https://vitejs.dev)

### 水平分割线

---
