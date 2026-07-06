# build.rollupOptions.input 支持三种配置方式：字符串 (String)、数组 (Array) 和对象 (Object)。

* 字符串：用于单入口。
* 数组：用于多入口，但无法自定义输出文件名。
* 对象：用于多入口，且可以精确控制每个入口的输出文件名。


## 📝 三种配置方式详解

### 字符串 (String)：最简单的单入口

* 语法：input: 'src/main.js'
* 含义：指定唯一的打包入口文件。Vite 会以此文件为起点，分析所有依赖并打包。
* 适用场景：标准的单页应用（SPA）。
* 注意：在 Vite 项目中，如果入口是 JS 文件而非 HTML，则不会自动生成 HTML 文件。同时，你需要手动引入模块预加载 polyfill。

### 数组 (Array)：基础的多入口

* 语法：input: ['src/page1.js', 'src/page2.js']
* 含义：指定多个独立的入口文件。Rollup 会为每个入口生成独立的输出块 (chunk)。
* 适用场景：简单的多页应用（MPA），且对输出文件的命名没有特殊要求。
* 注意：
  * 必须配合 output.dir 使用，指定输出目录。
  * 输出文件的默认名称是入口文件名，但可通过 output.entryFileNames 自定义命名模式。

### 对象 (Object)：完全可控的多入口（MPA 首选）

* 语法：input: { home: 'src/home.js', about: 'src/about.js' }
* 含义：以键值对的形式指定多个入口。
  * 键 (Key)：作为入口的唯一标识符 (chunk name)，会直接影响最终输出文件的名称。例如，键为 home，最终可能生成 home.[hash].js。
  * 值 (Value)：入口文件的绝对路径。
* 适用场景：复杂的 MPA 项目，需要对每个页面的输出文件进行精确控制。
* 注意：
  * 必须配合 output.dir 使用。
  * 在 Vite 项目中，为了得到一个完整的 MPA（包含 HTML），对象的值通常应指向 index.html 文件，而非 JS 文件。


## 🚀 进阶配置：动态生成入口

当页面数量众多时，手动维护 input 对象会变得繁琐。此时，可以借助 glob 等工具，在配置文件中动态扫描并生成入口对象。

这是一个使用 glob 库自动扫描 src/pages 下所有 *.js 文件作为入口的示例：
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        globSync('src/pages/**/*.js').map(file => [
          // 1. 生成入口名称 (key)
          path.relative('src/pages', file.slice(0, file.length - path.extname(file).length)),
          // 2. 获取文件的绝对路径 (value)
          fileURLToPath(new URL(file, import.meta.url))
        ])
      )
    }
  }
});
```

> 注意：此示例生成的是 JS 入口。在 Vite 的 MPA 中，你通常需要扫描的是 index.html 文件。


## ⚠️ 关键注意事项

配置 input 时，有两个核心要点需要特别留意：
  1. 路径必须是绝对路径：Rollup 需要明确的绝对路径来确定文件位置，不推荐使用相对路径。在 vite.config.js 中，最稳健的方式是使用 path.resolve(__dirname, '...') 来构建绝对路径。
  2. HTML 入口 vs JS 入口：在 Vite 项目中，input 指向 HTML 文件是构建完整网页的标准做法。如果指向 JS 文件，则只会生成 JS bundle，而不会生成 HTML 文件。