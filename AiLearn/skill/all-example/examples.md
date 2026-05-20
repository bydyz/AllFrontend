# Skill 编写示例集

本文档提供多种场景下的 skill 编写示例。

## 1. 基础示例

### 最简 Skill

```yaml
---
name: greeting
description: 简单问候技能
---

你好！我是你的 assistant。
```

### 带参数 Skill

```yaml
---
name: hello
description: 带参数问候
---

你好，$0！祝你有美好的一天。
```

调用：`/hello World` → 输出：`你好，World！祝你有美好的一天。`

## 2. 知识技能示例

### API 约定技能

```yaml
---
name: api-conventions
description: API 设计模式，适用于本项目
user-invocable: false
---

编写 API 端点时：
- 使用 RESTful 命名约定
- 返回一致的错误格式
- 包含请求验证
- 使用 HTTP 状态码正确
- 包含分页参数
```

### 代码风格技能

```yaml
---
name: coding-standards
description: 项目代码风格规范
user-invocable: false
---

## JavaScript/TypeScript 规范

### 命名
- 变量/函数：camelCase
- 常量：UPPER_SNAKE_CASE
- 类名：PascalCase
- 文件名：kebab-case.ts

### 代码组织
- 导出放在文件底部
- 类型定义单独文件
- 单一职责原则

### 注释
- 公共 API 必须有 JSDoc
- 复杂逻辑添加行内注释
- 删除 TODO 注释或添加负责人
```

## 3. 任务技能示例

### 部署技能

```yaml
---
name: deploy
description: 部署应用到生产环境
disable-model-invocation: true
---

## 部署流程

1. **运行测试套件**
   - 执行 npm test
   - 确保所有测试通过

2. **构建应用程序**
   - 执行 npm run build
   - 验证构建产物

3. **推送到部署目标**
   - 使用配置好的部署策略
   - 记录部署版本

4. **验证部署成功**
   - 检查健康端点
   - 验证关键功能
```

### 提交技能

```yaml
---
name: commit
description: 智能提交代码变更
disable-model-invocation: true
---

## 提交流程

1. **查看变更**
   - 运行 git status
   - 运行 git diff

2. **分析变更内容**
   - 识别新增功能
   - 识别 bug 修复
   - 识别重构

3. **生成提交信息**
   - 使用 Conventional Commits 格式
   - 格式：type(scope): description
   - 类型：feat, fix, docs, style, refactor, test, chore

4. **执行提交**
   - git add .
   - git commit -m "..."
```

## 4. 研究技能示例

### 深度研究技能

```yaml
---
name: deep-research
description: 深入研究一个主题
context: fork
agent: Explore
allowed-tools: Glob Grep Read Bash
---

研究 $ARGUMENTS 的各个方面：

1. 使用 Glob 和 Grep 找到相关文件
2. 读取和分析代码
3. 搜索网络获取最新信息
4. 总结发现，包含具体文件引用

## 输出格式

### 概述
[主题的简要说明]

### 详细分析
[深入的分析内容]

### 参考资源
- [资源1链接]
- [资源2链接]
```

### 代码分析技能

```yaml
---
name: analyze-code
description: 分析代码库结构和质量
context: fork
agent: Explore
---

分析 $ARGUMENTS 代码库：

1. **项目结构**
   - 目录结构
   - 主要模块

2. **依赖关系**
   - package.json 分析
   - 导入导出关系

3. **代码质量**
   - 复杂度评估
   - 潜在问题

4. **改进建议**
   - 重构机会
   - 性能优化
```

## 5. 多领域技能示例

### 云部署技能（带变体）

```
cloud-deploy/
├── SKILL.md
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```

**SKILL.md:**

```yaml
---
name: cloud-deploy
description: 云部署技能，支持多平台
---

## 部署平台

根据用户指定的云平台选择合适的部署策略。

- AWS 部署见 [references/aws.md](references/aws.md)
- GCP 部署见 [references/gcp.md](references/gcp.md)
- Azure 部署见 [references/azure.md](references/azure.md)

## 通用流程

1. 构建应用
2. 配置云资源
3. 部署
4. 验证
```

**references/aws.md:**

```yaml
# AWS 部署指南

## 前提条件

- AWS CLI 已配置
- ECR 仓库已创建

## 部署步骤

1. 构建 Docker 镜像
2. 推送到 ECR
3. 更新 ECS 服务
4. 验证部署
```

## 6. 动态上下文示例

### 环境检测技能

```yaml
---
name: env-info
description: 显示当前环境信息
---

## 当前环境

- 工作目录: !`pwd`
- Node 版本: !`node --version`
- NPM 版本: !`npm --version`
- Git 状态: !`git status --short`

## 项目信息

- 包管理器: !`cat package.json | jq -r '.packageManager' 2>/dev/null || echo "npm"`
- 项目名称: !`cat package.json | jq -r '.name' 2>/dev/null || echo "unknown"`
```

### Git 信息技能

```yaml
---
name: git-context
description: 显示当前 Git 上下文
---

## Git 状态

```
!`git status`
```

## 最近提交

```
!`git log --oneline -5`
```

## 当前分支

!`git branch --show-current`

## 未推送 commits

!`git log @{u} --oneline`
```

## 7. 工作流技能示例

### Code Review 技能

```yaml
---
name: code-review
description: 执行代码审查
context: fork
agent: General
allowed-tools: Bash(gh *) Read Glob Grep
---

## 审查内容

- PR 描述: !`gh pr view --json title,body`
- PR 变更: !`gh pr diff`
- 变更文件: !`gh pr diff --name-only`

## 审查要点

1. **代码质量**
   - 命名是否清晰
   - 是否有重复代码
   - 是否有潜在 bug

2. **最佳实践**
   - 是否遵循项目规范
   - 是否有适当的测试
   - 是否有文档

3. **性能**
   - 是否有性能问题
   - 是否有内存泄漏风险

4. **安全性**
   - 是否有安全漏洞
   - 是否有敏感信息泄露

## 输出格式

### 总体评价
[总体评价]

### 具体建议
1. [建议1]
2. [建议2]

### 优点
- [优点1]
- [优点2]
```

## 8. Hooks 技能示例

```yaml
---
name: pre-commit-check
description: 提交前检查
hooks:
  pre_task:
    - command: "npm run lint"
      description: "运行代码检查"
    - command: "npm test"
      description: "运行测试"
---

## 提交前检查

在执行提交前，确保：

1. 代码通过 lint 检查
2. 所有测试通过
3. 没有未解决的 TODO
4. 提交信息符合规范
```

## 9. 复合技能示例

### 全栈开发技能

```yaml
---
name: fullstack-dev
description: 全栈开发辅助技能
context: fork
agent: General
---

辅助 $ARGUMENTS 进行全栈开发：

## 前端开发
- React/Vue 组件创建
- 状态管理
- 样式编写

## 后端开发
- API 设计
- 数据库设计
- 业务逻辑

## DevOps
- Docker 配置
- CI/CD 配置
- 部署脚本

根据具体需求选择合适的工具和技术栈。
```

## 10. 模板示例

### 通用任务模板

```yaml
---
name: task-template
description: 通用任务处理模板
argument-hint: "[task-type] [context]"
---

处理任务：$0

上下文：$1

## 步骤

1. 理解任务要求
2. 分析现有代码
3. 实施方案
4. 验证结果
5. 总结完成情况
```

### 问题解决模板

```yaml
---
name: problem-solver
description: 系统性问题解决
argument-hint: "[problem-description]"
---

解决问题：$ARGUMENTS

## 问题分析

1. 识别问题本质
2. 收集相关信息
3. 分析可能原因

## 解决方案

1. 制定解决策略
2. 实施修复
3. 验证修复效果

## 总结

记录问题和解决方案，供后续参考。
```