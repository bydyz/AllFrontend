---
name: all-example
description: 完整的 skill 示例模板，展示所有功能特性。当用户想了解 skill 的完整结构、参数传递、动态上下文注入、调用控制等功能时使用。适用于学习 skill 编写规范、创建新 skill 参考等场景。
when_to_use: |
  - 创建新的 skill
  - 学习 skill 编写规范
  - 参考完整示例模板
argument-hint: "[skill-name] [feature-name]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Read(glob grep *) Write(edit) Bash(echo ls)
model: sonnet
effort: medium
context: inline
---

# Skill 完整示例

本 skill 展示如何创建一个功能完整的 skill，涵盖以下特性：

## 1. 参数传递示例

### 基本参数

当用户调用 `/all-example argument1 argument2` 时：

- `$ARGUMENTS` = argument1 argument2
- `$ARGUMENTS[0]` = argument1
- `$0` = argument1（简写）
- `$1` = argument2（简写）

### 场景示例

```
用户输入: /all-example CreateComponent Button
Skill 接收: $0 = CreateComponent, $1 = Button
```

## 2. 动态上下文注入

使用 `` !`<command>` `` 语法在技能运行前执行命令：

### 单行命令

```yaml
当前目录: !`pwd`
```

### 多行命令

````markdown
## 环境信息
```!
node --version
npm --version
git status --short
```
````

### 场景示例

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

## 3. 调用控制

| 场景 | Frontmatter 设置 |
|------|------------------|
| 自动加载 + 用户可调用 | 默认（无特殊设置）|
| 仅用户手动调用 | `disable-model-invocation: true` |
| 仅 Claude 自动调用 | `user-invocable: false` |

### 使用示例

```yaml
# 部署技能 - 用户手动触发，Claude 不自动运行
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

```yaml
# 后台知识技能 - Claude 自动使用，用户不可见
---
name: api-conventions
description: API 设计模式，适用于本项目
user-invocable: false
---

编写 API 端点时：
- 使用 RESTful 命名约定
- 返回一致的错误格式
- 包含请求验证
```

## 4. 在子代理中运行

### Fork 模式示例

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

### 决策指南

| 技能需要... | 使用 | 原因 |
|------------|------|------|
| 编排并行代理（Task tool）| Inline | 子代理不能生成子代理 |
| 调用其他技能（Skill tool）| Inline | 子代理不能调用技能 |
| 运行外部 CLI 的 Bash 命令| Inline | 主上下文有完整工具访问 |
| 执行单一专注任务（研究、分析）| Fork | 隔离上下文，干净执行 |
| 提供参考知识（编码约定）| Inline | 指南丰富主对话 |

## 5. 支持文件结构

```
all-example/
├── SKILL.md              # 主指令文件（必需）
├── reference.md          # 参考文档（可选）
├── examples.md           # 示例文件（可选）
└── scripts/
    └── helper.sh         # 脚本文件（可选）
```

### 在 SKILL.md 中引用

```markdown
## 其他资源

- 完整规范详情见 [reference.md](reference.md)
- 使用示例见 [examples.md](examples.md)
- 辅助脚本见 [scripts/helper.sh](scripts/helper.sh)
```

### 最佳实践

- 保持 `SKILL.md` 在 500 行以内
- 大型参考文档（>300 行）包含目录
- 按领域组织：当技能支持多个领域/框架时，按变体组织文件

## 6. YAML Frontmatter 字段速查

| 字段 | 必需 | 说明 |
|------|------|------|
| `name` | 否 | 技能显示名称（小写字母、数字、连字符，最大64字符）|
| `description` | 推荐 | 技能功能描述和触发条件，是 Claude 决定何时加载的主要依据 |
| `when_to_use` | 否 | 额外的触发上下文（触发短语、示例请求）|
| `argument-hint` | 否 | 自动完成时的参数提示，如 `[issue-number]` |
| `disable-model-invocation` | 否 | 设为 `true` 阻止 Claude 自动加载，仅用户可调用 |
| `user-invocable` | 否 | 设为 `false` 从 `/` 菜单隐藏，仅 Claude 可调用 |
| `allowed-tools` | 否 | 技能激活时允许使用的工具列表 |
| `model` | 否 | 技能运行时使用的模型 |
| `effort` | 否 | 努力级别（low/medium/high/xhigh/max）|
| `context` | 否 | 设为 `fork` 在子代理上下文中运行 |
| `agent` | 否 | `context: fork` 时使用的子代理类型 |
| `hooks` | 否 | 技能生命周期的钩子配置 |
| `paths` | 否 | glob 模式，限制技能在哪些文件上自动激活 |
| `shell` | 否 | 指定 shell（bash/powershell）|

## 7. 文件命名规范

```
# ✅ 好的命名
script_parameters.md
api_endpoints.md
database_schema.md
coding_conventions.md

# ❌ 不好的命名
commands.md
cli_usage.md
reference.md
notes.txt
```

## 8. 重要约束

### 禁止事项

- **禁止泄露用户/公司特定信息**：绝对路径、个人用户名、公司名称、产品名称
- **禁止在 SKILL.md 中包含版本历史**
- **禁止硬编码技能安装路径**（如 `~/.claude/skills/`）

### 允许内容

- 相对路径（`scripts/example.py`、`references/guide.md`）
- 标准占位符（`<workspace>/project`、`<user>`、`<organization>`）

## 9. 技能存放位置

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