# pnpm -r run dev 命令解析

## 命令组成

```
pnpm -r run dev
```

| 参数 | 说明 |
|------|------|
| `pnpm` | pnpm 包管理器 |
| `-r` | recursive，递归模式，在所有工作区包中执行 |
| `run` | 运行 package.json 中的 scripts 脚本 |
| `dev` | 要执行的脚本名称 |

## 工作区结构

当前项目是一个 pnpm monorepo，由 `pnpm-workspace.yaml` 定义：

```yaml
packages:
  - 'packages/*'
```

工作区包含 3 个包：

```
packages/
├── app/      # @demo/app
├── ui/       # @demo/ui
└── utils/    # @demo/utils
```

## 依赖关系

```
@app
  └─ depends on @demo/ui

@ui
  └─ depends on @demo/utils

@utils
  └─ (无工作区依赖)
```

## 执行机制

当执行 `pnpm -r run dev` 时：

1. **递归扫描**：pnpm 会扫描所有在 `packages/*` 下的包
2. **拓扑排序**：根据包之间的工作区依赖关系自动排序，确保依赖被先构建
3. **按序执行**：按排序结果依次执行每个包的 `dev` 脚本

基于上述依赖链，执行顺序为：

1. `@demo/utils` (无依赖) → 执行 `echo utils dev`
2. `@demo/ui` (依赖 @demo/utils) → 执行 `echo ui dev`
3. `@demo/app` (依赖 @demo/ui) → 执行 `echo app dev`

## 预期输出

```
Packages resolved: 3
Scope: @demo

>>> @demo/utils@1.0.0 dev
echo utils dev
utils dev

>>> @demo/ui@1.0.0 dev
echo ui dev
ui dev

>>> @demo/app@1.0.0 dev
echo app dev
app dev
```

## 关键特性

- **自动依赖解析**：无需手动指定顺序，pnpm 自动计算正确的执行顺序
- **工作区协议**：`workspace:*` 让包始终使用最新版本，便于本地开发
- **过滤执行**：可配合 `--filter` 指定只运行某些包，如 `pnpm -r --filter @demo/app run dev`

## 相关命令

| 命令 | 作用 |
|------|------|
| `pnpm -r run build` | 在所有包中执行 build 脚本 |
| `pnpm -r --filter @demo/ui run dev` | 仅对 @demo/ui 执行 dev |
| `pnpm -r --filter '@demo/*' run dev` | 对 matched 包执行 |
| `pnpm -r run dev --parallel` | 并行执行（添加 `--parallel` 标志） |

## 总结

`pnpm -r run dev` 的核心作用是在 monorepo 环境中**一键启动所有包的开发服务器**。pnpm 通过读取工作区配置、自动解析包依赖、按拓扑顺序执行，确保每个包在其依赖准备好之后再运行，特别适合同时开发多个互相依赖的库或应用。