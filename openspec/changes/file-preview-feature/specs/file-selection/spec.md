## ADDED Requirements

### Requirement: 用户可通过点击按钮选择文件
系统 SHALL 提供一个文件选择按钮，允许用户点击后从本地文件系统选择文件。

#### Scenario: 点击按钮选择文件
- **WHEN** 用户点击"选择文件"按钮
- **THEN** 系统打开文件选择对话框，用户可选择目标文件

### Requirement: 用户可通过拖拽方式选择文件
系统 SHALL 提供一个拖拽区域，允许用户将文件拖拽到该区域进行选择。

#### Scenario: 拖拽文件到区域
- **WHEN** 用户将文件拖拽到指定区域
- **THEN** 系统接收该文件并开始处理

#### Scenario: 拖拽视觉反馈
- **WHEN** 用户拖拽文件进入拖拽区域
- **THEN** 系统显示视觉反馈（如边框高亮）提示用户可放置

### Requirement: 系统自动识别文件类型
系统 SHALL 根据文件扩展名自动识别文件类型，并映射到对应的预览器。

#### Scenario: 识别 PDF 文件
- **WHEN** 用户选择扩展名为 .pdf 的文件
- **THEN** 系统将文件类型识别为 "pdf"

#### Scenario: 识别 Word 文档
- **WHEN** 用户选择扩展名为 .doc 或 .docx 的文件
- **THEN** 系统将文件类型识别为 "doc"

#### Scenario: 识别 Excel 文件
- **WHEN** 用户选择扩展名为 .xls 或 .xlsx 的文件
- **THEN** 系统将文件类型识别为 "excel"

#### Scenario: 识别 Markdown 文件
- **WHEN** 用户选择扩展名为 .md 或 .markdown 的文件
- **THEN** 系统将文件类型识别为 "markdown"

#### Scenario: 识别文本文件
- **WHEN** 用户选择扩展名为 .txt、.log、.json、.js、.ts、.vue、.css 或 .html 的文件
- **THEN** 系统将文件类型识别为 "text"

#### Scenario: 识别图片文件
- **WHEN** 用户选择扩展名为 .png、.jpg、.jpeg、.gif、.bmp 或 .webp 的文件
- **THEN** 系统将文件类型识别为 "image"

### Requirement: 系统生成本地预览 URL
系统 SHALL 为本地选择的文件创建 object URL 用于预览。

#### Scenario: 创建 object URL
- **WHEN** 用户成功选择一个本地文件
- **THEN** 系统使用 URL.createObjectURL() 生成预览 URL
