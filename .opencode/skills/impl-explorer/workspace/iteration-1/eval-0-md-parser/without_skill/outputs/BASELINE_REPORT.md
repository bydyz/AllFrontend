# 基线测试报告 (without_skill)
# md-parser 任务

## 1. 技术调研：业界 Markdown 解析方案

### 主流方案

| 方案 | 类型 | 体积 | 性能 | 插件生态 | 适用场景 |
|------|------|------|------|----------|----------|
| **marked** | 编译器 | ~20KB | 最快 | 有限 | 快速渲染/零配置 |
| **markdown-it** | 插件化解析器 | ~50KB | 快 | 最丰富(emoji/TOC/数学) | 需要丰富功能 |
| **remark/rehype** | AST 处理器 | ~100KB | 中等 | 丰富(unified 生态) | 需要操作 AST/MDX |
| **showdown** | 编译器 | ~40KB | 中等 | 有限 | 简单场景 |
| **micromark** | tokenizer | 极轻 | 最快 | 无(底层库) | 自定义解析器 |

### 代码高亮方案

| 方案 | 语言支持 | 体积 |
|------|----------|------|
| **highlight.js** | 197+ | ~50KB(gzip) |
| **Prism.js** | 200+ | ~30KB(gzip) |
| **Shiki** | 200+ | ~100KB |

### 本测试选用方案
- **marked** + **marked-highlight** + **highlight.js**
- 理由：marked 最轻量快速，marked-highlight 是官方推荐的 hljs 集成方式

---

## 2. 项目文件清单

### md-parser-demo (原生 JS)

| 文件 | 说明 |
|------|------|
| package.json | 项目配置 |
| index.html | HTML 入口 |
| vite.config.js | Vite 配置 |
| src/main.js | 应用入口 |
| src/style.css | 全局样式(含 preview 样式) |
| src/pages/md-parser.js | **核心文件** - 编辑器 + marked 解析 + 渲染 |
| README.md | 项目说明 |

### vue-md-parser-demo (Vue 3)

| 文件 | 说明 |
|------|------|
| package.json | 项目配置 |
| index.html | HTML 入口 |
| vite.config.js | Vite 配置 |
| src/main.js | 应用入口 |
| src/App.vue | 根组件 |
| src/components/MdParserDemo.vue | **核心文件** - SFC 组件含模板/脚本/样式 |
| README.md | 项目说明 |

---

## 3. package.json 内容

### md-parser-demo/package.json
\\\json
{
  "name": "md-parser-demo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "highlight.js": "^11.11.0",
    "marked": "^15.0.0",
    "marked-highlight": "^2.2.1"
  },
  "devDependencies": {
    "vite": "^6.0.0"
  }
}
\\\

### vue-md-parser-demo/package.json
\\\json
{
  "name": "vue-md-parser-demo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "highlight.js": "^11.11.0",
    "marked": "^15.0.0",
    "marked-highlight": "^2.2.1",
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "vite": "^6.0.0"
  }
}
\\\

---

## 4. npm install 执行结果

### md-parser-demo (原生 JS)
总计安装 66 个包，5 个寻求赞助。
\\\
added 66 packages in 2s
5 packages are looking for funding
\\\

### vue-md-parser-demo (Vue 3)
总计安装 86 个包，6 个寻求赞助。
\\\
added 86 packages in 3s
6 packages are looking for funding
\\\

两项目均安装成功，无报错。

---

## 5. 核心实现说明

### 原生 JS 方案 (md-parser.js)
- 使用 ES Module 导出 \initMdParser\ 函数
- 在入口 main.js 中导入并调用
- DOM 操作：直接设置 innerHTML 构建编辑器布局
- 防抖：200ms debounce 监听 textarea input
- 解析：marked.parse() 每次输入重新渲染

### Vue 3 方案 (MdParserDemo.vue)
- SFC 组件：模板 + script setup + scoped style
- 数据流：v-model 绑定 textarea，v-html 输出渲染结果
- 生命周期：onMounted 初始化默认内容
- 防抖：手动 timer + clearTimeout

---

## 6. 构建验证

两个项目均使用 Vite 构建：
- \
pm run dev\ — 启动开发服务器
- \
pm run build\ — 生产构建
- \
pm run preview\ — 预览构建结果
