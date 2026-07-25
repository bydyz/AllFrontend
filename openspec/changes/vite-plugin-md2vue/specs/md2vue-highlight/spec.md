## ADDED Requirements

### Requirement: 代码高亮启用控制
插件 SHALL 支持通过配置选项启用或禁用代码高亮功能。

#### Scenario: 默认启用代码高亮
- **WHEN** 配置中未指定 `highlight.enabled`
- **THEN** 代码高亮功能 SHALL 默认启用

#### Scenario: 禁用代码高亮
- **WHEN** 配置中设置 `highlight.enabled: false`
- **THEN** 插件 SHALL 跳过代码高亮处理

### Requirement: 代码块语法高亮
插件 SHALL 对 Markdown 中的代码块进行语法高亮处理。

#### Scenario: 识别代码块
- **WHEN** Markdown 包含带语言标识的代码块（如 ` ```javascript `）
- **THEN** 插件 SHALL 使用对应的语言进行语法高亮

#### Scenario: 无语言标识的代码块
- **WHEN** Markdown 包含不带语言标识的代码块
- **THEN** 插件 SHALL 使用默认的代码高亮样式

### Requirement: 支持编程语言配置
插件 SHALL 支持配置支持的编程语言列表。

#### Scenario: 指定支持的语言
- **WHEN** 配置中指定了 `highlight.languages` 数组
- **THEN** 插件 SHALL 只对指定的语言进行语法高亮

#### Scenario: 未指定语言列表
- **WHEN** 配置中未指定 `highlight.languages`
- **THEN** 插件 SHALL 支持默认的常用语言列表

### Requirement: 高亮主题配置
插件 SHALL 支持配置 highlight.js 的主题。

#### Scenario: 指定高亮主题
- **WHEN** 配置中指定了 `highlight.theme`
- **THEN** 插件 SHALL 使用指定的主题进行代码高亮

#### Scenario: 默认主题
- **WHEN** 配置中未指定 `highlight.theme`
- **THEN** 插件 SHALL 使用 `github` 主题作为默认主题

### Requirement: 代码块 CSS 类名
插件 SHALL 为高亮后的代码块添加正确的 CSS 类名。

#### Scenario: 高亮后的代码块结构
- **WHEN** 代码块经过语法高亮处理
- **THEN** 生成的 `<code>` 元素 SHALL 包含 `hljs` 类名和对应的语言类名（如 `language-javascript`）
