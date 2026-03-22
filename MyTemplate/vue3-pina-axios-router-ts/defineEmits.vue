<template>
  <div>

  </div>
</template>


<script setup lang="ts">

// emit  的用法
const emit = defineEmits(['foldChange'])

function handleMenuIconClick() {

  // 2.将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])







// 创建函数
const InitPage = async() => {

}
// 写在此处 大致相当于 created 里调用
InitPage()

</script>

<style lang="less" scope></style>

