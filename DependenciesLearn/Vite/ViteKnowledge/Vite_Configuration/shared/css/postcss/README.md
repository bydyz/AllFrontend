# css.postcss - PostCSS 配置

配置 PostCSS 处理器，用于转换 CSS。

## 配置方式

- **类型**: `string | (string | [string, any])[] | PostCSSProcessOptions`

### 使用配置文件

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
})
```

### 内联配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        'autoprefixer',
        ['postcss-preset-env', { stage: 1 }],
      ],
    },
  },
})
```

### 使用数组格式

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: [
      'autoprefixer',
      ['postcss-import', {}],
      ['postcss-preset-env', { stage: 1 }],
    ],
  },
})
```

## 进阶配置

常见的 PostCSS 插件配置：

```javascript
// postcss.config.js
export default {
  plugins: {
    // 自动添加浏览器前缀
    'autoprefixer': {},
    // CSS 规范预设
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true,
      },
    },
    // 媒体查询合并
    'postcss-sort-media-queries': {},
  },
}
```

## 注意事项

- 内联配置会覆盖外部配置文件
- Vite 内置了 PostCSS 支持，无需额外配置
- `autoprefixer` 是推荐的前缀插件
- 可以使用 `.postcssrc`、`.postcssrc.js`、`postcss.config.js` 等配置文件
