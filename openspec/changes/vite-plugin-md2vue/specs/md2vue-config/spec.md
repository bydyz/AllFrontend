## ADDED Requirements

### Requirement: 配置选项结构
插件 SHALL 支持灵活的配置选项结构，包含 `markdown`、`highlight`、`katex`、`component` 四个主要配置块。

#### Scenario: 完整配置选项
- **WHEN** 开发者传递完整的配置选项
- **THEN** 插件 SHALL 使用提供的配置覆盖默认值

#### Scenario: 部分配置选项
- **WHEN** 开发者只传递部分配置选项
- **THEN** 插件 SHALL 使用默认值填充未指定的配置项

#### Scenario: 空配置选项
- **WHEN** 开发者调用 `md2vue()` 不传递任何配置
- **THEN** 插件 SHALL 使用所有默认配置

### Requirement: Markdown 配置选项
插件 SHALL 支持配置 Markdown 解析选项。

#### Scenario: GFM 选项
- **WHEN** 配置中设置 `markdown.gfm: true`
- **THEN** marked SHALL 启用 GitHub Flavored Markdown 支持

#### Scenario: Breaks 选项
- **WHEN** 配置中设置 `markdown.breaks: true`
- **THEN** marked SHALL 将 `\n` 转换为 `<br>` 标签

#### Scenario: 默认 Markdown 配置
- **WHEN** 配置中未指定 `markdown` 选项
- **THEN** 插件 SHALL 使用 `{ gfm: true, breaks: false }` 作为默认值

### Requirement: 组件配置选项
插件 SHALL 支持配置生成的 Vue 组件选项。

#### Scenario: 组件名称配置
- **WHEN** 配置中指定 `component.name`
- **THEN** 生成的 Vue 组件 SHALL 使用指定的名称

#### Scenario: 包裹类名配置
- **WHEN** 配置中指定 `component.wrapperClass`
- **THEN** 生成的组件 SHALL 使用指定的 CSS 类名包裹内容

#### Scenario: 默认组件配置
- **WHEN** 配置中未指定 `component` 选项
- **THEN** 插件 SHALL 使用 `{ name: 'MarkdownContent', wrapperClass: 'markdown-body', exposeProps: true }` 作为默认值

### Requirement: TypeScript 类型定义
插件 SHALL 提供完整的 TypeScript 类型定义。

#### Scenario: 类型导出
- **WHEN** 开发者在 TypeScript 项目中使用插件
- **THEN** 插件 SHALL 导出 `Options` 接口和其他相关类型

#### Scenario: 类型补全
- **WHEN** 开发者在 IDE 中配置插件选项
- **THEN** IDE SHALL 提供配置选项的自动补全和类型检查

### Requirement: 默认值合并
插件 SHALL 使用深度合并策略处理配置选项。

#### Scenario: 配置合并
- **WHEN** 开发者传递 `{ highlight: { theme: 'monokai' } }`
- **THEN** 插件 SHALL 保留 `highlight` 的其他默认值，只覆盖 `theme`

#### Scenario: 嵌套配置合并
- **WHEN** 开发者传递嵌套的配置选项
- **THEN** 插件 SHALL 递归合并配置，而不是完全替换
