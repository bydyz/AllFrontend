## Why

在 Vue 3 + Vite 项目中，Markdown 文件的处理是一个常见需求。目前项目中已经存在多个 Markdown 解析库的示例（marked、markdown-it、remark 等），但缺乏一个统一的、可复用的 Vite 插件来将 Markdown 文件直接转换为 Vue 组件。

现有解决方案的问题：
- 每次使用都需要手动配置解析器和转换逻辑
- 缺乏统一的配置选项系统
- 代码高亮、数学公式等功能需要重复集成
- 无法直接在 Vue 模板中使用 Markdown 文件

创建 `vite-plugin-md2vue` 可以提供一个开箱即用的解决方案，让开发者能够直接在 Vue 项目中使用 `.md` 文件作为组件，同时支持代码高亮、数学公式等常用功能。

## What Changes

- **新增 Vite 插件**：创建 `vite-plugin-md2vue`，支持将 `.md` 文件转换为 Vue 组件
- **核心转换功能**：使用 `marked` 库将 Markdown 解析为 HTML，然后包装为 Vue 单文件组件
- **代码高亮支持**：集成 `highlight.js`，自动对代码块进行语法高亮
- **数学公式支持**：集成 `KaTeX`，支持行内和块级数学公式渲染
- **Frontmatter 支持**：使用 `gray-matter` 提取 YAML frontmatter，暴露为 Vue 组件的 props
- **配置选项系统**：提供灵活的配置选项，支持自定义解析器、高亮主题、组件样式等
- **TypeScript 支持**：完整的类型定义和类型安全
- **单元测试**：使用 `vitest` 编写完整的测试用例
- **示例项目**：提供基础和高级使用示例

## Capabilities

### New Capabilities

- `md2vue-core`: 核心转换逻辑，包括 Markdown 解析、HTML 生成、Vue 组件代码生成
- `md2vue-highlight`: 代码高亮功能，集成 highlight.js，支持多种编程语言
- `md2vue-katex`: 数学公式渲染功能，集成 KaTeX，支持行内和块级公式
- `md2vue-frontmatter`: Frontmatter 提取功能，支持 YAML 格式，暴露为 Vue 组件 props
- `md2vue-config`: 配置选项系统，提供灵活的插件配置能力

### Modified Capabilities

（无现有能力需要修改）

## Impact

### 代码影响

- **新增目录**：`DependenciesLearn/Vite/CustomPlugin/vite-plugin-md2vue/`
- **新增文件**：
  - `src/` - 插件源代码（8 个 TypeScript 文件）
  - `tests/` - 单元测试和测试用例
  - `examples/` - 使用示例项目
  - 配置文件：`package.json`、`tsconfig.json`、`tsup.config.ts`、`vitest.config.ts`

### 依赖影响

- **新增依赖**：
  - `marked` - Markdown 解析器
  - `highlight.js` - 代码高亮库
  - `katex` - 数学公式渲染库
  - `gray-matter` - Frontmatter 解析库
- **开发依赖**：
  - `tsup` - TypeScript 构建工具
  - `vitest` - 单元测试框架
  - `typescript` - TypeScript 编译器

### API 影响

- **插件 API**：导出 `md2vue()` 函数，接受配置选项，返回 Vite 插件对象
- **组件 API**：生成的 Vue 组件支持 `title`、`description`、`date`、`tags` 等 props

### 系统影响

- **构建流程**：在 Vite 构建过程中自动处理 `.md` 文件
- **开发体验**：支持热模块替换（HMR），修改 Markdown 文件后浏览器自动更新
- **兼容性**：支持 Vite 4.x 和 5.x 版本

### 学习价值

- 深入理解 Vite 插件系统的工作原理
- 掌握 `transform` 钩子的使用方法
- 学习如何集成第三方库到 Vite 插件中
- 了解 Vue 组件代码生成的技巧
- 实践 TypeScript 在插件开发中的应用
