# Pnpm Workspaces Monorepo 项目构建指南

基于 pnpm workspaces 的 Monorepo 项目完整构建指南。

## 什么是 pnpm workspaces

pnpm workspaces 是 pnpm 内置的 Monorepo 解决方案，允许在一个代码库中管理多个包。它与 yarn workspaces 和 lerna 类似，但具有以下优势：

- **节省磁盘空间**：通过硬链接和符号链接共享 node_modules
- **安装速度快**：高度优化的依赖安装算法
- **严格的依赖管理**：防止幽灵依赖

## 项目初始化流程

### 1. 创建项目目录结构

```
PnpmWorkspaces1/
├── pnpm-workspace.yaml    # 工作空间配置文件（核心）
├── package.json          # 根级别 package.json
└── packages/
    ├── utils/            # 工具函数包
    ├── ui/               # UI 组件包（依赖 utils）
    └── app/              # 主应用（依赖 ui）
```

### 2. 配置 pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
```

这告诉 pnpm 将 `packages/` 目录下的所有子目录视为工作区包。也可以使用更复杂的配置：

```yaml
packages:
  - 'packages/*'           # 直接子目录
  - 'packages/*/components' # 嵌套包
  - '!**/dist'            # 排除输出目录
```

### 3. 创建根 package.json

```json
{
  "name": "pnpm-workspaces-demo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm -r run dev",
    "build": "pnpm -r run build"
  }
}
```

关键点：
- `private: true`：根包不能且不应发布为 npm 包
- `pnpm -r`：递归执行所有子包的同名脚本

### 4. 创建子包 structure

每个子包都需要自己的 `package.json`，至少包含：

| 字段 | 说明 |
|-----|------|
| `name` | 包名，推荐使用 scope 如 `@demo/utils` |
| `version` | 版本号 |
| `main` | 入口文件路径 |

#### packages/utils/package.json

```json
{
  "name": "@demo/utils",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "dev": "echo utils dev",
    "build": "echo utils build"
  }
}
```

#### packages/ui/package.json

```json
{
  "name": "@demo/ui",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "dev": "echo ui dev",
    "build": "echo ui build"
  },
  "dependencies": {
    "@demo/utils": "workspace:*"
  }
}
```

#### packages/app/package.json

```json
{
  "name": "@demo/app",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "dev": "echo app dev",
    "build": "echo app build"
  },
  "dependencies": {
    "@demo/ui": "workspace:*"
  }
}
```

### 5. 工作区依赖引用语法

| 语法 | 说明 | 示例 |
|-----|------|------|
| `workspace:*` | 最新版本 | `"@demo/utils": "workspace:*"` |
| `workspace:1.0.0` | 指定版本 | `"@demo/utils": "workspace:1.0.0"` |
| `workspace:~1.0.0` | 兼容版本 | `"@demo/utils": "workspace:~1.0.0"` |
| `workspace:^1.0.0` | 范围版本 | `"@demo/utils": "workspace:^1.0.0"` |

推荐使用 `workspace:*` 以确保始终使用本地最新代码。

## 构建过程详解

### 安装依赖

```bash
pnpm install
```

执行流程：

1. **读取工作区配置**：解析 `pnpm-workspace.yaml`
2. **发现包**：扫描所有 packages 子目录
3. **构建依赖树**：收集所有包的 dependencies
4. **下载外部依赖**：从 npm registry 下载非工作区依赖
5. **链接工作区包**：通过符号链接将工作区包链接到依赖位置

安装后的目录结构：

```
node_modules/
├── .pnpm/                    # pnpm 存储
│   └── node_modules/         # 所有包的物理存储
├── @demo/                    # 工作区包的符号链接
│   ├── utils -> ../../packages/utils
│   └── ui    -> ../../packages/ui
└── express (外部依赖)
```

### 运行脚本

#### 开发模式

```bash
pnpm dev
```

输出：
```
utils dev
ui dev
app dev
```

`-r` 标志按拓扑顺序执行，确保依赖被先构建。

#### 构建

```bash
pnpm build
```

按依赖顺序执行 build 脚本。

### 添加新包

步骤：

1. 在 `packages/` 下创建新目录
2. 创建 `package.json`，设置正确的 name 和 dependencies
3. 工作区会自动发现新包，无需额外配置

### 过滤执行

只对特定包执行命令：

```bash
# 只构建 app 包
pnpm --filter @demo/app build

# 只构建 app 及其依赖
pnpm --filter @demo/app build --recursive

# 排除某个包
pnpm -r --filter '!@demo/ui' build
```

## 常用命令速查表

| 命令 | 说明 |
|-----|------|
| `pnpm install` | 安装所有依赖 |
| `pnpm -r run dev` | 运行所有包的 dev 脚本 |
| `pnpm -r run build` | 运行所有包的 build 脚本 |
| `pnpm -r run test` | 运行所有包的 test 脚本 |
| `pnpm --filter pkg_name cmd` | 对指定包执行命令 |
| `pnpm -r exec echo hello` | 在所有包中执行命令 |
| `pnpm list` | 查看依赖树 |
| `pnpm outdated` | 查看过期依赖 |

## 与其他方案的对比

### pnpm vs yarn workspaces

| 特性 | pnpm workspaces | yarn workspaces |
|-----|---------------|----------------|
| node_modules | 虚拟目录 + 符号链接 | 平铺 |
| 磁盘占用 | 更节省 | 较大 |
| 安装速度 | 更快 | 一般 |
| 严格模式 | 默认启用 | 可选 |

### pnpm vs lerna

| 特性 | pnpm workspaces | lerna |
|-----|---------------|------|
| 包管理 | 内置 | 需要配合 npm/yarn/pnpm |
| 版本管理 | 无 | 有（固定/独立） |
| 依赖安装 | 高效 | 委托给包管理器 |

## 最佳实践

1. **统一命名空间**：使用 `@scope` 避免命名冲突
2. **保持简洁**：每个包职责单一
3. **使用 filter**：只构建变更的包加速开发
4. **类型检查**：添加 TypeScript 支持
5. **统一构建工具**：使用 turbo / nx 管理构建流程

## 项目结构总结

```
PnpmWorkspaces1/
├── pnpm-workspace.yaml      # 工作空间配置（必需）
├── package.json          # 根配置
├── packages/
│   ├── utils/
│   │   ├── package.json # 包配置
│   │   └── src/
│   │       └── index.js # 源码
│   ├── ui/
│   │   ├── package.json
│   │   └── src/
│   │       └── index.js
│   └── app/
│       ├── package.json
│       └── src/
│           └── index.js
└── README.md
```