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

  // devServer: {
  //   port: 6000,
  //   proxy: {
  //     '/': {
  //       target: 'https://nccw.armpc.cn:8081/gateway',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/u-auth': '/u-auth',
  //         '^/u-admin': '/u-admin',
  //         '^/basic': '/basic',
  //         '^/logistics': '/logistics',
  //       }
  //     }
  //   }
  // },

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