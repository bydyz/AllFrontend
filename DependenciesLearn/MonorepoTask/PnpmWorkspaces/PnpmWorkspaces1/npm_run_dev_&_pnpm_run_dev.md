# npm run dev 与 pnpm run dev 的区别

## 核心结论

两者在 **执行脚本层面没有本质区别**，都会执行 `package.json` 中定义的 `dev` 脚本命令。但它们在依赖解析、链接方式和执行上下文上有显著差异。

---

## 执行过程对比

### 共同点

| 步骤 | npm run dev | pnpm run dev |
|------|-----------|------------|
| 读取脚本 | 读取当前包的 package.json scripts.dev | 读取当前包的 package.json scripts.dev |
| 执行脚本 | 执行定义的 shell 命令 | 执行定义的 shell 命令 |
| 输出结果 | 在终端显示 echo 输出 | 在终端显示 echo 输出 |

### 关键差异

#### 1. 依赖解析方式

```diff
# npm - 平铺 node_modules (node_modules/node_modules/...)
- 调用 node_modules/.bin 中的可执行文件
- workspace 依赖通过符号链接指向 node_modules 中的包
- 可能存在多个相同包的副本

# pnpm - 虚拟目录结构 (.pnpm/store/)
- 调用 .pnpm/node_modules/.bin 中的可执行文件
- workspace 依赖通过 .pnpm/<package>@<version>/node_modules/<pkg> 访问
- 全局 store 保存唯一一份真实文件，通过硬链接共享
```

#### 2. Workspace 协议解析（workspace:*）

```javascript
// pnpm 对 workspace:* 的处理
{
  "@demo/ui": "workspace:*"
}

// pnpm 行为：
// - 优先使用本地 workspace 包
// - 解析为相对路径如 ../ui
// - 创建指向 packages/ui 的符号链接
```

#### 3. Pre/Post Hook 脚本

| 特性 | npm | pnpm |
|------|-----|-----|
| 自动执行 predev/postdev | 支持 | 支持 |
| 并行执行多个脚本 | 不支持 | 支持(--parallel) |

#### 4. 环境变量差异

```
npm run dev 设置：
- npm_package_name=@demo/app
- npm_package_version=1.0.0
- npm_config_* 配置

pnpm run dev 设置：
- npm_package_name=@demo/app
- npm_package_version=1.0.0
- PNPM_* 相关变量
```

---

## 对 monorepo 的影响

### 项目结构示例

```
PnpmWorkspaces1/
├── packages/
│   ├── app/       # 依赖 @demo/ui
│   │   └── package.json
│   ├── ui/        # 被依赖的包
│   │   └── package.json
│   └── utils/
└── pnpm-workspace.yaml
```

### npm 执行 dev 时

```bash
# packages/app 下执行
$ cd packages/app && npm run dev

# npm 工作流程：
# 1. 检查 @demo/ui 是否已安装在 node_modules
# 2. 如未安装，尝试从 registry 安装（失败，因为未发布）
# 3. 执行 "echo app dev"
```

### pnpm 执行 dev 时

```bash
# packages/app 下执行
$ cd packages/app && pnpm run dev

# pnpm 工作流程：
# 1. 检测 workspace:* 协议
# 2. 解析为 ../ui（相对路径）
# 3. 通过 .pnpm/node_modules/@demo/ui 链接到本地包
# 4. 执行 "echo app dev"
```

---

## 注意事项

### 为什么 npm可能有失败风险？

npm 在 workspace 模式下不会自动链接本地包，如果包未发布到私有 registry，会出现：

```
npm WARN @demo/ui is unverifiable
npm ERR! 404 Not Found: @demo/ui@*
```

而 pnpm 默认启用 workspace 协议解析，能正确识别本地包。

---

## 总结

| 对比项 | npm run dev | pnpm run dev |
|--------|-----------|--------------|
| 脚本执行 | ✅ 正常 | ✅ 正常 |
| 本地 workspace 链接 | ⚠️ 可能失败 | ✅ 可靠 |
| 依赖查找速度 | 较慢 | 较快（有 store） |
| hook 脚本 | basic | 支持 parallel |
| 推荐 | 单项目 | **monorepo 推荐** |

对于 monorepo 项目，**强烈建议使用 pnpm run dev**。