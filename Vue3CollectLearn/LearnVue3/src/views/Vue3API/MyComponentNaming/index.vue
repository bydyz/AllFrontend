<template>
  <div class="demo">
    <h2>默认导入 vs 命名导出</h2>

    <h3>1. 默认导入（每个组件单独导入）</h3>
    <MyButton @click="handleClick">默认导入按钮</MyButton>

    <h3>2. 命名导出（从 index.js 导入多个）</h3>
    <BaseButton type="primary">主要按钮</BaseButton>
    <BaseButton type="success">成功按钮</BaseButton>
    <base-button type="danger">危险按钮</base-button>

    <h3>3. 导出成别的名称</h3>
    <MySpecialUse></MySpecialUse>
    <OtherSpecialUse></OtherSpecialUse>
  </div>
</template>

<script setup>
import MyButton from './MyButton.vue'
import MySpecialUse from './SpecialUse.vue'
import { BaseButton, SpecialUse as OtherSpecialUse } from './index.js'

function handleClick() {
  console.log('按钮点击')
}
</script>

<style scoped>
.demo {
  padding: 20px;
}
h3 {
  margin: 16px 0 8px;
}
</style>