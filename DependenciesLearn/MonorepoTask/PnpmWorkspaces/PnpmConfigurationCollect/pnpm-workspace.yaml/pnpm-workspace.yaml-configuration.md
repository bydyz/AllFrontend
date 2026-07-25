# pnpm-workspace.yaml 配置详解

`pnpm-workspace.yaml` 是 pnpm monorepo 的核心配置文件，定义工作区结构及各种行为设置。以下按类别列举所有配置项。

---

## 1. 工作区基本配置

### packages
定义工作区中哪些目录是包。支持 glob 模式，可用 `!` 排除特定目录。根包始终包含在内。

```yaml
packages:
  - "packages/*"          # packages 目录下的所有子目录
  - "apps/*"              # apps 目录下的所有子目录
  - "components/**"       # components 目录下的所有嵌套子目录
  - "!**/test/**"         # 排除 test 目录
```

---

## 2. 目录配置（Catalogs）

### catalog
定义默认目录，用于集中管理依赖版本。包中可通过 `"package": "catalog:"` 引用。

```yaml
catalog:
  react: ^19.0.0
  react-dom: ^19.0.0
  typescript: ^5.3.0
```

### catalogs
定义多个命名目录，适用于需要多版本共存的场景（如测试不同 React 版本）。

```yaml
catalogs:
  react16:
    react: ^16.7.0
    react-dom: ^16.7.0
  react17:
    react: ^17.10.0
    react-dom: ^17.10.0
```

---

## 3. 包配置（packageConfigs）

> 新增于 v11.0.0，替代包特定的 `.npmrc` 文件。

为单个或多个工作区包设置项目特定配置。

### 映射方式
```yaml
packageConfigs:
  "project-1":
    saveExact: true
  "project-2":
    savePrefix: "~"
```

### 模式匹配方式
```yaml
packageConfigs:
  - match: ["project-1", "project-2"]
    modulesDir: "node_modules"
    saveExact: true
```

---

## 4. 依赖解析配置

### overrides
覆盖依赖图中的任何依赖（包括对等依赖），只能在根项目中设置。

```yaml
overrides:
  "foo": "^1.0.0"
  "quux": "npm:@myorg/quux@^1.0.0"
  "bar@^2.1.0": "3.0.0"
  "qar@1>zoo": "2"        # 只覆盖 qar@1 的 zoo 依赖
  "foo@1.0.0>bar": "-"    # 移除 foo@1.0.0 的 bar 依赖
```

#### 收敛覆盖（Convergence overrides，v11.13.0+）
使用空范围 `"pkg@"` 进行收敛覆盖，仅当版本满足范围时才重写依赖边。

```yaml
overrides:
  "form-data@": 4.0.6
```

### packageExtensions
扩展第三方包的定义，添加缺失的依赖或对等依赖。

```yaml
packageExtensions:
  react-redux:
    peerDependencies:
      react-dom: "*"
  express@1:
    optionalDependencies:
      typescript: "2"
  fork-ts-checker-webpack-plugin:
    dependencies:
      "@babel/core": "1"
    peerDependencies:
      eslint: ">= 6"
    peerDependenciesMeta:
      eslint:
        optional: true
```

### allowedDeprecatedVersions
静默特定包的弃用警告。

```yaml
allowedDeprecatedVersions:
  express: "1"
  request: "*"
```

### updateConfig
#### ignoreDependencies
指定不希望自动升级的包。

```yaml
updateConfig:
  ignoreDependencies:
    - load-json-file
    - "@babel/*"   # 支持模式匹配
```

### supportedArchitectures
指定安装可选依赖的目标架构。

```yaml
supportedArchitectures:
  os:
    - win32
    - darwin
    - current
  cpu:
    - x64
    - arm64
```

### ignoredOptionalDependencies
跳过指定的可选依赖。

```yaml
ignoredOptionalDependencies:
  - fsevents
  - "@esbuild/*"
```

### minimumReleaseAge（v10.16.0+）
延迟安装新发布的版本，降低安装被入侵包的风险。单位：分钟。

```yaml
minimumReleaseAge: 1440  # 至少等待 1 天
```

### minimumReleaseAgeExclude（v10.16.0+）
排除特定包不受 `minimumReleaseAge` 约束。

```yaml
minimumReleaseAge: 1440
minimumReleaseAgeExclude:
  - webpack
  - react
  - "@myorg/*"              # 支持模式
  - nx@21.6.5               # 支持特定版本
```

### minimumReleaseAgeIgnoreMissingTime（v11.0.0+）
当注册表元数据缺少 `time` 字段时，是否跳过检查。

```yaml
minimumReleaseAgeIgnoreMissingTime: false
```

### minimumReleaseAgeStrict（v11.0.0+）
当没有版本满足 `minimumReleaseAge` 约束时，是否失败。

```yaml
minimumReleaseAgeStrict: true
```

### trustPolicy（v10.21.0+）
供应链信任策略。

```yaml
trustPolicy: no-downgrade  # 或 "off"
```

### trustPolicyExclude（v10.22.0+）
排除特定包不受信任策略检查。

```yaml
trustPolicy: no-downgrade
trustPolicyExclude:
  - "chokidar@4.0.3"
  - "webpack@4.47.0 || 5.102.1"
```

### trustPolicyIgnoreAfter（v10.27.0+）
忽略发布时间超过指定分钟数的包的信任检查。

```yaml
trustPolicyIgnoreAfter: 525600  # 1 年（分钟）
```

### trustLockfile（v11.3.0+）
是否信任锁文件，跳过供应链验证。

```yaml
trustLockfile: false
```

### blockExoticSubdeps（v10.26.0+）
阻止传递依赖使用异源（如 git 仓库、tarball URL）。

```yaml
blockExoticSubdeps: true
```

### registries（v11.0.0+）
为作用域包配置注册表。

```yaml
registries:
  default: https://registry.npmjs.org/
  "@my-org": https://private.example.com/
  "@internal": https://nexus.corp.com/
```

### namedRegistries（v11.1.0+）
定义命名注册表别名。

```yaml
namedRegistries:
  gh: https://npm.pkg.github.example.com/
  work: https://npm.work.example.com/
```

---

## 5. 依赖提升配置

### hoist
是否将依赖提升到 `node_modules/.pnpm/node_modules`。

```yaml
hoist: true  # 默认
```

### hoistWorkspacePackages
是否将工作区包符号链接到提升目录。

```yaml
hoistWorkspacePackages: true  # 默认
```

### hoistPattern
指定哪些包应被提升。

```yaml
hoistPattern:
  - "*eslint*"
  - "*babel*"
  - "!@types/react"   # 排除特定包
```

### publicHoistPattern
将匹配的包提升到根 `node_modules` 目录（而非虚拟存储）。

```yaml
publicHoistPattern:
  - "*plugin*"
```

### shamefullyHoist
完全扁平化 `node_modules`，类似 npm 布局。

```yaml
shamefullyHoist: false  # 默认
```

### hoistingLimits（v11.5.0+）
控制依赖提升范围。

```yaml
hoistingLimits: none  # 可选：none、workspaces、dependencies
```

---

## 6. node_modules 设置

### modulesDir
依赖安装目录。

```yaml
modulesDir: node_modules  # 默认
```

### nodeLinker
链接策略。

```yaml
nodeLinker: isolated  # 可选：isolated、hoisted、pnp
```

### nodeExperimentalPackageMap（v11.8.0+）
是否注入 `node_modules/.package-map.json`。

```yaml
nodeExperimentalPackageMap: true
```

### nodePackageMapType（v11.8.0+）
控制包映射生成方式。

```yaml
nodePackageMapType: standard  # 可选：standard、loose
```

### symlink
是否创建符号链接。

```yaml
symlink: true  # 默认
```

### enableModulesDir
是否写入模块目录。

```yaml
enableModulesDir: true  # 默认
```

### virtualStoreDir
虚拟存储目录。

```yaml
virtualStoreDir: node_modules/.pnpm  # 默认
```

### virtualStoreDirMaxLength
虚拟存储中目录名最大长度。

```yaml
virtualStoreDirMaxLength: 120  # Linux/macOS 默认，Windows 默认 60
```

### virtualStoreOnly（v11.0.0+）
仅填充虚拟存储，不创建符号链接。

```yaml
virtualStoreOnly: false  # 默认
```

### packageImportMethod
控制包从存储导入的方式。

```yaml
packageImportMethod: auto  # 可选：auto、hardlink、copy、clone、clone-or-copy
```

### modulesCacheMaxAge
模块缓存保留时间（分钟）。

```yaml
modulesCacheMaxAge: 10080  # 默认 7 天
```

### dlxCacheMaxAge
`pnpm dlx` 缓存过期时间（分钟）。

```yaml
dlxCacheMaxAge: 1440  # 默认 1 天
```

### enableGlobalVirtualStore（v10.12.1+）
启用全局虚拟存储。

```yaml
enableGlobalVirtualStore: false  # 默认
```

---

## 7. 存储设置

### storeDir
内容寻址存储位置。

```yaml
# 默认路径因系统而异
# Windows: ~/AppData/Local/pnpm/store
# macOS: ~/Library/pnpm/store
# Linux: ~/.local/share/pnpm/store
```

### verifyStoreIntegrity
是否验证存储完整性。

```yaml
verifyStoreIntegrity: true  # 默认
```

### strictStorePkgContentCheck
是否严格检查存储中包的内容。

```yaml
strictStorePkgContentCheck: true  # 默认
```

### frozenStore（v11.7.0+）
是否允许对只读存储运行安装。

```yaml
frozenStore: false  # 默认
```

---

## 8. 网络设置

### httpsProxy
HTTPS 代理。

```yaml
httpsProxy: "https://user:pass@proxy:1234"
```

### httpProxy
HTTP 代理。

```yaml
httpProxy: "http://proxy:8080"
```

### noProxy
不使用代理的域名。

```yaml
noProxy: "localhost,127.0.0.1,.corp.com"
```

### localAddress
本地网络接口 IP。

```yaml
localAddress: "192.168.1.100"
```

### strictSsl
是否验证 SSL 证书。

```yaml
strictSsl: true  # 默认
```

---

## 9. 锁文件设置

### lockfile
是否读取/生成锁文件。

```yaml
lockfile: true  # 默认
```

### preferFrozenLockfile
是否优先使用冻结锁文件。

```yaml
preferFrozenLockfile: true  # 默认
```

### lockfileIncludeTarballUrl
是否在锁文件中包含 tarball 完整 URL。

```yaml
lockfileIncludeTarballUrl: false  # 默认
```

### gitBranchLockfile
是否按分支生成锁文件。

```yaml
gitBranchLockfile: false  # 默认
```

### mergeGitBranchLockfilesBranchPattern
自动合并分支锁文件的分支模式。

```yaml
mergeGitBranchLockfilesBranchPattern:
  - main
  - "release*"
```

### peersSuffixMaxLength
锁文件中对等依赖后缀最大长度。

```yaml
peersSuffixMaxLength: 1000  # 默认
```

---

## 10. 请求设置

### gitShallowHosts
使用浅克隆的 Git 主机。

```yaml
gitShallowHosts:
  - github.com
  - gist.github.com
  - gitlab.com
  - bitbucket.com
  - bitbucket.org
```

### networkConcurrency
最大并发 HTTP 请求数。

```yaml
networkConcurrency: 16  # 默认自动计算
```

### fetchRetries
注册表请求失败重试次数。

```yaml
fetchRetries: 2  # 默认
```

### fetchTimeout
HTTP 请求超时时间（毫秒）。

```yaml
fetchTimeout: 60000  # 默认 1 分钟
```

---

## 11. 对等依赖设置

### autoInstallPeers
自动安装缺失的对等依赖。

```yaml
autoInstallPeers: true  # 默认
```

### dedupePeerDependents
对具有相同对等依赖的包进行去重。

```yaml
dedupePeerDependents: true  # 默认
```

### dedupePeers（v10.33.0+）
简化对等依赖后缀格式。

```yaml
dedupePeers: false  # 默认
```

### strictPeerDependencies
是否严格检查对等依赖。

```yaml
strictPeerDependencies: false  # 默认
```

### resolvePeersFromWorkspaceRoot
是否从工作区根解析对等依赖。

```yaml
resolvePeersFromWorkspaceRoot: true  # 默认
```

### peerDependencyRules
自定义对等依赖规则。

```yaml
peerDependencyRules:
  ignoreMissing:
    - react
    - "@babel/*"
  allowedVersions:
    react: "17"
```

---

## 12. 其他设置

### neverBuiltDependencies
禁止运行安装脚本的包。

```yaml
neverBuiltDependencies:
  - fsevents
  - "@esbuild/*"
```

### onlyBuiltDependencies
只允许指定包运行安装脚本。

```yaml
onlyBuiltDependencies:
  - fsevents
  - nx@21.6.4 || 21.6.5
```

### onlyBuiltDependenciesFile
指定包含允许运行脚本的包列表的 JSON 文件。

```yaml
onlyBuiltDependenciesFile: ./allowed-scripts.json
```

### patchedDependencies
定义包补丁。

```yaml
patchedDependencies:
  "express@4.18.2": "patches/express@4.18.2.patch"
```

### allowNonAppliedPatches
是否允许未应用的补丁。

```yaml
allowNonAppliedPatches: false  # 默认
```

### pnpmVersion
指定项目使用的 pnpm 版本。

```yaml
pnpmVersion: 9.0.0
```

### packageManager
指定包管理器（通常在 `package.json` 中设置）。

---

## 完整示例

```yaml
# 工作区包定义
packages:
  - "packages/*"
  - "apps/*"
  - "libs/*"
  - "!**/test/**"

# 依赖版本目录
catalog:
  react: ^19.0.0
  react-dom: ^19.0.0
  typescript: ^5.3.0

catalogs:
  react18:
    react: ^18.2.0
    react-dom: ^18.2.0

# 包特定配置
packageConfigs:
  "ui-lib":
    saveExact: true
  "web-app":
    savePrefix: "~"

# 依赖覆盖
overrides:
  lodash: "^4.17.21"
  "react-dom>react": "18.2.0"

# 对等依赖规则
peerDependencyRules:
  ignoreMissing:
    - "@babel/*"

# 存储设置
hoistPattern:
  - "*eslint*"
  - "*babel*"
publicHoistPattern:
  - "*plugin*"

# 网络设置
httpsProxy: "${HTTPS_PROXY}"

# 锁文件设置
lockfile: true
preferFrozenLockfile: true
```

---

> 参考：[pnpm 官方文档](https://pnpm.io/pnpm-workspace_yaml)（v11.x）