---
name: impl-explorer
description: 探索分析业内某种业务/功能的实现方案。收到"分析业内方案""分析XX的实现方式""业界有哪些方案""调研XX的业内实现""XX怎么实现""XX有哪些方案"时，必须使用此 skill 来调研业界方案并生成项目。生成前会先询问用户要分析什么技术方案，以及选择生成哪种类型的项目（原生/Vue/React/任意组合）。注意：即使用户只是简单询问"XX是怎么做的"，也要主动触发此 skill 来调研和生成演示项目。
argument-hint: [方案名称]
---

# 行业方案探索器

此 skill 负责调研业界某种功能的主流实现方式，并按用户选择的模板生成完整的演示项目。每种实现方式放在一个独立文件中。

## 输入参数

- `$ARGUMENTS`：可选，方案名称（如 `解析md文档格式并进行展示`）
- 如果 `$ARGUMENTS` 为空，先询问用户要分析什么技术方案

## 工作流程概览

1. 询问用户：要对什么技术方案进行处理
2. 询问用户：生成哪种类型的项目（原生 / Vue / React / 原生+Vue / 原生+React / Vue+React / 原生+Vue+React）
3. 调研业界实现方案
4. 按选择的类型生成对应的演示项目到桌面

## 模板参考

用户桌面有两个参考模板项目，生成前先阅读它们以理解结构和风格：

- **原生模板**: `C:\Users\Bydyz\Desktop\md-parser-demo`
- **Vue 模板**: `C:\Users\Bydyz\Desktop\vue-md-parser-demo`
- **React 模板**：没有现成模板，采用与 Vue 模板相对应的结构（见下方 React 模板结构）

### 原生模板结构

```
{project-name}-demo/
├── index.html              # 包含导航链接栏、<main id="content"> 容器
├── vite.config.js          # Vite 配置（如有 polyfill 需求则配置）
├── package.json            # scripts: dev/build/preview, type: module
├── README.md               # 方案文档说明
└── src/
    ├── main.js             # Hash 路由，导入所有页面函数并注册路由
    ├── style.css           # 全局样式（暗色导航栏、卡片、代码块等风格一致）
    ├── sample.md           # 示例数据（对应业务场景的示例内容）
    └── pages/
        ├── home.js         # 首页：工具概述 + 示例预览
        ├── approach1.js    # 每种实现方式一个文件，导出 renderXxx(el, data) 函数
        ├── approach2.js
        └── ...
```

**关键模式**：
- `index.html`：导航链接用 `<a href="#/path">`，内容渲染到 `<main id="content">`
- `main.js`：导入所有页面的 `renderXxx` 函数，注册到 `routes` 对象，监听 `hashchange` 事件
- 每个页面文件导出 `export function renderXxx(el, data)`，直接操作 `el.innerHTML`
- 使用 `?raw` 后缀导入文本文件（如 `import sample from './sample.md?raw'`）
- UI 风格：暗色导航栏、白色卡片、代码块暗色背景、grid-2 双栏布局

### Vue 模板结构

```
vue-{project-name}-demo/
├── index.html              # 仅 <div id="app"></div>
├── vite.config.js          # 引入 @vitejs/plugin-vue
├── package.json            # vue + 相关依赖
├── .gitignore              # 同原生模板
├── src/
    ├── main.js             # createApp(App).mount('#app')
    ├── App.vue             # 导航按钮 + v-if 切换各组件
    ├── style.css           # 全局样式（与原生风格一致，但使用 :where() 限定作用域）
    ├── init-lib.js         # 如有库的自定义配置（如 marked 初始化）可放此文件
    ├── sample.md           # 示例数据
    └── components/
        ├── HomePage.vue           # 首页：概览 + 方案对比表
        ├── Approach1Demo.vue      # 每种方式一个 .vue 组件
        ├── Approach2Demo.vue
        └── ...
```

**关键模式**：
- `App.vue`：用 `v-for` 遍历 tabs 渲染按钮，`v-if` 条件渲染当前组件
- 每个组件通过 `defineProps({ md: String })` 接收数据（或其他同类型 prop）
- 用 `<script setup>` 组合式 API
- 组件内使用 `ref`/`computed` 管理状态
- UI 风格与原生保持一致，但添加 `:where()` 限定符避免样式覆盖

### React 模板结构

```
react-{project-name}-demo/
├── index.html              # 仅 <div id="root"></div>
├── vite.config.js          # 引入 @vitejs/plugin-react
├── package.json            # react + react-dom + 相关依赖
├── .gitignore              # 同原生模板
├── src/
    ├── main.jsx            # createRoot(document.getElementById('root')).render(<App />)
    ├── App.jsx             # tab 切换 + 条件渲染各组件
    ├── App.css             # 全局样式（与原生风格一致，但限于 #root 内）
    ├── init-lib.js         # 如有库的自定义配置可放此文件
    ├── sample.md           # 示例数据
    └── components/
        ├── HomePage.jsx           # 首页：概览 + 方案对比表
        ├── Approach1Demo.jsx      # 每种方式一个组件
        ├── Approach2Demo.jsx
        └── ...
```

**关键模式**：
- `App.jsx`：用 `useState` 管理当前 tab，条件渲染 `{currentTab === '/xxx' && <XxxDemo />}`
- 每个组件通过 props 接收数据：`function XxxDemo({ md })`
- 使用函数组件 + Hooks
- UI 风格与原生保持一致，类名使用原生模板中的样式规则

## 执行步骤

### Step 1: 确定方案名称

如果 `$ARGUMENTS` 已有值，直接使用。
如果为空，询问用户：**"要对什么技术方案进行探索？"**

示例对话：
```
用户: 分析业内方案
助手: 要对什么技术方案进行探索？
用户: 解析md文档格式并进行展示
```

### Step 2: 选择项目类型

使用 AskUserQuestion 让用户选择生成哪类项目：

```
请问要生成哪种类型的演示项目？

A) 原生 JS（Vite + 原生 JS）
B) Vue 3（Vite + Vue 3）
C) React（Vite + React）
D) 原生 + Vue（同时生成 A 和 B）
E) 原生 + React（同时生成 A 和 C）
F) Vue + React（同时生成 B 和 C）
G) 原生 + Vue + React（同时生成 A、B、C）
```

根据用户的选择，确定要生成的项目类型列表。

### Step 3: 评估是否需要调研

根据方案名称判断：
- 如果是常见的/你已熟悉的方案（如 CSV 解析、日期格式化等），可以直接跳到 Step 5
- 如果是你不熟悉或者有多种实现的方案，执行 Step 4

### Step 4: 调研业界实现方案

使用 WebSearch 搜索该业务功能的业界实现方式。搜索示例：
- `JS {功能名称} 库 方案 实现`
- `{功能名称} npm library`
- `javascript {功能名称} implementation approaches`

调研后整理出 3-6 种主流实现方式/库，简要说明每种的特点。

### Step 5: 阅读对应模板项目

根据 Step 2 中选择的项目类型，阅读对应的模板文件以理解结构和代码风格：

**如果选择了原生**，阅读 `C:\Users\Bydyz\Desktop\md-parser-demo` 中的：
- `src/main.js`、`src/pages/home.js`、`src/pages/remark.js`
- `package.json`、`vite.config.js`、`src/style.css`、`index.html`

**如果选择了 Vue**，阅读 `C:\Users\Bydyz\Desktop\vue-md-parser-demo` 中的：
- `src/main.js`、`src/App.vue`、`src/components/HomePage.vue`、`src/components/RemarkDemo.vue`
- `package.json`、`vite.config.js`、`src/style.css`、`index.html`

**如果选择了 React**，参考上述 Vue 模板的结构对应生成（使用 JSX + React 写法替代 Vue 的 template+SFC）。

### Step 6: 确定项目名称

根据方案名称生成 kebab-case 英文项目名。例如：
- "解析md文档格式并进行展示" → `md-parser`
- "实现拖拽上传功能" → `drag-upload`
- "图表数据可视化" → `chart-visualization`

项目目录命名规则：
| 类型 | 目录名 |
|------|--------|
| 原生 | `{project-name}-demo` |
| Vue | `vue-{project-name}-demo` |
| React | `react-{project-name}-demo` |

### Step 7: 生成项目（使用子 Agent 并行生成）

按 Step 2 选择的类型，**每种类型开启一个子 Agent** 来并行生成对应的演示项目。主 Agent 负责分别提交子任务，并收集每个子 Agent 的执行结果，统计哪些项目成功/失败。

**子 Agent 任务分配规则**：
- 选择了几种类型，就开启几个子 Agent
- 每个子 Agent 只负责生成一个类型的项目（不跨类型）
- 每个子 Agent 需要阅读对应的模板项目（子 Agent 自身的上下文不受影响）
- 子 Agent 完成生成后，需要返回：项目目录名、是否成功、失败原因（如有）

**主 Agent 工作**：
1. 创建子 Agent 任务列表（每个类型一个）
2. 提交所有子 Agent 任务
3. 收集每个子 Agent 的返回结果
4. 统计成功率：告知用户哪些项目生成成功、哪些失败、失败原因

**子 Agent Prompt 模板**（每个子 Agent 需包含以下信息）：

```
你的任务是生成一个 {类型} 演示项目到桌面。项目主题是：{方案名称}。
实现方案如下（共 N 种）：
1. {方案1: 方案名+说明}
2. {方案2: 方案名+说明}
...

请先阅读桌面对应模板 {模板路径} 中的关键文件，然后按模板结构生成项目。
项目目录名为 {项目目录名}，生成到桌面。
生成完成后执行 npm install，并确认项目能正常运行。

生成完成后，请返回：项目目录名、是否成功、失败原因（如有）。
```

#### 原生项目生成

在桌面创建 `{project-name}-demo/` 目录，按原生模板结构生成全部文件：

1. 创建 `.gitignore`（复制模板内容）
2. 创建 `index.html`：导航栏包含所有方案的链接和首页
3. 创建 `vite.config.js`：根据需要配置 Vite（如有 polyfill 需求）
4. 创建 `package.json`：根据调研结果列出所需依赖
5. 创建 `src/style.css`：保持与模板一致的视觉风格
6. 创建 `src/sample.md`（或同类型示例数据）：与业务场景匹配的真实示例
7. 创建 `src/main.js`：hash 路由 + 导入所有页面
8. 为每种实现方式创建 `src/pages/xxx.js`
9. 创建 `README.md`：方案总结文档

**页面文件命名规范**：使用英文小写 + 连字符，如 `marked.js`、`gray-matter.js`

**页面文件模板**：
```js
import { xxx } from 'xxx'

export function renderXxx(el, data) {
  el.innerHTML = `
    <div class="card">
      <h1>方案名称</h1>
      <p><span class="tag">标签名</span>方案说明文字</p>
    </div>
    <div class="card">
      <h2>实现效果</h2>
    </div>
  `
}
```

#### Vue 项目生成

在桌面创建 `vue-{project-name}-demo/` 目录，按 Vue 模板结构生成全部文件：

1. 创建 `.gitignore`
2. 创建 `index.html`：仅 `<div id="app"></div>` + 模块 script
3. 创建 `vite.config.js`：引入 `@vitejs/plugin-vue`
4. 创建 `package.json`：Vue + 各方案所需依赖
5. 创建 `src/style.css`：全局样式（使用 `:where()` 限定）
6. 创建 `src/sample.md`：相同的示例数据
7. 创建 `src/main.js`：`createApp(App).mount('#app')`
8. 创建 `src/App.vue`：tab 导航 + v-if 切换组件
9. 为每种实现方式创建 `src/components/XxxDemo.vue`

**组件文件模板**：
```vue
<template>
  <div>
    <div class="card">
      <h1>方案名称</h1>
      <p><span class="tag">标签名</span>方案说明</p>
    </div>
    <div class="card">
      <h2>实现效果</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ md: String })
</script>
```

#### React 项目生成

在桌面创建 `react-{project-name}-demo/` 目录，按 React 模板结构生成全部文件：

1. 创建 `.gitignore`
2. 创建 `index.html`：仅 `<div id="root"></div>`
3. 创建 `vite.config.js`：引入 `@vitejs/plugin-react`
4. 创建 `package.json`：react + react-dom + 各方案所需依赖
5. 创建 `src/App.css`：全局样式（与原生风格一致但避开标签选择器）
6. 创建 `src/sample.md`：相同的示例数据
7. 创建 `src/main.jsx`：`createRoot(document.getElementById('root')).render(<App />)`
8. 创建 `src/App.jsx`：useState 管理 tab + 条件渲染各组件
9. 为每种实现方式创建 `src/components/XxxDemo.jsx`

**组件文件模板**：
```jsx
import { useState } from 'react'

export function ApproachDemo({ md }) {
  return (
    <div className="card">
      <h1>方案名称</h1>
      <p><span className="tag">标签名</span>方案说明</p>
    </div>
  )
}
```

**React App.jsx 模板**：
```jsx
import { useState } from 'react'
import sampleMd from './sample.md?raw'
import './App.css'
import HomePage from './components/HomePage'
import Approach1Demo from './components/Approach1Demo'

const tabs = [
  { path: '/', label: '首页' },
  { path: '/approach1', label: '方案一' },
]

function App() {
  const [currentTab, setCurrentTab] = useState('/')

  return (
    <div>
      <nav className="nav-bar">
        {tabs.map(tab => (
          <button
            key={tab.path}
            className={`nav-link ${currentTab === tab.path ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main id="content">
        {currentTab === '/' && <HomePage md={sampleMd} />}
        {currentTab === '/approach1' && <Approach1Demo md={sampleMd} />}
      </main>
    </div>
  )
}

export default App
```

### Step 8: 安装依赖

在生成的每个项目的根目录下运行：
```bash
cd C:\Users\Bydyz\Desktop\{项目目录名} && npm install
```

### Step 9: 呈现结果

告知用户：
- 生成了哪些项目及其路径
- 每个项目包含哪些方案
- 各方案的对比总结
- 启动命令：`npm run dev`

## 注意事项

- 对于简单的功能（如仅 1-2 种方案），仍然保持完整的项目结构
- 如果某个方案无法正常输出调试信息，提供一个简化版至少能展示其 API
- `package.json` 中的依赖版本使用最新稳定版
- 确保 `sample.md`（或示例数据）覆盖该业务场景的典型用例
- 不在代码中添加额外的中文注释
- 每个文件保持职责单一，不把多个方案的代码放在同一个文件中
