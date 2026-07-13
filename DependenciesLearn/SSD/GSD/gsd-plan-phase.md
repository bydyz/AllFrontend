# gsd-plan-phase 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `/gsd-plan-phase` |
| 功能描述 | 创建详细阶段计划（PLAN.md），带验证循环 |
| 参数提示 | `[phase] [--auto] [--research] [--skip-research] [--research-phase <N>] [--view] [--gaps] [--skip-verify] [--prd <file>] [--ingest <path-or-glob>] [--ingest-format <auto|nygard|madr|narrative>] [--reviews] [--text] [--tdd] [--mvp]` |

## 功能概述

为路线图阶段创建可执行的阶段提示（PLAN.md 文件），整合研究和验证。

**默认流程：** 研究（如果需要）→ 规划 → 验证 → 完成

**编排器角色：**
- 解析参数
- 验证阶段
- 研究领域（除非跳过）
- Spawn gsd-planner
- 使用 gsd-plan-checker 验证
- 迭代直到通过或达到最大迭代次数
- 展示结果

## 参数详解

### 主要参数

| 参数 | 说明 |
|------|------|
| `phase` | 阶段号（可选）- 如果省略，自动检测下一个未计划的阶段 |

### 研究标志

| 参数 | 说明 |
|------|------|
| `--research` | 强制刷新研究，即使 RESEARCH.md 已存在 |
| `--skip-research` | 跳过研究，直接进入规划 |
| `--research-phase <N>` | 仅研究模式 - Spawn gsd-phase-researcher 生成 RESEARCH.md 后退出，在不重新规划的情况下进行修正更便宜 |
| `--view` | 查看模式 - 只打印现有的 RESEARCH.md，不 Spawn 研究员 |

### 验证标志

| 参数 | 说明 |
|------|------|
| `--gaps` | 差距关闭模式 - 读取 VERIFICATION.md，跳过研究 |
| `--skip-verify` | 跳过验证循环 |

### 输入标志

| 参数 | 说明 |
|------|------|
| `--prd <file>` | 使用 PRD/验收标准文件代替 discuss-phase。将需求解析为 CONTEXT.md，完全跳过 discuss-phase |
| `--ingest <path-or-glob>` | 使用一个或多个 ADR 文件代替 discuss-phase。将锁定决策和范围边界解析为 CONTEXT.md |
| `--ingest-format <auto\|nygard\|madr\|narrative>` | ADR 解析器格式覆盖（默认为 auto） |

### 其他标志

| 参数 | 说明 |
|------|------|
| `--reviews` | 根据 /gsd-review 生成的 REVIEWS.md 反馈重新规划 |
| `--text` | 使用纯文本编号列表而非 TUI 菜单（/rc 远程会话需要） |
| `--tdd` | 测试驱动开发模式 - 规划先生成测试的任务 |
| `--mvp` | 垂直 MVP 模式 - Planner 将任务组织为功能切片（UI→API→DB）而非水平层。在新项目的阶段 1 时也会发出 SKELETON.md |

## 执行流程详解

### 默认流程（无特殊标志）

#### 第一步：参数解析与阶段验证

```
1. 解析阶段参数
2. 验证阶段存在
3. 加载上下文
```

#### 第二步：研究（如需要）

```
4. 检查 RESEARCH.md 是否存在
5. 如果不存在或需要刷新：
   - Spawn gsd-phase-researcher agent
   - 生成 RESEARCH.md
6. 如果已存在，显示菜单让用户选择：
   - Update - 更新研究
   - View - 查看现有研究
   - Skip - 跳过研究直接规划
```

#### 第三步：规划

```
7. Spawn gsd-planner agent
8. 生成 PLAN.md
9. 任务拆分和依赖分析
```

**关键**：规划必须足够小，可以在全新的上下文窗口中执行。

#### 第四步：验证

```
10. 使用 gsd-plan-checker 验证 PLAN.md
11. 如果验证失败：
    - 分析反馈
    - 修改计划
    - 重新验证
12. 迭代直到通过或达到最大迭代次数（通常是 3 次）
```

#### 第五步：完成

```
13. 显示摘要
14. 更新 STATE.md
15. 建议后续步骤
```

### 研究专用模式（--research-phase <N>）

```
Spawn gsd-phase-researcher for phase N
Write RESEARCH.md
Exit before planner runs
```

有用的场景���

- 跨阶段研究
- 文档审查后再commit规划方法
- 修正时不重新规划的迭代循环

### 差距关闭模式（--gaps）

当 verify-work 发现问题时使用：

```
1. 读取 VERIFICATION.md 找到差距
2. 直接规划差距关闭任务
3. 跳过研究因为已经完成
```

### PRD 摄入模式（--prd）

```
1. 解析 PRD/验收标准文件
2. 自动生成 CONTEXT.md
3. 直接进入规划
```

### ADR 摄入模式（--ingest）

```
1. 解析 ADR 文件
2. 提取锁定决策和范围边界
3. 自动生成 CONTEXT.md
4. 直接进入规划
```

支持的格式：

- `auto` - 自动检测
- `nygard` - Nygard 格式
- `madr` - Markdown ADR
- `narrative` - 叙事格式

## 研究输出（RESEARCH.md）

```markdown
# Phase {N} Research

## 关键技术点
- 技术1
- 技术2

## 最佳实践
- 实践1
- 实践2

## 风险与缓解
- 风险1: 缓解措施
- 风险2: 缓解措施

## 类似项目/参考
- 参考1
- 参考2

## 结论
- 主要发现
- 建议的方法
```

## 规划输出（PLAN.md）

```markdown
# Phase {N} Plan

## 概览
[阶段目标和背景]

## Wave 1
### Task 1: [任务名]
- 描述: [任务描述]
- 依赖: []
- 验收标准: [...]

### Task 2: [任务名]
- 描述: [...]
- 依赖: [Task 1]
- 验收标准: [...]

## Wave 2
### Task 3: [任务名]
- 描述: [...]
- 依赖: [Task 2]
- 验收标准: [...]
```

## 验证过程

每个 Plan 需要通过以下验证：

1. **完整性检查** - 所有任务都有描述和验收标准
2. **依赖有效性** - 依赖指向存在的任务
3. **无循环依赖** - 依赖图中没有环
4. **可执行性** - 每任务可在单次会话中完成
5. **大小合适** - 任务足够小，可以在全新上下文中执行

## 迭代循环

默认情况下，规划经历最多 3 次迭代：

```
Iteration 1:
  - Planner generates PLAN.md
  - Checker validates
  - Feedback: 需要修改 X, Y

Iteration 2:
  - Planner addresses feedback
  - Checker validates
  - Feedback: 已修复，但需调整 Z

Iteration 3:
  - Planner addresses final feedback
  - Checker validates
  - Result: PASSED or MAX_ITERATIONS
```

## 成功标准

- [ ] 阶段已经验证
- [ ] RESEARCH.md 生成（如执行研究）
- [ ] PLAN.md 生成
- [ ] 所有任务有验收标准
- [ ] 依赖分析正确
- [ ] 验证通过
- [ ] 用户知道如何执行

## 执行上下文

加载以下文件：

- `$HOME/.claude/get-shit-done/workflows/plan-phase.md`
- `$HOME/.claude/get-shit-done/references/ui-brand.md`

## MVP 模式（--mvp）

在 `--mvp` 模式下，Planner 按功能切片组织任务：

```
Wave 1: UI Layer
- Task 1.1: Create component X
- Task 1.2: Create page Y
...

Wave 2: API Layer
- Task 2.1: Create endpoint X
- Task 2.2: Create endpoint Y
...

Wave 3: Data Layer
- Task 3.1: Create schema X
- Task 3.2: Setup migration Y
...
```

对于新项目的阶段 1，还会生成 SKELETON.md（骨架应用）。

## 后续步骤

在 `/gsd-plan-phase` 完成后，应该：

1. 查看生成的 PLAN.md
2. 运行 `/gsd-execute-phase {N}` 开始执行该阶段

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| `/gsd-discuss-phase` | plan-phase 的前置命令，提供 CONTEXT.md |
| `/gsd-execute-phase` | plan-phase 的下一步，使用 PLAN.md 执行计划 |
| `/gsd-verify-work` | 执行后验证工作，使用验证结果 |
| `/gsd-review` | 生成的 REVIEWS.md 被 plan-phase 使用 |
| `/gsd-progress` | 可能建议运行 plan-phase |