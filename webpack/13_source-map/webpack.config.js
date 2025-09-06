const path = require("path")

module.exports = {
  devtool: 'source-map',
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path 需要绝对路径
    path: path.resolve(__dirname, "./build")
  }
}