## 在2的基础上，添加对 .vue  文件的处理

### @vue/compiler-sfc来对template进行解析，安装 vue 时，会自动安装 @vue/compiler-sfc



### 注意，除了 vue-loader VueLoaderPlugin 需要配置外，因为写了 css 样式，所以还需要 css-loader style-loader 才可正常



### 在 webpack.config.js 中对 VueLoaderPlugin 进行配置的原因

1. 处理 .vue 文件中的多个块（Blocks）
Vue 单文件组件（SFC）通常包含三个部分：<template>、<script> 和 <style>，甚至可能包含自定义块（如 <docs>）。

VueLoaderPlugin 会确保这些块被正确解析，并分别交给对应的 loader 处理（如 vue-loader 处理 <template>，css-loader 处理 <style> 等）。

2. 自动应用匹配的规则
.vue 文件中的 <style> 块可能需要不同的 loader（如 css-loader、sass-loader），而 <script> 可能需要 babel-loader。

VueLoaderPlugin 会动态修改 Webpack 的配置，确保这些块能匹配到你在 Webpack 中定义的对应规则（比如 module.rules 中定义的 test: /\.css$/ 也会应用到 .vue 文件的 <style> 块）。

3. 支持热更新（HMR）
在开发环境下，VueLoaderPlugin 会配合 vue-loader 实现 Vue 组件的热模块替换（HMR），使得修改代码后无需刷新页面即可看到变化。

4. 处理资源路径转换
在 .vue 文件中，<template> 或 <style> 中引用的资源（如图片、字体等）会被 Webpack 正确处理，路径会被转换为最终的输出路径（尤其是在使用 file-loader 或 url-loader 时）。

为什么必须使用它？
如果没有 VueLoaderPlugin，vue-loader 可能无法正确处理 .vue 文件中的多个块，导致构建失败或样式、模板不生效。

它是 vue-loader 的配套插件，用于补充 Webpack 原生不支持的功能（如 SFC 的多块解析）。