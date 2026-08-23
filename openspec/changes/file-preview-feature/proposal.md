## Why

在 Preview_Collect 项目中需要一个文件预览功能，支持多种常见文件格式的本地预览。用户可以通过选择本地文件或拖拽文件的方式，在一个可调整大小的固定区域内预览 PDF、DOC/DOCX、XLSX/XLS、Markdown、纯文本和图片文件。这为文件查看和内容检查提供了便捷的前端工具。

## What Changes

- 新增文件预览路由 (`/file-preview`)
- 实现文件选择器组件，支持点击按钮选择和拖拽上传两种方式
- 实现预览区域容器，支持缩放、搜索和可拖拽调整大小
- 实现 6 种文件预览器：PDF、DOC、Excel、Markdown、文本、图片
- PDF 预览支持翻页功能
- DOC/DOCX 使用 docx-preview 实现高保真预览（保留表格样式、图片位置、列表缩进）
- 代码文件（JS/TS/Vue/CSS/HTML/JSON）支持 highlight.js 语法高亮
- 所有预览器支持基础搜索（window.find）

## Capabilities

### New Capabilities

- `file-selection`: 文件选择能力，支持本地文件选择和拖拽，自动识别文件类型
- `preview-container`: 预览区域容器，提供缩放、搜索、可拖拽调整大小等控制功能
- `pdf-preview`: PDF 文件预览，支持翻页和搜索
- `doc-preview`: DOC/DOCX 文件预览，使用 docx-preview 实现高保真渲染
- `excel-preview`: XLSX/XLS 文件预览，使用 xlsx 库解析为表格
- `markdown-preview`: Markdown 文件预览，使用 marked 库渲染
- `text-preview`: 纯文本和代码文件预览，支持 highlight.js 语法高亮
- `image-preview`: 图片文件预览（PNG/JPG/GIF）

### Modified Capabilities

（无）

## Impact

- **新增依赖**: docx-preview (DOC高保真转换), marked (Markdown渲染), xlsx (Excel解析), highlight.js (语法高亮)
- **新增文件**:
  - `src/views/FilePreview.vue` - 主页面
  - `src/components/filePreview/FileSelector.vue` - 文件选择器
  - `src/components/filePreview/PreviewArea.vue` - 预览区域
  - `src/components/filePreview/DragHandle.vue` - 拖拽手柄
  - `src/components/filePreview/previewers/*.vue` - 6个预览器组件
- **修改文件**: `src/router/index.js` - 添加新路由
- **兼容性**: 纯前端实现，无需服务器支持，使用浏览器原生 API 和轻量级库
