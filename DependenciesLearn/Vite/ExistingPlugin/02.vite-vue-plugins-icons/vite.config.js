import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

// 图标解析器 - 从不同图标库解析图标
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  plugins: [
    vue(),

    // ============================
    // 插件: unplugin-icons/vite
    // ============================
    // 功能: 自动导入图标作为 Vue 组件
    // - 支持 100+ 图标库 (Iconify 图标集)
    // - 支持本地图标 (SVG 文件)
    // - 按需加载，不会打包整个图标库
    Icons({
      // ============================
      // 编译器选项 (Compiler)
      // ============================
      compiler: 'vue3', // 使用 Vue 3 编译器

      // ============================
      // 自定义图标集
      // ============================
      customCollections: {
        // 从本地 SVG 文件加载图标
        // 使用 FileSystemIconLoader 加载器
        'my-icons': FileSystemIconLoader('./src/assets/icons')
      },

      // ============================
      // 图标尺寸
      // ============================
      scale: 1, // 图标缩放比例

      // ============================
      // 默认类名
      // ============================
      defaultClass: 'icon', // 默认 CSS 类名

      // ============================
      // 自动安装
      // ============================
      autoInstall: true, // 自动安装缺失的图标包

      // ============================
      // 性能优化
      // ============================
      transformer: 'vue3', // 使用 Vue 3 转换器
    }),
  ],
})
