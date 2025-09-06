const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,

  // 配置别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/axios'),
        // 添加其他别名
      }
    }
  }
})
