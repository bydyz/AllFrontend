# Vite Monorepo 项目设计

## 项目概述

使用 pnpm workspaces 创建 Monorepo，包含两个子包：
1. `my-vite`: 简易的本地开发服务器 + HMR
2. `vue-app`: 基于 Vue 3 的 Demo 应用，使用 my-vite 作为构建工具

## 目录结构

```
Vite1/
├── packages/
│   ├── my-vite/          # 简易版 Vite
│   │   ├── src/
│   │   │   └── index.ts # 核心逻辑
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── vue-app/         # Vue 3 Demo
│       ├── src/
│       │   ├── main.ts
│       │   ├── App.vue
│       │   └── components/
│       │       └── HelloWorld.vue
│       ├── index.html
│       ├── package.json
│       └── tsconfig.json
├── pnpm-workspace.yaml
├── package.json         # 根 package.json
└── tsconfig.json        # 根 tsconfig
```

## my-vite 功能范围

- 开发服务器 (`vite --serve` 或 `vite`)
- 静态文件服务
- ES Module 模块加载
- 文件变化时 HMR 热更新
- 无生产构建能力

## vue-app 功能范围

- 单个 Vue 3 组件 (HelloWorld.vue)
- 入口 main.ts 挂载到 #app
- 通过 my-vite 启动开发服务器
- 修改组件后触发热更新验证

## 工作流

1. 安装依赖: `pnpm install`
2. 启动 vue-app: `pnpm --filter vue-app dev`
3. 修改 App.vue，热更新生效

## 依赖版本

- my-vite: 开发依赖 none (纯 TypeScript)
- vue-app: vue@^3.4