# Markdown 解析器演示 (原生 JS)

使用 **marked** + **highlight.js** 实现 Markdown 实时解析与代码高亮。

## 技术方案

- **构建工具**: Vite
- **Markdown 解析**: [marked](https://marked.js.org/) — 快速轻量的 Markdown 编译器
- **代码高亮**: [highlight.js](https://highlightjs.org/) — 支持 197+ 语言的语法高亮

## 核心文件

| 文件 | 说明 |
|------|------|
| `src/pages/md-parser.js` | 核心解析逻辑、编辑器 + 预览渲染 |
| `src/style.css` | 深色主题样式 |
| `src/main.js` | 入口文件 |

## 业界方案对比

| 方案 | 优势 | 劣势 |
|------|------|------|
| **marked** | 极轻量(20KB)、速度快、生态好 | 扩展性不如 markdown-it |
| **markdown-it** | 插件丰富、配置灵活 | 体积稍大 |
| **remark** | 基于 AST、支持自定义插件 | 学习曲线较陡 |
| **showdown** | 类 Ruby 风格、API 简洁 | 社区活跃度较低 |

## 运行

```bash
npm install
npm run dev
```
