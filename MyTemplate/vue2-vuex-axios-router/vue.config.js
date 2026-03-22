const path = require('path')

module.exports = {
  // runtimeCompiler 体积大 、 可以使用template模板 、 有Vue.compile API
  runtimeCompiler: true,
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',
  /* 开发服务器 配置 */
  devServer: {
    port: 8080,
    proxy: {
      '/': {
        target: 'https://nccw.armpc.cn:8081/gateway',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/u-auth': '/u-auth',
          '^/u-admin': '/u-admin',
          '^/basic': '/basic',
          '^/logistics': '/logistics',
        }
      }
    }
  },

  /* 打包 配置 */
  configureWebpack: {
    output: {
      filename: `js/[name]-[hash].js`,
      chunkFilename: `js/[name]-[hash].js`
    }
  },

  /* 公共样式变量 配置 */

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      addStyleResource(config.module.rule('stylus').oneOf(type))
      addPostCSS(config.module.rule('css').oneOf(type))
    })

    config.resolve.alias.set('@', path.join(__dirname, './src'))


    // 配置处理svg
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    // 添加svg新的loader处理
    svgRule.test(/\.svg$/).use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]'
    })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(path.join(__dirname, './src/assets/svg'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    config.plugins.delete('named-chunks')

    // i18n 配置
    config.module.rule('i18n').resourceQuery(/blockType=i18n/).type('javascript/auto').use('i18n').loader('@kazupon/vue-i18n-loader').end()
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: []
    },
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      includeLocales: true,
      enableBridge: false
    }
  }
}

function addStyleResource(rule) {
  rule.use('style-resource').loader('style-resources-loader').options({
    patterns: [path.resolve(__dirname, './src/style/constants/index.styl')] // 公共stylus变量 路径
  })
}

function addPostCSS(rule) {
  rule.use('postcss').loader('postcss-loader').options({
    postcssOptions: {
      plugins: {}
    }
  })
}
