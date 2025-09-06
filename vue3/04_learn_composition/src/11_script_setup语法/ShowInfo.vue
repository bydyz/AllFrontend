<template>
  <div>ShowInfo: {{ name }}-{{ age }}-{{ height }}</div>
  <button @click="showInfoBtnClick">showInfoButton</button>
  <button @click="onChangeHeight">onChangeHeight</button>
</template>

<script setup>

// 定义props
const props = defineProps({
  name: {
    type: String,
    default: "默认值"
  },
  age: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 1.2
  }
})

// 绑定函数, 并且发出事件
const emits = defineEmits(["infoBtnClick"])
function showInfoBtnClick() {
  emits("infoBtnClick", "showInfo内部发生了点击")
}

// 定义foo的函数
function foo() {
  console.log("foo function")
}

let weight = 160
function onChangeWeight() {
  console.log('onChangeWeight execute')
}

//!!! 是只有 defineExpose 的内容，外面可以通过组件实例拿到
defineExpose({
  foo
})

function onChangeHeight() {
    // height = 1.7

    console.log(props)
  }

</script>

<style scoped>
</style>

