# OpenSpec

一个规范驱动的开发（SDD）框架，为 AI 编码助手提供轻量级的规范层，确保在编写代码前先对齐需求。

官网：https://openspec.dev/

## 什么是 OpenSpec

OpenSpec 是一个为 AI 编码助手设计的规范驱动开发框架，帮助开发者在编写代码前与 AI 对齐需求：

- **构建前对齐**：人类与 AI 在编写代码前先在规范上达成一致
- **保持有序**：每个变更都有独立的文件夹，包含提案、规范、设计和任务
- **灵活工作**：随时更新任何工件，没有严格的阶段门控
- **兼容工具**：通过斜杠命令支持 30+ 种 AI 助手

设计哲学：
```
→ 流动而非僵化
→ 迭代而非瀑布
→ 简单而非复杂
→ 为存量项目而生，不仅限于新项目
→ 从个人项目到企业级均可扩展
```

## 核心特点

- **Artifact-Guided 工作流**：结构化的提案、规范、设计、任务文件
- **斜杠命令驱动**：通过 `/opsx:explore`、`/opsx:propose` 等命令交互
- **跨仓库支持**：通过 Stores（beta）实现跨仓库的功能规划
- **多语言支持**：支持多种编程语言的规范定义
- **25+ 工具支持**：兼容主流 AI 编码助手

## 适用场景

- 个人开发者与 AI 协作开发
- 团队跨仓库的功能规划
- 存量项目的 AI 辅助改造
- 需要规范驱动开发流程的项目

## 安装

**要求 Node.js 20.19.0 或更高版本**

全局安装：

```bash
npm install -g @fission-ai/openspec@latest
```

进入项目目录并初始化：

```bash
cd your-project
openspec init
```

也支持 pnpm、yarn、bun 和 nix。[查看更多安装选项](https://github.com/Fission-AI/OpenSpec/blob/main/docs/installation.md)

### 安装位置

- 全局 npm 包：`@fission-ai/openspec`
- 项目配置：`openspec/` 目录
- AI 指令文件：由 `openspec update` 生成

## 常用命令

### 斜杠命令（在 AI 助手中使用）

| 命令 | 说明 |
|------|------|
| `/opsx:explore` | 探索模式，思考和完善想法 |
| `/opsx:propose <描述>` | 创建变更提案 |
| `/opsx:apply` | 执行实现任务 |
| `/opsx:archive` | 归档已完成的变更 |
| `/opsx:new` | 创建新变更（扩展工作流） |
| `/opsx:continue` | 继续未完成的变更 |
| `/opsx:ff` | 快进到下一步 |
| `/opsx:verify` | 验证实现结果 |
| `/opsx:bulk-archive` | 批量归档变更 |
| `/opsx:onboard` | 项目入门引导 |

### CLI 命令（终端中使用）

| 命令 | 说明 |
|------|------|
| `openspec init` | 初始化 OpenSpec |
| `openspec update` | 刷新 AI 指令 |
| `openspec config profile` | 选择配置文件 |
| `openspec config` | 查看/修改配置 |

## 工作流程

### 1. 探索
```
/opsx:explore
```
与 AI 对话，探索想法，权衡选项，在编写任何内容之前制定计划。

### 2. 提案
```
/opsx:propose add-dark-mode
```
创建变更文件夹，包含：
- `proposal.md` — 为什么做这个变更，改了什么
- `specs/` — 需求和场景
- `design.md` — 技术方案
- `tasks.md` — 实现清单

### 3. 实现
```
/opsx:apply
```
AI 按照任务清单逐步实现，每完成一个任务打一个勾。

### 4. 归档
```
/opsx:archive
```
归档到 `openspec/changes/archive/` 目录，规范更新，准备下一个功能。

## 配置文件

配置位于 `openspec/` 目录。关键配置项：

| 设置 | 控制 |
|------|------|
| `profile` | 工作流配置（default/expanded） |
| `schema` | 规范 schema 定义 |
| `changes/` | 活跃变更目录 |
| `archive/` | 已归档变更目录 |

## 为什么选择 OpenSpec

**vs. [Spec Kit](https://github.com/github/spec-kit)**（GitHub）— 全面但重量级。严格的阶段门控，大量 Markdown，Python 设置。OpenSpec 更轻量，允许自由迭代。

**vs. [Kiro](https://kiro.dev)**（AWS）— 功能强大但锁定在他们的 IDE 中，仅限 Claude 模型。OpenSpec 使用你现有的工具。

**vs. 什么都没有** — 没有规范的 AI 编码意味着模糊的提示和不可预测的结果。OpenSpec 带来可预测性，无需仪式感。

## 更新 OpenSpec

**升级包**

```bash
npm install -g @fission-ai/openspec@latest
```

**刷新 AI 指令**

在每个项目中运行以重新生成 AI 指令：

```bash
openspec update
```

## 使用建议

- **模型选择**：OpenSpec 最适合高推理能力的模型，推荐 Codex 5.5 和 Opus 4.7
- **上下文卫生**：在开始实现前清理上下文窗口，保持良好的上下文管理

## 更多信息

- 官方网站：https://openspec.dev/
- GitHub：https://github.com/Fission-AI/OpenSpec
- 文档：https://github.com/Fission-AI/OpenSpec/blob/main/docs/README.md
- Discord：https://discord.gg/YctCnvvshC
- npm 包：`@fission-ai/openspec`
- 许可证：MIT
