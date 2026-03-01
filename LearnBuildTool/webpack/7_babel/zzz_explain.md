## Babel是一个工具链，主要用于旧浏览器或者环境中将ECMAScript 2015+代码转换为向后兼容版本的JavaScript；


## 开发中，我们想要使用ES6+的语法，想要使用TypeScript，开发React项目，它们都是离不开Babel的；


## babel本身可以作为一个独立的工具（和postcss一样），可以不和webpack等构建工具配置，即可单独使用。


## 如果我们希望在命令行尝试使用babel，需要安装如下库：
@babel/core：babel的核心代码，必须安装；
@babel/cli：可以让我们在命令行使用babel；






## 使用babel来处理我们的源代码：
src：是源文件的目录；
--out-dir：指定要输出的文件夹dist；

npx babel src --out-dir dist






## babel插件的使用

### 比如我们需要转换箭头函数，那么我们就可以使用箭头函数转换相关的插件：
npm install @babel/plugin-transform-arrow-functions -D
npx babel src --out-dir dist --plugins=@babel/plugin-transform-arrow-functions

### 需要使用 plugin-transform-block-scoping 来将 const 转成 var
npm install @babel/plugin-transform-block-scoping -D 
npx babel src --out-dir dist --plugins=@babel/plugin-transform-block-scoping
,@babel/plugin-transform-arrow-functions



### Babel的预设preset，可完成上述两项功能
npm install @babel/preset-env -D
npx babel src --out-dir dist --presets=@babel/preset-env

除此外，还有关于 转化 react、TypeScript 的babel预设





## 在 webpack 中使用 babel
npm install babel-loader -D     安装这个时会自动安装 @babel/core