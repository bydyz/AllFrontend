# 构建工具的高阶封装

vite 内部其实使用的是其他的构建工具，最核心的是Rollup

vite 底层是用 Rollup ，然后它也兼容了 Rollup 的插件，但并不是完全兼容，有一部分插件是不能用的

集成了一个 dev server



Vite 底层构建工具

Vite 7及之前          开发环境  esbuild      生产构建  Rollup
Vite 8 Beta及未来     开发环境  Rolldown     生产构建  Rolldown



# 历程

vite 是随着vue3正式版一起发布的一个工具

vite 1.0 的时候跟 vue 确实是有一定的绑定关系，起初它确实是一个为 vue 服务的工具
很快它经历了一次迭代，发布了2.0版本，自从2.0版本发布之后，那么它就是一个完全独立于前端框架的一个工具了，而不是跟vue有任何绑定的



# 和 Webpack Rollup 对比

vite 本身是没有自己的编译能力的，其编译能力源自于 esbuild 和 Rollup。即其本身并不参与编译，它只是集成了的功能，
然后它启动了dev server，然后它帮我们在中间去进行一个串联。去管理这些模块的一个图谱，然后去监听文件的更新来进行一些hmr的推送之类的。

vite 完全是基于 ESModule 的加载方式



Webpack dev server 是根据 Webpack 来实现的

对于 Webpack 来说，它编译出来的代码里面会有很多的 Webpack 的工具函数，来去帮助我们加载模块。比如说在浏览器当中，我们要去import一个另外的模块的时候，我们要去通过 script标签去引入这个js，
然后在js加载完之后，然后又要执行一个回调来去保证这个模块的加载完成。
Rollup则不会。

Vite 内置了很多的 loader

总之，Webpack 和 Rollup 更倾向于底层的工具    而 vite 是更高层次的封装，更方便使用

Vite  Webpack  Rollup  三者的对比有需要的话，可以私下多进行学习


