## 1. 项目设置与依赖安装

- [x] 1.1 安装依赖包：mammoth、marked、xlsx
- [x] 1.2 创建组件目录结构：src/components/filePreview/

## 2. 路由与主页面

- [x] 2.1 在 src/router/index.js 添加文件预览路由
- [x] 2.2 创建 src/views/FilePreview.vue 主页面容器

## 3. 文件选择器组件

- [x] 3.1 创建 FileSelector.vue 组件基础结构
- [x] 3.2 实现文件选择按钮和 file input
- [x] 3.3 实现拖拽区域和拖拽事件处理
- [x] 3.4 实现文件类型自动识别逻辑
- [x] 3.5 实现 URL.createObjectURL 生成预览 URL

## 4. 预览区域容器组件

- [x] 4.1 创建 PreviewArea.vue 组件基础结构
- [x] 4.2 实现工具栏 UI（缩放按钮、搜索按钮）
- [x] 4.3 实现缩放控制逻辑
- [x] 4.4 实现搜索框和 window.find() 调用
- [x] 4.5 实现动态组件渲染（根据文件类型切换预览器）

## 5. 拖拽调整大小功能

- [x] 5.1 创建 DragHandle.vue 组件
- [x] 5.2 实现 mousedown/mousemove/mouseup 拖拽逻辑
- [x] 5.3 实现高度限制（min: 200px, max: 80vh）
- [x] 5.4 添加拖拽手柄样式和光标提示

## 6. 预览器组件实现

- [x] 6.1 创建 PdfPreviewer.vue（iframe/embed + 翻页控制）
- [x] 6.2 创建 DocPreviewer.vue（mammoth.js 转换）
- [x] 6.3 创建 ExcelPreviewer.vue（xlsx 解析为表格 + Sheet 切换）
- [x] 6.4 创建 MarkdownPreviewer.vue（marked 渲染）
- [x] 6.5 创建 TextPreviewer.vue（pre 标签显示）
- [x] 6.6 创建 ImagePreviewer.vue（img 标签 + 缩放支持）

## 7. 样式与交互优化

- [x] 7.1 设计整体页面布局样式
- [x] 7.2 添加拖拽区域的视觉反馈样式
- [x] 7.3 优化预览区域的滚动和溢出处理
- [x] 7.4 添加加载状态提示

## 8. 测试与验证

- [x] 8.1 测试各文件类型的预览功能
- [x] 8.2 测试拖拽选择文件功能
- [x] 8.3 测试缩放和搜索功能
- [x] 8.4 测试拖拽调整大小功能
