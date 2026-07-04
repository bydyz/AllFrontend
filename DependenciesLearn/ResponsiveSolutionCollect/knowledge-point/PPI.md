# PPI (Pixels Per Inch) 详解

## 基本定义

**PPI (Pixels Per Inch)** - 像素密度，表示每英寸屏幕上的像素数量。

```
PPI = √(水平像素² + 垂直像素²) / 屏幕对角线尺寸(英寸)
```

## 功能特性

### 1. 衡量屏幕清晰度
- PPI 越高，屏幕显示越细腻
- 影响文字、图标、图片的清晰度
- 决定视觉体验的精细程度

### 2. 影响 UI 适配
- 高 PPI 屏幕需要更精细的 UI 元素
- 影响图标、字体、间距的设计
- 决定响应式布局的断点设置

### 3. 决定资源质量要求
- 高 PPI 屏幕需要更高分辨率的图片
- 影响字体渲染和抗锯齿效果
- 决定 SVG 和矢量图形的必要性

## 获取方式

### 1. 计算公式
```javascript
// 计算设备 PPI
function calculatePPI(widthPx, heightPx, diagonalInches) {
  const diagonalPx = Math.sqrt(widthPx ** 2 + heightPx ** 2);
  return diagonalPx / diagonalInches;
}

// 示例：iPhone 14
const ppi = calculatePPI(1170, 2532, 6.1);
console.log(`iPhone 14 PPI: ${ppi}`); // 约 460 PPI
```

### 2. 常见设备 PPI 参考
| 设备类型 | PPI 范围 | 说明 |
|----------|----------|------|
| 标准显示器 | 90-110 | 普通桌面显示器 |
| 笔记本电脑 | 110-160 | 视网膜屏出现前 |
| Retina MacBook | 220+ | 苹果视网膜屏幕 |
| 智能手机 | 300-500+ | 高清移动设备 |
| 平板电脑 | 200-300 | iPad 等设备 |

### 3. JavaScript 获取（有限）
```javascript
// 注意：浏览器无法直接获取真实 PPI
// 只能获取设备像素比 (DPR)
const dpr = window.devicePixelRatio || 1;

// 估算 PPI（假设标准 96 DPI）
const estimatedPPI = 96 * dpr;
console.log(`估算 PPI: ${estimatedPPI}`);
```

## 使用场景

### 1. 图片适配
```html
<!-- 根据 PPI 选择合适分辨率的图片 -->
<img src="image@1x.jpg" 
     srcset="image@1x.jpg 1x, image@2x.jpg 2x, image@3x.jpg 3x"
     alt="响应式图片">
```

### 2. 字体渲染优化
```css
/* 针对高 PPI 屏幕优化字体 */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

### 3. 边框和阴影处理
```css
/* 高 PPI 屏幕下保持清晰 */
.border {
  border: 0.5px solid #ccc; /* 某些设备需要亚像素渲染 */
}

.shadow {
  box-shadow: 0 1px 2px rgba(0,0,0,0.1); /* 避免模糊 */
}
```

### 4. 响应式设计考虑
```css
/* 根据 PPI 调整设计 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* 高 PPI 屏幕样式 */
  .logo {
    background-image: url('logo@2x.png');
  }
}
```

## 最佳实践

### 1. 资源准备
- **1x 图片**：基础分辨率（90-110 PPI）
- **2x 图片**：2倍分辨率（180-220 PPI）
- **3x 图片**：3倍分辨率（270-330 PPI）

### 2. 设计考虑
- 使用矢量图形（SVG）优先
- 字体选择考虑高 PPI 渲染
- 避免过于精细的 1px 线条

### 3. 性能优化
- 根据设备 PPI 加载合适图片
- 使用 `srcset` 和 `sizes` 属性
- 考虑网络条件和设备能力

## 常见误区

1. **PPI 不是唯一清晰度指标**
   - 还取决于屏幕尺寸、观看距离、内容类型

2. **高 PPI 不等于高性能**
   - 需要更多计算资源和内存

3. **PPI 与 DPR 的关系**
   - PPI 是物理属性，DPR 是相对比例
   - DPR = 设备 PPI / 标准 PPI（通常 96）

## 总结

- **PPI** 是衡量屏幕像素密度的物理属性
- 影响 UI 设计、资源质量、用户体验
- 在前端开发中需要考虑 PPI 进行适配
- 与 DPR 配合使用，创建响应式界面