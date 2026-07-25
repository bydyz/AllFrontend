# plugins 插件配置

Vite 插件是扩展 Vite 构建能力的核心机制。插件通过钩子函数介入构建生命周期，可以修改代码、转换资源、注入逻辑等。

## 插件来源

插件按来源可分为以下几类：

### 官方插件（@vitejs）
| 插件名 | 用途 |
|--------|------|
| `@vitejs/plugin-vue` | Vue 3 单文件组件支持 |
| `@vitejs/plugin-vue-jsx` | Vue 3 JSX/TSX 支持 |
| `@vitejs/plugin-react` | React Fast Refresh + JSX |
| `@vitejs/plugin-react-swc` | 基于 SWC 的 React 插件（更快） |

### 社区插件
| 插件名 | 用途 |
|--------|------|
| `vite-plugin-compression` | gzip/brotli 压缩 |
| `vite-plugin-svg-icons` | SVG 图标雪碧图 |
| `vite-plugin-mock` | Mock 数据 |
| `unplugin-auto-import` | 自动导入 API |
| `unplugin-vue-components` | 自动注册组件 |

### 自定义插件
可以通过 `vitePlugin` 工具函数创建自定义插件。

## 配置方式

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),                    // 基础 Vue 插件
    AutoImport({              // 自动导入
      imports: ['vue', 'vue-router'],
    }),
  ],
})
```

## 插件组织建议

- 按来源分目录组织，方便管理
- 官方插件放前面，社区插件放后面
- 插件顺序可能影响构建结果

## 注意事项

- 插件数组的顺序很重要，后面的插件会先于前面的插件执行
- 部分插件有冲突（如 `plugin-react` 和 `plugin-react-swc`），不能同时使用
- 通过 `dependencies` 和 `devDependencies` 区分运行时和构建时插件
