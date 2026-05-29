# gsd-map-codebase 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `/gsd-map-codebase` |
| 功能描述 | 分析现有代码库，建立索引 |
| 参数提示 | `[--fast [--focus tech|arch|quality|concerns]] [--query <term>|status|diff|refresh] [area]` |

## 功能概述

分析现有代码库，使用并行 mapper agents 生成结构化的代码库文档。每个 mapper agent 专注于一个特定领域进行探索，**直接写入文档**到 `.planning/codebase/` 目录。编排器只接收确认信息，保持上下文使用最小化。

**输出：** `.planning/codebase/` 文件夹，包含 7 个关于代码库状态的结构化文档。

## 参数详解

| 参数 | 说明 |
|------|------|
| 无参数 | 完整并行映射 - 生成 4 个 mapper agents 来产出全部 7 个代码库文档 |
| `--fast` | 轻量级扫描模式 - 只产生一个 mapper agent，而不是四个。可选 `--focus` 值：`tech`、`arch`、`quality`、`concerns`、`tech+arch`（默认） |
| `--query` | 代码库智能查询模式。子命令：`query <term>`、`status`、`diff`、`refresh`。需要在 config 中启用 intel（`intel.enabled: true`） |
| `area` | 指定 fokus 区域 |

## 可选标志详解

### --fast 标志

- **作用**：轻量级扫描模式
- **行为**：Spawns 一个 mapper agent 而不是四个
- **可选值**：
  - `tech`：技术栈和依赖
  - `arch`：架构和结构
  - `quality`：代码质量和约定
  - `concerns`：关注点和风险
  - `tech+arch`（默认）

### --query 标志

- **作用**：代码库智能查询模式
- **子命令**：
  - `query <term>`：查询特定术语
  - `status`：查看状态
  - `diff`：查看差异
  - `refresh`：刷新索引
- **要求**：需要 config 中启用 `intel.enabled: true`

## 执行流程详解

### 第一步：检查现有状态

```
1. 检查 .planning/codebase/ 是否已存在
2. 如果存在，提供刷新或跳过的选项
```

### 第二步：创建目录结构

```
3. 创建 .planning/codebase/ 目录结构
```

### 第三步：启动并行 Mapper Agents

```
4. Spawn 4 个并行 gsd-codebase-mapper agents：
   - Agent 1 (tech focus) → 写入 STACK.md, INTEGRATIONS.md
   - Agent 2 (arch focus) → 写入 ARCHITECTURE.md, STRUCTURE.md
   - Agent 3 (quality focus) → 写入 CONVENTIONS.md, TESTING.md
   - Agent 4 (concerns focus) → 写入 CONCERNS.md
```

**说明**：这 4 个 agent 是并行执行的，每个 agent 在全新的上下文中工作，确保上下文不会膨胀。

### 第四步：等待确认

```
5. 等待 agents 完成，只收集确认信息（不是文档内容）
```

编排器只接收确认消息，不接收完整的文档内容，这样可以最大程度减少上下文使用。

### 第五步：验证输出

```
6. 验证所有 7 个文档是否存在，并检查行数
```

生成的 7 个文档：

1. STACK.md - 技术栈
2. INTEGRATIONS.md - 集成
3. ARCHITECTURE.md - 架构
4. STRUCTURE.md - 结构
5. CONVENTIONS.md - 约定
6. TESTING.md - 测试
7. CONCERNS.md - 关注点

### 第六步：提交

```
7. 提交代码库映射
```

将代码库映射结果提交到版本控制。

### 第七步：建议后续步骤

```
8. 提供后续步骤建议（通常是：/gsd-new-project 或 /gsd-plan-phase）
```

## 使用场景

### 适合使用 map-codebase 的场景

| 场景 | 说明 |
|------|------|
| 棕地项目 | 在初始化之前理解现有代码 |
| 刷新映射 | 在重大更改之后刷新代码库映射 |
| 入职 | 熟悉不熟悉的代码��� |
| 重构前 | 理解当前状态后再进行重大重构 |
| 过时信息 | 当 STATE.md 引用过时的代码库信息 |

### 不适合使用 map-codebase 的场景

| 场景 | 说明 |
|------|------|
| 绿地项目 | 没有代码的新项目（没有可映射的内容） |
| 小型代码库 | 简单的代码库（<5 个文件） |

## 成功标准

- [ ] `.planning/codebase/` 目录已创建
- [ ] 所有 7 个代码库文档由 mapper agents 编写
- [ ] 文档遵循模板结构
- [ ] 并行 agents 完成且无错误
- [ ] 用户知道后续步骤

## 执行上下文

加载以下文件：

- `$HOME/.claude/get-shit-done/workflows/map-codebase.md`

## 输出示例

执行完成后，会在 `.planning/codebase/` 目录生成以下文件：

```
.planning/codebase/
├── STACK.md         # 技术栈文档
├── INTEGRATIONS.md  # 集成文档
├── ARCHITECTURE.md   # 架构文档
├── STRUCTURE.md     # 结构文档
├── CONVENTIONS.md   # 约定文档
├── TESTING.md       # 测试文档
└── CONCERNS.md    # 关注点文档
```

## 后续步骤

通常在完成 `/gsd-map-codebase` 后，应运行：

- **棕地项目**：运行 `/gsd-new-project` 开始新项目
- **绿地项目**：运行 `/gsd-plan-phase 1` 开始第一阶段

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| `/gsd-new-project` | map-codebase 可以在 new-project 之前运行，理解现有代码 |
| `/gsd-plan-phase` | map-codebase 的输出为 plan-phase 提供代码库上下文 |
| `/gsd-progress` | progress 可以检测并建议运行 map-codebase 时机 |