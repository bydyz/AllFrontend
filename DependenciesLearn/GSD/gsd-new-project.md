# gsd-new-project 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `/gsd-new-project` |
| 功能描述 | 问题 → 研究 → 需求 → 路线图 |
| 参数提示 | `[--auto]` |

## 功能概述

通过统一流程初始化新项目：提问 → 研究（可选）→ 需求 → 路线图。

**创建的文件：**

- `.planning/PROJECT.md` - 项目上下文
- `.planning/config.json` - 工作流偏好设置
- `.planning/research/` - 领域研究（可选）
- `.planning/REQUIREMENTS.md` - 范围需求
- `.planning/ROADMAP.md` - 阶段结构
- `.planning/STATE.md` - 项目记忆

**执行此命令后：** 运行 `/gsd-plan-phase 1` 开始执行。

## 参数详解

| 参数 | 说明 |
|------|------|
| 无参数 | 交互式模式，通过一系列问题引导用户定义项目 |
| `--auto` | 自动模式。配置问题后，无需进一步交互即可运行 research → requirements → roadmap。通过 @ 引用获取 idea 文档 |

## 执行流程详解

### 阶段 0：准备

```
1. 设置项目基础信息
2. 检查是否已有 .planning/ 目录
3. 确定项目初始化模式（交互式或自动）
```

### 阶段 1：提问（Questioning）

```
4. 进行深度上下文收集
5. 询问用户项目相关问题：
   - 项目类型（Web 应用、移动应用、库等）
   - 目标用户
   - 核心问题要解决
   - 技术偏好
   -约束条件（时间、预算等）
```

这是最关键的阶段，确保AI完全理解用户的想法和需求。

### 阶段 2：研究（Research，可选）

```
6. 如果需要，进行领域研究
7. 搜索类似项目和最佳实践
8. 分析技术可行性和风险
9. 生成 RESEARCH.md 文档
```

研究阶段是可选的，只有在项目需要时才进行。

### 阶段 3：需求（Requirements）

```
10. 定义核心功能列表
11. 创建验收标准
12. 明确优先级（MVP vsNice to Have）
13. 生成 REQUIREMENTS.md 文档
```

需求文档需要清晰、可验证。

### 阶段 4：路线图（Roadmap）

```
14. 将需求拆解为阶段
15. 估算每个阶段的工作量
16. 确定阶段执行顺序
17. 生成 ROADMAP.md 文档
```

路线图应该是实际可行的，每个阶段应该足够小，可以在全新的上下文中执行。

### 阶段 5：项目状态

```
18. 初始化 STATE.md
19. 记录当前进度和下一步
```

STATE.md 作为项目的记忆，记录当前进度。

### 阶段 6：配置

```
20. 创建 config.json
21. 设置工作流偏好
22. 配置模型和质量设置
```

### 阶段 7：验证

```
23. 验证所有文件已创建
24. 显示摘要给用户
25. 等待确认
```

## 创建的文件详解

### PROJECT.md

```markdown
# Project Name

## Problem Statement
[用户要解决的问题]

## Goals
- [目标1]
- [目标2]

## Non-Goals
- [明确不做什么]

## Target Users
[目标用户群体]

## Tech Stack
[技术栈]
```

### REQUIREMENTS.md

```markdown
# Requirements

## Must Have
- [ ] 需求1
- [ ] 需求2

## Should Have
- [ ] 需求3

## Nice to Have
- [ ] 需求4
```

### ROADMAP.md

```markdown
# Roadmap

## Phase 1: [阶段名称]
- [任务1]
- [任务2]

## Phase 2: [阶段名称]
- [任务3]
```

### STATE.md

```markdown
# State

## Current Phase
未初始化

## Progress
[]
```

### config.json

```json
{
  "mode": "interactive",
  "model_profile": "quality",
  "workflow": {...}
}
```

## 成功标准

- [ ] `.planning/PROJECT.md` 已创建
- [ ] `.planning/REQUIREMENTS.md` 已创建
- [ ] `.planning/ROADMAP.md` 已创建
- [ ] `.planning/STATE.md` 已创建
- [ ] `.planning/config.json` 已创建
- [ ] 项目上下文清晰
- [ ] 需求可验证
- [ ] 路线图实际可行

## 执行上下文

加载以下文件：

- `$HOME/.claude/get-shit-done/workflows/new-project.md`
- `$HOME/.claude/get-shit-done/references/questioning.md`
- `$HOME/.claude/get-shit-done/references/ui-brand.md`
- `$HOME/.claude/get-shit-done/templates/project.md`
- `$HOME/.claude/get-shit-done/templates/requirements.md`

## 模式说明

### 交互式模式（默认）

用户通过一系列问题引导来定义项目：

1. 项目要解决什么问题？
2. 目标用户是谁？
3. 有哪些技术限制？
4. 期望的时间线是什么？
5. 功能优先级如何？

### 自动模式（--auto）

配置文件问题后，自动执行整个流程。用户提供一个 idea 文档作为输入（通过 @ 引用）。

**自动模式流程：**

```
1. 读取 @ 引用的 idea 文档
2. 解析项目定义
3. 运行 research（如果需要）
4. 生成 REQUIREMENTS.md
5. 生成 ROADMAP.md
6. 初始化 STATE.md
```

## 模板说明

### PROJECT.md 模板

项目上下文文档，包含：

- Problem Statement（问题陈述）
- Goals（目标）
- Non-Goals（非目标，明确不做什么）
- Target Users（目标用户）
- Tech Stack（技术栈）
- Timeline（时间线）

### REQUIREMENTS.md 模板

需求文档，包含：

- Must Have（必须有）- MVP 核心功能
- Should Have（应该有）- 重要但非关键
- Nice to Have（可以有）- 增强功能

每个需求都需要可验证的验收标准。

### 模板加载时机

这些模板在工作流中按需加载，不是预先加载：

- `templates/project.md` - 在初始化阶段加载
- `templates/requirements.md` - 在需求定义阶段加载
- `templates/context.md` - 在 discuss-phase 工作流的 write_context 步骤加载
- `discuss-phase-power.md` - 当检测到 `--power` 标志时加载

## 后续步骤

在 `/gsd-new-project` 完成后，应该：

1. 查看生成的文件确保满足预期
2. 运行 `/gsd-discuss-phase 1` 深入讨论第一阶段的实施细节
3. 运行 `/gsd-plan-phase 1` 开始第一阶段的规划

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| `/gsd-map-codebase` | 可以在 new-project 之前运行，分析现有代码库 |
| `/gsd-discuss-phase` | new-project 之后的下一步，深入讨论实施决策 |
| `/gsd-plan-phase` | discuss-phase 的下一步，创建执行计划 |
| `/gsd-progress` | 检查项目进度，建议何时运行 new-project |

## 注意事项

1. **问题要具体**：不要问"你想要什么类型的产品？"，而要问"这个 Web 应用主要是面向个人用户还是企业用户？"

2. **需求要可验证**：每个需求都应该有明确的验收标准，例如：
   - ❌ 好的用户体验 → ✓ 页面加载时间 < 100ms
   - ❌ 支持移动端 → ✓ 在 iOS Safari 和 Android Chrome 上可正常运行

3. **路线图要实际**：不要把第一阶段做得太大，控制在 2-4 周内可以完成。

4. **技术栈要及时更新**：明确的技术栈偏好可以减少后续决策成本。