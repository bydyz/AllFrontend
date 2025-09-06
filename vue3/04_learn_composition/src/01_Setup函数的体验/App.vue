<template>
  <div class="app">
    <!-- template中ref对象自动解包 -->
    <h2>当前计数: {{ counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    // 1.定义counter的内容
    // 默认定义的数据都不是响应式数据
    let counter = ref(100)

    const increment = () => {
      counter.value++
      // 这个打印有点像 moment 里面的数据格式，还有一些其他的内容，到底是啥呢？？？？？？？
      console.log([counter])
      console.log(counter.value)
    }
    
    const decrement = () => {
      counter.value--
    }

    return {
      counter,
      increment,
      decrement
    }
  }
}
</script>

<style>
</style>
