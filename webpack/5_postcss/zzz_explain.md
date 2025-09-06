## 在 3，4 的基础上，添加 postcss-loader


## 什么是PostCSS呢？
postCSS是一个通过JavaScript来转换样式的工具；
这个工具可以帮助我们进行一些CSS的转换和适配，比如自动添加浏览器前缀、css样式的重置；
但是实现这些功能，我们需要借助于PostCSS对应的插件；

* 插件一：autoprefixer  对于css的样式兼容问题处理，会加上


## 如何使用PostCSS呢？主要就是两个步骤：
第一步：查找PostCSS在构建工具中的扩展，比如webpack中的postcss-loader；
第二步：选择可以添加你需要的PostCSS相关的插件；




## 事实上，在配置postcss-loader时，我们配置插件并不需要使用autoprefixer。

### 我们可以使用另外一个插件：postcss-preset-env
postcss-preset-env也是一个postcss的插件；
它可以帮助我们将一些现代的CSS特性，转成大多数浏览器认识的CSS，并且会根据目标浏览器或者运行时环境添加所需的
polyfill；
也包括会自动帮助我们添加autoprefixer（所以相当于已经内置了autoprefixer）；




## 除此外，postcss还有  处理特殊写法的颜色样式 如 #66666666 、 将px转化为rem/vm  的插件