const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path 需要绝对路径
    path: path.resolve(__dirname, "./build")
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      utils: path.resolve(__dirname, "./src/utils")
    }
  }
}