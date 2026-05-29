# OpenSpec

> Spec-Driven Development (SDD) - AI 编程助手的规范驱动开发框架

[![CI](https://github.com/Fission-AI/OpenSpec/workflows/CI/badge.svg)](https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@fission-ai/openspec)](https://www.npmjs.com/package/@fission-ai/openspec)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/badge/Discord-Join%20Us-purple)](https://discord.gg/YctCnvvshC)
[![Stars](https://img.shields.io/github/stars/Fission-AI/OpenSpec)](https://github.com/Fission-AI/OpenSpec/stargazers)

## 什么是 OpenSpec？

OpenSpec 是一个面向 **AI 编程助手** 的 **Spec-Driven Development (SDD)** - 规范驱动开发框架。

它通过添加一个**轻量级的规范层**，在编写任何代码之前，让人类开发者与 AI 在「要构建什么」上达成一致。AI 编码助手虽然强大，但当需求只存在于聊天历史中时，结果往往不可预测。OpenSpec 带来了可预测性，而不需要冗长的流程。

### 核心理念

```
→ fluid not rigid         （流式而非僵化）
→ iterative not waterfall（迭代而非瀑布）
→ easy not complex       （简单而非复杂）
→ built for brownfield not just greenfield（不仅支持新项目，也支持存量项目）
→ scalable from personal projects to enterprises（可从个人项目扩展到企业级）
```

### 为什么选择 OpenSpec？

| 对比项 | 描述 |
|--------|------|
| **vs. 无规范** | AI 编码时的模糊 prompts 导致不可预测的结果，OpenSpec 带来可预测性 |
| **vs. Spec Kit (GitHub)** | 更轻量，更自由迭代，无需 Python 环境 |
| **vs. Kiro** | 不锁定特定 IDE 和模型，与你已有的工具配合工作 |

---

## 主要功能

### 1. 规范管理 (Specs)
- 将项目的行为规范作为「真理来源」集中存储
- 按领域组织（如 `specs/auth/`、`specs/payments/`）
- 支持 Delta Specs（增量规范）显示变化

### 2. 变更跟踪 (Changes)
- 每个变更有独立的文件夹
- 包含完整的工件：proposal、specs、design、tasks
- 清晰的执行进度追踪

### 3. Delta Specs
使用以下格式标注变化类型：
```markdown
## ADDED Requirements
### Requirement: 新功能描述
...

## MODIFIED Requirements
### Requirement: 修改后的需求
(Previously: 原来的描述)
...

## REMOVED Requirements
### Requirement: 被移除的需求
(Deprecated reason...)
```

### 4. 多工具集成
支持 25+ 种 AI 编码助手，通过统一的 slash 命令工作

### 5. 工作区与共享上下文
- Workspace：在多个仓库间建立本地视图
- Context Store：跨仓库共享协调上下文

---

## 适用场景

| 场景 | 说明 |
|------|------|
| **与 AI 编码助手协作** | Claude Code、Cursor、Windsurf、VS Code Copilot 等 |
| **个人项目开发** | 结构化功能实现，避免遗漏 |
| **团队协作** | 统一认知，减少返工 |
| **企业级项目管理** | 可扩展的规范驱动工作流 |
| **存量项目维护** | 不仅支持新项目，也支持现有代码库 |
| **交接与审计** | 完整的变更历史存档 |

---

## 安装

### 环境要求

- **Node.js**: 20.19.0 或更高版本
- **包管理器**: npm、pnpm、yarn、bun 或 nix

### 全局安装

```bash
# npm
npm install -g @fission-ai/openspec@latest

# 或 pnpm
pnpm add -g @fission-ai/openspec@latest

# 或 yarn
yarn global add @fission-ai/openspec@latest

# 或 bun
bun add -g @fission-ai/openspec@latest
```

### 验证安装

```bash
openspec --version
```

---

## 快速开始

### 1. 初始化项目

```bash
cd your-project
openspec init
```

这将创建以下结构：
```
openspec/
├── specs/              # 规范源（source of truth）
│   └── <domain>/
│       └── spec.md
├── changes/            # 提议的变更
│   └── <change-name>/
│       ├── proposal.md
│       ├── design.md
│       ├── tasks.md
│       └── specs/      # 增量规范
│           └── <domain>/
│               └── spec.md
└── config.yaml         # 项目配置
```

### 2. 配置 AI 工具（可选）

```bash
# 可交互选择
openspec init

# 或非交互式配置指定工具
openspec init --tools claude,cursor

# 或配置所有支持的工具
openspec init --tools all
```

支持的工具 ID：
- `amazon-q`, `antigravity`, `auggie`, `bob`, `claude`, `cline`, `codex`, `forgecode`
- `codebuddy`, `continue`, `costrict`, `crush`, `cursor`, `factory`, `gemini`
- `github-copilot`, `iflow`, `junie`, `kilocode`, `kimi`, `kiro`, `opencode`
- `pi`, `qoder`, `lingma`, `qwen`, `roocode`, `trae`, `windsurf`

### 3. 开始你的第一个变更

告诉你的 AI 助手：`/opsx:propose add-dark-mode`

AI 会自动创建：
- `proposal.md` — 为什么做这个改变
- `specs/` — 需求和场景
- `design.md` — 技术方案
- `tasks.md` — 实现检查清单

然后执行：`/opsx:apply`

完成后归档：`/opsx:archive`

---

## CLI 命令参考

### 设置命令

| 命令 | 说明 |
|------|------|
| `openspec init [path]` | 初始化 OpenSpec 到项目 |
| `openspec update [path]` | 更新 Instruction 文件 |

### 浏览命令

| 命令 | 说明 |
|------|------|
| `openspec list` | 列出所有活动变更 |
| `openspec list --specs` | 列出所有规范 |
| `openspec show <name>` | 显示变更或规范的详情 |
| `openspec view` | 交互式仪表板 |

### 验证命令

| 命令 | 说明 |
|------|------|
| `openspec validate [name]` | 验证变更和规范的结构 |
| `openspec validate --all` | 验证所有变更和规范 |

### 生命周期命令

| 命令 | 说明 |
|------|------|
| `openspec archive [name]` | 归档完成的变更并合并规范 |

### 工作流命令

| 命令 | 说明 |
|------|------|
| `openspec new change <name>` | 创建新的变更脚手架 |
| `openspec status [name]` | 显示工件完成状态 |
| `openspec instructions <artifact>` | 获取创建工件的指令 |
| `openspec templates` | 显示模式的模板路径 |
| `openspec schemas` | 列出可用工作流模式 |

### 工作区命令 (Beta)

| 命令 | 说明 |
|------|------|
| `openspec workspace setup` | 创建工作区 |
| `openspec workspace list` | 列出已知工作区 |
| `openspec workspace link <path>` | 链接仓库或文件夹 |
| `openspec workspace open` | 通过首选编辑器打开 |
| `openspec workspace doctor` | 检查工作区设置 |

### 共享上下文命令 (Beta)

| 命令 | 说明 |
|------|------|
| `openspec context-store setup` | 创建本地上下文存储 |
| `openspec context-store list` | 列出已注册的存储 |
| `openspec initiative create` | 创建倡议 |
| `openspec initiative list` | 列出倡议 |

### 配置命令

| 命令 | 说明 |
|------|------|
| `openspec config` | 查看配置 |
| `openspec config profile` | 选择工作流配置 |

### 实用命令

| 命令 | 说明 |
|------|------|
| `openspec feedback` | 提交反馈 |
| `openspec completion install` | 安装 Shell 自动补全 |

### Schema 命令

| 命令 | 说明 |
|------|------|
| `openspec schema init <name>` | 创建自定义模式 |
| `openspec schema fork <source>` | 复制现有模式 |
| `openspec schema validate` | 验证模式结构 |

---

## Slash 命令（AI 助手段落）

### 默认快速路径（Core Profile）

```
/opsx:propose ──► /opsx:apply ──► /opsx:sync ──► /opsx:archive
```

| 命令 | 说明 |
|------|------|
| `/opsx:propose <change-id>` | 创建变更 + 所有规划工件 |
| `/opsx:explore` | 探索和分析问题 |
| `/opsx:apply` | 执行任务 |
| `/opsx:sync` | 合并增量规范到主规范 |
| `/opsx:archive` | 归档并完成变更 |

### 扩展工作流（Custom Profile）

启用扩展命令：
```bash
openspec config profile
openspec update
```

```
/opsx:new ──► /opsx:ff 或 /opsx:continue ──► /opsx:apply ──► /opsx:verify ──► /opsx:archive
```

| 命令 | 说明 |
|------|------|
| `/opsx:new <change-id>` | 创建变更脚手架 |
| `/opsx:ff` | 创建所有规划工件（快速） |
| `/opsx:continue` | 逐步创建下一个工件 |
| `/opsx:apply` | 实现任务 |
| `/opsx:verify` | 验证实现是否符合规范 |
| `/opsx:archive` | 归档并完成变更 |
| `/opsx:bulk-archive` | 批量归档多个完成变更 |

---

## 工作流模式

### 1. 快速功能路径

当你知道要构建什么，直接执行：

```
/opsx:propose add-feature ──► /opsx:apply ──► /opsx:archive
```

**适用场景**：小型到中型功能、bug 修复、直接的变更

### 2. 探索式工作流

当需求不明确，需要先调查：

```
/opsx:explore ──► /opsx:new ──► /opsx:continue ──► /opsx:apply
```

**适用场景**：性能优化、调试、架构决策、需求不明确

### 3. 并行工作流

同时处理多个变更：

```
Change A: /opsx:propose ──► /opsx:apply（进行中）
                                  │
                             上下文切换
                                  │
Change B: /opsx:propose ──► /opsx:apply
```

**适用场景**：并行工作流、紧急中断、团队协作

### 4. 完成验证

推荐的最后阶段：

```
/opsx:apply ──► /opsx:verify ──► /opsx:archive
```

**Verify 检查维度：**
- **Completeness（完整性）**：所有任务完成，所有需求已实现，场景覆盖
- **Correctness（正确性）**：实现符合规范意图，边缘情况处理
- **Coherence（一致性）**：设计决策反映在代码中，模式一致

---

## 配置

### 全局配置文件位置

- macOS/Linux: `~/.openspec/config.yaml`
- Windows: `%USERPROFILE%\.openspec\config.yaml`

### 项目配置

在项目根目录的 `.openspec.yaml` 或 `openspec/config.yaml` 中配置。

### 工作流配置

```bash
# 查看当前配置
openspec config

# 切换到扩展工作流
openspec config profile

# 更新以应用更改
openspec update
```

---

## 数据收集

OpenSpec 收集匿名使用统计（可禁用）。

**默认启用**：仅收集命令名和版本号，不收集参数、路径、内容或个人信息

**禁用方法**：
```bash
export OPENSPEC_TELEMETRY=0
# 或
export DO_NOT_TRACK=1
```

---

## 相关资源

- [官方文档](https://openspec.dev/)
- [GitHub 仓库](https://github.com/Fission-AI/OpenSpec)
- [Discord 社区](https://discord.gg/YctCnvvshC)
- [更新日志](./CHANGELOG.md)

### 文档索引

- [Getting Started](./docs/getting-started.md) - 入门指南
- [Workflows](./docs/workflows.md) - 工作流模式
- [Commands](./docs/commands.md) - 命令参考
- [CLI](./docs/cli.md) -终端参考
- [Supported Tools](./docs/supported-tools.md) - 工具集成
- [Concepts](./docs/concepts.md) - 核心概念
- [Customization](./docs/customization.md) - 自定义配置

---

## 模型建议

OpenSpec 最适合高推理能力的模型。推荐：

- **Codex 5.5** 及以上
- **Opus 4.7** 及以上

用于规划和实现阶段。

---

## 许可证

MIT License - 参见 [LICENSE](./LICENSE)

---

## 贡献

欢迎提交贡献！请参阅 [CONTRIBUTING](https://github.com/Fission-AI/OpenSpec/blob/main/CONTRIBUTING.md) 了解如何参与。

- 小修复：直接提交 PR
- 大改动：先提交变更提案以便对齐

---

## 最后更新

本文档基于 OpenSpec 最新版本生成。

如有问题，请访问 [GitHub Issues](https://github.com/Fission-AI/OpenSpec/issues) 或加入 [Discord 社区](https://discord.gg/YctCnvvshC)。