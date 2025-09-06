const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path 需要绝对路径
    path: path.resolve(__dirname, "./build"),
    // assetModuleFilename: "img/[name]_[hash:6][ext]"
  },
  module: {
    rules: [
      {
        // test 利用正则 匹配此规则对那些文件进行处理
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      // webpack中已内置相关的处理功能，用type告诉webpack用什么处理
      {
        test: /\.(jpe?g|png|svg|gif)$/,

        // 打包两张图片，图片的名字会通过hash算法重命名，并且这两张图片有自己的地址，然后会将地址设置到需要用到的地方
        // 缺点：相对于 "asset/inline" 要多图片加载的网络请求
        // type: "asset/resource",

        // 把图片进行base64编码 (data:image/图片后缀名;base64,...)，然后将编码后的代码放到需要用到的地方
        // 缺点：造成js文件非常大，下载js文件本身消耗时间非常长，造成js代码的下载和解析/执行时间过长，导致阻塞
        // type: "asset/inline",

        // 合理的规范：对于小一点的图片，可进行base64编码；对于大一点的图片，进行单独的图片打包，形成url地址，单独的请求这个url图片，此时需要用asset类型并进行配置

        type: "asset",
        // 倘若没有这个配置，复制的图片的名称则只含有 哈希编码
        generator: {
          // 资源图片格式，也可在上面写  assetModuleFilename: "img/[name]_[hash:6][ext]"，此时是所有的资源皆叫该名称，包括后面的静态字体
          // 写在此则是对特定的文件进行配置  [] 是占位符  name指向原来的图片名称  ext是原来图片的拓展名  hash:6 取hash值的前八位使用  img/ 相当于多了个文件夹
          filename: "img/[name]_[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            // 大于此尺寸打包，小于则进行编码，单位是 B
            maxSize: 40 * 1024
          }
        }
      },
    ]
  }
}