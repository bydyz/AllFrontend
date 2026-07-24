# OpenSpec Change 完成与归档机制

## Q: Change 完成后，后续还可以编辑它吗？

**A:** 可以。分两个层面：

### 代码层面

代码在 `src/` 目录下，跟 OpenSpec 归档无关，**随时可直接改**。

### OpenSpec 文档层面

归档后的内容在 `openspec/changes/archive/` 下，是只读的历史记录。如果改动比较大想重新走规划流程，**新建一个 change** 即可：

```
/opsx-propose double-color-ball-v2
```

**简单说：小改直接改代码，大改开新 change。**

---

## Q: OpenSpec 是如何判断一个 Change 完成了，且不可再编辑的？

**A:** OpenSpec **不会真正锁定**任何东西。

### 完成判断

通过 `openspec status --change "xxx" --json` 查看：

- `artifacts` 全部 `status: "done"` → `isComplete: true`
- `tasks.md` 里所有 checkbox 都是 `[x]` → 全部实施完毕

本质就是**数一下文档写没写完、任务勾没勾完**。

### 归档本质

归档就是把目录**移到 archive 文件夹下**，纯粹是文件系统层面的组织约定：

```
openspec/changes/double-color-ball-machine/          ← 进行中
          │
          │  mv（文件移动）
          ▼
openspec/changes/archive/2026-07-24-double-color-ball-machine/  ← 归档
```

没有任何锁、没有状态标记、没有权限限制。

### 各层面编辑能力

| 层面 | 能不能改 | 怎么改 |
|------|---------|--------|
| **代码** (`src/`) | 随时改 | 直接编辑，跟 OpenSpec 无关 |
| **归档文档** (`archive/`) | 随时改 | 直接编辑文件，没人拦你 |
| **OpenSpec 系统** | 不会阻止 | 它只是个文件管理工具，不是版本控制系统 |

### 核心认知

> **OpenSpec 的价值不在"锁"，而在"记录"。**
>
> 它帮你留下决策过程（为什么这么做、考虑过什么方案、最终选了什么），以后回溯时有据可查。
