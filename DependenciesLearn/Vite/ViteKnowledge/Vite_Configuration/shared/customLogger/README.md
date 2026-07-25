# customLogger - 自定义日志

配置自定义日志记录器，用于覆盖 Vite 的默认日志行为。

## 配置方式

- **类型**: `Logger`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

const customLogger = {
  info: (msg, options) => console.log(`[INFO] ${msg}`),
  warn: (msg, options) => console.warn(`[WARN] ${msg}`),
  warnOnce: (msg, options) => console.warn(`[WARN-ONCE] ${msg}`),
  error: (msg, options) => console.error(`[ERROR] ${msg}`),
  clearScreen: () => {},
  hasErrorLogged: () => false,
}

export default defineConfig({
  customLogger,
})
```

## 进阶配置

使用第三方日志库：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import pino from 'pino'

const logger = pino({
  level: 'info',
})

const customLogger = {
  info: (msg, options) => logger.info(msg),
  warn: (msg, options) => logger.warn(msg),
  warnOnce: (msg, options) => logger.warnOnce(msg),
  error: (msg, options) => logger.error(msg),
  clearScreen: () => {},
  hasErrorLogged: () => false,
}

export default defineConfig({
  customLogger,
})
```

写入日志文件：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import fs from 'fs'

const logStream = fs.createWriteStream('vite.log', { flags: 'a' })

const customLogger = {
  info: (msg, options) => {
    console.log(msg)
    logStream.write(`[INFO] ${msg}\n`)
  },
  warn: (msg, options) => {
    console.warn(msg)
    logStream.write(`[WARN] ${msg}\n`)
  },
  error: (msg, options) => {
    console.error(msg)
    logStream.write(`[ERROR] ${msg}\n`)
  },
  clearScreen: () => {},
  hasErrorLogged: () => false,
}

export default defineConfig({
  customLogger,
})
```

## 注意事项

- 自定义日志会覆盖所有 Vite 日志行为
- 必须实现所有 Logger 接口方法
- `hasErrorLogged` 方法用于检查是否已记录错误
- 日志格式和时间戳需要自行处理
- 建议保留 `clearScreen` 和 `hasErrorLogged` 的默认实现
