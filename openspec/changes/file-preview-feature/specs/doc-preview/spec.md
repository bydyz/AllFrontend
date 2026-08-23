## ADDED Requirements

### Requirement: DOC/DOCX 文件预览
系统 SHALL 支持 Word 文档的预览，使用 mammoth.js 将内容转换为 HTML。

#### Scenario: 加载 DOCX 文件
- **WHEN** 用户选择 .docx 文件
- **THEN** 系统使用 mammoth.convertToHtml() 将文档转换为 HTML 并显示

#### Scenario: 加载 DOC 文件
- **WHEN** 用户选择 .doc 文件
- **THEN** 系统尝试使用 mammoth 解析并显示内容（可能格式不完整）

### Requirement: DOC 预览支持搜索
系统 SHALL 支持在 Word 文档转换后的内容中搜索文字。

#### Scenario: 搜索 DOC 内容
- **WHEN** 用户在搜索框输入文字
- **THEN** 系统使用 window.find() 在转换后的 HTML 内容中搜索
