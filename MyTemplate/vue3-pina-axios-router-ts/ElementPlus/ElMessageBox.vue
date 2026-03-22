<template>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

const onConfirm = async() => {
  await ElMessageBox.confirm(`是否删除${name}？`, '提示', {
    type: 'warning'
  })
}

</script>

<style lang="less" scope></style>

