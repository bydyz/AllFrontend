## Context

Preview_Collect 项目是一个基于 Vue 3 + Vue Router + Vite 的前端应用，用于收集和展示各种前端依赖库的使用示例。项目目前路由为空，需要添加文件预览功能作为第一个实际功能模块。

技术栈：
- Vue 3.5.40
- Vue Router 5.2.0
- Vite 8.1.5

## Goals / Non-Goals

**Goals:**
- 实现多种文件格式的本地预览（PDF、DOC/DOCX、XLSX/XLS、MD、TXT、图片）
- 提供灵活的文件选择方式（点击按钮 + 拖拽）
- 预览区域支持缩放、搜索和可拖拽调整大小
- PDF 预览支持翻页功能
- DOC/DOCX 实现高保真预览（保留表格样式、图片位置、列表缩进）
- 代码文件支持语法高亮
- 纯前端实现，无需服务器

**Non-Goals:**
- 不处理远程 URL 加载（后续迭代）
- 不实现文件上传/存储功能
- 不实现复杂的 Excel 公式计算

## Decisions

### 1. 文件类型识别策略

**决策**: 使用文件扩展名进行类型识别

**理由**:
- 简单可靠，覆盖所有目标格式
- 不依赖文件内容解析（更快）
- 用户选择的文件扩展名是可信的

**备选方案**: 
- MIME 类型检测：某些文件 MIME 类型不准确（如 .md 可能被识别为 text/plain）
- 文件头检测：实现复杂，对某些格式不适用

### 2. 预览器架构

**决策**: 采用动态组件模式，每个文件类型一个独立预览器组件

**理由**:
- 职责分离，每个预览器独立维护
- 便于扩展新的文件类型
- 符合 Vue 组件化设计原则

**架构图**:
```
PreviewArea.vue
    │
    ├── PdfPreviewer.vue
    ├── DocPreviewer.vue
    ├── ExcelPreviewer.vue
    ├── MarkdownPreviewer.vue
    ├── TextPreviewer.vue
    └── ImagePreviewer.vue
```

### 3. 拖拽调整大小实现

**决策**: 使用原生 mousedown/mousemove/mouseup 事件实现

**理由**:
- 无额外依赖
- 性能好，直接操作 DOM
- 完全可控

**备选方案**:
- 第三方库（如 vue-resizable）：增加包体积，功能过剩

### 4. 搜索功能实现

**决策**: 使用浏览器原生 window.find() API

**理由**:
- 实现简单，一行代码
- 浏览器原生高亮，无需自定义样式
- 覆盖所有文本类内容

**局限性**:
- 无法自定义高亮样式
- 无法统计匹配数量
- 某些浏览器支持不一致

### 5. PDF 滚动处理

**决策**: PDF 预览使用 `overflow: hidden`，滚动由 iframe 内部处理；其他预览类型使用 `overflow: auto`

**理由**:
- PDF 的 iframe 自带滚动能力
- 避免双重滚动条

### 6. 依赖库选择

| 功能 | 选择 | 理由 |
|------|------|------|
| DOC 转换 | docx-preview | 高保真渲染，保留表格样式、图片位置、列表缩进，比 mammoth 还原度更高 |
| Markdown 渲染 | marked | 性能好，API 简洁，支持 GFM |
| Excel 解析 | xlsx (SheetJS) | 功能全面，社区标准，支持多种格式 |
| 语法高亮 | highlight.js | 轻量级，支持 190+ 语言，社区活跃 |

## Risks / Trade-offs

### 风险

1. **大文件性能**
   - [风险] 超大 PDF 或 Excel 文件可能导致页面卡顿
   - [缓解] 添加文件大小限制（如 50MB），或实现懒加载

2. **浏览器兼容性**
   - [风险] window.find() 在不同浏览器行为不一致
   - [缓解] 作为基础功能，不追求完美兼容

3. **包体积增大**
   - [风险] docx-preview 和 highlight.js 增加了打包体积（约 1MB gzip 后 ~485KB）
   - [缓解] 使用动态 import() 按需加载可优化

### 权衡

1. **还原度 vs 包体积**
   - 选择：使用 docx-preview 提升 DOC 还原度
   - 代价：包体积增大

2. **原生实现 vs 第三方库**
   - 选择：尽量使用原生 API
   - 好处：包体积小，无额外依赖
   - 代价：某些功能实现更复杂

3. **搜索体验 vs 实现成本**
   - 选择：基础 window.find()
   - 放弃：自定义搜索 UI（下一个/上一个、高亮所有）
