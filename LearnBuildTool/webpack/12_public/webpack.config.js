const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",

  entry: "./src/main.js",
  output: {
    filename: "test.js",
    path: path.resolve(__dirname, "./dist")
  },

  

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", "css-loader"
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      //！ 替换插件内置的默认模板
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    //！ 最新版本号是 12.0.2  用node14.21.1会有问题，用16.20.0则行
    //！ 可以到GitHub上查看，所需的最小node版本
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: './',
          //！ 上面的 HtmlWebpackPlugin 指定 index.html 的模板时，似乎就有将其指定的html 弄到 dist 的操作，因此此处若不忽略，最终会报错 ERROR in Conflict: Multiple assets emit different content to the same filename index.html
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
  ],
}