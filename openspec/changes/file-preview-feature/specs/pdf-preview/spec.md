## ADDED Requirements

### Requirement: PDF 文件预览
系统 SHALL 支持 PDF 文件的预览，使用原生 iframe 或 embed 元素。

#### Scenario: 加载 PDF 文件
- **WHEN** 用户选择 PDF 文件
- **THEN** 系统在预览区域使用 iframe 或 embed 加载 PDF 内容

### Requirement: PDF 预览支持翻页
系统 SHALL 为 PDF 预览提供翻页控制功能。

#### Scenario: 翻到下一页
- **WHEN** 用户点击"下一页"按钮
- **THEN** PDF 显示下一页内容

#### Scenario: 翻到上一页
- **WHEN** 用户点击"上一页"按钮
- **THEN** PDF 显示上一页内容

### Requirement: PDF 预览支持搜索
系统 SHALL 支持在 PDF 内容中搜索文字。

#### Scenario: 搜索 PDF 内容
- **WHEN** 用户在搜索框输入文字
- **THEN** 系统通过 iframe.contentWindow.find() 在 PDF 中搜索匹配内容
