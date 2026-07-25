# .pnpmfile.cjs 配置详解

`.pnpmfile.cjs` 是 pnpm 的配置文件，允许你通过钩子（hooks）直接介入安装过程。文件位于与锁文件相同的目录中（通常是 monorepo 根目录）。

## 文件格式

支持两种格式：
- `.pnpmfile.mjs` (ESM)
- `.pnpmfile.cjs` (CommonJS)

## 钩子（Hooks）

### 1. `hooks.readPackage(pkg, context): pkg | Promise<pkg>`

**作用**：在 pnpm 解析依赖包的 package.json 后、依赖解析前修改包的清单文件。

**参数**：
- `pkg`: 包的清单对象（来自注册表或 package.json 内容）
- `context`: 上下文对象，包含 `log(msg)` 方法用于调试日志

**特点**：
- 修改不会保存到文件系统
- 影响锁文件解析结果和安装内容
- 如果已解析依赖，需要删除 `pnpm-lock.yaml` 重新解析

**示例**：
```javascript
function readPackage(pkg, context) {
  // 修改 foo@1.x 的依赖
  if (pkg.name === 'foo' && pkg.version.startsWith('1.')) {
    pkg.dependencies = {
      ...pkg.dependencies,
      bar: '^2.0.0'  // 替换 bar@1.x 为 bar@2.0.0
    }
    context.log('bar@1 => bar@2 in dependencies of foo')
  }
  
  // 修改所有使用 baz 的包
  if (pkg.dependencies.baz) {
    pkg.dependencies.baz = '1.2.3'
  }
  
  return pkg
}

module.exports = { hooks: { readPackage } }
```

**限制**：
- 删除 `scripts` 字段不会阻止 pnpm 构建依赖
- 需要使用 `pnpm.neverBuiltDependencies` 来忽略构建

### 2. `hooks.updateConfig(config): config | Promise<config>`

**作用**：修改 pnpm 使用的配置设置。

**添加版本**：v10.8.0

**参数**：
- `config`: 当前的 pnpm 配置对象

**示例**：
```javascript
module.exports = {
  hooks: {
    updateConfig(config) {
      return Object.assign(config, {
        enablePrePostScripts: false,
        optimisticRepeatInstall: true,
        resolutionMode: 'lowest-direct',
        verifyDepsBeforeRun: 'install'
      })
    }
  }
}
```

**适用场景**：
- 与 `configDependencies` 配对使用
- 跨 Git 仓库共享和重用配置
- 应用推荐的配置设置

### 3. `hooks.afterAllResolved(lockfile, context): lockfile | Promise<lockfile>`

**作用**：在锁文件序列化前修改锁文件输出。

**参数**：
- `lockfile`: 将序列化为 `pnpm-lock.yaml` 的锁文件对象
- `context`: 上下文对象，包含 `log(msg)` 方法

**示例**：
```javascript
function afterAllResolved(lockfile, context) {
  // 修改锁文件内容
  // ...
  return lockfile
}

module.exports = { hooks: { afterAllResolved } }
```

**特点**：
- 没有限制 - 可以修改锁文件的任何内容
- 可以扩展锁文件功能

### 4. `hooks.beforePacking(pkg): pkg | Promise<pkg>`

**作用**：在 `pnpm pack` 或 `pnpm publish` 过程中，在打包进 tarball 前修改 package.json。

**添加版本**：v10.28.0

**参数**：
- `pkg`: 将包含在发布 tarball 中的包清单对象

**示例**：
```javascript
function beforePacking(pkg) {
  // 移除仅开发使用的字段
  delete pkg.devDependencies
  delete pkg.scripts.test
  
  // 添加发布元数据
  pkg.publishedAt = new Date().toISOString()
  
  // 修改生产环境的包导出
  if (pkg.name === 'my-package') {
    pkg.main = './dist/index.js'
  }
  
  return pkg
}

module.exports = { hooks: { beforePacking } }
```

**特点**：
- 只影响 tarball 中的 `package.json`
- 本地 `package.json` 文件保持不变
- 与 `readPackage` 不同，只影响发布内容

### 5. `hooks.preResolution(options): Promise<void>`

**作用**：在读取和解析项目锁文件后、但在解析依赖项前执行。允许修改锁文件对象。

**参数**：
- `options.existsCurrentLockfile`: 如果 `node_modules/.pnpm/lock.yaml` 上的锁文件存在，则为 true
- `options.currentLockfile`: 来自 `node_modules/.pnpm/lock.yaml` 的锁文件对象
- `options.existsNonEmptyWantedLockfile`: 如果 `pnpm-lock.yaml` 中的锁文件存在，则为 true
- `options.wantedLockfile`: 来自 `pnpm-lock.yaml` 的锁文件对象
- `options.lockfileDir`: 所需锁文件所在的目录
- `options.storeDir`: 存储目录的位置
- `options.registries`: 范围到注册表 URL 的映射

### 6. `hooks.importPackage(destinationDir, options): Promise<string | undefined>`

**作用**：更改软件包如何写入 `node_modules`。

**参数**：
- `destinationDir`: 包应该写入的目标目录
- `options.disableRelinkLocalDirDeps`
- `options.filesMap`
- `options.force`
- `options.resolvedFrom`
- `options.keepModulesDir`

**返回值**：可选，说明用于导入依赖项的方法（如 clone、hardlink）

## 查找器（Finders）

**添加版本**：v10.16.0

查找器函数通过 `--find-by` 标志与 `pnpm list` 和 `pnpm why` 一起使用。

**示例**：
```javascript
module.exports = {
  finders: {
    react17: (ctx) => {
      return ctx.readManifest().peerDependencies?.react === "^17.0.0"
    }
  }
}
```

**使用**：
```bash
pnpm why --find-by=react17
```

## 自定义解析器和获取器

**添加版本**：v11.0.0

### 自定义解析器（Custom Resolvers）

自定义解析器将包描述符（如 `foo@^1.0.0`）转换为存储在锁文件中的解析结果。

**接口**：
```typescript
interface CustomResolver {
  canResolve?: (wantedDependency: WantedDependency) => boolean | Promise<boolean>
  resolve?: (wantedDependency: WantedDependency, opts: ResolveOptions) => ResolveResult | Promise<ResolveResult>
  shouldRefreshResolution?: (depPath: string, pkgSnapshot: PackageSnapshot) => boolean | Promise<boolean>
}
```

**方法**：
- `canResolve(wantedDependency)`: 决定此解析器是否能解析给定的依赖
- `resolve(wantedDependency, opts)`: 将依赖解析为特定的包元数据和解析信息
- `shouldRefreshResolution(depPath, pkgSnapshot)`: 返回 true 以触发所有包的完整解析

**自定义解析类型**：
- 必须使用 `custom:` 前缀（如 `custom:cdn`、`custom:artifactory`）

### 自定义获取器（Custom Fetchers）

自定义获取器完全处理自定义包类型的获取。

**接口**：
```typescript
interface CustomFetcher {
  canFetch?: (pkgId: string, resolution: Resolution) => boolean | Promise<boolean>
  fetch?: (cafs: Cafs, resolution: Resolution, opts: FetchOptions, fetchers: Fetchers) => FetchResult | Promise<FetchResult>
}
```

**方法**：
- `canFetch(pkgId, resolution)`: 决定此获取器是否能获取给定解析的包
- `fetch(cafs, resolution, opts, fetchers)`: 获取包文件并返回元数据

**委托给内置获取器**：
1. 返回 `{ delegate }` 信封
2. 直接调用 `fetchers.*`

### 使用示例

#### 基本自定义解析器
```javascript
const customResolver = {
  canResolve: (wantedDependency) => {
    return wantedDependency.alias.startsWith('@company/')
  },
  resolve: async (wantedDependency, opts) => {
    const response = await fetch(
      `https://custom-registry.company.com/${wantedDependency.alias}/${wantedDependency.bareSpecifier}`
    )
    const metadata = await response.json()
    return {
      id: `${metadata.name}@${metadata.version}`,
      resolution: {
        tarball: metadata.tarballUrl,
        integrity: metadata.integrity
      }
    }
  }
}

module.exports = { resolvers: [customResolver] }
```

#### 基本自定义获取器
```javascript
const customFetcher = {
  canFetch: (pkgId, resolution) => {
    return pkgId.startsWith('@company/')
  },
  fetch: async (cafs, resolution, opts, fetchers) => {
    const tarballResolution = {
      tarball: resolution.tarball.replace(
        'https://registry.npmjs.org/',
        'https://custom-registry.company.com/'
      ),
      integrity: resolution.integrity
    }
    return fetchers.remoteTarball(cafs, tarballResolution, opts)
  }
}

module.exports = { fetchers: [customFetcher] }
```

## 相关配置

### ignorePnpmfile
- **默认值**：`false`
- **类型**：布尔值
- **作用**：忽略 `.pnpmfile.cjs` 文件
- **使用场景**：与 `--ignore-scripts` 一起使用，确保安装期间不执行任何脚本

### pnpmfile
- **默认值**：`['.pnpmfile.cjs']`
- **类型**：路径数组
- **示例**：`['.pnpm/.pnpmfile.cjs']`
- **作用**：指定本地 pnpmfile 的位置

### globalPnpmfile
- **默认值**：`null`
- **类型**：路径
- **示例**：`~/.pnpm/global_pnpmfile.cjs`
- **作用**：指定全局 pnpmfile 的位置
- **注意**：建议使用本地 pnpmfiles，仅在不使用 pnpm 作为主要包管理器的项目中使用全局 pnpmfile

## 总结

`.pnpmfile.cjs` 提供了强大的钩子系统，允许你在 pnpm 安装过程的各个阶段进行干预和修改。主要功能包括：

1. **修改包清单**：通过 `readPackage` 修改依赖的 `package.json`
2. **修改配置**：通过 `updateConfig` 修改 pnpm 配置
3. **修改锁文件**：通过 `afterAllResolved` 修改锁文件内容
4. **自定义发布**：通过 `beforePacking` 自定义发布的包
5. **自定义解析和获取**：通过自定义解析器和获取器实现自定义包管理

这些钩子使得 pnpm 非常灵活，可以适应各种复杂的包管理场景。