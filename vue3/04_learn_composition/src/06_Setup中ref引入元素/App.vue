<template>
  <!-- 1.获取元素 -->
  <h2 ref="titleRef">我是标题</h2>
  <button ref="btnRef">按钮</button>

  <!-- 2.获取组件实例 -->
  <show-info ref="showInfoRef"></show-info>

  <button @click="getElements">获取元素</button>
  <button @click="changeNoReactiveData">changeNoReactiveData</button>
  <button @click="changeReactiveData">changeReactiveData</button>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import ShowInfo from './ShowInfo.vue'

  export default {
    components: {
      ShowInfo
    },
    setup() {
      // ref(null) 也可
      const titleRef = ref()
      const btnRef = ref()
      const showInfoRef = ref()

      // mounted的生命周期函数
      onMounted(() => {
        console.log(titleRef.value)
        // 用[]包裹dom，可打印其详细的信息
        console.log([titleRef.value])
        console.log('')

        console.log(btnRef.value)
        console.log('')

        console.log(showInfoRef.value)
        console.log(showInfoRef.value.showInfoFoo)
        // 在子组件中，data1需要return出来这里才可获取
        console.log(showInfoRef.value.data1)
        console.log([showInfoRef.value])
        console.log('')

        showInfoRef.value.showInfoFoo()
      })

      function getElements() {
        console.log(titleRef.value)
      }

      function changeNoReactiveData() {
        console.log(showInfoRef.value.noReactiveData)
        // 似乎通过这种利用组件实例修改子组件的非响应式数据无用
        showInfoRef.value.noReactiveData = 666
      }

      function changeReactiveData() {
        console.log(showInfoRef.value.reactiveData)
        // 通过这种利用组件实例修改子组件的响应式数据有用
        showInfoRef.value.reactiveData = 666
      }

      return {
        titleRef,
        btnRef,
        showInfoRef,

        getElements,

        changeNoReactiveData,
        changeReactiveData
      }
    }
  }
</script>

<style scoped>
</style>

