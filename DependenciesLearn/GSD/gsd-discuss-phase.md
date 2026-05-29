# gsd-discuss-phase 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `/gsd-discuss-phase` |
| 功能描述 | 通过适应性提问捕获实施决策，为规划做准备 |
| 参数提示 | `<phase> [--all] [--auto] [--chain] [--batch] [--analyze] [--text] [--power] [--assumptions]` |

## 功能概述

提取下游 Agent 需要了解的实施决策。研究员和规划者使用 CONTEXT.md 来了解要调查什么以及哪些选择是确定的。

**工作原理：**

1. 加载先前上下文（PROJECT.md、REQUIREMENTS.md、STATE.md、先前的 CONTEXT.md）
2. 探索代码库中可复用的资产和模式
3. 分析阶段 - 跳过已在先前阶段决定的灰色区域
4. 展示剩余灰色区域 - 用户选择要讨论的区域
5. 深入探讨每个选中区域直到满意
6. 创建包含指导研究和规划的决策的 CONTEXT.md

**输出：** `{phase_num}-CONTEXT.md` - 决策足够清晰，使下游 Agent 可以无需再次询问用户

## 参数详解

| 参数 | 说明 |
|------|------|
| `<phase>` | **必需** - 要讨论的阶段号 |
| `--all` | 分析所有阶段，不仅仅是一个 |
| `--auto` | 自动模式，跳过交互式讨论 |
| `--chain` | 链式模式，处理多个阶段 |
| `--batch` | 批量处理多个区域 |
| `--analyze` | 分析模式，识别灰色区域而不交互 |
| `--text` | 使用纯文本编号列表而非 TUI 菜单 |
| `--power` | 强力模式，更深入的讨论 |
| `--assumptions` | 列出已知假设 |

## 模式路由

根据配置的讨论模式决定执行哪个工作流：

```
DISCUSS_MODE=$(gsd-sdk query config-get workflow.discuss_mode 2>/dev/null || echo "discuss")
```

### assumptions 模式

如果 `$ARGUMENTS` 中包含 `--assumptions`：

```
执行: list-phase-assumptions.md
```

### 配置为 assumptions 模式

如果 `DISCUSS_MODE` 为 `"assumptions"`：

```
执行: discuss-phase-assumptions.md
```

### 标准 discuss 模式（默认）

否则（`"discuss"` / 未设置 / 其他值）：

```
执行: discuss-phase.md
```

## 执行流程详解

### 第一步：加载上下文

```
1. 读取 PROJECT.md
2. 读取 REQUIREMENTS.md
3. 读取 STATE.md
4. 读取该阶段的现有 CONTEXT.md（如果有）
```

**关键原则**：加载之前的上下文，不要重新询问已确定的问题。

### 第二步：探索代码库

```
5. 扫描代码库寻找可复用资产
6. 识别现有模式和组件
7. 分析现有代码结构
```

### 第三步：分析阶段

```
8. 分析该阶段的待办事项
9. 识别灰色区域（未确定的决策）
10. 跳过已在上一个阶段决定的区域
```

### 第四步：呈现灰色区域

```
11. 向用户展示剩余灰色区域
12. 用户选择要讨论的区域
13. 用户可以选择跳过某些区域
```

灰色区域包括但不限于：

- 布局和 UI 结构
- API 接口设计
- 数据结构定义
- 错误处理策略
- 边界情况处理
- 性能考虑

### 第五步：深入讨论

```
14. 深入探讨每个选中的区域
15. 探索直到满意和确定
16. 记录每个决策及其理由
```

### 第六步：创建上下文文档

```
17. 生成 {phase_num}-CONTEXT.md
18. 保存所有决策
19. 更新 STATE.md
```

## CONTEXT.md 内容结构

```markdown
# Phase {N} Context

## 已确定的决策

### API 设计
- [决定1]
- [决定2]

### 数据结构
- [决定1]

### 错误处理
- [决定1]

## 待定事项

- [ ] 待定项1

## 实现提示

- 可复用现有组件 X
- 参考模式 Y
```

## 成功标准

- [ ] 先前上下文已加载并应用（不重新询问已决定的问题）
- [ ] 灰色区域通过智能分析已识别
- [ ] 用户选择了要讨论的区域
- [ ] 每个选中区域已深入探讨直至满意
- [ ] 范围蔓延被重定向到 deferred ideas
- [ ] CONTEXT.md 捕获决策，而非模糊愿景
- [ ] 用户知道后续步骤

## 执行上下文

工作流文件按需加载（在 `<process>` 部分），不要在读取模式路由指令之前预加载任何工作流文件。

- `$HOME/.claude/get-shit-done/workflows/discuss-phase.md`
- `$HOME/.claude/get-shit-done/templates/context.md` - 在 write_context 步骤中按需加载
- `$HOME/.claude/get-shit-done/workflows/discuss-phase-power.md` - 检测到 `--power` 时加载

## 强力模式（--power）

使用 `--power` 标志时，加载强力讨论工作流，進行更深层次的讨论：

- 更详细的技术选型分析
- 更多的替代方案评估
- 更深入的风险评估

## 假设列表模式（--assumptions）

列出对阶段的所有已知假设：

```
已知的假设：
1. 技术栈：A
2. 部署平台：B
3. ...
```

## 批量模式（--batch）

一次性处理多个区域，而不是逐一讨论：

```
批量模式流程：
1. 收集所有灰色区域
2. 一次展示给用户
3. 用户选择全部接受或拒绝
4. 对拒绝的区域逐一讨论
```

## 链式模式（--chain）

处理多个连续的阶段：

```
链式模式流程：
1. 处理阶段 N
2. 继续处理阶段 N+1
3. 以此类推
```

## 后续步骤

在 `/gsd-discuss-phase` 完成后，应该：

1. 查看生成的 CONTEXT.md
2. 运行 `/gsd-plan-phase {N}` 开始该阶段的规划

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| `/gsd-new-project` | discuss-phase 的前置命令，提供项目上下文 |
| `/gsd-plan-phase` | discuss-phase 的下一步，使用 CONTEXT.md 创建 PLAN.md |
| `/gsd-execute-phase` | 使用 CONTEXT.md 和 PLAN.md 执行计划 |
| `/gsd-progress` | 可能建议运行 discuss-phase |