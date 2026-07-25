## ADDED Requirements

### Requirement: 插件主入口函数
插件 SHALL 导出一个 `md2vue` 函数，该函数接受配置选项并返回 Vite 插件对象。

#### Scenario: 插件函数调用
- **WHEN** 开发者在 `vite.config.js` 中调用 `md2vue()` 函数
- **THEN** SHALL 返回一个包含 `name` 和 `transform` 方法的 Vite 插件对象

#### Scenario: 插件函数接受配置选项
- **WHEN** 开发者传递配置选项给 `md2vue({ ... })`
- **THEN** 插件 SHALL 使用提供的配置选项进行初始化

### Requirement: 文件类型过滤
插件 SHALL 只处理 `.md` 文件，忽略其他类型的文件。

#### Scenario: 处理 Markdown 文件
- **WHEN** Vite 处理一个以 `.md` 结尾的文件
- **THEN** 插件 SHALL 调用 transform 方法处理该文件

#### Scenario: 忽略非 Markdown 文件
- **WHEN** Vite 处理一个不以 `.md` 结尾的文件
- **THEN** 插件 SHALL 返回 `undefined`，不进行任何处理

### Requirement: Markdown 转 HTML 转换
插件 SHALL 使用 `marked` 库将 Markdown 内容转换为 HTML。

#### Scenario: 基础 Markdown 转换
- **WHEN** 输入包含基础 Markdown 语法（标题、段落、列表等）
- **THEN** 插件 SHALL 将其转换为对应的 HTML 标签

#### Scenario: GFM 支持
- **WHEN** 输入包含 GitHub Flavored Markdown 语法（表格、任务列表等）
- **THEN** 插件 SHALL 正确解析并转换为 HTML

### Requirement: Vue 组件代码生成
插件 SHALL 将转换后的 HTML 包装为 Vue 单文件组件格式。

#### Scenario: 生成 Vue 组件模板
- **WHEN** Markdown 转换为 HTML 完成
- **THEN** 插件 SHALL 生成包含 `<template>` 和 `<script>` 的 Vue 组件代码

#### Scenario: 包裹元素配置
- **WHEN** 配置中指定了 `wrapperClass`
- **THEN** 生成的组件 SHALL 使用指定的 CSS 类名包裹 HTML 内容

### Requirement: 插件名称
插件 SHALL 具有固定的名称 `vite-plugin-md2vue`。

#### Scenario: 插件标识
- **WHEN** Vite 加载插件
- **THEN** 插件的 `name` 属性 SHALL 为 `vite-plugin-md2vue`
