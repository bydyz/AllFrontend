# 用法

*** 

# 实例

## 实例一

```json
"exports": {
  ".": {
    "types": {
      "require": "./index.d.cts",
      "default": "./index.d.ts"
    },
    "browser": {
      "require": "./dist/browser/axios.cjs",
      "default": "./index.js"
    },
    "default": {
      "require": "./dist/node/axios.cjs",
      "default": "./index.js"
    }
  },
  "./lib/adapters/http.js": "./lib/adapters/http.js",
  "./lib/adapters/xhr.js": "./lib/adapters/xhr.js",
  "./unsafe/*": "./lib/*",
  "./unsafe/core/settle.js": "./lib/core/settle.js",
  "./unsafe/core/buildFullPath.js": "./lib/core/buildFullPath.js",
  "./unsafe/helpers/isAbsoluteURL.js": "./lib/helpers/isAbsoluteURL.js",
  "./unsafe/helpers/buildURL.js": "./lib/helpers/buildURL.js",
  "./unsafe/helpers/combineURLs.js": "./lib/helpers/combineURLs.js",
  "./unsafe/adapters/http.js": "./lib/adapters/http.js",
  "./unsafe/adapters/xhr.js": "./lib/adapters/xhr.js",
  "./unsafe/utils.js": "./lib/utils.js",
  "./package.json": "./package.json"
}
```

* "." 表示主入口，也就是当用户使用 import 'your-package' 或 require('your-package') 时使用的路径。
* 其他条目是子路径导出，例如：import 'your-package/lib/adapters/http.js'。<br><br>


### 针对上面的 types 部分

即
```json
".": {
  "types": {
    "require": "./index.d.cts",
    "default": "./index.d.ts"
  }
}
```

假设我们有一个使用了 axios 的 TypeScript 项目，并且配置了上述 tsconfig.json。

#### 举例一 : 使用 ES Module 导入（import）

```typescript
import axios from 'axios';

axios.get('/user'); // 使用 axios
```

  * 因为使用的是 import 语法，TypeScript 会认为这是一个 ES Module 导入。

  * 在解析 axios 包的类型时，TypeScript 会查看其 exports 中的 "." 入口。

  * 在 "." 下，它会找到 types 字段，并根据当前导入方式匹配条件：

    * 由于是 import，不会匹配 require 条件，因此会回退到 default 条件。

  * 最终 TypeScript 使用 ./index.d.ts 文件作为类型声明。<br><br>


#### 举例二 : 使用 CommonJS 导入（require）

```typescript
const axios = require('axios');

axios.get('/user');
```

  * 使用 require() 导入，TypeScript 会将其识别为 CommonJS 导入。

  * 在解析类型时，匹配 types 中的 require 条件，使用 ./index.d.cts 文件。<br><br>


#### 两种举例的总结

总的来说，似乎，两种使用方式，除了会导入要使用的 js/ts 内容外，还会同时导入使用响应的 .d.ts 内容<br><br>


#### 为什么需要区分两种类型文件？

CommonJS 和 ES Module 在模块系统上有一些本质差异，例如：

  * 默认导出：在 CommonJS 中，模块通常通过 module.exports 导出，而 TypeScript 会将其类型表述为 export = 的形式；在 ES Module 中则使用 export default。

  * 命名空间：require 导入的结果通常是一个对象，而 import * as 可能会产生不同的类型结构。

因此，axios 需要为两种模块格式分别提供类型声明，以确保类型检查的准确性。例如：

  * index.d.ts（用于 ES Module）可能包含 export default axios; 这样的声明。

  * index.d.cts（用于 CommonJS）可能包含 export = axios; 这样的声明。

.d.cts 是 TypeScript 专门为 CommonJS 模块提供的声明文件扩展名（类似于 .cts 是 CommonJS 的 TypeScript 源文件扩展名），它告诉 TypeScript 这个文件对应的是 CommonJS 模块的类型。<br><br>


#### 实际效果

在开发环境中，当你编写代码时，IDE（如 VSCode）会根据你当前文件的模块系统（由 tsconfig.json 和文件扩展名决定）自动选择正确的类型文件，从而提供准确的代码补全和类型检查。

例如：

  * 如果你的文件是 .mts（ES Module），则使用 index.d.ts。

  * 如果你的文件是 .cts（CommonJS），则使用 index.d.cts。

  * 如果你的文件是普通 .ts，但 tsconfig.json 设置了 "module": "NodeNext"，TypeScript 会根据导入语句的语法（import 或 require）来决定匹配哪个条件。。<br><br>


### 针对上面的 browser 和 default 部分

即
```json
".": {
  "browser": {
    "require": "./dist/browser/axios.cjs",
    "default": "./index.js"
  },
  "default": {
    "require": "./dist/node/axios.cjs",
    "default": "./index.js"
  }
}
```

允许包作者根据不同的运行环境（浏览器、Node.js）以及模块系统（CommonJS、ES Module）提供不同的入口文件。Axios 的配置正是利用这一点，确保在浏览器和 Node.js 环境中都能正确运行


总结：

  * browser 条件：当模块在浏览器环境（或打包工具标记为浏览器环境）中解析时匹配。

  * default 条件：回退条件，当没有其他更具体的条件匹配时使用（通常对应 Node.js 环境）。

  * 每个条件内部又按模块系统细分：

    * require：当使用 require() 导入（CommonJS）时使用。

    * default：当使用 import 导入（ES Module）或未匹配到 require 时使用。

## 实例二

以下是 vite依赖的package.json 的内容

```json
"exports": {
  ".": "./dist/node/index.js",
  "./client": {
    "types": "./client.d.ts"
  },
  "./module-runner": "./dist/node/module-runner.js",
  "./dist/client/*": "./dist/client/*",
  "./types/*": {
    "types": "./types/*"
  },
  "./types/internal/*": null,
  "./package.json": "./package.json"
},
```


***


本句通常是写在一个 .d.ts文件 中，作用是 往工程中引入别的 .d.ts文件 ， 使用的就是上面 exports 中的  ./client 这一映射路径，即是拿到了 与 vite依赖中的 package.json 同层级的 client.d.ts

```typescript
/// <reference types="vite/client" />
```


<br><br>


通配符路径 "./types/*"（仅类型）

```typescript
import type { SomeType } from 'some-package/types/some-type';
// 或者
import type * as Types from 'some-package/types';
```


<br><br>


禁止访问的路径 "./types/internal/*"

含义：明确禁止导入 types/internal/ 下的任何文件。如果尝试导入，Node.js 或打包工具会抛出错误（如 Package subpath './types/internal/xxx' is not defined）。


## 实例三