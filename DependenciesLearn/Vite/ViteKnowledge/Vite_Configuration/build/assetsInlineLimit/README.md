# assetsInlineLimit — 资源内联限制

指定小于该大小（单位：字节）的资源会被内联为 Base64 Data URL，避免额外的网络请求。

## 配置方式

- **类型**: `number | ((filePath: string, content: Buffer) => boolean)`
- **默认值**: `4096`（4KB）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 小于 8KB 的资源内联为 Base64
    assetsInlineLimit: 8192,

    // 禁用内联（所有资源作为独立文件输出）
    assetsInlineLimit: 0,

    // 完全内联所有资源（不推荐）
    assetsInlineLimit: Infinity,
  }
})
```

## 进阶配置

使用函数进行精细控制：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 根据文件路径和内容决定是否内联
    assetsInlineLimit: (filePath, content) => {
      // 小图片始终内联
      if (filePath.endsWith('.png') || filePath.endsWith('.jpg')) {
        return content.length < 4096
      }
      // SVG 文件不超过 2KB 才内联
      if (filePath.endsWith('.svg')) {
        return content.length < 2048
      }
      // 其他资源使用默认 4KB 限制
      return content.length < 4096
    }
  }
})
```

## 注意事项

- 内联为 Base64 会使文件体积增大约 33%，但可以减少 HTTP 请求数
- 对于频繁使用的小图标、字体文件等，适当增大限制值可以提升性能
- 过大的内联资源会增加 HTML/JS 文件体积，影响首屏加载
- Vite 5.1+ 支持使用函数进行自定义判断
