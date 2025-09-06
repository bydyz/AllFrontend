<template>
  <div>ShowInfo: {{ name }}-{{ age }}-{{ height }} </div>
  <button @click="name = 'rc'">changeName</button>
  <button @click="onChangeAge">changeAge</button>
</template>

<script>
  import { inject } from 'vue'

  export default {
    // inject的options api注入, 那么依然需要手动来解包
    // inject: ["name", "age"],
    setup() {
      let name = inject("name")
      let age = inject("age")
      // 没有provide变量时，后面的数据是默认值
      const height = inject("height", 1.88)


      

      function onChangeAge() {
        age = 20

        // provide一个非响应式的数据，即是在父组件中改了其值，子组件仍然保留最初provide过来的值，
        console.log(age)
      }

      return {
        name,
        age,
        height,
        onChangeAge
      }
    }
  }
</script>

<style scoped>
</style>

