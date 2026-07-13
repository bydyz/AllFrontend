# gsd-progress 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `/gsd-progress` |
| 功能描述 | 检查进度、前进工作流，或调度自由形式意图 — 统一的 GSD 情境命令 |
| 参数提示 | `[--forensic | --next | --do "task description"]` |

## 功能概述

检查项目进度、总结近期工作并预览 ahead，然后智能路由到下一个动作。

**三种模式：**

- **默认**：显示进度报告 + 智能路由到下一个动作（执行或计划）。在继续工作前提供情境感知。
- **--next**：自动前进到下一个逻辑步骤，无需手动选择。读取 STATE.md、ROADMAP.md 和阶段目录。带有 `--force` 可绕过安全门。
- **--do "task description"**：分析自由形式的自然语言并将其调度到最合适的 GSD 命令。从不自己完成任务 —— 匹配意图、确认、交接。
- **--forensic**：在标准进度报告后附加 6 项完整性审计。

## 参数详解

| 参数 | 说明 |
|------|------|
| 无参数 | 标准模式 - 显示进度报告 + 智能路由 |
| `--forensic` | 在进度报告后进行 6-check 完整性审计 |
| `--next` | 自动检测当前项目状态并调用下一个逻辑 GSD 工作流步骤 |
| `--next --force` | 绕过安全门 |
| `--next --auto` | 像 `--next` 一样，但在确定的步骤完成后自动重新调用继续链式执行 |
| `--do "..."` | 智能调度器 —— 匹配自由形式意图到最佳 GSD 命令 |

## 执行流程详解

### 默认模式流程

#### 第一步：加载项目状态

```
1. 读取 STATE.md 当前进度
2. 读取 ROADMAP.md 路线图
3. 扫描阶段目录
4. 统计完成的工作
```

#### 第二步：生成进度报告

```
5. 显示当前阶段
6. 显示已完成的任务
7. 显示待完成的任务
8. 显示接下来的步骤
```

#### 第三步：智能路由

```
基于当前状态推荐下一个动作

可能的路由路线：
Route A: 发现问题 → 建议 discuss
Route B: 有计划 → 建议 execute
Route C: 已执行 → 建议 verify
Route D: 已验证 → 建议 ship
Route E: 里程碑完成 → 建议 complete-milestone
Route F: 新项目 → 建议 new-project
```

### --next 模式流程

#### 第一步：检测当前状态

```
1. 扫描所有之前 phases 的工作
2. 识别未完成的事项
3. 确定下一个逻辑步骤
```

#### 第二步：执行下一个步骤

```
如果没有未完成的待办：
- Phase N 已完成 → Route to verify
- Phase N 已验证 → Route to ship 或 next discuss
- Milestone ready → Route to complete-milestone
```

#### 第三步：如果有 `---auto`

```
4. 步骤完成后自动重新调用 /gsd-progress --next --auto
5. 继续链式执行直到阻塞或完成
```

### --do 模式流程

#### 第一步：匹配意图

```
分析用户输入的 "task description"
匹配到最佳 GSD 命令

示例匹配：
"我想要实现登录功能" → /gsd-new-project
"我们开始吧" → /gsd-plan-phase 1
"帮我验证一下" → /gsd-verify-work
```

#### 第二步：确认

```
向用户确认将要执行的操作
用户确认后交接
```

#### 第三步：交接

```
将用户转交给正确的 GSD 命令
本身不执行实际工作
```

### --forensic 模式流程

```
在标准进度报告后运行 6-check 完整性审计
检查：
1. 需求覆盖率
2. 代码质量
3.安全问题
4. 性能考虑
5. 可访问性
6. 跨浏览器兼容性
```

## 进度报告示例

```
# Project: MyApp

## 当前阶段: Phase 3

## 已完成
✅ Phase 1: Foundation (3/3 tasks)
✅ Phase 2: Core Features (5/5 tasks)

## 进行中
🔄 Phase 3: User Dashboard (2/5 tasks)
   - [DONE] Task 1: Layout
   - [DONE] Task 2: Components
   - [IN PROGRESS] Task 3: API integration
   - [TODO] Task 4: Filtering
   - [TODO] Task 5: Export

## 接下来
→ Complete Phase 3 tasks
→ Run /gsd-verify-work 3
→ Run /gsd-ship 3

## 推荐: /gsd-execute-phase 3 --wave 2
```

## 成功标准

- [ ] 进度报告准确反映当前状态
- [ ] 智能路由选择正确的下一步
- [ ] 用户了解项目整体情况
- [ ] 用户知道如何继续

## 执行上下文

加载以下文件：

- `$HOME/.claude/get-shit-done/workflows/progress.md`
- `$HOME/.claude/get-shit-done/workflows/next.md`
- `$HOME/.claude/get-shit-done/workflows/do.md`
- `$HOME/.claude/get-shit-done/references/ui-brand.md`

## 参数路由

从提供的参数中解析第一个 token：

```
如果第一个 token 是 "--next"：
  - 剥离标志，执行 next 工作流（传递剩余参数如 --force, --auto）

如果第一个 token 是 "--do"：
  - 剥离标志，将剩余部分作为自由形式意图传递给 do 工作流

否则：
  - 执行 progress 工作流端到端（如果存在，传递 --forensic）
```

## 智能路由规则

### Route A: 已验证有 gap

```
状态: verify-work 发现问题
建议: /gsd-execute-phase --gaps-only
```

### Route B: 有计划未执行

```
状态: PLAN.md 存在但未执行
建议: /gsd-execute-phase
```

### Route C: 已执行未验证

```
状态: 任务已执行但未验证
建议: /gsd-verify-work
```

### Route D: 已验证待发布

```
状态: verify-work 通过
建议: /gsd-ship
```

### Route E: 里程碑完成

```
状态: 所有阶段都已shipped
建议: /gsd-complete-milestone
```

### Route F: 新项目

```
状态: 没有现有项目
建议: /gsd-new-project
```

## 后续步骤

- 进度报告帮助用户了解当前状态
- 选择推荐的下一个动作继续，或
- 选择其他 GSD 命令

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| 所有 GSD 命令 | progress 是统一入口，可以导向任何其他命令 |
| `/gsd-new-project` | Route F: 新项目 |
| `/gsd-discuss-phase` | Route A: 发现需要讨论 |
| `/gsd-plan-phase` | 下一步是计划 |
| `/gsd-execute-phase` | Route B: 有计划待执行 |
| `/gsd-verify-work` | Route C: 已执行待验证 |
| `/gsd-ship` | Route D: 已验证待发布 |
| `/gsd-complete-milestone` | Route E: 里程碑完成 |