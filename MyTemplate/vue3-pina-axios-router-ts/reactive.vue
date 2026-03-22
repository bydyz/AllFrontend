<template>
  <div>
    {{ loading.init }}
  </div>
</template>


<script setup lang="ts">

// 声明 对象 或 数组 时，用 reactive    然后无论在 setup中 还是在 template中  均直接使用
const loading = reactive({
  init: false,
  submit: false
})

console.log(loading.init)











// 创建函数
const InitPage = async() => {

}
// 写在此处 大致相当于 created 里调用
InitPage()


</script>

<style lang="less" scope></style>
