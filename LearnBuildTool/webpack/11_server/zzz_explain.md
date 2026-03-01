## 在8的基础上，添加对 自动编译的支持

### 为了完成自动编译，webpack提供了几种可选的方式：
  webpack watch mode；
  webpack-dev-server（常用）；
  webpack-dev-middleware；



### webpack-dev-server
它会对代码进行打包，然后将打包好的文件放到内存里，并不会写到本地，然后它会开启一个服务器，从内存中读取打包好的文件进行使用

npm install webpack-dev-server -D   然后就可以使用了。

此时改了一个地方，整个项目都会重新打包，然后刷新浏览器。为了避免这种情况，就出现了 模块热替换（HMR） 技术

修改配置文件，启动时加上serve参数：
```javascript
devServer: {
  // 控制是否开启热更新，默认开启
  hot: true,
  host: "0.0.0.0",
  port: 8888,
  open: {
    // 设置打开的页面
    target: ['login/index.html'],
    // 设置打开的浏览器
    app: {
      name: 'chrome'
    }
  }
},

"serve": "webpack serve --mode=development",
```
◼ host设置主机地址：
  默认值是localhost；
  如果希望其他地方也可以访问，可以设置为 0.0.0.0；
◼ localhost 和 0.0.0.0 的区别：
  localhost：本质上是一个域名，通常情况下会被解析成127.0.0.1;
  127.0.0.1：回环地址(Loop Back Address)，表达的意思其实是我们主机自己发出去的包，直接被自己接收;
    ✓ 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ;
    ✓ 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的; 
    ✓ 比如我们监听 127.0.0.1时，在同一个网段下的主机中，通过ip地址是不能访问的;
  0.0.0.0：监听IPV4上所有的地址，再根据端口找到不同的应用程序;
    ✓ 比如我们监听 0.0.0.0时，在同一个网段下的主机中，通过ip地址是可以访问的;

◼ open是否打开浏览器：
  默认值是false，设置为true会打开浏览器；
  也可以设置为类似于 Google Chrome等值；
◼ compress是否为静态文件开启gzip compression：
  默认值是false，可以设置为true；
  会对打包的文件进行压缩，即变为 gzip ，浏览器下载下来的就是 gzip 即 Content-Encoding: gzip ，然后会进行解压





### 模块热替换（HMR）
◼ 什么是HMR呢？
  HMR的全称是Hot Module Replacement，翻译为模块热替换；
  模块热替换是指在 应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个页面；
◼ HMR通过如下几种方式，来提高开发的速度：
  不重新加载整个页面，这样可以保留某些应用程序的状态不丢失；
  只更新需要变化的内容，节省开发的时间；
  修改了css、js源代码，会立即在浏览器更新，相当于直接在浏览器的devtools中直接修改样式；
◼ 如何使用HMR呢？
  默认情况下，webpack-dev-server已经支持HMR，我们只需要开启即可（默认已经开启）；
  在不开启HMR的情况下，当我们修改了源代码之后，整个页面会自动刷新，使用的是live reloading；





### 改 .vue  文件，有热更新功能
◼ 有一个问题：在开发其他项目时，我们是否需要经常手动去写入 module.hot.accpet相关的API呢？
  比如开发Vue、React项目，我们修改了组件，希望进行热更新，这个时候应该如何去操作呢？
◼ 事实上社区已经针对这些有很成熟的解决方案了：
  比如vue开发中，我们使用vue-loader，此loader支持vue组件的HMR，提供开箱即用的体验；
  比如react开发中，有React Hot Loader，实时调整react组件（目前React官方已经弃用了，改成使用react-refresh）；