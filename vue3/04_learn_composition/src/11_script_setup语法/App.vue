<template>
  <div>AppContent: {{ message }}</div>
  <button @click="changeMessage">修改message</button>
  <div>height: {{ height }}</div>
  <button @click="onChangeHeight">onChangeHeight</button>

  <show-info name="why" 
             :age="18"
             :height="height"
             @info-btn-click="infoBtnClick"
             ref="showInfoRef">
  </show-info>
  <show-info></show-info>
  <show-info></show-info>
</template>

<script setup>
  // 1.所有编写在顶层中的代码, 都是默认暴露给template可以使用
  import { ref, onMounted } from 'vue'
  import ShowInfo from './ShowInfo.vue'

  // 2.定义响应式数据
  const message = ref("Hello World")
  console.log(message.value)

  // 3.定义绑定的函数
  function changeMessage() {
    message.value = "你好啊, 李银河!"
  }

  function infoBtnClick(payload) {
    console.log("监听到showInfo内部的点击:", payload)
  }

  // 4.获取组件实例
  const showInfoRef = ref()
  onMounted(() => {
    showInfoRef.value.foo()
    // showInfoRef.value.onChangeWeight()
    console.log(showInfoRef.value.weight)
  })

  // 5.修改非响应式
  let height = 1.6
  function onChangeHeight() {
    height = 1.7
  }

</script>

<style scoped>
</style>

