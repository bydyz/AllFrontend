import _ from 'lodash' 需要放在 type=module 中，若像此原生使用时会报一下错误

Uncaught TypeError: Failed to resolve module specifier "lodash". Relative references must start with either "/", "./", or "../".Understand this errorAI


### 错误原因
  1.浏览器限制：

    浏览器原生的 ES Modules 仅支持以下路径形式：

    相对路径（./module.js）

    绝对路径（/src/module.js）

    完整的 URL（https://example.com/module.js）

    不支持直接导入 node_modules 中的包名（如 lodash），因为浏览器无法自动定位到 node_modules 目录。

  2.打包工具的作用：

    在 Webpack、Vite、Rollup 等工具中，它们会通过 resolve.alias 或 node_modules 解析机制，将 import "lodash" 转换为实际的文件路径（如 ./node_modules/lodash/lodash.js）。

    但浏览器没有这种能力，因此会报错。


### 解决方案
根据你的开发环境，选择以下方法之一：

1. 使用 CDN 的 ES Module 版本
直接通过 URL 导入 lodash 的 ESM 版本（推荐在浏览器中直接使用）：
```javascript
import _ from 'https://cdn.skypack.dev/lodash';
// 或
import _ from 'https://unpkg.com/lodash-es';
```


2. 使用打包工具（Webpack/Vite/Rollup）
在项目中配置打包工具，让工具处理模块解析.


3. 使用 importmap（实验性功能）
在 HTML 中定义 importmap，告诉浏览器如何解析 lodash：

```html
<script type="importmap">
  {
    "imports": {
      "lodash": "https://cdn.skypack.dev/lodash"
    }
  }
</script>
<script type="module">
  import _ from 'lodash'; // 现在可以正常解析
  console.log(_.chunk([1, 2, 3], 2));
</script>
```
注意：importmap 的浏览器兼容性有限（Chrome >= 89，Firefox >= 108）。