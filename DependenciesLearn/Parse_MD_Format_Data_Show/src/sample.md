# Vue Markdown 解析方案展示

## 什么是 Markdown？

Markdown 是一种**轻量级标记语言**，它允许人们使用易读易写的*纯文本格式*编写文档，然后~~转换成~~有效的 HTML。

### 常见应用场景

1. **技术文档** — README、Wiki、API 文档
2. **博客写作** — VitePress、Hexo
3. **笔记记录** — Obsidian、语雀
4. **论坛交流** — GitHub Issues、Stack Overflow

### 列表示例

- 前端技术
  - HTML / CSS
  - JavaScript / TypeScript
  - Vue.js / React
- 后端技术
  - Node.js
  - Python
  - Go

1. 安装依赖
2. 配置项目
3. 编写代码
4. 运行调试

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

const arr = [1, 2, 3, 4, 5].map(x => x * 2)
console.log(arr) // [2, 4, 6, 8, 10]
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

| 解析工具     | 类型       | 输出格式      | 性能   | 插件生态 |
|------------|-----------|-------------|--------|---------|
| markdown-it | 编译器     | HTML / token | 快     | 丰富    |
| marked     | 编译器     | HTML / token | 快     | 有限    |
| remark     | AST 解析器 | mdast AST    | 中等   | 丰富    |

### 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 任务列表

- [x] 了解 Markdown 解析原理
- [x] 搭建 Vue 演示项目
- [ ] 实现代码高亮
- [ ] 添加数学公式支持

### 链接

[Vue 3 官方文档](https://vuejs.org/)

[Vite 构建工具](https://vitejs.dev/)

---

## 结语

通过本演示可以看到，在 Vue 中对 Markdown 的支持已经非常成熟，选择合适的工具即可实现"完美展示"。
