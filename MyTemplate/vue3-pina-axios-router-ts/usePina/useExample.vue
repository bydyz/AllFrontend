<template>
  <div>

  </div>
</template>


<script setup lang="ts">
import userStore from './Pina/userStore'

const user = userStore()

console.log(user.nickName)










// 创建函数
const InitPage = async() => {

}
// 写在此处 大致相当于 created 里调用
InitPage()


</script>

<style lang="less" scope></style>
