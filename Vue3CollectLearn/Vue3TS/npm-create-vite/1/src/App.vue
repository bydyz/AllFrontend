<script setup lang="ts">
import ChildComponent from './components/ChildComponent.vue'

function sum(num1: number, num2: number) {
  return num1 + num2
}

console.log(sum(6, 8))


interface IKun {
  name: string
  age: number
}
const aa: IKun = {
  name: 'rc',
  age: 27
}
console.log(aa.name)
</script>

<template>
  <ChildComponent message="pass to son message"></ChildComponent>
  <h2>仅有vue3、@vitejs/plugin-vue、vite</h2>
  <h3>仍然可以运行 .ts文件，仍然可以在 .vue 中使用 script setup lang="ts"</h3>
  <h3>安装 typescript ，打包后依旧能正常执行，是 TS 能正常解析成 JS</h3>
</template>

<style scoped>
</style>
