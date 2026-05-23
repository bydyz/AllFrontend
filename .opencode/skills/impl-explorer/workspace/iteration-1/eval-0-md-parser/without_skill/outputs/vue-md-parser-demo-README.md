# Markdown 解析器演示 (Vue 3)

使用 **Vue 3** + **marked** + **highlight.js** 实现 Markdown 实时解析与代码高亮。

## 技术方案

- **框架**: Vue 3 (Composition API + `<script setup>`)
- **构建工具**: Vite
- **Markdown 解析**: [marked](https://marked.js.org/)
- **代码高亮**: [highlight.js](https://highlightjs.org/)

## 核心文件

| 文件 | 说明 |
|------|------|
| `src/components/MdParserDemo.vue` | 核心组件，含解析逻辑与样式 |
| `src/App.vue` | 根组件 |
| `src/main.js` | 入口文件 |

## 业界方案对比

| 方案 | 优势 | 劣势 |
|------|------|------|
| **marked** | 极轻量(20KB)、速度快、API 简洁 | 插件生态不如 markdown-it |
| **markdown-it** | 丰富的插件系统(TOC、emoji 等) | 体积稍大、配置较复杂 |
| **remark/rehype** | AST 操作灵活、MDX 支持 | 学习曲线高、体积较大 |
| **@vue/repl** | Vue SFC 原生支持 | 仅限 Vue 场景 |

## 运行

```bash
npm install
npm run dev
```
