# write — 写入磁盘

控制构建完成后是否将产物写入磁盘。

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 写入磁盘（默认）
    write: true,

    // 不写入磁盘（仅在内存中生成）
    write: false,
  }
})
```

## 进阶配置

### 自定义构建输出

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 禁用默认写入
    write: false,
    // 在钩子中自定义处理
    async closeBundle() {
      // 从 bundle 对象中获取构建产物
      // 可以上传到 CDN、写入数据库等
      console.log('构建完成，产物在内存中')
    }
  }
})
```

## 注意事项

- 设置为 `false` 时，构建产物只在内存中，不会写入文件系统
- 适用于需要自定义产物处理的场景（如上传 CDN）
- 配合 `closeBundle` 钩子可以获取构建产物
- 通常与 `emitAssets: false` 配合使用
