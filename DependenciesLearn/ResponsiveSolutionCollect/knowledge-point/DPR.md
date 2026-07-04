# DPR (Device Pixel Ratio) 详解

## 基本定义

**DPR (Device Pixel Ratio)** - 设备像素比，表示物理像素与 CSS 像素的比例。

```
DPR = 物理像素 / CSS 像素
```

## 功能特性

### 1. 衡量屏幕密度
- DPR 直接反映屏幕的像素密度
- 标准屏幕 DPR=1，Retina 屏幕 DPR≥2
- 影响 UI 元素的清晰度和大小

### 2. 影响 CSS 像素计算
- CSS 像素 = 物理像素 / DPR
- 决定布局和尺寸的计算方式
- 影响响应式设计的断点设置

### 3. 决定资源质量要求
- 高 DPR 屏幕需要更高分辨率的图片
- 影响字体渲染和抗锯齿效果
- 决定 SVG 和矢量图形的必要性

## 获取方式

### 1. JavaScript 获取
```javascript
// 获取设备像素比
const dpr = window.devicePixelRatio || 1;
console.log(`设备像素比: ${dpr}`);

// 标准屏幕：dpr = 1
// Retina MacBook：dpr = 2
// iPhone 14：dpr = 3
```

### 2. CSS 媒体查询
```css
/* 根据 DPR 应用不同样式 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* 高 DPR 屏幕样式 */
  .logo {
    background-image: url('logo@2x.png');
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  /* 超高 DPR 屏幕样式 */
  .logo {
    background-image: url('logo@3x.png');
  }
}
```

### 3. HTML 属性
```html
<!-- 使用 srcset 根据 DPR 选择图片 -->
<img src="image@1x.jpg" 
     srcset="image@1x.jpg 1x, image@2x.jpg 2x, image@3x.jpg 3x"
     alt="响应式图片">

<!-- 使用 picture 元素 -->
<picture>
  <source media="(min-resolution: 2dppx)" srcset="image@2x.jpg">
  <img src="image@1x.jpg" alt="响应式图片">
</picture>
```

## 使用场景

### 1. 图片适配
```html
<!-- 基础用法 -->
<img src="image@1x.jpg" 
     srcset="image@1x.jpg 1x, image@2x.jpg 2x, image@3x.jpg 3x"
     alt="响应式图片">

<!-- 高级用法：指定尺寸 -->
<img src="image@1x.jpg" 
     srcset="image@1x.jpg 1x, image@2x.jpg 2x, image@3x.jpg 3x"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="响应式图片">
```

### 2. Canvas 绘制
```javascript
// 高清 Canvas 绘制
function setupHighDPICanvas(canvas, width, height) {
  const dpr = window.devicePixelRatio || 1;
  
  // 设置实际尺寸
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  
  // 设置 CSS 尺寸
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  // 获取上下文并缩放
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  
  return ctx;
}

// 使用示例
const canvas = document.getElementById('myCanvas');
const ctx = setupHighDPICanvas(canvas, 800, 600);
```

### 3. CSS 像素与物理像素转换
```javascript
// CSS 像素转物理像素
function cssToPhysical(cssPx) {
  return cssPx * window.devicePixelRatio;
}

// 物理像素转 CSS 像素
function physicalToCss(physicalPx) {
  return physicalPx / window.devicePixelRatio;
}

// 示例
const cssWidth = 100;
const physicalWidth = cssToPhysical(cssWidth);
console.log(`CSS 像素: ${cssWidth}, 物理像素: ${physicalWidth}`);
```

### 4. 字体大小调整
```javascript
// 根据 DPR 调整字体大小
function adjustFontSize(baseSize) {
  const dpr = window.devicePixelRatio || 1;
  if (dpr >= 3) {
    return baseSize * 0.9; // 超高 DPR 稍微减小字体
  } else if (dpr >= 2) {
    return baseSize * 0.95; // 高 DPR 略微减小字体
  }
  return baseSize;
}

// 使用示例
const fontSize = adjustFontSize(16);
document.body.style.fontSize = `${fontSize}px`;
```

## 最佳实践

### 1. 图片资源管理
```
images/
  ├── logo@1x.png    # 标准分辨率
  ├── logo@2x.png    # 2倍分辨率
  └── logo@3x.png    # 3倍分辨率
```

### 2. CSS 处理
```css
/* 基础样式 */
.logo {
  background-image: url('logo@1x.png');
  background-size: contain;
}

/* 高 DPR 屏幕 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo {
    background-image: url('logo@2x.png');
  }
}

/* 超高 DPR 屏幕 */
@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  .logo {
    background-image: url('logo@3x.png');
  }
}
```

### 3. JavaScript 工具函数
```javascript
// DPR 相关工具函数
const DPRUtils = {
  // 获取当前 DPR
  getDPR() {
    return window.devicePixelRatio || 1;
  },
  
  // 检查是否为高 DPR 屏幕
  isHighDPR() {
    return this.getDPR() >= 2;
  },
  
  // 获取合适的图片后缀
  getImageSuffix() {
    const dpr = this.getDPR();
    if (dpr >= 3) return '@3x';
    if (dpr >= 2) return '@2x';
    return '@1x';
  },
  
  // 转换尺寸
  convertSize(size) {
    return size * this.getDPR();
  }
};

// 使用示例
const dpr = DPRUtils.getDPR();
const imageSuffix = DPRUtils.getImageSuffix();
console.log(`DPR: ${dpr}, 图片后缀: ${imageSuffix}`);
```

## 常见误区

1. **DPR 不是 PPI**
   - DPR 是相对比例，PPI 是绝对密度
   - DPR = 设备 PPI / 标准 PPI（通常 96）

2. **高 DPR 不一定需要高分辨率图片**
   - 考虑网络条件和设备性能
   - 小尺寸元素可能不需要高分辨率

3. **DPR 影响性能**
   - 高 DPR 需要更多计算资源
   - 合理平衡清晰度和性能

## 常见设备 DPR 参考

| 设备类型 | DPR | 说明 |
|----------|-----|------|
| 标准显示器 | 1 | 普通桌面显示器 |
| Retina MacBook | 2 | 苹果视网膜屏幕 |
| iPhone 14 | 3 | 高端智能手机 |
| iPad Pro | 2 | 高清平板电脑 |
| 4K 显示器 | 1.5-2 | 高分辨率显示器 |

## 总结

- **DPR** 是物理像素与 CSS 像素的比例
- 通过 `window.devicePixelRatio` 获取
- 影响图片适配、Canvas 绘制、CSS 像素计算
- 与 PPI 配合使用，创建响应式界面
- 需要平衡清晰度和性能