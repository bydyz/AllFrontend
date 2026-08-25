import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // ============================
    // 插件1: @vitejs/plugin-vue
    // ============================
    // 功能: 提供 Vue 3 SFC (单文件组件) 支持
    // - 解析 .vue 文件中的 <template>, <script>, <style>
    // - 支持 <script setup> 语法糖
    // - 支持 TypeScript
    // - 支持Scoped CSS
    // 常用选项:
    //   isProduction: boolean  // 是否为生产模式
    //   script: {             // script 代码转换选项
    //     defineModel: false,  // 启用 defineModel (Vue 3.4+)
    //     propsDestructure: false // 启用 props 解构
    //   }
    //   template: {           // 模板编译选项
    //     compilerOptions: {} // 传递给 @vue/compiler-sfc 的选项
    //   }
    vue(),

    // ============================
    // 插件2: @vitejs/plugin-vue-jsx
    // ============================
    // 功能: 提供 JSX / TSX 支持
    // - 在 Vue 3 中使用 JSX 语法编写组件
    // - 支持 TypeScript 中的 JSX
    // - 必须配合 @vitejs/plugin-vue 一起使用
    // 常用选项:
    //   optimize: boolean     // 是否优化 JSX 表达式
    //   transformAssetUrls: { // 自动转换资源 URL
    //     video: ['src', 'poster'],
    //     source: ['src'],
    //     image: ['xlink:href', 'href', 'src'],
    //     use: ['xlink:href', 'href']
    //   }
    vueJsx()
  ],
})
