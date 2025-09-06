<template>
  <div class="app">
    <button @click="counter++">+1</button>

    <!-- 1.参数-修饰符-值 -->
    <h2 v-why:kobe.abc.cba="message">哈哈哈哈</h2>

    <!-- 2.价格拼接单位符号 -->
    <h2 v-unit> {{ 111 }} </h2>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const counter = ref(0)

const message = '你好啊, 李银河'

const vWhy = {
  mounted(el, binding) {
    console.log(binding)
    el.textContent = binding.value

    console.log('指令参数:', binding.arg); // 输出: kobe
    console.log('指令值:', binding.value); // 输出: 你好啊, 李银河

    console.log('是否包含修饰符 abc:', binding.modifiers.abc); // 输出: true
    console.log('是否包含修饰符 cba:', binding.modifiers.cba); // 输出: true

    // 在这个例子中，abc 和 cba 是指令的修饰符。通过 binding.modifiers，你可以检查模板中是否包含了特定的修饰符，以便在自定义指令的逻辑中进行相应的处理。

    // 总结一下，在 v-why:kobe.abc.cba 中，why 是指令名称，kobe 是指令参数，abc 和 cba 是指令修饰符。在自定义指令的定义中，可以通过这些信息来调整指令的行为。
  }
}


</script>

<style scoped>

</style>
