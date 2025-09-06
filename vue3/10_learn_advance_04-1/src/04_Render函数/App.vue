<template>
  <!-- 妈呀，一个函数，直接当 组件 用 -->
  <render/>

  <h2 class="">内容</h2>

  <hr>

  <firstVue></firstVue>

  <hr>

  <secondVue></secondVue>

  <hr>

  <thirdVue></thirdVue>
</template>


<script setup>

import { ref, h } from 'vue';
import Home from './Home.vue'
import firstVue from './01_render函数基本使用'
import secondVue from './02_render函数计数器实现'
import thirdVue from './03_vue3中利用render的写法'



// 以下代码总的促成了 可以利用  <render/>
const counter = ref(0)

const increment = () => {
  counter.value++
}
const decrement = () => {
  counter.value--
}

// 感觉就像生成了html   有点像react的函数式组件
const render = () => h("div", { className: "app" }, [
  h("h2", null, `当前计数: ${counter.value}`),
  h("button", { onClick: increment }, "+1"),
  h("button", { onClick: decrement }, "-1"),
  h(Home)
])

</script>

<style scoped>
hr {
  margin: 30px 0;
}
</style>
