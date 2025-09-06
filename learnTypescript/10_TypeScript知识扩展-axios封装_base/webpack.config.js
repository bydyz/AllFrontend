const path = require("path")
const HtmlWeabpckPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".cjs", ".json"]
  },
  devServer: {},
  module: {
    rules: [
      // ！  实际开发中，通常使用babel而不是ts-loader来处理 .ts 文件
      {
        test: /\.ts$/,
        loader: "ts-loader"
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWeabpckPlugin({
      template: "./index.html"
    })
  ]
}