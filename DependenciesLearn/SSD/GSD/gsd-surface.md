# gsd-surface 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `:gsd:surface` 或 `/gsd-surface` |
| 功能描述 | 控制哪些技能被暴露 - 应用 profile、或在不重新安装的情况下禁用/启用技能集群 |
| 参数提示 | `[list|status|profile <name>|disable <cluster>|enable <cluster>|reset]` |

## 功能概述

在不重新安装的情况下管理运行时技能表面。读取/写入 `$HOME/.claude/.gsd-surface.json`（与 `$HOME/.claude/.gsd-profile` 同级）。

技能目录位于 `$HOME/.claude/skills/gsd-*/`。

**子命令**: list · status · profile · disable · enable · reset

## 参数详解

| 子命令 | 说明 |
|--------|------|
| `list` | 显示启用的 + 禁用的集群和技能 |
| `status` | list + token 成本摘要 |
| `profile <name>` | 写入 baseProfile 并重新应用 |
| `profile <n1>,<n2>` | 组合 profile（逗号分隔，无空格） |
| `disable <cluster>` | 添加集群到 disabledClusters，重新应用 |
| `enable <cluster>` | 从 disabledClusters 移除集群，重新应用 |
| `reset` | 删除 .gsd-surface.json，返回安装时 profile |

## 子命令详解

### list / status

显示当前启用的集群和技能，以及 token 消耗：

```
Enabled (N skills, ~T tokens):
  core_loop:   new-project  discuss-phase  plan-phase  execute-phase  help  update
  audit_review: …
  …

Disabled:
  utility:  health  stats  …

Token cost: ~T (budget cap ~500 tokens for 200k context @ 1%)
```

status 还额外显示：

```
Base profile:   standard  (from .gsd-surface.json)
Install profile: standard  (from .gsd-profile)
```

调用 `listSurface(runtimeConfigDir, manifest, CLUSTERS)` from `get-shit-done/bin/lib/surface.cjs`。

### profile \<name\>

应用预设的技能 profile：

```
1. 读取当前 surface：如果为空，从 install-time profile 种子
2. 设置 surfaceState.baseProfile = name
3. 写入 surface state
4. 解析并重新应用
5. 确认："Surface updated to profile `<name>`. N skills enabled."
```

### disable \<cluster\>

禁用指定的技能集群：

有效集群名称：

- `core_loop` - 核心循环技能
- `audit_review` - 审计审查技能
- `milestone` - 里程碑技能
- `research_ideate` - 研究 Ideation 技能
- `workspace_state` - 工作区状态技能
- `docs` - 文档技能
- `ui` - UI 技能
- `ai_eval` - AI 评估技能
- `ns_meta` - 元技能
- `utility` - 实用工具技能

执行流程：

```
1. 验证集群名称（与 Object.keys(CLUSTERS) 比较）
2. 读取或初始化 surface state
3. 添加集群到 disabledClusters（去重）
4. writeSurface → resolve layout → applySurface
5. 确认："Disabled cluster `<cluster>`. N skills removed from surface."
```

### enable \<cluster\>

重新启用禁用的技能集群：

```
1. 读取 surface state：如为空，打印 "No surface delta active."
2. 从 disabledClusters 移除集群
3. writeSurface → resolve layout → applySurface
4. 确认："Enabled cluster `<cluster>`. N skills added back to surface."
```

### reset

重置到安装时的 profile：

```
1. 检查 .gsd-surface.json 是否存在
2. 删除它
3. 使用 readActiveProfile(runtimeConfigDir) 重新应用
4. 确认："Surface reset to install-time profile `<name>`."
```

## 执行上下文

| 文件 | 说明 |
|------|------|
| `$HOME/.claude/.gsd-surface.json` | Surface 状态文件 |
| `$HOME/.claude/.gsd-profile` | 安装 profile 标记 |
| `$HOME/.claude/skills/gsd-*/` | 技能目录 |
| `$HOME/.claude/get-shit-done/bin/lib/surface.cjs` | 引擎模块 |
| `$HOME/.claude/get-shit-done/bin/lib/clusters.cjs` | 集��定义 |

## token 成本管理

Surface 管理的主要目的是控制上下文 token 使用：

- 200k token 总池的 1% ≈ 500 tokens
- 每个启用的技能消耗约 20-50 tokens
- 通过禁用不使用的技能集群可以节省大量 tokens

## Profile 列表

### Core Profile

最小集合，仅核心循环技能：

- new-project
- discuss-phase
- plan-phase
- execute-phase
- help
- update

### Standard Profile (Default)

Core + 阶段管理：

- Standard 技能 +
- 阶段管理技能

### Full Profile

所有技能：

- Standard 技能 +
- 所有高级技能

## 组合 Profile

可以用逗号组合多个 profiles：

```
/gsd-surface profile core,audit_review
```

这将启用 core + audit_review 两个 profile 中的所有技能。

## 运行时配置目录解析

gsd-surface 使用的 runtimeConfigDir 是**基础 Claude 配置目录**（`~/.claude`），而不是技能子目录。

```
# Claude Code — global install
RUNTIME_CONFIG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
SCOPE="global"

# 通过 resolveRuntimeArtifactLayout 解析工件目的地
# 然后 applySurface(RUNTIME_CONFIG_DIR, layout, manifest, CLUSTERS)
```

Surface 状态存储在 `${RUNTIME_CONFIG_DIR}/.gsd-surface.json`。

路径可以通过读取 `CLAUDE_CONFIG_DIR` 环境变量来覆盖。

## 错误处理

- 未知集群名称 → 列出有效集群名称，退出不写入
- 未知 profile 名称 → 列出已知 profiles (core, standard, full)，退出
- 缺少 surface.cjs → 提示："Run `npm i -g get-shit-done` to reinstall GSD."

## 成功标准

- [ ] 用户看到当前 surface 状态
- [ ] 能够应用/禁用/启用技能集群
- [ ] 能够重置到安装时 profile
- [ ] 配置被持久化

## 后续步骤

- 使用 surface 来优化当前任务的技能可用性
- 根据工作阶段调整 profile
- 如需要，重置回默认 profile

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| GSD 安装 | surface 管理依赖已安装的技能 |
| `/gsd-help` | 显示可用的命令列表 |
| `/gsd-progress` | 可能建议调整 surface |