# optimizeDeps.holdUntilCrawlEnd

控制依赖优化是否等待页面爬虫扫描完成后再返回结果。**（实验性功能）**

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`
- **状态**: 实验性（Experimental）

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    holdUntilCrawlEnd: false,  // 不等待爬虫扫描完成，立即返回已优化的依赖
  },
})
```

## 行为对比

| `holdUntilCrawlEnd` | 行为 |
|---------------------|------|
| `true`（默认） | 等待浏览器爬虫完成所有页面扫描后，再返回完整的预构建依赖列表 |
| `false` | 尽快返回已发现的依赖，爬虫发现的新依赖异步追加 |

## 注意事项

- 设为 `true` 可确保首次加载时依赖完整，避免二次请求
- 设为 `false` 可加快首屏响应速度
- 该功能标记为实验性，API 可能在未来版本中变更
- 适用于大型项目优化首次加载体验
