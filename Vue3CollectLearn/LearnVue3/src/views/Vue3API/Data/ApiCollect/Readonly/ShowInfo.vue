<template>
  <div>
    <h2>ShowInfo: {{ props.info }}</h2>

    <!-- 代码没有错误, 但是违背规范(单项数据流) -->
    <button @click="props.info.name = 'kobe'">ShowInfo按钮</button>

    <!-- 正确的做法: 符合单项数据流-->
    <button @click="showInfobtnClick">ShowInfo按钮</button>

    <hr>

    <!-- 使用readonly的数据 -->
    <h2>ShowInfo: {{ props.roInfo }}</h2>
    <!-- 代码就会无效(报警告) -->
    <!-- <button @click="roInfo.name = 'james'">ShowInfo按钮</button> -->
    <!-- 正确的做法 -->
    <button @click="roInfoBtnClick">roInfo按钮</button>
  </div>
</template>

<script setup>
// 直接解构会丢失响应性（info 和 roInfo 将变成普通对象，不再响应父组件的更新）。
// 即使 roInfo 标记为 readonly，解构后也无法保持其只读特性。
// const {info, roInfo} = defineProps({
//   // reactive数据
//   info: {
//     type: Object,
//     default: () => ({})
//   },
//   // readonly数据
//   roInfo: {
//     type: Object,
//     default: () => ({})
//   }
// })


const props = defineProps({
  // reactive数据
  info: {
    type: Object,
    default: () => ({})
  },
  // readonly数据
  roInfo: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(["changeInfoName", "changeRoInfoName"])

function showInfobtnClick() {
  emit("changeInfoName", "kobe2")
}

function roInfoBtnClick() {
  emit("changeRoInfoName", "james")
}
</script>

<style scoped>
</style>

