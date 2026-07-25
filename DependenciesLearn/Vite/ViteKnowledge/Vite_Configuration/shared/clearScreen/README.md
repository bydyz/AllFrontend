# clearScreen - 清屏

控制 Vite 启动时是否清除终端屏幕。

## 配置方式

- **类型**: `boolean`
- **默认值**: `true`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  clearScreen: true,
})
```

## 进阶配置

禁用清屏：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 保留终端之前的输出
  clearScreen: false,
})
```

## 注意事项

- `true`：启动时清除终端屏幕（默认）
- `false`：保留终端之前的输出
- 禁用清屏后，Vite 的输出会追加到现有内容后面
- CI/CD 环境中建议禁用以保留完整日志
- 多个终端窗口时，禁用清屏可以避免误清其他窗口
