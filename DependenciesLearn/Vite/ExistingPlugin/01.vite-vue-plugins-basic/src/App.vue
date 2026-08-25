<script setup>
// ========================================
// Vue 3 Composition API + <script setup>
// ========================================
// <script setup> 是 Vue 3.2+ 提供的编译时语法糖
// - 自动将顶层绑定暴露给模板
// - 不需要手动 return
// - 更好的 TypeScript 类型推断
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import JsxDemo from './components/JsxDemo.vue'

const count = ref(0)
</script>

<template>
  <div>
    <h1>项目1: Vue 基础插件演示</h1>
    <p>插件: @vitejs/plugin-vue + @vitejs/plugin-vue-jsx</p>

    <!-- 使用 SFC 组件 -->
    <HelloWorld msg="Hello Vue 3 SFC!" />

    <!-- 使用 JSX 组件 -->
    <JsxDemo :count="count" />
  </div>
</template>

<style scoped>
/* Scoped CSS: 样式只在当前组件生效 */
h1 {
  color: #42b883;
}
</style>
