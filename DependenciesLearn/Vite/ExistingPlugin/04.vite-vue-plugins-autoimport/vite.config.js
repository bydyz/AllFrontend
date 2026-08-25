import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'

// vite-plugin-style-import 用于按需导入组件库样式
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),

    // ============================
    // 插件1: unplugin-auto-import/vite
    // ============================
    // 功能: 自动导入 Vue/Vue Router/Pinia 等 API
    // - 无需手动 import { ref, computed, watch } from 'vue'
    // - 自动生成类型声明文件
    // - 支持自定义 API 导入
    AutoImport({
      // ============================
      // 导入目标
      // ============================
      imports: [
        // Vue 3 API 自动导入
        'vue',
        // Vue Router 自动导入
        'vue-router',
        // Pinia 自动导入
        'pinia',
      ],

      // ============================
      // 生成文件
      // ============================
      dts: 'src/auto-imports.d.ts', // 生成类型声明文件

      // ============================
      // 自定义导入
      // ============================
      resolvers: [
        // Element Plus 函数式组件自动导入
        ElementPlusResolver(),
      ],

      // ============================
      // 目录扫描
      // ============================
      dirs: ['src/composables'], // 扫描 composable 函数

      // ============================
      // 注入文件
      // ============================
      injectAtEnd: true, // 在文件末尾注入导入
    }),

    // ============================
    // 插件2: unplugin-vue-components/vite
    // ============================
    // 功能: 自动导入 Vue 组件
    Components({
      resolvers: [
        // Element Plus 组件自动导入
        ElementPlusResolver(),
      ],
      dts: 'src/components.d.ts',
    }),

    // ============================
    // 插件3: vite-plugin-style-import
    // ============================
    // 功能: 按需导入组件库样式
    // - 自动导入组件对应的 CSS/SCSS 样式
    // - 支持多种组件库
    styleImport({
      // ============================
      // 库配置
      // ============================
      libs: [
        // Element Plus 样式按需导入
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            // 导入组件样式
            return `element-plus/theme-chalk/${name}.css`
          },
          // 导入组件和样式
          resolveComponent: (name) => {
            return `element-plus/es/components/${name.replace('el-', '')}/index`
          },
        },
      ],
    }),
  ],
})
