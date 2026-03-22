<template>
  <el-progress :percentage="percentage" :stroke-width="strokeWidth" :show-text="false"
               :color="[{color: '#13C97F', percentage: 100},{color: '#FF4B5B', percentage: 100}]"></el-progress>
</template>

<script>
export default {
  name: 'EleProgress',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 6
    }
  }
}
</script>

<style scoped lang="stylus">
>>> .el-progress-bar__outer
  background-color #DDD
</style>