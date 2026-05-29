# gsd-ship 命令详解

## 基本信息

| 属性 | 值 |
|------|-----|
| 命令名称 | `/gsd-ship` |
| 功能描述 | 在验证通过后创建 PR、运行审查，准备合并 |
| 参数提示 | `[phase number or milestone, e.g., '4' or 'v1.0']` |

## 功能概述

桥接本地完成 → 合并 PR。在 `/gsd-verify-work` 通过后，ship 工作：推送分支、创建带自动生成正文的 PR、可选触发审查，并跟踪合并。

**关闭计划 → 执行 → 验证 → ship 循环。**

## 参数详解

| 参数 | 说明 |
|------|------|
| `phase number` | 阶段号。例如 "4" |
| `milestone` | 里程碑版本。例如 "v1.0" |

## 执行流程详解

### 前置条件检查

```
1. 验证 verify-work 已通过
2. 检查是否有未解决的问题
3. 如果有问题，提示先修复
```

### 第一步：准备分支

```
4. 确定要 ship 的范围（阶段或里程碑）
5. 获取所有相关的 commits
6. 创建或更新分支
```

### 第二步：生成 PR 正文

```
7. 收集变更摘要
8. 提取测试结果
9. 生成 PR 正文模板：
   - 变更概述
   - 测试结果
   -  Breaking changes（如有）
   -  相关issues/PRs
```

### 第三步：创建 PR

```
10. 推送到远程
11. 创建 Pull Request
12. 添加 reviewers（如需要）
13. 添加 labels
14. 设置 milestone
```

### 第四步：等待审查（如触发）

```
15. 如设置了自动审查，等待审查结果
16. 处理审查反馈
17. 推送修复
```

### 第五步：跟踪合并

```
18. 监控 PR 状态
19. 合并后清理分支
20. 更新 STATE.md
```

## PR 正文模板

```markdown
## Summary

### Changes Made
- Feature A implemented
- Bug B fixed
- Refactoring C

### Test Results
✓ All UAT passed
✓ Unit tests: 45/45 passed
✓ Integration tests: 12/12 passed

### Breaking Changes
None

### Related Issues
Closes #123
Closes #456

### Checklist
- [x] Tests added/updated
- [x] Documentation updated
- [x] No console errors
```

## 成功标准

- [ ] 分支已推送
- [ ] PR 已创建
- [ ] PR 正文完整
- [ ] Reviewers 已添加（如需要）
- [ ] 用户知道后续步骤

## 执行上下文

加载以下文件：

- `$HOME/.claude/get-shit-done/workflows/ship.md`

## Ship 模式

### 单阶段 Ship

Ship 单个阶段：

```
/gsd-ship 4
```

只 ship 阶段 4 的工作。

### 里程碑 Ship

Ship 整个里程碑：

```
/gsd-ship v1.0
```

Ship 从上一个里程碑以来的所有已完成阶段。

## 后续步骤

在 `/gsd-ship` 完成后：

1. **合并 PR**：手动合并或等待 CI 通过后合并
2. **继续下一阶段**：运行 `/gsd-discuss-phase` 或 `/gsd-progress`

## 与其他命令的关系

| 命令 | 关系 |
|------|------|
| `/gsd-verify-work` | ship 的前置条件，验证必须通过 |
| `/gsd-complete-milestone` | ship 后的下一步，完成里程碑 |
| `/gsd-progress` | 可能建议运行 ship |
| `/gsd-review` | 可能对 PR 进行审查 |