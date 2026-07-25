# license — 许可证

控制是否将项目的 LICENSE 许可证信息生成到构建产物中。

## 配置方式

- **类型**: `boolean | { fileName?: string }`
- **默认值**: `false`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 启用许可证输出
    license: true,

    // 自定义许可证文件名
    license: {
      fileName: 'THIRD-PARTY-LICENSES.txt',
    },

    // 禁用（默认）
    license: false,
  }
})
```

## 进阶配置

### 自定义文件名

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    license: {
      // 使用项目名称作为文件名
      fileName: `${process.env.npm_package_name}-licenses.txt`,
    }
  }
})
```

## 注意事项

- 启用后，Vite 会收集所有依赖的许可证信息并合并到一个文件中
- 对于开源库发布特别有用，确保满足许可证要求
- 输出文件位于 `outDir` 目录下
- 设置为 `true` 时，默认文件名为 `LICENSES.txt`
