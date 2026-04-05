# AGENTS.md

## 项目概述

个人前端学习知识库，每个子目录都是独立项目，拥有各自的 `package.json`。

## 目录结构

| 目录 | 用途 |
|------|------|
| `vue3/` | Vue 3 学习项目 |
| `react/` | React 学习项目 |
| `LearnBuildTool/` | 构建工具学习（Webpack 等） |
| `LearnDependencies/` | 库学习（tailwind、xlsx、vue-router 等） |
| `LearnHtmlCSS/` | HTML/CSS 学习 |
| `LearnJS/` | JavaScript 深入学习 |
| `LearnTS/` | TypeScript 教程 |
| `LearnVue3Collect/` | Vue 3 源码学习，包含 monorepo 结构 |
| `LearnMonorepo/` | Monorepo 模式学习 |
| `LearnPackageManagementTool/` | 包管理工具学习（Vite、Webpack、NPM） |
| `LearnSvg/` | SVG 学习 |
| `LearnNativeDevelop/` | 原生开发（原生 JS 能力） |
| `前端模块化/` | ESModule、CommonJS 模块化 |
| `浏览器/` | 浏览器原理学习 |
| `Node-Serve/` | Express、Koa 后端服务 |
| `Node/` | Node.js 实践示例 |
| `MySQL/` | MySQL Node.js 使用 |
| `puppeteer/` | Puppeteer 示例 |
| `mf-lib/` | 微前端库，私有 npm 发布 |
| `MyTemplate/` | 可复用代码模板 |
| `DuYi/` | 渡一课程资料 |
| `OptimizeCollect/` | 性能优化收集 |
| `zzzSrc/` | 测试代码 |

## 项目使用说明

### 运行项目

- **Vue CLI 项目**: `npm run serve` / `npm run build`
- **Vite 项目**: `npm run dev` / `npm run build`
- **Rollup 项目** (vue-next-mini): `npm run dev` (监听模式) / `npm run build`
- **Node 项目**: `npm start` 或 `node src/index.js`

### 特殊配置

- **mf-lib/**: 自定义 npm 脚本 `npm run login` 和 `npm run pub`，用于发布到私有仓库 `https://nexus.armpc.cn/repository/npm-hosted/`
- 部分项目使用 `yarn.lock`（如 `react/05_learn_redux/`），部分使用 `package-lock.json`

### 通用约定

- 项目文件夹常带有编号前缀（如 `01.product_demo`、`02.product_demo`），表示学习顺序
- 每个项目通常有独立的 `node_modules` 和锁文件
- 根目录不存在构建系统，各子目录自包含

## 语言规范

所有分析过程和解答均使用中文。
