## 在 2 的基础上，学习如何使用 webpack 的插件

### Loader是用于特定的模块类型进行转换；
### Plugin可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等；






### CleanWebpackPlugin
重新打包时，利用 CleanWebpackPlugin 自动删除dist文件夹    npm install clean-webpack-plugin -D
```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

plugins: [
    // 会删除旧的打包文件夹，然后生成新的
    new CleanWebpackPlugin(),
  ]
```






### HtmlWebpackPlugin
我们前面的代码还有一个不太规范的地方：
  我们的HTML文件是编写在根目录下的，而最终打包的dist文件夹中是没有index.html文件的。
  在进行项目部署的时，必然也是需要有对应的入口文件index.html；
  所以我们也需要对index.html进行打包处理；
对HTML进行打包处理我们可以使用另外一个插件：HtmlWebpackPlugin； npm install html-webpack-plugin -D
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin")

plugins: [
    new HtmlWebpackPlugin({
      // 修改未来生成的html的title
      title: "webpack项目",
      // 替换插件内置的默认模板
      template: "./index.html"
    }),
  ]
```

#### 生成index.html分析
◼ 我们会发现，现在自动在dist文件夹中，生成了一个index.html的文件：
  该文件中也自动添加了我们打包的bundle.js文件；
◼ 这个文件是如何生成的呢？
  默认情况下是根据ejs的一个模板来生成的；
  在html-webpack-plugin的源码中，有一个default_index.ejs模块；







### DefinePlugin
这个时候编译还是会报错，因为在我们的模块中还使用到一个BASE_URL的常量：

这是因为在编译template模块时，有一个BASE_URL：
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">；
  但是我们并没有设置过这个常量值，所以会出现没有定义的错误；

这个时候我们可以使用DefinePlugin插件；DefinePlugin允许在编译时创建配置的全局常量，是一个webpack内置的插件（不需要单独安装）
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin")

plugins: [
    // DefinePlugin 是webpack内置的插件，不需安装  写在后面的字符串会当成代码执行，若只想传入字符传，则还要加个单引号
    // 它默认有注入  process   里面有process.env.NODE_ENV，用于区分环境，会收到mode影响
    new DefinePlugin({
      BASE_URL: "'./'",
      VERSION: "1+1",
      MY_NAME: "'coderwhy'",
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false"
    })
  ]
```




### Mode配置
Mode配置选项，可以告知webpack使用相应模式的内置优化：
  默认值是production（什么都不设置的情况下）；
  可选值有：'none' | 'development' | 'production'；

Mode配置的设置代表更多的默认配置