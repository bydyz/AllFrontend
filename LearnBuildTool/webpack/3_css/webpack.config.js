const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path 需要绝对路径
    path: path.resolve(__dirname, "./build")
  },
  module: {
    rules: [
      {
        // test 利用正则 匹配此规则对那些文件进行处理
        test: /\.css$/,
        // use中多个loader的使用顺序是从后往前
        // 为css-loader只是负责将.css文件进行解析，并不会将解析之后的css插入到页面中
        // 如果我们希望再完成插入style的操作，那么我们还需要另外一个loader，就是style-loader；它是通过 页内样式的方式 及用style标签添加进来的
        //! 经过css-loader的处理，css会被解析成 js模块
        
        // use: [
        //   {
        //     loader: "style-loader"
        //   },
        //   {
        //     loader: "css-loader"
        //   }
        // ]

        // 简写一：如果只有一个loader
        // loader: "css-loader"

        // 简写二：use数组中的对象，除了loader没有其他属性
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}