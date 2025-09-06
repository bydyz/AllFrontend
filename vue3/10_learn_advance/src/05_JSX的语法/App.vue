<template>
  <jsx/>
  
  <hr>

  <firstVue></firstVue>

  <hr>

  <secondVue></secondVue>

  <hr>

  <thirdVue></thirdVue>
</template>

<script lang="jsx" setup>
import { ref } from 'vue'
import About from "./About.vue"
import firstVue from './01_jsx语法基本使用'
import secondVue from './02_jsx语法实现计数器'
import thirdVue from './03_jex语法在vue3z中的实现'

const counter = ref(0)

const increment = () => {
  counter.value++
}
const decrement = () => {
  counter.value--
}

// 感觉函数也不太像函数，这就是jsx语法吗？
// () => ()  
// { 包含变量 或者 函数名 }
// 直接放组件
const jsx = () => (
  <div class="app">
    <h2>当前计数: { counter.value }</h2>
    <button onClick={ increment }>+1</button>
    <button onClick={ decrement }>-1</button>
    <About/>
  </div>
)
</script>

<style lang="less" scoped>

</style>
