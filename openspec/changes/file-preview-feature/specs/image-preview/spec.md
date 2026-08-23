## ADDED Requirements

### Requirement: 图片文件预览
系统 SHALL 支持图片文件的预览，使用 img 元素显示图片。

#### Scenario: 加载图片文件
- **WHEN** 用户选择图片文件（.png、.jpg、.jpeg、.gif、.bmp、.webp）
- **THEN** 系统使用 <img> 标签和 object URL 显示图片

### Requirement: 图片预览支持缩放
系统 SHALL 支持图片的缩放功能。

#### Scenario: 缩放图片
- **WHEN** 用户使用缩放控制
- **THEN** 图片通过 CSS transform 或 zoom 属性进行缩放
