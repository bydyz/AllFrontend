# .npmrc 配置文件详解

## 文件概述

`.npmrc` 是 npm 的配置文件，用于设置 npm 的各种行为参数。npm 会从多个位置读取配置，按优先级从高到低依次为：

1. **命令行参数** - 最高优先级
2. **环境变量** - 以 `npm_config_` 开头
3. **项目配置文件** - 项目根目录的 `.npmrc`
4. **用户配置文件** - `~/.npmrc`
5. **全局配置文件** - `$PREFIX/etc/npmrc`
6. **npm 内置配置文件** - npm 安装目录下的 `npmrc`

## 文件格式

```ini
; 注释以分号或井号开头
# 这也是注释

; 键值对格式
key = value

; 环境变量替换
registry = ${NPM_REGISTRY_URL}

; 可选环境变量（未定义时使用空字符串）
registry = ${NPM_REGISTRY_URL:-https://registry.npmjs.org/}

; 数组值
ca[] = "cert1"
ca[] = "cert2"

; 作用域注册表配置
@myorg:registry = https://registry.myorg.com/
//registry.npmjs.org/:_authToken = ${NPM_TOKEN}
```

## 常用配置项

### 注册表与网络

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `registry` | npm 包注册表 URL | `https://registry.npmjs.org/` |
| `proxy` | HTTP 代理地址 | `null` |
| `https-proxy` | HTTPS 代理地址 | `null` |
| `noproxy` | 不使用代理的域名列表 | `null` |
| `fetch-timeout` | HTTP 请求超时时间（毫秒） | `300000` (5分钟) |
| `fetch-retries` | 网络失败重试次数 | `2` |
| `fetch-retry-mintimeout` | 重试最小超时时间 | `10000` (10秒) |
| `fetch-retry-maxtimeout` | 重试最大超时时间 | `60000` (1分钟) |
| `maxsockets` | 最大并发连接数 | `50` |

### 认证配置

| 配置项 | 说明 |
|--------|------|
| `_auth` | Base64 编码的认证字符串 |
| `_authToken` | 认证令牌 |
| `username` | 用户名 |
| `_password` | 密码 |
| `email` | 邮箱地址 |
| `auth-type` | 认证类型：`web` 或 `legacy` |

**作用域认证示例：**
```ini
//registry.npmjs.org/:_authToken = ${NPM_TOKEN}
//npm.pkg.github.com/:_authToken = ${GITHUB_TOKEN}
@myorg:registry = https://npm.pkg.github.com/
```

### SSL/TLS

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `strict-ssl` | 是否严格验证 SSL 证书 | `true` |
| `ca` | 证书颁发机构证书 | `null` |
| `cafile` | CA 证书文件路径 | `null` |
| `cert` | 客户端证书 | `null` |
| `certfile` | 客户端证书文件路径 | `null` |
| `key` | 客户端私钥 | `null` |
| `keyfile` | 客户端私钥文件路径 | `null` |

### 安装行为

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `save` | 自动保存到 `package.json` | `true` |
| `save-exact` | 精确版本号（不带 `^` `~`） | `false` |
| `save-prefix` | 版本号前缀 | `^` |
| `save-dev` | 保存到 `devDependencies` | `false` |
| `save-optional` | 保存到 `optionalDependencies` | `false` |
| `save-peer` | 保存到 `peerDependencies` | `false` |
| `save-prod` | 保存到 `dependencies` | `false` |
| `save-bundle` | 保存到 `bundleDependencies` | `false` |
| `package-lock` | 是否生成 `package-lock.json` | `true` |
| `prefer-offline` | 优先使用缓存 | `false` |
| `prefer-online` | 优先使用网络 | `false` |
| `offline` | 离线模式 | `false` |
| `ignore-scripts` | 忽略脚本执行 | `false` |
| `legacy-peer-deps` | 兼容旧版 peerDependencies 行为 | `false` |
| `strict-peer-deps` | 严格检查 peerDependencies | `false` |
| `install-strategy` | 安装策略：`hoisted`/`nested`/`shallow`/`linked` | `hoisted` |
| `engine-strict` | 严格检查 Node.js 版本 | `false` |
| `force` | 强制安装 | `false` |

### 工作区（Workspaces）

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `workspaces` | 启用工作区模式 | `false` |
| `workspace` | 指定工作区 | - |
| `include-workspace-root` | 包含工作区根目录 | `false` |
| `workspaces-update` | 更新工作区依赖 | `true` |

### 范围与访问控制

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `access` | 包访问级别：`public`/`restricted`/`private` | `public` |
| `scope` | npm 范围 | - |
| `tag` | 发布标签 | `latest` |
| `otp` | 一次性密码 | - |
| `provenance` | 生成来源证明 | `false` |

### 日志与调试

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `loglevel` | 日志级别：`silent`/`error`/`warn`/`info`/`verbose`/`silly` | `notice` |
| `logs-max` | 日志文件最大数量 | `10` |
| `logs-dir` | 日志目录 | - |
| `timing` | 显示执行时间 | `false` |
| `color` | 颜色输出 | `true` |
| `progress` | 显示进度条 | `true` |

### 缓存

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `cache` | 缓存目录 | `~/.npm` |
| `cache-max` | 缓存过期时间（秒） | `Infinity` |
| `cache-min` | 缓存最小使用时间（秒） | `10` |

### 初始化配置（npm init）

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `init-author-name` | 作者姓名 | - |
| `init-author-email` | 作者邮箱 | - |
| `init-author-url` | 作者主页 | - |
| `init-license` | 许可证 | `ISC` |
| `init-version` | 初始版本号 | `1.0.0` |
| `init-module` | 初始化模块路径 | `~/.npm-init.js` |

### Git 集成

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `git` | git 命令路径 | `git` |
| `git-tag-version` | 版本更新时创建 tag | `true` |
| `sign-git-tag` | 签名 git tag | `false` |
| `sign-git-commit` | 签名 git commit | `false` |
| `commit-hooks` | 执行 git commit hooks | `true` |

### 发布配置

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `dry-run` | 模拟运行 | `false` |
| `pack-destination` | 打包输出目录 | `.` |
| `json` | JSON 格式输出 | `false` |
| `long` | 显示详细信息 | `false` |
| `parseable` | 可解析输出 | `false` |

### 脚本执行

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `foreground-scripts` | 前台执行脚本 | `false` |
| `allow-scripts` | 允许执行脚本的包 | - |
| `script-shell` | 脚本执行 shell | `/bin/sh` |
| `dangerously-allow-all-scripts` | 允许所有脚本执行 | `false` |

### 其他

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `global` | 全局安装模式 | `false` |
| `prefix` | 安装前缀目录 | - |
| `bin-links` | 创建可执行文件链接 | `true` |
| `fund` | 显示资助信息 | `true` |
| `audit` | 执行安全审计 | `true` |
| `audit-level` | 审计报告级别 | `null` |
| `update-notifier` | 更新通知 | `true` |
| `yes` | 自动确认 | `false` |
| `browser` | 浏览器命令 | 系统默认 |
| `editor` | 编辑器命令 | 系统默认 |

## 完整示例

```ini
# 注册表配置
registry = https://registry.npmjs.org/

# 私有注册表
@myorg:registry = https://npm.pkg.github.com/
@company:registry = https://npm.company.com/

# 认证令牌
//npm.pkg.github.com/:_authToken = ${GITHUB_TOKEN}
//npm.company.com/:_authToken = ${COMPANY_TOKEN}

# 代理设置
proxy = http://proxy.company.com:8080
https-proxy = http://proxy.company.com:8080
noproxy = localhost,127.0.0.1,.company.com

# SSL 配置
strict-ssl = true
cafile = /path/to/ca-certificates.crt

# 安装行为
save-exact = true
save-prefix = ~
package-lock = true
prefer-offline = false

# 工作区
workspaces = true
include-workspace-root = false

# 日志
loglevel = info
timing = true

# 初始化配置
init-author-name = Your Name
init-author-email = your@email.com
init-license = MIT
init-version = 1.0.0

# Git
git-tag-version = true
sign-git-tag = false

# 安全
audit = true
audit-level = moderate

# 缓存
cache = ~/.npm

# 性能
maxsockets = 50
fetch-timeout = 300000
```

## 作用域注册表配置

对于需要从多个注册表获取包的场景：

```ini
# 公共包使用默认注册表
registry = https://registry.npmjs.org/

# GitHub Packages
@github:registry = https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken = ${GITHUB_TOKEN}

# 私有公司注册表
@company:registry = https://npm.company.com/
//npm.company.com/:_authToken = ${COMPANY_TOKEN}
//npm.company.com/:always-auth = true
```

## 环境变量替换

`.npmrc` 支持使用环境变量：

```ini
# 基本语法
registry = ${NPM_REGISTRY_URL}

# 带默认值
registry = ${NPM_REGISTRY_URL:-https://registry.npmjs.org/}

# 认证令牌
//registry.npmjs.org/:_authToken = ${NODE_AUTH_TOKEN}
```

## 安全注意事项

1. **永远不要提交敏感信息** - `_auth`、`_authToken`、`_password` 等不应提交到版本控制
2. **使用环境变量** - 敏感信息应通过环境变量或 CI/CD secrets 注入
3. **项目级配置** - 在 `.gitignore` 中忽略包含敏感信息的 `.npmrc`
4. **作用域认证** - 确保认证信息只发送到正确的注册表

## 相关命令

```bash
# 查看当前配置
npm config list

# 查看所有配置（包括默认值）
npm config ls -l

# 查看特定配置
npm config get registry

# 设置配置
npm config set registry https://registry.npmjs.org/

# 编辑配置文件
npm config edit

# 删除配置
npm config delete registry
```

## 参考资料

- [npm 官方文档 - npmrc](https://docs.npmjs.com/cli/v11/configuring-npm/npmrc)
- [npm 官方文档 - Config](https://docs.npmjs.com/cli/v11/using-npm/config)