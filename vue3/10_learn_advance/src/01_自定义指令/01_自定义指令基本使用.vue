<template>
  <div class="app">
    <input type="text" ref="inputRef">

    <!-- 用自定义指令聚焦 -->
    <input type="text" v-focus>
  </div>
</template>


<!-- 在 directives 定义的focus指令，加上 'v-' 即可以在 DOM 中直接使用 -->
<!-- <script>
  export default {
    directives: {
      focus: {
        // 生命周期的函数(自定义指令)
        mounted(el) {
          // console.log("v-focus应用的元素被挂载了", el)
          el?.focus()
        }
      }
    }
  }
</script> -->


<script setup>
// 只有一个能聚焦，方式一的优先级要高于方式二，也高于上方的




// 1.方式一: 定义ref绑定到input中, 调用focus
import useInput from "./hooks/useInput"
const { inputRef } = useInput()





// 2.方式二: 自定义指令(局部指令)
const vFocus = {
  // 生命周期的函数(自定义指令)
  mounted(el) {
    // console.log("v-focus应用的元素被挂载了", el)
    el?.focus()
  }
}
</script>

<style scoped></style>
