const path = require("path");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path 需要绝对路径
    path: path.resolve(__dirname, "./build"),
    clean: true,
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".vue", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  devServer: {
    // 控制是否开启热更新，默认开启
    hot: true,
    host: "0.0.0.0",
    port: 8888,
    open: {
      // 设置打开的页面
      // target: ['login/index.html'],
      // 设置打开的浏览器
      app: {
        name: "chrome",
      },
    },
  },
  module: {
    rules: [
      {
        // test 利用正则 匹配此规则对那些文件进行处理
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      // 修改未来生成的html的title
      title: "webpack项目",
      // 替换插件内置的默认模板
      template: "./index.html",
    }),

    // DefinePlugin 是webpack内置的插件，不需安装  写在后面的字符串会当成代码执行，若只想传入字符传，则还要加个单引号
    // 它默认有注入  process   里面有process.env.NODE_ENV，用于区分环境，会收到mode影响
    new DefinePlugin({
      BASE_URL: "'./'",
    }),
  ],
};
