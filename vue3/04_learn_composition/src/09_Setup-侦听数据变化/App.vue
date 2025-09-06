<template>
  <div>
    <h2>当前计数: {{ counter }}</h2>
    <button @click="counter++">+1</button>
    <button @click="name = 'kobe'">修改name</button>
    <button @click="age++">修改age</button>
  </div>
</template>

<script>
  import { watchEffect, watch, ref } from 'vue'

  export default {
    setup() {
      let counter = ref(0)
      let name = ref("why")
      let age = 18

      // watch(counter, (newValue, oldValue) => {})

      // 1.watchEffect传入的函数默认会直接被执行一次
      // 2.在执行的过程中, 会自动的收集依赖(依赖哪些响应式的数据   里面有哪些响应式数据，则会收集哪些)      只会收集响应式数据的依赖，非响应式则不会
      const stopWatch = watchEffect(() => {
        console.log("-------", counter.value)
        console.log("-------", age)
        // console.log("-------", counter.value, name.value)

        // 判断counter.value > 10
        if (counter.value >= 10) {
          // 调用  watchEffect  返回的函数，会销毁监听
          stopWatch()
        }
      })

      return {
        counter,
        name
      }
    }
  }
</script>

<style scoped>
</style>

