import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),

    // ============================
    // 插件: unplugin-vue-components/vite
    // ============================
    // 功能: 自动导入 Vue 组件
    // - 无需手动 import 和注册组件
    // - 按需加载，只导入使用到的组件
    // - 支持自定义组件库解析器
    Components({
      // ============================
      // 组件库解析器 (Resolvers)
      // ============================
      // 用于解析第三方组件库的组件名和导入路径
      resolvers: [
        // Element Plus 组件解析器
        // 自动按需导入 Element Plus 组件及其样式
        ElementPlusResolver(),

        // 自定义组件解析器示例:
        // (componentName) => {
        //   if (componentName.startsWith('My'))
        //     return { name: componentName, from: `./components/${componentName}.vue` }
        // }
      ],

      // ============================
      // 目录扫描配置
      // ============================
      dirs: ['src/components'], // 组件扫描目录

      // ============================
      // 组件文件匹配规则
      // ============================
      extensions: ['vue'], // 支持的文件扩展名
      deep: true,         // 是否扫描子目录

      // ============================
      // 组件名转换
      // ============================
      dts: false,         // 是否生成类型声明文件

      // ============================
      // 性能优化
      // ============================
      cache: true,        // 启用缓存
    }),
  ],
})
