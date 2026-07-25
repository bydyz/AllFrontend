module.exports = {
  // plugins: [
  //   "@babel/plugin-transform-arrow-functions",
  //   "@babel/plugin-transform-block-scoping"
  // ],
  presets: [
    [
      "@babel/preset-env",
      {
        // targets 可以提取到根目录下的 .browserslistrc 统一配置
        // targets: "defaults",
        // targets: "ie 11", // 或明确指定低版本环境

        debug: true, // 启用调试日志，查看哪些插件被应用
        
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ]
}