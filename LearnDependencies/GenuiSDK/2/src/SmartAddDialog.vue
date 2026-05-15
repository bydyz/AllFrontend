<template>
  <el-drawer v-model="visible" title="智能助手" size="800px" :close-on-click-modal="false">
  </el-drawer>
</template>

<script setup>
import { reactive, toRefs } from 'vue'

const { visible } = toRefs(reactive({
  visible: false,
}))


let confirmAction = () => {}
let rejectAction = () => {}

const open = (options) => {
  visible.value = true

  return new Promise((resolve, reject) => {
    confirmAction = a => {
      visible.value = false
      resolve(a)
    }
    rejectAction = p => {
      reject(p)
    }
  })
}

const close = () => {
  visible.value = false
  rejectAction()
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>

</style>