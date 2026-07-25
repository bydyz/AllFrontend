# assetsInclude - 静态资源包含

指定哪些文件类型应该被视为静态资源，会被 Vite 的资源处理管道处理。

## 配置方式

- **类型**: `string | RegExp | (string | RegExp)[]`

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // 将 .glsl 文件视为静态资源
  assetsInclude: '**/*.glsl',
})
```

## 进阶配置

使用多种模式：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  assetsInclude: [
    // GLSL 着色器文件
    '**/*.glsl',
    '**/*.wgsl',
    // 3D 模型文件
    '**/*.glb',
    '**/*.gltf',
    // 音频文件
    '**/*.mp3',
    '**/*.wav',
    // 使用正则表达式
    /\.(glsl|wgsl|vert|frag)$/,
  ],
})
```

## 注意事项

- 默认的静态资源类型：图片、字体、媒体、wasm
- 添加自定义类型后，这些文件会被 Vite 处理和优化
- 可以使用 glob 模式或正则表达式
- 添加过多类型可能影响构建性能
