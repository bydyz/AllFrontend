# Vite 依赖预构建问题分析

## 报错信息

```
Uncaught TypeError: Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".
```

## 问题分析

### 环境背景

本项目是一个 Vite 学习项目，使用了 monorepo 结构：
- `packages/vue-app` - Vue 应用（入口）
- `packages/my-vite` - 自定义的简化 Vite 开发服务器

### 错误原因

#### 1. 自定义 my-vite 未实现模块解析

查看 `packages/my-vite/src/index.ts` 的关键代码：

```typescript
function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  let url = req.url || '/';

  if (url === '/') {
    url = '/index.html';
  }

  const filePath = path.join(rootDir, url);

  if (url.startsWith('/src/') || url.endsWith('.vue') || url.endsWith('.ts')) {
    serveFile(res, filePath);
  }
  // ... 仅做静态文件服务，没有模块解析逻辑
}
```

这只实现了**静态文件服务**，没有处理以下内容：
- 裸模块说明符（bare module specifier）的解析
- 依赖预构建（Dependency Pre-Bundling）
- 模块热替换（HMR）

#### 2. 浏览器不支持裸导入

`main.ts` 中的代码：

```typescript
import { createApp } from 'vue';  // 裸模块说明符
import App from './App.vue';      // 相对路径
```

浏览器在解析 ES Module 时：
- **支持**：相对路径（`./xxx`、`../xxx`）或绝对路径（`/xxx`）
- **不支持**：裸模块说明符（如 `'vue'`、`lodash`）

#### 3. Vite 的核心能力

真正的 Vite 在开发模式下会：
1. **依赖预构建**：扫描源码中的 import 语句，将裸模块说明符转换为 node_modules 中的实际文件路径
2. **重写 import**：将 `import { createApp } from 'vue'` 转换为 `import { createApp } from '/node_modules/vue/dist/vue.esm-bundler.js'`
3. **按需加载**：仅加载当前页面需要的代码

### 处理方案

使用真正的 Vite 替换自定义简化服务器：

#### 1. 更新 package.json

```diff
- "dev": "my-vite"
+ "dev": "vite"

  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
-   "my-vite": "workspace:*"
+   "vite": "^5.4.0"
  }
```

#### 2. 新增 vite.config.js

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
```

#### 3. 修改 index.html 中的路径

```diff
- <script type="module" src="/src/main.ts"></script>
+ <script type="module" src="./src/main.ts"></script>
```

## 执行步骤

1. 安装依赖：`pnpm install`
2. 启动开发服务器：`pnpm dev`
3. 访问 `http://localhost:5173`

## 扩展阅读

### 为什么要预构建？

- **性能**：将多个小模块合并为单个大文件，减少 HTTP 请求数
- **兼容性**：将 CommonJS 模块转换为 ESM
- **路径解析**：处理裸模块说明符到文件路径的映射

### my-vite 可以做什么改进？

如果想继续使用自定义服务器，可以参考 Vite 的实现：
1. 使用 esbuild 进行模块扫描和转换
2. 维护一个模块映射表缓存
3. 实现 HMR WebSocket 通信