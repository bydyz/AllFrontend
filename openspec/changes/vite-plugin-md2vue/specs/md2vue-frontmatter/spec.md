## ADDED Requirements

### Requirement: Frontmatter 提取
插件 SHALL 支持从 Markdown 文件中提取 YAML 格式的 frontmatter。

#### Scenario: 识别 frontmatter
- **WHEN** Markdown 文件以 `---` 开头和结尾的 YAML 块
- **THEN** 插件 SHALL 将其识别为 frontmatter 并提取

#### Scenario: 无 frontmatter 的文件
- **WHEN** Markdown 文件不包含 frontmatter
- **THEN** 插件 SHALL 正常处理文件内容，frontmatter 为空对象

### Requirement: Frontmatter 数据暴露
插件 SHALL 将提取的 frontmatter 数据暴露为 Vue 组件的变量。

#### Scenario: 生成 frontmatter 变量
- **WHEN** Markdown 文件包含 frontmatter
- **THEN** 生成的 Vue 组件 SHALL 包含 `const frontmatter = {...}` 变量

#### Scenario: frontmatter 为空
- **WHEN** Markdown 文件不包含 frontmatter
- **THEN** 生成的 Vue 组件 SHALL 包含 `const frontmatter = {}`

### Requirement: Frontmatter Props 支持
插件 SHALL 支持将 frontmatter 数据作为 Vue 组件的 props 暴露。

#### Scenario: 启用 props 暴露
- **WHEN** 配置中设置 `component.exposeProps: true`
- **THEN** 生成的 Vue 组件 SHALL 定义 `title`、`description`、`date`、`tags` 等 props

#### Scenario: 禁用 props 暴露
- **WHEN** 配置中设置 `component.exposeProps: false`
- **THEN** 生成的 Vue 组件 SHALL 不定义 props，只包含 frontmatter 变量

### Requirement: 支持的 Frontmatter 字段
插件 SHALL 支持以下标准 frontmatter 字段。

#### Scenario: 标准字段提取
- **WHEN** frontmatter 包含 `title`、`description`、`date`、`tags` 字段
- **THEN** 插件 SHALL 正确提取这些字段并在组件中暴露

#### Scenario: 自定义字段
- **WHEN** frontmatter 包含自定义字段
- **THEN** 插件 SHALL 将所有字段保留在 frontmatter 对象中

### Requirement: Frontmatter 类型定义
插件 SHALL 为 frontmatter 数据提供 TypeScript 类型定义。

#### Scenario: 类型定义生成
- **WHEN** 生成 Vue 组件代码
- **THEN** 插件 SHALL 生成包含正确类型定义的 TypeScript 代码
