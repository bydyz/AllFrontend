# learn-vite 工程完整文档

## 项目概述

本项目是一个 **pnpm monorepo**，用于学习 Vite 开发服务器启动流程的**阶段一（启动准备）**。通过直接引用 Vite 源码中的实现，将 `parseArgs → loadConfig → resolvePlugins` 这条链路拆分为两个包：

- **mini-vite-core**：阶段一的核心实现，封装 Vite 的配置解析能力
- **mini-vite-app**：配置消费方，通过自定义 `vite.config.ts` 验证 core 的能力

对应时序图中的阶段一：

```
CLI → parseArgs(process.argv)
CLI → ConfigLoader: loadConfig(root, overrides)
  ConfigLoader → 查找 vite.config.{js,ts,mjs,mts}
  ConfigLoader → 执行配置文件 (IIFE)
  ConfigLoader → 合并默认配置
ConfigLoader → CLI: resolvedConfig

CLI → PluginRunner: resolvePlugins(plugins)
  PluginRunner → 依次激活插件
  PluginRunner → plugin.build.start()
PluginRunner → CLI: resolvedPlugins
```

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | v20.19.1 | 运行时 |
| pnpm | 10.10.0 | 包管理器 + workspace |
| Vite | 6.3.5+ | 核心依赖，提供 resolveConfig、loadConfigFromFile 等 API |
| tsx | 4.x | TypeScript 直接运行（无需编译步骤） |
| mri | 1.2.0 | 轻量级 CLI 参数解析（与 Vite 内部实现一致） |
| TypeScript | 5.x | 类型系统 |

---

## 目录结构

```
D:\desktop\learn-vite\
├── pnpm-workspace.yaml              # pnpm workspace 声明
├── package.json                     # 根 package，scripts 入口
│
└── packages/
    ├── mini-vite-core/              # 阶段一核心实现
    │   ├── src/
    │   │   ├── cli-parser.ts        # CLI 参数解析（mri）
    │   │   ├── config.ts            # 配置加载 + 解析（引用 Vite 源码）
    │   │   ├── plugin.ts            # 插件列表格式化输出
    │   │   ├── index.ts             # 统一导出 + resolvePhase1 门面函数
    │   │   └── cli.ts              # CLI 入口，完整阶段一流程演示
    │   ├── bin/
    │   │   └── vite.js             # CLI 可执行入口（#!/usr/bin/env node）
    │   ├── package.json
    │   └── tsconfig.json
    │
    └── mini-vite-app/               # 配置消费方
        ├── src/
        │   └── main.ts             # 调用 core，打印阶段一结果
        ├── vite.config.ts          # 自定义配置（port, alias, server）
        ├── package.json
        └── tsconfig.json
```

---

## 完整数据流

```
┌─────────────────────────────────────────────────────────────────────┐
│                        数据流向图                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  mini-vite-app                         mini-vite-core                │
│  ─────────────                         ──────────────                │
│                                                                     │
│  vite.config.ts                                                   │
│    │                                                               │
│    ▼                                                               │
│  main.ts                                                          │
│    │                                                               │
│    ├──▶ resolvePhase1({         ┌──────────────────────┐           │
│    │      configFile,           │  loadAndResolveConfig │          │
│    │      mode                  │       │              │           │
│    │    })                      │       ▼              │           │
│    │                            │  loadConfigFromFile  │ ← Vite   │
│    │                            │  (查找并加载配置)     │   源码    │
│    │                            │       │              │           │
│    │                            │       ▼              │           │
│    │                            │  resolveConfig       │ ← Vite   │
│    │                            │  (合并默认+插件排序)  │   源码    │
│    │                            │       │              │           │
│    │                            │       ▼              │           │
│    │◀───────────────────────────│  { config, plugins } │           │
│    │                            └──────────────────────┘           │
│    ▼                                                               │
│  输出:                                                             │
│    root, mode, configPath                                         │
│    server.port, server.host                                       │
│    resolve.alias (自定义 + Vite 内置)                               │
│    plugins[] (23个 Vite 内置插件)                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 各文件完整解析

### 1. 根目录配置

#### `pnpm-workspace.yaml`

```yaml
packages:
  - 'packages/*'
```

声明 pnpm workspace，将 `packages/` 下所有子目录识别为独立包。pnpm 会自动处理包之间的符号链接。

#### `package.json`

```json
{
  "name": "learn-vite",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter mini-vite-core dev",
    "app": "pnpm --filter mini-vite-app start"
  }
}
```

- `pnpm --filter <name>`: 仅在指定包中执行脚本
- `pnpm dev`: 运行 core 包的 dev 脚本（直接看阶段一默认输出）
- `pnpm app`: 运行 app 包的 start 脚本（通过 core 获取自定义配置）

---

### 2. mini-vite-core 包

#### `package.json`

```json
{
  "name": "mini-vite-core",
  "version": "0.1.0",
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "bin": {
    "mini-vite": "./bin/vite.js"
  },
  "scripts": {
    "dev": "tsx src/cli.ts"
  },
  "dependencies": {
    "vite": "^6.3.5",
    "mri": "^1.2.0"
  },
  "devDependencies": {
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

关键设计：
- `"type": "module"`: 使用 ESM 模块格式，与 Vite 保持一致
- `"main"` + `"exports"`: 指向 `src/index.ts`，允许其他包直接导入 TypeScript 源码（由 tsx 处理）
- `"bin"`: 定义 CLI 可执行命令 `mini-vite`
- 依赖 `vite`: 直接引用 Vite 源码中的 `resolveConfig`、`loadConfigFromFile` 等 API
- 依赖 `mri`: 与 Vite 内部使用的参数解析库一致

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

- `"moduleResolution": "bundler"`: 适配 tsx 的模块解析方式
- `"esModuleInterop": true`: 允许 `import mri from 'mri'` 这种默认导入语法

#### `src/cli-parser.ts` — CLI 参数解析

```typescript
import mri from 'mri'

export interface CliArgs {
  root?: string
  configFile?: string
  mode?: string
  port?: number
  host?: string
}

export function parseArgs(argv: string[]): CliArgs {
  return mri(argv, {
    alias: {
      c: 'configFile',
      m: 'mode',
      p: 'port',
      h: 'host',
    },
    string: ['configFile', 'mode', 'root', 'host'],
    number: ['port'],
    default: {
      mode: 'development',
    },
  })
}
```

**说明：**
- 使用 `mri` 库解析命令行参数，与 Vite 源码内部实现一致
- 支持的别名：`-c` → `--configFile`，`-m` → `--mode`，`-p` → `--port`，`-h` → `--host`
- 默认 mode 为 `development`
- 返回的 `CliArgs` 对象包含所有可选参数

**Vite 源码参考：** `vite/dist/node/cli.js` 中内联了 mri 库，使用相同的参数解析逻辑。

#### `src/config.ts` — 配置加载与解析

```typescript
import { resolveConfig, loadConfigFromFile } from 'vite'
import type { CliArgs } from './cli-parser.js'

export async function loadAndResolveConfig(args: CliArgs) {
  const root = args.root || process.cwd()
  const mode = args.mode || 'development'

  const loaded = await loadConfigFromFile(
    { mode, command: 'serve' },
    args.configFile,
    root
  )

  const config = await resolveConfig(
    {
      root,
      configFile: args.configFile,
      mode,
      server: {
        port: args.port,
        host: args.host,
      },
    },
    'serve'
  )

  return { config, root, mode, configPath: loaded?.path }
}
```

**说明：**
- 直接从 `vite` 包导入两个核心函数：
  - `loadConfigFromFile`: 查找并加载 `vite.config.{js,ts,mjs,mts}` 文件
  - `resolveConfig`: 合并默认配置、运行插件 config 钩子、排序插件
- `loadConfigFromFile` 参数：
  - `configEnv`: `{ mode, command: 'serve' }` — 告诉 Vite 这是开发模式
  - `configFile`: 用户指定的配置文件路径（可选）
  - `configRoot`: 配置文件搜索的根目录
- `resolveConfig` 参数：
  - `inlineConfig`: 包含 root、configFile、mode、server 等用户配置
  - `command`: `'serve'` 表示开发服务器模式
- 返回 `config`（Vite 的 `ResolvedConfig` 类型）包含所有解析后的配置

**Vite 源码参考：**
- `loadConfigFromFile` → `vite/dist/node/chunks/dep-*.js` 第 49197 行
- `resolveConfig` → `vite/dist/node/chunks/dep-*.js` 第 48701 行

#### `src/plugin.ts` — 插件列表格式化

```typescript
import type { Plugin } from 'vite'

export function formatPluginList(plugins: readonly Plugin[]): string {
  return plugins
    .map((p, i) => `    ${String(i + 1).padStart(2, ' ')}. ${p.name || '(unnamed)'}`)
    .join('\n')
}
```

**说明：**
- 将 Vite 的插件数组格式化为带编号的列表字符串
- `readonly Plugin[]`: Vite 的 `ResolvedConfig.plugins` 是只读数组
- 用于 CLI 输出时展示插件链

#### `src/index.ts` — 统一导出 + 门面函数

```typescript
import type { ResolvedConfig, Plugin } from 'vite'
import { loadAndResolveConfig } from './config.js'

export interface Phase1Result {
  config: ResolvedConfig
  plugins: readonly Plugin[]
  root: string
  mode: string
  configPath: string | undefined
}

export async function resolvePhase1(opts: {
  root?: string
  configFile?: string
  mode?: string
}): Promise<Phase1Result> {
  const { config, root, mode, configPath } = await loadAndResolveConfig({
    root: opts.root,
    configFile: opts.configFile,
    mode: opts.mode,
  })

  return {
    config,
    plugins: config.plugins || [],
    root,
    mode,
    configPath,
  }
}

export { parseArgs } from './cli-parser.js'
export type { CliArgs } from './cli-parser.js'
export { loadAndResolveConfig } from './config.js'
export { formatPluginList } from './plugin.js'
```

**说明：**
- `Phase1Result` 接口：定义阶段一的返回结构，包含完整配置、插件列表、根目录、模式、配置文件路径
- `resolvePhase1`: 门面函数，将 `loadAndResolveConfig` 包装为更简洁的 API，供外部包调用
- 统一导出所有子模块的类型和函数

#### `src/cli.ts` — CLI 入口，完整流程演示

```typescript
import { parseArgs } from './cli-parser.js'
import { loadAndResolveConfig } from './config.js'
import { formatPluginList } from './plugin.js'

async function main() {
  const args = parseArgs(process.argv.slice(2))

  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║       阶段一：启动准备 (Phase 1)          ║')
  console.log('╚══════════════════════════════════════════╝\n')

  console.log('[1] parseArgs')
  console.log('    args:', JSON.stringify(args, null, 2))

  console.log('\n[2] loadConfig + resolveConfig')
  const { config, root, mode, configPath } = await loadAndResolveConfig(args)
  console.log('    配置文件:', configPath || '未找到，使用默认配置')
  console.log('    root:', root)
  console.log('    mode:', mode)
  console.log('    server.port:', config.server?.port)
  console.log('    server.host:', config.server?.host)
  console.log('    resolve.alias:', JSON.stringify(config.resolve?.alias))

  console.log('\n[3] resolvePlugins')
  const plugins = config.plugins || []
  console.log('    插件数量:', plugins.length)
  console.log(formatPluginList(plugins))

  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║       阶段一完成，配置已就绪              ║')
  console.log('║   可传递给 createServer() 进入阶段二     ║')
  console.log('╚══════════════════════════════════════════╝\n')
}

main().catch(console.error)
```

**说明：**
- 这是 `pnpm dev` 直接运行的脚本
- 按时序图阶段一的三个步骤依次执行并打印结果
- 展示 parseArgs 的输出、resolvedConfig 的关键字段、插件列表

#### `bin/vite.js` — CLI 可执行入口

```javascript
#!/usr/bin/env node
import '../dist/cli.js'
```

**说明：**
- 当通过 `npx mini-vite` 或全局安装后调用时，从此文件启动
- 当前未编译到 dist，所以此文件暂不可用（仅 `pnpm dev` 通过 tsx 直接运行 src/cli.ts）

---

### 3. mini-vite-app 包

#### `package.json`

```json
{
  "name": "mini-vite-app",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "start": "tsx src/main.ts"
  },
  "dependencies": {
    "mini-vite-core": "workspace:*"
  },
  "devDependencies": {
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

**说明：**
- `"mini-vite-core": "workspace:*"`: 使用 pnpm workspace 协议引用本地 core 包
- `workspace:*` 会被 pnpm 自动替换为符号链接，修改 core 包代码后无需重新安装

#### `vite.config.ts` — 自定义配置

```typescript
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  server: {
    port: 3000,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
}
```

**说明：**
- ESM 环境下通过 `import.meta.url` 获取 `__dirname`（等效于 CJS 的 `__dirname`）
- `server.port: 3000`: 覆盖 Vite 默认的 5173 端口
- `server.host: 'localhost'`: 指定监听地址
- `resolve.alias`: 定义路径别名
  - `@` → `src/` 目录
  - `@components` → `src/components/` 目录
- Vite 会自动合并用户 alias 和内置 alias（如 `@vite/client`、`@vite/env`）

#### `src/main.ts` — 调用 core 获取配置

```typescript
import { resolvePhase1, formatPluginList } from 'mini-vite-core'

async function main() {
  console.log('╔══════════════════════════════════════════╗')
  console.log('║     mini-vite-app：获取阶段一配置         ║')
  console.log('╚══════════════════════════════════════════╝\n')

  const result = await resolvePhase1({
    configFile: './vite.config.ts',
    mode: 'development',
  })

  console.log('[配置结果]')
  console.log('  root:', result.root)
  console.log('  mode:', result.mode)
  console.log('  配置文件:', result.configPath)
  console.log('')
  console.log('[server]')
  console.log('  port:', result.config.server?.port)
  console.log('  host:', result.config.server?.host)
  console.log('')
  console.log('[resolve.alias]')
  for (const alias of result.config.resolve?.alias || []) {
    console.log(' ', alias.find, '->', alias.replacement)
  }
  console.log('')
  console.log('[plugins]', result.plugins.length, '个')
  console.log(formatPluginList(result.plugins))
  console.log('')
  console.log('╔══════════════════════════════════════════╗')
  console.log('║  配置已就绪，可传递给 createServer()     ║')
  console.log('║           进入阶段二                      ║')
  console.log('╚══════════════════════════════════════════╝')
}

main().catch(console.error)
```

**说明：**
- 从 `mini-vite-core` 导入 `resolvePhase1` 和 `formatPluginList`
- 调用 `resolvePhase1` 传入 `configFile` 和 `mode`
- 输出结果包含：root、mode、configPath、server 配置、alias 列表、插件列表
- alias 列表中会同时包含用户自定义的 `@`、`@components` 和 Vite 内置的 `@vite/client`、`@vite/env`

---

## Vite 源码引用对照

本项目直接引用的 Vite API：

| 本项目函数 | Vite 源码位置 | Vite 内部实现 |
|-----------|-------------|-------------|
| `loadConfigFromFile()` | `vite/dist/node/chunks/dep-*.js:49197` | 查找配置文件 → esbuild 打包 → 加载导出 |
| `resolveConfig()` | `vite/dist/node/chunks/dep-*.js:48701` | 合并默认配置 → 运行 config 钩子 → 排序插件 → 运行 configResolved |
| `sortUserPlugins()` | `vite/dist/node/chunks/dep-*.js:49184` | 按 enforce: pre/normal/post 分类插件 |

Vite 配置文件查找顺序（`DEFAULT_CONFIG_FILES`）：
1. `vite.config.js`
2. `vite.config.mjs`
3. `vite.config.ts`
4. `vite.config.cjs`
5. `vite.config.mts`
6. `vite.config.cts`

Vite 内置插件链（23 个，按顺序）：
1. `vite:optimized-deps` — 依赖预构建
2. `vite:watch-package-data` — 包数据监听
3. `vite:pre-alias` — 预别名解析
4. `alias` — 路径别名
5. `vite:modulepreload-polyfill` — 模块预加载 polyfill
6. `vite:resolve` — 模块解析
7. `vite:html-inline-proxy` — HTML 内联代理
8. `vite:css` — CSS 处理
9. `vite:esbuild` — esbuild 转换
10. `vite:json` — JSON 处理
11. `vite:wasm-helper` — WASM 辅助
12. `vite:worker` — Web Worker
13. `vite:asset` — 资源处理
14. `vite:wasm-fallback` — WASM 回退
15. `vite:define` — 定义全局变量
16. `vite:css-post` — CSS 后处理
17. `vite:worker-import-meta-url` — Worker import.meta.url
18. `vite:asset-import-meta-url` — 资源 import.meta.url
19. `vite:dynamic-import-vars` — 动态导入变量
20. `vite:import-glob` — import.meta.glob
21. `vite:client-inject` — 客户端注入
22. `vite:css-analysis` — CSS 分析
23. `vite:import-analysis` — 导入分析

---

## 运行命令

```bash
# 安装依赖
cd D:\desktop\learn-vite
pnpm install

# 运行 core 包（直接看阶段一默认输出）
pnpm dev

# 运行 app 包（通过 core 获取自定义配置）
pnpm app
```

### 预期输出

**`pnpm dev`（core 包默认运行）：**
```
╔══════════════════════════════════════════╗
║       阶段一：启动准备 (Phase 1)          ║
╚══════════════════════════════════════════╝

[1] parseArgs
    args: { "_": [], "mode": "development" }

[2] loadConfig + resolveConfig
    配置文件: 未找到，使用默认配置
    root: D:\desktop\learn-vite\packages\mini-vite-core
    mode: development
    server.port: 5173
    server.host: undefined

[3] resolvePlugins
    插件数量: 23
     1. vite:optimized-deps
     2. vite:watch-package-data
     ...

╔══════════════════════════════════════════╗
║       阶段一完成，配置已就绪              ║
║   可传递给 createServer() 进入阶段二     ║
╚══════════════════════════════════════════╝
```

**`pnpm app`（app 包使用自定义配置）：**
```
╔══════════════════════════════════════════╗
║     mini-vite-app：获取阶段一配置         ║
╚══════════════════════════════════════════╝

[配置结果]
  root: D:\desktop\learn-vite\packages\mini-vite-app
  mode: development
  配置文件: D:/desktop/learn-vite/packages/mini-vite-app/vite.config.ts

[server]
  port: 3000
  host: localhost

[resolve.alias]
  @ -> D:\desktop\learn-vite\packages\mini-vite-app\src
  @components -> D:\desktop\learn-vite\packages\mini-vite-app\src\components
  /^\/?@vite\/env/ -> /@fs/.../vite/dist/client/env.mjs
  /^\/?@vite\/client/ -> /@fs/.../vite/dist/client/client.mjs

[plugins] 23 个
  1. vite:optimized-deps
  ...

╔══════════════════════════════════════════╗
║  配置已就绪，可传递给 createServer()     ║
║           进入阶段二                      ║
╚══════════════════════════════════════════╝
```

---

## 扩展指南

### 添加新的 CLI 参数

1. 在 `cli-parser.ts` 的 `CliArgs` 接口中添加字段
2. 在 `mri` 的 alias/string/number 配置中注册
3. 在 `config.ts` 的 `resolveConfig` 调用中传递到 `inlineConfig`

### 修改插件链

当前阶段一不组装自定义插件（仅使用 Vite 内置插件）。如需添加自定义插件：

1. 在 `config.ts` 的 `resolveConfig` 调用中添加 `plugins: [yourPlugin]`
2. Vite 会自动将其合并到插件链中（根据 `enforce` 属性排序）

### 添加 TypeScript 类型导出

1. 确保 `tsconfig.json` 中 `"declaration": true`
2. 运行 `tsc --emitDeclarationOnly` 生成 `.d.ts` 文件
3. 在 `package.json` 的 `exports` 中添加 `"types"` 字段

### 添加单元测试

1. 安装测试框架：`pnpm add -D vitest`
2. 在 `package.json` 中添加 `"test": "vitest"`
3. 创建 `src/__tests__/` 目录编写测试

---

## 已知限制

1. `bin/vite.js` 指向 `dist/cli.js`，但当前未编译到 dist，仅 `pnpm dev` 可用
2. `loadConfigFromFile` 和 `resolveConfig` 被调用了两次（一次获取 path，一次获取完整配置），可优化为单次调用
3. 未处理 `configFile: false` 的情况（跳过配置文件）
4. 未实现 `--force` 参数强制重新优化依赖
