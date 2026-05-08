# Skill 编写深度参考

本文档提供 skill 编写的更详细信息，适用于需要深入了解的开发者。

## 详细字段说明

### name

技能显示名称，规则：
- 小写字母、数字、连字符
- 最大 64 字符
- 若省略，使用目录名

```yaml
# ✅ 正确
name: api-conventions
name: deep-research-tool

# ❌ 错误
name: API Conventions (包含大写和空格)
name: very-long-skill-name-that-exceeds-the-maximum-character-limit-for-skill-names
```

### description

技能功能描述和触发条件，是 Claude 决定何时加载的主要依据。

#### 编写要点

1. **包含"做什么" + "何时使用"**
2. **使用用户自然会说到的关键词**
3. **放在前面，1,536 字符限制（超过会被截断）**
4. **可以写得"pushy"一些，确保 Claude 不会忘记使用**

#### 示例对比

```yaml
# ✅ 好的描述
description: 深度解释技术概念和名词。当用户想深入理解某个技术术语、概念、框架、工具的含义、来由、实现原理时使用。适用于"什么是X"、"X是怎么来的"、"X是如何工作的"等场景。

# ❌ 不好的描述
description: 解释概念的工具
```

### allowed-tools

技能激活时允许使用的工具列表。

#### 语法格式

```yaml
# 空格分隔
allowed-tools: Read Write Bash

# YAML 列表
allowed-tools:
  - Read
  - Write
  - Bash
```

#### 工具过滤

```yaml
# 只允许读取文件
allowed-tools: Read

# 只允许特定的 grep 模式
allowed-tools: Grep(*.js *.ts)

# 允许特定前缀的所有命令
allowed-tools: Bash(git * npm *)
```

### model

技能运行时使用的模型。

```yaml
# 使用特定模型
model: sonnet
model: haiku
model: opus
```

### effort

努力级别，覆盖会话级别设置。

```yaml
effort: low      # 快速简单任务
effort: medium   # 标准任务
effort: high     # 复杂任务
effort: xhigh    # 非常复杂
effort: max      # 最大努力
```

### paths

glob 模式，限制技能在哪些文件上自动激活。

```yaml
# 只在 TypeScript 文件上激活
paths: "**/*.ts"

# 只在测试文件上激活
paths: "**/*.test.ts" "**/*.spec.ts"

# 在多个模式上激活
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
```

### shell

指定 shell 类型。

```yaml
shell: bash
shell: powershell
```

> 注意：Windows 上需设置 `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`

## 动态上下文注入详解

### 工作原理

1. 每个 `` !`<command>` `` 在 Claude 看到任何内容之前立即执行
2. 输出替换占位符
3. Claude 接收带有实际数据的完整渲染提示

### 实际场景

```yaml
---
name: file-analyzer
description: 分析项目文件结构
---

## 项目信息
- 当前路径: !`pwd`
- Node 版本: !`node --version`
- 包管理器: !`cat package.json | grep '"packageManager"' || echo "npm"`

## 你的任务
分析当前项目的文件结构和依赖情况...
```

### 注意事项

- 命令输出会被直接插入到 skill 内容中
- 如果命令执行失败，占位符会被替换为空字符串
- 不适合执行耗时操作

## 子代理运行模式

### 何时使用 Fork

| 场景 | 推荐模式 | 原因 |
|------|----------|------|
| 代码研究/分析 | Fork | 隔离上下文，避免主上下文污染 |
| 知识参考 | Inline | 丰富主对话上下文 |
| 复杂任务编排 | Inline | 需要 Task tool 能力 |
| 并发执行 | Inline | 需要调用其他 skill |

### Agent 类型

```yaml
agent: Explore      # 探索型，适合研究任务
agent: General      # 通用型，适合一般任务
agent: Analyze      # 分析型，适合分析任务
```

## 版本兼容性

Skill 标准随 Claude Code 版本演进：

| 版本 | 新增功能 |
|------|----------|
| 1.0+ | 基础 skill 功能 |
| 2.0+ | hooks、context: fork |
| 3.0+ | allowed-tools 过滤 |

建议在 SKILL.md 中注明支持的最低版本。

## 调试技巧

### 验证 Skill 加载

1. 使用 `/skills` 命令查看已加载的 skill
2. 检查 description 是否正确触发

### 测试参数传递

```yaml
---
name: test-args
description: 测试参数传递
---

参数: $ARGUMENTS
第1个: $0
第2个: $1
```

调用 `/test-args foo bar` 检查输出。

### 动态上下文调试

```yaml
---
name: debug-context
description: 调试上下文注入
---

```!
echo "Debug: $(date)"
```
```
```

## 常见错误

### 1. 描述过于简短

```yaml
# ❌ 太简单
description: 代码审查

# ✅ 详细
description: 执行详细的代码审查。当用户要求审查代码、审查 PR、或者需要反馈代码质量时使用。
```

### 2. 路径硬编码

```yaml
# ❌ 硬编码绝对路径
allowed-tools: Bash(~/.local/bin/*)

# ✅ 相对路径或通用模式
allowed-tools: Bash(git *)
```

### 3. 技能内容过长

```yaml
# ❌ 超过 500 行
# 建议拆分到 reference.md

# ✅ 主文件保持简洁
# 详细文档移到 reference.md
```

## 最佳实践清单

- [ ] 使用清晰、描述性的 name
- [ ] description 包含"做什么"和"何时使用"
- [ ] 合理使用 disable-model-invocation 和 user-invocable
- [ ] 适当设置 allowed-tools 限制权限
- [ ] 保持 SKILL.md 在 500 行以内
- [ ] 大型文档拆分到 reference.md
- [ ] 使用有意义的文件命名
- [ ] 避免硬编码路径和敏感信息
- [ ] 添加 when_to_use 提供触发示例
- [ ] 使用 argument-hint 提供参数提示