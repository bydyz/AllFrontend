## polyfill 是借由 babel 发挥作用的，因此需要先安装babel-loader

## 认识polyfill
◼ Polyfill是什么呢？
  翻译：一种用于衣物、床具等的聚酯填充材料, 使这些物品更加温暖舒适；
  理解：更像是应该填充物（垫片），一个补丁，可以帮助我们更好的使用JavaScript；
◼ 为什么时候会用到polyfill呢？
  比如我们使用了一些语法特性（例如：Promise, Generator, Symbol等以及实例方法例如Array.prototype.includes等）
  但是某些浏览器压根不认识这些特性，必然会报错；
  我们可以使用polyfill来填充或者说打一个补丁，那么就会包含该特性了；
    就是将浏览器不支持的api，通过打补丁的方式添加进浏览器，这样在该浏览器就可以使用那些特殊的api了


## 如何使用polyfill？
◼ babel7.4.0之后，可以通过单独引入core-js和regenerator-runtime来完成polyfill的使用：
  npm install core-js regenerator-runtime --save
  ```javascript
module.exports = {
  // plugins: [
  //   "@babel/plugin-transform-arrow-functions",
  //   "@babel/plugin-transform-block-scoping"
  // ],

  // presets: [
  //   "@babel/preset-env"
  // ]

  // presets: [
  //   [
  //     "@babel/preset-env",
  //     {
  //       corejs: 3,
  //       useBuiltIns: 'usage'
  //     }
  //   ]
  // ]

  presets: [
    [
      "@babel/preset-env",
      {
        // targets 可以提取到根目录下的 .browserslistrc 统一配置
        // targets: "defaults",
        targets: "ie 11", // 或明确指定低版本环境
        debug: true, // 启用调试日志，查看哪些插件被应用
        
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ]
}
  ```

### 配置babel.config.js
◼ 我们需要在babel.config.js文件中进行配置，给preset-env配置一些属性：
◼ useBuiltIns：设置以什么样的方式来使用polyfill；
◼ corejs：设置corejs的版本，目前使用较多的是3.x的版本，比如我使用的是3.8.x的版本；
  另外corejs可以设置是否对提议阶段的特性进行支持；
  设置 proposals属性为true即可；


### useBuiltIns属性设置
useBuiltIns 是 @babel/preset-env 中控制 polyfill 注入方式的核心配置，共有三种模式：

1. false（默认值）
  * 不自动注入任何 polyfill
  * 举例
  ```javascript
  {
    "presets": [
      ["@babel/preset-env", {
        "useBuiltIns": false,
        "corejs": 3 // 仍需指定版本但不会使用
      }]
    ]
  }
  ```



2. "entry"（入口模式）
  * 需在入口文件顶部显式导入：
    ```javascript
    import "core-js/stable";
    import "regenerator-runtime/runtime";
    ```
  * 根据browserslist目标环境，全量替换为需要的 polyfill

```javascript
  {
    "presets": [
      ["@babel/preset-env", {
        "useBuiltIns": "entry",
        "corejs": { 
          "version": 3,
          "proposals": true // 包含提案阶段的polyfill
        }
      }]
    ]
  }


  // 输入
  import "core-js/stable";
  // 输出（根据目标浏览器）
  import "core-js/modules/es.array.includes";
  import "core-js/modules/es.promise";
  // ...其他所需polyfill
```

最终导入的 polyfill 由两个因素共同决定：
   1. 入口文件手动导入的全量 polyfill（触发起点） (也可以更加细致具体，导入具体需要的)
   2. Babel 根据 browserslist 配置的智能筛选 过滤掉支持的api,最终保留不支持api的polyfill（实际生效内容）



3. "usage"（按需模式）
  * 静态分析代码中使用到的 API
  * 按需注入目标环境不支持的 polyfill
  * 不需要手动导入
```javascript
  {
    "presets": [
      ["@babel/preset-env", {
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": false // 默认不包含提案
        }
      }]
    ]
  }
```

  工作流程
    1. 检测代码中的高级 API（如 Array.from）
    2. 检查 browserslist 目标环境是否支持
    3. 不支持时自动插入对应 polyfill