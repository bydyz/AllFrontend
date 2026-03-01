const path = require("path")
const { VueLoaderPlugin } = require("vue-loader/dist/index")
// const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path 需要绝对路径
    path: path.resolve(__dirname, "./build"),
    // 代替使用 CleanWebpackPlugin c插件
    clean: true
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      utils: path.resolve(__dirname, "./src/utils")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    
    // 会删除旧的打包文件夹，然后生成新的   可在 output 里设置 clean: true 代替
    // new CleanWebpackPlugin(),

    // 会自动根据默认模板生成index.html
    // new HtmlWebpackPlugin(),

    new HtmlWebpackPlugin({
      // 修改未来生成的html的title
      title: "webpack项目",
      // 替换插件内置的默认模板
      template: "./index.html"
    }),

    // DefinePlugin 是webpack内置的插件，不需安装  写在后面的字符串会当成代码执行，若只想传入字符传，则还要加个单引号
    // 它默认有注入  process   里面有process.env.NODE_ENV，用于区分环境，会收到mode影响
    new DefinePlugin({
      BASE_URL: "'./'",
      VERSION: "1+1",
      MY_NAME: "'coderwhy'",
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false"
    })
  ]
}