## ADDED Requirements

### Requirement: Markdown 文件预览
系统 SHALL 支持 Markdown 文件的预览，使用 marked 库将内容渲染为 HTML。

#### Scenario: 加载 Markdown 文件
- **WHEN** 用户选择 .md 或 .markdown 文件
- **THEN** 系统使用 marked.parse() 将 Markdown 转换为 HTML 并显示

### Requirement: Markdown 预览支持搜索
系统 SHALL 支持在 Markdown 渲染后的内容中搜索文字。

#### Scenario: 搜索 Markdown 内容
- **WHEN** 用户在搜索框输入文字
- **THEN** 系统使用 window.find() 在渲染后的 HTML 内容中搜索
