## ADDED Requirements

### Requirement: 纯文本文件预览
系统 SHALL 支持纯文本文件的预览，直接在预览区域显示文本内容。

#### Scenario: 加载文本文件
- **WHEN** 用户选择文本文件（.txt、.log、.json、.js、.ts、.vue、.css、.html）
- **THEN** 系统读取文件内容并在预览区域使用 <pre> 标签显示

### Requirement: 文本预览支持搜索
系统 SHALL 支持在文本内容中搜索文字。

#### Scenario: 搜索文本内容
- **WHEN** 用户在搜索框输入文字
- **THEN** 系统使用 window.find() 在文本内容中搜索
