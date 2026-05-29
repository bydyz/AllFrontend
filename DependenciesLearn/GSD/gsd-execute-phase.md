# gsd-execute-phase 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `/gsd-execute-phase` |
| 功能描述 | 使用波次并行执行方式执行阶段中的所有计划 |
| 参数提示 | `<phase-number> [--wave N] [--gaps-only] [--interactive] [--tdd]` |

## 功能概述

使用波次并行执行方式执行阶段中的所有计划。

**编排器保持精简**：发现计划，分析依赖，分组为波次，spawn subagents，收集结果。每个 subagent 加载完整的执行计划上下文并自行处理其计划。

**上下文预算**：~15% 用于编排器，每个 subagent 获得全新的上下文。

## 参数详解

### 主要参数

| 参数 | 说明 |
|------|------|
| `<phase-number>` | **必需** - 要执行的阶段号 |

### 可选标志

| 参数 | 说明 |
|------|------|
| `--wave N` | 只执行第 N 波次的计划。用于 pacing、quota 管理或分阶段 rollout |
| `--gaps-only` | 只执行差距关闭计划（在 frontmatter 中标记为 `gap_closure: true`）。verify-work 创建修复计划后使用 |
| `--interactive` | 顺序执行计划（无 subagents），任务之间有用户检查点。较小的 token 使用，配对编程风格。适用于小型阶段、bug 修复和验证差距 |

### 标志激活规则

**标志只有在 `$ARGUMENTS` 中出现字面 token 时才激活**：

- `--wave N` 只有当字面 `--wave` token 存在于 `$ARGUMENTS` 时才激活
- `--gaps-only` 只有当字面 `--gaps-only` token 存在时才激活
- `--interactive` 只有当字面 `--interactive` token 存在时才激活
- 如果这些 token 都不存在，运行标准的全阶段执行流程

## 执行流程详解

### 第一步：发现计划

```
1. 读取 PLAN.md
2. 识别所有任务
3. 收集任务元数据
```

### 第二步：依赖分析

```
4. 分析任务间的依赖关系
5. 构建依赖图
6. 识别循环依赖（如有则报错）
```

### 第三步：分组为波次

```
7. 根据依赖关系将任务分组
8. 无依赖的任务为 Wave 1
9. 依赖 Wave 1 的为 Wave 2
10. 以此类推
```

### 第四步：并行执行每一波

```
11. Spawn subagents 并行执行同一 Wave 中的任务
12. 每个 subagent 获得全新的上下文
13. 每个 subagent 处理自己的任务
```

**关键原则**：每个 subagent 在全新的 200k-token 上下文中工作，确保上下文不会膨胀。

### 第五步：验证与合并

```
14. 等待 Wave 中的所有任务完成
15. 验证每一任务的输出
16. 如果有任务失败，根据策略处理（重试或停止）
```

### 第六步：状态更新

```
17. 更新 STATE.md
18. 记录完成的任务
19. 记录遇到的问题
```

## 波次执行示例

假设有以下任务结构：

```
Wave 1:
  ├── Task 1.1: Setup project structure
  ├── Task 1.2: Create base components
  └── Task 1.3: Setup testing framework

Wave 2:
  ├── Task 2.1: Implement feature A (depends on 1.1, 1.2)
  └── Task 2.2: Implement feature B (depends on 1.2)

Wave 3:
  └── Task 3.1: Integration (depends on 2.1, 2.2)
```

执行流程：

```
Phase 1:
  └─ Wave 1: [1.1, 1.2, 1.3] ← 并行执行

Wave 1 完成后：

Phase 2:
  └─ Wave 2: [2.1, 2.2] ← 并行执行

Wave 2 完成后：

Phase 3:
  └─ Wave 3: [3.1] ← 串行执行（只有一个任务）
```

## Subagent 上下文

每个 subagent 获得的上下文包括：

- PROJECT.md
- REQUIREMENTS.md
- 本阶段的 CONTEXT.md
- 本阶段的 PLAN.md
- 特定任务的任务描述

## 原子提交

每个任务完成后都有自己的 atomic commit：

```
Git 提交结构：
├── Task 1.1: Setup project structure
│   └── Initial commit
├── Task 1.2: Create base components
│   └── Add base UI components
├── Task 1.3: Setup testing framework
│   └── Configure Jest
├───────
├── Task 2.1: Implement feature A
│   └── Add feature A implementation
└── ...
```

## 成功标准

- [ ] 阶段中的所有计划都已执行
- [ ] 所有波次都已完成
- [ ] 每个任务都有原子提交
- [ ] STATE.md 已更新
- [ ] 遇到的问题已被诊断
- [ ] 用户知道后续步骤

## 执行上下文

加载以下文件：

- `$HOME/.claude/get-shit-done/workflows/execute-phase.md`
- `$HOME/.claude/get-shit-done/references/ui-brand.md`

## 波次过滤模式（--wave N）

```
只执行 Wave N 中的任务
跳过所有之前的 Wave
phase verification/completion 仍然只在没有不完整的任务时发生
```

使用场景：

- Pace execution - 按自己的节奏执行
- Quota management - 保持在 API 使用限制内
- Staged rollout - 分阶段交付

## 差距关闭模式（--gaps-only）

```
只执行有 gap_closure: true 的任务
Frontmatter 示例：
---
gap_closure: true
---

这些任务来自 verify-work 发现的验证问题
执行完成后可以直接 re-run verify-work
```

## 交互式模式（--interactive）

```
无 subagents，顺序执行
每个任务后有用户检查点
较低 token 使用量
配对编程风格
适用于：
- 小型阶段
- Bug 修复
- 验证差距修复
```

## TDD 模式（--tdd）

在 `--tdd` 模式下，首先写测试，然后实现代码：

```
Task 1: Create test first
└─ Writes failing test
└─ Verifies test fails

Task 2: Implement code
└─ Writes code to pass test
└─ Verifies test passes

Task 3: Refactor
└─ Improves code while keeping tests green
```

## 上下文预算分配

```
总上下文池：200k tokens

┌─────────────────────────────────┐
│  Orchestrator:     ~30k (15%)      │
├─────────────────────────────────┤
│  Shared context:   ~20k (10%)      │ ← SUBAGENT1
├───────────────────────────────────┤
│  Subagent 1:     50k (25%)       │ ← SUBAGENT2
├───────────────────────────────────┤
│  Subagent 2:     50k (25%)       │
├───────────────────────────────────┤
│  Subagent 3:     50k (25%)       │
└─────────────────────────────────┘
```

## 后续步骤

在 `/gsd-execute-phase` 完成后，应该：

1. 查看完成的任务
2. 运行 `/gsd-verify-work {N}` 验证工作

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| `/gsd-plan-phase` | execute-phase 的前置命令，提供 PLAN.md |
| `/gsd-verify-work` | execute-phase 的下一步，验证执行结果 |
| `/gsd-progress` | 可能建议运行 execute-phase |
| `/gsd-review` | 可能对执行结果进行审查 |

## 异常处理

### 任务失败

```
检测到任务失败时：
1. 分析失败原因
2. 报告问题给用户
3. 建议：retry / skip / fix
4. 如果用户选择 retry，重新 spawn subagent
```

### 依赖失败

```
当某个任务失败且后续任务依赖它时：
1. 标记依赖它的后续任务为 blocked
2. 不 spawn blocked 任务
3. 用户需要处理失败任务后再继续
```