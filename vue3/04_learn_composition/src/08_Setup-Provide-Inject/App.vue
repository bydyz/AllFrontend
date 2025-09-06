<template>
  <div>AppContent: {{ name }}-{{ age }}</div>

  <!-- 倘若改了会provide的响应式的数据，子组件中reject的会同步更改    ；  倘若改了子组件中reject的响应式的值，父组件也会同步更改 -->
  <button @click="name = 'kobe'">changeName</button>

  <!-- 无论是在父组件还是子组件中对非响应式的变量进行修改，均无响应式 -->
  <button @click="onChangeAge">changeAge</button>

  <hr>

  <show-info></show-info>
</template>

<script>
  import { provide, ref } from 'vue'
  import ShowInfo from './ShowInfo.vue'

  export default {
    components: {
      ShowInfo
    },
    setup() {
      // 为了增加 provide 值和 inject 值之间的响应性，我们可以在 provide 值时使用 ref 和 reactive
      let name = ref("why")
      let age = 18

      // provide的写法就是这样，前面是  传递名  ，后面是传递的变量
      provide("name", name)
      provide("age", age)
      provide("height", 1.7)


      
      
      
      function onChangeAge() {
        // age = 25

        // 在子组件中修改了provide过去的非响应式数据，父组件中不会收到影响
        // 似乎对于非响应数据，provide过去后就割裂了联系，变成了两个变量
        // ！以其他方式传递的数据也有此特性
        console.log(age)
      }

      return {
        name,
        age,
        onChangeAge
      }
    }
  }
</script>

<style scoped>
</style>

