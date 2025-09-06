## 在 2 的基础上，添加 对图片打包的配置

## 我们当前使用的webpack版本是webpack5：
在webpack5之前，加载这些资源我们需要使用一些loader，比如raw-loader 、url-loader、file-loader；
在webpack5开始，我们可以直接使用资源模块类型（asset module type），来替代上面的这些loader；


## 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
asset/resource 发送一个单独的文件并导出 URL。
  ✓ 之前通过使用 file-loader 实现；
  此种方式，即是将现有的图片复制并重命名后放到打包文件中
asset/inline 导出一个资源的 data URI。
  ✓ 之前通过使用 url-loader 实现；
  此种方式，即是将现有的图片进行base64编码后，将源码后放到生成的js文件中
asset/source 导出资源的源代码
  ✓ 之前通过使用 raw-loader 实现；
asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。
  ✓ 之前通过使用 url-loader，并且配置资源体积限制实现；
  此种方式，即是根据配置的图片大小取舍，选择对应大小范围的图片用方式一或者方式二进行处理


