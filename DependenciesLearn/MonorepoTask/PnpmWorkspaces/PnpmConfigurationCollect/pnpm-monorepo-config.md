# pnpm Monorepo 特有配置文件总结

| 文件 | 作用 |
|------|------|
| `pnpm-workspace.yaml` | 定义工作区包的路径（如 `packages/*`），是 monorepo 的核心配置 |
| `.pnpmfile.cjs` | 自定义 pnpm 行为的钩子文件，可修改 package.json 或添加依赖 |
| `.npmrc` | pnpm 配置文件（如 `shamefully-hoist=true`、`strict-peer-dependencies=false`） |
| `pnpm-lock.yaml` | 锁文件，锁定依赖精确版本，保证团队环境一致 |

## 文件说明

### 1. pnpm-workspace.yaml

定义 monorepo 中哪些目录是工作区包：

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'libs/*'
```

### 2. .pnpmfile.cjs

自定义 pnpm 行为的钩子文件：

```js
// 自动给所有包注入依赖
function readPackage(pkg) {
  pkg.dependencies = pkg.dependencies || {};
  pkg.dependencies['lodash'] = '^4.17.0';
  return pkg;
}

module.exports = { hooks: { readPackage } };
```

### 3. .npmrc

pnpm 运行时配置：

```ini
# 允许 hoist 依赖（兼容性）
shamefully-hoist=true

# 跳过 peer 依赖检查
strict-peer-dependencies=false

# 使用硬链接到全局 store
prefer-frozen-lockfile=true
```

### 4. pnpm-lock.yaml

- **自动生成，不要手动修改**
- 提交到 Git 保证环境一致性
- 记录所有依赖的精确版本和依赖关系
