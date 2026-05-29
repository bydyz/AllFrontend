# tsconfig.json outDir 问题分析与修复

## 问题描述

在 Vite 项目的两个子模块中，`tsconfig.json` 的 `outDir` 配置出现报错：
- `packages/vue-app/tsconfig.json`
- `packages/my-vite/tsconfig.json`

## 问题分析

### 文件结构

```
Vite1/
├── tsconfig.json              # 根配置，使用 project references
├── packages/
│   ├── vue-app/tsconfig.json  # 子模块 A
│   └── my-vite/tsconfig.json # 子模块 B
```

根目录下存在 `tsconfig.json`，通过 `references` 字段引用了两个子模块：

```json
{
  "compilerOptions": { ... },
  "references": [
    { "path": "./packages/my-vite" },
    { "path": "./packages/vue-app" }
  ]
}
```

### 根本原因

这两个子模块都是 **Vite 项目**，它们的构建产物由 Vite/Rollup 控制，而不是由 TypeScript 编译器（tsc）控制。

但由于使用了 Project References 结构，TypeScript 会对引用的项目进行统一管理，这与同时设置 `outDir` 产生了冲突：

1. **项目引用模式的特性**：TypeScript 期望统一管理所有引用项目的输出目录
2. **Vite 项目的特性**：不需要 `outDir`，构建输出由 Rollup 控制
3. **两者冲突**：同时存在时导致配置冲突和报错

### 为什么 Vite 项目不需要 outDir

- Vite 使用 esbuild 进行类型检查和转译，不依赖 tsc 的输出
- Rollup 负责打包和输出，最终产物通过 `npm run build` 生成
- `outDir` 是 tsc 的配置，对 Vite 构建流程没有意义

## 处理方式

从两个子模块的 `tsconfig.json` 中移除 `outDir` 配置，让各自的构建工具自行处理输出。

### 修改前后对比

#### packages/vue-app/tsconfig.json

**修改前：**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"  // ← 移除
  }
}
```

**修改后：**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

#### packages/my-vite/tsconfig.json

**修改前：**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"  // ← 移除
  }
}
```

**修改后：**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## 总结

| 项目类型 | 是否需要 outDir | 说明 |
|---------|-----------------|------|
| 纯 TypeScript 库项目 | ✅ 需要 | 由 tsc 编译输出 |
| Vite 项目 | ❌ 不需要 | 由 Vite/Rollup 控制输出 |
| Webpack 项目 | ❌ 不需要 | 由 Webpack 控制输出 |

**核心原则**：当子模块被 Monorepo 根配置以 Project References 方式引入时，子模块的 `tsconfig.json` 不应设置 `outDir`，否则会与项目引用模��产生冲突。