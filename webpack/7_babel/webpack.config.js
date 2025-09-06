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
        // 为啥还要用babel？  因为webpack默认不会对js的es6的语法进行转化为es5、不会转化TypeScript，为此我们需要babel来完成这一转化，故使用babel-loader
        test: /\.m?js$/,
        // use: [
        //   {
        //     loader: "babel-loader",
        //     options: {
        //       plugins: [
        //         "@babel/plugin-transform-block-scoping",
        //         "@babel/plugin-transform-arrow-functions"
        //       ]
        //       // presets: [
        //       //   ["@babel/preset-env"]
        //       // ]
        //     }
        //   }
        // ],
        exclude: /node_modules/, // 确保不排除你的源码
        use: {
          loader: "babel-loader"
        }
      },
    ]
  }
}