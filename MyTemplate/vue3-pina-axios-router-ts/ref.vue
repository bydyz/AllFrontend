<template>
  <div>
    {{ stringA }} {{ numberB }} {{ BooleanC }}
  </div>




  <ThisIsComponent ref="ThisIsComponent"></ThisIsComponent>
</template>


<script setup lang="ts">

// 声明 基本数据类型（如字符串、数字、布尔值等） 时，用 ref    然后在 setup中需要加 .value 在 template中直接使用
const stringA = ref("666")
const numberB = ref(666)
const BooleanC = ref(true)

console.log(stringA.value, numberB.value, BooleanC.value)






// 除了获取dom，其他的应该要在 () 加上  ''  {}   []  false   true   number
const ThisIsComponent = ref()





// 创建函数
const InitPage = async() => {

}
// 写在此处 大致相当于 created 里调用
InitPage()


</script>

<style lang="less" scope></style>
