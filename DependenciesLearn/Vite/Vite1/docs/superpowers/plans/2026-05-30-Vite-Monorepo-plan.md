# Vite Monorepo 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用 pnpm workspaces 创建 Monorepo，包含简易版 my-vite 开发服务器和引用它的 vue-app

**Architecture:** Monorepo 结构 + pnpm workspaces，两个子包并列在 packages/ 目录下

**Tech Stack:** pnpm, TypeScript, esno (运行 TS), chokidar (文件监视)

---

## 文件结构预览

```
Vite1/
├── package.json              # 根 package.json
├── pnpm-workspace.yaml       # workspace 配置
├── tsconfig.json             # 根 tsconfig
└── packages/
    ├── my-vite/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       └── index.ts      # CLI 入口
    └── vue-app/
        ├── package.json
        ├── tsconfig.json
        ├── index.html
        └── src/
            ├── main.ts
            ├── App.vue
            └── components/
                └── HelloWorld.vue
```

---

## Task 1: 创建 Monorepo 基础结构

**Files:**
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\package.json`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\pnpm-workspace.yaml`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\tsconfig.json`

- [ ] **Step 1: 创建根 package.json**

```json
{
  "name": "vite-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter vue-app dev"
  }
}
```

- [ ] **Step 2: 创建 pnpm-workspace.yaml**

```yaml
packages:
  - 'packages/*'
```

- [ ] **Step 3: 创建根 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "references": [
    { "path": "./packages/my-vite" },
    { "path": "./packages/vue-app" }
  ]
}
```

---

## Task 2: 创建 my-vite 包

**Files:**
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\my-vite\package.json`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\my-vite\tsconfig.json`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\my-vite\src\index.ts`

- [ ] **Step 1: 创建 my-vite/package.json**

```json
{
  "name": "my-vite",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "type": "module",
  "bin": {
    "my-vite": "./src/index.ts"
  },
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "echo 'no build'"
  },
  "dependencies": {
    "chokidar": "^3.6.0",
    "http-server": "^14.1.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
```

- [ ] **Step 2: 创建 my-vite/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  }
}
```

- [ ] **Step 3: 创建 my-vite/src/index.ts 基础 CLI**

```typescript
#!/usr/bin/env node
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../vue-app');
const PORT = 5173;

const mimeTypes: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.ts': 'application/typescript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.vue': 'application/javascript',
};

function serveFile(res: http.ServerResponse, filePath: string) {
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  let url = req.url || '/';
  
  if (url === '/') {
    url = '/index.html';
  }
  
  const filePath = path.join(rootDir, url);
  
  if (url.startsWith('/src/') || url.endsWith('.vue') || url.endsWith('.ts')) {
    serveFile(res, filePath);
  } else if (url.startsWith('/@')) {
    const realPath = path.join(rootDir, url.replace('/@', '/src/'));
    serveFile(res, realPath);
  } else {
    serveFile(res, filePath);
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
```

- [ ] **Step 4: 测试 my-vite 基础服务**

```bash
cd E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\my-vite
pnpm install
```

Expected: 依赖安装成功

---

## Task 3: 创建 vue-app 包结构和基础文件

**Files:**
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\vue-app\package.json`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\vue-app\tsconfig.json`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\vue-app\index.html`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\vue-app\src\main.ts`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\vue-app\src\App.vue`
- Create: `E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1\packages\vue-app\src\components\HelloWorld.vue`

- [ ] **Step 1: 创建 vue-app/package.json**

```json
{
  "name": "vue-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "my-vite"
  },
  "dependencies": {
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "my-vite": "workspace:*"
  }
}
```

- [ ] **Step 2: 创建 vue-app/tsconfig.json**

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
    "outDir": "./dist"
  }
}
```

- [ ] **Step 3: 创建 vue-app/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

- [ ] **Step 4: 创建 vue-app/src/main.ts**

```typescript
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

- [ ] **Step 5: 创建 vue-app/src/App.vue**

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <HelloWorld msg="Hello from my-vite!" />
</template>

<style>
#app {
  font-family: system-ui, sans-serif;
  text-align: center;
  margin-top: 50px;
}
</style>
```

- [ ] **Step 6: 创建 vue-app/src/components/HelloWorld.vue**

```vue
<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style>
h1 {
  color: #42b983;
}
</style>
```

---

## Task 4: 安装依赖并测试

**Files:**
- Test: 运行 pnpm install 并启动服务

- [ ] **Step 1: 安装根目录依赖**

```bash
cd E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1
pnpm install
```

Expected: 所有依赖安装成功

- [ ] **Step 2: 启动 vue-app 验证服务**

```bash
cd E:\Project\AAA_All_MINE\all-frontend\DependenciesLearn\Vite\Vite1
pnpm dev
```

Expected: 服务启动在 http://localhost:5173

- [ ] **Step 3: 访问页面验证**

用浏览器打开 http://localhost:5173 应看到 "Hello from my-vite!"

---

**Plan complete.**

两个执行选项：

**1. Subagent-Driven (recommended)** - 我派发子任务代理执行每个步骤，快速迭代

**2. Inline Execution** - 在此会话中批量执行任务

你想选择哪个？