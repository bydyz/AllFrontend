# gsd-complete-milestone 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `/gsd-complete-milestone` |
| 功能描述 | 归档已完成的里程碑并准备下一个版本 |
| 参数提示 | `<version>` |

## 功能概述

标记里程碑 {{version}} 完成，归档到 milestones/，并更新 ROADMAP.md 和 REQUIREMENTS.md。

**目的**：创建已交付版本的历史记录、归档里程碑产物，并准备下一个里程碑。

**输出**：

- Milestone 已归档（roadmap + requirements）
- PROJECT.md 已演进
- Git 已打标签

## 参数详解

| 参数 | 说明 |
|------|------|
| `version` | 必需的版本号，例如 "1.0", "1.1", "2.0" |

## 执行流程详解

### 第零步：飞行前检查

```
1. 检查是否有 .planning/v{{version}}-MILESTONE-AUDIT.md
2. 如果缺失或过时：推荐先运行 /gsd-audit-milestone
3. 如果 audit status 是 gaps_found：推荐先关闭 gaps
4. 如果 audit status 是 passed：继续进行步骤 1
```

**Pre-flight Check 模板**：

```markdown
## Pre-flight Check

{如果没有 v{{version}}-MILESTONE-AUDIT.md：}
⚠ No milestone audit found. Run `/gsd-audit-milestone` first
to verify requirements coverage, cross-phase integration,
and E2E flows.

{如果 audit 有 gaps：}
⚠ Milestone audit found gaps. The audit output already
enumerates the unsatisfied requirements, cross-phase issues,
and broken flows — insert a closure phase per gap and run
the standard discuss/plan/execute chain. Or proceed anyway
to accept the gaps as tech debt.

{如果 audit 通过了：}
✓ Milestone audit passed. Proceeding with completion.
```

### 第一步：验证就绪

```
5. 检查里程碑中的所有 phases 是否都已完成（SUMMARY.md 存在）
6. 展示里程碑范围和统计
7. 等待用户确认
```

### 第二步：收集统计

```
8. 统计 phases、plans、tasks 数量
9. 计算 git 范围、文件变更、LOC
10. 从 git log 提取时间线
11. 展示摘要，等待确认
```

### 第三步：提取成就

```
12. 读取里程碑范围内所有 phase 的 SUMMARY.md 文件
13. 提取 4-6 个关键成就
14. 展示供批准
```

### 第四步：归档里程碑

```
15. 创建 .planning/milestones/v{{version}}-ROADMAP.md
16. 从 ROADMAP.md 提取完整的 phase 详情
17. 填充 milestone-archive.md 模板
18. 更新 ROADMAP.md 为单行摘要加链接
```

### 第五步：归档需求

```
19. 创建 .planning/milestones/v{{version}}-REQUIREMENTS.md
20. 将所有 v1 需求标记为完成（勾选 checkbox）
21. 标注需求结果（validated, adjusted, dropped）
22. 删除 .planning/REQUIREMENTS.md（为下一个里程碑创建新的）
```

### 第六步：更新 PROJECT.md

```
23. 添加 "Current State" section 和已交付版本
24. 添加 "Next Milestone Goals" section
25. 将之前内容归档在 <details> 中（如果是 v1.1+）
```

### 第七步：提交并打标签

```
26. Stage: MILESTONES.md, PROJECT.md, ROADMAP.md, STATE.md, archive files
27. Commit: chore: archive v{{version}} milestone
28. Tag: git tag -a v{{version}} -m "[milestone summary]"
29. 询问是否推送 tag
```

### 第八步：提供后续步骤

```
30. 建议 /gsd-new-milestone 开始下一个里程碑（questioning → research → requirements → roadmap）
```

## 归档的里程碑文档

### v{{version}}-ROADMAP.md

```markdown
# Milestone v{{version}} Archive

## Phases Completed

### Phase 1: [Name]
- Status: completed
- Tasks: 5
- Wave 1: 3 tasks
- Wave 2: 2 tasks

### Phase 2: [Name]
- Status: completed
- ...
```

### v{{version}}-REQUIREMENTS.md

```markdown
# Requirements Archive v{{version}}

## Must Have - ALL COMPLETE ✅
- [x] Requirement 1 (validated 2024-01-15)
- [x] Requirement 2 (adjusted: scope changed, validated 2024-01-16)

## Should Have - ALL COMPLETE ✅
- [x] ...

## Nice to Have
- [x] Some completed
- [ ] Dropped: feature was too complex
```

## 成功标准

- [ ] Milestone 归档到 `.planning/milestones/v{{version}}-ROADMAP.md`
- [ ] Requirements 归档到 `.planning/milestones/v{{version}}-REQUIREMENTS.md`
- [ ] `.planning/REQUIREMENTS.md` 删除（为下一个里程碑新建）
- [ ] ROADMAP.md 折叠为单行条目
- [ ] PROJECT.md 更新当前状态
- [ ] Git tag v{{version}} 创建（如 git.create_tag 启用）
- [ ] 提交成功
- [ ] 用户知道后续步骤（包括需要新的 requirements）

## 执行上下文

**现在加载以下文件**：

- `$HOME/.claude/get-shit-done/workflows/complete-milestone.md` - 主工作流
- `$HOME/.claude/get-shit-done/templates/milestone-archive.md` - 归档模板

## 项目文件

- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/STATE.md`
- `.planning/PROJECT.md`

## 关键规则

- **先加载工作流**：先读取 complete-milestone.md 再执行
- **验证完成**：所有 phases 必须有 SUMMARY.md 文件
- **用户确认**：在验证门等待批准
- **删除前归档**：始终在更新/删除原始文件前创建归档文件
- **单行摘要**：ROADMAP.md 中的折叠里程碑应该是带链接的单行
- **上下文效率**：归档使 ROADMAP.md 和 REQUIREMENTS.md 每个里程碑保持恒定大小
- **新需求**：下一个里程碑从 /gsd-new-milestone 开始，包括需求定义

## 后续步骤

在 `/gsd-complete-milestone` 完成后：

1. 运行 `/gsd-new-milestone` 开始下一个里程碑
2. 新里程碑包括：questioning → research → requirements → roadmap
3. 或者继续下一个 phase

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| `/gsd-audit-milestone` | 建议在 complete-milestone 前运行 |
| `/gsd-ship` | 里程碑内的 phases 都需要 ship |
| `/gsd-new-milestone` | 完成里程碑后的下一步 |
| `/gsd-progress` | 可能建议运行 complete-milestone |