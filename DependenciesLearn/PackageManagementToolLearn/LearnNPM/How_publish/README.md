# NPM 包发布完整指南

> 基于实际项目 `@avery98/vite-plugin-md2vue` 的发布经验总结

## 📋 目录

- [发布前准备](#发布前准备)
- [package.json 配置](#packagejson-配置)
- [.npmignore 配置](#npmignore-配置)
- [npm 账号设置](#npm-账号设置)
- [发布流程](#发布流程)
- [常见问题解决](#常见问题解决)
- [发布后管理](#发布后管理)

---

## 发布前准备

### 1. 项目结构检查

确保项目包含必要的文件：

```
your-package/
├── src/                    # 源代码
├── dist/                   # 构建产物（发布时需要）
├── tests/                  # 测试文件（可选）
├── examples/               # 示例项目（可选）
├── package.json            # 必须
├── README.md               # 推荐
├── LICENSE                 # 推荐
└── .gitignore
```

### 2. 构建项目

发布前确保项目已成功构建：

```bash
# 运行构建
npm run build

# 验证构建产物
ls dist/
```

### 3. 测试验证

```bash
# 运行测试
npm test

# 类型检查（TypeScript 项目）
npm run typecheck
```

---

## package.json 配置

### 基础配置

```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "description": "包的描述",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

### 完整配置示例

```json
{
  "name": "@scope/your-package",
  "version": "1.0.0",
  "description": "A brief description of your package",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest",
    "test:run": "vitest run",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "keyword1",
    "keyword2",
    "keyword3"
  ],
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo.git"
  },
  "bugs": {
    "url": "https://github.com/username/repo/issues"
  },
  "homepage": "https://github.com/username/repo#readme",
  "license": "MIT",
  "dependencies": {
    "dependency1": "^1.0.0"
  },
  "devDependencies": {
    "dev-dependency1": "^1.0.0"
  },
  "peerDependencies": {
    "peer-dep": "^1.0.0 || ^2.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 关键字段说明

| 字段 | 说明 |
|------|------|
| `name` | 包名，scoped 包使用 `@scope/package-name` |
| `version` | 语义化版本号 |
| `main` | CommonJS 入口 |
| `module` | ES Module 入口 |
| `types` | TypeScript 类型定义入口 |
| `exports` | 现代 Node.js 模块导出配置 |
| `files` | 发布时包含的文件/目录 |
| `prepublishOnly` | 发布前自动执行的脚本 |
| `peerDependencies` | 对等依赖（宿主环境需要安装） |
| `engines` | Node.js 版本要求 |

### 包名规则

1. **普通包名**：`my-package`、`my-awesome-package`
2. **Scoped 包名**：`@myorg/my-package`
   - 需要添加 `--access public` 参数发布
   - 适合个人或组织的包

### 版本号规范（语义化版本）

```
MAJOR.MINOR.PATCH

MAJOR: 不兼容的 API 修改
MINOR: 向下兼容的功能性新增
PATCH: 向下兼容的问题修正

示例：
1.0.0 → 初始版本
1.0.1 → 修复 bug
1.1.0 → 新增功能
2.0.0 → 重大更新
```

---

## .npmignore 配置

创建 `.npmignore` 文件，排除不需要发布的文件：

```gitignore
# 源代码
src/

# 测试
tests/
vitest.config.ts
*.test.ts
*.spec.ts

# 示例项目
examples/

# 配置文件
tsconfig.json
tsup.config.ts
.gitignore
.eslintrc*
.prettierrc*

# 文档（保留 README.md）
*.md
!README.md

# 开发依赖相关
node_modules/
npm-debug.log*

# 构建临时文件
*.tsbuildinfo

# 操作系统文件
.DS_Store
Thumbs.db

# 编辑器配置
.vscode/
.idea/
*.swp
*.swo

# Git 相关
.git/
.github/
```

### files vs .npmignore

- **`files` 字段**：白名单模式，只包含指定文件
- **`.npmignore`**：黑名单模式，排除指定文件

推荐使用 `files` 字段（更安全）：

```json
{
  "files": [
    "dist",
    "README.md"
  ]
}
```

---

## npm 账号设置

### 1. 注册 npm 账号

访问 https://www.npmjs.com/signup 注册账号。

### 2. 本地登录

```bash
# 登录 npm
npm login

# 验证登录状态
npm whoami
```

### 3. 两步验证（2FA）

npm 默认启用两步验证。需要创建访问令牌才能发布：

#### 方法一：网页创建令牌

1. 访问 https://www.npmjs.com/settings/tokens
2. 点击 **Generate New Token**
3. 选择 **Classic Access Token**
4. 选择 **Automation** 类型（用于自动化发布）
5. 复制生成的令牌

#### 方法二：命令行创建令牌

```bash
# 创建自动化令牌
npm token create --type=automation

# 复制生成的令牌
```

### 4. 配置令牌

```bash
# 设置访问令牌
npm config set //registry.npmjs.org/:_authToken=你的令牌

# 验证配置
npm config get //registry.npmjs.org/:_authToken
```

### 5. 安全建议

- **不要**将令牌提交到 Git 仓库
- **不要**在代码中硬编码令牌
- 使用环境变量或 `.npmrc` 文件（确保在 `.gitignore` 中）
- 定期轮换令牌

---

## 发布流程

### 1. 检查包名可用性

```bash
# 检查包名是否已存在
npm view your-package-name
```

如果包名已被占用：
- 使用 scoped 包名：`@yourname/package-name`
- 或选择其他名称

### 2. 预览发布内容

```bash
# 查看将要发布的文件
npm pack --dry-run
```

### 3. 登录验证

```bash
npm whoami
```

### 4. 发布

#### 发布普通包

```bash
npm publish
```

#### 发布 Scoped 包

```bash
# Scoped 包默认是私有的，需要添加 --access public
npm publish --access public
```

#### 发布指定标签版本

```bash
# 发布为 beta 版本
npm publish --tag beta

# 发布为 next 版本
npm publish --tag next
```

### 5. 发布成功

```
+ @scope/package@1.0.0
```

### 6. 验证发布

```bash
# 查看已发布的包
npm view @scope/package

# 访问 npm 网站
# https://www.npmjs.com/package/@scope/package
```

---

## 常见问题解决

### 问题 1：403 Forbidden - Two-factor authentication required

**原因**：npm 启用了两步验证，需要使用访问令牌。

**解决**：
```bash
# 1. 创建访问令牌
npm token create --type=automation

# 2. 设置令牌
npm config set //registry.npmjs.org/:_authToken=你的令牌

# 3. 重新发布
npm publish
```

### 问题 2：Package name already exists

**原因**：包名已被其他用户占用。

**解决**：
- 使用 scoped 包名：`@yourname/package-name`
- 或选择其他名称

### 问题 3：402 Payment Required

**原因**：npm 要求付费（对于某些功能或包大小）。

**解决**：
- 检查包大小是否超过限制
- 考虑使用 npm 付费计划

### 问题 4：Package not found after publish

**原因**：包可能还在同步中，或者使用了错误的包名。

**解决**：
```bash
# 等待几分钟后重试
npm view your-package

# 检查 registry
npm config get registry
```

### 问题 5：prepublishOnly 脚本失败

**原因**：发布前的构建脚本执行失败。

**解决**：
```bash
# 先手动运行构建
npm run build

# 确保构建成功后再发布
npm publish
```

### 问题 6：权限错误

**原因**：没有发布权限（对于 scoped 包）。

**解决**：
```bash
# 确保使用 --access public
npm publish --access public
```

---

## 发布后管理

### 版本更新

```bash
# 修改版本号
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# 发布新版本
npm publish
```

### 撤销发布

```bash
# 撤销指定版本
npm unpublish package@version

# 撤销整个包（72小时内）
npm unpublish package --force
```

### 添加发布标签

```bash
# 查看标签
npm dist-tag ls package

# 添加标签
npm dist-tag add package@version beta

# 删除标签
npm dist-tag rm package beta
```

### 查看包信息

```bash
# 查看包详情
npm view package

# 查看包版本列表
npm view package versions

# 查看包依赖
npm view package dependencies
```

---

## 实际案例：@avery98/vite-plugin-md2vue

### 项目配置

```json
{
  "name": "@avery98/vite-plugin-md2vue",
  "version": "1.0.0",
  "description": "A Vite plugin to transform Markdown files into Vue components",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "vite",
    "vite-plugin",
    "markdown",
    "vue"
  ],
  "license": "MIT",
  "dependencies": {
    "gray-matter": "^4.0.3",
    "highlight.js": "^11.9.0",
    "katex": "^0.16.9",
    "marked": "^12.0.0"
  },
  "peerDependencies": {
    "vite": "^4.0.0 || ^5.0.0"
  }
}
```

### 发布过程

```bash
# 1. 登录 npm
npm login

# 2. 创建访问令牌（如果需要）
npm token create --type=automation

# 3. 设置令牌
npm config set //registry.npmjs.org/:_authToken=你的令牌

# 4. 验证登录
npm whoami
# avery98

# 5. 发布
npm publish --access public

# 6. 发布成功
# + @avery98/vite-plugin-md2vue@1.0.0
```

### 使用方式

```bash
# 安装
npm install @avery98/vite-plugin-md2vue -D

# 或使用 yarn
yarn add @avery98/vite-plugin-md2vue -D

# 或使用 pnpm
pnpm add @avery98/vite-plugin-md2vue -D
```

---

## 发布检查清单

发布前确认以下内容：

- [ ] `package.json` 配置正确
- [ ] 包名可用（未被占用）
- [ ] 版本号已更新
- [ ] 构建成功
- [ ] 测试通过
- [ ] README.md 已更新
- [ ] LICENSE 文件存在
- [ ] `.npmignore` 配置正确
- [ ] 已登录 npm 账号
- [ ] 已设置访问令牌（如需要）
- [ ] 本地无未提交的更改

---

## 参考链接

- [npm 官方文档](https://docs.npmjs.com/)
- [npm CLI 文档](https://docs.npmjs.com/cli)
- [语义化版本](https://semver.org/)
- [npm 包发布指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

*基于 2026-07-25 实际发布经验整理*
