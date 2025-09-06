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
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  module: {
    rules: [
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