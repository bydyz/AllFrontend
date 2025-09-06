<template>
  <div>ShowInfo</div>
  <div>{{ noReactiveData }}</div>
  <div>{{ reactiveData }}</div>
</template>

<script>
import { ref } from 'vue'

  export default {
    // methods: {
    //   showInfoFoo() {
    //     console.log("showInfo foo function")
    //   }
    // }
    setup() {
      const data1 = 666
      const noReactiveData = 'this is no reactive data'
      const reactiveData = ref('this is reactive data')
      function showInfoFoo() {
        console.log("showInfo foo function")
      }

      return {
        data1,
        noReactiveData,
        reactiveData,
        showInfoFoo
      }
    }
  }
</script>

<style scoped>
div {
  margin: 20px 0
}
</style>

