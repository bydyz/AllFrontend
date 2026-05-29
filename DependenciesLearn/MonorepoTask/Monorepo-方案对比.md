# Monorepo 方案对比

## 综合排序（从优到劣）

### 🥇 1. Turborepo（推荐）

| 维度 | 评分 |
|------|------|
| 功能 | ⭐⭐⭐⭐ |
| 性能 | ⭐⭐⭐⭐⭐ |
| 易用性 | ⭐⭐⭐⭐⭐ |
| 生态 | ⭐⭐⭐⭐ |
| 维护活跃度 | ⭐⭐⭐⭐⭐ |

**优势**：轻量级、执行速度快、学习曲线低、现代感强
**劣势**：纯任务运行，无包发布功能

---

### 🥈 2. pnpm workspaces

| 维度 | 评分 |
|------|------|
| 功能 | ⭐⭐⭐⭐ |
| 性能 | ⭐⭐⭐⭐⭐ |
| 易用性 | ⭐⭐⭐⭐ |
| 生态 | ⭐⭐⭐⭐ |
| 维护活跃度 | ⭐⭐⭐⭐⭐ |

**优势**：磁盘利用率极高、包管理体验好、可独立使用
**劣势**：需要额外工具（如 changesets）处理发布

---

### 🥉 3. Nx

| 维度 | 评分 |
|------|------|
| 功能 | ⭐⭐⭐⭐⭐ |
| 性能 | ⭐⭐⭐⭐ |
| 易用性 | ⭐⭐⭐ |
| 生态 | ⭐⭐⭐⭐ |
| 维护活跃度 | ⭐⭐⭐⭐ |

**优势**：功能最全、计算缓存强大、分布式任务执行支持完善
**劣势**：重量级、学习曲线陡、配置复杂

---

### 4. Nx + Turbo（组合）

两者组合使用，取长补短，是大型企业的常见选择。

---

### 5. Lerna

| 维度 | 评分 |
|------|------|
| 功能 | ⭐⭐⭐ |
| 性能 | ⭐⭐⭐ |
| 易用性 | ⭐⭐⭐⭐ |
| 生态 | ⭐⭐⭐ |
| 维护活跃度 | ⭐⭐⭐ |

**优势**：简单易上手、历史悠久
**劣势**：维护更新慢、逐渐被 Nx/Turbo 取代

---

### 6. yarn workspaces

| 维度 | 评分 |
|------|------|
| 功能 | ⭐⭐⭐ |
| 性能 | ⭐⭐⭐⭐ |
| 易用性 | ⭐⭐⭐⭐ |
| 生态 | ⭐⭐⭐ |
| 维护活跃度 | ⭐⭐⭐ |

**优势**：常与 Lerna 搭配使用
**劣势**：功能有限，逐渐被 pnpm workspaces 替代

---

## 方案对比详述

| 方案 | 创建者 | 包发布 | 计算缓存 | 分布式 | 适用规模 |
|------|--------|--------|----------|--------|----------|
| Turborepo | Vercel | ❌ | ✅ | ✅ | 中大型 |
| pnpm workspaces | pnpm | ❌ | ❌ | ❌ | 中小型 |
| Nx | Nrwl/Angular | ✅ | ✅ | ✅ | 大型企业 |
| Lerna | Facebook | ✅ | ❌ | ❌ | 中型 |
| yarn workspaces | Facebook | ❌ | ❌ | ❌ | 小中型 |

## 综合建议

| 场景 | 推荐方案 |
|------|----------|
| 新项目 / 中小型 | **Turborepo** 或 **pnpm** |
| 大型企业级 | **Nx** 或 **Nx + Turbo** |
| 快速起步 | **pnpm workspaces** |
| 已有 yarn 存量 | **yarn workspaces + Lerna** |

---

## 附录：各方案配置文件示例

### Turborepo (`turbo.json`)
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

### pnpm (`pnpm-workspace.yaml`)
```yaml
packages:
  - 'packages/*'
```

### Nx (`nx.json`)
```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

### Lerna (`lerna.json`)
```json
{
  "packages": ["packages/*"],
  "version": "independent"
}
```

### yarn (`package.json`)
```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```