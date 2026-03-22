<template>
  <el-tooltip effect="light" :placement="placement" v-model="active">
    <div class="flex start-center">
      <slot></slot>

      <slot name="icon" :active="active">
        <el-image class="width-14 height-14 pointer margin-left-8" v-show="!active"
                  :src="require('@/assets/icons/question.png')"></el-image>
        <el-image class="width-14 height-14 pointer margin-left-8" v-show="active"
                  :src="require('@/assets/icons/questionHover.png')"></el-image>
      </slot>
    </div>
    <template slot="content">
      <slot name="content"></slot>
    </template>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    placement: {
      type: String,
      default: 'right'
    }
  },
  data() {
    return {
      active: false
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
