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
        use: [
          "style-loader", 
          "css-loader", 

          // 在webpack中使用postcss工具就是通过使用postcss-loader来的，它是一个可以借助插件功能的工具，故若要包含某些功能则还需要安装一些插件来进行使用
          // options里面添加的东西会被postcss-loader读取到    options的写法是固定地
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         "postcss-preset-env"
          //       ]
          //     }
                
          //   }
          // },

          // 将上面的配置抽离到postcss.config.js文件，会自动读取并使用该文件
          "postcss-loader"
        ]
      },
      {
        // test 利用正则 匹配此规则对那些文件进行处理
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"]
      }
    ]
  }
}