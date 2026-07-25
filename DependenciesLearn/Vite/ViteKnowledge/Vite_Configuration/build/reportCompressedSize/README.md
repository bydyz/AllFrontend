# reportCompressedSize — 报告压缩大小

控制构建时是否报告压缩后的文件大小。

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 报告压缩大小（默认）
    reportCompressedSize: true,

    // 不报告压缩大小（加快构建速度）
    reportCompressedSize: false,
  }
})
```

## 输出示例

启用后，构建时会输出类似信息：

```
✓ 42 modules transformed.
dist/assets/index-[hash].js   23.45 kB │ gzip:  7.12 kB
dist/assets/vendor-[hash].js  142.38 kB │ gzip: 45.67 kB
dist/assets/index-[hash].css   8.92 kB │ gzip:  2.34 kB
✓ built in 1.23s
```

## 注意事项

- 计算 gzip 大小需要额外的处理时间
- 在大型项目中，禁用此选项可以加快构建速度
- CI/CD 环境中如果不需要压缩大小报告，可以禁用
- 即使禁用，仍然会显示原始文件大小
