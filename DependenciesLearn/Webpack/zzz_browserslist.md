## 认识browserslist工具

◼ 安装babel时，会同步安装 browserslist
◼ 但是有一个问题，我们如何可以在css兼容性和js兼容性下共享我们配置的兼容性条件呢？
  就是当我们设置了一个条件： > 1%；
  我们表达的意思是css要兼容市场占有率大于1%的浏览器，js也要兼容市场占有率大于1%的浏览器；
  如果我们是通过工具来达到这种兼容性的，比如我们讲到的postcss-preset-env、babel、autoprefixer等
◼ 如何可以让他们共享我们的配置呢？
  这个问题的答案就是Browserslist；
◼ Browserslist是什么？Browserslist是一个在不同的前端工具之间，共享目标浏览器和Node.js版本的配置：
  Autoprefixer
  Babel
  postcss-preset-env
  eslint-plugin-compat
  stylelint-no-unsupported-browser-features
  postcss-normalize
  obsolete-webpack-plugin

```javascript
> 1%
last 3 versions
not dead
```






### 浏览器查询过程

◼ 我们可以编写类似于这样的配置：

```javascript
> 1%
last 3 versions
not dead
```

◼ 那么之后，这些工具会根据我们的配置来获取相关的浏览器信息，以方便决定是否需要进行兼容性的支持：
  条件查询使用的是caniuse-lite的工具，这个工具的数据来自于caniuse的网站上；






### Browserslist编写规则一：
◼ 那么在开发中，我们可以编写的条件都有哪些呢？（加粗部分是最常用的）
◼ defaults：Browserslist的默认浏览器（> 0.5%, last 2 versions, Firefox ESR, not dead）。
◼ 5%：通过全局使用情况统计信息选择的浏览器版本。 >=，<和<=工作过。
  5% in US：使用美国使用情况统计信息。它接受两个字母的国家/地区代码。
  > 5% in alt-AS：使用亚洲地区使用情况统计信息。有关所有区域代码的列表，请参见caniuse-lite/data/regions
  > 5% in my stats：使用自定义用法数据。
  > 5% in browserslist-config-mycompany stats：使用 来自的自定义使用情况数据browserslist-config-mycompany/browserslist-stats.json。
  cover 99.5%：提供覆盖率的最受欢迎的浏览器。
  cover 99.5% in US：与上述相同，但国家/地区代码由两个字母组成。
  cover 99.5% in my stats：使用自定义用法数据。
◼ dead：24个月内没有官方支持或更新的浏览器。现在是IE 10，IE_Mob 11，BlackBerry 10，BlackBerry 7， Samsung 4和OperaMobile 12.1。
◼ last 2 versions：每个浏览器的最后2个版本。
  last 2 Chrome versions：最近2个版本的Chrome浏览器。
  last 2 major versions或last 2 iOS major versions：最近2个主要版本的所有次要/补丁版本。


### Browserslist编写规则二：
◼ node 10和node 10.4：选择最新的Node.js10.x.x 或10.4.x版本。
  current node：Browserslist现在使用的Node.js版本。
  maintained node versions：所有Node.js版本，仍由 Node.js Foundation维护。
◼ iOS 7：直接使用iOS浏览器版本7。
  Firefox > 20：Firefox的版本高于20 >=，<并且<=也可以使用。它也可以与Node.js一起使用。
  ie 6-8：选择一个包含范围的版本。
  Firefox ESR：最新的[Firefox ESR]版本。
  PhantomJS 2.1和PhantomJS 1.9：选择类似于PhantomJS运行时的Safari版本。
◼ extends browserslist-config-mycompany：从browserslist-config-mycompanynpm包中查询 。
◼ supports es6-module：支持特定功能的浏览器。
  es6-module这是“我可以使用” 页面feat的URL上的参数。有关所有可用功能的列表，请参见 。caniuse-lite/data/features
◼ browserslist config：在Browserslist配置中定义的浏览器。在差异服务中很有用，可用于修改用户的配置，例如 browserslist config and supports es6-module。
◼ since 2015或last 2 years：自2015年以来发布的所有版本（since 2015-03以及since 2015-03-10）。
◼ unreleased versions或unreleased Chrome versions：Alpha和Beta版本。
◼ not ie <= 8：排除先前查询选择的浏览器。






### 命令行使用browserslist
◼ 我们可以直接通过命令来查询某些条件所匹配到的浏览器：
  npx browserslist ">1%, last 2 version, not dead"

  在使用 npx browserslist ">1%, last 2 versions, not dead" 时，多个条件之间的关系是 逻辑或（OR），即浏览器只需满足其中任意一个条件就会被包含在结果中。
  输出含 Chrome 79，未显式排除 Chrome 中比 79高的版本，则高版本均兼容

◼ 运行以下命令，显式检查 Chrome 80 是否被包含：
  npx browserslist "Chrome 80"

  如果有输出（如 chrome 80）：表示兼容。
  如果无输出：表示不兼容。






### 配置browserslist
◼ 我们如何可以配置browserslist呢？两种方案：
  方案一：在package.json中配置；
  方案二：单独的一个配置文件.browserslistrc文件；直接新建即可






### 设置目标浏览器 browserslist
◼ 我们最终打包的JavaScript代码，是需要跑在目标浏览器上的，那么如何告知babel我们的目标浏览器呢？
  browserslist工具
  target属性

  通过targets来进行配置
  ```javascript
  module: {
    rules: [
      {
        // 为啥还要用babel？  因为webpack默认不会对js的es6的语法进行转化为es5、不会转化TypeScript，为此我们需要babel来完成这一转化，故使用babel-loader
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {
                targets: "last 2 version"
              }]
            ]
          }
        }
      },
    ]
  }
  ```

◼ 那么，如果两个同时配置了，哪一个会生效呢？
  配置的targets属性会覆盖browserslist；
  但是在开发中，更推荐通过browserslist来配置，因为类似于postcss工具，也会使用browserslist，进行统一浏览器的适配；