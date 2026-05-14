# genui-sdk-demos

GenUI SDK 示例项目仓库，当前包含一个基于 Vue 3 + Vite 的电商示例应用。

## 环境要求

- Node.js 18+
- pnpm 10+

## 快速开始

在仓库根目录执行：

```bash
pnpm install
```

启动电商示例：

```bash
pnpm -F e-commerce dev
```

启动后默认访问地址通常为：

- [http://localhost:5173](http://localhost:5173)

## 可用脚本

根目录：

- `pnpm dev:server`：启动 `genui-sdk-server`（如果该包已在工作区中配置）

`packages/e-commerce`：

- `pnpm -F e-commerce dev`：本地开发模式（Vite）
- `pnpm -F e-commerce build`：类型检查并构建生产包
- `pnpm -F e-commerce preview`：本地预览构建产物

## 目录结构

```text
genui-sdk-demos/
├─ packages/
│  └─ e-commerce/        # Vue 3 + Vite 云商城示例应用
├─ package.json          # 工作区根配置
└─ pnpm-lock.yaml
```
