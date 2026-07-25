# dynamicImportVarsOptions — 动态导入变量选项

配置 Vite 对动态导入中变量表达式的解析行为。Vite 使用 `@rollup/plugin-dynamic-import-vars` 来处理动态导入中的变量。

## 配置方式

- **类型**: `{ include?: string | RegExp, exclude?: string | RegExp }`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    dynamicImportVarsOptions: {
      // 匹配需要处理的动态导入
      include: /src\/views\/.*\.js$/,
      // 排除不需要处理的文件
      exclude: /node_modules/,
    }
  }
})
```

## 进阶配置

### 自定义匹配规则

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    dynamicImportVarsOptions: {
      // 只处理 src 目录下的动态导入
      include: /src\/.*\.vue$/,
      // 排除测试文件
      exclude: /\.(test|spec)\.js$/,
    }
  }
})
```

### 使用场景

```javascript
// 动态导入变量示例
// Vite 会在构建时扫描可能的文件
const modules = import.meta.glob('./views/**/*.vue')

// 或者使用模板字符串
const componentName = 'UserDashboard'
const module = await import(`./components/${componentName}.vue`)
```

## 注意事项

- 动态导入的路径必须包含至少一个 `/`，否则无法被正确解析
- Vite 会在构建时扫描可能匹配的文件，因此变量模式必须可预测
- 不支持完全动态的路径（如来自用户输入的路径）
- 该插件仅在构建模式下工作，开发服务器中不生效
