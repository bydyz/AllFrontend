# Skill 文档编写规范

> 基于 Claude Code 官方文档整理
> 来源：https://code.claude.com/docs/en/skills

## 1. 文件结构

```
skill-name/
├── SKILL.md           # 主指令文件（必需）
├── reference.md       # 参考文档（可选）
├── examples.md        # 示例文件（可选）
└── scripts/
    └── helper.sh     # 脚本文件（可选）
```

## 2. SKILL.md 结构

每个 skill 必须包含一个 `SKILL.md` 文件，由两部分组成：

1. **YAML frontmatter**（头部元数据）- 告诉 Claude 何时使用该技能
2. **Markdown 内容**（指令主体）- 技能被调用时的执行指令

```yaml
---
name: skill-name
description: 技能描述（做什么 + 何时触发）
---

技能指令内容...
```

## 3. YAML Frontmatter 字段说明

| 字段 | 必需 | 说明 |
|------|------|------|
| `name` | 否 | 技能显示名称（小写字母、数字、连字符，最大64字符）。若省略，使用目录名 |
| `description` | 推荐 | 技能功能描述和触发条件，是 Claude 决定何时加载的主要依据。若省略，使用第一段 Markdown 内容 |
| `when_to_use` | 否 | 额外的触发上下文（触发短语、示例请求），追加到 description |
| `argument-hint` | 否 | 自动完成时的参数提示，如 `[issue-number]` 或 `[filename] [format]` |
| `disable-model-invocation` | 否 | 设为 `true` 阻止 Claude 自动加载，仅用户可调用。用于有副作用的工作流（如 `/deploy`） |
| `user-invocable` | 否 | 设为 `false` 从 `/` 菜单隐藏，仅 Claude 可调用。用于后台知识技能 |
| `allowed-tools` | 否 | 技能激活时允许使用的工具列表（空格分隔或 YAML 列表） |
| `model` | 否 | 技能运行时使用的模型 |
| `effort` | 否 | 努力级别（low/medium/high/xhigh/max），覆盖会话级别 |
| `context` | 否 | 设为 `fork` 在子代理上下文中运行 |
| `agent` | 否 | `context: fork` 时使用的子代理类型（Explore/Plan/general-purpose）|
| `hooks` | 否 | 技能生命周期的钩子配置 |
| `paths` | 否 | glob 模式，限制技能在哪些文件上自动激活 |
| `shell` | 否 | 指定 shell（bash/powershell）。Windows 上需设置 `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` |

## 4. Description 编写规范

**这是最关键的字段**，决定技能何时被触发。

### 要求

- 包含"**做什么**" + "**何时使用**"
- 使用用户自然会说到的关键词
- 放在前面，1,536 字符限制（超过会被截断）
- 可以写得"pushy"一些，确保 Claude 不会忘记使用

### 示例

```yaml
# ✅ 好的描述
description: 深度解释技术概念和名词。当用户想深入理解某个技术术语、概念、框架、工具的含义、来由、实现原理时使用。适用于"什么是X"、"X是怎么来的"、"X是如何工作的"等场景。

# ❌ 不好的描述
description: 解释概念的工具
```

### 触发机制说明

- Claude 根据 description 决定何时自动加载技能
- 简单的单步任务（如"读取文件"）可能不会触发技能，因为 Claude 本身就能处理
- 复杂、多步或专业化的查询才会可靠地触发技能

## 5. 内容类型

### Reference 内容

添加知识：约定、模式、风格指南、领域知识。内容以内联方式运行，Claude 可以将其与对话上下文一起使用。

```yaml
---
name: api-conventions
description: API 设计模式，适用于本项目
---

编写 API 端点时：
- 使用 RESTful 命名约定
- 返回一致的错误格式
- 包含请求验证
```

### Task 内容

步骤化指令：部署、提交、代码生成。通常是有副作用的操作，用户希望手动触发。

```yaml
---
name: deploy
description: 部署应用到生产环境
disable-model-invocation: true
---

部署流程：
1. 运行测试套件
2. 构建应用程序
3. 推送到部署目标
4. 验证部署成功
```

## 6. 支持文件使用

将详细参考文档放在独立文件中，`SKILL.md` 中引用：

```markdown
## 其他资源

- 完整 API 详情见 [reference.md](reference.md)
- 使用示例见 [examples.md](examples.md)
```

### 最佳实践

> **Tip**: 保持 `SKILL.md` 在 500 行以内。将详细参考材料移到单独的文件中。

- 大型参考文档（>300 行）包含目录
- 按领域组织：当技能支持多个领域/框架时，按变体组织文件

```
cloud-deploy/
├── SKILL.md (工作流 + 选择逻辑)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```

## 7. 参数传递

使用 `$ARGUMENTS` 占位符接收输入：

```yaml
---
name: fix-issue
description: 修复 GitHub issue
---

修复 GitHub issue $ARGUMENTS，按照编码规范完成。
```

### 参数访问方式

| 语法 | 说明 |
|------|------|
| `$ARGUMENTS` | 所有参数 |
| `$ARGUMENTS[0]` | 第1个参数（0索引）|
| `$0` | 第1个参数的简写 |
| `$1` | 第2个参数的简写 |

### 示例

```yaml
---
name: migrate-component
description: 迁移组件从一种框架到另一种框架
---

迁移 $0 组件从 $1 到 $2。
保留所有现有行为和测试。
```

运行 `/migrate-component SearchBar React Vue` 时：
- `$0` = SearchBar
- `$1` = React
- `$2` = Vue

## 8. 动态上下文注入

使用 `` !`<command>` `` 语法在技能运行前执行命令，输出结果会替换占位符：

```yaml
---
name: pr-summary
description: 汇总 PR 变更
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## PR 上下文
- PR diff: !`gh pr diff`
- PR 评论: !`gh pr view --comments`
- 变更文件: !`gh pr diff --name-only`

## 你的任务
汇总这个 PR 的变更...
```

### 工作原理

1. 每个 `` !`<command>` `` 在 Claude 看到任何内容之前立即执行
2. 输出替换占位符
3. Claude 接收带有实际数据的完整渲染提示

### 多行命令

````markdown
## 环境信息
```!
node --version
npm --version
git status --short
```
````

## 9. 调用控制

| Frontmatter | 你可调用 | Claude 可调用 | 说明 |
|-------------|----------|---------------|------|
| 默认 | ✓ | ✓ | 描述始终在上下文中，完整技能在调用时加载 |
| `disable-model-invocation: true` | ✓ | ✗ | 描述不在上下文中，完整技能仅在你调用时加载 |
| `user-invocable: false` | ✗ | ✓ | 描述始终在上下文中，完整技能在 Claude 调用时加载 |

### 使用场景

- **`disable-model-invocation: true`**: 有副作用的工作流（`/commit`、`/deploy`），不希望 Claude 自动运行
- **`user-invocable: false`**: 后台知识技能，用户不需要直接调用（但 Claude 应该知道）

## 10. 在子代理中运行技能

添加 `context: fork` 使技能在隔离的上下文中运行：

```yaml
---
name: deep-research
description: 深入研究一个主题
context: fork
agent: Explore
---

研究 $ARGUMENTS 的各个方面：
1. 使用 Glob 和 Grep 找到相关文件
2. 读取和分析代码
3. 总结发现，包含具体文件引用
```

### 工作原理

1. 创建新的隔离上下文
2. 子代理将技能内容作为提示接收
3. `agent` 字段决定执行环境（模型、工具、权限）
4. 结果汇总返回到主对话

### 决策指南

| 技能需要... | 使用 | 原因 |
|------------|------|------|
| 编排并行代理（Task tool）| **Inline**（无 `context`）| 子代理不能生成子代理 |
| 调用其他技能（Skill tool）| **Inline**（无 `context`）| 子代理不能调用技能 |
| 运行外部 CLI 的 Bash 命令| **Inline**（无 `context`）| 主上下文有完整工具访问 |
| 执行单一专注任务（研究、分析）| **Fork**（`context: fork`）| 隔离上下文，干净执行 |
| 提供参考知识（编码约定）| **Inline**（无 `context`）| 指南丰富主对话 |

## 11. 重要约束

### 禁止事项

- **禁止泄露用户/公司特定信息**：绝对路径、个人用户名、公司名称、产品名称
- **禁止在 SKILL.md 中包含版本历史**
- **禁止硬编码技能安装路径**（如 `~/.claude/skills/`）

### 允许内容

- 相对路径（`scripts/example.py`、`references/guide.md`）
- 标准占位符（`<workspace>/project`、`<user>`、`<organization>`）

### 文件命名

文件名必须一看就知道内容，不需要读取文件：

```
# ✅ 好的命名
script_parameters.md
api_endpoints.md
database_schema.md

# ❌ 不好的命名
commands.md
cli_usage.md
reference.md
```

## 12. 技能存放位置

| 位置 | 路径 | 适用范围 |
|------|------|----------|
| Enterprise | 托管配置 | 组织内所有用户 |
| Personal | `~/.claude/skills/<skill-name>/` | 所有项目 |
| Project | `.claude/skills/<skill-name>/` | 当前项目 |
| Plugin | `<plugin>/skills/<skill-name>/` | 插件启用处 |

优先级：Enterprise > Personal > Project > Plugin

---

## 参考资源

- [Claude Code Skills 官方文档](https://code.claude.com/docs/en/skills)
- [Agent Skills 概述](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [技能编写最佳实践](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Agent Skills 开放标准](https://agentskills.io)
- [Anthropic Skills GitHub 示例](https://github.com/anthropics/skills)