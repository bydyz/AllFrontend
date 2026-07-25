## 1. 项目初始化

- [ ] 1.1 创建项目目录结构 `DependenciesLearn/Vite/CustomPlugin/vite-plugin-md2vue/`
- [ ] 1.2 创建 `package.json` 文件，配置项目基本信息和依赖
- [ ] 1.3 创建 `tsconfig.json` 文件，配置 TypeScript 编译选项
- [ ] 1.4 创建 `tsup.config.ts` 文件，配置构建工具
- [ ] 1.5 创建 `vitest.config.ts` 文件，配置测试框架
- [ ] 1.6 安装项目依赖（marked、highlight.js、katex、gray-matter 等）

## 2. 类型定义

- [ ] 2.1 创建 `src/types.ts` 文件，定义 `Options` 接口
- [ ] 2.2 定义 `MarkdownOptions` 接口（gfm、breaks、pedantic）
- [ ] 2.3 定义 `HighlightOptions` 接口（enabled、languages、theme）
- [ ] 2.4 定义 `KatexOptions` 接口（enabled、options）
- [ ] 2.5 定义 `ComponentOptions` 接口（name、wrapperClass、exposeProps）
- [ ] 2.6 定义 `FrontmatterData` 接口

## 3. 核心转换逻辑

- [ ] 3.1 创建 `src/transform.ts` 文件，实现核心转换函数
- [ ] 3.2 创建 `src/markdown.ts` 文件，封装 marked 解析器
- [ ] 3.3 实现 Markdown 到 HTML 的转换功能
- [ ] 3.4 支持 GFM（GitHub Flavored Markdown）语法
- [ ] 3.5 支持 breaks 选项（将 \n 转换为 <br>）

## 4. 代码高亮功能

- [ ] 4.1 创建 `src/highlight.ts` 文件，集成 highlight.js
- [ ] 4.2 实现代码块识别和语法高亮
- [ ] 4.3 支持配置支持的编程语言列表
- [ ] 4.4 支持配置高亮主题
- [ ] 4.5 为高亮后的代码块添加正确的 CSS 类名

## 5. 数学公式功能

- [ ] 5.1 创建 `src/katex.ts` 文件，集成 KaTeX
- [ ] 5.2 实现行内数学公式识别（$...$ 格式）
- [ ] 5.3 实现块级数学公式识别（$$...$$ 格式）
- [ ] 5.4 使用 KaTeX 渲染数学公式
- [ ] 5.5 处理 KaTeX 渲染错误，保留原始公式文本

## 6. Frontmatter 支持

- [ ] 6.1 创建 `src/frontmatter.ts` 文件，集成 gray-matter
- [ ] 6.2 实现 YAML 格式的 frontmatter 提取
- [ ] 6.3 将 frontmatter 数据暴露为 Vue 组件变量
- [ ] 6.4 支持将 frontmatter 数据作为 Vue 组件 props 暴露
- [ ] 6.5 处理无 frontmatter 的情况

## 7. Vue 组件生成

- [ ] 7.1 创建 `src/generator.ts` 文件，实现 Vue 组件代码生成
- [ ] 7.2 生成 `<template>` 部分，包含转换后的 HTML
- [ ] 7.3 生成 `<script setup>` 部分，包含 props 定义和 frontmatter 变量
- [ ] 7.4 生成 `<style scoped>` 部分，包含默认样式
- [ ] 7.5 支持自定义组件名称和包裹类名

## 8. 插件主入口

- [ ] 8.1 创建 `src/index.ts` 文件，实现插件主入口函数
- [ ] 8.2 实现 `md2vue` 函数，接受配置选项
- [ ] 8.3 返回包含 `name` 和 `transform` 方法的插件对象
- [ ] 8.4 实现文件类型过滤（只处理 .md 文件）
- [ ] 8.5 实现配置选项合并（默认值 + 用户配置）

## 9. 工具函数

- [ ] 9.1 创建 `src/utils.ts` 文件，实现通用工具函数
- [ ] 9.2 实现配置深度合并函数
- [ ] 9.3 实现文件路径处理函数
- [ ] 9.4 实现错误处理和日志函数

## 10. 单元测试

- [ ] 10.1 创建 `tests/` 目录和测试配置
- [ ] 10.2 创建测试用 Markdown 文件（basic.md、with-frontmatter.md 等）
- [ ] 10.3 编写 `tests/transform.test.ts`，测试核心转换逻辑
- [ ] 10.4 编写 `tests/markdown.test.ts`，测试 Markdown 解析功能
- [ ] 10.5 编写 `tests/highlight.test.ts`，测试代码高亮功能
- [ ] 10.6 编写 `tests/katex.test.ts`，测试数学公式功能
- [ ] 10.7 编写 `tests/frontmatter.test.ts`，测试 Frontmatter 提取功能
- [ ] 10.8 编写 `tests/index.test.ts`，测试插件集成功能

## 11. 示例项目

- [ ] 11.1 创建 `examples/basic/` 基础示例项目
- [ ] 11.2 创建 `examples/basic/vite.config.js`，配置插件
- [ ] 11.3 创建 `examples/basic/src/App.vue`，演示基本使用
- [ ] 11.4 创建 `examples/basic/src/docs/intro.md`，示例 Markdown 文件
- [ ] 11.5 创建 `examples/advanced/` 高级示例项目
- [ ] 11.6 演示代码高亮、数学公式、Frontmatter 等高级功能

## 12. 文档编写

- [ ] 12.1 编写 `README.md` 文件，包含项目介绍和使用说明
- [ ] 12.2 编写安装指南
- [ ] 12.3 编写配置选项说明
- [ ] 12.4 编写使用示例
- [ ] 12.5 编写 API 文档
- [ ] 12.6 编写贡献指南

## 13. 构建和验证

- [ ] 13.1 运行 TypeScript 类型检查
- [ ] 13.2 运行单元测试，确保所有测试通过
- [ ] 13.3 构建项目，生成 dist 目录
- [ ] 13.4 验证构建产物（ESM 和 CJS 格式）

## 14. 后续任务（暂缓执行）

> **注意**: 以下任务将在后续阶段执行，当前版本不包含 npm 发布。

- [ ] 14.1 配置 npm 发布选项
- [ ] 14.2 准备发布到 npm
