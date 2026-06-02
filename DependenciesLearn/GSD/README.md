# GSD (Get Shit Done Redux)

一个轻量级的元提示、上下文工程和规范驱动的开发系统，适用于 Claude Code、OpenCode、Gemini CLI、Kilo、Codex、Copilot、Cursor、Windsurf 等 AI 编程助手。

解决"上下文腐烂"问题——即 AI 填充其上下文窗口时发生的质量下降问题。

## 什么是 GSD

GSD 是一个 AI 辅助开发工作流系统，帮助个人开发者和小团队可靠地交付产品：

- **清晰的需求**：通过结构化的需求定义避免误解
- **受控的上下文**：保持主上下文窗口在 30-40%，避免上下文膨胀
- **验证驱动**：代码能跑≠代码能用，GSD 在发布前进行验证

核心特点：
- **六命令循环**：初始化 → 讨论 → 计划 → 执行 → 验证 → 发布
- 上面对应的也就是：**1) 初始化 -> 2) 讨论 -> 3) 规划 -> 4) 执行 -> 5) 验证 -> 6) 交付** 这六个主要阶段，也就是一个循环，即 `一个phase`
- **多Agent编排**：研究者、规划者、执行者各自在全新上下文中工作
- **结构化 artifacts**：跨会话持久化的 PROJECT.md、REQUIREMENTS.md、ROADMAP.md、STATE.md 等
- **跨运行时兼容**：支持 Claude Code、OpenCode、Gemini CLI、Kilo、Codex、Copilot、Cursor、Windsurf

## 适用场景

- 个人开发者快速构建原型
- 小团队协作开发
- 需要规范化开发流程的项目
- AI 辅助编程时希望保持清晰的上下文

## 安装

```bash
npx @opengsd/get-shit-done-redux@latest
```

或带权限跳过：

```bash
# --dangerously-skip-permissions: 跳过权限检查，适用于无法sudo的环境或不方便授权时
npx @opengsd/get-shit-done-redux@latest -- --dangerously-skip-permissions
```

安装配置文件：
- 全量安装（默认）
- `--profile=core`：六个核心循环技能
- `--profile=standard`：core + 阶段管理
- `--minimal`：core 的别名

### 安装位置
- 67 个技能安装到 ~/.claude/skills/
- 包括 get-shit-done 核心工作流
- GSD SDK 链接到 D:\nvm\nodejs\gsd-sdk.cmd
- Claude Code 技能：C:\Users\Bydyz\.claude\skills\
- GSD 文件：C:\Users\Bydyz\.claude\get-shit-done\

## 常用命令

| 命令 | 说明 |
|------|------|
| `/gsd-map-codebase` | 分析现有代码库，建立索引 |
| `/gsd-new-project` | 问题→研究→需求→路线图 |
| `/gsd-discuss-phase [N]` | 捕获实施决策 |
| `/gsd-plan-phase [N]` | 研究+规划+验证 |
| `/gsd-execute-phase <N>` | 并行执行计划 |
| `/gsd-verify-work [N]` | 手动验收测试 |
| `/gsd-ship [N]` | 从已验证阶段创建 PR |
| `/gsd-progress --next` | 自动检测并运行下一步 |
| `/gsd-complete-milestone` | 归档里程碑并打标签 |
| `:gsd:surface` | 运行时启用/禁用技能集群 |
| `/gsd-pause-work` | 保存当前进度 |
| `/gsd-resume-work` | 恢复当前进度 |
| `/gsd-add-phase` | 在当前路线的最后添加一个新阶段 |
| `/gsd-insert-phase` | 在中间插入一个Phase，命令执行后，GSD会询问你想插入的具体位置 |
| `/gsd-remove-phase` | 移除一个Phase，命令执行后，GSD会询问你想移除的Phase编号 |
| `/gsd-quick` | 用于快速处理一个临时任务，跳过完整的阶段流程 |
| `/gsd-new-milestone` | 开启一个新里程碑 |

## 工作流程

### 1. 初始化
```
/gsd-new-project
```
提问 → 研究 → 需求 → 路线图。批准后准备好构建。

> 如果已有代码，先运行 `/gsd-map-codebase` 分析代码栈和架构。

### 2. 讨论
```
/gsd-discuss-phase 1
```
路线图中每个阶段的一句话不够详细。Discuss 捕获实施决策：布局、API 形状、错误处理、数据结构等。

### 3. 计划
```
/gsd-plan-phase 1
```
研究 → 规划 → 验证，循环直到计划通过。每个计划足够小，可在全新上下文窗口中执行。

### 4. 执行
```
/gsd-execute-phase 1
```
计划并行执行波次。每个执行者获得全新的 200k-token 上下文。每个任务获得自己的原子提交。

### 5. 验证
```
/gsd-verify-work 1
```
逐项检查构建内容。任何问题都会获得诊断的修复计划，可立即重新执行。

### 6. 重复 → 发布
```
/gsd-ship 1
/gsd-complete-milestone
```

循环 discuss → plan → execute → verify → ship 直到里程碑完成。然后归档、打标签，开始下一个。

## 配置文件

设置位于 `.planning/config.json`。关键配置项：

| 设置 | 控制 |
|------|------|
| `mode` | `interactive`（确认每步）或 `yolo`（自动批准） |
| `model_profiles` | `quality`/`balanced`/`budget` |
| `workflow.research/plan_check/verifier` | 质量 Agent 开关 |
| `parallelization.enabled` | 并行执行独立计划 |

## 更多信息

- 官方网站：https://github.com/open-gsd/get-shit-done-redux
- 官方文档：https://github.com/open-gsd/get-shit-done-redux/blob/next/docs/USER-GUIDE.md
- Discord：https://discord.gg/mYgfVNfA2r
- npm 包：`@opengsd/get-shit-done-redux`