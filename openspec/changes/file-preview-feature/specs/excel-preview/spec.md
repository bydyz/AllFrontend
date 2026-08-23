## ADDED Requirements

### Requirement: Excel 文件预览
系统 SHALL 支持 Excel 文件的预览，使用 xlsx 库将内容解析为 HTML 表格。

#### Scenario: 加载 XLSX 文件
- **WHEN** 用户选择 .xlsx 文件
- **THEN** 系统使用 XLSX.read() 读取文件，XLSX.utils.sheet_to_html() 转换为表格并显示

#### Scenario: 加载 XLS 文件
- **WHEN** 用户选择 .xls 文件
- **THEN** 系统使用 xlsx 库解析并显示为表格

#### Scenario: 显示 Sheet 标签
- **WHEN** Excel 文件包含多个 Sheet
- **THEN** 系统显示 Sheet 标签，允许用户切换查看不同 Sheet

### Requirement: Excel 预览支持搜索
系统 SHALL 支持在 Excel 表格内容中搜索文字。

#### Scenario: 搜索 Excel 内容
- **WHEN** 用户在搜索框输入文字
- **THEN** 系统遍历表格单元格，高亮显示匹配的内容
