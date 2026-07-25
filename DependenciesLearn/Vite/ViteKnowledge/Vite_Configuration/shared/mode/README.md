# mode - 模式

指定构建模式，影响环境变量加载和构建行为。

## 配置方式

- **类型**: `string`
- **默认值**: 开发服务器为 `'development'`，构建为 `'production'`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 自定义模式
  mode: 'staging',
})
```

## 进阶配置

通过命令行 `--mode` 参数覆盖配置：

```bash
# 使用 staging 模式启动开发服务器
vite --mode staging

# 使用 staging 模式构建
vite build --mode staging
```

不同模式加载不同的环境变量文件：

```
.env                # 所有模式都会加载
.env.local          # 所有模式都会加载，被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，被 git 忽略
```

例如 `staging` 模式会加载：
- `.env`
- `.env.local`
- `.env.staging`
- `.env.staging.local`

## 注意事项

- 模式名称会影响环境变量文件的加载
- 内置模式：`development`、`production`、`test`
- 自定义模式可以用于区分不同部署环境（staging、preview 等）
